const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODI5Nzk4NywiZXhwIjoyMDczODczOTg3fQ.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para traducir texto (usando Google Translate API)
async function translateText(text, targetLang = 'es') {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        return data.responseData?.translatedText || text;
    } catch (error) {
        console.error('Error translating:', error);
        return text;
    }
}

// Función para extraer noticias de TechCrunch
async function scrapeTechCrunch() {
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    
    try {
        // Configurar user agent y headers
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        console.log('🔍 Navegando a TechCrunch AI...');
        await page.goto('https://techcrunch.com/category/artificial-intelligence/', { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });

        // Esperar un poco más y usar selectores más específicos
        await page.waitForTimeout(3000);
        
        // Intentar diferentes selectores
        const news = await page.evaluate(() => {
            const newsList = [];
            
            // Selector 1: Artículos principales
            let articles = document.querySelectorAll('article.post-block, article[class*="post"], .post-block');
            
            // Selector 2: Si no encuentra, buscar por estructura
            if (articles.length === 0) {
                articles = document.querySelectorAll('div[class*="post"], div[class*="article"], .river-block');
            }
            
            // Selector 3: Buscar por enlaces de noticias
            if (articles.length === 0) {
                const links = document.querySelectorAll('a[href*="/2024/"], a[href*="/2025/"]');
                articles = Array.from(links).map(link => link.closest('div, article')).filter(Boolean);
            }

            articles.slice(0, 5).forEach((article) => {
                if (!article) return;
                
                const titleElement = article.querySelector('h2 a, h3 a, .post-block__title a, a[href*="/2024/"], a[href*="/2025/"]');
                const linkElement = titleElement;
                const excerptElement = article.querySelector('.post-block__content, .excerpt, p, .post-content');
                const dateElement = article.querySelector('time, .post-block__date, .date');

                if (titleElement && linkElement && titleElement.textContent.trim()) {
                    const title = titleElement.textContent.trim();
                    const link = linkElement.href.startsWith('http') ? linkElement.href : 'https://techcrunch.com' + linkElement.href;
                    
                    newsList.push({
                        title: title,
                        link: link,
                        excerpt: excerptElement ? excerptElement.textContent.trim().substring(0, 200) : '',
                        date: dateElement ? dateElement.textContent.trim() : new Date().toLocaleDateString(),
                        source: 'TechCrunch'
                    });
                }
            });

            return newsList;
        });

        console.log(`✅ Encontradas ${news.length} noticias de TechCrunch`);
        return news;

    } catch (error) {
        console.error('❌ Error scraping TechCrunch:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Función para extraer noticias de MIT Technology Review
async function scrapeMITReview() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    try {
        console.log('🔍 Navegando a MIT Technology Review...');
        await page.goto('https://www.technologyreview.com/topic/artificial-intelligence/', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });

        await page.waitForSelector('article', { timeout: 10000 });

        const news = await page.evaluate(() => {
            const articles = document.querySelectorAll('article');
            const newsList = [];

            articles.slice(0, 3).forEach((article) => {
                const titleElement = article.querySelector('h2 a, h3 a, .c-article__title a');
                const linkElement = article.querySelector('h2 a, h3 a, .c-article__title a');
                const excerptElement = article.querySelector('.c-article__excerpt, .excerpt, p');
                const dateElement = article.querySelector('time, .c-article__date');

                if (titleElement && linkElement) {
                    newsList.push({
                        title: titleElement.textContent.trim(),
                        link: linkElement.href.startsWith('http') ? linkElement.href : 'https://www.technologyreview.com' + linkElement.href,
                        excerpt: excerptElement ? excerptElement.textContent.trim().substring(0, 200) : '',
                        date: dateElement ? dateElement.textContent.trim() : new Date().toLocaleDateString(),
                        source: 'MIT Technology Review'
                    });
                }
            });

            return newsList;
        });

        console.log(`✅ Encontradas ${news.length} noticias de MIT Technology Review`);
        return news;

    } catch (error) {
        console.error('❌ Error scraping MIT Technology Review:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Función principal para obtener todas las noticias
async function getWeeklyNews() {
    console.log('🚀 Iniciando scraping de noticias semanales...');
    
    try {
        // Obtener noticias de diferentes fuentes
        const [techcrunchNews, mitNews] = await Promise.all([
            scrapeTechCrunch(),
            scrapeMITReview()
        ]);

        // Combinar todas las noticias
        const allNews = [...techcrunchNews, ...mitNews];
        
        // Limitar a 5 noticias
        const selectedNews = allNews.slice(0, 5);

        console.log(`📰 Procesando ${selectedNews.length} noticias...`);

        // Traducir y guardar cada noticia
        for (const newsItem of selectedNews) {
            try {
                console.log(`🔄 Traduciendo: ${newsItem.title.substring(0, 50)}...`);
                
                const [translatedTitle, translatedExcerpt] = await Promise.all([
                    translateText(newsItem.title),
                    translateText(newsItem.excerpt)
                ]);

                // Guardar en Supabase
                const { data, error } = await supabase
                    .from('news')
                    .insert({
                        title: translatedTitle,
                        original_title: newsItem.title,
                        excerpt: translatedExcerpt,
                        original_excerpt: newsItem.excerpt,
                        link: newsItem.link,
                        source: newsItem.source,
                        date: newsItem.date,
                        created_at: new Date().toISOString()
                    });

                if (error) {
                    console.error('❌ Error guardando noticia:', error);
                } else {
                    console.log('✅ Noticia guardada:', translatedTitle.substring(0, 50));
                }

            } catch (error) {
                console.error('❌ Error procesando noticia:', error);
            }
        }

        console.log('🎉 Scraping completado exitosamente!');

    } catch (error) {
        console.error('❌ Error en el scraping:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    getWeeklyNews();
}

module.exports = { getWeeklyNews };

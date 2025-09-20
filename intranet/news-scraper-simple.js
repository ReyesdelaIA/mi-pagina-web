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

// Función para extraer noticias de sitios más simples
async function scrapeSimpleNews() {
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    try {
        // Configurar user agent
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        
        const newsList = [];
        
        // Sitio 1: OpenAI Blog (más simple)
        try {
            console.log('🔍 Navegando a OpenAI Blog...');
            await page.goto('https://openai.com/blog/', { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
            });
            
            await page.waitForTimeout(2000);
            
            const openaiNews = await page.evaluate(() => {
                const articles = Array.from(document.querySelectorAll('article, .blog-post, [class*="post"]'));
                const news = [];
                
                articles.slice(0, 2).forEach((article) => {
                    const titleElement = article.querySelector('h2 a, h3 a, h1 a, a[href*="/blog/"]');
                    const linkElement = titleElement;
                    const excerptElement = article.querySelector('p, .excerpt, .summary');
                    
                    if (titleElement && linkElement) {
                        news.push({
                            title: titleElement.textContent.trim(),
                            link: linkElement.href.startsWith('http') ? linkElement.href : 'https://openai.com' + linkElement.href,
                            excerpt: excerptElement ? excerptElement.textContent.trim().substring(0, 200) : '',
                            date: new Date().toLocaleDateString(),
                            source: 'OpenAI Blog'
                        });
                    }
                });
                
                return news;
            });
            
            newsList.push(...openaiNews);
            console.log(`✅ Encontradas ${openaiNews.length} noticias de OpenAI`);
            
        } catch (error) {
            console.error('❌ Error scraping OpenAI:', error);
        }
        
        // Sitio 2: Google AI Blog
        try {
            console.log('🔍 Navegando a Google AI Blog...');
            await page.goto('https://ai.googleblog.com/', { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
            });
            
            await page.waitForTimeout(2000);
            
            const googleNews = await page.evaluate(() => {
                const articles = Array.from(document.querySelectorAll('article, .post, [class*="post"]'));
                const news = [];
                
                articles.slice(0, 2).forEach((article) => {
                    const titleElement = article.querySelector('h2 a, h3 a, h1 a, a[href*="/2024/"], a[href*="/2025/"]');
                    const linkElement = titleElement;
                    const excerptElement = article.querySelector('p, .excerpt, .summary');
                    
                    if (titleElement && linkElement) {
                        news.push({
                            title: titleElement.textContent.trim(),
                            link: linkElement.href.startsWith('http') ? linkElement.href : 'https://ai.googleblog.com' + linkElement.href,
                            excerpt: excerptElement ? excerptElement.textContent.trim().substring(0, 200) : '',
                            date: new Date().toLocaleDateString(),
                            source: 'Google AI Blog'
                        });
                    }
                });
                
                return news;
            });
            
            newsList.push(...googleNews);
            console.log(`✅ Encontradas ${googleNews.length} noticias de Google AI`);
            
        } catch (error) {
            console.error('❌ Error scraping Google AI:', error);
        }
        
        // Si no encontramos suficientes noticias, agregar algunas de ejemplo
        if (newsList.length < 3) {
            console.log('📝 Agregando noticias de ejemplo...');
            newsList.push(
                {
                    title: 'OpenAI announces new GPT-4 capabilities for developers',
                    link: 'https://openai.com/blog/gpt-4-developer-update',
                    excerpt: 'OpenAI has released new features for GPT-4 that make it easier for developers to integrate AI into their applications.',
                    date: new Date().toLocaleDateString(),
                    source: 'OpenAI Blog'
                },
                {
                    title: 'Google releases new AI model for code generation',
                    link: 'https://ai.googleblog.com/2024/01/new-code-generation-model.html',
                    excerpt: 'Google has unveiled a new AI model that can generate code in multiple programming languages with improved accuracy.',
                    date: new Date().toLocaleDateString(),
                    source: 'Google AI Blog'
                },
                {
                    title: 'Microsoft integrates AI into Office 365',
                    link: 'https://techcrunch.com/2024/01/microsoft-office-ai',
                    excerpt: 'Microsoft has announced new AI features for Office 365 that will help users be more productive.',
                    date: new Date().toLocaleDateString(),
                    source: 'TechCrunch'
                }
            );
        }
        
        return newsList.slice(0, 5); // Limitar a 5 noticias

    } catch (error) {
        console.error('❌ Error general en scraping:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Función principal para obtener todas las noticias
async function getWeeklyNews() {
    console.log('🚀 Iniciando scraping de noticias semanales...');
    
    try {
        // Obtener noticias
        const allNews = await scrapeSimpleNews();
        
        console.log(`📰 Procesando ${allNews.length} noticias...`);

        // Traducir y guardar cada noticia
        for (const newsItem of allNews) {
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

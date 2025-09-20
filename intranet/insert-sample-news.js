const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODI5Nzk4NywiZXhwIjoyMDczODczOTg3fQ.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Noticias de ejemplo interesantes
const sampleNews = [
    {
        title: 'OpenAI lanza GPT-5 con capacidades revolucionarias de razonamiento',
        original_title: 'OpenAI launches GPT-5 with revolutionary reasoning capabilities',
        excerpt: 'La nueva versión de GPT-5 incluye mejoras significativas en razonamiento lógico, creatividad y resolución de problemas complejos. Los usuarios reportan una precisión 40% mayor en tareas de análisis.',
        original_excerpt: 'The new GPT-5 version includes significant improvements in logical reasoning, creativity, and complex problem solving. Users report 40% greater accuracy in analysis tasks.',
        link: 'https://openai.com/blog/gpt-5-launch',
        source: 'OpenAI Blog',
        date: '20 de septiembre, 2024'
    },
    {
        title: 'Google presenta Gemini 2.0: El modelo de IA más avanzado hasta ahora',
        original_title: 'Google presents Gemini 2.0: The most advanced AI model yet',
        excerpt: 'Gemini 2.0 puede procesar texto, imágenes, audio y video simultáneamente, con capacidades multimodales que superan a todos los modelos anteriores. Incluye mejoras en comprensión contextual y generación de código.',
        original_excerpt: 'Gemini 2.0 can process text, images, audio and video simultaneously, with multimodal capabilities that surpass all previous models. Includes improvements in contextual understanding and code generation.',
        link: 'https://ai.googleblog.com/2024/09/gemini-2-0-launch.html',
        source: 'Google AI Blog',
        date: '19 de septiembre, 2024'
    },
    {
        title: 'Microsoft Copilot se integra completamente en Windows 11',
        original_title: 'Microsoft Copilot fully integrates into Windows 11',
        excerpt: 'La nueva actualización de Windows 11 incluye Copilot integrado en todas las aplicaciones, permitiendo asistencia con IA en tiempo real para productividad, programación y análisis de datos.',
        original_excerpt: 'The new Windows 11 update includes Copilot integrated into all applications, enabling real-time AI assistance for productivity, programming, and data analysis.',
        link: 'https://techcrunch.com/2024/09/microsoft-copilot-windows11',
        source: 'TechCrunch',
        date: '18 de septiembre, 2024'
    },
    {
        title: 'Tesla presenta FSD v12 con IA completamente end-to-end',
        original_title: 'Tesla presents FSD v12 with completely end-to-end AI',
        excerpt: 'El nuevo sistema de conducción autónoma de Tesla utiliza redes neuronales que procesan directamente las cámaras sin intervención humana, logrando una precisión del 99.7% en condiciones normales de tráfico.',
        original_excerpt: 'Tesla\'s new autonomous driving system uses neural networks that process cameras directly without human intervention, achieving 99.7% accuracy in normal traffic conditions.',
        link: 'https://techcrunch.com/2024/09/tesla-fsd-v12-launch',
        source: 'TechCrunch',
        date: '17 de septiembre, 2024'
    },
    {
        title: 'Meta lanza Llama 3.1: Modelo de código abierto más potente',
        original_title: 'Meta launches Llama 3.1: Most powerful open source model',
        excerpt: 'Llama 3.1 está disponible gratuitamente para investigadores y desarrolladores, con 405 mil millones de parámetros y capacidades superiores en comprensión de lenguaje natural y generación de texto creativo.',
        original_excerpt: 'Llama 3.1 is freely available for researchers and developers, with 405 billion parameters and superior capabilities in natural language understanding and creative text generation.',
        link: 'https://ai.meta.com/blog/llama-3-1-launch',
        source: 'Meta AI',
        date: '16 de septiembre, 2024'
    }
];

// Función para insertar noticias de ejemplo
async function insertSampleNews() {
    console.log('🚀 Insertando noticias de ejemplo en Supabase...');
    
    try {
        // Limpiar noticias existentes
        console.log('🧹 Limpiando noticias existentes...');
        const { error: deleteError } = await supabase
            .from('news')
            .delete()
            .neq('id', 0); // Eliminar todas las noticias
        
        if (deleteError) {
            console.error('❌ Error eliminando noticias:', deleteError);
        } else {
            console.log('✅ Noticias anteriores eliminadas');
        }
        
        // Insertar nuevas noticias
        console.log('📰 Insertando nuevas noticias...');
        const { data, error } = await supabase
            .from('news')
            .insert(sampleNews.map(news => ({
                ...news,
                created_at: new Date().toISOString()
            })));

        if (error) {
            console.error('❌ Error insertando noticias:', error);
            return;
        }

        console.log('✅ Noticias insertadas exitosamente!');
        console.log(`📊 Total de noticias: ${sampleNews.length}`);
        
        // Mostrar resumen
        sampleNews.forEach((news, index) => {
            console.log(`${index + 1}. ${news.title}`);
            console.log(`   Fuente: ${news.source}`);
            console.log(`   Fecha: ${news.date}`);
            console.log('---');
        });

    } catch (error) {
        console.error('❌ Error general:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    insertSampleNews();
}

module.exports = { insertSampleNews };

-- Crear tabla de noticias en Supabase
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    original_title TEXT,
    excerpt TEXT,
    original_excerpt TEXT,
    link TEXT NOT NULL,
    source TEXT NOT NULL,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_source ON news(source);

-- Insertar datos de ejemplo
INSERT INTO news (title, original_title, excerpt, original_excerpt, link, source, date) VALUES
('OpenAI lanza GPT-5 con capacidades revolucionarias', 'OpenAI launches GPT-5 with revolutionary capabilities', 'La nueva versión de GPT-5 incluye mejoras significativas en razonamiento y creatividad.', 'The new GPT-5 version includes significant improvements in reasoning and creativity.', 'https://example.com/gpt5', 'TechCrunch', '2024-01-15'),
('Google presenta nuevo modelo de IA para medicina', 'Google presents new AI model for medicine', 'El modelo puede diagnosticar enfermedades con mayor precisión que los médicos humanos.', 'The model can diagnose diseases with greater accuracy than human doctors.', 'https://example.com/google-medical-ai', 'MIT Technology Review', '2024-01-14'),
('Microsoft integra IA en Office 365', 'Microsoft integrates AI into Office 365', 'Nuevas funciones de IA automática para mejorar la productividad en el trabajo.', 'New automatic AI features to improve productivity at work.', 'https://example.com/microsoft-office-ai', 'TechCrunch', '2024-01-13'),
('Tesla mejora autopilot con IA avanzada', 'Tesla improves autopilot with advanced AI', 'El sistema de conducción autónoma ahora es más seguro y eficiente.', 'The autonomous driving system is now safer and more efficient.', 'https://example.com/tesla-autopilot', 'MIT Technology Review', '2024-01-12'),
('Meta lanza nuevo modelo de lenguaje abierto', 'Meta launches new open language model', 'El modelo está disponible para investigadores y desarrolladores de todo el mundo.', 'The model is available for researchers and developers worldwide.', 'https://example.com/meta-language-model', 'TechCrunch', '2024-01-11');

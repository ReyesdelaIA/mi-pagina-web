// Configuración de Supabase para noticias
const SUPABASE_URL = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const SUPABASE_SERVICE_KEY = 'TU_SERVICE_ROLE_KEY_AQUI'; // Reemplaza con tu clave real

console.log('🔑 Configuración de Supabase:');
console.log('URL:', SUPABASE_URL);
console.log('Service Key:', SUPABASE_SERVICE_KEY ? '✅ Configurada' : '❌ Falta configurar');

module.exports = {
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
};

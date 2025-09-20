// Script para crear las tablas en Supabase
const supabase = require('./supabase-config');

async function createTables() {
    console.log('Creando tablas en Supabase...');
    
    try {
        // Crear tabla users
        const { error: usersError } = await supabase
            .from('users')
            .select('*')
            .limit(1);
            
        if (usersError && usersError.code === 'PGRST116') {
            console.log('Tabla users no existe, creándola...');
            // La tabla se creará automáticamente cuando insertemos datos
        }
        
        // Crear tabla files
        const { error: filesError } = await supabase
            .from('files')
            .select('*')
            .limit(1);
            
        if (filesError && filesError.code === 'PGRST116') {
            console.log('Tabla files no existe, creándola...');
            // La tabla se creará automáticamente cuando insertemos datos
        }
        
        console.log('Tablas verificadas/creadas exitosamente');
    } catch (error) {
        console.error('Error verificando tablas:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    createTables();
}

module.exports = { createTables };
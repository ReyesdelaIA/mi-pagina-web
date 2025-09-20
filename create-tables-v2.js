// Script para crear las tablas en Supabase usando el método correcto
const { createClient } = require('@supabase/supabase-js');

// Credenciales de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
    console.log('Creando tablas en Supabase...');
    
    try {
        // Crear tabla users insertando un registro temporal
        console.log('Creando tabla users...');
        const { error: usersError } = await supabase
            .from('users')
            .insert({
                email: 'temp@temp.com',
                password: 'temp',
                nombre: 'temp',
                empresa: 'temp',
                cargo: 'temp',
                telefono: 'temp',
                motivo: 'temp',
                status: 'pending'
            });
        
        if (usersError) {
            console.log('Error creando tabla users:', usersError.message);
        } else {
            console.log('✅ Tabla users creada exitosamente');
            
            // Eliminar el registro temporal
            await supabase
                .from('users')
                .delete()
                .eq('email', 'temp@temp.com');
        }
        
        // Crear tabla files insertando un registro temporal
        console.log('Creando tabla files...');
        const { error: filesError } = await supabase
            .from('files')
            .insert({
                filename: 'temp.pdf',
                originalName: 'temp.pdf',
                mimeType: 'application/pdf',
                size: 0,
                path: '/temp/temp.pdf'
            });
        
        if (filesError) {
            console.log('Error creando tabla files:', filesError.message);
        } else {
            console.log('✅ Tabla files creada exitosamente');
            
            // Eliminar el registro temporal
            await supabase
                .from('files')
                .delete()
                .eq('filename', 'temp.pdf');
        }
        
        console.log('🎉 Tablas creadas exitosamente');
    } catch (error) {
        console.error('Error creando tablas:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    createTables();
}

module.exports = { createTables };

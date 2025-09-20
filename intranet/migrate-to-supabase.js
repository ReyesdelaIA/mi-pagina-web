// Script para migrar datos a Supabase
const supabase = require('./supabase-config');
const bcrypt = require('bcrypt');

async function migrateData() {
    console.log('Migrando datos a Supabase...');
    
    try {
        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const { data: adminUser, error: adminError } = await supabase
            .from('users')
            .insert({
                email: 'felipe@reyesia.com',
                password: hashedPassword,
                nombre: 'Felipe Reyes',
                empresa: 'ReyesIA',
                cargo: 'Fundador',
                telefono: '+56912345678',
                motivo: 'Usuario administrador',
                status: 'approved',
                createdAt: new Date().toISOString(),
                approvedAt: new Date().toISOString(),
                approvedBy: 'system'
            })
            .select();
        
        if (adminError) {
            console.log('Error creando usuario admin:', adminError.message);
        } else {
            console.log('✅ Usuario admin creado exitosamente');
        }
        
        // Crear archivos de ejemplo
        const { data: files, error: filesError } = await supabase
            .from('files')
            .insert([
                {
                    filename: '3-reglas-oro-prompt.pdf',
                    originalName: '3 Reglas de Oro para un Buen Prompt.pdf',
                    mimeType: 'application/pdf',
                    size: 1200000,
                    path: '/uploads/3-reglas-oro-prompt.pdf',
                    createdAt: new Date().toISOString()
                },
                {
                    filename: '5-prompts-logo.pdf',
                    originalName: '5 Prompts Poderosos para Cambiar tu Logo.pdf',
                    mimeType: 'application/pdf',
                    size: 856000,
                    path: '/uploads/5-prompts-logo.pdf',
                    createdAt: new Date().toISOString()
                },
                {
                    filename: 'paso-paso-customgpt.pdf',
                    originalName: 'Paso a Paso para CustomGPT.pdf',
                    mimeType: 'application/pdf',
                    size: 1400000,
                    path: '/uploads/paso-paso-customgpt.pdf',
                    createdAt: new Date().toISOString()
                }
            ])
            .select();
        
        if (filesError) {
            console.log('Error creando archivos:', filesError.message);
        } else {
            console.log('✅ Archivos creados exitosamente');
        }
        
        console.log('🎉 Migración completada exitosamente');
    } catch (error) {
        console.error('Error en migración:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    migrateData();
}

module.exports = { migrateData };

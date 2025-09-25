const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
    try {
        console.log('🔐 Creando usuario administrador...');
        
        // Verificar si el admin ya existe
        const { data: existingAdmin } = await supabase
            .from('users')
            .select('email')
            .eq('email', 'felipe@reyesia.com')
            .single();

        if (existingAdmin) {
            console.log('⚠️ El usuario admin ya existe. Actualizando status...');
            
            // Actualizar el status a approved
            const { data: updatedAdmin, error: updateError } = await supabase
                .from('users')
                .update({ 
                    status: 'approved'
                })
                .eq('email', 'felipe@reyesia.com')
                .select()
                .single();

            if (updateError) {
                console.error('❌ Error actualizando admin:', updateError);
                return;
            }

            console.log('✅ Usuario admin actualizado correctamente:', updatedAdmin.email);
            return;
        }

        // Crear nuevo usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const { data: newAdmin, error } = await supabase
            .from('users')
            .insert({
                nombre: 'Felipe Reyes',
                email: 'felipe@reyesia.com',
                telefono: '+56912345678',
                empresa: 'ReyesIA',
                cargo: 'CEO',
                motivo: 'Administrador del sistema',
                password: hashedPassword,
                status: 'approved'
            })
            .select()
            .single();

        if (error) {
            console.error('❌ Error creando admin:', error);
            return;
        }

        console.log('✅ Usuario administrador creado correctamente!');
        console.log('📧 Email: felipe@reyesia.com');
        console.log('🔑 Contraseña: admin123');
        console.log('🎯 Status: approved');

    } catch (error) {
        console.error('❌ Error general:', error);
    }
}

// Ejecutar el script
createAdminUser();

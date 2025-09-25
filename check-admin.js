const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdmin() {
    try {
        console.log('🔍 Verificando usuario admin...');
        
        const { data: admin, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', 'felipe@reyesia.com')
            .single();

        if (error) {
            console.error('❌ Error:', error);
            return;
        }

        console.log('✅ Usuario admin encontrado:');
        console.log('📧 Email:', admin.email);
        console.log('👤 Nombre:', admin.nombre);
        console.log('🏢 Empresa:', admin.empresa);
        console.log('📱 Teléfono:', admin.telefono);
        console.log('✅ Status:', admin.status);
        
        // Probar diferentes contraseñas
        const passwords = ['admin123', 'admin', 'felipe123', 'reyesia123', '123456'];
        
        for (const password of passwords) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (isValid) {
                console.log('🔑 Contraseña correcta:', password);
                return;
            }
        }
        
        console.log('❌ Ninguna contraseña común funcionó');
        console.log('🔧 Necesitamos resetear la contraseña');

    } catch (error) {
        console.error('❌ Error general:', error);
    }
}

// Ejecutar el script
checkAdmin();

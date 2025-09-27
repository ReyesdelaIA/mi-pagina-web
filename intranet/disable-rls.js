// Script para desactivar RLS temporalmente en Supabase
const { createClient } = require('@supabase/supabase-js');

// Credenciales de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function disableRLS() {
    console.log('Desactivando RLS en Supabase...');
    
    try {
        // Eliminar políticas existentes y desactivar RLS para users
        console.log('Eliminando políticas y desactivando RLS para users...');
        await supabase.rpc('exec_sql', {
            sql: `
                DROP POLICY IF EXISTS "Allow authenticated read access" ON users;
                DROP POLICY IF EXISTS "Allow authenticated insert" ON users;
                DROP POLICY IF EXISTS "Allow authenticated update" ON users;
                ALTER TABLE users DISABLE ROW LEVEL SECURITY;
            `
        });

        // Eliminar políticas existentes y desactivar RLS para files
        console.log('Eliminando políticas y desactivando RLS para files...');
        await supabase.rpc('exec_sql', {
            sql: `
                DROP POLICY IF EXISTS "Allow authenticated read access" ON files;
                DROP POLICY IF EXISTS "Allow authenticated insert" ON files;
                DROP POLICY IF EXISTS "Allow authenticated delete" ON files;
                ALTER TABLE files DISABLE ROW LEVEL SECURITY;
            `
        });

        console.log('✅ RLS desactivado exitosamente');
        
    } catch (error) {
        console.error('Error desactivando RLS:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    disableRLS();
}

module.exports = { disableRLS };

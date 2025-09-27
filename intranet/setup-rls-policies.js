// Script para configurar políticas RLS en Supabase
const { createClient } = require('@supabase/supabase-js');

// Credenciales de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupRLSPolicies() {
    console.log('Configurando políticas RLS en Supabase...');
    
    try {
        // Habilitar RLS en tabla users
        console.log('Habilitando RLS para tabla users...');
        await supabase.rpc('exec_sql', {
            sql: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
        });

        // Política para que cualquier usuario autenticado pueda leer users (necesario para admin)
        console.log('Creando política de lectura para users...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated read access" ON users
                FOR SELECT USING (auth.role() = 'authenticated');
            `
        });

        // Política para que usuarios autenticados puedan insertar (registro)
        console.log('Creando política de inserción para users...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated insert" ON users
                FOR INSERT WITH CHECK (auth.role() = 'authenticated');
            `
        });

        // Política para que usuarios autenticados puedan actualizar (cambio de estado)
        console.log('Creando política de actualización para users...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated update" ON users
                FOR UPDATE USING (auth.role() = 'authenticated');
            `
        });

        // Habilitar RLS en tabla files
        console.log('Habilitando RLS para tabla files...');
        await supabase.rpc('exec_sql', {
            sql: `ALTER TABLE files ENABLE ROW LEVEL SECURITY;`
        });

        // Política para que usuarios autenticados puedan leer files
        console.log('Creando política de lectura para files...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated read access" ON files
                FOR SELECT USING (auth.role() = 'authenticated');
            `
        });

        // Política para que usuarios autenticados puedan insertar files
        console.log('Creando política de inserción para files...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated insert" ON files
                FOR INSERT WITH CHECK (auth.role() = 'authenticated');
            `
        });

        // Política para que usuarios autenticados puedan eliminar files
        console.log('Creando política de eliminación para files...');
        await supabase.rpc('exec_sql', {
            sql: `
                CREATE POLICY "Allow authenticated delete" ON files
                FOR DELETE USING (auth.role() = 'authenticated');
            `
        });

        console.log('✅ Políticas RLS configuradas exitosamente');
        
    } catch (error) {
        console.error('Error configurando políticas RLS:', error);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    setupRLSPolicies();
}

module.exports = { setupRLSPolicies };

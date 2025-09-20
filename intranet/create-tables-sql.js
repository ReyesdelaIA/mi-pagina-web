// Script para crear las tablas en Supabase usando SQL
const { createClient } = require('@supabase/supabase-js');

// Credenciales de Supabase
const supabaseUrl = 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
    console.log('Creando tablas en Supabase...');
    
    try {
        // Crear tabla users
        const { error: usersError } = await supabase.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    nombre TEXT,
                    empresa TEXT,
                    cargo TEXT,
                    telefono TEXT,
                    motivo TEXT,
                    status TEXT DEFAULT 'pending',
                    "createdAt" TIMESTAMP DEFAULT NOW(),
                    "approvedAt" TIMESTAMP,
                    "approvedBy" TEXT
                );
            `
        });
        
        if (usersError) {
            console.log('Error creando tabla users:', usersError.message);
        } else {
            console.log('✅ Tabla users creada exitosamente');
        }
        
        // Crear tabla files
        const { error: filesError } = await supabase.rpc('exec_sql', {
            sql: `
                CREATE TABLE IF NOT EXISTS files (
                    id SERIAL PRIMARY KEY,
                    filename TEXT NOT NULL,
                    "originalName" TEXT NOT NULL,
                    "mimeType" TEXT NOT NULL,
                    size INTEGER NOT NULL,
                    path TEXT NOT NULL,
                    "createdAt" TIMESTAMP DEFAULT NOW()
                );
            `
        });
        
        if (filesError) {
            console.log('Error creando tabla files:', filesError.message);
        } else {
            console.log('✅ Tabla files creada exitosamente');
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

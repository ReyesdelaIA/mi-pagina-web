// Script de diagnóstico para verificar el estado del sistema
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('intranet.db');

console.log('=== DIAGNÓSTICO DEL SISTEMA ===\n');

// Verificar si las tablas existen
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error('Error al verificar tablas:', err);
        return;
    }
    
    console.log('Tablas encontradas:', tables.map(t => t.name));
    
    // Verificar usuarios
    db.all('SELECT id, nombre, email, status, createdAt FROM users ORDER BY createdAt DESC', (err, users) => {
        if (err) {
            console.error('Error al cargar usuarios:', err);
            return;
        }
        
        console.log('\nUsuarios en la base de datos:');
        users.forEach(user => {
            console.log(`- ${user.nombre} (${user.email}) - Estado: ${user.status} - Creado: ${user.createdAt}`);
        });
        
        // Verificar archivos
        db.all('SELECT id, name, description, filename FROM files ORDER BY createdAt DESC', (err, files) => {
            if (err) {
                console.error('Error al cargar archivos:', err);
                return;
            }
            
            console.log('\nArchivos en la base de datos:');
            files.forEach(file => {
                console.log(`- ${file.name} (${file.filename})`);
            });
            
            db.close();
            console.log('\n=== DIAGNÓSTICO COMPLETADO ===');
        });
    });
});

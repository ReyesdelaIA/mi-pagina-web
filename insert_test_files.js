const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('intranet.db');

// Insertar archivos de prueba
const files = [
    {
        name: '3 reglas de oro para un buen Prompt',
        description: 'Manual esencial con las 3 reglas fundamentales para crear prompts efectivos que generen resultados excepcionales',
        filename: '3-reglas-oro-prompt.pdf',
        size: 1024000
    },
    {
        name: '5 Prompts poderosos para cambiar tu logo',
        description: 'Colección de prompts especializados para rediseñar y mejorar logos usando inteligencia artificial',
        filename: '5-prompts-logo.pdf',
        size: 856000
    },
    {
        name: 'Paso a paso para CustomGPT',
        description: 'Guía completa para crear tu propio GPT personalizado desde cero, con ejemplos prácticos',
        filename: 'paso-paso-customgpt.pdf',
        size: 1200000
    }
];

files.forEach(file => {
    db.run('INSERT INTO files (name, description, filename, size, createdAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)', 
        [file.name, file.description, file.filename, file.size], function(err) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log(`Archivo insertado: ${file.name}`);
        }
    });
});

db.close();

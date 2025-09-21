#!/usr/bin/env node

/**
 * Script para actualizar noticias automáticamente
 * Se puede ejecutar manualmente o configurar con cron
 */

const { scrapeAndSaveNews } = require('./news-scraper-simple');
const path = require('path');

async function main() {
    console.log('🔄 Iniciando actualización automática de noticias...');
    console.log('📅 Fecha:', new Date().toLocaleString());
    
    try {
        await scrapeAndSaveNews();
        console.log('✅ Actualización completada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error en la actualización:', error);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = main;

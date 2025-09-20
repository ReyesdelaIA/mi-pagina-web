#!/usr/bin/env node

const { getWeeklyNews } = require('./news-scraper');

console.log('🚀 Iniciando scraper de noticias semanales...');
console.log('📅 Fecha:', new Date().toLocaleDateString('es-ES'));

getWeeklyNews()
    .then(() => {
        console.log('✅ Scraping completado exitosamente!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error en el scraping:', error);
        process.exit(1);
    });

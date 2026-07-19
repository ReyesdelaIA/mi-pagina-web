#!/usr/bin/env node
/**
 * Registra en cada meta.json las imágenes que hay en su carpeta.
 *
 * Uso: deja los archivos dentro de bloques/<id>/ y corre
 *      node scripts/bloques/sync-assets.js
 *
 * Ordena poniendo primero cover.* (es la que usa el portal como imagen
 * principal del concepto) y después el resto, alfabéticamente.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', '..', 'bloques');
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const CDN = 'https://reyesia.com/bloques';

const orden = (a, b) => {
  const ca = a.toLowerCase().startsWith('cover');
  const cb = b.toLowerCase().startsWith('cover');
  if (ca !== cb) return ca ? -1 : 1;
  return a.localeCompare(b, 'es');
};

let cambiados = 0, revisados = 0;

for (const id of fs.readdirSync(BASE).sort()) {
  const dir = path.join(BASE, id);
  const metaPath = path.join(dir, 'meta.json');
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(metaPath)) continue;
  revisados++;

  const enDisco = fs.readdirSync(dir)
    .filter(f => EXT.has(path.extname(f).toLowerCase()));

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const yaDeclaradas = (meta.assets || []).filter(f => enDisco.includes(f));

  // No reordenamos lo ya declarado: la primera imagen es la portada y
  // puede estar en uso en sesiones ya construidas. Solo agregamos las nuevas.
  const nuevas = enDisco.filter(f => !yaDeclaradas.includes(f)).sort(orden);
  const imgs = [...yaDeclaradas, ...nuevas];

  const antes = JSON.stringify(meta.assets || []);
  if (antes === JSON.stringify(imgs)) continue;

  meta.assets = imgs;
  meta.assets_github = imgs.map(f => `${CDN}/${id}/${f}`);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');
  console.log(`  ✓ ${id}: ${imgs.length ? imgs.join(', ') : '(sin imágenes)'}`);
  cambiados++;
}

console.log(`\n${revisados} bloques revisados · ${cambiados} actualizados`);
if (cambiados) console.log('Recuerda regenerar el catálogo: node scripts/bloques/gen-catalogo.js');

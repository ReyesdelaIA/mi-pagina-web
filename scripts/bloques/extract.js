// Extrae bloques desde las sesiones segun config.json.
// Uso: node extract.js          -> dry-run (valida, no escribe)
//      node extract.js --write  -> escribe carpetas, PNGs y meta.json + manifest.json
const fs = require('fs');
const path = require('path');
const { parseSession } = require('./parse.js');

const ROOT = path.resolve(__dirname, '../..');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const WRITE = process.argv.includes('--write');
const BLOQUES_DIR = path.join(ROOT, 'bloques');
const BASE_URL = 'https://reyesia.com/bloques';

// cache de sesiones parseadas
const sessionCache = {};
function getCards(file){
  if(!sessionCache[file]) sessionCache[file] = parseSession(path.join(ROOT, file));
  return sessionCache[file];
}
function findCard(file, title){
  const cards = getCards(file);
  const matches = cards.filter(c => c.title === title);
  return { card: matches[0] || null, count: matches.length };
}

const manifest = [];
const problems = [];

for (const block of cfg.blocks){
  const entry = { id: block.id, emoji: block.emoji, categoria: block.categoria, tags: block.tags,
                  nombre: null, descripcion: null, pasos: [], pro_tip: null, desafio: null,
                  assets: [], assets_github: [], sources: [], imageCount: 0 };

  block.sources.forEach((src, si) => {
    const { card, count } = findCard(src.file, src.title);
    if (!card){ problems.push(`[${block.id}] NO match: "${src.title}" en ${src.file}`); return; }
    if (count > 1) problems.push(`[${block.id}] AMBIGUO (${count}): "${src.title}" en ${src.file}`);

    if (si === 0){ // fuente primaria define metadata
      entry.nombre = card.title;
      entry.descripcion = card.desc;
      entry.pasos = card.steps;
      entry.pro_tip = card.protip;
      entry.desafio = card.desafio;
    }
    entry.sources.push({ file: src.file, title: src.title, imgs: card.imgs.length, variant: si });

    // nombres de archivo: primaria sin sufijo, adicionales con _vN+1
    const suffix = si === 0 ? '' : `_v${si+1}`;
    card.imgs.forEach((img, idx) => {
      const buf = Buffer.from(img.b64, 'base64');
      // sniff real format por magic bytes (el data-URI miente a veces)
      let fext = 'bin';
      if (buf.length>=4 && buf[0]===0x89 && buf[1]===0x50 && buf[2]===0x4E && buf[3]===0x47) fext='png';
      else if (buf.length>=3 && buf[0]===0xFF && buf[1]===0xD8 && buf[2]===0xFF) fext='jpg';
      else if (buf.length>=4 && buf[0]===0x47 && buf[1]===0x49 && buf[2]===0x46) fext='gif';
      else if (buf.length>=12 && buf.toString('ascii',8,12)==='WEBP') fext='webp';
      const base = idx === 0 ? 'cover' : `paso${idx}`;
      const fname = `${base}${suffix}.${fext}`;
      entry.assets.push(fname);
      entry.assets_github.push(`${BASE_URL}/${block.id}/${fname}`);
      entry.imageCount++;
      if (WRITE){
        fs.mkdirSync(path.join(BLOQUES_DIR, block.id), { recursive: true });
        fs.writeFileSync(path.join(BLOQUES_DIR, block.id, fname), buf);
      }
    });
  });

  if (WRITE){
    fs.mkdirSync(path.join(BLOQUES_DIR, block.id), { recursive: true });
    const meta = {
      id: entry.id, nombre: entry.nombre, emoji: entry.emoji, descripcion: entry.descripcion,
      categoria: entry.categoria, tags: entry.tags, pasos: entry.pasos,
      pro_tip: entry.pro_tip, desafio: entry.desafio,
      assets: entry.assets, assets_github: entry.assets_github, sources: entry.sources
    };
    fs.writeFileSync(path.join(BLOQUES_DIR, block.id, 'meta.json'), JSON.stringify(meta, null, 2));
  }

  manifest.push(entry);
}

if (WRITE){
  fs.writeFileSync(path.join(__dirname, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

// reporte
console.log(`Bloques: ${manifest.length} | modo: ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
console.log('--- resumen ---');
manifest.forEach(b => {
  console.log(`${b.imageCount===0?'⚠ ':'  '}${b.id.padEnd(32)} imgs=${b.imageCount} pasos=${b.pasos.length} protip=${b.pro_tip?'Y':'-'} desafio=${b.desafio?'Y':'-'} cat=${b.categoria}`);
});
const noimg = manifest.filter(b => b.imageCount===0).map(b=>b.id);
console.log(`\nSin imagenes (${noimg.length}): ${noimg.join(', ')}`);
if (problems.length){ console.log(`\n!!! PROBLEMAS (${problems.length}):`); problems.forEach(p=>console.log('  '+p)); }
else console.log('\nOK: todas las fuentes resolvieron a un card unico.');

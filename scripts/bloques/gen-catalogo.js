// Genera bloques/CATALOGO.md leyendo todos los bloques/*/meta.json. Re-ejecutable.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const DIR = path.join(ROOT, 'bloques');

const blocks = fs.readdirSync(DIR)
  .filter(d => fs.existsSync(path.join(DIR, d, 'meta.json')))
  .map(d => JSON.parse(fs.readFileSync(path.join(DIR, d, 'meta.json'), 'utf8')));

const byCat = {};
for (const b of blocks) (byCat[b.categoria || 'sin-categoria'] ||= []).push(b);

const catOrder = ['fundamentos', 'copilot', 'agentes', 'herramientas-ia', 'mundo-visual'];
const cats = [...new Set([...catOrder, ...Object.keys(byCat)])].filter(c => byCat[c]);

let md = `# Catálogo de bloques — Biblioteca de sesiones\n\n`;
md += `_Generado automáticamente desde \`bloques/*/meta.json\` con \`node scripts/bloques/gen-catalogo.js\`._\n`;
md += `_Total: ${blocks.length} bloques. Para armar una sesión: dime empresa + nº + lista de IDs._\n\n`;

for (const c of cats) {
  const items = byCat[c].sort((a, b) => a.id.localeCompare(b.id));
  md += `## ${c} (${items.length})\n\n`;
  md += `| id | nombre | imgs | pasos | pro tip |\n|---|---|---|---|---|\n`;
  for (const b of items) {
    const imgs = (b.assets_github || []).length;
    const flag = imgs === 0 ? ' ⚠️' : '';
    md += `| \`${b.id}\` | ${b.nombre || ''} | ${imgs}${flag} | ${(b.pasos || []).length} | ${b.pro_tip ? '✓' : '—'} |\n`;
  }
  md += `\n`;
}

const sinImg = blocks.filter(b => !(b.assets_github || []).length).map(b => b.id);
md += `---\n\n`;
md += `**⚠️ Bloques sin imágenes (${sinImg.length})** — necesitan capturas antes de quedar visuales: ${sinImg.map(x => '`' + x + '`').join(', ') || 'ninguno'}.\n\n`;
md += `**Cómo pedir una sesión:** _"hagamos la S[N] de [empresa] con [id1], [id2], [id3]..."_ → yo verifico cada bloque en \`bloques_sesion\`, armo el resumen ejecutivo \`/sesion[NN]-[empresa]\`, actualizo el portal \`/[empresa]\` (\`company_sessions\` + quiz/thumbnails/desafío) y hago push.\n`;

fs.writeFileSync(path.join(DIR, 'CATALOGO.md'), md);
console.log('OK bloques/CATALOGO.md —', blocks.length, 'bloques,', sinImg.length, 'sin imágenes');

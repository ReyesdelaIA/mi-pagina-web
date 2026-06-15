// Injerta la SEGUNDA visual de cada agente desde S03-newell en S04-newell:
//  - Investigador: recuadro hint-box con cita de Satya Nadella (img + texto)
//  - Analista: imagen de detalle de interfaz
// Se insertan antes del bloque .idea-pro (pro-tip). Idempotente.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const src = fs.readFileSync(path.join(ROOT, 'sesion03-newell/index.html'), 'utf8');
const DST = path.join(ROOT, 'sesion04-newell/index.html');
let dst = fs.readFileSync(DST, 'utf8');

// Extrae un <div>...</div> balanceado a partir del índice de su '<div'
function balancedDiv(html, start) {
  let i = start, depth = 0;
  const open = /<div\b/g, close = /<\/div>/g;
  // recorre secuencialmente
  let p = start;
  while (p < html.length) {
    const o = html.indexOf('<div', p);
    const c = html.indexOf('</div>', p);
    if (c < 0) break;
    if (o >= 0 && o < c) { depth++; p = o + 4; }
    else { depth--; p = c + 6; if (depth === 0) return html.slice(start, c + 6); }
  }
  throw new Error('div no balanceado');
}

// 1) Investigador: hint-box de Satya
const hbStart = src.indexOf('<div class="hint-box hint-copilot"');
const satyaBlock = balancedDiv(src, hbStart);

// 2) Analista: img con alt "Analista interfaz detalle" (base64 enorme: buscar el <img hacia atrás)
const aAlt = src.indexOf('alt="Analista interfaz detalle"');
const aImgStart = src.lastIndexOf('<img', aAlt);
const aImgTag = src.slice(aImgStart, src.indexOf('>', aAlt) + 1);

// Inserta `block` antes del .idea-pro de la card cuyo título == title (en dst). Idempotente via guard.
function insertBeforeProtip(html, title, block, guard) {
  const t = html.indexOf(`<div class="card-title">${title}</div>`);
  if (t < 0) throw new Error('no card en DST: ' + title);
  const nextCard = html.indexOf('<div class="card"', t + 10);
  const cardEnd = nextCard > 0 ? nextCard : html.length;
  if (html.slice(t, cardEnd).includes(guard)) { console.log('  ya presente, skip: ' + title); return html; }
  const idea = html.indexOf('<div class="idea-pro">', t);
  if (idea < 0 || idea > cardEnd) throw new Error('no idea-pro en card: ' + title);
  return html.slice(0, idea) + block + '\n\n        ' + html.slice(idea);
}

dst = insertBeforeProtip(dst, 'Agente Investigador', satyaBlock, 'hint-copilot');
console.log('Investigador: hint-box Satya injertado (' + satyaBlock.length + ' chars)');
dst = insertBeforeProtip(dst, 'Agente Analista', aImgTag, 'Analista interfaz detalle');
console.log('Analista: img detalle injertada (' + aImgTag.length + ' chars)');

fs.writeFileSync(DST, dst);
console.log('OK', DST, dst.length, 'bytes');

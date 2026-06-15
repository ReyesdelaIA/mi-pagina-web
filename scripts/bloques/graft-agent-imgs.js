// Injerta la imagen líder de las cards de agentes de S03-newell en las cards
// (texto) de S04-newell. Idempotente: no duplica si ya hay <img> en el body.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'sesion03-newell/index.html');
const DST = path.join(ROOT, 'sesion04-newell/index.html');

const src = fs.readFileSync(SRC, 'utf8');
let dst = fs.readFileSync(DST, 'utf8');

// Extrae el primer <img ...> que sigue al card-body de la card cuyo título == title (en src)
function leadImg(html, title) {
  const t = html.indexOf(`<div class="card-title">${title}</div>`);
  if (t < 0) throw new Error('no card en SRC: ' + title);
  const body = html.indexOf('<div class="card-body">', t);
  const imgStart = html.indexOf('<img', body);
  const imgEnd = html.indexOf('>', imgStart) + 1; // <img .../> termina en el primer '>'
  if (imgStart < 0 || imgStart > html.indexOf('<div class="card"', t + 10) && html.indexOf('<div class="card"', t + 10) > 0)
    throw new Error('no img en SRC card: ' + title);
  return html.slice(imgStart, imgEnd);
}

// Inserta imgTag justo después del card-body de la card title en dst (si no tiene ya img)
function insertAfterBody(html, title, imgTag) {
  const t = html.indexOf(`<div class="card-title">${title}</div>`);
  if (t < 0) throw new Error('no card en DST: ' + title);
  const bodyTag = '<div class="card-body">';
  const body = html.indexOf(bodyTag, t);
  // límites de esta card (hasta la próxima card o fin)
  const nextCard = html.indexOf('<div class="card"', t + 10);
  const cardEnd = nextCard > 0 ? nextCard : html.length;
  // ¿ya tiene img en el body de esta card?
  const existingImg = html.indexOf('<img', body);
  if (existingImg > 0 && existingImg < cardEnd) {
    console.log('  ya tiene img, skip: ' + title);
    return html;
  }
  const insertAt = body + bodyTag.length;
  return html.slice(0, insertAt) + '\n      ' + imgTag + html.slice(insertAt);
}

const pairs = [
  ['Agente Investigador', 'Agente Investigador'],
  ['Agente Analista', 'Agente Analista'],
];

for (const [srcTitle, dstTitle] of pairs) {
  const img = leadImg(src, srcTitle);
  dst = insertAfterBody(dst, dstTitle, img);
  console.log('injertada lead img en: ' + dstTitle + ' (' + img.length + ' chars)');
}

fs.writeFileSync(DST, dst);
console.log('OK', DST, dst.length, 'bytes');

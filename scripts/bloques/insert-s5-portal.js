// Inserta THUMBS[5], CHALLENGES[5] y QUIZZES[5] en newell/index.html. Quiz con correctas desordenadas.
const fs = require('fs');
const path = require('path');
const F = path.resolve(__dirname, '../../newell/index.html');
let h = fs.readFileSync(F, 'utf8');

function closeIdx(name) {
  const i = h.indexOf('const ' + name);
  let d = 0, s = false;
  for (let j = i; j < h.length; j++) {
    if (h[j] === '{') { d++; s = true; }
    else if (h[j] === '}') { d--; if (s && d === 0) return j; }
  }
  throw new Error('no close ' + name);
}
function insertBeforeClose(name, text, guard) {
  if (h.includes(guard)) { console.log('  ya presente, skip ' + name); return; }
  const j = closeIdx(name);
  h = h.slice(0, j) + text + h.slice(j);
  console.log('  insertado ' + name);
}

const THUMBS5 = `  5: ['/newell/thumbs/s5_thumb1.jpg','/newell/thumbs/s5_thumb2.jpg','/newell/thumbs/s5_thumb3.jpg'],\n`;

const CHALLENGES5 = `    5: 'Crea una pieza de campaña de punta a punta:<br>1. Genera una imagen de producto con tu marca (Crear con Copilot o Gemini).<br>2. Anímala con <strong>image-to-video en Gemini</strong> para un reel.<br>3. Si la imagen base estaba pixelada, pásala antes por <strong>Krea.ai</strong>.<br>Comparte el resultado con tu equipo. 🎬',\n`;

const QUIZZES5 = `    5: [
      {
        q: '¿Qué permite hacer "Crear con Copilot" para marketing?',
        opts: ['Solo escribir correos.', 'Solo crear tablas de Excel.', 'Generar imágenes y pósters e insertar el logo de tu marca en una escena realista (mockups).', 'Nada visual, solo texto.'],
        correct: 2,
        explain: 'Desde "Crear" en Copilot generas imágenes, pósters, infografías y más. Con "Insertar un logotipo en una escena" puedes integrar el logo de la marca de forma realista — ideal para mockups de campaña.',
      },
      {
        q: 'Al generar imágenes pro de producto con ChatGPT o Gemini, ¿qué conviene hacer?',
        opts: ['Subir una foto real del producto como referencia y dar un prompt con superficie, fondo, estilo y uso final.', 'Pedir "una foto linda" sin más contexto.', 'Usar siempre la menor resolución posible.', 'Evitar mencionar la marca o el producto.'],
        correct: 0,
        explain: 'La foto de referencia mantiene la fidelidad del producto, y un prompt detallado (superficie + fondo + estilo + uso final) define la calidad del resultado. Mientras más específico, mejor.',
      },
      {
        q: 'Sobre los videos con Gemini, ¿qué es cierto?',
        opts: ['Requiere pagar una licencia aparte.', 'Solo genera videos de una hora.', 'No acepta fotos como punto de partida.', 'Se activa gratis con tu Gmail (~3 videos/día) y permite text-to-video e image-to-video (animar una foto real).'],
        correct: 3,
        explain: 'Gemini se activa gratis con tu cuenta de Gmail y permite generar video desde texto o animar una foto real (image-to-video) — perfecto para reels de marketing sin rodaje.',
      },
      {
        q: '¿Por qué usar Ideogram en modo "Design" para logos y mockups?',
        opts: ['Porque es el único generador gratis que existe.', 'Es el más confiable para que el texto y el nombre de la marca salgan bien escritos dentro del diseño.', 'Porque solo trabaja en blanco y negro.', 'Porque no necesita ningún prompt.'],
        correct: 1,
        explain: 'La mayoría de generadores distorsionan el texto. Ideogram en modo Design es el más confiable para que el nombre de la marca aparezca legible y bien escrito — clave en branding y mockups.',
      },
      {
        q: '¿Para qué sirve Krea.ai en marketing?',
        opts: ['Para borrar el fondo de una foto.', 'Para escribir el copy de la campaña.', 'Para subir la resolución de fotos pixeladas o de baja calidad y dejarlas listas para valla o catálogo.', 'Para componer la música de un reel.'],
        correct: 2,
        explain: 'Krea.ai (cuenta gratis) reconstruye detalle y sube la resolución de imágenes pixeladas o borrosas, dejándolas listas para impresión de gran formato o catálogo.',
      },
    ],
`;

insertBeforeClose('THUMBS', THUMBS5, "s5_thumb1.jpg");
insertBeforeClose('CHALLENGES', CHALLENGES5, "Crea una pieza de campaña de punta a punta");
insertBeforeClose('QUIZZES', QUIZZES5, '¿Qué permite hacer "Crear con Copilot" para marketing?');

fs.writeFileSync(F, h);
console.log('OK', F);

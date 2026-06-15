// Ensambla sesion05-newell/index.html (sesión marketing) clonando el template de sesion03-newell
// y reutilizando imágenes de la biblioteca bloques/{id}/ (embebidas en base64). Tono marketing.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'sesion03-newell/index.html');
const OUT = path.join(ROOT, 'sesion05-newell/index.html');

const tpl = fs.readFileSync(SRC, 'utf8');

// --- HEAD (hasta HEADER) con title S05 ---
let head = tpl.slice(0, tpl.indexOf('<!-- HEADER -->'));
head = head.replace(/<title>[\s\S]*?<\/title>/, '<title>Sesión 5 · IA para Marketing · Reyes IA</title>');
head = head.replace(/Sesión 03/g, 'Sesión 05').replace(/Copilot Agentes/g, 'IA para Marketing');

// --- toggle() del script (sin quiz) ---
const sStart = tpl.indexOf('<script>');
const toggleJs = tpl.slice(sStart + '<script>'.length, tpl.indexOf('const QUIZ', sStart)).trimEnd();

// --- helper imagen base64 desde biblioteca ---
function imgB64(id, file, bg) {
  const buf = fs.readFileSync(path.join(ROOT, 'bloques', id, file));
  const mime = (buf[0] === 0x89 && buf[1] === 0x50) ? 'image/png' : 'image/jpeg';
  const b64 = buf.toString('base64');
  return `<img src="data:${mime};base64,${b64}" alt="" style="width:100%;max-height:440px;object-fit:contain;background:${bg};display:block;padding:16px 0;" />`;
}

const esc = s => s; // contenido ya en texto plano seguro

function stepsHtml(steps) {
  return `<ol class="steps">\n` + steps.map((t, i) =>
    `          <li class="step"><div class="step-num" style="background:#E6F1FB;color:#185FA5;">${i + 1}</div><div class="step-text">${esc(t)}</div></li>`
  ).join('\n') + `\n        </ol>`;
}
function protipHtml(label, text) {
  return `<div class="idea-pro">
          <div class="idea-pro-icon">💡</div>
          <div class="idea-pro-content">
            <div class="idea-pro-label">${label}</div>
            <div class="idea-pro-text">${esc(text)}</div>
          </div>
        </div>`;
}
function card(c) {
  const imgs = (c.imgs || []).map(im => imgB64(im.id, im.file, im.bg)).join('\n      ');
  const placeholder = c.placeholder
    ? `<div style="width:100%;padding:34px 16px;background:#FFF4E5;border:1px dashed #E0B872;border-radius:10px;text-align:center;color:#9A6B12;font-weight:600;margin-bottom:6px;">🎵 Captura próximamente — pendiente de pantallazo</div>`
    : '';
  return `  <div class="card" onclick="toggle(this)">
    <div class="card-header">
      <div class="icon" style="background:${c.iconBg};">${c.emoji}</div>
      <div>
        <div class="card-title">${c.title}</div>
        <div class="card-desc">${c.desc}</div>
      </div>
      <div class="chevron">▼</div>
    </div>
    <div class="card-body">
      ${imgs}${placeholder}
      <div class="body-content">
        ${stepsHtml(c.steps)}
        ${protipHtml(c.protipLabel || 'Pro tip', c.protip)}
      </div>
    </div>
  </div>`;
}

// --- CONTENIDO (marketing) ---
const cards = [
  {
    emoji: '✨', iconBg: '#EAF7EE', title: 'Crear con Copilot',
    desc: 'Mockups, imágenes y piezas visuales para marketing — sin salir de M365',
    imgs: [{ id: 'crear-con-copilot', file: 'cover.jpg', bg: '#f0f4f8' }, { id: 'crear-con-copilot', file: 'paso1.jpg', bg: '#f0f4f8' }],
    steps: [
      'En Copilot (web o app M365) haz clic en <strong>"Crear"</strong> en el menú lateral. Es la puerta de entrada para generar piezas visuales: imágenes, videos, infografías, pósters e historias.',
      'Para campañas: elige <strong>"Crear una imagen"</strong> o <strong>"Diseñar un póster"</strong> y describe la pieza (producto, mensaje, formato — feed, story, banner).',
      'Mockups con tu marca: selecciona <strong>"Insertar un logotipo en una escena"</strong> y sube el logo de Newell — Copilot lo integra de forma realista (packaging, vitrinas, vallas).',
      'Afina con opciones avanzadas: <strong>Estilo, Marca y color, Tamaño</strong>. Usa "Transformar con IA" para iterar una pieza ya generada.',
    ],
    protip: 'Genera un mockup de un producto Newell con el logo insertado en una escena real (góndola, hogar, exterior). Ideal para presentar conceptos de campaña en minutos, sin brief a agencia.',
  },
  {
    emoji: '🖌️', iconBg: '#FBEAF0', title: 'Imágenes Pro para campañas',
    desc: 'ChatGPT y Gemini para fotos de producto, campañas y brand guide',
    imgs: [{ id: 'imagenes-pro', file: 'cover.jpg', bg: '#fdf2f8' }],
    steps: [
      'Sube una <strong>foto real del producto</strong> (packaging, objeto) como referencia. ChatGPT y Gemini la usan como base para mantener fidelidad de marca.',
      'Escribe un prompt detallado con contexto, ambientación y estilo. Ej: <em>"Foto publicitaria del producto sobre mármol blanco, luz de estudio, fondo minimalista, estilo editorial premium, formato cuadrado para Instagram."</em>',
      '<strong>Gemini</strong> fue destacado como el mejor modelo para imágenes pro en 2026 (luego ChatGPT/DALL·E). Úsalo para fotos de producto, lifestyle y conceptos de campaña.',
      '<strong>Brand guide:</strong> pide variaciones consistentes (misma paleta, tipografía y tono) e itera en la misma conversación: cambia fondo, color o agrega personas.',
    ],
    protip: 'Especifica siempre superficie + fondo + estilo + uso final (feed, valla, catálogo). Para brand guide, fija la paleta y pide "mantén estos colores y este estilo en todas las variaciones".',
  },
  {
    emoji: '🎬', iconBg: '#FDECEC', title: 'Videos con IA (Gemini)',
    desc: 'Activa Gemini gratis con tu Gmail — text-to-video e image-to-video',
    imgs: [{ id: 'videos-con-ia', file: 'cover.jpg', bg: '#fef2f2' }],
    steps: [
      '<strong>Activa tu cuenta gratis:</strong> entra a gemini.google.com con tu Gmail. Ya tienes acceso a generación de video — hasta ~3 videos al día sin costo.',
      '<strong>Text-to-video:</strong> describe la escena y Gemini (Veo) la genera desde cero. Ideal para clips de campaña, intros y contenido para redes.',
      '<strong>Image-to-video:</strong> sube una foto real (un producto, o incluso una foto tuya) y pídele que la anime — la imagen "cobra vida" con movimiento de cámara, gestos o efectos.',
      'Mejora tus prompts: escribe la idea en español y pídele a Gemini o Claude que la convierta en un prompt de video más cinematográfico antes de generar.',
    ],
    protip: 'Para marketing, el image-to-video es oro: anima una foto de producto o una toma del equipo para un reel sin rodaje. Empieza con clips cortos y prueba distintos movimientos de cámara.',
  },
  {
    emoji: '🖼️', iconBg: '#EEF3FE', title: 'Napkin — Infografías',
    desc: 'Convierte cualquier texto en una infografía visual con un clic',
    imgs: [{ id: 'napkin-infografias', file: 'cover.jpg', bg: '#eef3fe' }],
    steps: [
      'Entra a <strong>napkin.ai</strong> y crea una cuenta gratuita.',
      'Pega o escribe tu texto (un mensaje de campaña, datos, un proceso). Napkin lo analiza automáticamente.',
      'Haz clic en el ícono de <strong>rayo (⚡)</strong> junto a cualquier párrafo para generar un visual.',
      'Elige el estilo de infografía (flowchart, diagrama, lista visual) que mejor comunique tu mensaje.',
      'Descarga como PNG, SVG o PDF para usar en presentaciones, redes o reportes.',
    ],
    protip: 'Genera primero el copy con ChatGPT/Claude y luego pégalo en Napkin. Pasas de texto a infografía lista para redes o un one-pager ejecutivo en segundos.',
  },
  {
    emoji: '🎭', iconBg: '#F3EEFC', title: 'Logos & Mockups (Ideogram)',
    desc: 'Logos, mockups de producto y diseños con texto legible y preciso',
    imgs: [{ id: 'logos-ideogram', file: 'cover.jpg', bg: '#f3eefc' }],
    steps: [
      'Entra a <strong>ideogram.ai</strong> y crea una cuenta gratuita.',
      'Activa el modo <strong>"Design"</strong>: optimiza el modelo para logos, tipografía y diseño con texto legible dentro de la imagen.',
      'Describe el logo o pieza: nombre de marca, estilo, colores e íconos. Ej: <em>"Logo minimalista para [marca], ícono de hoja, tipografía moderna, fondo claro."</em>',
      'Ideogram genera <strong>4 variaciones</strong>. Elige una para remix, cambiar colores o pedir variantes de estilo.',
      '<strong>Mockups de producto:</strong> perfumes, latas, jabones, packaging — con el nombre de tu marca integrado de forma realista.',
    ],
    protip: 'La mayoría de generadores distorsionan el texto; Ideogram en modo Design es el más confiable para que el nombre de la marca salga bien escrito — clave para branding y mockups.',
  },
  {
    emoji: '🔍', iconBg: '#E7F5F0', title: 'Mejorar imágenes (Krea.ai)',
    desc: 'Sube la resolución de fotos pixeladas o de baja calidad — cuenta gratis',
    imgs: [{ id: 'enhancer-upscale', file: 'cover.jpg', bg: '#e7f5f0' }],
    steps: [
      'Entra a <strong>krea.ai</strong> (cuenta gratis) y sube tu foto pixelada, borrosa o de baja resolución. También sirven Remini, Adobe Enhance o Topaz.',
      'Ajusta parámetros: <strong>AI Strength</strong> (intensidad), <strong>Resemblance</strong> (fidelidad al original) y <strong>Clarity</strong> (nitidez). Empieza con valores moderados.',
      'Elige el factor de escala (2x, 4x, 8x) según el uso: pantalla vs. impresión de gran formato.',
      'La IA reconstruye detalle y sube la resolución sin distorsionar. Descarga en alta calidad.',
    ],
    protip: 'Súper útil para marketing: rescata una foto de producto antigua o de baja calidad y déjala lista para una valla o catálogo. También revive fotos familiares de los 70s y 80s.',
  },
  {
    emoji: '🎵', iconBg: '#FFF4E5', title: 'Música con IA (Gemini)',
    desc: 'Crea canciones y jingles originales con Gemini (modelo Lyria 3)',
    imgs: [{ id: 'musica-gemini', file: 'cover.jpg', bg: '#fff4e5' }, { id: 'musica-gemini', file: 'paso1.jpg', bg: '#fff4e5' }],
    steps: [
      'En <strong>Gemini</strong> (gratis con tu Gmail), haz clic en el botón <strong>"+"</strong> → <strong>"Más herramientas"</strong> → <strong>"Crear música"</strong>. Gemini genera canciones con el modelo <strong>Lyria 3</strong>.',
      'Elige una <strong>plantilla de género</strong> (Pop latino, Reguetón, Balada folk, 8 bits, R&B, Cine, Kawaii metal y más) o escribe tu propia idea en <em>"Describe la pista musical"</em>.',
      'Especifica estilo, mood y letra: puedes darle la letra tú o pedirle que la escriba. Indica idioma, tono y duración aproximada.',
      'Escucha el resultado e itera (ritmo, instrumentos, letra) y descarga la pista para reels, videos de producto o presentaciones — música original, sin problemas de derechos de autor.',
    ],
    protip: 'Un jingle corto y pegajoso con el nombre de la marca funciona increíble en reels y stories. Genera 2-3 versiones y prueba cuál conecta más con tu audiencia.',
  },
];

const header = `<!-- HEADER -->
  <div class="header">
    <div class="header-badge">Newell Brands · Programa Adopción Profunda de IA</div>
    <div class="header-title">Resumen ejecutivo clase 5 [S05]</div>
    <div class="header-sub">IA generativa para equipos de marketing: imágenes, video, logos, infografías y música</div>
    <div class="header-tags">
      <span class="tag">Crear con Copilot</span>
      <span class="tag">Imágenes Pro</span>
      <span class="tag">Video (Gemini)</span>
      <span class="tag">Ideogram</span>
      <span class="tag">Napkin</span>
      <span class="tag">Krea.ai</span>
      <span class="tag">Música</span>
    </div>
  </div>

  <div class="section-label">Herramientas de la sesión</div>
`;

const tail = `  <div class="divider"></div>

  <!-- FOOTER -->
  <div class="footer">
    Sesión 05 · Programa Adopción Profunda de IA · <strong>Reyes IA</strong> · @reyesdelaIA
  </div>

</div>
</div>

<script>
${toggleJs}
</script>
</body>
</html>`;

const out = head + header + '\n' + cards.map(card).join('\n\n') + '\n\n' + tail;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('OK', OUT, out.length, 'bytes,', cards.length, 'cards');

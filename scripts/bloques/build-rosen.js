// Ensambla los resúmenes ejecutivos sesionNN-rosen/index.html
// Branding Rosen (navy/gold). Imágenes de la biblioteca bloques/{id}/ embebidas en base64.
// Uso: node scripts/bloques/build-rosen.js
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');

function imgB64(id, file, bg) {
  const p = path.join(ROOT, 'bloques', id, file);
  const buf = fs.readFileSync(p);
  const mime = (buf[0] === 0x89 && buf[1] === 0x50) ? 'image/png' : 'image/jpeg';
  return `<img src="data:${mime};base64,${buf.toString('base64')}" alt="" style="width:100%;max-height:440px;object-fit:contain;background:${bg};display:block;padding:16px 0;border-radius:10px;" />`;
}

function stepsHtml(steps) {
  if (!steps || !steps.length) return '';
  return `<ol class="steps">\n` + steps.map((t, i) =>
    `        <li class="step"><div class="step-num">${i + 1}</div><div class="step-text">${t}</div></li>`
  ).join('\n') + `\n      </ol>`;
}

function protipHtml(text) {
  if (!text) return '';
  return `<div class="protip">
        <div class="protip-icon">💡</div>
        <div class="protip-body"><div class="protip-label">Pro tip</div><div class="protip-text">${text}</div></div>
      </div>`;
}

function cardHtml(c) {
  const imgs = (c.imgs || []).map(im => imgB64(im.id, im.file, im.bg || '#f0f0ee')).join('\n      ');
  return `  <div class="card" onclick="toggle(this)">
    <div class="card-header">
      <div class="icon">${c.emoji}</div>
      <div class="card-head-text">
        <div class="card-title">${c.title}</div>
        <div class="card-desc">${c.desc}</div>
      </div>
      <div class="chevron">▼</div>
    </div>
    <div class="card-body">
      ${imgs}
      ${stepsHtml(c.steps)}
      ${protipHtml(c.protip)}
    </div>
  </div>`;
}

function page(s) {
  const cards = s.cards.map(cardHtml).join('\n');
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Sesión ${s.n} · ${s.title} · Rosen · Reyes IA</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{--navy:#042C53;--navy-mid:#0C447C;--navy-light:#185FA5;--bg:#f0f0ee;--white:#fff;--border:#e0e0e0;--text:#1a1a1a;--muted:#6b7280;--gold:#F5A623;--radius:16px;}
    body{font-family:'Poppins',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
    nav{background:linear-gradient(135deg,var(--navy),var(--navy-mid) 60%,var(--navy-light));position:sticky;top:0;z-index:100;padding:0 20px;height:60px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 12px rgba(4,44,83,.3);}
    nav img{height:34px;object-fit:contain;}
    .nav-back{color:rgba(255,255,255,.9);text-decoration:none;font-size:13px;font-weight:600;padding:7px 14px;border-radius:20px;background:rgba(255,255,255,.12);transition:background .2s;}
    .nav-back:hover{background:rgba(255,255,255,.22);}
    .hero{background:linear-gradient(135deg,var(--navy),var(--navy-mid) 50%,var(--navy-light));color:#fff;padding:34px 20px 30px;position:relative;overflow:hidden;}
    .hero::after{content:'';position:absolute;bottom:-60px;right:-20px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.04);}
    .hero-inner{max-width:720px;margin:0 auto;position:relative;z-index:1;}
    .hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(245,166,35,.18);border:1px solid rgba(245,166,35,.4);color:#FFD58A;border-radius:20px;padding:4px 13px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:14px;}
    .hero h1{font-size:26px;font-weight:800;line-height:1.15;margin-bottom:8px;}
    .hero p{font-size:13.5px;opacity:.8;line-height:1.5;}
    .wrap{max-width:720px;margin:0 auto;padding:24px 20px 48px;}
    .sec-label{font-size:12px;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px;}
    .card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:12px;transition:box-shadow .2s;}
    .card:hover{box-shadow:0 3px 14px rgba(4,44,83,.09);}
    .card-header{display:flex;align-items:center;gap:14px;padding:16px;cursor:pointer;}
    .icon{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,#eef4fb,#dce9f7);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
    .card-head-text{flex:1;min-width:0;}
    .card-title{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:2px;}
    .card-desc{font-size:12px;color:var(--muted);line-height:1.4;}
    .chevron{color:var(--navy-light);font-size:13px;transition:transform .3s;flex-shrink:0;}
    .card.open .chevron{transform:rotate(180deg);}
    .card-body{max-height:0;overflow:hidden;transition:max-height .4s ease;padding:0 16px;}
    .card.open .card-body{max-height:3000px;padding:0 16px 18px;}
    .steps{list-style:none;display:flex;flex-direction:column;gap:11px;margin:8px 0 4px;}
    .step{display:flex;gap:11px;align-items:flex-start;}
    .step-num{width:24px;height:24px;border-radius:7px;background:#E6F1FB;color:var(--navy-light);font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
    .step-text{font-size:13px;line-height:1.55;color:#2a2a2a;}
    .protip{display:flex;gap:10px;background:linear-gradient(135deg,#FFF8EC,#FFF3DC);border:1px solid #F5CC7A;border-radius:12px;padding:13px 14px;margin-top:14px;}
    .protip-icon{font-size:18px;}
    .protip-label{font-size:10px;font-weight:800;color:#7A4F00;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;}
    .protip-text{font-size:12.5px;color:#5C3D00;line-height:1.55;}
    footer{text-align:center;padding:24px 20px 36px;font-size:11px;color:#aaa;}
    footer a{color:var(--navy-light);text-decoration:none;font-weight:500;}
    @media(max-width:420px){.hero h1{font-size:22px;}.wrap{padding:20px 14px 40px;}}
  </style>
</head>
<body>
  <nav>
    <img src="/logo reyes IA horizontal blanco.png" alt="Reyes IA" />
    <a class="nav-back" href="/rosen">← Volver al portal</a>
  </nav>
  <div class="hero">
    <div class="hero-inner">
      <div class="hero-badge">🏢 Rosen · Sesión ${s.n}</div>
      <h1>${s.title}</h1>
      <p>${s.subtitle}</p>
    </div>
  </div>
  <div class="wrap">
    <div class="sec-label">Resumen ejecutivo · ${s.cards.length} ${s.cards.length === 1 ? 'bloque' : 'bloques'}</div>
${cards}
  </div>
  <footer>Programa Adopción Profunda de IA · facilitado por <a href="https://reyesia.com" target="_blank">Reyes IA</a> · Felipe Reyes</footer>
  <script>
    function toggle(el){ el.classList.toggle('open'); }
  </script>
</body>
</html>`;
}

// ---------- CONTENIDO POR SESIÓN (texto adaptado a Rosen: colchones/muebles, Gemini/Workspace) ----------
const SESSIONS = [
  {
    n: 4, slug: 'sesion04-rosen', title: 'NotebookLM + Gems y Agentes',
    subtitle: 'Convierte tus documentos y fuentes en una base de conocimiento con superpoderes de análisis.',
    cards: [
      {
        emoji: '📓', title: 'NotebookLM', desc: 'Tus fuentes con superpoderes — PDFs, webs, YouTube y más',
        imgs: [{ id: 'notebooklm', file: 'cover.jpg' }, { id: 'notebooklm', file: 'paso1.jpg' }],
        steps: [
          'Accede desde <strong>notebooklm.google.com</strong> o desde el menú de apps de Google (cuadrícula de 9 puntos → NotebookLM).',
          'Crea un cuaderno nuevo y sube tus fuentes: PDFs, documentos de Google, sitios web, videos de YouTube o archivos de audio.',
          'El panel tiene 3 zonas: <strong>(izq.)</strong> Fuentes y búsqueda web, <strong>(centro)</strong> Chat con el cuaderno, <strong>(der.)</strong> Accionables del Studio — podcast con 2 locutores IA, presentación, mapa mental, infografía y cuestionario.',
          'Desde <strong>Gemini</strong> puedes vincular un cuaderno: clic en "+" → NotebookLM → selecciona el cuaderno y Gemini responde con ese contexto.',
          'Usa los Accionables del Studio para generar en 1 clic un podcast de audio, una presentación, un mapa mental o una tabla de datos.',
        ],
        protip: 'Sube manuales de producto, fichas técnicas de colchones y políticas internas de Rosen a un cuaderno. Tendrás un asistente que responde dudas del catálogo citando siempre la fuente — ideal para fuerza de venta y postventa.',
      },
      {
        emoji: '📄', title: 'Análisis de documentos', desc: 'PDFs, contratos y múltiples archivos de una vez',
        imgs: [],
        steps: [
          'Sube un archivo en Gemini o NotebookLM con el botón "+" o el clip → desde tu equipo o Google Drive. Formatos: PDF, Word, Excel, TXT.',
          'Para contratos o documentos legales, pide un análisis estructurado: obligaciones, cláusulas de riesgo e inconsistencias.',
          'Sube varios documentos a la vez para comparar (ej. dos cotizaciones de proveedores) y pedir un consolidado.',
          'Prompt útil: <em>"Analiza ambos archivos y dame un resumen ejecutivo de 200 palabras con una mirada crítica sobre el asunto."</em>',
        ],
        protip: '"Analiza este contrato e identifica: (1) las principales obligaciones de cada parte, (2) cláusulas de riesgo o penalidades, (3) cualquier inconsistencia o ambigüedad. Dame el resultado en formato estructurado."',
      },
    ],
  },
  {
    n: 5, slug: 'sesion05-rosen', title: 'Infografías, Canvas y Flow Studio',
    subtitle: 'De texto a visual: controla las alucinaciones, crea infografías y arma apps interactivas con Canvas.',
    cards: [
      {
        emoji: '🎯', title: 'Control de Alucinaciones', desc: 'Reduce la invención de la IA — sin eliminarla al 100%',
        imgs: [{ id: 'control-alucinaciones', file: 'cover.jpg' }],
        steps: [
          'Pide siempre <strong>fuentes y citas</strong>: la IA tiende a inventar menos cuando sabe que debe respaldar lo que dice.',
          'Dale el contexto tú mismo (sube el documento) en vez de confiar en su memoria — así responde sobre datos reales, no inventados.',
          'Desconfía de datos muy específicos (cifras, fechas, nombres propios): verifícalos siempre antes de usarlos.',
          'Activa el modo razonamiento para tareas críticas: piensa más y se equivoca menos.',
        ],
        protip: '«Responde solo si tienes al menos 90% de seguridad. Si no estás seguro, dímelo claramente en vez de inventar.» — una instrucción simple que reduce mucho las alucinaciones.',
      },
      {
        emoji: '🖼️', title: 'Napkin — Infografías desde texto', desc: 'Convierte cualquier texto en un visual con un clic',
        imgs: [{ id: 'napkin-infografias', file: 'cover.jpg' }],
        steps: [
          'Entra a <strong>napkin.ai</strong> y crea una cuenta gratuita.',
          'Pega o escribe tu texto en el editor. Napkin lo analiza automáticamente.',
          'Haz clic en el ícono de rayo (⚡) junto a cualquier párrafo para generar un visual.',
          'Elige entre los estilos generados (flowchart, diagrama, lista visual, etc.).',
          'Descarga como PNG, SVG o PDF para tus presentaciones o documentos.',
        ],
        protip: 'Primero genera el texto con Gemini, luego pégalo en Napkin para convertirlo en infografía. Combinación poderosa para comunicaciones ejecutivas y catálogos.',
      },
      {
        emoji: '🧩', title: 'Canvas en Gemini', desc: 'Crea visualizaciones y apps interactivas desde Gemini',
        imgs: [{ id: 'canvas-gemini', file: 'cover.jpg' }],
        steps: [
          'Abre Gemini y haz clic en "+" → selecciona <strong>Canvas</strong> en el menú de herramientas.',
          'Escribe tu instrucción: una app interactiva, un quiz, un dashboard, una landing, etc.',
          'Gemini genera el código HTML/JS y lo previsualiza en tiempo real en el panel derecho.',
          'Itera con instrucciones: "agrégale un botón de reset", "cambia los colores a azul Rosen".',
          'Usa "Compartir" para enviar el link del Canvas a tu equipo.',
        ],
        protip: 'Pídele a Canvas que cree 10 tarjetas interactivas de inducción sobre Rosen, usando la URL del sitio como contexto. En segundos tienes una mini-app de onboarding lista para compartir.',
      },
    ],
  },
  {
    n: 6, slug: 'sesion06-rosen', title: 'Imágenes y Video con IA',
    subtitle: 'Crea imágenes de producto, video, logos y música original con IA generativa — Veo 3, Nano Banana y más.',
    cards: [
      {
        emoji: '🖌️', title: 'Imágenes Pro con IA', desc: 'Fotos de producto profesionales con un prompt',
        imgs: [{ id: 'imagenes-pro', file: 'cover.jpg' }],
        steps: [
          'Sube la foto del producto que quieres usar como referencia (un colchón, un sillón, packaging).',
          'Escribe un prompt detallado con contexto, ambientación y estilo. Ej: <em>"Hazme esta imagen del colchón en un dormitorio luminoso y minimalista, luz natural de mañana, estilo editorial premium, formato cuadrado para Instagram."</em>',
          '<strong>Gemini</strong> (Nano Banana) fue destacado como el mejor modelo de imágenes en 2026, seguido de ChatGPT/DALL·E y Grok.',
          'Itera en la misma conversación: cambia el color del producto, agrega personas, prueba distintos fondos.',
        ],
        protip: 'Incluye siempre: superficie/escena (dormitorio, living), fondo, estilo (hiperrealista, editorial) y uso final (publicidad, catálogo). Cuanto más específico, mejor el resultado.',
      },
      {
        emoji: '🔍', title: 'Enhancer / Upscale de Imágenes', desc: 'Restaura y mejora fotos antiguas o de baja calidad',
        imgs: [{ id: 'enhancer-upscale', file: 'cover.jpg' }],
        steps: [
          'Sube tu foto borrosa o de baja resolución a una herramienta de upscaling. Recomendado: <strong>krea.ai</strong> (también Remini, Adobe Enhance, Topaz Gigapixel).',
          'Ajusta los parámetros: AI Strength (intensidad), Resemblance (fidelidad al original) y Clarity (nitidez). Empieza con valores moderados.',
          'Elige el factor de escala: 2x, 4x, 8x o 16x según el uso (pantalla vs. impresión de gran formato).',
          'La IA reconstruye detalles y aumenta la resolución sin distorsionar. Descarga en alta calidad.',
        ],
        protip: 'Recupera fotos de catálogo antiguas o material de archivo deteriorado. Con upscaling puedes reutilizar imágenes históricas de Rosen en piezas nuevas sin que se vean pixeladas.',
      },
      {
        emoji: '🎬', title: 'Generación de Videos con IA', desc: 'Text-to-Video e Image-to-Video — Veo 3, Kling, Runway, Sora',
        imgs: [{ id: 'videos-con-ia', file: 'cover.jpg' }],
        steps: [
          'Elige la herramienta: <strong>Veo 3</strong> (Google), Kling 2.0, Runway o Sora son los referentes actuales.',
          'Escribe el prompt en inglés — los modelos de video rinden mucho mejor así. Ej: <em>"Cinematic shot of a cozy bedroom at sunrise, soft natural light, a premium mattress, calm and aspirational mood, film quality."</em>',
          'Para <strong>Image-to-Video</strong>: sube una foto estática del producto y pide animarla — movimiento de cámara, luz, ambiente.',
          'Mejora tus prompts: escribe la idea en español y pídele a Gemini que la convierta en un prompt cinematográfico técnico en inglés.',
        ],
        protip: 'Dile a Gemini: "Tengo esta idea para un video: [tu idea en español]. Conviértela en un prompt cinematográfico detallado en inglés para Veo 3." La diferencia en calidad es enorme.',
      },
      {
        emoji: '🎭', title: 'Logos y mockups — Ideogram.ai', desc: 'Diseños con texto preciso y mockups de producto',
        imgs: [{ id: 'logos-ideogram', file: 'cover.jpg' }],
        steps: [
          'Entra a <strong>ideogram.ai</strong> y crea una cuenta gratuita.',
          'Activa el modo <strong>"Design"</strong> — optimiza el modelo para logos y tipografías con texto legible dentro de la imagen.',
          'Describe el diseño: nombre de marca, estilo, colores e íconos. Ej: <em>"Logo, modern minimalist, navy and gold, premium home brand."</em>',
          'Ideogram genera 4 variaciones. Haz clic en la que más te guste para remix o variaciones.',
          'También sirve para <strong>mockups de producto</strong> con el nombre de marca integrado de forma realista.',
        ],
        protip: 'La mayoría de los generadores distorsionan el texto. Ideogram en modo Design es el más confiable para que el nombre de tu marca aparezca escrito correctamente — clave para branding.',
      },
      {
        emoji: '🎵', title: 'Música con IA (Gemini)', desc: 'Canciones y jingles originales con Lyria 3',
        imgs: [{ id: 'musica-gemini', file: 'cover.jpg' }, { id: 'musica-gemini', file: 'paso1.jpg' }],
        steps: [
          'En Gemini (gratis con tu Gmail), clic en "+" → "Más herramientas" → <strong>Crear música</strong> (modelo Lyria 3).',
          'Elige una plantilla de género (pop latino, balada, cine, 8 bits y más) o describe tu propia idea.',
          'Especifica estilo, mood y letra: dásela tú o pide que la escriba. Indica idioma, tono y duración.',
          'Escucha, itera (ritmo, instrumentos, letra) y descarga la pista — música original sin problemas de derechos.',
        ],
        protip: 'Para marketing, un jingle corto y pegajoso con el nombre de la marca funciona increíble en reels y stories. Genera 2-3 versiones y prueba cuál conecta más.',
      },
    ],
  },
  {
    n: 7, slug: 'sesion07-rosen', title: 'Intro a Claude + Proyectos y MCP',
    subtitle: 'Conoce Claude: razonamiento profundo, artefactos vivos, proyectos con contexto y conectores MCP.',
    cards: [
      {
        emoji: '🧠', title: '¿Qué es Claude?', desc: 'El asistente de Anthropic — razonamiento, tokens y proyectos',
        imgs: [],
        steps: [
          '<strong>Claude</strong> es el asistente de IA de Anthropic, reconocido por su razonamiento y por ser excelente en tareas de texto, análisis y código.',
          'Modelos: <strong>Sonnet</strong> (rápido y equilibrado para el día a día) y <strong>Opus</strong> (el más potente, para razonamiento profundo y tareas complejas).',
          '<strong>Optimización de tokens:</strong> sé claro y directo, da contexto al inicio y divide tareas largas. Menos ruido = respuestas mejores y más baratas.',
          '<strong>Proyectos:</strong> crea un Proyecto, cárgale documentos y conocimiento de Rosen, y Claude los tendrá presentes en cada conversación de ese proyecto.',
          '<strong>MCP (conectores):</strong> Claude puede conectarse a herramientas externas (Drive, Gmail, bases de datos) para trabajar con tu información real.',
        ],
        protip: 'Crea un Proyecto "Rosen" y súbele tus manuales, catálogos y guías de marca. Cada vez que pidas algo, Claude responderá con ese contexto sin que tengas que volver a pegarlo.',
      },
      {
        emoji: '🪄', title: 'Artefactos de Claude', desc: 'Entregables vivos: visibles, interactivos y compartibles',
        imgs: [{ id: 'artefactos-claude', file: 'cover.jpg' }],
        steps: [
          'En Claude, menú lateral → "Más" → <strong>Artefactos</strong> para ver tu biblioteca.',
          'Haz clic en "Nuevo artefacto" y elige la categoría: app/web, documento, juego, herramienta de productividad, etc.',
          'Describe lo que necesitas. Claude lo crea y lo muestra en un panel lateral interactivo, separado del chat.',
          'Itera con mensajes adicionales, ve el código fuente, cópialo o publícalo con un enlace público.',
          'Los artefactos se guardan en tu biblioteca para reutilizarlos en futuras conversaciones.',
        ],
        protip: 'Pide un artefacto tipo "tablero de seguimiento de tareas de mi equipo" — Claude crea una mini-app interactiva que compartes con un solo link.',
      },
    ],
  },
];

for (const s of SESSIONS) {
  const dir = path.join(ROOT, s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(s));
  console.log(`✓ ${s.slug}/index.html  (${s.cards.length} cards)`);
}
console.log('Listo.');

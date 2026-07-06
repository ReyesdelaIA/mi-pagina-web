// Ensambla sesion07-k7x9/index.html (Pucobre S07) clonando el template de sesion05-k7x9.
// Contenido: módulo "HTML Avanzado" con 5 niveles (lámina inline por nivel) +
// bloque DESAFÍO destacado con material descargable (ZIP + Word + 2 Excel) + quiz embebido.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'sesion05-k7x9/index.html');
const OUT = path.join(ROOT, 'sesion07-k7x9/index.html');

const tpl = fs.readFileSync(SRC, 'utf8');

// --- HEAD (hasta apertura del wrap), con title y CSS del bloque desafío ---
const wrapMarker = '<div class="main"><div class="wrap">';
let head = tpl.slice(0, tpl.indexOf(wrapMarker) + wrapMarker.length);
head = head.replace(/<title>[\s\S]*?<\/title>/,
  '<title>Sesión 07 · HTML Avanzado + El Agente con Memoria · Reyes IA</title>');
const challengeCSS = `
.challenge{margin:30px 0 8px;background:linear-gradient(135deg,#FFF7E6 0%,#FFECC2 100%);border:1.5px solid #E9C874;border-radius:18px;padding:28px 26px;}
.challenge-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9A6B12;background:#FBE7B8;padding:5px 12px;border-radius:20px;margin-bottom:12px;}
.challenge-title{font-size:23px;font-weight:800;color:#6B4A0F;margin:0 0 10px;}
.challenge-text{font-size:14.5px;line-height:1.6;color:#5C4A2A;margin-bottom:20px;}
.dl-zip{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;background:#E8912A;color:#fff;font-weight:700;font-size:15.5px;padding:16px;border-radius:12px;text-decoration:none;margin-bottom:14px;transition:background .15s,transform .15s;}
.dl-zip:hover{background:#D67F1C;transform:translateY(-1px);}
.dl-zip small{font-weight:500;font-size:11.5px;opacity:.92;}
.dl-files{display:grid;gap:8px;}
.dl-file{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #EAD9B0;border-radius:10px;padding:12px 14px;text-decoration:none;color:#5C4A2A;font-weight:600;font-size:13.5px;transition:border-color .15s,background .15s;}
.dl-file:hover{border-color:#E8912A;background:#FFFBF2;}
.dl-file .ico{font-size:20px;line-height:1;}
.dl-file .type{margin-left:auto;font-size:11px;font-weight:600;color:#9A6B12;background:#FBE7B8;padding:3px 9px;border-radius:20px;}
.prompt-box{margin:14px 0 4px;background:#0f1729;border:1px solid #1e293b;border-radius:12px;overflow:hidden;}
.prompt-head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#111c33;border-bottom:1px solid #1e293b;}
.prompt-label{font-size:12px;font-weight:700;letter-spacing:0.04em;color:#8FB7E8;}
.prompt-copy{background:#2B5BA8;color:#fff;border:none;border-radius:7px;padding:6px 14px;font-size:12px;font-weight:600;font-family:'Poppins',sans-serif;cursor:pointer;transition:background .15s;}
.prompt-copy:hover{background:#356BC4;}
.prompt-copy.copied{background:#16a34a;}
.prompt-text{margin:0;padding:14px 16px;font-family:'SF Mono',Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;color:#D6E4F5;white-space:pre-wrap;word-break:break-word;}
.prompt-note{margin:10px 0 4px;font-size:12.5px;line-height:1.5;color:#185FA5;background:#EAF3FE;border-left:3px solid #2B5BA8;padding:9px 13px;border-radius:6px;}
.nivel-sep{height:1px;background:linear-gradient(90deg,transparent,#cfdcee 18%,#cfdcee 82%,transparent);margin:26px 0 22px;border:0;}
`;
head = head.replace('</style>', challengeCSS + '</style>');

// --- TAIL: desde quiz-fab hasta el final (overlay + script), con QUIZ propio ---
const tail = tpl.slice(tpl.indexOf('<button class="quiz-fab"'));

// --- helpers ---
function imgB64(id, file, bg) {
  const buf = fs.readFileSync(path.join(ROOT, 'bloques', id, file));
  const mime = (buf[0] === 0x89 && buf[1] === 0x50) ? 'image/png' : 'image/jpeg';
  return `<img src="data:${mime};base64,${buf.toString('base64')}" alt="" style="width:100%;max-height:440px;object-fit:contain;background:${bg};display:block;padding:16px 0;" />`;
}
function stepsHtml(steps, numBg, numColor, inserts) {
  // inserts = { <1-based step>: '<img...>' } opcional; imagen inline tras ese paso
  inserts = inserts || {};
  return `<ol class="steps">\n` + steps.map((t, i) => {
    let li = `          <li class="step"><div class="step-num" style="background:${numBg};color:${numColor};">${i + 1}</div><div class="step-text">${t}</div></li>`;
    if (inserts[i + 1]) {
      const sep = (i + 1 < steps.length) ? '\n      <hr class="nivel-sep" />' : '';
      li += `\n        </ol>\n      ${inserts[i + 1]}${sep}\n      <ol class="steps" style="margin-top:14px;">`;
    }
    return li;
  }).join('\n') + `\n        </ol>`;
}
function protipHtml(label, text) {
  return `<div class="idea-pro"><div class="idea-pro-icon">💡</div><div class="idea-pro-content"><div class="idea-pro-label">${label}</div><div class="idea-pro-text">${text}</div></div></div>`;
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function promptBoxHtml(label, text, note) {
  const noteHtml = note ? `\n      <div class="prompt-note">${note}</div>` : '';
  return `<div class="prompt-box">
        <div class="prompt-head"><span class="prompt-label">✍️ ${label}</span><button class="prompt-copy">📋 Copiar</button></div>
        <pre class="prompt-text">${esc(text)}</pre>
      </div>${noteHtml}`;
}
function card(c) {
  const media = (c.imgs || []).map(im => imgB64(im.id, im.file, im.bg)).join('\n      ');
  const inserts = {};
  (c.stepImgs || []).forEach(si => { inserts[si.step] = imgB64(si.img.id, si.img.file, si.img.bg); });
  (c.prompts || []).forEach(p => {
    const box = promptBoxHtml(p.label, p.text, p.note);
    inserts[p.step] = (inserts[p.step] ? inserts[p.step] + '\n      ' : '') + box;
  });
  const intro = c.intro ? `<p style="font-size:14.5px;line-height:1.6;color:#333;margin:0 0 16px;">${c.intro}</p>` : '';
  const op = c.open ? ' open' : '';
  return `  <div class="card">
    <div class="card-header">
      <div class="icon" style="background:${c.iconBg};">${c.emoji}</div>
      <div><div class="card-title">${c.title}</div><div class="card-desc">${c.desc}</div></div>
      <div class="chevron${op}">▼</div>
    </div>
    <div class="card-body${op}">
      ${media}
      <div class="body-content">
        ${intro}${stepsHtml(c.steps, c.numBg, c.numColor, inserts)}
        ${protipHtml(c.protipLabel || 'Pro tip', c.protip)}
      </div>
    </div>
  </div>`;
}

// --- CONTENIDO S07 ---
const NB = '#E6F1FB', NC = '#185FA5';
const cards = [
  {
    emoji: '🖥️', iconBg: '#E6F1FB', numBg: NB, numColor: NC, open: true,
    title: 'HTML Avanzado con Drag & Drop',
    desc: 'La escalera del HTML: de un dashboard local hasta uno publicado y dinámico',
    intro: 'Aprendiste a crear <strong>dashboards en HTML</strong> que leen tus datos — desde lo más simple y local hasta lo más avanzado y conectado en vivo. Esta es la escalera de <strong>5 niveles</strong>:',
    steps: [
      '<strong>Nivel 1 — HTML local con el Excel aparte:</strong> el dashboard es un archivo HTML en tu computador que lee un Excel que vive por separado. Simple y 100% local.',
      '<strong>Nivel 2 — HTML local con carga de archivos (drag &amp; drop):</strong> arrastras y sueltas tu Excel, CSV o Google Sheets sobre el dashboard y se actualiza solo, sin tocar el código.',
      '<strong>Nivel 3 — HTML con datos incrustados:</strong> los datos quedan embebidos dentro del propio HTML. Es un único archivo autosuficiente que puedes enviar por email o WhatsApp y se ve en cualquier lado.',
      '<strong>Nivel 4 — HTML en hosting (ej. Netlify):</strong> publicas el dashboard en internet con una URL propia, accesible desde computador, tablet o celular.',
      '<strong>Nivel 5 — HTML en hosting con datos dinámicos:</strong> el dashboard se conecta en tiempo real a fuentes vivas (Google Sheets, Supabase, APIs, WhatsApp) y se actualiza solo.',
    ],
    stepImgs: [
      { step: 1, img: { id: 'html-avanzado', file: 'nivel1.png', bg: '#f7f9fc' } },
      { step: 2, img: { id: 'html-avanzado', file: 'nivel2.png', bg: '#f7f9fc' } },
      { step: 3, img: { id: 'html-avanzado', file: 'nivel3.png', bg: '#f7f9fc' } },
      { step: 4, img: { id: 'html-avanzado', file: 'nivel4.png', bg: '#f7f9fc' } },
      { step: 5, img: { id: 'html-avanzado', file: 'nivel5.png', bg: '#f7f9fc' } },
    ],
    prompts: [
      { step: 1, label: 'Prompt Nivel 1', text: 'Genera un archivo HTML interactivo descargable según el archivo que te adjunto.' },
      { step: 2, label: 'Prompt Nivel 2', text: 'Genera un archivo HTML interactivo descargable según el archivo que te adjunto. El HTML debe ser una herramienta reutilizable, no un reporte con datos incrustados. Debe incluir una pantalla inicial de carga (drag & drop + botón para seleccionar archivo) que permita subir un Excel o CSV distinto cada vez.' },
      { step: 3, label: 'Prompt Nivel 3', text: 'Genera un archivo HTML interactivo descargable según el archivo que te adjunto, con los datos incrustados (no separados).' },
      { step: 4, label: 'Prompt Nivel 4', text: 'Genera un archivo HTML interactivo descargable según el archivo que te adjunto, con los datos incrustados (no separados).', note: '💡 Es el mismo prompt del Nivel 3 — la diferencia es que ahora <strong>publicas</strong> el HTML. Si no tienes hosting propio (lo recomendado), súbelo gratis arrastrándolo a <strong>app.netlify.com/drop</strong>.' },
      { step: 5, label: 'Prompt Nivel 5', text: 'Genera un archivo HTML interactivo y descargable que construya una tabla o listado de datos. La data no debe estar estática en el código. Utiliza JavaScript (fetch API) para conectarte al siguiente endpoint de Supabase y traer los datos en formato JSON: [INSERTA LA URL DEL ENDPOINT]. Asegúrate de incluir en el código dónde debo pegar mi clave pública (anon key) en los headers de la petición, e itera sobre los resultados para mostrarlos dinámicamente en la interfaz.' },
    ],
    protip: 'La escalera va de lo simple y local (Nivel 1) a lo publicado y dinámico (Nivel 5). No necesitas llegar siempre al 5: elige el nivel según <strong>para qué</strong> y <strong>para quién</strong> es el dashboard.',
  },
];

// --- BLOQUE DESAFÍO DESTACADO (con descargas) ---
const challenge = `  <div class="challenge">
    <div class="challenge-badge">🎯 Desafío de la sesión</div>
    <div class="challenge-title">El Agente con Memoria</div>
    <div class="challenge-text">En Copilot (<strong>Chat → Agentes</strong>) crea un agente personalizado y adjúntale un <strong>Excel fijo de referencia</strong> como conocimiento base (por ejemplo, una tabla estándar de indicadores). Luego pásale la <strong>planilla real del mes</strong> y pídele que compare cada indicador contra su rango aceptable y levante las desviaciones. Descarga el material aquí abajo para hacerlo. 👇</div>
    <a class="dl-zip" href="/pucobre/desafio-s7/desafio-sesion7-pucobre.zip" download="Desafio-Sesion7-Pucobre.zip">⬇&nbsp; Descargar Desafío Sesión 7 <small>· ZIP · 3 archivos</small></a>
    <div class="dl-files">
      <a class="dl-file" href="/pucobre/desafio-s7/instrucciones-prompts.docx" download="Instrucciones y Prompts - Desafio S7.docx"><span class="ico">📄</span> Instrucciones y prompts <span class="type">Word</span></a>
      <a class="dl-file" href="/pucobre/desafio-s7/tabla-estandar-seguridad.xlsx" download="Tabla Estandar Indicadores Seguridad.xlsx"><span class="ico">📊</span> Tabla estándar de indicadores (Excel fijo) <span class="type">Excel</span></a>
      <a class="dl-file" href="/pucobre/desafio-s7/planilla-junio-2026.xlsx" download="Planilla Junio 2026.xlsx"><span class="ico">📊</span> Planilla del mes (real) <span class="type">Excel</span></a>
    </div>
  </div>`;

const header = `  <div class="header">
    <div class="header-badge">Pucobre &middot; Sesi&oacute;n 07 &middot; Programa Adopci&oacute;n Profunda de IA</div>
    <div class="header-title">Resumen ejecutivo clase 7 [S07]</div>
    <div class="header-sub">HTML avanzado con drag &amp; drop (5 niveles) y creaci&oacute;n de agentes personalizados en Copilot &mdash; El Agente con Memoria</div>
    <div class="header-tags">
      <span class="tag">&#128421;&#65039; HTML avanzado</span>
      <span class="tag">&#128194; Drag &amp; drop</span>
      <span class="tag">&#127760; Netlify</span>
      <span class="tag">&#128202; Google Sheets</span>
      <span class="tag">&#129302; Agente con memoria</span>
    </div>
  </div>

  <div class="section-label">Contenidos de la sesi&oacute;n</div>
`;

const footer = `
  <div class="divider"></div>
  <div class="footer">Sesi&oacute;n 07 &middot; Programa Adopci&oacute;n Profunda de IA &middot; <strong>Reyes IA</strong> &middot; @reyesdelaia</div>
</div></div>

`;

// --- QUIZ aprobado (5 preguntas, Q4 y Q5 corregidas) ---
const QUIZ = [
  { q: "En el Nivel 1 (HTML local con el Excel aparte), ¿dónde viven los datos?",
    opts: ["En un archivo Excel separado, en tu computador, que el HTML lee", "Escritos dentro del propio HTML", "En internet, en tiempo real", "El dashboard no usa datos"],
    correct: 0, exp: "En el Nivel 1 el HTML y el Excel son archivos distintos: el dashboard lee los datos desde el Excel que está aparte." },
  { q: "¿Qué permite el Nivel 2 (carga de archivos / drag & drop)?",
    opts: ["Publicar el dashboard en internet", "Arrastrar y soltar un Excel/CSV/Google Sheets para actualizar el dashboard sin tocar el código", "Conectarse a una base de datos en la nube", "Enviarlo por WhatsApp"],
    correct: 1, exp: "El drag & drop deja actualizar el dashboard cargando un archivo nuevo, sin editar el código." },
  { q: "La gran ventaja de un HTML con datos incrustados (Nivel 3) es que…",
    opts: ["Se actualiza solo en tiempo real", "Necesita internet para funcionar", "Requiere Excel instalado", "Es un único archivo autosuficiente que puedes enviar por email o WhatsApp y se ve en cualquier lado"],
    correct: 3, exp: "Con los datos embebidos, el HTML es un solo archivo que funciona en cualquier lado sin depender de otro archivo ni de internet." },
  { q: "¿Qué diferencia hay entre un HTML conectado a fuentes en vivo y un HTML que solo está publicado en internet?",
    opts: ["El conectado en vivo no se puede abrir en el celular", "El que solo está publicado no se ve en internet", "El conectado a fuentes en vivo (Google Sheets, Supabase, APIs) se actualiza solo en tiempo real; el solo publicado muestra datos fijos hasta que lo edites", "No hay ninguna diferencia"],
    correct: 2, exp: "Estar publicado solo lo hace accesible por una URL con datos fijos. Estar conectado a fuentes en vivo hace que se actualice solo cuando cambian los datos de origen." },
  { q: "En 'El Agente con Memoria', ¿cómo funciona el conocimiento fijo del agente?",
    opts: ["El agente inventa los criterios cada vez", "Le adjuntas un Excel fijo de referencia para que compare contra él las siguientes planillas que le vayas entregando", "Hay que volver a explicarle todo en cada conversación", "Solo sirve para una única planilla y luego se borra"],
    correct: 1, exp: "El agente guarda un archivo fijo como conocimiento base y lo usa de referencia para comparar todas las planillas que le pases después." },
];

const copyScript = `<script>
(function(){
  document.querySelectorAll('.prompt-box').forEach(function(box){
    box.addEventListener('click', function(e){ e.stopPropagation(); });
  });
  document.querySelectorAll('.prompt-copy').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var box = btn.closest('.prompt-box');
      var pre = box ? box.querySelector('.prompt-text') : null;
      var txt = pre ? pre.textContent : '';
      // Respaldo síncrono con execCommand (funciona dentro del gesto de usuario)
      try {
        var ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.top = '0'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.focus(); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      } catch (err) {}
      // Mejora con Clipboard API si está disponible (no bloquea el feedback)
      try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt); } catch (err) {}
      // Feedback inmediato y confiable
      btn.textContent = '✅ Copiado'; btn.classList.add('copied');
      setTimeout(function(){ btn.textContent = '📋 Copiar'; btn.classList.remove('copied'); }, 1600);
    });
  });
})();
</script>`;

let tailFinal = tail
  .replace(/var QUIZ = \[[\s\S]*?\];/, 'var QUIZ = ' + JSON.stringify(QUIZ, null, 2) + ';')
  .replace('Pregunta 1 de 6', 'Pregunta 1 de 5')
  .replace('</body>', copyScript + '\n</body>');

const out = head + '\n' + header + '\n' + cards.map(card).join('\n\n') + '\n\n' + challenge + '\n' + footer + tailFinal;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('OK', OUT, (out.length / 1024).toFixed(0) + 'KB,', cards.length, 'cards,', QUIZ.length, 'quiz Qs');

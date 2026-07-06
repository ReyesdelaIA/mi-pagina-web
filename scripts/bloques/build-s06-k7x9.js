// Ensambla sesion06-k7x9/index.html (Pucobre S06) clonando el template de sesion05-k7x9
// (conserva branding pucobre + quiz embebido). Imágenes de los 2 agentes en base64 desde bloques/.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'sesion05-k7x9/index.html');
const OUT = path.join(ROOT, 'sesion06-k7x9/index.html');

const tpl = fs.readFileSync(SRC, 'utf8');

// --- HEAD: todo hasta la apertura del wrap ---
const wrapMarker = '<div class="main"><div class="wrap">';
let head = tpl.slice(0, tpl.indexOf(wrapMarker) + wrapMarker.length);
head = head.replace(/<title>[\s\S]*?<\/title>/,
  '<title>Sesión 06 · Agentes Premium de Copilot + Claude Cowork · Reyes IA</title>');

// --- TAIL: desde el quiz-fab hasta el final (overlay + script) ---
const tail = tpl.slice(tpl.indexOf('<button class="quiz-fab"'));

// --- helper imagen base64 desde biblioteca ---
function imgB64(id, file, bg) {
  const buf = fs.readFileSync(path.join(ROOT, 'bloques', id, file));
  const mime = (buf[0] === 0x89 && buf[1] === 0x50) ? 'image/png' : 'image/jpeg';
  const b64 = buf.toString('base64');
  return `<img src="data:${mime};base64,${b64}" alt="" style="width:100%;max-height:440px;object-fit:contain;background:${bg};display:block;padding:16px 0;" />`;
}

function stepsHtml(steps, numBg, numColor) {
  return `<ol class="steps">\n` + steps.map((t, i) =>
    `          <li class="step"><div class="step-num" style="background:${numBg};color:${numColor};">${i + 1}</div><div class="step-text">${t}</div></li>`
  ).join('\n') + `\n        </ol>`;
}
function protipHtml(label, text) {
  return `<div class="idea-pro"><div class="idea-pro-icon">💡</div><div class="idea-pro-content"><div class="idea-pro-label">${label}</div><div class="idea-pro-text">${text}</div></div></div>`;
}
function placeholderHtml() {
  return `<div style="width:100%;padding:30px 16px;background:#FFF4E5;border:1px dashed #E0B872;border-radius:10px;text-align:center;color:#9A6B12;font-weight:600;margin:0 0 6px;">📸 Captura próximamente — bloque en modo texto por ahora</div>`;
}
function card(c) {
  const imgs = (c.imgs || []).map(im => imgB64(im.id, im.file, im.bg)).join('\n      ');
  const media = c.imgs && c.imgs.length ? imgs : placeholderHtml();
  return `  <div class="card">
    <div class="card-header">
      <div class="icon" style="background:${c.iconBg};">${c.emoji}</div>
      <div><div class="card-title">${c.title}</div><div class="card-desc">${c.desc}</div></div>
      <div class="chevron">▼</div>
    </div>
    <div class="card-body">
      ${media}
      <div class="body-content">
        ${stepsHtml(c.steps, c.numBg, c.numColor)}
        ${protipHtml(c.protipLabel || 'Pro tip', c.protip)}
      </div>
    </div>
  </div>`;
}

// --- CONTENIDO S06 ---
const cards = [
  {
    emoji: '🕵️', iconBg: '#FDE8F0', numBg: '#FDE8F0', numColor: '#9C1B5A',
    title: 'Agente Investigador', desc: 'Investiga y sintetiza desde web, correos, reuniones y archivos en un informe estructurado',
    imgs: [{ id: 'agente-investigador', file: 'cover.jpg', bg: '#fdf2f8' }, { id: 'agente-investigador', file: 'paso1.jpg', bg: '#fdf2f8' }],
    steps: [
      '<strong>¿Para qué sirve?</strong> Para buscar, recopilar y sintetizar información desde múltiples fuentes externas: web, documentos internos, reuniones, correos y bases de datos corporativas.',
      '<strong>Cómo usarlo:</strong> Selecciona el agente Investigador en el panel de Copilot y escribe tu pregunta de investigación. Puede razonar sobre todos tus datos de trabajo simultáneamente.',
      '<strong>Casos de uso clave:</strong> Preparar reuniones con inteligencia de cliente, actualizar el estado de proyectos, analizar la posición de mercado de una compañía y hacer seguimiento de elementos de acción.',
      '<strong>Output:</strong> Entrega un informe de investigación completo y estructurado, combinando datos internos (chats, reuniones, archivos) con información externa de la web.',
    ],
    protipLabel: 'Prompt de ejemplo',
    protip: '"Prepárame un informe ejecutivo sobre [Cliente/Proyecto]: incluye estado actual, últimas interacciones, compromisos pendientes y contexto de mercado relevante."',
  },
  {
    emoji: '📈', iconBg: '#FDE8F0', numBg: '#FDE8F0', numColor: '#9C1B5A',
    title: 'Agente Analista', desc: 'Analiza datos y temas desde tu bandeja, SharePoint, Outlook o reuniones',
    imgs: [{ id: 'agente-analista', file: 'cover.jpg', bg: '#fdf2f8' }, { id: 'agente-analista', file: 'paso1.jpg', bg: '#fdf2f8' }],
    steps: [
      '<strong>¿Para qué sirve?</strong> Para analizar, interpretar y generar insights a partir de datos ya disponibles: archivos Excel, reportes, métricas internas y datos corporativos.',
      '<strong>Análisis de datos:</strong> Carga tus archivos y pregunta al Analista sobre tendencias, patrones o anomalías. Ejemplo: <em>"¿Cuáles son las tendencias que ves en los archivos cargados?"</em>',
      '<strong>Obtener conclusiones:</strong> Pídele conclusiones ejecutivas directamente. El Analista sintetiza los datos y presenta los hallazgos más relevantes en formato legible.',
      '<strong>Visualizar:</strong> Solicita tablas comparativas, gráficos de tendencia o resúmenes visuales. El Analista puede crear visualizaciones directamente desde tus datos.',
    ],
    protip: 'El <strong>Investigador</strong> sale a buscar información nueva desde fuentes externas. El <strong>Analista</strong> trabaja con datos que ya tienes: interpreta, compara y visualiza lo que ya existe en tus archivos.',
  },
  {
    emoji: '📔', iconBg: '#E6F1FB', numBg: '#E6F1FB', numColor: '#185FA5',
    title: 'Cuadernos de Copilot', desc: 'La respuesta de Copilot a NotebookLM: respuestas aterrizadas solo en las fuentes que agregas',
    steps: [
      '<strong>¿Qué es?</strong> Es la respuesta de Copilot a NotebookLM: un espacio donde agrupas archivos, páginas, notas y links sobre un tema, y Copilot responde <strong>SOLO</strong> en base a ese contenido.',
      '<strong>Cómo crearlo:</strong> En Copilot entra a la sección Cuadernos (Notebooks), crea uno nuevo y agrégale tus fuentes desde SharePoint, OneDrive, documentos o notas.',
      '<strong>Cómo usarlo:</strong> Hazle preguntas al cuaderno y responderá aterrizado en esas fuentes, con citas — sin inventar ni traer ruido de otros lados.',
      '<strong>Qué obtienes:</strong> Resúmenes, preguntas frecuentes y análisis precisos de un set acotado de documentos, ideal para un proyecto o tema puntual.',
    ],
    protip: 'Mantén cada cuaderno enfocado en <strong>UN</strong> tema o proyecto. Mientras más acotadas las fuentes, más precisas y confiables las respuestas.',
  },
  {
    emoji: '🤝', iconBg: '#FAECE7', numBg: '#FAECE7', numColor: '#993C1D',
    title: 'Intro a Claude Cowork', desc: 'De un chat que responde a un agente que ACTÚA sobre tu computador',
    steps: [
      '<strong>El salto clave:</strong> pasamos de un chat que solo responde, a un <strong>AGENTE que actúa</strong> sobre tu computador — lee archivos, crea documentos y ejecuta tareas reales.',
      '<strong>Cómo se conecta:</strong> Claude Cowork se enlaza a la terminal de tu equipo, con acceso a tus carpetas y la capacidad de correr comandos por ti.',
      '<strong>Cómo se usa:</strong> Le das una instrucción en lenguaje natural (<em>"ordena esta carpeta"</em>, <em>"genera un reporte con estos datos"</em>) y el agente planifica y ejecuta los pasos.',
      '<strong>Tú mandas:</strong> El agente pide permiso antes de acciones sensibles; tú supervisas, apruebas o corriges sobre la marcha.',
    ],
    protip: 'Piensa en Cowork como un <strong>practicante digital</strong>: dale tareas acotadas y de bajo riesgo primero, y sube la complejidad a medida que le tomas confianza.',
  },
  {
    emoji: '⚡', iconBg: '#FAECE7', numBg: '#FAECE7', numColor: '#993C1D',
    title: 'Ejemplos de Claude Cowork', desc: 'Casos reales: ordenar carpetas, consolidar planillas, generar reportes y automatizar',
    steps: [
      '<strong>Ordenar archivos:</strong> toma una carpeta desordenada y la renombra, clasifica y organiza automáticamente según el criterio que le des.',
      '<strong>Consolidar datos:</strong> junta varias planillas Excel en un solo reporte con totales, comparaciones y conclusiones.',
      '<strong>Generar entregables:</strong> lee un conjunto de documentos y produce un resumen ejecutivo, una minuta o una presentación.',
      '<strong>Automatizar lo repetitivo:</strong> convierte formatos, extrae datos y ejecuta tareas manuales que antes te tomaban horas.',
    ],
    protip: 'Antes de pedirle una tarea crítica, prueba Cowork con una <strong>copia</strong> de tus archivos — así ves cómo trabaja sin riesgo sobre los originales.',
  },
];

const header = `  <div class="header">
    <div class="header-badge">Pucobre &middot; Sesi&oacute;n 06 &middot; Programa Adopci&oacute;n Profunda de IA</div>
    <div class="header-title">Resumen ejecutivo clase 6 [S06]</div>
    <div class="header-sub">Agentes Premium de Copilot (Investigador y Analista), Cuadernos de Copilot e introducci&oacute;n a Claude Cowork</div>
    <div class="header-tags">
      <span class="tag">&#128373;&#65039; Investigador</span>
      <span class="tag">&#128200; Analista</span>
      <span class="tag">&#128212; Cuadernos</span>
      <span class="tag">&#129309; Cowork</span>
      <span class="tag">&#9889; Ejemplos</span>
    </div>
  </div>

  <div class="section-label">Contenidos de la sesi&oacute;n</div>
`;

const footer = `
  <div class="divider"></div>
  <div class="footer">Sesi&oacute;n 06 &middot; Programa Adopci&oacute;n Profunda de IA &middot; <strong>Reyes IA</strong> &middot; @reyesdelaia</div>
</div></div>

`;

// --- QUIZ aprobado (5 preguntas, correctas variadas) ---
const QUIZ = [
  { q: "¿Cuál es la principal fortaleza del Agente Investigador de Copilot?",
    opts: ["Combina y sintetiza info de múltiples fuentes (web, correos, reuniones, archivos) en un informe estructurado","Solo busca en internet, sin acceso a tus datos de trabajo","Edita automáticamente tus documentos de Word","Genera imágenes a partir de texto"],
    correct: 0, exp: "El Investigador razona sobre fuentes internas y externas a la vez y entrega un informe estructurado." },
  { q: "El Agente Analista es ideal cuando quieres...",
    opts: ["Crear un logo para tu marca","Que analice datos y temas desde tu bandeja de entrada, SharePoint, Outlook o reuniones","Traducir un documento a otro idioma","Grabar una reunión de Teams"],
    correct: 1, exp: "El Analista trabaja con datos que ya tienes: interpreta, compara y visualiza lo existente." },
  { q: "¿Qué hace especial a los Cuadernos de Copilot?",
    opts: ["Permiten hacer videollamadas grupales","Son un editor de planillas Excel","Copilot responde aterrizado SOLO en las fuentes que agregaste al cuaderno, con citas","Reemplazan tu correo de Outlook"],
    correct: 2, exp: "El cuaderno acota las fuentes: respuestas precisas y con citas, sin ruido externo." },
  { q: "¿Cuál es el salto clave que introduce Claude Cowork?",
    opts: ["Es un chat idéntico a los anteriores pero más rápido","Sirve solo para generar imágenes","Es una app de mensajería","Pasa de un chat que responde a un agente que ACTÚA sobre tu computador (archivos y terminal)"],
    correct: 3, exp: "Cowork ejecuta tareas reales: lee archivos, crea documentos y corre comandos por ti." },
  { q: "¿Cuál es un buen primer caso de uso para Cowork?",
    opts: ["Borrar sin respaldo todos los archivos del servidor","Ordenar y consolidar una carpeta de planillas en un reporte, probando primero con una copia","Enviar correos masivos sin revisar","Publicar automáticamente en redes sociales sin supervisión"],
    correct: 1, exp: "Empieza con tareas acotadas y de bajo riesgo, sobre una copia, para tomarle confianza al agente." },
];

// Inyectar QUIZ y ajustar contador inicial en el tail
let tailFinal = tail
  .replace(/var QUIZ = \[[\s\S]*?\];/, 'var QUIZ = ' + JSON.stringify(QUIZ, null, 2) + ';')
  .replace('Pregunta 1 de 6', 'Pregunta 1 de 5');

const out = head + '\n' + header + '\n' + cards.map(card).join('\n\n') + '\n' + footer + tailFinal;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('OK', OUT, (out.length / 1024).toFixed(0) + 'KB,', cards.length, 'cards,', QUIZ.length, 'quiz Qs');

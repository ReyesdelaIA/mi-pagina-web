/* ==================================================================
   Portal Claude · lógica compartida entre el hub y las páginas de taller
   ------------------------------------------------------------------
   El contenido de cada concepto vive en /bloques/<id>/meta.json:
   una sola fuente de verdad, reutilizable para armar sesiones de
   cualquier cliente.
   ================================================================== */

const TALLERES = [
  {
    n: 1,
    label: 'Sesión 1 · Introductorio',
    title: 'Activación y manejo de Claude',
    dur: '1.5 hrs · Presencial',
    resumen: 'Dejar Claude andando y aprender a manejarlo: la cuenta, la interfaz, qué recuerda, cómo hablarle y cuándo hacerlo pensar.',
    conceptos: ['activacion-claude', 'claude-chat-tour', 'memoria-claude', 'dictado-claude'],
    desafio: {
      titulo: 'El consolidado de dos documentos',
      intro: 'Los ejercicios eran para probar cada cosa por separado. Este junta todo lo de la sesión en una sola tarea real: chat nuevo, modelo y esfuerzo, archivos adjuntos, memoria y dictado.',
      pasos: [
        'Abre un chat nuevo, para no arrastrar el contexto de otra conversación.',
        'Elige el modelo Sonnet 5 y súbele el esfuerzo a Extra. Esta no es una tarea de responder rápido: es de comparar y razonar.',
        'Adjunta dos documentos tuyos de verdad que tengan relación entre sí: dos informes del mismo proyecto, dos propuestas a clientes distintos, las actas de dos reuniones seguidas.',
        'Antes de pedirle nada, dictando por el micrófono, fuérzale la memoria: «Memoriza lo siguiente: soy [tu cargo] en [tu empresa], mi equipo hace [X] y lo que más me importa cuando reviso un documento es [Y]».',
        'Ahora sí, dicta el encargo (tienes el prompt abajo) y déjalo pensar.',
        'Cuando te entregue el consolidado, pídele una vuelta más: «¿qué contradicciones entre los dos documentos dejaste fuera del consolidado?». Ahí aparece lo bueno.'
      ],
      prompt: 'Lee los dos documentos que te adjunté. No quiero un resumen de cada uno: quiero un documento consolidado. Identifica qué dicen igual, en qué se contradicen y qué está en uno y falta en el otro. Ordénalo por lo que más impacta a mi trabajo y ciérralo con las 3 decisiones que tengo que tomar. Usa lo que ya sabes de mí y de mi cargo para priorizar.',
      cierre: 'Guárdate el resultado y llévalo a la Sesión 2: esa tarea es exactamente la que vas a convertir en un Proyecto para no repetir el contexto nunca más.'
    },
    quiz: [
      {
        q: '¿Qué hace realmente un modelo de lenguaje como Claude cuando le escribes?',
        opts: ['Busca la respuesta en Google y la copia', 'Predice, palabra por palabra, la continuación más probable del texto', 'Consulta una base de datos oficial de respuestas verificadas', 'Ejecuta un programa fijo escrito por sus creadores'],
        correct: 1,
        explain: 'Un LLM genera texto prediciendo la continuación más probable. Por eso el contexto que le das influye tanto en el resultado, y por eso también puede equivocarse con seguridad.'
      },
      {
        q: '¿Cuál de estos prompts va a dar mejor resultado?',
        opts: ['"Escríbeme un correo"', '"Correo urgente"', '"Hazlo bien y que sea profesional"', '"Eres jefe de operaciones. Escribe un correo al proveedor X avisando que el despacho se atrasó 3 días, en tono firme pero cordial, máximo 120 palabras"'],
        correct: 3,
        explain: 'Rol, contexto, tarea concreta y formato. Mientras más específico el prompt, menos tiene que adivinar el modelo y mejor sale el resultado a la primera.'
      },
      {
        q: 'Cuando decimos que la IA "alucina", nos referimos a que…',
        opts: ['Se apaga cuando la pregunta es muy difícil', 'Entrega información falsa redactada con total seguridad', 'Solo funciona con conexión a internet', 'Repite siempre la misma respuesta'],
        correct: 1,
        explain: 'La alucinación es información inventada pero presentada con confianza. Por eso todo dato crítico (cifras, nombres, fechas, normas) se verifica antes de usarlo.'
      },
      {
        q: '¿Qué NO deberías pegar en una IA sin revisar antes la política de tu empresa?',
        opts: ['Un texto público de tu sitio web', 'Datos personales de clientes, información financiera no publicada o contratos confidenciales', 'Una noticia del diario', 'Una pregunta general sobre tu industria'],
        correct: 1,
        explain: 'La regla práctica: si no se lo mandarías por correo a alguien fuera de la empresa, no lo pegues en una IA sin confirmar primero qué permite tu organización.'
      },
      {
        q: '¿Por qué conviene elegir el modelo según la tarea y no usar siempre el mismo?',
        opts: ['Porque los modelos rápidos rinden mejor en tareas simples y de volumen, y los de razonamiento profundo en análisis complejos', 'Porque solo hay un modelo disponible por día', 'Porque cambiar de modelo borra la conversación', 'Porque los modelos más lentos siempre dan peores respuestas'],
        correct: 0,
        explain: 'Usar razonamiento profundo para reformular un correo es gastar de más; usar el modelo más rápido para un análisis delicado es quedarse corto. Elegir bien es parte del oficio.'
      }
    ]
  },
  {
    n: 2,
    label: 'Sesión 2 · Claude App',
    proximamente: true,
    title: 'Dominio de la App de Claude',
    dur: '1.5 hrs · Presencial · Hands-On',
    resumen: 'Sacarle todo a la aplicación: Proyectos, conectores, Office y las prácticas que hacen la diferencia entre usarla y dominarla.',
    conceptos: ['proyectos-claude', 'mcp-conectores', 'claude-en-office', 'formatos-md-tokens'],
    desafio: 'Crea tu primer Proyecto en Claude para tu área de trabajo. Súbele 2 o 3 documentos que uses seguido (un instructivo, una plantilla, un informe tipo) y escríbele instrucciones fijas: quién eres, qué hace tu equipo y cómo quieres que te responda. Después hazle una pregunta real de tu trabajo y nota la diferencia contra un chat en blanco. 📁',
    quiz: [
      {
        q: '¿Cuál es la principal ventaja de un Proyecto frente a un chat suelto?',
        opts: ['Guarda el contexto y las instrucciones una sola vez, y todas las conversaciones del Proyecto parten desde ahí', 'Permite hacer videollamadas con el equipo', 'Hace que las respuestas sean más cortas', 'Es la única forma de subir archivos'],
        correct: 0,
        explain: 'El Proyecto es memoria de trabajo persistente: documentos base más instrucciones fijas. Dejas de reexplicar tu contexto en cada conversación.'
      },
      {
        q: '¿Para qué sirven los conectores y MCP en el trabajo diario?',
        opts: ['Para cambiar el color de la interfaz', 'Para conectar Claude con tus herramientas y datos (archivos, correo, sistemas) sin copiar y pegar', 'Para descargar la app en el celular', 'Para traducir la interfaz a otro idioma'],
        correct: 1,
        explain: 'MCP es el estándar que permite a Claude leer y actuar sobre herramientas externas. Es lo que lo lleva de "chat que aconseja" a "asistente que trabaja con tus datos reales".'
      },
      {
        q: 'Tienes que analizar un contrato largo y detectar riesgos legales. ¿Qué modelo conviene?',
        opts: ['El más rápido, porque el tiempo es lo que importa', 'Da exactamente lo mismo cuál elijas', 'Uno de razonamiento profundo, porque la tarea exige análisis cuidadoso y no volumen', 'Ninguno: eso no se puede hacer con IA'],
        correct: 2,
        explain: 'Tareas de análisis delicado justifican el modelo de razonamiento profundo. Los modelos rápidos brillan en volumen y tareas simples, no en juicio fino.'
      },
      {
        q: '¿Por qué conviene pedirle a Claude que responda en formato Markdown (tablas, listas, encabezados)?',
        opts: ['Porque es el único formato que Claude entiende', 'Porque acorta las respuestas a la mitad', 'Porque estructura la respuesta y se pega limpia en Word, Notion, correo o donde la necesites', 'Porque activa el modo avanzado'],
        correct: 2,
        explain: 'Markdown le da estructura a la salida. Una respuesta bien estructurada es más fácil de revisar, de reutilizar y de pegar donde la necesitas.'
      },
      {
        q: '¿Cuál es una buena práctica para no desperdiciar tokens ni ensuciar el contexto?',
        opts: ['Usar un solo chat gigante para todo el año', 'Abrir una conversación nueva por tema, en vez de arrastrar un hilo eterno', 'Escribir siempre en mayúsculas', 'Repetir la pregunta tres veces'],
        correct: 1,
        explain: 'Un hilo muy largo arrastra todo el historial en cada respuesta: sale más caro y confunde al modelo con contexto viejo. Un chat por tema es más limpio y más barato.'
      }
    ]
  },
  {
    n: 3,
    label: 'Sesión 3 · Claude Avanzado',
    proximamente: true,
    title: 'Cowork, Artefactos & Plugins',
    dur: '1.5 hrs · Presencial · Hands-On',
    resumen: 'El salto de conversar a delegar: estandarizar procedimientos, generar entregables vivos y dar los primeros pasos con agentes.',
    conceptos: ['skills-claude', 'artefactos-claude', 'intro-cowork', 'claude-code', 'agentes-claude'],
    desafio: 'Elige una tarea que tu equipo repite todas las semanas siempre igual (un reporte, una revisión, un consolidado). Descríbele a Claude el procedimiento paso a paso y pídele que lo deje como una Skill reutilizable. Después ejecútala con datos reales de esta semana y ajusta lo que salga torcido. Bonus: pídele que el resultado sea un Artefacto compartible. ⚡',
    quiz: [
      {
        q: '¿Qué es una Skill en Claude?',
        opts: ['Un procedimiento que le enseñas una vez y que después ejecuta igual cada vez que lo necesitas', 'Un curso en video dentro de la aplicación', 'Una insignia que ganas por usar la app', 'Un plan de suscripción más caro'],
        correct: 0,
        explain: 'Una Skill empaqueta un procedimiento repetible. Sirve justamente para estandarizar: la tarea sale igual de bien la haga quien la haga.'
      },
      {
        q: '¿Qué distingue a un Artefacto de una respuesta normal de chat?',
        opts: ['Que siempre es más largo', 'Que es un entregable funcional —dashboard, documento, herramienta— que puedes usar y compartir, no solo texto para leer', 'Que se borra a las 24 horas', 'Que solo funciona en el celular'],
        correct: 1,
        explain: 'El Artefacto convierte la respuesta en algo usable y compartible por link, en vez de dejarte texto que tienes que trasladar a mano a otra herramienta.'
      },
      {
        q: '¿Cuál es el salto clave que introduce Claude Cowork?',
        opts: ['Es un chat idéntico al anterior pero más rápido', 'Sirve solo para generar imágenes', 'Pasa de conversar a actuar: trabaja sobre tus archivos y ejecuta tareas reales, con tu supervisión', 'Es una app de mensajería interna'],
        correct: 2,
        explain: 'Cowork deja de solo aconsejar y empieza a hacer: lee archivos, crea documentos y ejecuta tareas por ti, siempre bajo tu supervisión.'
      },
      {
        q: '¿Cuál es un buen primer caso de uso para un agente?',
        opts: ['Borrar sin respaldo los archivos del servidor', 'Consolidar una carpeta de planillas en un reporte, probando primero sobre una copia', 'Enviar correos masivos a clientes sin revisar', 'Publicar solo en redes sociales sin supervisión'],
        correct: 1,
        explain: 'Alcance acotado, bajo riesgo y sobre una copia. La confianza en un agente se construye con resultados verificables antes de darle tareas críticas.'
      },
      {
        q: '¿Qué caracteriza a un agente bien diseñado?',
        opts: ['Tener el objetivo más amplio posible para que sirva para todo', 'Objetivo acotado, acceso limitado y un resultado que puedas verificar', 'No necesitar nunca supervisión humana', 'Usar la mayor cantidad de herramientas disponibles'],
        correct: 1,
        explain: 'Los agentes fallan por alcance demasiado abierto. Objetivo estrecho, permisos mínimos y salida verificable es lo que los hace confiables.'
      }
    ]
  }
];

// Una habilidad por concepto: marcar el check la desbloquea.
const COLORES = {
  1: ['#B45309', '#92400E', '#78350F', '#A16207', '#854D0E'],
  2: ['#D97706', '#C2410C', '#EA580C', '#9A3412'],
  3: ['#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#9333EA'],
};
const SKILLS = TALLERES.flatMap(t =>
  t.conceptos.map((id, i) => ({ id, taller: t.n, color: COLORES[t.n][i] }))
);

const SUPABASE_URL = 'https://adtyiqpcddxjnxfxrkod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdHlpcXBjZGR4am54Znhya29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM2NjQsImV4cCI6MjA4ODU1OTY2NH0.hTKgoum0LEmrFPj7LE7VbHTMNUocxovJqmkfOsTNubA';
const STARS_KEY = 'claude_pack_v2';
const USER_KEY  = 'claude_pack_user_v2';

let st = {};
let user = null;
const BLOQUES = {};

const T = n => TALLERES.find(t => t.n === n);

// En Vercel las rutas son /claude y /claude/taller-1. Abriendo los archivos
// directo (revisión local) no existen esos rewrites, así que caemos al .html.
const RUTA_PLANA = location.pathname.endsWith('.html');
const urlTaller  = n => RUTA_PLANA ? `/claude/taller.html?n=${n}` : `/claude/taller-${n}`;
const urlHub     = ()  => RUTA_PLANA ? '/claude/index.html' : '/claude';
// conceptos + ejercicios + quiz + desafío
const totalPasos = () => TALLERES.reduce((a, t) => a + t.conceptos.length + ejerciciosDe(t.n).length + 2, 0);

/* ---------------- Utilidades ---------------- */

function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function uuid(){
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function slugify(s){
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'sin-empresa';
}

/* ---------------- Progreso local ---------------- */

function loadStars(){ try { st = JSON.parse(localStorage.getItem(STARS_KEY)) || {}; } catch { st = {}; } }
function saveStars(){ localStorage.setItem(STARS_KEY, JSON.stringify(st)); }

const conceptosOk = n => T(n).conceptos.filter(id => st[`c-${id}`]).length;
const isComplete  = n => !!(st[`${n}-quiz`] && st[`${n}-des`]
  && conceptosOk(n) === T(n).conceptos.length
  && ejerciciosOk(n) === ejerciciosDe(n).length);
const countStars  = () => TALLERES.filter(t => isComplete(t.n)).length;
const skillsOk    = () => SKILLS.filter(s => st[`c-${s.id}`]).length;

function pasosHechos(){
  let p = 0;
  TALLERES.forEach(t => {
    if (st[`${t.n}-quiz`]) p++;
    if (st[`${t.n}-des`])  p++;
    p += conceptosOk(t.n) + ejerciciosOk(t.n);
  });
  return p;
}
const avancePct = () => Math.round((pasosHechos() / totalPasos()) * 100);

/* ---------------- Identidad ---------------- */

function loadUser(){
  try { user = JSON.parse(localStorage.getItem(USER_KEY)); } catch { user = null; }
  if (user && (!user.id || !user.nombre || !user.empresa_slug)) user = null;
}

const iniciales = nombre =>
  nombre.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?';

/* ---------------- Sync a Supabase (best-effort, nunca bloquea) ---------------- */

// La anon key no puede leer ni escribir las tablas directamente: solo
// ejecutar estas dos funciones. Así los emails nunca quedan expuestos
// a cualquiera que abra el código del portal.
function rpc(fn, args){
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(args)
  });
}

async function syncUser(){
  if (!user) return;
  try {
    await rpc('claude_registrar_participante', {
      p_id: user.id, p_nombre: user.nombre, p_email: user.email,
      p_empresa: user.empresa, p_empresa_slug: user.empresa_slug, p_cargo: user.cargo || null
    });
  } catch (e) { /* sin red: el progreso local sigue funcionando */ }
}

async function syncProgreso(taller, tipo, concepto, score, total){
  if (!user) return;
  try {
    await rpc('claude_registrar_progreso', {
      p_participante_id: user.id, p_empresa_slug: user.empresa_slug,
      p_taller: taller, p_tipo: tipo, p_concepto: concepto || '',
      p_quiz_score: (score === undefined ? null : score),
      p_quiz_total: (total === undefined ? null : total)
    });
  } catch (e) { /* idem */ }
}

// Reenvía todo lo que está completo localmente. Cubre el caso de que una
// escritura haya fallado (sin red, pestaña cerrada a medias) y evita que
// el panel muestre menos avance del que la persona realmente hizo.
async function resyncAll(){
  if (!user) return;
  for (const t of TALLERES){
    if (st[`${t.n}-quiz`]) await syncProgreso(t.n, 'quiz', '', st[`${t.n}-quizScore`], st[`${t.n}-quizTotal`]);
    if (st[`${t.n}-des`])  await syncProgreso(t.n, 'desafio', '');
    for (const id of t.conceptos) if (st[`c-${id}`]) await syncProgreso(t.n, 'concepto', id);
    for (const e of ejerciciosDe(t.n)) if (st[`e-${e.id}`]) await syncProgreso(t.n, 'ejercicio', e.id);
  }
}

/* ---------------- Contenido desde /bloques ---------------- */

async function cargarBloques(ids){
  const lista = [...new Set(ids || TALLERES.flatMap(t => t.conceptos))];
  await Promise.all(lista.map(async id => {
    try {
      // no-cache revalida contra el servidor: al editar un bloque, el cambio
      // se ve de inmediato en vez de quedar servido desde la caché del navegador.
      const r = await fetch(`/bloques/${id}/meta.json`, { cache: 'no-cache' });
      if (r.ok) BLOQUES[id] = await r.json();
    } catch (e) { /* la pantalla muestra un aviso en vez de romperse */ }
  }));
}

// Ejercicios hands-on del taller: salen del campo `desafio` de cada bloque,
// así el mismo ejercicio sirve para armar sesiones de cualquier cliente.
function ejerciciosDe(n){
  return T(n).conceptos
    .filter(id => BLOQUES[id] && BLOQUES[id].desafio)
    .map(id => {
      const d = BLOQUES[id].desafio;
      const obj = (typeof d === 'string') ? { enunciado: d } : d;
      return Object.assign({ id: id, bloque: BLOQUES[id] }, obj);
    });
}

const ejerciciosOk = n => ejerciciosDe(n).filter(e => st[`e-${e.id}`]).length;

// Primera imagen del bloque, si la tiene. Los bloques nuevos aún no traen.
function imagenDe(id){
  const b = BLOQUES[id];
  if (!b || !b.assets || !b.assets.length) return null;
  return `/bloques/${id}/${b.assets[0]}`;
}

/* ---------------- Shell compartido (gate, toast, habilidades) ---------------- */

function injectShell(){
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="toast" id="toast"></div>

  <div class="sk-overlay" id="sk-overlay">
    <div class="sk-sheet">
      <div class="sk-header">
        <div class="sk-htop">
          <div class="sk-title">🧠 Habilidades desbloqueadas</div>
          <button class="sk-close" id="sk-close">✕</button>
        </div>
        <div class="sk-sub" id="sk-sub"></div>
      </div>
      <div class="sk-grid" id="sk-grid"></div>
    </div>
  </div>

  <div class="gate" id="gate">
    <div class="gate-box">
      <div class="gate-ico">👋</div>
      <div class="gate-title">Antes de partir, cuéntanos quién eres</div>
      <div class="gate-sub">Así guardamos tu avance y tu empresa puede ver cómo va el equipo. No hay contraseña ni registro: son 10 segundos.</div>
      <div class="gate-field"><label for="g-nombre">Nombre y apellido</label><input type="text" id="g-nombre" autocomplete="name" placeholder="Ej: Ana Pérez" /></div>
      <div class="gate-field"><label for="g-email">Email corporativo</label><input type="email" id="g-email" autocomplete="email" placeholder="ana.perez@empresa.cl" /></div>
      <div class="gate-field"><label for="g-empresa">Empresa</label><input type="text" id="g-empresa" autocomplete="organization" placeholder="Ej: Minera Los Andes" /></div>
      <div class="gate-field"><label for="g-cargo">Cargo</label><input type="text" id="g-cargo" autocomplete="organization-title" placeholder="Ej: Jefa de Operaciones" /></div>
      <div class="gate-err" id="gate-err"></div>
      <button class="gate-btn" id="gate-ok">Entrar al portal →</button>
      <button class="gate-cancel" id="gate-cancel">Cancelar</button>
      <div class="gate-note">Usamos estos datos solo para reportar el avance del programa a tu empresa. No enviamos publicidad ni compartimos tu correo con terceros.</div>
    </div>
  </div>`;
  document.body.appendChild(div);

  document.getElementById('gate-ok').onclick = submitGate;
  document.getElementById('gate-cancel').onclick = closeGate;
  document.getElementById('sk-close').onclick = () => closeSkills();
  document.getElementById('sk-overlay').onclick = e => closeSkills(e);
  document.getElementById('gate').addEventListener('keydown', e => { if (e.key === 'Enter') submitGate(); });
}

function toast(msg){
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ---------------- Gate ---------------- */

function openGate(edit){
  if (edit && user){
    document.getElementById('g-nombre').value  = user.nombre;
    document.getElementById('g-email').value   = user.email;
    document.getElementById('g-empresa').value = user.empresa;
    document.getElementById('g-cargo').value   = user.cargo || '';
  }
  document.getElementById('gate-cancel').classList.toggle('show', !!user);
  document.getElementById('gate-err').classList.remove('show');
  document.getElementById('gate').classList.add('open');
  setTimeout(() => document.getElementById('g-nombre').focus(), 150);
}

function closeGate(){
  if (!user) return;
  document.getElementById('gate').classList.remove('open');
}

function gateError(msg, id){
  const el = document.getElementById('gate-err');
  el.textContent = msg;
  el.classList.add('show');
  ['g-nombre','g-email','g-empresa','g-cargo'].forEach(i => document.getElementById(i).classList.remove('err'));
  if (id) document.getElementById(id).classList.add('err');
}

function submitGate(){
  const nombre  = document.getElementById('g-nombre').value.trim();
  const email   = document.getElementById('g-email').value.trim().toLowerCase();
  const empresa = document.getElementById('g-empresa').value.trim();
  const cargo   = document.getElementById('g-cargo').value.trim();

  if (nombre.length < 3)  return gateError('Escribe tu nombre y apellido.', 'g-nombre');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return gateError('Revisa tu email, algo no cuadra.', 'g-email');
  if (empresa.length < 2) return gateError('Falta el nombre de tu empresa.', 'g-empresa');
  if (cargo.length < 2)   return gateError('Falta tu cargo.', 'g-cargo');

  document.getElementById('gate-err').classList.remove('show');
  user = { id: (user && user.id) || uuid(), nombre, email, empresa, cargo, empresa_slug: slugify(empresa) };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.getElementById('gate').classList.remove('open');
  if (typeof onIdentidad === 'function') onIdentidad();
  syncUser().then(resyncAll);
}

/* ---------------- Centro de habilidades ---------------- */

function renderSkills(animar){
  const grid = document.getElementById('sk-grid');
  if (!grid) return;
  grid.innerHTML = SKILLS.map(sk => {
    const b  = BLOQUES[sk.id];
    const on = !!st[`c-${sk.id}`];
    const pop = (animar === sk.id && on) ? ' pop' : '';
    const nombre = b ? b.nombre : sk.id;
    return `<div class="sk ${on ? 'on' : 'off'}${pop}" style="${on ? `background:${sk.color};` : ''}" title="${esc(nombre)}">
      ${!on ? '<span class="sk-lock">🔒</span>' : ''}
      <span class="sk-icon">${b ? b.emoji : '•'}</span>
      <span class="sk-name">${esc(nombre)}</span>
    </div>`;
  }).join('');
  const sub = document.getElementById('sk-sub');
  if (sub) sub.textContent = `${skillsOk()} de ${SKILLS.length} habilidades desbloqueadas`;
}

function openSkills(){ renderSkills(); document.getElementById('sk-overlay').classList.add('open'); }
function closeSkills(e){
  if (e && e.target !== document.getElementById('sk-overlay')) return;
  document.getElementById('sk-overlay').classList.remove('open');
}

/* ---------------- Arranque compartido ---------------- */

async function bootPortal(ids){
  injectShell();
  loadStars();
  loadUser();
  if (!user) openGate(false);
  else syncUser().then(resyncAll);
  await cargarBloques(ids);
}

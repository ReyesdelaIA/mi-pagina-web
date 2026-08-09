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
    title: 'Dominio de la App de Claude',
    dur: '1.5 hrs · Presencial · Hands-On',
    resumen: 'Dejar de gastar contexto innecesariamente: tokens, Markdown, Proyectos con instrucciones propias y Claude metido dentro del Office.',
    conceptos: ['tokens-claude', 'markdown-claude', 'proyectos-claude', 'claude-en-office'],
    desafio: {
      titulo: 'El proyecto de tu área, armado de punta a punta',
      intro: 'Los cuatro bloques de hoy son en realidad un solo camino: entiendes cómo se gasta el contexto, aprendes a convertir tus documentos al formato que menos pesa, montas con ellos un Proyecto con instrucciones propias, y lo pones a trabajar sobre un archivo real de tu Office. Este desafío los junta en una sola tarea.',
      pasos: [
        'Elige el proceso de tu área que más repites. Si en la Sesión 1 hiciste el consolidado de dos documentos, ese mismo sirve: hoy vas a dejar de repetirle el contexto para siempre.',
        'Busca el instructivo, manual o plantilla que ocupas para ese proceso, súbelo a un chat y pídele que te lo convierta a Markdown limpio, dentro de un bloque de código. Cópialo.',
        'Crea un Proyecto nuevo con el nombre de tu área y pégale ese MD como conocimiento. Súbele también un par de ejemplos de trabajos bien hechos.',
        'Escríbele las instrucciones en Markdown, con las cuatro secciones: Quién soy, Qué hacemos acá, Cómo quiero que me respondas y Reglas. Si te cuesta partir, pídeselas a Claude en otro chat y después las ajustas.',
        'Abre una conversación dentro del proyecto y lánzale el encargo de abajo, adjuntando un archivo de verdad —una planilla, un informe, una presentación— sin explicarle ningún contexto.',
        'Compara el resultado contra lo que te habría dado un chat en blanco. Y cuando algo salga torcido, no lo corrijas solo en el chat: vuelve a las instrucciones y agrega la regla que faltaba.'
      ],
      prompt: 'Te adjunto un archivo real de mi trabajo. Sin que yo te explique nada de contexto —para eso están las instrucciones y el conocimiento de este proyecto—, quiero que hagas la tarea que corresponde según nuestro procedimiento: revísalo, dime qué está bien, qué está mal y qué falta, y entrégamelo en el formato que definimos. Al final, dime qué información te faltó del proyecto para hacerlo mejor: eso lo voy a agregar a las instrucciones.',
      cierre: 'Ese último punto es el que importa: lo que te responda es la lista de mejoras de tu propio proyecto. Guarda el proyecto andando y llévalo a la Sesión 3, donde el procedimiento que hoy escribiste como instrucciones lo vamos a convertir en algo que se ejecuta solo.'
    },
    quiz: [
      {
        q: '¿Por qué la respuesta número 40 de un hilo largo consume mucho más que la primera?',
        opts: ['Porque el modelo se cansa y necesita más recursos', 'Porque en cada mensaje nuevo vuelve a leer toda la conversación desde el principio', 'Porque después de 30 mensajes cambia automáticamente a un modelo más caro', 'Porque el precio sube según la hora del día'],
        correct: 1,
        explain: 'El hilo no se lee una vez: se relee entero en cada turno. Por eso una conversación eterna se pone lenta y cara, y por eso un chat por tema es el hábito que más rinde.'
      },
      {
        q: '¿Cuál de estas prácticas NO te ahorra contexto?',
        opts: ['Pedir salidas acotadas ("solo el párrafo corregido, no el documento entero")', 'Abrir un chat nuevo cuando cambias de tema', 'Dejar siempre el esfuerzo en Extra, por si acaso', 'Subir el archivo y decirle qué parte te importa'],
        correct: 2,
        explain: 'El esfuerzo se ajusta a la tarea. Reformular un correo no necesita razonamiento profundo; comparar dos contratos sí. Gastar de más y quedarse corto cuestan los dos.'
      },
      {
        q: 'Tienes un instructivo en Word y lo quieres dejar como base de un Proyecto. ¿Por qué conviene convertirlo antes a Markdown?',
        opts: ['Porque Claude no puede leer archivos de Word', 'Porque el MD queda protegido con contraseña', 'Porque en MD el contenido pesa una fracción de los tokens y queda editable y comparable', 'Porque Markdown traduce el documento automáticamente'],
        correct: 2,
        explain: 'Claude lee el Word perfectamente, pero arrastra toda la maquetación. En MD el mismo contenido ocupa mucho menos contexto, se edita línea a línea y puedes ver exactamente qué cambió.'
      },
      {
        q: 'En un Proyecto, ¿cuál es la diferencia entre el conocimiento y las instrucciones?',
        opts: ['Son lo mismo, solo cambia dónde se escriben', 'El conocimiento son los archivos que consulta; las instrucciones definen cómo debe comportarse', 'El conocimiento es privado y las instrucciones son públicas', 'Las instrucciones se borran al cerrar la conversación'],
        correct: 1,
        explain: 'Los documentos son lo que sabe; las instrucciones son quién es. Por eso las instrucciones se escriben en Markdown y estructuradas: separan identidad, formato y reglas en vez de mezclarlas en un párrafo.'
      },
      {
        q: 'Con el complemento de Claude en Excel, ¿qué le puedes pedir?',
        opts: ['Solo que observe lo que le entregas: los productos con más ventas, el estado del inventario', 'Solo que te explique cómo se crea una fórmula', 'Solo que te arme gráficos a partir de los datos', 'Muchas cosas: que te cree las fórmulas, te revise posibles errores, te haga los gráficos, te cambie los formatos condicionales, y bastante más'],
        correct: 3,
        explain: 'Claude en Excel no se queda en mirar ni en explicar: crea, corrige y da formato dentro de la planilla. Por eso conviene pedirle tareas concretas en vez de un «analiza este Excel» a secas.'
      }
    ]
  },
  {
    n: 3,
    label: 'Sesión 3 · Claude Avanzado',
    title: 'Conectores, Skills, Artefactos & Cowork',
    dur: '1.5 hrs · Presencial · Hands-On',
    resumen: 'El salto de conversar a delegar: conectar Claude a tus herramientas, estandarizar procedimientos, generar entregables vivos y ponerlo a trabajar sobre tus propios archivos.',
    conceptos: ['mcp-conectores', 'skills-claude', 'artefactos-claude', 'intro-cowork'],
    desafio: {
      titulo: 'El procedimiento que se ejecuta solo',
      intro: 'En la Sesión 1 aprendiste a hablarle. En la Sesión 2 dejaste de repetirle el contexto. Hoy cierras el círculo: ese mismo procedimiento que escribiste como instrucciones se convierte en algo que se ejecuta sobre tus archivos de verdad. Los cuatro bloques de la sesión son las cuatro piezas de esta única tarea.',
      pasos: [
        'Abre el Proyecto que armaste en la Sesión 2 y copia sus instrucciones. Ese texto es el borrador de tu primera Skill: ya tiene quién eres, qué hacen, cómo quieres las respuestas y las reglas.',
        'Cruza el puente. Activa el conector de donde viven de verdad esos documentos —Drive, Gmail, el calendario— y entra a sus permisos: deja las herramientas de solo lectura en «permitir siempre» y las de escritura/eliminación en «preguntar cada vez». No te saltes este paso: es el que te deja dormir tranquilo.',
        'Pégale esas instrucciones a Claude y pídele que las deje como una Skill (tienes el prompt abajo). Súbele también los assets que esa tarea necesita: el logo, la plantilla, un ejemplo de trabajo bien hecho.',
        'Ahora la parte que no se puede hacer desde el navegador: abre la aplicación de escritorio de Claude, entra a Cowork y préstale como sandbox una carpeta real con material de esa tarea. Cuando el computador te pida autorizar el acceso, dale Permitir.',
        'Lánzale el encargo y déjalo trabajar. Vas a ver los subagentes avanzando en paralelo y los archivos apareciendo en tu carpeta mientras miras.',
        'Pídele que el entregable final sea un Artefacto: un tablero o una ficha que puedas abrir, revisar y mandar por link.',
        'Y el paso que casi todos se saltan: lee el reporte del final completo, sobre todo la parte de lo que NO pudo hacer. Ahí está la lista de lo que le falta a tu Skill.'
      ],
      prompt: 'Te voy a pasar las instrucciones de un proyecto mío. Quiero que las conviertas en una Skill reutilizable: define cuándo debe activarse, el procedimiento paso a paso, el formato exacto de salida y qué archivos de referencia necesita. Después ejecútala sobre los archivos de la carpeta que te di: haz la tarea completa, deja los resultados en una subcarpeta nueva sin tocar los originales, y entrégame el resumen final como un artefacto compartible. Al terminar, dime qué no pudiste hacer y qué te faltó saber.',
      cierre: 'Si llegaste hasta acá, ya no tienes un chat que te aconseja: tienes un procedimiento tuyo, con tus datos, que se ejecuta sobre tus archivos y te entrega algo compartible. Eso es todo el programa en una sola tarea. Guarda la Skill y el conector: de ahí en adelante, cada tarea repetitiva que agregues es una hora que no vuelves a gastar.'
    },
    quiz: [
      {
        q: 'Quieres conectar Claude a tu Drive del trabajo y el botón de conectar te aparece bloqueado. ¿Qué está pasando?',
        opts: ['Tu plan no incluye conectores y hay que comprar el complemento', 'Tienes que instalar un programa aparte antes de poder conectarlo', 'Tu cuenta de Claude es de la empresa, y quien administra la consola todavía no habilita ese conector', 'Los conectores se activan solos después de 24 horas de uso'],
        correct: 2,
        explain: 'Con una cuenta personal conectas y listo, sin pedirle permiso a nadie. Pero si tu cuenta es Team, Enterprise o parte de una organización, el conector puede venir bloqueado y hay que pedírselo a TI o a quien administre la consola. Nada de esto se instala ni se programa: el requisito de fondo es simplemente tener cuenta al otro lado del puente.'
      },
      {
        q: 'Llevas un año armando propuestas comerciales y siempre terminas peleando con el mismo formato. ¿Qué te conviene hacer?',
        opts: ['Escribir un prompt muy largo y guardarlo en un bloc de notas para pegarlo cada vez', 'Armar una Skill con el procedimiento, el formato de salida y tus assets: logo, plantilla y un par de ejemplos buenos', 'Abrir un chat nuevo cada vez y explicarle todo de cero, así no se contamina', 'Pedirle a un compañero que te mande su última propuesta y editarla a mano'],
        correct: 1,
        explain: 'Ese es exactamente el caso que justifica una Skill: la construyes una sola vez —instrucciones, formato y archivos de referencia— y de ahí en adelante te entrega siempre el mismo output. El prompt guardado en un bloc de notas te ahorra tipeo, pero no te ahorra el trabajo de volver a explicar el contexto y los assets cada vez.'
      },
      {
        q: 'Descargaste tu artefacto y quedó como un HTML en tu computador. ¿Qué es lo único que NO va a funcionar al mandárselo a otra persona?',
        opts: ['Los colores y el diseño, que se pierden al descargar', 'Los datos que no quedaron incrustados dentro del código: esos necesitan otro tratamiento', 'Los botones, porque dejan de responder fuera de Claude', 'Nada: un artefacto descargado no se puede abrir en otro computador'],
        correct: 1,
        explain: 'El HTML descargado se lleva todo adentro —diseño, botones, interactividad— y se abre en cualquier navegador. Lo que no viaja son los datos que viven fuera del archivo: para eso hay que incrustarlos o conectarlos, que ya es harina de otro costal.'
      },
      {
        q: 'Entras a claude.ai desde Chrome, aprietas el botón «Cowork» y le pides que te ordene una carpeta de tu computador. No pasa nada. ¿Por qué?',
        opts: ['Porque Cowork solo funciona los días hábiles en horario de oficina', 'Porque primero hay que subir los archivos uno por uno', 'Porque el Cowork que se conecta con tu terminal existe solo en la aplicación de escritorio: el botón de la web es otra función', 'Porque Chrome bloquea el acceso y hay que usar Safari'],
        correct: 2,
        explain: 'Es la confusión más común: el botón «Cowork» también aparece en la página web, pero esa no es la función que se conecta con la terminal de tu computador. Para que trabaje sobre tus carpetas reales tiene que ser desde la app de escritorio instalada en tu máquina.'
      },
      {
        q: 'Le vas a dar acceso a Cowork por primera vez. ¿Qué es lo que realmente le estás entregando?',
        opts: ['El control de todo tu computador, así que conviene tener respaldo de todo', 'Un sandbox: la carpeta que tú elijas, y fuera de esa isla no existe nada para él', 'Solo permiso de lectura, porque nunca puede modificar archivos', 'Acceso a la nube de Claude, no a tu computador'],
        correct: 1,
        explain: 'No le abres el computador entero: le prestas una isla. Dentro de esa carpeta puede leer, crear, editar y eliminar —por eso el sistema te pide autorizar el acceso con Permitir—, y fuera de ella no llega. Tú eliges qué isla le prestas.'
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

// El portal va versionado en la ruta: cada edición vive en su propia carpeta
// y la anterior deja de existir. Para sacar una nueva basta con renombrar el
// directorio, cambiar estas dos constantes y actualizar los rewrites.
const BASE    = '/claude-jul26-k7x9';
const VERSION = 'Julio 26';

// En Vercel las rutas son /claude-jul26-k7x9 y /claude-jul26-k7x9/taller-1.
// Abriendo los archivos directo (revisión local) no existen esos rewrites,
// así que caemos al .html.
const RUTA_PLANA = location.pathname.endsWith('.html');
const urlTaller  = n => RUTA_PLANA ? `${BASE}/taller.html?n=${n}` : `${BASE}/taller-${n}`;
const urlHub     = ()  => RUTA_PLANA ? `${BASE}/index.html` : BASE;
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
function rpc(fn, args, conRespuesta){
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };
  // Las escrituras no devuelven nada; la recuperación sí necesita el cuerpo.
  if (!conRespuesta) headers['Prefer'] = 'return=minimal';
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', headers, body: JSON.stringify(args)
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

// Detalle del quiz: qué alternativa marcó en cada pregunta. Es lo que después
// permite ver en qué se equivoca más la gente de una empresa.
async function syncRespuesta(taller, pregunta, elegida, correcta){
  if (!user) return;
  try {
    await rpc('claude_registrar_respuesta', {
      p_participante_id: user.id, p_empresa_slug: user.empresa_slug,
      p_taller: taller, p_pregunta: pregunta,
      p_elegida: elegida, p_correcta: correcta
    });
  } catch (e) { /* idem: nunca bloquea el quiz */ }
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
      <button class="sk-close" id="sk-close">✕</button>
      <div class="sk-header">
        <div class="sk-eyebrow">Centro de habilidades</div>
        <div class="sk-score">
          <div class="sk-ring" id="sk-ring">
            <svg viewBox="0 0 120 120">
              <circle class="sk-ring-bg" cx="60" cy="60" r="52"></circle>
              <circle class="sk-ring-fg" id="sk-ring-fg" cx="60" cy="60" r="52"></circle>
            </svg>
            <div class="sk-ring-n"><b id="sk-n">0</b><i id="sk-tot">/0</i></div>
          </div>
          <div class="sk-score-t">
            <div class="sk-title" id="sk-title">Vas comenzando</div>
            <div class="sk-sub" id="sk-sub"></div>
            <div class="sk-rangos" id="sk-rangos"></div>
          </div>
        </div>
      </div>
      <div class="sk-body" id="sk-body"></div>
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
  // Primero recuperamos lo que ya hizo (puede venir de otro dispositivo) y
  // recién ahí registramos y reenviamos, para no partir de cero.
  recuperarProgreso().then(recuperado => {
    if (recuperado && typeof onProgresoRecuperado === 'function') onProgresoRecuperado();
    else if (typeof onIdentidad === 'function') onIdentidad();
    return syncUser().then(resyncAll);
  });
}

// Trae el avance guardado en el servidor a partir del correo y lo mezcla con
// lo que haya en este navegador. Nunca borra progreso local: solo suma.
async function recuperarProgreso(){
  if (!user || !user.email) return false;
  let data;
  try {
    const r = await rpc('claude_recuperar', { p_email: user.email }, true);
    if (!r.ok) return false;
    data = await r.json();
  } catch (e) { return false; }
  if (!data || !data.id) return false;

  // Adoptamos el id con el que ya estaba registrado: así el panel no lo
  // cuenta dos veces por haber entrado desde el computador y el celular.
  if (user.id !== data.id){
    user.id = data.id;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  let nuevo = 0;
  (data.progreso || []).forEach(p => {
    const k = p.tipo === 'concepto' ? `c-${p.concepto}`
            : p.tipo === 'ejercicio' ? `e-${p.concepto}`
            : p.tipo === 'quiz'     ? `${p.taller}-quiz`
            : p.tipo === 'desafio'  ? `${p.taller}-des` : null;
    if (!k) return;
    if (!st[k]) { st[k] = true; nuevo++; }
    if (p.tipo === 'quiz'){
      if (p.quiz_score != null) st[`${p.taller}-quizScore`] = p.quiz_score;
      if (p.quiz_total != null) st[`${p.taller}-quizTotal`] = p.quiz_total;
    }
  });
  if (nuevo) saveStars();
  return nuevo > 0;
}

/* ---------------- Centro de habilidades ---------------- */

// Los rangos le dan una meta intermedia a la colección: sin esto, ir de 4 a 13
// es una cuesta larga sin nada que celebrar en el medio.
const RANGOS = [
  { min: 0,    nombre: 'Explorador',  icono: '🌱' },
  { min: 0.25, nombre: 'Practicante', icono: '⚡' },
  { min: 0.5,  nombre: 'Operador',    icono: '🔧' },
  { min: 0.75, nombre: 'Estratega',   icono: '🎯' },
  { min: 1,    nombre: 'Maestro',     icono: '👑' }
];
const rangoDe = pct => RANGOS.filter(r => pct >= r.min).pop();

function renderSkills(animar){
  const body = document.getElementById('sk-body');
  if (!body) return;

  const total = SKILLS.length, hechas = skillsOk();
  const pct = total ? hechas / total : 0;

  // Aro de progreso
  const fg = document.getElementById('sk-ring-fg');
  if (fg){
    const largo = 2 * Math.PI * 52;
    fg.style.strokeDasharray = largo;
    fg.style.strokeDashoffset = largo * (1 - pct);
  }
  document.getElementById('sk-n').textContent   = hechas;
  document.getElementById('sk-tot').textContent = `/${total}`;
  document.getElementById('sk-ring').classList.toggle('full', hechas === total && total > 0);

  const rango = rangoDe(pct);
  document.getElementById('sk-title').textContent = `${rango.icono} ${rango.nombre}`;
  const faltan = total - hechas;
  document.getElementById('sk-sub').textContent = hechas === 0
    ? `Desbloquea tu primera habilidad para empezar la colección.`
    : faltan === 0
      ? `Colección completa: dominaste las ${total} habilidades.`
      : `Llevas ${hechas} de ${total}. Te faltan ${faltan} para completar la colección.`;

  document.getElementById('sk-rangos').innerHTML = RANGOS.map(r =>
    `<span class="sk-rango ${pct >= r.min ? 'on' : ''}" title="${esc(r.nombre)}">${r.icono}</span>`
  ).join('');

  // Las habilidades van agrupadas por sesión: se ve de dónde sale cada una
  body.innerHTML = TALLERES.map(t => {
    const dela = SKILLS.filter(s => s.taller === t.n);
    const ok = dela.filter(s => st[`c-${s.id}`]).length;
    return `
    <section class="sk-grupo">
      <div class="sk-gtop">
        <span class="sk-glabel">${esc(t.label)}</span>
        <span class="sk-gcount ${ok === dela.length ? 'full' : ''}">${ok}/${dela.length}</span>
      </div>
      <div class="sk-grid">
        ${dela.map(sk => {
          const b = BLOQUES[sk.id];
          const on = !!st[`c-${sk.id}`];
          const pop = (animar === sk.id && on) ? ' pop' : '';
          // La medalla lleva el nombre corto; el largo queda en el tooltip
          const nombre = b ? (b.habilidad || b.nombre) : sk.id;
          return `<div class="sk ${on ? 'on' : 'off'}${pop}" style="${on ? `--sk-c:${sk.color};` : ''}" title="${esc(b ? b.nombre : sk.id)}">
            <span class="sk-medalla">
              <span class="sk-icon">${on ? (b ? b.emoji : '★') : '🔒'}</span>
            </span>
            <span class="sk-name">${esc(nombre)}</span>
          </div>`;
        }).join('')}
      </div>
    </section>`;
  }).join('');
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
  else {
    // Esperamos la recuperación (con tope de 3s) para que la primera pantalla
    // ya se dibuje con el avance real, venga del navegador o del servidor.
    await Promise.race([recuperarProgreso(), new Promise(r => setTimeout(r, 3000))]);
    syncUser().then(resyncAll);
  }
  await cargarBloques(ids);
}

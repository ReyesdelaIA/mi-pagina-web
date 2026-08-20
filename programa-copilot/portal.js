/* ==================================================================
   Programa Copilot · lógica compartida entre el hub y las sesiones
   ------------------------------------------------------------------
   El contenido de cada concepto vive en /bloques/<id>/meta.json:
   una sola fuente de verdad, reutilizable para armar sesiones de
   cualquier cliente.
   ================================================================== */

const TALLERES = [
  {
    n: 1,
    label: "Sesión 1 · Fundamentos",
    title: "Iniciación al uso de IA",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "El piso común antes de entrar a Copilot: por qué esto es serio, cómo se le habla a una IA y qué hay que cuidar.",
    conceptos: ["ia-panorama", "ia-tres-verdades", "prompt-tres-reglas", "ia-cuatro-esferas", "ia-mundo-real"],
    desafio: {
      titulo: "Tu primer prompt de verdad",
      intro: "Toma una tarea real que hiciste esta semana —un correo difícil, un resumen, una propuesta— y vuelve a hacerla con IA aplicando las 3 reglas de oro.",
      pasos: [
        "Escribe primero el prompt corto que habrías escrito antes de este taller. Guarda esa respuesta.",
        "Ahora escribe el prompt completo: rol, contexto, tarea y formato. Usa el dictado si te da lata tipear.",
        "Compara los dos resultados lado a lado y anota qué cambió.",
        "Itera al menos dos veces sobre el segundo, hasta que quede mejor que lo que hiciste a mano.",
        "Verifica todo dato importante que haya aparecido: cifras, nombres, fechas."
      ],
      prompt: "Eres [ROL]. Contexto: [SITUACIÓN COMPLETA, PARA QUIÉN ES Y POR QUÉ]. Tarea: [QUÉ NECESITAS EXACTAMENTE]. Formato: [LARGO, TONO Y ESTRUCTURA]. Si algo no te queda claro, pregúntamelo antes de escribir.",
      cierre: "Si el segundo resultado no te ganó al primero, casi seguro faltó contexto — no herramienta."
    },
    quiz: [
      { q: "Según lo que vimos, ¿cuál es la idea de fondo sobre el impacto de la IA en el trabajo?", opts: ["La IA va a reemplazar a la mayoría de los profesionales en 2 años", "La IA no reemplaza personas, pero las personas que la ocupan sí reemplazan a las que no la ocupan", "La IA solo sirve para trabajos técnicos y de programación", "Conviene esperar a que la tecnología madure antes de aprenderla"], correct: 1, explain: "Harvard Business Review, Forbes y Fast Company lo resumen igual, y Tom Davenport lo dijo en una frase: «La IA no te quitará tu trabajo, lo hará alguien que ocupe la IA mejor que tú». Empezar hoy es la única ventaja competitiva real." },
      { q: "Tienes tres informes largos y necesitas sacar las diferencias entre ellos. ¿En qué esfera de la IA estás?", opts: ["Redacción", "Internet", "Análisis", "Multimedia"], correct: 2, explain: "Análisis es leer archivos por ti: adjuntas los PDFs, Word o Excel y la IA los compara y resume. Es la esfera que más horas ahorra en oficina y la que menos gente ocupa — lo que era una tarde pasa a diez minutos." },
      { q: "Cuando decimos que la IA «alucina», nos referimos a que…", opts: ["Se apaga cuando la pregunta es muy difícil", "Entrega información falsa redactada con total seguridad", "Solo funciona con conexión a internet", "Repite siempre la misma respuesta"], correct: 1, explain: "La alucinación es información inventada pero presentada con confianza. No miente a propósito: es la naturaleza estadística del modelo. Por eso todo dato crítico —cifras, nombres, fechas, normas— se verifica antes de usarlo." },
      { q: "De las 3 reglas de oro del prompt, ¿cuál es la que más gente incumple?", opts: ["Quedarse con la primera respuesta en vez de iterar 2 o 3 veces", "Escribir en español en vez de inglés", "Usar mayúsculas al principio de cada frase", "Hacer las preguntas de a una por vez"], correct: 0, explain: "La regla mental es clara: si te quedaste con la primera respuesta de la IA, seguramente la estás ocupando mal. El valor está en la conversación — pedir cambios, contradecir, pedir alternativas." },
      { q: "Recibes un audio de tu jefe pidiéndote una transferencia urgente. ¿Cuál es la forma más simple y efectiva de descartar un deepfake?", opts: ["Escuchar el audio varias veces buscando ruidos raros", "Hacerle una pregunta que solo esa persona pueda responder", "Pedirle que mande el audio de nuevo", "Revisar si el número desde el que llegó es conocido"], correct: 1, explain: "Es exactamente lo que salvó a Ferrari: un dirigente le hizo al supuesto CEO una pregunta personal que solo el verdadero podía responder. Un dato familiar o una broma interna vale más que cualquier análisis técnico del audio." }
    ]
  },
  {
    n: 2,
    label: "Sesión 2 · Copilot",
    title: "Copilot en tu día a día",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Dejar Copilot andando y sacarle partido: activación, tour por la herramienta, memoria, voz, imágenes y cuadernos.",
    conceptos: ["intro-copilot", "activacion-copilot", "copilot-tour", "memoria-copilot", "dictado-copilot", "voz-conversacional-movil", "crear-con-copilot", "cuadernos-copilot"],
    desafio: {
      titulo: "Copilot como tu asistente personal",
      intro: "Deja Copilot configurado a tu medida y úsalo una vez de punta a punta.",
      pasos: [
        "Enciende la memoria y logra que memorice 5 cosas relevantes de ti y de tu rol. Después pregúntale «¿qué sabes de mí?» para verificar.",
        "Instala la app en tu celular con la misma cuenta y ten una conversación hablada de 5 minutos sobre un tema de tu trabajo. Al final pídele el resumen por escrito.",
        "Entra a Crear y genera una imagen o pieza visual para algo tuyo de verdad.",
        "Arma un cuaderno con 3 documentos de un mismo proyecto y hazle tres preguntas que antes te habrían tomado media hora de lectura."
      ],
      prompt: "Memoriza lo siguiente sobre mí: soy [CARGO] en [ÁREA]. Mis tareas habituales son [TAREAS]. Prefiero respuestas [LARGO Y TONO]. A partir de ahora, considera esto en todas nuestras conversaciones.",
      cierre: "Ojo con el modo Work: si el selector quedó en Web, Copilot no va a ver ninguno de tus archivos."
    },
    quiz: [
      { q: "¿Qué modo debes elegir al ingresar a Copilot con tu cuenta corporativa?", opts: ["Personal", "Student", "Work", "Enterprise"], correct: 2, explain: "El modo Work conecta Copilot con tu cuenta corporativa y tus datos de Microsoft 365: OneDrive, SharePoint, Outlook y Teams. En modo Web funciona como cualquier chat y no sabe nada de ti ni de tu empresa." },
      { q: "¿Qué modelos de lenguaje utiliza Copilot de Microsoft?", opts: ["Solo ChatGPT", "Solo Gemini", "Solo Claude", "GPT y Claude"], correct: 3, explain: "Copilot no usa un solo modelo: Microsoft integra tanto GPT (de OpenAI) como Claude (de Anthropic) según la tarea, y en varias partes puedes elegir a mano. Gemini es de Google y no está en Copilot." },
      { q: "¿Cuál es la diferencia entre el dictado y el modo de voz conversacional?", opts: ["Ninguna, son dos nombres para lo mismo", "El dictado convierte tu voz en texto; el modo conversacional es un ida y vuelta hablado donde la IA te responde con voz", "El dictado solo existe en el celular", "El modo conversacional solo funciona en inglés"], correct: 1, explain: "El dictado transcribe y ahí se acaba. El modo conversacional es una conversación real: puedes interrumpirla, cambiar de tema y pedirle que se explique de otra forma — ideal para pensar en voz alta mientras manejas o caminas." },
      { q: "Le pediste a Copilot que memorizara algo y quieres revisar qué guardó. ¿Cuál es la forma más rápida?", opts: ["Abrir un chat nuevo y esperar a ver si lo aplica", "Preguntarle directamente «¿qué sabes de mí? dame el resultado en bullets»", "Escribirle a soporte de Microsoft", "Revisar el historial completo de conversaciones"], correct: 1, explain: "Preguntarle directamente es la forma más rápida de auditar la memoria y detectar datos incorrectos. Para borrarlas una a una: Configuración → Personalización." },
      { q: "¿Qué es un Cuaderno de Copilot?", opts: ["Una carpeta de OneDrive con permisos especiales", "Un espacio donde agrupas archivos y notas sobre un tema, y Copilot responde solo con esas fuentes y con citas", "Un documento de Word con formato automático", "Un chat que se borra al cerrarlo"], correct: 1, explain: "Es la respuesta de Copilot a NotebookLM: acotas las fuentes a un tema y las respuestas salen aterrizadas en ellas, con citas, sin traer ruido de otros lados. Ideal para un proyecto puntual." }
    ]
  },
  {
    n: 3,
    label: "Sesión 3 · Copilot",
    title: "Copilot dentro de M365",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Copilot metido en las herramientas donde ya trabajas: Word, PowerPoint, Excel, Outlook, Teams y SharePoint.",
    conceptos: ["copilot-m365-hub", "copilot-word", "copilot-powerpoint", "copilot-excel", "copilot-outlook", "copilot-teams", "copilot-sharepoint"],
    desafio: {
      titulo: "El flujo Pro: de datos crudos a presentación lista",
      intro: "Sin salir de M365, haz el recorrido completo con datos reales de tu área.",
      pasos: [
        "Abre un Excel real tuyo —KPIs, ventas, lo que tengas—, activa Copilot y cambia el modelo automático a Claude.",
        "Pídele que analice los datos y genere 2 o 3 gráficos.",
        "Abre PowerPoint con Copilot y pídele que arme una presentación ejecutiva basada en ese análisis.",
        "Pule un par de slides con instrucciones en lenguaje natural.",
        "Redacta desde Outlook, con Copilot, el correo que acompaña la presentación."
      ],
      prompt: "Analiza esta planilla y dime las 3 conclusiones más relevantes para un comité ejecutivo. Genera los gráficos que mejor las respalden y explícame en una línea por qué elegiste cada tipo de gráfico.",
      cierre: "Si Copilot se pierde con la planilla, revisa la estructura antes que el prompt: celdas combinadas e imágenes incrustadas son la causa habitual."
    },
    quiz: [
      { q: "¿Qué se puede hacer con Copilot dentro de Word?", opts: ["Redactar cosas desde cero", "Es solo para documentos ya existentes", "Te corrige la ortografía con inteligencia artificial", "Todo: documentos en blanco, documentos ya existentes, resumir, reescribir y mucho más"], correct: 3, explain: "Copilot en Word es muy versátil — puedes partir desde cero, mejorar un documento existente, resumir, reescribir y mucho más. No está limitado a corrección ortográfica ni a documentos previos." },
      { q: "¿Es importante que el Excel tenga una estructura ordenada para que la IA lo trabaje bien?", opts: ["No, da lo mismo mientras uses un buen modelo", "Sí, es fundamental: evita celdas combinadas, imágenes incrustadas y encabezados dobles", "Lo que más importa es el largo de la planilla", "Conviene que tenga pocos datos para que la IA la entienda"], correct: 1, explain: "Una planilla ordenada, sin celdas combinadas ni imágenes incrustadas, permite que la IA entienda y procese los datos correctamente. La estructura es clave, independiente del modelo o la cantidad de datos." },
      { q: "¿Cómo puede ayudarte Copilot en Teams?", opts: ["Generando minutas automáticas de tus reuniones", "Dándote ideas durante la reunión", "No existe Copilot en Teams", "Solo transcribiendo partes sueltas"], correct: 0, explain: "Copilot en Teams genera minutas automáticas al terminar la reunión, resumiendo puntos clave y compromisos. Para eso necesita que actives la transcripción al inicio." },
      { q: "¿Puedo ocupar Copilot sobre la información de mi SharePoint?", opts: ["No, son datos privados y no los toca", "Solo si tengo poca información", "Sí: Copilot se integra con SharePoint y trabaja con esa información", "Sí, pero pocas veces al día porque gasta muchos tokens"], correct: 2, explain: "Copilot se integra con SharePoint para consultar, resumir y trabajar con lo que está ahí, y no hay restricción de frecuencia ni de volumen. Esa es precisamente una de sus ventajas corporativas." },
      { q: "¿Cuál es la diferencia clave entre Copilot y ChatGPT en el trabajo diario?", opts: ["Copilot es más rápido escribiendo", "Copilot conoce tu contexto corporativo: tus archivos, tus correos y tus reuniones", "ChatGPT no sabe redactar documentos", "Copilot no puede buscar en internet"], correct: 1, explain: "El mismo Copilot vive en Word, Excel, PowerPoint, Outlook, Teams y OneDrive, y en modo Work accede a tu contexto real: tus archivos de OneDrive, tus correos de Outlook y tus reuniones de Teams. Eso es lo que un chat externo no puede hacer." }
    ]
  },
  {
    n: 4,
    label: "Sesión 4 · Copilot",
    title: "Agentes y cierre del programa",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "El salto de conversar a delegar: agentes propios, entregables vivos y el mapa completo de las cuatro sesiones.",
    conceptos: ["intro-agentes-copilot", "agentes-basicos", "html-con-copilot", "artefactos-copilot", "repaso-programa", "cierre-programa"],
    desafio: {
      titulo: "Tu primer agente propio",
      intro: "Piensa en una tarea o dolor recurrente de tu día a día y construye un agente para resolverlo.",
      pasos: [
        "Dale un nombre y un propósito claro, en una frase.",
        "Redacta una buena paleta de instrucciones — apóyate en la IA para escribirlas.",
        "Cárgale conocimiento vinculante: SharePoint, Teams, Outlook o una web.",
        "Pruébalo con un caso real y ajusta las instrucciones según el resultado.",
        "Muéstraselo a alguien de tu equipo: si a esa persona le sirve tal cual, el agente quedó bien."
      ],
      prompt: "Ayúdame a escribir las instrucciones de un agente de Copilot que haga lo siguiente: [TAREA]. Su usuario soy yo, [CARGO] en [ÁREA]. El input que va a recibir es [DOCUMENTOS O DATOS] y el output que necesito es [FORMATO EXACTO]. Escribe las instrucciones en secciones separadas: identidad, procedimiento, formato de salida y qué NO debe hacer.",
      cierre: "Antes de construirlo, chequea si el Investigador o el Analista ya resuelven tu caso."
    },
    quiz: [
      { q: "¿Qué es un agente en Copilot?", opts: ["Un chat nuevo que se borra apenas cierras la ventana", "Un asistente que configuras una vez con instrucciones y conocimiento, y que después repite esa lógica automáticamente", "Un programa que debes descargar e instalar aparte", "Una macro de Excel que solo sirve para planillas"], correct: 1, explain: "Un agente se configura una vez —propósito, instrucciones y conocimiento— y de ahí en adelante repite esa lógica solo. No es un chat desechable ni algo que se instale aparte." },
      { q: "¿Cuál es la señal más clara de que una tarea merece un agente y no un chat?", opts: ["Que sea una tarea difícil", "Que lleves semanas escribiendo el mismo prompt largo con las mismas instrucciones", "Que involucre muchos archivos", "Que la haga más de una persona del equipo"], correct: 1, explain: "Si repites el mismo prompt cada semana, eso ya no es una conversación: es un procedimiento. Y los procedimientos se configuran una sola vez en vez de reescribirse." },
      { q: "De los dos agentes que Copilot trae de fábrica, ¿cuál usarías para preparar una reunión con inteligencia de cliente?", opts: ["El Analista, porque cruza datos", "El Investigador, porque navega y sintetiza fuentes internas y externas con citas", "Ninguno: hay que construir uno propio", "Cualquiera de los dos da lo mismo"], correct: 1, explain: "El Investigador navega de forma autónoma y combina lo externo (web) con lo interno (correos, reuniones, archivos), entregando un informe con fuentes. El Analista es para cruzar números de archivos que ya tienes." },
      { q: "Armaste un dashboard en HTML y se lo quieres mandar a alguien por correo, sin adjuntos extra ni instrucciones. ¿Qué nivel de la escalera necesitas?", opts: ["Nivel 1: el HTML con el Excel aparte", "Nivel 3: los datos incrustados dentro del propio archivo", "Nivel 5: conectado a datos en vivo", "Ninguno: un HTML no se puede compartir"], correct: 1, explain: "En el nivel 3 los datos quedan embebidos dentro del HTML: es un único archivo autosuficiente que se abre en cualquier navegador. El nivel 1 obliga a mandar el Excel aparte, y el 5 es innecesario si los datos no cambian solos." },
      { q: "¿Cuál es la diferencia entre dejar una respuesta en el chat y convertirla en artefacto?", opts: ["El artefacto se ve con mejores colores", "El artefacto queda como entregable editable y compartible, y sigue conectado a Copilot para seguir trabajándolo", "El artefacto se guarda con contraseña", "No hay diferencia real, solo cambia dónde aparece"], correct: 1, explain: "La respuesta de chat se pierde en el scroll. El artefacto queda como documento: lo editas tú, lo comparten otros con un link, y le puedes seguir pidiendo cambios a Copilot sin volver a explicarle el contexto." }
    ]
  }
];

// Una habilidad por concepto: marcar el check la desbloquea.
// Una rampa por sesión, con al menos tantos colores como conceptos tenga.
const COLORES = {
  "1": ["#334155", "#475569", "#64748B", "#7C8CA1", "#94A3B8"],
  "2": ["#08508F", "#0B78D0", "#1B8FE0", "#2E9AE3", "#4FA8F5", "#6BB8E8", "#8ACAF0", "#A9DCF8"],
  "3": ["#0F766E", "#0D9488", "#14B8A6", "#2DD4BF", "#5EEAD4", "#7FEDDD", "#99F6E4"],
  "4": ["#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#C34AC6"]
};
const SKILLS = TALLERES.flatMap(t =>
  t.conceptos.map((id, i) => ({ id, taller: t.n, color: COLORES[t.n][i] }))
);

const SUPABASE_URL = 'https://adtyiqpcddxjnxfxrkod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdHlpcXBjZGR4am54Znhya29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM2NjQsImV4cCI6MjA4ODU1OTY2NH0.hTKgoum0LEmrFPj7LE7VbHTMNUocxovJqmkfOsTNubA';
const STARS_KEY = 'copilot_pack_v1';
const USER_KEY  = 'copilot_pack_user_v1';

let st = {};
let user = null;
const BLOQUES = {};

const T = n => TALLERES.find(t => t.n === n);

// El portal va versionado en la ruta: cada edición vive en su propia carpeta
// y la anterior deja de existir. Para sacar una nueva basta con renombrar el
// directorio, cambiar estas dos constantes y actualizar los rewrites.
const BASE    = '/programa-copilot';
const VERSION = 'Agosto 26';

// En Vercel las rutas son /programa-copilot y /programa-copilot/taller-1.
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

/* ============================================================================
   Diagnóstico IA · Reyes IA — motor del formulario
   ----------------------------------------------------------------------------
   Este archivo es el ÚNICO lugar donde viven las preguntas. El formulario
   genérico (/diagnostico) y todos los clones de cliente cargan este mismo
   archivo, así que un cambio acá se refleja en todos.

   Para crear un clon de cliente basta un HTML de ~30 líneas que defina
   window.DIAG_CONFIG antes de cargar este script:

     window.DIAG_CONFIG = {
       variante: 'molina',                  // queda guardado en cada respuesta
       empresa:  'Molina',                  // precarga la empresa y salta el paso 1
       logo:     '/diagnostico/logos/molina.png',   // logo junto al de Reyes IA
       cliente:  'Molina',                  // texto alternativo si no hay logo
       quitar:   ['repositorio'],           // ids de pasos que no aplican
       patch:    {                          // ajustes a un paso existente
         persona:      { areas: [['molina_planta','Planta'], ['otra','Otra']] },
         herramientas: { opciones: [['chatgpt','ChatGPT'], ['claude','Claude']] },
         usos:         { titulo: '¿Para qué usan IA en Molina?' }
       },
       extra: [                             // preguntas propias del cliente
         { id:'planta', despues:'persona', tipo:'radio', campo:'planta',
           titulo:'¿En qué planta trabajas?', sub:'Para segmentar por sede.',
           opciones:[['norte','Planta Norte'], ['sur','Planta Sur']] }
       ],
       gracias: { titulo:'¡Gracias!', texto:'…' }
     };

   Las respuestas de las preguntas en `extra` se guardan juntas en la columna
   respuestas_extra (jsonb), así no hay que migrar la base por cada cliente.
   Las claves de área nuevas hay que agregarlas a TRABAJO en labels.js para que
   el panel, el admin y el mail las muestren con nombre completo.
   ========================================================================== */

const SB_URL = 'https://adtyiqpcddxjnxfxrkod.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdHlpcXBjZGR4am54Znhya29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM2NjQsImV4cCI6MjA4ODU1OTY2NH0.hTKgoum0LEmrFPj7LE7VbHTMNUocxovJqmkfOsTNubA';

const CFG = Object.assign({
  variante: null, empresa: '', logo: '', cliente: '',
  quitar: [], patch: {}, extra: [], gracias: null,
}, window.DIAG_CONFIG || {});

/* ─────────────────────────── Las preguntas ─────────────────────────────── */

const PASOS_BASE = [
  {
    id: 'empresa', tipo: 'empresa',
    titulo: 'Tu empresa',
    sub: '¿A qué organización representas? Esto agrupa todas las respuestas de tu equipo.',
  },
  {
    id: 'persona', tipo: 'persona',
    titulo: 'Sobre ti',
    sub: 'Cuéntame quién eres y en qué área trabajas.',
    // Un clon puede reemplazar esta lista por las áreas reales del cliente:
    //   patch: { persona: { areas: [['compras','Compras'], ...] } }
    areas: [
      ['finanzas',         'Finanzas'],
      ['rrhh',             'Recursos Humanos'],
      ['ventas',           'Ventas'],
      ['operaciones',      'Operaciones'],
      ['marketing',        'Marketing'],
      ['programacion_ti',  'Programación & TI'],
      ['gerencia_general', 'Gerencia General'],
      ['otra',             'Otra'],
    ],
  },
  {
    id: 'mail', tipo: 'radio', campo: 'plataforma_mail',
    titulo: 'Plataforma de correo',
    sub: '¿Qué usas tú para el correo?',
    opciones: [
      ['outlook', 'Outlook / Office 365'],
      ['gmail',   'Gmail / Google Workspace'],
      ['mix',     'Mix de plataformas'],
      ['otro',    'Otro'],
    ],
  },
  {
    id: 'repositorio', tipo: 'radio', campo: 'repositorio',
    titulo: 'Repositorio de archivos',
    sub: '¿Dónde guardas tus documentos?',
    opciones: [
      ['sharepoint', 'SharePoint / OneDrive'],
      ['drive',      'Google Drive'],
      ['dropbox',    'Dropbox u otro'],
      ['mix',        'Mix de plataformas'],
      ['no_seguro',  'No estoy seguro'],
    ],
  },
  {
    id: 'nivel', tipo: 'radio', campo: 'nivel_equipo',
    titulo: '¿Cuánto usas la IA hoy?',
    sub: 'Sé honesto: no hay respuesta buena ni mala, esto define el punto de partida.',
    opciones: [
      ['cero',      'Foja cero, casi no la uso'],
      ['basico',    'La uso de manera básica, de vez en cuando'],
      ['frecuente', 'La uso casi todos los días'],
      ['avanzado',  'Me considero muy capacitado, casi experto'],
    ],
  },
  {
    id: 'usos', tipo: 'check', campo: 'usos_ia', exclusiva: 'ninguna', grid: true,
    titulo: '¿Para qué usas la IA?',
    sub: 'Marca todo lo que hagas hoy, aunque sea de vez en cuando.',
    opciones: [
      ['redactar',          'Redactar y mejorar textos'],
      ['resumir',           'Resumir documentos largos'],
      ['investigar',        'Investigar y entender temas'],
      ['buscar',            'Buscar información en internet'],
      ['analizar_archivos', 'Adjuntar archivos y analizarlos'],
      ['datos',             'Analizar datos y planillas'],
      ['presentaciones',    'Armar presentaciones'],
      ['correos',           'Escribir o responder correos'],
      ['imagenes',          'Crear imágenes o contenido visual'],
      ['ideas',             'Lluvia de ideas, pensar en voz alta'],
      ['programar',         'Programar o automatizar'],
      ['ninguna',           'Todavía no la uso para nada'],
    ],
  },
  {
    id: 'herramientas', tipo: 'herramientas',
    titulo: '¿Qué herramientas usas hoy?',
    sub: 'Marca si la tienes en versión gratuita o de pago. Si es de pago, dime quién la paga.',
    opciones: [
      ['chatgpt',    'ChatGPT'],
      ['copilot',    'Copilot'],
      ['claude',     'Claude'],
      ['gemini',     'Gemini'],
      ['perplexity', 'Perplexity'],
      ['notebooklm', 'NotebookLM'],
      ['gamma',      'Gamma / Presentaciones'],
      ['granola',    'Granola / Notas de reunión'],
      ['imagen',     'IA de imagen o video'],
    ],
  },
  {
    id: 'capacitacion', tipo: 'radio', campo: 'quiere_capacitacion',
    titulo: '¿Te gustaría capacitarte en IA?',
    sub: '¿Te interesa recibir formación sobre este tema?',
    opciones: [
      ['si',      'Sí, me interesa mucho'],
      ['si_pero', 'Me interesa, pero tengo poco tiempo'],
      ['no_se',   'No estoy seguro todavía'],
      ['no',      'No, por ahora no'],
    ],
  },
  {
    id: 'aprender', tipo: 'check', campo: 'areas_aprender', exclusiva: 'todo', grid: true,
    titulo: '¿Qué te gustaría aprender a hacer?',
    sub: 'Elige lo que más te movería la aguja en tu día a día.',
    opciones: [
      ['redactar',       'Redactar y comunicar mejor'],
      ['investigar',     'Investigar y sintetizar'],
      ['datos',          'Analizar datos y planillas'],
      ['presentaciones', 'Armar presentaciones'],
      ['imagenes',       'Imágenes, video y multimedia'],
      ['reuniones',      'Sacarle partido a mis reuniones'],
      ['prompts',        'Escribir mejores prompts'],
      ['automatizar',    'Automatizar tareas repetitivas'],
      ['agentes',        'Crear agentes que trabajen por mí'],
      ['programar',      'Programar / vibe coding'],
      ['todo',           'Todo lo que se pueda'],
    ],
  },
  {
    id: 'temores', tipo: 'check', campo: 'temores', exclusiva: 'ninguno',
    titulo: 'Tus principales temores con la IA',
    sub: 'Marca lo que más te inquiete. Esto lo conversamos en la jornada.',
    opciones: [
      ['ninguno',          'No tengo ningún temor'],
      ['confidencialidad', 'La confidencialidad de la información'],
      ['alucinaciones',    'Que se equivoque o invente datos'],
      ['calidad',          'Que el resultado no tenga el nivel que necesito'],
      ['empleo',           'Que reemplace puestos de trabajo'],
      ['dependencia',      'Volverme dependiente y perder criterio propio'],
      ['tiempo',           'No tener tiempo para aprender a usarla'],
      ['etica',            'Temas éticos, legales o de propiedad intelectual'],
    ],
  },
  {
    id: 'comentario', tipo: 'texto', campo: 'comentario', opcional: true,
    titulo: 'Comentarios finales',
    sub: '¿Quisieras comentar algo relevante que te gustaría revisar durante el curso? (opcional)',
    label: 'Comentarios (opcional)',
    placeholder: 'Contexto adicional, proyectos en curso, expectativas, dudas...',
  },
];

/* ───────────── Armado de los pasos según la configuración del clon ───────── */

function construirPasos() {
  let pasos = PASOS_BASE
    .filter(p => !CFG.quitar.includes(p.id))
    .filter(p => !(p.id === 'empresa' && CFG.empresa))
    .map(p => {
      const patch = CFG.patch[p.id];
      return patch ? Object.assign({}, p, patch) : p;
    });

  (CFG.extra || []).forEach(ex => {
    const paso = Object.assign({}, ex, { custom: true });
    const i = paso.despues ? pasos.findIndex(p => p.id === paso.despues) : -1;
    if (i > -1) pasos.splice(i + 1, 0, paso);
    else pasos.push(paso);
  });

  return pasos;
}

const PASOS = construirPasos();
const TOTAL = PASOS.length;

/* ─────────────────────────────── Estado ────────────────────────────────── */

let step = 1;
let submitting = false;
let done = false;

const f = {
  empresa: CFG.empresa || '',
  nombre: '', area: '', area_otra: '', cargo: '',
  sin_ia: false,
};
// Un valor inicial por cada paso, según su tipo
PASOS.forEach(p => {
  if (!p.campo) return;
  if (p.tipo === 'check') f[p.campo] = [];
  else if (f[p.campo] === undefined) f[p.campo] = '';
});
// herramientas: { chatgpt: { version: 'gratis'|'pago', paga: 'yo'|'empresa' } }
const herr = {};

/* ───────────────────────────── Componentes ─────────────────────────────── */

function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

function radio(campo, valor, label) {
  const sel = f[campo] === valor;
  return `<div class="opt-card${sel ? ' selected' : ''}" onclick="pick('${campo}','${valor}')">
    <span class="opt-label">${label}</span>
    ${sel ? '<span class="opt-mark">✓</span>' : ''}
  </div>`;
}

function check(campo, valor, label, exclusiva) {
  const sel = (f[campo] || []).includes(valor);
  return `<div class="opt-card${sel ? ' check-selected' : ''}" onclick="toggle('${campo}','${valor}','${exclusiva || ''}')">
    <span class="check-box">${sel ? '✓' : ''}</span>
    <span class="opt-label">${label}</span>
  </div>`;
}

function toolRow(valor, label) {
  const h = herr[valor] || {};
  const gratis = h.version === 'gratis';
  const pago   = h.version === 'pago';
  return `<div class="tool-row${(gratis || pago) ? ' active' : ''}">
    <div class="tool-main">
      <span class="tool-name">${label}</span>
      <div class="ver-group">
        <span class="ver-chk${gratis ? ' on' : ''}" onclick="setVersion('${valor}','gratis')">Gratis</span>
        <span class="ver-chk${pago ? ' on' : ''}" onclick="setVersion('${valor}','pago')">De pago</span>
      </div>
    </div>
    ${pago ? `<div class="pay-sub">
      <span class="pay-q">¿Quién la paga?</span>
      <span class="pay-chk${h.paga === 'empresa' ? ' on' : ''}" onclick="setPaga('${valor}','empresa')">La empresa</span>
      <span class="pay-chk${h.paga === 'yo' ? ' on' : ''}" onclick="setPaga('${valor}','yo')">Yo</span>
    </div>` : ''}
  </div>`;
}

/* ───────────────────────────── Interacción ─────────────────────────────── */

function pick(campo, valor) { f[campo] = valor; render(); }

function toggle(campo, valor, exclusiva) {
  const arr = f[campo] || (f[campo] = []);
  const i = arr.indexOf(valor);
  if (i > -1) arr.splice(i, 1);
  else {
    // Una opción exclusiva ("ninguna", "todo") limpia el resto, y viceversa
    if (exclusiva && valor === exclusiva) arr.length = 0;
    else if (exclusiva) { const j = arr.indexOf(exclusiva); if (j > -1) arr.splice(j, 1); }
    arr.push(valor);
  }
  render();
}

function setVersion(tool, version) {
  f.sin_ia = false;
  const h = herr[tool];
  if (h && h.version === version) delete herr[tool];          // volver a des-marcar
  else herr[tool] = { version, paga: version === 'pago' ? (h && h.paga) || '' : '' };
  render();
}

function setPaga(tool, paga) {
  if (!herr[tool]) return;
  herr[tool].paga = herr[tool].paga === paga ? '' : paga;
  render();
}

function toggleSinIA() {
  f.sin_ia = !f.sin_ia;
  if (f.sin_ia) Object.keys(herr).forEach(k => delete herr[k]);
  render();
}

function setF(campo, valor) { f[campo] = valor; }

/* ───────────────────────────── Validación ──────────────────────────────── */

function canNext() {
  const p = PASOS[step - 1];
  if (!p) return true;
  if (p.opcional) return true;

  switch (p.tipo) {
    case 'empresa':  return f.empresa.trim().length > 0;
    case 'persona':  return f.nombre.trim().length > 0 && !!f.area;
    case 'radio':    return !!f[p.campo];
    case 'check':    return (f[p.campo] || []).length > 0;
    case 'texto':    return (f[p.campo] || '').trim().length > 0;
    case 'herramientas': {
      const marcadas = Object.keys(herr);
      if (f.sin_ia) return true;
      if (!marcadas.length) return false;
      // Si dijo que una es de pago, tiene que decir quién la paga
      return marcadas.every(k => herr[k].version === 'gratis' || !!herr[k].paga);
    }
    default: return true;
  }
}

function next() { if (canNext() && step < TOTAL) { step++; render(); } }
function back() { if (step > 1) { step--; render(); } }

/* ─────────────────────────────── Envío ─────────────────────────────────── */

function armarBody() {
  const nombre_contacto = f.cargo ? `${f.nombre} · ${f.cargo}` : f.nombre;
  const area_trabajo = f.area === 'otra' ? (f.area_otra.trim() || 'Otra') : f.area;

  const marcadas = Object.keys(herr);
  const gratis = marcadas.filter(k => herr[k].version === 'gratis');
  const pago   = marcadas.filter(k => herr[k].version === 'pago');

  // Preguntas propias de un clon → respuestas_extra
  const extra = {};
  PASOS.filter(p => p.custom && p.campo).forEach(p => { extra[p.campo] = f[p.campo]; });

  const body = {
    empresa: f.empresa.trim(),
    nombre_contacto,
    area_trabajo,
    plataforma_mail: f.plataforma_mail || null,
    repositorio: f.repositorio || null,
    nivel_equipo: f.nivel_equipo || null,
    usos_ia: f.usos_ia || [],
    herramientas_ia: f.sin_ia ? ['ninguna'] : marcadas,
    herramientas_gratis: gratis,
    herramientas_pago: pago,
    herramientas_empresa: pago.filter(k => herr[k].paga === 'empresa'),
    herramientas_personal: pago.filter(k => herr[k].paga === 'yo'),
    quiere_capacitacion: f.quiere_capacitacion || null,
    areas_aprender: f.areas_aprender || [],
    temores: f.temores || [],
    comentario: f.comentario || null,
    variante: CFG.variante || null,
    respuestas_extra: Object.keys(extra).length ? extra : null,
  };
  return body;
}

async function submit() {
  if (submitting) return;
  submitting = true;
  render();
  const body = armarBody();
  try {
    const res = await fetch(`${SB_URL}/rest/v1/diagnosticos`, {
      method: 'POST',
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('insert failed');
    // Aviso por mail, sin bloquear el "gracias"
    fetch('/api/diagnostico-notify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({}, body, { nombre: f.nombre, cargo: f.cargo, herramientas_detalle: herr })),
    }).catch(() => {});
    done = true;
  } catch {
    submitting = false;
    const err = document.getElementById('err-msg');
    if (err) err.style.display = 'block';
    return;
  }
  render();
}

/* ─────────────────────────────── Render ────────────────────────────────── */

function cuerpo(p) {
  if (p.tipo === 'empresa') return `
    <div class="input-group">
      <label class="input-label">Empresa *</label>
      <input class="input-field" type="text" value="${esc(f.empresa)}" oninput="setF('empresa',this.value);updateNav()" placeholder="Ej: Newell Brands"/>
    </div>`;

  if (p.tipo === 'persona') return `
    <div class="input-group">
      <label class="input-label">Nombre completo *</label>
      <input class="input-field" type="text" value="${esc(f.nombre)}" oninput="setF('nombre',this.value);updateNav()" placeholder="Ej: María González"/>
    </div>
    <div class="input-group">
      <label class="input-label">Área de trabajo *</label>
      <select class="input-field" onchange="pick('area',this.value)">
        <option value="">Selecciona tu área…</option>
        ${(p.areas || []).map(([v,l]) => `<option value="${v}" ${f.area===v?'selected':''}>${l}</option>`).join('')}
      </select>
    </div>
    ${f.area === 'otra' ? `<div class="input-group">
      <input class="input-field" type="text" value="${esc(f.area_otra)}" oninput="setF('area_otra',this.value)" placeholder="¿Cuál área?"/>
    </div>` : ''}
    <div class="input-group">
      <label class="input-label">Cargo</label>
      <input class="input-field" type="text" value="${esc(f.cargo)}" oninput="setF('cargo',this.value)" placeholder="Ej: Gerente de Operaciones"/>
    </div>`;

  if (p.tipo === 'radio') return `<div class="options">
    ${p.opciones.map(o => radio(p.campo, o[0], o[1])).join('')}
  </div>`;

  if (p.tipo === 'check') return `<div class="options${p.grid ? ' grid' : ''}">
    ${p.opciones.map(o => check(p.campo, o[0], o[1], p.exclusiva)).join('')}
  </div>`;

  if (p.tipo === 'herramientas') return `<div class="tool-list">
    ${p.opciones.map(o => toolRow(o[0], o[1])).join('')}
    <div class="opt-card${f.sin_ia ? ' check-selected' : ''}" onclick="toggleSinIA()" style="margin-top:8px">
      <span class="check-box">${f.sin_ia ? '✓' : ''}</span>
      <span class="opt-label">Ninguna aún</span>
    </div>
  </div>`;

  if (p.tipo === 'texto') return `
    <div class="input-group">
      <label class="input-label">${p.label || p.titulo}</label>
      <textarea class="input-field" oninput="setF('${p.campo}',this.value)" placeholder="${esc(p.placeholder)}">${esc(f[p.campo])}</textarea>
    </div>`;

  return '';
}

function updateNav() {
  const btn = document.getElementById('btn-action');
  if (btn) btn.disabled = !canNext();
}

function render() {
  const pct = done ? 100 : ((step - 1) / TOTAL) * 100;
  const prog = document.getElementById('prog');
  if (prog) prog.style.width = pct + '%';

  const app = document.getElementById('app');

  if (done) {
    const g = CFG.gracias || {};
    app.innerHTML = `
      <div class="gracias">
        <div class="gracias-title">${g.titulo || 'Gracias por completar el diagnóstico'}</div>
        <div class="gracias-text">${g.texto || 'Revisaremos tus respuestas antes de la jornada para llegar con foco en tu ecosistema y tu equipo.'}</div>
      </div>`;
    return;
  }

  const p = PASOS[step - 1];
  const isLast = step === TOTAL;
  const ok = canNext();

  app.innerHTML = `
    <div class="step-head">
      <div class="step-meta">
        <span class="step-tag">Paso ${step} de ${TOTAL}</span>
        <span class="step-pct">${Math.round(pct)}%</span>
      </div>
      <div class="step-title">${p.titulo}</div>
      <div class="step-sub">${p.sub || ''}</div>
    </div>
    <div class="step-body">
      ${cuerpo(p)}
      ${isLast ? '<div class="err" id="err-msg" style="display:none">Hubo un error al enviar. Intenta de nuevo.</div>' : ''}
    </div>
    <div class="step-nav">
      ${step > 1 ? '<button class="btn-back" onclick="back()">← Atrás</button>' : '<div></div>'}
      ${isLast
        ? `<button class="btn-submit" id="btn-action" onclick="submit()" ${submitting ? 'disabled' : ''}>
            ${submitting ? 'Enviando…' : 'Enviar diagnóstico'}
           </button>`
        : `<button class="btn-next" id="btn-action" onclick="next()" ${ok ? '' : 'disabled'}>Siguiente →</button>`
      }
    </div>`;
}

/* ──────────────────────── Marca (Reyes IA + cliente) ───────────────────── */

function renderMarca() {
  const el = document.getElementById('brand');
  if (!el) return;
  let html = '<span class="brand-reyes">Reyes</span><span class="brand-ia">IA</span>';
  if (CFG.logo) html += `<span class="brand-sep"></span><img class="brand-logo" src="${CFG.logo}" alt="${esc(CFG.cliente || f.empresa)}"/>`;
  else if (CFG.cliente) html += `<span class="brand-sep"></span><span class="brand-cliente">${esc(CFG.cliente)}</span>`;
  el.innerHTML = html;
}

renderMarca();
render();

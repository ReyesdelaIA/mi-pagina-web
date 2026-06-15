// Inserta THUMBS[4], CHALLENGES[4] y QUIZZES[4] en newell/index.html (antes del cierre de cada objeto).
const fs = require('fs');
const path = require('path');
const F = path.resolve(__dirname, '../../newell/index.html');
let h = fs.readFileSync(F, 'utf8');

// índice del '}' que cierra el objeto `const NAME = { ... }`
function closeIdx(name) {
  const i = h.indexOf('const ' + name);
  let d = 0, started = false;
  for (let j = i; j < h.length; j++) {
    if (h[j] === '{') { d++; started = true; }
    else if (h[j] === '}') { d--; if (started && d === 0) return j; }
  }
  throw new Error('no close ' + name);
}
function insertBeforeClose(name, text) {
  if (h.includes(text.trim().split('\n')[0].trim())) { console.log('  ya presente, skip ' + name); return; }
  const j = closeIdx(name);
  h = h.slice(0, j) + text + h.slice(j);
  console.log('  insertado ' + name);
}

const THUMBS4 = `  4: ['/newell/thumbs/s4_thumb1.png','/newell/thumbs/s4_thumb2.png','/newell/thumbs/s4_thumb3.png'],\n`;

const CHALLENGES4 = `    4: 'Pon en práctica el flujo Pro de la sesión:<br>1. Pídele al <strong>Agente Analista</strong> que analice un Excel real de tu área en Newell (KPIs, ventas, lo que tengas) y genere 2-3 gráficos.<br>2. Abre <strong>PowerPoint con Copilot</strong> (con modelo Claude) y pídele que arme una presentación ejecutiva basada en ese análisis.<br>3. Pule un par de slides con instrucciones en lenguaje natural. ¡De datos crudos a presentación lista sin salir de M365!',\n`;

const QUIZZES4 = `    4: [
      {
        q: '¿Qué hace el Agente Investigador?',
        opts: ['Crea gráficos de colores en PowerPoint.', 'Navega por internet de forma autónoma y entrega un informe estructurado con citas y fuentes.', 'Borra correos antiguos de Outlook automáticamente.', 'Solo traduce documentos a otros idiomas.'],
        correct: 1,
        explain: 'El Investigador navega la web de forma autónoma, recopila información actualizada de múltiples fuentes y entrega un informe estructurado con citas. Es el punto de partida ideal para alimentar otros agentes, documentos o presentaciones.',
      },
      {
        q: '¿Cuál es la diferencia clave del Agente Analista frente al Investigador?',
        opts: ['El Analista busca noticias nuevas en internet.', 'Son exactamente lo mismo.', 'El Analista interpreta datos estructurados que ya tienes (Excel, CSV, tablas) y genera gráficos e insights ejecutivos.', 'El Analista solo sirve para redactar correos.'],
        correct: 2,
        explain: 'El Investigador trae datos externos desde la web; el Analista trabaja sobre datos estructurados que ya tienes y entrega gráficos, tablas resumen e interpretaciones en lenguaje ejecutivo. Juntos forman un flujo potente.',
      },
      {
        q: 'En Word con Copilot, ¿cuál es la forma rápida de intervenir un párrafo puntual sin tocar el resto del documento?',
        opts: ['Borrar todo y empezar de nuevo.', 'Copiar el texto a otro programa.', 'No se puede editar párrafo por párrafo.', 'Seleccionar el párrafo, clic derecho → Copilot, y pedirle que lo reescriba o mejore.'],
        correct: 3,
        explain: 'Con clic derecho → Copilot sobre un párrafo seleccionado puedes reescribirlo, mejorar el tono, ampliarlo o resumirlo sin afectar el resto del documento.',
      },
      {
        q: 'Al usar Copilot en Excel y PowerPoint, ¿qué recomendación clave se dio para obtener mejores resultados?',
        opts: ['Usar siempre el modelo por defecto.', 'Cambiar el selector de modelo a Claude (Opus 4.7 o superior) por su mejor razonamiento.', 'Desactivar Copilot y hacer todo a mano.', 'Trabajar siempre sin conexión a internet.'],
        correct: 1,
        explain: 'En Excel y PowerPoint conviene cambiar el modelo de Copilot a Claude (Opus 4.7 o superior): su razonamiento produce planillas y presentaciones de mejor calidad.',
      },
      {
        q: '¿Cuál es el flujo más potente combinando las herramientas de la sesión?',
        opts: ['Hacer todo manualmente en cada app por separado.', 'Usar solo Word para todo.', 'El Investigador trae datos externos, el Analista los cruza y analiza, exportas a Excel y Copilot en PowerPoint arma la presentación.', 'Copiar y pegar entre apps sin usar IA.'],
        correct: 2,
        explain: 'El flujo Pro encadena los agentes y las apps: investigar, analizar, exportar a Excel y generar la presentación en PowerPoint con Copilot. De datos crudos a entregable sin salir de M365.',
      },
    ],
`;

insertBeforeClose('THUMBS', THUMBS4);
insertBeforeClose('CHALLENGES', CHALLENGES4);
insertBeforeClose('QUIZZES', QUIZZES4);

fs.writeFileSync(F, h);
console.log('OK', F);

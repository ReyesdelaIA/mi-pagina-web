// Ensambla sesion04-newell/index.html reutilizando el template + cards de agentes de sesion03-newell.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'sesion03-newell/index.html');
const OUT = path.join(ROOT, 'sesion04-newell/index.html');

let html = fs.readFileSync(SRC, 'utf8');

// 1) HEAD: todo antes del comentario HEADER. Actualiza title/meta S03 -> S04.
const headEnd = html.indexOf('<!-- HEADER -->');
let head = html.slice(0, headEnd);
head = head.replace(/<title>[\s\S]*?<\/title>/, '<title>Sesión 04 · Agentes de IA + Copilot Pro en Office · Reyes IA</title>');
head = head.replace(/Sesión 03/g, 'Sesión 04').replace(/Copilot Agentes/g, 'Agentes + Copilot Pro');

// 2) Cards por marcador
const marker = /<div class="card" onclick="toggle\(this\)">/g;
const offs = []; let m;
while ((m = marker.exec(html))) offs.push(m.index);
if (offs.length < 4) throw new Error('Esperaba >=4 cards, encontré ' + offs.length);
const trimCard = s => s.replace(/\s*<!--[^>]*-->\s*$/, '').trimEnd();
const cardInvest = trimCard(html.slice(offs[2], offs[3]));                 // Agente Investigador
const dividerOff = html.indexOf('<div class="divider"></div>', offs[3]);
const cardAnalista = trimCard(html.slice(offs[3], dividerOff));            // Agente Analista

// 3) Solo toggle() del <script> (descarta quiz)
const scriptStart = html.indexOf('<script>');
const quizStart = html.indexOf('const QUIZ', scriptStart);
const toggleJs = html.slice(scriptStart + '<script>'.length, quizStart).trimEnd();

// 4) Header nuevo
const header = `<!-- HEADER -->
  <div class="header">
    <div class="header-badge">Newell Brands · Programa Adopción Profunda de IA</div>
    <div class="header-title">Resumen ejecutivo clase 4 [S04]</div>
    <div class="header-sub">Los Agentes de IA en acción + Copilot Pro en Word, Excel y PowerPoint</div>
    <div class="header-tags">
      <span class="tag">Agente Analista</span>
      <span class="tag">Agente Investigador</span>
      <span class="tag">Word Pro</span>
      <span class="tag">Excel Pro</span>
      <span class="tag">PowerPoint Pro</span>
    </div>
  </div>

  <div class="section-label">Herramientas y conceptos de la sesión</div>
`;

// 5) Placeholders (se llenan con los pantallazos)
const placeholder = (icon, bg, title, desc) => `  <div class="card" onclick="toggle(this)">
    <div class="card-header">
      <div class="icon" style="background:${bg};">${icon}</div>
      <div>
        <div class="card-title">${title}</div>
        <div class="card-desc">${desc}</div>
      </div>
      <div class="chevron">▼</div>
    </div>
    <div class="card-body">
      <div class="body-content">
        <p style="font-size:14px;color:#444;line-height:1.7;padding:16px 0;">🔧 <strong>Contenido en preparación.</strong> El paso a paso de esta sección se publicará con las capturas de la sesión.</p>
      </div>
    </div>
  </div>`;
const ph1 = placeholder('📝', '#EAF7EE', 'Word con Copilot (Pro)', 'Uso avanzado para documentos — paso a paso (próximamente)');
const ph2 = placeholder('📊', '#EAF1FB', 'Excel con Copilot (Pro)', 'Análisis de datos avanzado — paso a paso (próximamente)');
const ph3 = placeholder('📽️', '#FBEAF0', 'PowerPoint con Copilot (Pro)', 'Presentaciones profesionales — paso a paso (próximamente)');

// 6) Footer + cierre + script
const tail = `  <div class="divider"></div>

  <!-- FOOTER -->
  <div class="footer">
    Sesión 04 · Programa Adopción Profunda de IA · <strong>Reyes IA</strong> · @reyesdelaIA
  </div>

</div>
</div>

<script>
${toggleJs}
</script>
</body>
</html>`;

const out = head + header +
  '\n  <!-- CARD 1: Agente Analista -->\n' + cardAnalista +
  '\n\n  <!-- CARD 2: Agente Investigador -->\n' + cardInvest +
  '\n\n  <!-- CARD 3: Word Pro (placeholder) -->\n' + ph1 +
  '\n\n  <!-- CARD 4: Excel Pro (placeholder) -->\n' + ph2 +
  '\n\n  <!-- CARD 5: PowerPoint Pro (placeholder) -->\n' + ph3 +
  '\n\n' + tail;

fs.writeFileSync(OUT, out);
console.log('OK written', OUT, out.length, 'bytes');

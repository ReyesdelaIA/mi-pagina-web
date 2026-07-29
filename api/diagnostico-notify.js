const { Resend } = require('resend');
const L = require('../diagnostico/labels.js');

const map = (dict, v) => dict[v] || v || '—';
const list = (dict, arr) => (arr || []).map(v => map(dict, v)).join(', ') || '—';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.RESEND_API_KEY) return res.status(200).json({ skipped: true });

  const b = req.body || {};
  const nombre_contacto = b.cargo ? `${b.nombre} · ${b.cargo}` : (b.nombre || b.nombre_contacto || '—');

  // Herramientas: versión gratis / de pago y, en las de pago, quién las paga
  const gratis = (b.herramientas_gratis || []).map(h => map(L.TOOLS, h));
  const emp    = (b.herramientas_empresa || []).map(h => map(L.TOOLS, h));
  const per    = (b.herramientas_personal || []).map(h => map(L.TOOLS, h));
  const pagoSinDueno = (b.herramientas_pago || [])
    .filter(h => !(b.herramientas_empresa || []).includes(h) && !(b.herramientas_personal || []).includes(h))
    .map(h => map(L.TOOLS, h));

  let ias = [
    gratis.length ? `<b>Versión gratuita:</b> ${gratis.join(', ')}` : '',
    emp.length    ? `<b>De pago · la paga la empresa:</b> ${emp.join(', ')}` : '',
    per.length    ? `<b>De pago · la paga él/ella:</b> ${per.join(', ')}` : '',
    pagoSinDueno.length ? `<b>De pago:</b> ${pagoSinDueno.join(', ')}` : '',
  ].filter(Boolean).join('<br>');
  // Respuestas antiguas (antes de gratis/pago) o "ninguna aún"
  if (!ias) ias = list(L.TOOLS, b.herramientas_ia);

  const rows = [
    ['Nombre y cargo', nombre_contacto],
    ['Empresa', b.empresa || '—'],
    ['Área de trabajo', map(L.TRABAJO, b.area_trabajo)],
    ['Plataforma de correo', map(L.MAIL, b.plataforma_mail)],
    ['Repositorio', map(L.REPO, b.repositorio)],
    ['Cuánto usa la IA hoy', map(L.NIVEL, b.nivel_equipo)],
    ['Para qué usa la IA', list(L.USOS, b.usos_ia)],
    ['Herramientas', ias],
    ['¿Quiere capacitarse?', map(L.CAPACITACION, b.quiere_capacitacion)],
    ['Qué quiere aprender', list(L.APRENDER, b.areas_aprender)],
    ['Principales temores', list(L.TEMORES, b.temores)],
    ['Comentarios', b.comentario || '—'],
  ];

  // Preguntas propias del clon de un cliente
  const extra = b.respuestas_extra || {};
  Object.keys(extra).forEach(k => {
    const v = Array.isArray(extra[k]) ? extra[k].join(', ') : extra[k];
    rows.push([k.replace(/_/g, ' '), v || '—']);
  });

  const origen = b.variante ? ` · formulario ${b.variante}` : '';

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#2C3E6B;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <h1 style="color:#C9973A;margin:0;font-size:20px;">🔍 Nuevo Diagnóstico IA</h1>
      <p style="color:rgba(255,255,255,.7);margin:6px 0 0;font-size:13px;">${b.empresa} · ${new Date().toLocaleDateString('es-CL')}${origen}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows.map(([k, v], i) => `<tr style="background:${i % 2 === 0 ? '#f9f9f9' : '#fff'}">
        <td style="padding:10px 14px;font-weight:600;color:#2C3E6B;width:40%;border-bottom:1px solid #eee;">${k}</td>
        <td style="padding:10px 14px;color:#333;border-bottom:1px solid #eee;">${v}</td>
      </tr>`).join('')}
    </table>
    <p style="color:#aaa;font-size:11px;margin-top:20px;text-align:center;">Reyes IA · diagnóstico automático · <a href="https://reyesia.com/diagnostico/admin.html">Ver dashboard</a></p>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Diagnóstico IA <onboarding@resend.dev>',
      to: 'felipe@reyesia.com',
      subject: `🔍 Nuevo diagnóstico IA — ${b.empresa}`,
      html,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'email failed' });
  }
};

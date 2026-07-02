const { Resend } = require('resend');

const MAIL_L  = { outlook:'Outlook / Office 365', gmail:'Gmail / Google Workspace', mix:'Mix', otro:'Otro' };
const REPO_L  = { sharepoint:'SharePoint / OneDrive', drive:'Google Drive', dropbox:'Dropbox u otro', mix:'Mix', no_seguro:'No estoy seguro' };
const REUN_L  = { teams:'Microsoft Teams', zoom:'Zoom', meet:'Google Meet', mix:'Mix' };
const NIVEL_L = { cero:'Partiendo desde cero', basico:'Algunos usan de forma básica', frecuente:'Uso frecuente sin estructura', avanzado:'Hay usuarios avanzados' };
const RES_L   = { no:'No, hay apertura total', algo:'Algo de escepticismo', si:'Sí, hay resistencia concreta', no_se:'No lo sé' };
const IA_L    = { copilot:'Copilot', chatgpt:'ChatGPT', claude:'Claude', gemini:'Gemini', gamma:'Gamma', granola:'Granola / Transcriptor', imagen:'Midjourney / Imagen IA', ninguna:'Ninguna aún' };
const AREA_L  = { finanzas:'Finanzas', marketing:'Marketing', operaciones:'Operaciones', comercial:'Comercial', rrhh:'RRHH', ti:'TI / Tecnología', legal:'Legal', todas:'Todas las áreas', otra:'Otra' };
const TRAB_L  = { finanzas:'Finanzas', rrhh:'Recursos Humanos', ventas:'Ventas', operaciones:'Operaciones', marketing:'Marketing', programacion_ti:'Programación & TI', gerencia_general:'Gerencia General' };
const NIVEL_PERSONA_L = { cero:'Foja cero, casi no la usa', basico:'La usa de forma básica', frecuente:'La usa de forma recurrente', avanzado:'Usuario avanzado' };
const RES_PERSONA_L   = { no:'Apertura total', algo:'Algo de escepticismo', si:'Le cuesta engancharse', no_se:'No lo sabe aún' };

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.RESEND_API_KEY) return res.status(200).json({ skipped: true });

  const b = req.body || {};
  const nombre_contacto = b.cargo ? `${b.nombre} · ${b.cargo}` : b.nombre;
  const areas = (b.areas_interes  || []).map(a => (a === 'otra' && b.areas_otra ? `Otra: ${b.areas_otra}` : AREA_L[a] || a)).join(', ');
  const area_trabajo = TRAB_L[b.area_trabajo] || b.area_trabajo || '—';

  // Herramientas IA: quién paga cada una
  const empIas = (b.herramientas_empresa  || []).map(h => IA_L[h] || h);
  const perIas = (b.herramientas_personal || []).map(h => IA_L[h] || h);
  let ias = [
    empIas.length ? `<b>Empresa:</b> ${empIas.join(', ')}` : '',
    perIas.length ? `<b>Pagada personalmente:</b> ${perIas.join(', ')}` : '',
  ].filter(Boolean).join('<br>');
  if (!ias) ias = (b.herramientas_ia || []).map(h => IA_L[h] || h).join(', ') || 'Ninguna aún';

  const rows = [
    ['Nombre y cargo', nombre_contacto],
    ['Empresa', b.empresa],
    ['Área de trabajo', area_trabajo],
    ['Plataforma de correo', MAIL_L[b.plataforma_mail] || b.plataforma_mail],
    ['Repositorio', REPO_L[b.repositorio] || b.repositorio],
    ['Reuniones', REUN_L[b.reuniones] || b.reuniones],
    ['Herramientas IA', ias],
    ['Nivel con IA (persona)', NIVEL_PERSONA_L[b.nivel_equipo] || NIVEL_L[b.nivel_equipo] || b.nivel_equipo],
    ['Áreas de interés', areas],
    ['Apertura a la IA', RES_PERSONA_L[b.resistencias] || RES_L[b.resistencias] || b.resistencias],
    ['Comentarios', b.comentario || '—'],
  ];

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#2C3E6B;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <h1 style="color:#C9973A;margin:0;font-size:20px;">🔍 Nuevo Diagnóstico IA</h1>
      <p style="color:rgba(255,255,255,.7);margin:6px 0 0;font-size:13px;">${b.empresa} · ${new Date().toLocaleDateString('es-CL')}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows.map(([k,v],i)=>`<tr style="background:${i%2===0?'#f9f9f9':'#fff'}">
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

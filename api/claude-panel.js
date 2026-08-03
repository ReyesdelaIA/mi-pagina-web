// Lectura del progreso del Portal Claude.
// Va por servidor (no por la anon key) para que los emails de los
// participantes no queden expuestos a cualquiera con el link del portal.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://adtyiqpcddxjnxfxrkod.supabase.co';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Falta ADMIN_PASSWORD en el servidor' });
  }
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno de Vercel',
    });
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  try {
    const [pRes, gRes, rRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/claude_participantes?select=*&order=created_at.desc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/claude_progreso?select=*`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/claude_quiz_respuestas?select=*`, { headers }),
    ]);

    if (!pRes.ok || !gRes.ok) {
      const detail = await (pRes.ok ? gRes : pRes).text();
      return res.status(502).json({ error: 'Error leyendo Supabase', detail: detail.slice(0, 300) });
    }

    const participantes = await pRes.json();
    const progreso = await gRes.json();
    // El detalle del quiz es nuevo: si aún no existe la tabla, no rompemos el panel
    const respuestas = rRes.ok ? await rRes.json() : [];

    return res.status(200).json({ ok: true, participantes, progreso, respuestas });
  } catch (e) {
    return res.status(500).json({ error: 'Error inesperado', detail: String(e).slice(0, 300) });
  }
};

// Datos públicos del afiche/espejo de un cliente.
// Va por servidor con la service key para que:
//   1) el cliente NUNCA vea ninguna llave de Supabase,
//   2) solo reciba SU programa (buscado por token, no por id),
//   3) nunca reciban los comentarios internos del panel.
// Requiere la variable REYES_FINANCE_SERVICE_KEY en Vercel (proyecto reyes-finance).

const SUPABASE_URL = 'https://lzrhpmwrbcrprsnpuadh.supabase.co';

const slugify = s => (s || '')
  .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

module.exports = async (req, res) => {
  const token = (req.query.c || req.query.t || '').toString().trim();
  if (!token) return res.status(400).json({ error: 'Falta el token (?c=)' });

  const key = process.env.REYES_FINANCE_SERVICE_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'Falta REYES_FINANCE_SERVICE_KEY en las variables de entorno de Vercel',
    });
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const q = path => fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });

  try {
    // 1) El programa, buscado por token
    const pRes = await q(`programas_clientes?share_token=eq.${encodeURIComponent(token)}` +
      `&select=id,cliente,tipo,total_sesiones&limit=1`);
    if (!pRes.ok) {
      return res.status(502).json({ error: 'Error leyendo el programa', detail: (await pRes.text()).slice(0, 300) });
    }
    const progs = await pRes.json();
    const prog = progs[0];
    if (!prog) return res.status(404).json({ error: 'Programa no encontrado' });

    // 2) Temario (SIN comentario) y sesiones, en paralelo
    const [tRes, sRes] = await Promise.all([
      q(`temario_temas?programa_id=eq.${prog.id}&select=numero_sesion,orden,tema,estado` +
        `&order=numero_sesion.asc,orden.asc`),
      q(`sesiones_cliente?programa_id=eq.${prog.id}&select=numero_sesion,fecha_hora,lugar` +
        `&order=numero_sesion.asc`),
    ]);
    if (!tRes.ok || !sRes.ok) {
      const bad = tRes.ok ? sRes : tRes;
      return res.status(502).json({ error: 'Error leyendo el detalle', detail: (await bad.text()).slice(0, 300) });
    }
    const temas = await tRes.json();
    const sesInfo = await sRes.json();

    // 3) Armar la forma que consume el afiche
    const fechaDe = {}, lugarDe = {};
    sesInfo.forEach(s => { fechaDe[s.numero_sesion] = s.fecha_hora; if (s.lugar) lugarDe[s.numero_sesion] = s.lugar; });

    const bySes = {};
    temas.forEach(t => { (bySes[t.numero_sesion] ||= []).push(t); });

    const nums = [...new Set([
      ...Object.keys(bySes).map(Number),
      ...sesInfo.map(s => s.numero_sesion),
    ])].sort((a, b) => a - b);

    const sesiones = nums.map(n => ({
      n,
      fecha: fechaDe[n] || null,
      temas: (bySes[n] || []).map(t => [t.tema, t.estado === 'visto' ? 1 : 0]),
    }));

    const unidad = (prog.tipo === 'mentoria_1a1' || (prog.total_sesiones || 0) > 3) ? 'sesión' : 'taller';
    const lugar = sesInfo.map(s => s.lugar).find(Boolean) || null;
    const slug = slugify(prog.cliente);

    // caché corta: casi en vivo, pero sin golpear la base en cada visita
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=60');
    return res.status(200).json({
      cliente: prog.cliente,
      unidad,
      lugar,
      slug,
      logo: `/panel-clientes/logos/${slug}.png`,
      sesiones,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Error inesperado', detail: String(e).slice(0, 300) });
  }
};

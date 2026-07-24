// Reporte de avance de un cliente (solo lectura) para ver.html.
// Va por el servidor con la service key: la base queda cerrada al público y
// aquí se devuelve ÚNICAMENTE el programa pedido, así nadie puede leer los
// datos de otros clientes con la llave.

const SUPABASE_URL = 'https://lzrhpmwrbcrprsnpuadh.supabase.co';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

module.exports = async (req, res) => {
  const id = (req.query && req.query.id) || '';
  if (!UUID.test(id)) return res.status(400).json({ error: 'Identificador inválido' });

  const key = process.env.PANEL_CLIENTES_SERVICE_KEY;
  if (!key) return res.status(500).json({ error: 'Falta PANEL_CLIENTES_SERVICE_KEY en el servidor' });

  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const rest = path => fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });

  try {
    const [pRes, tRes, sRes] = await Promise.all([
      rest(`programas_clientes?id=eq.${id}&select=cliente,tipo,total_sesiones,sesiones_completadas`),
      rest(`temario_temas?programa_id=eq.${id}&select=numero_sesion,orden,tema,estado,comentario&order=numero_sesion,orden`),
      rest(`sesiones_cliente?programa_id=eq.${id}&select=numero_sesion,fecha_hora`),
    ]);

    if (!pRes.ok) {
      const detail = await pRes.text();
      return res.status(502).json({ error: 'Error leyendo Supabase', detail: detail.slice(0, 200) });
    }

    const programa = (await pRes.json())[0];
    if (!programa) return res.status(404).json({ error: 'Programa no encontrado' });

    const temas = tRes.ok ? await tRes.json() : [];
    const sesiones = sRes.ok ? await sRes.json() : [];

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ programa, temas, sesiones });
  } catch (e) {
    return res.status(500).json({ error: 'Error inesperado', detail: String(e).slice(0, 200) });
  }
};

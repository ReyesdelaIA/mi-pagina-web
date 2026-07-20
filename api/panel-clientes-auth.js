// Acceso al panel de clientes.
// Usa su propia variable para no depender de ADMIN_PASSWORD (que abre los
// diagnósticos): así puedes cambiar una sin afectar la otra.
// Si PANEL_CLIENTES_PASSWORD no está definida, cae a ADMIN_PASSWORD.

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const esperada = process.env.PANEL_CLIENTES_PASSWORD || process.env.ADMIN_PASSWORD;
  if (!esperada) {
    return res.status(500).json({
      error: 'Falta definir PANEL_CLIENTES_PASSWORD en las variables de entorno de Vercel',
    });
  }

  const { password } = req.body || {};
  if (password && password === esperada) return res.status(200).json({ ok: true });

  return res.status(401).json({ error: 'Contraseña incorrecta' });
};

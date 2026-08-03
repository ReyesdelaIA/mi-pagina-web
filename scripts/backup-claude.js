#!/usr/bin/env node
/* ==================================================================
   Respaldo del Portal Claude
   ------------------------------------------------------------------
   Baja participantes, progreso y respuestas del quiz a un archivo
   local, para tener copia propia además de la de Supabase.

   Uso:
     ADMIN_PASSWORD=xxxxx node scripts/backup-claude.js
     node scripts/backup-claude.js --pass xxxxx
     node scripts/backup-claude.js --local     (contra localhost:3000)

   Deja el archivo en backups/claude-AAAA-MM-DD.json y mantiene
   además backups/claude-ultimo.json siempre al día.
   ================================================================== */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };

const BASE = args.includes('--local')
  ? 'http://localhost:3000'
  : (flag('--url') || 'https://www.reyesia.com');

const PASS = flag('--pass') || process.env.ADMIN_PASSWORD;

if (!PASS) {
  console.error('✗ Falta la contraseña del panel.');
  console.error('  ADMIN_PASSWORD=xxx node scripts/backup-claude.js');
  console.error('  o: node scripts/backup-claude.js --pass xxx');
  process.exit(1);
}

const DIR = path.join(__dirname, '..', 'backups');

(async () => {
  let data;
  try {
    const r = await fetch(`${BASE}/api/claude-panel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: PASS }),
    });
    data = await r.json();
    if (!r.ok) {
      console.error(`✗ ${r.status}: ${data.error || 'no se pudo leer'}`);
      process.exit(1);
    }
  } catch (e) {
    console.error('✗ Sin conexión con', BASE, '—', String(e).slice(0, 120));
    process.exit(1);
  }

  const participantes = data.participantes || [];
  const progreso      = data.progreso || [];
  const respuestas    = data.respuestas || [];

  // Un respaldo vacío casi siempre es un error de lectura, no una base vacía:
  // mejor fallar que pisar el último respaldo bueno con un archivo inútil.
  if (!participantes.length) {
    console.error('✗ La respuesta no trae participantes. No se sobrescribe nada.');
    process.exit(1);
  }

  const stamp = new Date().toISOString();
  const salida = {
    generado: stamp,
    origen: BASE,
    totales: {
      participantes: participantes.length,
      progreso: progreso.length,
      respuestas: respuestas.length,
      empresas: new Set(participantes.map(p => p.empresa_slug)).size,
    },
    participantes, progreso, respuestas,
  };

  fs.mkdirSync(DIR, { recursive: true });
  const dia = stamp.slice(0, 10);
  const archivo = path.join(DIR, `claude-${dia}.json`);
  fs.writeFileSync(archivo, JSON.stringify(salida, null, 2));
  fs.writeFileSync(path.join(DIR, 'claude-ultimo.json'), JSON.stringify(salida, null, 2));

  const t = salida.totales;
  console.log(`✓ Respaldo guardado: backups/claude-${dia}.json`);
  console.log(`  ${t.participantes} participantes · ${t.empresas} empresas · ${t.progreso} registros de progreso · ${t.respuestas} respuestas de quiz`);
})();

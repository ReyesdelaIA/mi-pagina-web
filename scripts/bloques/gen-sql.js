// Genera SQL de inserts (upsert) a partir de manifest.json
const fs = require('fs');
const path = require('path');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));

function q(v){ // string -> 'literal' con escape, o NULL
  if (v === null || v === undefined) return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function jsonb(v){ return "'" + JSON.stringify(v).replace(/'/g, "''") + "'::jsonb"; }
function textArr(arr){ // text[]
  if (!arr || !arr.length) return "'{}'::text[]";
  return "ARRAY[" + arr.map(x => "'" + String(x).replace(/'/g, "''") + "'").join(',') + "]::text[]";
}

const rows = manifest.map(b => {
  return `(${[
    q(b.id), q(b.nombre), q(b.emoji), q(b.descripcion), q('#ffffff'), q('#111111'),
    jsonb(b.pasos), q(b.pro_tip), q(b.desafio),
    jsonb(b.assets_github), textArr(b.tags), q(b.categoria)
  ].join(', ')})`;
});

const sql = `INSERT INTO bloques_sesion
  (id, nombre, emoji, descripcion, color_bg, color_text, pasos, pro_tip, desafio, assets_github, tags, categoria)
VALUES
${rows.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  nombre=EXCLUDED.nombre, emoji=EXCLUDED.emoji, descripcion=EXCLUDED.descripcion,
  pasos=EXCLUDED.pasos, pro_tip=EXCLUDED.pro_tip, desafio=EXCLUDED.desafio,
  assets_github=EXCLUDED.assets_github, tags=EXCLUDED.tags, categoria=EXCLUDED.categoria,
  updated_at=NOW();`;

fs.writeFileSync(path.join(__dirname, 'inserts.sql'), sql);
console.log(`Generado inserts.sql con ${rows.length} filas (${sql.length} bytes)`);

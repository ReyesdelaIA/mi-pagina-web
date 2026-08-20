# Programa Copilot — dónde quedamos

Portal en `/programa-copilot` (rewrites de Vercel ya agregados a `vercel.json`).
Para revisarlo local: `python3 -m http.server 8902` y abrir
`http://localhost:8902/programa-copilot/index.html`.

Estructura: `index.html` (hub) · `taller.html` (sesión) · `portal.js` (datos:
`TALLERES` + `COLORES`) · `portal.css`. El contenido de cada concepto vive en
`/bloques/<id>/meta.json`.

## Estado por sesión

| Sesión | Título | Conceptos | Estado |
|---|---|---|---|
| 1 | Iniciación al uso de IA | 5 | en revisión con Felipe |
| 2 | Copilot en tu día a día | 8 | escrita, faltan capturas |
| 3 | Copilot dentro de M365 | 7 | lista (bloques ya existían) |
| 4 | Agentes y cierre del programa | 6 | escrita, falta revisar artefactos |

## Sesión 1 — revisión bloque por bloque

- [x] **1. `ia-panorama`** — Introducción a la IA e historia. LISTO Y APROBADO.
- [x] **2. `ia-tres-verdades`** — Las 3 grandes verdades. LISTO Y APROBADO.
- [ ] **3. `prompt-tres-reglas`** — Las 3 reglas de oro. ← RETOMAR ACÁ
- [ ] **4. `ia-cuatro-esferas`** — Las 4 grandes esferas.
- [ ] **5. `ia-mundo-real`** — La parte final (confidencialidad, riesgos, regulaciones).

Formato acordado para la S1: **un bloque = un solo scroll**, sin cortes de
pantalla. Los subtítulos internos van en el campo `titulo` de un paso, que el
renderer pinta como sección dentro del scroll (`.paso-sec`).

## Pendientes conocidos

1. **Quiz de la S01**: la pregunta sobre alucinaciones quedó huérfana — se borró
   la sección VERIFICAR del bloque 2 y ese contenido ya no se enseña en la
   sesión. Hay que cambiar la pregunta o reponer el contenido en el bloque 5.
   El texto borrado: las IAs alucinan e inventan datos con seguridad · verifica
   con fuentes confiables · las plataformas lo advierten al final del chat · tu
   pensamiento crítico + la IA.
2. **Faltan capturas** en 6 bloques de la S2 y S4: `activacion-copilot`,
   `copilot-tour`, `memoria-copilot`, `dictado-copilot`,
   `voz-conversacional-movil` y `artefactos-copilot`. Hoy muestran la tarjeta
   con emoji.
3. **Revisar `artefactos-copilot`**: es el único bloque escrito por inferencia.
   Está redactado sobre las Páginas de Copilot, el análogo de los artefactos de
   Claude. Falta que Felipe confirme si así lo enseña.
4. **Deploy**: cuando esté aprobado, mergear a `main` y desplegar. El portal
   quedaría en `reyesia.com/programa-copilot`.

## Decisiones tomadas

- Marca genérica Reyes IA, paleta azul Copilot (`--acc: #0B78D0`).
- Hub con las 4 tarjetas en una sola fila (4 columnas), 2 bajo 1180px, 1 bajo 1000px.
- Las imágenes de cada bloque se numeran siguiendo el orden del scroll.
- La tarjeta de desafío se dejó ámbar a propósito, como único acento cálido.

## Arreglos hechos al portal (heredados de newell-v2)

- `taller.html` tenía el rango de sesiones fijo en `[1,2,3]`: la sesión 4 no abría.
- `desafioHTML` solo pintaba `intro` + `pasos` y se tragaba en silencio el campo
  `enunciado`, que es el que usan los bloques.
- Se agregó soporte de subtítulos de sección dentro del scroll (`.paso-sec`).

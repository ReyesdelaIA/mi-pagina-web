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
| 1 | Iniciación al uso de IA | 5 | revisada y aprobada |
| 2 | Copilot en tu día a día | 8 | escrita, faltan capturas |
| 3 | Copilot dentro de M365 | 7 | lista (bloques ya existían) |
| 4 | Agentes y cierre del programa | 6 | escrita, falta revisar artefactos |

## Sesión 1 — REVISADA Y APROBADA POR FELIPE

Los cinco bloques quedaron cerrados con él, con sus textos dictados y sus
imágenes puestas una por una:

| | Bloque | Puntos | Imágenes |
|---|---|---|---|
| 1 | `ia-panorama` · Introducción a la IA e historia | 13 | 8 |
| 2 | `ia-tres-verdades` · Las 3 grandes verdades | 6 | 5 |
| 3 | `prompt-tres-reglas` · Las 3 reglas de oro del prompt | 9 | 6 |
| 4 | `ia-cuatro-esferas` · Las 4 grandes esferas | 9 | 5 |
| 5 | `ia-mundo-real` · Consideraciones finales | 12 | 5 |

Formato: **un bloque = un solo scroll**, sin cortes de pantalla. Los subtítulos
internos van en el campo `titulo` de un paso, que el renderer pinta como sección
dentro del scroll (`.paso-sec`).

## Sesión 2 — REVISADA Y APROBADA POR FELIPE

Reestructurada de 8 bloques a 5 módulos de un solo scroll, igual que la 1, y
recorrida módulo por módulo con él:

| | Módulo | Puntos | Imágenes |
|---|---|---|---|
| 1 | `copilot-intro-activacion` · Intro y activación | 11 | 5 |
| 2 | `copilot-tour` · Tour por Copilot | 6 | 4 |
| 3 | `memoria-copilot` · Memorización | 5 | 4 |
| 4 | `copilot-voz` · Dictado y voz | 7 | 5 |
| 5 | `copilot-crear-cuadernos` · Crear y Cuadernos | 9 | 4 |

Los módulos 3 y 4 se armaron sobre la base del programa de Claude
(`memoria-claude` y `dictado-claude`) y después se reemplazaron TODAS sus
capturas por las de Copilot. Ya no queda ninguna imagen de Claude.

## Pendientes conocidos

1. **El quiz de la S2 está desactualizado.** Sus 5 preguntas se escribieron
   para los 8 temas viejos. La de los modelos GPT/Claude ya no tiene respaldo
   —ese contenido salió del Tour, va con razonamiento más adelante— y las de
   memoria y dictado hay que revisarlas contra lo que quedó.
2. **El punto 4 del Tour** solo anuncia el signo más. Las seis opciones del
   menú (Agregar contenido, Cargar imágenes y archivos, Adjuntar archivos en la
   nube, Agregar funcionalidades, Chatear con un agente, Cambiar orígenes de
   datos) se ven en la lámina pero no están explicadas.
3. **Cómo se detiene el dictado en Copilot**: el texto dice que aparece
   «Escuchando…», pero no dice cómo se corta. Falta ese dato.
4. **Las sesiones 3 y 4 no han pasado por revisión de contenido** y siguen
   cerradas como «próximamente». La S4 tiene `artefactos-copilot`, el único
   bloque escrito por inferencia, y 6 bloques sin capturas.
5. **La S3 no tiene ningún ejercicio hands-on** (la S1 tiene 1, la S2 dos, la S4 uno).
6. **Detalles menores de la S1**: la Regla 1 del bloque 3 no tiene subtítulo de
   sección como sí lo tienen la 2 y la 3; y la portada del bloque 5 es la única
   oscura de las cinco.
7. **Contenido que se sacó y quedó sin lugar**: dictar fuera del chat (Word y
   Google Docs), y las 4 secciones del panel de Copilot (Chat, Crear, Agentes,
   Cuadernos) que se borraron del Tour.

## Cómo revisarlo en local

    python3 programa-copilot/servidor-local.py

y abrir `http://localhost:8902/programa-copilot/index.html`.

Importante: **no usar `python3 -m http.server`**. No manda cabeceras de caché y
Chrome se guarda el HTML y el JS por su cuenta, lo que hace parecer que los
cambios no salen. El `servidor-local.py` manda `Cache-Control: no-store`.
Además el `portal.js` se carga con un sello de versión (`?v=AAAAMMDDHHMM`) que
hay que actualizar en los dos HTML cuando se edita el JS.

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

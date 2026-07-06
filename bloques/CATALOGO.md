# Catálogo de bloques — Biblioteca de sesiones

_Generado automáticamente desde `bloques/*/meta.json` con `node scripts/bloques/gen-catalogo.js`._
_Total: 36 bloques. Para armar una sesión: dime empresa + nº + lista de IDs._

## fundamentos (8)

| id | nombre | imgs | pasos | pro tip |
|---|---|---|---|---|
| `3-esferas` | Las 3 grandes esferas de la IA generativa | 0 ⚠️ | 0 | ✓ |
| `analisis-documentos` | Análisis de documentos | 0 ⚠️ | 4 | ✓ |
| `control-alucinaciones` | Control de Alucinaciones | 1 | 0 | ✓ |
| `dictado-voz` | Herramienta de Dictado / Voz | 0 ⚠️ | 4 | ✓ |
| `internet-avanzada` | Internet avanzada | 0 ⚠️ | 4 | ✓ |
| `memoria-ia` | Memoria en IA | 0 ⚠️ | 5 | ✓ |
| `modelos-fast-vs-razonamiento` | Modelos Fast vs. Razonamiento | 0 ⚠️ | 0 | ✓ |
| `redaccion-avanzada` | Redacción avanzada | 0 ⚠️ | 5 | ✓ |

## copilot (11)

| id | nombre | imgs | pasos | pro tip |
|---|---|---|---|---|
| `copilot-excel` | Copilot en Excel | 2 | 4 | ✓ |
| `copilot-m365-hub` | Copilot en M365 | 1 | 3 | ✓ |
| `copilot-onedrive` | Copilot en OneDrive | 1 | 4 | ✓ |
| `copilot-outlook` | Copilot en Outlook | 2 | 4 | ✓ |
| `copilot-powerpoint` | Copilot en PowerPoint | 2 | 4 | ✓ |
| `copilot-sharepoint` | Copilot + SharePoint & OneDrive | 1 | 4 | ✓ |
| `copilot-teams` | Copilot en Teams | 2 | 4 | ✓ |
| `copilot-word` | Copilot en Word | 6 | 4 | ✓ |
| `crear-con-copilot` | Crear con Copilot | 2 | 4 | ✓ |
| `cuadernos-copilot` | Cuadernos de Copilot | 2 | 4 | ✓ |
| `intro-copilot` | ¿Qué es Microsoft Copilot? | 1 | 4 | — |

## agentes (4)

| id | nombre | imgs | pasos | pro tip |
|---|---|---|---|---|
| `agente-analista` | Agente Analista | 2 | 4 | ✓ |
| `agente-investigador` | Agente Investigador | 3 | 4 | ✓ |
| `agentes-basicos` | Agentes básicos en Copilot | 5 | 4 | ✓ |
| `deep-research` | Deep Research (Investigación Profunda) | 1 | 4 | ✓ |

## herramientas-ia (7)

| id | nombre | imgs | pasos | pro tip |
|---|---|---|---|---|
| `artefactos-claude` | Artefactos de Claude | 1 | 5 | ✓ |
| `canvas-gemini` | Canvas en Gemini | 1 | 5 | ✓ |
| `ejemplos-cowork` | Ejemplos de Claude Cowork | 2 | 4 | ✓ |
| `gamma-ppts` | Gamma — Presentaciones con IA | 1 | 5 | ✓ |
| `intro-cowork` | Intro a Claude Cowork | 2 | 4 | ✓ |
| `napkin-infografias` | Napkin — Infografías desde texto | 1 | 5 | ✓ |
| `notebooklm` | NotebookLM | 2 | 5 | ✓ |

## mundo-visual (6)

| id | nombre | imgs | pasos | pro tip |
|---|---|---|---|---|
| `camara-con-ia` | Uso de Cámara con IA | 1 | 4 | ✓ |
| `enhancer-upscale` | Enhancer / Upscale de Imágenes | 1 | 4 | ✓ |
| `imagenes-pro` | Imágenes Pro con LLMs | 1 | 4 | ✓ |
| `logos-ideogram` | Logos con IA — Ideogram.ai | 1 | 5 | ✓ |
| `musica-gemini` | Música con IA (Gemini) | 2 | 4 | ✓ |
| `videos-con-ia` | Generación de Videos con IA | 1 | 4 | ✓ |

---

**⚠️ Bloques sin imágenes (7)** — necesitan capturas antes de quedar visuales: `3-esferas`, `analisis-documentos`, `dictado-voz`, `internet-avanzada`, `memoria-ia`, `modelos-fast-vs-razonamiento`, `redaccion-avanzada`.

**Cómo pedir una sesión:** _"hagamos la S[N] de [empresa] con [id1], [id2], [id3]..."_ → yo verifico cada bloque en `bloques_sesion`, armo el resumen ejecutivo `/sesion[NN]-[empresa]`, actualizo el portal `/[empresa]` (`company_sessions` + quiz/thumbnails/desafío) y hago push.

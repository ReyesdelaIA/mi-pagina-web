/* ==================================================================
   Portal Newell · lógica compartida entre el hub y las páginas de taller
   ------------------------------------------------------------------
   El contenido de cada concepto vive en /bloques/<id>/meta.json:
   una sola fuente de verdad, reutilizable para armar sesiones de
   cualquier cliente.
   ================================================================== */

const TALLERES = [
  {
    n: 1,
    label: "Sesión 1 · Copilot",
    title: "Copilot Aplicación",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Copilot metido en las herramientas donde ya trabajas: Word, Excel, PowerPoint, Outlook, Teams y OneDrive.",
    conceptos: ["intro-copilot","crear-con-copilot","copilot-word","copilot-excel","copilot-powerpoint","copilot-outlook","copilot-teams","copilot-onedrive"],
    desafio: "Abre Copilot y logra que memorice 5 temas relevantes de ti y tu rol dentro de Newell. Preséntate, cuéntale en qué área trabajas y qué tipo de tareas haces — y pídele que los recuerde para futuras conversaciones. Pon en práctica el flujo Pro de la sesión: 1. Pídele al Agente Analista que analice un Excel real de tu área en Newell (KPIs, ventas, lo que tengas) y genere 2-3 gráficos. 2. Abre PowerPoint con Copilot (con modelo Claude) y pídele que arme una presentación ejecutiva basada en ese análisis. 3. Pule un par de slides con instrucciones en lenguaje natural. ¡De datos crudos a presentación lista sin salir de M365!",
    quiz: [{"q":"¿Qué modo debes elegir al ingresar a Copilot con tu cuenta corporativa?","opts":["Personal","Student","Work","Enterprise"],"correct":2,"explain":"El modo Work conecta Copilot con tu cuenta corporativa y tus datos de Microsoft 365. Los otros modos son para cuentas personales o educativas."},{"q":"¿Cuál es la URL correcta para acceder a Copilot de Microsoft?","opts":["ai.microsoft.com","copilot.microsoft.com","copilot.google.com","office.com/ai"],"correct":1,"explain":"La dirección oficial es copilot.microsoft.com. Desde ahí accedes con tu cuenta corporativa en modo Work."},{"q":"¿Qué modelos de lenguaje utiliza Copilot de Microsoft?","opts":["ChatGPT","Gemini","Claude","GPT y Claude"],"correct":3,"explain":"Copilot no usa un solo modelo — Microsoft integra tanto GPT (de OpenAI) como Claude (de Anthropic) dependiendo de la tarea. Gemini es de Google y no está en Copilot."},{"q":"¿La inteligencia artificial es 100% precisa o se puede equivocar?","opts":["Es 100% precisa.","Sí, la mayoría de las veces alucina.","Puede alucinar principalmente cuando sale a buscar internet.","Si la tratas mal, eventualmente podría deducir mal las cosas."],"correct":2,"explain":"La IA puede alucinar especialmente cuando hace búsquedas en internet, mezclando fuentes o inventando datos. No alucina la mayoría de las veces ni depende de cómo la tratas — pero sí hay que verificar lo que entrega, sobre todo con datos recientes."},{"q":"¿Qué hace el Agente Investigador?","opts":["Crea gráficos de colores en PowerPoint.","Navega por internet de forma autónoma y entrega un informe estructurado con citas y fuentes.","Borra correos antiguos de Outlook automáticamente.","Solo traduce documentos a otros idiomas."],"correct":1,"explain":"El Investigador navega la web de forma autónoma, recopila información actualizada de múltiples fuentes y entrega un informe estructurado con citas. Es el punto de partida ideal para alimentar otros agentes, documentos o presentaciones."}]
  },
  {
    n: 2,
    label: "Sesión 2 · Copilot",
    title: "Copilot Agentes",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Del chat que responde al agente que trabaja: conocimiento vinculante desde SharePoint y tus primeros agentes propios.",
    conceptos: ["copilot-m365-hub","copilot-sharepoint","agentes-basicos","agente-investigador","agente-analista","cuadernos-copilot"],
    desafio: "1. Abre una planilla Excel. 2. Activa la opción Copilot. 3. Cambia el modelo automático a Claude. 4. Pídele que te cree gráficos de tu planilla. Crea tu primer agente básico en Copilot. Piensa en una tarea o dolor recurrente de tu día a día en Newell y construye un agente para resolverlo: 1. Dale un nombre y un propósito claro. 2. Redacta una buena paleta de instrucciones (apóyate en la IA para escribirlas). 3. Cárgale conocimiento vinculante (SharePoint, Teams, Outlook o una web). 4. Pruébalo con un caso real y ajusta las instrucciones según el resultado.",
    quiz: [{"q":"¿Qué se puede hacer con Copilot dentro de Word?","opts":["Redactar cosas desde cero.","Es solo para documentos ya existentes.","Te corrige la ortografía con inteligencia artificial.","Todo lo que quieras: documentos en blanco, documentos ya existentes, y muchas cosas más."],"correct":3,"explain":"Copilot en Word es muy versátil — puedes partir desde cero, mejorar un documento existente, resumir, reescribir y mucho más. No está limitado solo a corrección ortográfica ni a documentos previos."},{"q":"¿Es importante que el Excel tenga una estructura ordenada para que la IA lo trabaje bien?","opts":["No, da lo mismo, siempre y cuando ocupe un buen modelo y un buen razonamiento.","Sí, es fundamental que la planilla sea lo más estructurada posible. Evita celdas combinadas, imágenes incrustadas, entre otros.","Lo que más importa es el largo de la planilla para efectos de la IA.","Tratar de que tenga pocos datos para que la IA la entienda bien."],"correct":1,"explain":"Una planilla ordenada, sin celdas combinadas ni imágenes incrustadas, permite que la IA entienda y procese los datos correctamente. La estructura es clave, independiente del modelo o la cantidad de datos."},{"q":"¿Cómo puede ayudarte Copilot en Teams?","opts":["Me puede generar minutas automáticas de mis reuniones.","A darme ideas durante una reunión.","No existe Copilot en Teams.","Me puede hacer transcripciones de ciertas partes de mi reunión."],"correct":0,"explain":"Copilot en Teams puede generar minutas automáticas al finalizar una reunión, resumiendo los puntos clave y los compromisos. Para eso necesita activar la transcripción al inicio de la reunión."},{"q":"¿Puedo ocupar la IA de Copilot en mi SharePoint?","opts":["No, dado que son datos privados.","Solo si es que tengo poca información.","Por supuesto. Puedes integrar Copilot con tu SharePoint para que te ayude con esa información.","Sí, pero pocas veces al día, porque gasta muchos tokens."],"correct":2,"explain":"Copilot puede integrarse con SharePoint para consultar, resumir y trabajar con la información almacenada ahí. No hay restricción de frecuencia ni de volumen de datos — esa es precisamente una de sus ventajas corporativas."},{"q":"¿Qué es un agente en Copilot?","opts":["Un chat nuevo que se borra apenas cierras la ventana.","Un asistente de IA que configuras una sola vez con instrucciones y conocimiento, y luego repite esa lógica automáticamente cada vez que lo usas.","Un programa que debes descargar e instalar aparte en tu computador.","Una macro de Excel que solo sirve para planillas."],"correct":1,"explain":"Un agente se configura una vez —con un propósito, instrucciones y conocimiento— y luego repite esa lógica automáticamente. No es un chat desechable ni algo que se instale aparte."}]
  },
  {
    n: 3,
    label: "Sesión 3 · Claude",
    title: "Claude Aplicación",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Manejar Claude de verdad: la interfaz, qué recuerda, cómo hablarle, el contexto que gastas y los Proyectos.",
    conceptos: ["claude-chat-tour","memoria-claude","dictado-claude","tokens-claude","markdown-claude","proyectos-claude","claude-en-office"],
    desafio: "Arma el cerebro de tu área en Claude. 1. Toma un instructivo, manual o procedimiento real de tu trabajo en Newell —de esos en Word que nadie actualiza hace años— y pídele a Claude que lo convierta a Markdown limpio, respetando la jerarquía y sin resumir ni reinterpretar. 2. Crea un Proyecto con el nombre de tu área y súbele ese MD como conocimiento. 3. Escríbele las instrucciones estructuradas con las cuatro secciones: Quién soy, Qué hacemos acá, Cómo quiero que me respondas y Reglas. 4. Dicta con el micrófono —no tecleando— una pregunta que sin ese contexto Claude no podría responder bien, y comprueba la diferencia.",
    quiz: [{"q":"Cuando decimos que la IA \"alucina\", nos referimos a que…","opts":["Se apaga cuando la pregunta es muy difícil","Entrega información falsa redactada con total seguridad","Solo funciona con conexión a internet","Repite siempre la misma respuesta"],"correct":1,"explain":"La alucinación es información inventada pero presentada con confianza. Por eso todo dato crítico (cifras, nombres, fechas, normas) se verifica antes de usarlo."},{"q":"¿Por qué conviene elegir el modelo según la tarea y no usar siempre el mismo?","opts":["Porque los modelos rápidos rinden mejor en tareas simples y de volumen, y los de razonamiento profundo en análisis complejos","Porque solo hay un modelo disponible por día","Porque cambiar de modelo borra la conversación","Porque los modelos más lentos siempre dan peores respuestas"],"correct":0,"explain":"Usar razonamiento profundo para reformular un correo es gastar de más; usar el modelo más rápido para un análisis delicado es quedarse corto. Elegir bien es parte del oficio."},{"q":"¿Por qué la respuesta número 40 de un hilo largo consume mucho más que la primera?","opts":["Porque el modelo se cansa y necesita más recursos","Porque en cada mensaje nuevo vuelve a leer toda la conversación desde el principio","Porque después de 30 mensajes cambia automáticamente a un modelo más caro","Porque el precio sube según la hora del día"],"correct":1,"explain":"El hilo no se lee una vez: se relee entero en cada turno. Por eso una conversación eterna se pone lenta y cara, y por eso un chat por tema es el hábito que más rinde."},{"q":"Tienes un instructivo en Word y lo quieres dejar como base de un Proyecto. ¿Por qué conviene convertirlo antes a Markdown?","opts":["Porque Claude no puede leer archivos de Word","Porque el MD queda protegido con contraseña","Porque en MD el contenido pesa una fracción de los tokens y queda editable y comparable","Porque Markdown traduce el documento automáticamente"],"correct":2,"explain":"Claude lee el Word perfectamente, pero arrastra toda la maquetación. En MD el mismo contenido ocupa mucho menos contexto, se edita línea a línea y puedes ver exactamente qué cambió."},{"q":"En un Proyecto, ¿cuál es la diferencia entre el conocimiento y las instrucciones?","opts":["Son lo mismo, solo cambia dónde se escriben","El conocimiento son los archivos que consulta; las instrucciones definen cómo debe comportarse","El conocimiento es privado y las instrucciones son públicas","Las instrucciones se borran al cerrar la conversación"],"correct":1,"explain":"Los documentos son lo que sabe; las instrucciones son quién es. Por eso las instrucciones se escriben en Markdown y estructuradas: separan identidad, formato y reglas en vez de mezclarlas en un párrafo."}]
  },
  {
    n: 4,
    label: "Sesión 4 · Claude",
    title: "Claude Agentes",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "El salto de conversar a delegar: conectores, procedimientos estandarizados y entregables vivos.",
    conceptos: ["mcp-conectores","skills-claude","artefactos-claude","agentes-claude"],
    desafio: "Delega una tarea completa, de punta a punta. 1. Activa un conector de una herramienta que ya uses en Newell —el calendario o el repositorio de documentos—, entra a sus permisos y deja la lectura en «permitir siempre» y la escritura o eliminación en «preguntar cada vez». 2. Pídele una tarea que cruce dos fuentes sin que tú copies ni pegues nada: por ejemplo, tus reuniones de la semana más los documentos relacionados, y que arme la lista de compromisos pendientes con responsable y fecha. 3. Toma la tarea que más repites y pídele que la deje como Skill, con los pasos y el formato de salida exacto que tú usas. 4. Sube una planilla tuya y pídele un artefacto interactivo: cuando aparezca la vista previa, pídele un cambio concreto, descárgalo como HTML y ábrelo desde tu computador.",
    quiz: [{"q":"Quieres conectar Claude a tu Drive del trabajo y el botón de conectar te aparece bloqueado. ¿Qué está pasando?","opts":["Tu plan no incluye conectores y hay que comprar el complemento","Tienes que instalar un programa aparte antes de poder conectarlo","Tu cuenta de Claude es de la empresa, y quien administra la consola todavía no habilita ese conector","Los conectores se activan solos después de 24 horas de uso"],"correct":2,"explain":"Con una cuenta personal conectas y listo, sin pedirle permiso a nadie. Pero si tu cuenta es Team, Enterprise o parte de una organización, el conector puede venir bloqueado y hay que pedírselo a TI o a quien administre la consola. Nada de esto se instala ni se programa: el requisito de fondo es simplemente tener cuenta al otro lado del puente."},{"q":"Llevas un año armando propuestas comerciales y siempre terminas peleando con el mismo formato. ¿Qué te conviene hacer?","opts":["Escribir un prompt muy largo y guardarlo en un bloc de notas para pegarlo cada vez","Armar una Skill con el procedimiento, el formato de salida y tus assets: logo, plantilla y un par de ejemplos buenos","Abrir un chat nuevo cada vez y explicarle todo de cero, así no se contamina","Pedirle a un compañero que te mande su última propuesta y editarla a mano"],"correct":1,"explain":"Ese es exactamente el caso que justifica una Skill: la construyes una sola vez —instrucciones, formato y archivos de referencia— y de ahí en adelante te entrega siempre el mismo output. El prompt guardado en un bloc de notas te ahorra tipeo, pero no te ahorra el trabajo de volver a explicar el contexto y los assets cada vez."},{"q":"Descargaste tu artefacto y quedó como un HTML en tu computador. ¿Qué es lo único que NO va a funcionar al mandárselo a otra persona?","opts":["Los colores y el diseño, que se pierden al descargar","Los datos que no quedaron incrustados dentro del código: esos necesitan otro tratamiento","Los botones, porque dejan de responder fuera de Claude","Nada: un artefacto descargado no se puede abrir en otro computador"],"correct":1,"explain":"El HTML descargado se lleva todo adentro —diseño, botones, interactividad— y se abre en cualquier navegador. Lo que no viaja son los datos que viven fuera del archivo: para eso hay que incrustarlos o conectarlos, que ya es harina de otro costal."},{"q":"¿Cuál de estas prácticas NO te ahorra contexto?","opts":["Pedir salidas acotadas (\"solo el párrafo corregido, no el documento entero\")","Abrir un chat nuevo cuando cambias de tema","Dejar siempre el esfuerzo en Extra, por si acaso","Subir el archivo y decirle qué parte te importa"],"correct":2,"explain":"El esfuerzo se ajusta a la tarea. Reformular un correo no necesita razonamiento profundo; comparar dos contratos sí. Gastar de más y quedarse corto cuestan los dos."},{"q":"¿Cuál de estos prompts va a dar mejor resultado?","opts":["\"Escríbeme un correo\"","\"Correo urgente\"","\"Hazlo bien y que sea profesional\"","\"Eres jefe de operaciones. Escribe un correo al proveedor X avisando que el despacho se atrasó 3 días, en tono firme pero cordial, máximo 120 palabras\""],"correct":3,"explain":"Rol, contexto, tarea concreta y formato. Mientras más específico el prompt, menos tiene que adivinar el modelo y mejor sale el resultado a la primera."}]
  },
  {
    n: 5,
    label: "Sesión 5 · Claude",
    title: "Claude Avanzado",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Claude trabajando sobre tus propios archivos: Cowork en la terminal, artefactos en vivo y una primera mirada a Claude Code.",
    conceptos: ["intro-cowork","ejemplos-cowork","html-avanzado","claude-code"],
    desafio: "Deja que Claude trabaje sobre tus propios archivos. 1. Abre Cowork desde la aplicación de escritorio —desde el navegador no funciona— y préstale como sandbox una copia de una carpeta con varios archivos. Cuando el computador te pida autorizar, dale Permitir. 2. Pídele algo concreto y verificable: que convierta todos los Word a PDF en una subcarpeta, o que renombre y agrupe los archivos por tipo y por fecha. 3. Cuando termine, lee el reporte completo, sobre todo lo que dice que NO pudo hacer. 4. Después sube una planilla tuya y pídele un dashboard HTML de Nivel 2, con drag & drop: que puedas arrastrarle el Excel encima y se actualice solo, sin tocar el código.",
    quiz: [{"q":"Entras a claude.ai desde Chrome, aprietas el botón «Cowork» y le pides que te ordene una carpeta de tu computador. No pasa nada. ¿Por qué?","opts":["Porque Cowork solo funciona los días hábiles en horario de oficina","Porque primero hay que subir los archivos uno por uno","Porque el Cowork que se conecta con tu terminal existe solo en la aplicación de escritorio: el botón de la web es otra función","Porque Chrome bloquea el acceso y hay que usar Safari"],"correct":2,"explain":"Es la confusión más común: el botón «Cowork» también aparece en la página web, pero esa no es la función que se conecta con la terminal de tu computador. Para que trabaje sobre tus carpetas reales tiene que ser desde la app de escritorio instalada en tu máquina."},{"q":"Le vas a dar acceso a Cowork por primera vez. ¿Qué es lo que realmente le estás entregando?","opts":["El control de todo tu computador, así que conviene tener respaldo de todo","Un sandbox: la carpeta que tú elijas, y fuera de esa isla no existe nada para él","Solo permiso de lectura, porque nunca puede modificar archivos","Acceso a la nube de Claude, no a tu computador"],"correct":1,"explain":"No le abres el computador entero: le prestas una isla. Dentro de esa carpeta puede leer, crear, editar y eliminar —por eso el sistema te pide autorizar el acceso con Permitir—, y fuera de ella no llega. Tú eliges qué isla le prestas."},{"q":"Le pides a Cowork que convierta 5 contratos de Word a PDF. ¿Qué te entrega cuando termina?","opts":["Las instrucciones paso a paso para que tú hagas la conversión","Un borrador que tienes que aprobar archivo por archivo antes de que se ejecute","Los 5 PDF ya creados en la subcarpeta, más un reporte de qué hizo e incluso de lo que no pudo hacer","Un archivo comprimido que hay que descargar desde la web"],"correct":2,"explain":"Cowork no te deja instrucciones para que las hagas tú: ejecuta los cambios directamente en tu carpeta. Y es rápido porque reparte el encargo entre varios subagentes que avanzan en paralelo. Al terminar te reporta qué hizo, incluido lo que quedó pendiente."},{"q":"Quieres mandarle un dashboard a un colega por correo y que se le abra sin instalar nada y sin tener el Excel. ¿Qué nivel de la escalera del HTML necesitas?","opts":["Nivel 1: el HTML local que lee un Excel que vive aparte","Nivel 3: los datos incrustados dentro del propio HTML, un archivo único y autosuficiente","Nivel 5: hosting con datos dinámicos conectados en vivo","Ninguno: un dashboard siempre necesita que el otro tenga el Excel"],"correct":1,"explain":"El Nivel 3 embebe los datos dentro del HTML: queda un solo archivo que viaja por correo o WhatsApp y se abre en cualquier navegador. El Nivel 1 se rompe apenas sale de tu computador porque el Excel va aparte, y el Nivel 5 es para cuando necesitas que los datos se actualicen solos."},{"q":"¿Cuál de estas afirmaciones sobre Claude Code es correcta?","opts":["Es solo para programadores: sin saber código no hay nada que hacer ahí","Funciona únicamente dentro de la terminal","Ejecuta todo automáticamente, sin pedirte permiso en ningún momento","Sirve para cualquiera que trabaje con muchos archivos: ordenar, renombrar, consolidar y analizar carpetas completas de documentos o planillas"],"correct":3,"explain":"El caso que más sorprende a los no-programadores es justamente ese: carpetas enteras ordenadas, renombradas y consolidadas. Además entra por la terminal, por el editor o por la aplicación, y pide permiso para las acciones sensibles — conviene leer lo que propone, no aprobarlo en automático."}]
  },
  {
    n: 6,
    label: "Sesión 6 · ChatGPT",
    title: "ChatGPT Profundo",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Sacarle el jugo al razonamiento: investigación profunda, internet, análisis de documentos y control de alucinaciones.",
    conceptos: ["modelos-fast-vs-razonamiento","deep-research","internet-avanzada","analisis-documentos","control-alucinaciones"],
    desafio: "Pon a prueba el razonamiento. 1. Toma una pregunta compleja y real de tu área en Newell. Hazla primero con un modelo rápido y después con uno de razonamiento profundo, y decide con cuál te habrías quedado. 2. Lanza una Investigación profunda sobre tu sector especificando qué fuentes quieres, cuáles hay que omitir y en qué formato quieres el resultado. Fíjate en cuánto se demora y en si las fuentes son verificables. 3. Sube dos PDFs de menos de 20 páginas y pide un resumen consolidado con una mirada específica: crítica, ejecutiva o técnica. 4. Repite una de las tres agregando el prompt defensivo —«responde solo si tienes al menos 90% de seguridad; si no estás seguro, dímelo claramente en vez de inventar»— y compara si esta vez te reconoce lo que no sabe.",
    quiz: [{"q":"Tienes que revisar un contrato antes de firmarlo. ¿Qué modelo eliges?","opts":["El más rápido, porque así alcanzas a revisar más contratos en el día","Da lo mismo: todos los modelos leen igual de bien","Uno de razonamiento profundo: si te equivocas acá hay consecuencias, y el tiempo extra se paga solo","El rápido primero, y si falla ya no hay nada que hacer"],"correct":2,"explain":"La regla práctica es simple: si te equivocas y no pasa nada, usa el rápido. Si te equivocas y hay consecuencias, usa el de razonamiento profundo. Reformular un correo no lo necesita; un contrato sí."},{"q":"¿Qué distingue a la Investigación profunda de una búsqueda normal en internet?","opts":["Que responde más rápido porque no sale a buscar","Que solo funciona con documentos que tú le subes","Que no se puede usar con cuentas corporativas","Que navega de forma autónoma por decenas de fuentes y entrega un informe estructurado con citas verificables"],"correct":3,"explain":"La Investigación profunda recorre decenas de fuentes por su cuenta y sintetiza un informe extenso con citas. Se demora varios minutos justamente por eso. Está en las cuatro herramientas, cada una con su puerta: en Claude con + → Investigación, en Copilot con el agente Investigador, en Gemini desde Herramientas y en ChatGPT con + → Investigación avanzada."},{"q":"Quieres que investigue un tema, pero sin que te llene el informe de posteos de redes sociales. ¿Qué haces?","opts":["No hay forma: la IA busca donde quiere","Le dices explícitamente qué fuentes usar, cuáles omitir y en qué formato quieres el resultado","Le pides que busque menos, para que no alcance a llegar a redes sociales","Copias y pegas a mano cada artículo que sí quieres"],"correct":1,"explain":"Controlar las fuentes es parte del prompt: «investiga X usando solo fuentes como Emol o La Tercera, omite redes sociales, y dame el resultado como tabla comparativa». También puedes pasarle una URL directa para que lea esa página en particular y seguir preguntando sobre ella."},{"q":"Tienes dos licitaciones y quieres compararlas. ¿Cuál es la forma correcta de pedirlo?","opts":["Adjuntar ambos archivos en la misma conversación y pedir un resumen consolidado con una mirada específica: crítica, ejecutiva o técnica","Subirlas de a una y pedir un resumen de cada una por separado","Pegar el texto completo de las dos en el chat","No se puede: la IA analiza un solo documento a la vez"],"correct":0,"explain":"Puedes adjuntar varios archivos en la misma conversación y pedir el análisis cruzado. La clave está en decirle desde qué mirada quieres el consolidado y en cuántas palabras — si no se lo pides, elige por ti."},{"q":"¿Se puede eliminar por completo que la IA invente?","opts":["Sí, activando el modo verificado","Sí, siempre que uses un modelo de razonamiento profundo","No, pero se reduce mucho pidiéndole que responda solo si tiene alta seguridad y que avise cuando no sabe","No, y no hay absolutamente nada que puedas hacer al respecto"],"correct":2,"explain":"No se elimina al 100%, pero sí se reduce harto. Un prompt defensivo del tipo «responde solo si tienes al menos 90% de seguridad; si no, dímelo claramente en vez de inventar» cambia mucho el resultado. Y todo dato crítico —cifras, nombres, fechas, normas— se verifica igual antes de usarlo."}]
  },
  {
    n: 7,
    label: "Sesión 7 · Multimedia",
    title: "Imágenes y Video con IA",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Piezas de campaña de punta a punta: imágenes, video, infografías, logos, mejora de resolución y música.",
    conceptos: ["imagenes-pro","videos-con-ia","logos-ideogram","napkin-infografias","enhancer-upscale","musica-gemini","canvas-gemini","camara-con-ia","gamma-ppts"],
    desafio: "Crea una pieza de campaña de punta a punta: 1. Genera una imagen de producto con tu marca (Crear con Copilot o Gemini). 2. Anímala con image-to-video en Gemini para un reel. 3. Si la imagen base estaba pixelada, pásala antes por Krea.ai. Comparte el resultado con tu equipo. 🎬",
    quiz: [{"q":"¿Qué permite hacer \"Crear con Copilot\" para marketing?","opts":["Solo escribir correos.","Solo crear tablas de Excel.","Generar imágenes y pósters e insertar el logo de tu marca en una escena realista (mockups).","Nada visual, solo texto."],"correct":2,"explain":"Desde \"Crear\" en Copilot generas imágenes, pósters, infografías y más. Con \"Insertar un logotipo en una escena\" puedes integrar el logo de la marca de forma realista — ideal para mockups de campaña."},{"q":"Al generar imágenes pro de producto con ChatGPT o Gemini, ¿qué conviene hacer?","opts":["Subir una foto real del producto como referencia y dar un prompt con superficie, fondo, estilo y uso final.","Pedir \"una foto linda\" sin más contexto.","Usar siempre la menor resolución posible.","Evitar mencionar la marca o el producto."],"correct":0,"explain":"La foto de referencia mantiene la fidelidad del producto, y un prompt detallado (superficie + fondo + estilo + uso final) define la calidad del resultado. Mientras más específico, mejor."},{"q":"Sobre los videos con Gemini, ¿qué es cierto?","opts":["Requiere pagar una licencia aparte.","Solo genera videos de una hora.","No acepta fotos como punto de partida.","Se activa gratis con tu Gmail (~3 videos/día) y permite text-to-video e image-to-video (animar una foto real)."],"correct":3,"explain":"Gemini se activa gratis con tu cuenta de Gmail y permite generar video desde texto o animar una foto real (image-to-video) — perfecto para reels de marketing sin rodaje."},{"q":"¿Por qué usar Ideogram en modo \"Design\" para logos y mockups?","opts":["Porque es el único generador gratis que existe.","Es el más confiable para que el texto y el nombre de la marca salgan bien escritos dentro del diseño.","Porque solo trabaja en blanco y negro.","Porque no necesita ningún prompt."],"correct":1,"explain":"La mayoría de generadores distorsionan el texto. Ideogram en modo Design es el más confiable para que el nombre de la marca aparezca legible y bien escrito — clave en branding y mockups."},{"q":"¿Para qué sirve Krea.ai en marketing?","opts":["Para borrar el fondo de una foto.","Para escribir el copy de la campaña.","Para subir la resolución de fotos pixeladas o de baja calidad y dejarlas listas para valla o catálogo.","Para componer la música de un reel."],"correct":2,"explain":"Krea.ai (cuenta gratis) reconstruye detalle y sube la resolución de imágenes pixeladas o borrosas, dejándolas listas para impresión de gran formato o catálogo."}]
  },
  {
    n: 8,
    label: "Sesión 8 · Cierre",
    title: "Resumen final del programa",
    dur: "2 hrs · Presencial",
    resumen: "Juntar las piezas: qué herramienta para qué, prompts que rinden, confidencialidad y el mapa de todo lo recorrido.",
    conceptos: ["3-esferas","fundamentos-prompt","redaccion-avanzada","confidencialidad-ia","notebooklm"],
    desafio: "El cierre: junta todo el programa en una sola pasada. 1. Toma tres tareas tuyas de esta semana y clasifícalas por esfera: cuál es de texto, cuál de datos y cuál de imagen. 2. Agarra la de texto y escribe el prompt completo con las cuatro piezas —rol, contexto, tarea y formato—, dictándolo con el micrófono en vez de teclearlo. 3. Antes de pegar cualquier documento real de Newell, anonimízalo: reemplaza nombres de clientes, RUT y montos por marcadores tipo [CLIENTE] o [MONTO]. 4. Sube ese material a un cuaderno de NotebookLM y genera un accionable del Studio —el podcast de dos locutores o el mapa mental— para cerrar el programa con algo que le puedas mostrar a tu equipo.",
    quiz: [{"q":"Según el mapa de las tres esferas, ¿dónde está la mayor parte del valor en el trabajo de oficina?","opts":["En imagen y video, porque es lo que más llama la atención","Solo en código","Está repartido exactamente igual entre las tres","En texto y en datos"],"correct":3,"explain":"Lo visual impresiona más, pero rinde menos horas. El grueso del valor está en la esfera de texto —redactar, resumir, analizar documentos— y en la de datos. Saber en qué esfera estás es lo que te dice qué herramienta abrir."},{"q":"¿Cuáles son las cuatro piezas de un buen prompt?","opts":["Saludo, pregunta, agradecimiento y despedida","Rol, contexto, tarea y formato","Modelo, temperatura, tokens y semilla","Título, cuerpo, conclusión y fuentes"],"correct":1,"explain":"Rol para activar el vocabulario y los criterios de esa disciplina, contexto porque la IA no sabe nada de tu empresa hasta que se lo cuentas, tarea concreta en vez de «ayúdame con esto», y formato — porque si no lo pides, el modelo elige por ti."},{"q":"La IA te entrega siempre textos más largos de lo que necesitas. ¿Cuál es la solución?","opts":["Es inevitable: hay que recortar a mano después","Cambiar a un modelo más rápido","Ponerle un límite explícito en el prompt: «en máximo 80 palabras», «en 3 párrafos», «en 5 bullets»","Escribirle el prompt en mayúsculas para que entienda que es urgente"],"correct":2,"explain":"La IA tiende a ser verbosa, así que hay que ponerle límite. Y junto con la extensión conviene fijar el tono y el formato: eso es lo que hace que el resultado sea usable de inmediato, sin tener que pasarlo a limpio."},{"q":"Vas a pedirle a la IA que analice un contrato real de un cliente. ¿Cuál es la jugada correcta?","opts":["Anonimizarlo primero —reemplazar nombres, RUT y montos por marcadores tipo [CLIENTE] o [MONTO]— y confirmar qué permite tu organización","Pegarlo tal cual: las IA no guardan nada","Pegarlo, pero borrar el chat después para que no quede registro","No usar IA nunca para documentos de trabajo"],"correct":0,"explain":"Todo lo que escribes sale de tu computador. La regla práctica: si no se lo mandarías por correo a alguien fuera de la empresa, no lo pegues sin confirmar antes. Anonimizar te deja igual el análisis, sin el riesgo — y la responsabilidad del resultado sigue siendo tuya."},{"q":"¿Qué tiene NotebookLM que no tiene un chat normal?","opts":["Que no necesita que subas nada, porque ya sabe todo de tu empresa","Que responde basándose solo en las fuentes que tú le cargaste, y del mismo material genera accionables: podcast con dos locutores, presentación, mapa mental o cuestionario","Que corrige la ortografía de tus documentos automáticamente","Que reemplaza a Claude y a ChatGPT en todas sus funciones"],"correct":1,"explain":"NotebookLM se ancla a tus fuentes —PDFs, webs, YouTube, audio— y por eso alucina mucho menos. Lo distinto está en el Studio: del mismo material te arma en un clic un podcast de dos locutores que debaten tu contenido, una presentación, un mapa mental o un cuestionario."}]
  }
];

// Una habilidad por concepto: marcar el check la desbloquea.
const COLORES = {"1":["#0C447C","#125E9E","#1878BE","#2E92D6","#4CA6E0","#6BB8E8","#8ACAF0","#A9DCF8"],"2":["#042C53","#0A3E6F","#12558F","#1A6CAF","#2483C9","#2E9AE3"],"3":["#7C2D12","#9A3412","#B45309","#C2410C","#D97706","#EA580C","#F59E0B"],"4":["#3B2C7A","#4C3A9E","#5D48C2","#7059D6"],"5":["#134E4A","#166F63","#1A907C","#2FB39A"],"6":["#065F46","#047857","#059669","#10B981","#34D399"],"7":["#7C2D5A","#9B3A6E","#B94782","#D65496","#E0699F","#EA7EA8","#F08FB4","#F5A623","#C97C1E"],"8":["#334155","#475569","#64748B","#0C447C","#F5A623"]};
const SKILLS = TALLERES.flatMap(t =>
  t.conceptos.map((id, i) => ({ id, taller: t.n, color: COLORES[t.n][i] }))
);

const SUPABASE_URL = 'https://adtyiqpcddxjnxfxrkod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdHlpcXBjZGR4am54Znhya29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM2NjQsImV4cCI6MjA4ODU1OTY2NH0.hTKgoum0LEmrFPj7LE7VbHTMNUocxovJqmkfOsTNubA';
const STARS_KEY = 'newell_pack_v1';
const USER_KEY  = 'newell_pack_user_v1';

let st = {};
let user = null;
const BLOQUES = {};

const T = n => TALLERES.find(t => t.n === n);

// El portal va versionado en la ruta: cada edición vive en su propia carpeta
// y la anterior deja de existir. Para sacar una nueva basta con renombrar el
// directorio, cambiar estas dos constantes y actualizar los rewrites.
const BASE    = '/newell';
const VERSION = 'Agosto 26';

// En Vercel las rutas son /newell y /newell/taller-1.
// Abriendo los archivos directo (revisión local) no existen esos rewrites,
// así que caemos al .html.
const RUTA_PLANA = location.pathname.endsWith('.html');
const urlTaller  = n => RUTA_PLANA ? `${BASE}/taller.html?n=${n}` : `${BASE}/taller-${n}`;
const urlHub     = ()  => RUTA_PLANA ? `${BASE}/index.html` : BASE;
// conceptos + ejercicios + quiz + desafío
const totalPasos = () => TALLERES.reduce((a, t) => a + t.conceptos.length + ejerciciosDe(t.n).length + 2, 0);

/* ---------------- Utilidades ---------------- */

function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function uuid(){
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function slugify(s){
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'sin-empresa';
}

/* ---------------- Progreso local ---------------- */

function loadStars(){ try { st = JSON.parse(localStorage.getItem(STARS_KEY)) || {}; } catch { st = {}; } }
function saveStars(){ localStorage.setItem(STARS_KEY, JSON.stringify(st)); }

const conceptosOk = n => T(n).conceptos.filter(id => st[`c-${id}`]).length;
const isComplete  = n => !!(st[`${n}-quiz`] && st[`${n}-des`]
  && conceptosOk(n) === T(n).conceptos.length
  && ejerciciosOk(n) === ejerciciosDe(n).length);
const countStars  = () => TALLERES.filter(t => isComplete(t.n)).length;
const skillsOk    = () => SKILLS.filter(s => st[`c-${s.id}`]).length;

function pasosHechos(){
  let p = 0;
  TALLERES.forEach(t => {
    if (st[`${t.n}-quiz`]) p++;
    if (st[`${t.n}-des`])  p++;
    p += conceptosOk(t.n) + ejerciciosOk(t.n);
  });
  return p;
}
const avancePct = () => Math.round((pasosHechos() / totalPasos()) * 100);

/* ---------------- Identidad ---------------- */

function loadUser(){
  try { user = JSON.parse(localStorage.getItem(USER_KEY)); } catch { user = null; }
  if (user && (!user.id || !user.nombre || !user.empresa_slug)) user = null;
}

const iniciales = nombre =>
  nombre.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?';

/* ---------------- Sync a Supabase (best-effort, nunca bloquea) ---------------- */

// La anon key no puede leer ni escribir las tablas directamente: solo
// ejecutar estas dos funciones. Así los emails nunca quedan expuestos
// a cualquiera que abra el código del portal.
function rpc(fn, args, conRespuesta){
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };
  // Las escrituras no devuelven nada; la recuperación sí necesita el cuerpo.
  if (!conRespuesta) headers['Prefer'] = 'return=minimal';
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', headers, body: JSON.stringify(args)
  });
}

async function syncUser(){
  if (!user) return;
  try {
    await rpc('claude_registrar_participante', {
      p_id: user.id, p_nombre: user.nombre, p_email: user.email,
      p_empresa: user.empresa, p_empresa_slug: user.empresa_slug, p_cargo: user.cargo || null
    });
  } catch (e) { /* sin red: el progreso local sigue funcionando */ }
}

// Detalle del quiz: qué alternativa marcó en cada pregunta. Es lo que después
// permite ver en qué se equivoca más la gente de una empresa.
async function syncRespuesta(taller, pregunta, elegida, correcta){
  if (!user) return;
  try {
    await rpc('claude_registrar_respuesta', {
      p_participante_id: user.id, p_empresa_slug: user.empresa_slug,
      p_taller: taller, p_pregunta: pregunta,
      p_elegida: elegida, p_correcta: correcta
    });
  } catch (e) { /* idem: nunca bloquea el quiz */ }
}

async function syncProgreso(taller, tipo, concepto, score, total){
  if (!user) return;
  try {
    await rpc('claude_registrar_progreso', {
      p_participante_id: user.id, p_empresa_slug: user.empresa_slug,
      p_taller: taller, p_tipo: tipo, p_concepto: concepto || '',
      p_quiz_score: (score === undefined ? null : score),
      p_quiz_total: (total === undefined ? null : total)
    });
  } catch (e) { /* idem */ }
}

// Reenvía todo lo que está completo localmente. Cubre el caso de que una
// escritura haya fallado (sin red, pestaña cerrada a medias) y evita que
// el panel muestre menos avance del que la persona realmente hizo.
async function resyncAll(){
  if (!user) return;
  for (const t of TALLERES){
    if (st[`${t.n}-quiz`]) await syncProgreso(t.n, 'quiz', '', st[`${t.n}-quizScore`], st[`${t.n}-quizTotal`]);
    if (st[`${t.n}-des`])  await syncProgreso(t.n, 'desafio', '');
    for (const id of t.conceptos) if (st[`c-${id}`]) await syncProgreso(t.n, 'concepto', id);
    for (const e of ejerciciosDe(t.n)) if (st[`e-${e.id}`]) await syncProgreso(t.n, 'ejercicio', e.id);
  }
}

/* ---------------- Contenido desde /bloques ---------------- */

async function cargarBloques(ids){
  const lista = [...new Set(ids || TALLERES.flatMap(t => t.conceptos))];
  await Promise.all(lista.map(async id => {
    try {
      // no-cache revalida contra el servidor: al editar un bloque, el cambio
      // se ve de inmediato en vez de quedar servido desde la caché del navegador.
      const r = await fetch(`/bloques/${id}/meta.json`, { cache: 'no-cache' });
      if (r.ok) BLOQUES[id] = await r.json();
    } catch (e) { /* la pantalla muestra un aviso en vez de romperse */ }
  }));
}

// Ejercicios hands-on del taller: salen del campo `desafio` de cada bloque,
// así el mismo ejercicio sirve para armar sesiones de cualquier cliente.
function ejerciciosDe(n){
  return T(n).conceptos
    .filter(id => BLOQUES[id] && BLOQUES[id].desafio)
    .map(id => {
      const d = BLOQUES[id].desafio;
      const obj = (typeof d === 'string') ? { enunciado: d } : d;
      return Object.assign({ id: id, bloque: BLOQUES[id] }, obj);
    });
}

const ejerciciosOk = n => ejerciciosDe(n).filter(e => st[`e-${e.id}`]).length;

// Primera imagen del bloque, si la tiene. Los bloques nuevos aún no traen.
function imagenDe(id){
  const b = BLOQUES[id];
  if (!b || !b.assets || !b.assets.length) return null;
  return `/bloques/${id}/${b.assets[0]}`;
}

/* ---------------- Shell compartido (gate, toast, habilidades) ---------------- */

function injectShell(){
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="toast" id="toast"></div>

  <div class="sk-overlay" id="sk-overlay">
    <div class="sk-sheet">
      <button class="sk-close" id="sk-close">✕</button>
      <div class="sk-header">
        <div class="sk-eyebrow">Centro de habilidades</div>
        <div class="sk-score">
          <div class="sk-ring" id="sk-ring">
            <svg viewBox="0 0 120 120">
              <circle class="sk-ring-bg" cx="60" cy="60" r="52"></circle>
              <circle class="sk-ring-fg" id="sk-ring-fg" cx="60" cy="60" r="52"></circle>
            </svg>
            <div class="sk-ring-n"><b id="sk-n">0</b><i id="sk-tot">/0</i></div>
          </div>
          <div class="sk-score-t">
            <div class="sk-title" id="sk-title">Vas comenzando</div>
            <div class="sk-sub" id="sk-sub"></div>
            <div class="sk-rangos" id="sk-rangos"></div>
          </div>
        </div>
      </div>
      <div class="sk-body" id="sk-body"></div>
    </div>
  </div>

  <div class="gate" id="gate">
    <div class="gate-box">
      <div class="gate-ico">👋</div>
      <div class="gate-title">Antes de partir, cuéntanos quién eres</div>
      <div class="gate-sub">Así guardamos tu avance y tu empresa puede ver cómo va el equipo. No hay contraseña ni registro: son 10 segundos.</div>
      <div class="gate-field"><label for="g-nombre">Nombre y apellido</label><input type="text" id="g-nombre" autocomplete="name" placeholder="Ej: Ana Pérez" /></div>
      <div class="gate-field"><label for="g-email">Email corporativo</label><input type="email" id="g-email" autocomplete="email" placeholder="ana.perez@empresa.cl" /></div>
      <div class="gate-field"><label for="g-empresa">Empresa</label><input type="text" id="g-empresa" autocomplete="organization" placeholder="Ej: Minera Los Andes" /></div>
      <div class="gate-field"><label for="g-cargo">Cargo</label><input type="text" id="g-cargo" autocomplete="organization-title" placeholder="Ej: Jefa de Operaciones" /></div>
      <div class="gate-err" id="gate-err"></div>
      <button class="gate-btn" id="gate-ok">Entrar al portal →</button>
      <button class="gate-cancel" id="gate-cancel">Cancelar</button>
      <div class="gate-note">Usamos estos datos solo para reportar el avance del programa a tu empresa. No enviamos publicidad ni compartimos tu correo con terceros.</div>
    </div>
  </div>`;
  document.body.appendChild(div);

  document.getElementById('gate-ok').onclick = submitGate;
  document.getElementById('gate-cancel').onclick = closeGate;
  document.getElementById('sk-close').onclick = () => closeSkills();
  document.getElementById('sk-overlay').onclick = e => closeSkills(e);
  document.getElementById('gate').addEventListener('keydown', e => { if (e.key === 'Enter') submitGate(); });
}

function toast(msg){
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ---------------- Gate ---------------- */

function openGate(edit){
  if (edit && user){
    document.getElementById('g-nombre').value  = user.nombre;
    document.getElementById('g-email').value   = user.email;
    document.getElementById('g-empresa').value = user.empresa;
    document.getElementById('g-cargo').value   = user.cargo || '';
  }
  document.getElementById('gate-cancel').classList.toggle('show', !!user);
  document.getElementById('gate-err').classList.remove('show');
  document.getElementById('gate').classList.add('open');
  setTimeout(() => document.getElementById('g-nombre').focus(), 150);
}

function closeGate(){
  if (!user) return;
  document.getElementById('gate').classList.remove('open');
}

function gateError(msg, id){
  const el = document.getElementById('gate-err');
  el.textContent = msg;
  el.classList.add('show');
  ['g-nombre','g-email','g-empresa','g-cargo'].forEach(i => document.getElementById(i).classList.remove('err'));
  if (id) document.getElementById(id).classList.add('err');
}

function submitGate(){
  const nombre  = document.getElementById('g-nombre').value.trim();
  const email   = document.getElementById('g-email').value.trim().toLowerCase();
  const empresa = document.getElementById('g-empresa').value.trim();
  const cargo   = document.getElementById('g-cargo').value.trim();

  if (nombre.length < 3)  return gateError('Escribe tu nombre y apellido.', 'g-nombre');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return gateError('Revisa tu email, algo no cuadra.', 'g-email');
  if (empresa.length < 2) return gateError('Falta el nombre de tu empresa.', 'g-empresa');
  if (cargo.length < 2)   return gateError('Falta tu cargo.', 'g-cargo');

  document.getElementById('gate-err').classList.remove('show');
  user = { id: (user && user.id) || uuid(), nombre, email, empresa, cargo, empresa_slug: slugify(empresa) };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.getElementById('gate').classList.remove('open');
  if (typeof onIdentidad === 'function') onIdentidad();
  // Primero recuperamos lo que ya hizo (puede venir de otro dispositivo) y
  // recién ahí registramos y reenviamos, para no partir de cero.
  recuperarProgreso().then(recuperado => {
    if (recuperado && typeof onProgresoRecuperado === 'function') onProgresoRecuperado();
    else if (typeof onIdentidad === 'function') onIdentidad();
    return syncUser().then(resyncAll);
  });
}

// Trae el avance guardado en el servidor a partir del correo y lo mezcla con
// lo que haya en este navegador. Nunca borra progreso local: solo suma.
async function recuperarProgreso(){
  if (!user || !user.email) return false;
  let data;
  try {
    const r = await rpc('claude_recuperar', { p_email: user.email }, true);
    if (!r.ok) return false;
    data = await r.json();
  } catch (e) { return false; }
  if (!data || !data.id) return false;

  // Adoptamos el id con el que ya estaba registrado: así el panel no lo
  // cuenta dos veces por haber entrado desde el computador y el celular.
  if (user.id !== data.id){
    user.id = data.id;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  let nuevo = 0;
  (data.progreso || []).forEach(p => {
    const k = p.tipo === 'concepto' ? `c-${p.concepto}`
            : p.tipo === 'ejercicio' ? `e-${p.concepto}`
            : p.tipo === 'quiz'     ? `${p.taller}-quiz`
            : p.tipo === 'desafio'  ? `${p.taller}-des` : null;
    if (!k) return;
    if (!st[k]) { st[k] = true; nuevo++; }
    if (p.tipo === 'quiz'){
      if (p.quiz_score != null) st[`${p.taller}-quizScore`] = p.quiz_score;
      if (p.quiz_total != null) st[`${p.taller}-quizTotal`] = p.quiz_total;
    }
  });
  if (nuevo) saveStars();
  return nuevo > 0;
}

/* ---------------- Centro de habilidades ---------------- */

// Los rangos le dan una meta intermedia a la colección: sin esto, ir de 4 a 13
// es una cuesta larga sin nada que celebrar en el medio.
const RANGOS = [
  { min: 0,    nombre: 'Explorador',  icono: '🌱' },
  { min: 0.25, nombre: 'Practicante', icono: '⚡' },
  { min: 0.5,  nombre: 'Operador',    icono: '🔧' },
  { min: 0.75, nombre: 'Estratega',   icono: '🎯' },
  { min: 1,    nombre: 'Maestro',     icono: '👑' }
];
const rangoDe = pct => RANGOS.filter(r => pct >= r.min).pop();

function renderSkills(animar){
  const body = document.getElementById('sk-body');
  if (!body) return;

  const total = SKILLS.length, hechas = skillsOk();
  const pct = total ? hechas / total : 0;

  // Aro de progreso
  const fg = document.getElementById('sk-ring-fg');
  if (fg){
    const largo = 2 * Math.PI * 52;
    fg.style.strokeDasharray = largo;
    fg.style.strokeDashoffset = largo * (1 - pct);
  }
  document.getElementById('sk-n').textContent   = hechas;
  document.getElementById('sk-tot').textContent = `/${total}`;
  document.getElementById('sk-ring').classList.toggle('full', hechas === total && total > 0);

  const rango = rangoDe(pct);
  document.getElementById('sk-title').textContent = `${rango.icono} ${rango.nombre}`;
  const faltan = total - hechas;
  document.getElementById('sk-sub').textContent = hechas === 0
    ? `Desbloquea tu primera habilidad para empezar la colección.`
    : faltan === 0
      ? `Colección completa: dominaste las ${total} habilidades.`
      : `Llevas ${hechas} de ${total}. Te faltan ${faltan} para completar la colección.`;

  document.getElementById('sk-rangos').innerHTML = RANGOS.map(r =>
    `<span class="sk-rango ${pct >= r.min ? 'on' : ''}" title="${esc(r.nombre)}">${r.icono}</span>`
  ).join('');

  // Las habilidades van agrupadas por sesión: se ve de dónde sale cada una
  body.innerHTML = TALLERES.map(t => {
    const dela = SKILLS.filter(s => s.taller === t.n);
    const ok = dela.filter(s => st[`c-${s.id}`]).length;
    return `
    <section class="sk-grupo">
      <div class="sk-gtop">
        <span class="sk-glabel">${esc(t.label)}</span>
        <span class="sk-gcount ${ok === dela.length ? 'full' : ''}">${ok}/${dela.length}</span>
      </div>
      <div class="sk-grid">
        ${dela.map(sk => {
          const b = BLOQUES[sk.id];
          const on = !!st[`c-${sk.id}`];
          const pop = (animar === sk.id && on) ? ' pop' : '';
          // La medalla lleva el nombre corto; el largo queda en el tooltip
          const nombre = b ? (b.habilidad || b.nombre) : sk.id;
          return `<div class="sk ${on ? 'on' : 'off'}${pop}" style="${on ? `--sk-c:${sk.color};` : ''}" title="${esc(b ? b.nombre : sk.id)}">
            <span class="sk-medalla">
              <span class="sk-icon">${on ? (b ? b.emoji : '★') : '🔒'}</span>
            </span>
            <span class="sk-name">${esc(nombre)}</span>
          </div>`;
        }).join('')}
      </div>
    </section>`;
  }).join('');
}

function openSkills(){ renderSkills(); document.getElementById('sk-overlay').classList.add('open'); }
function closeSkills(e){
  if (e && e.target !== document.getElementById('sk-overlay')) return;
  document.getElementById('sk-overlay').classList.remove('open');
}

/* ---------------- Arranque compartido ---------------- */

async function bootPortal(ids){
  injectShell();
  loadStars();
  loadUser();
  if (!user) openGate(false);
  else {
    // Esperamos la recuperación (con tope de 3s) para que la primera pantalla
    // ya se dibuje con el avance real, venga del navegador o del servidor.
    await Promise.race([recuperarProgreso(), new Promise(r => setTimeout(r, 3000))]);
    syncUser().then(resyncAll);
  }
  await cargarBloques(ids);
}

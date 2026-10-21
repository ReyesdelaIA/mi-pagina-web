/* ==================================================================
   Programa Newell · lógica compartida entre el hub y las sesiones
   ------------------------------------------------------------------
   El contenido de cada concepto vive en /bloques/<id>/meta.json:
   una sola fuente de verdad, reutilizable para armar sesiones de
   cualquier cliente.
   ================================================================== */

const TALLERES = [
  {
    n: 1,
    num: "Inicial",
    label: "Taller inicial · Fundamentos",
    title: "Iniciación al uso de IA",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "El piso común antes de entrar a Copilot: por qué esto es serio, cómo se le habla a una IA y qué hay que cuidar.",
    conceptos: ["ia-panorama","ia-tres-verdades","prompt-tres-reglas","ia-cuatro-esferas","ia-mundo-real"],
    desafio: {"titulo":"Tu primer prompt de verdad","intro":"Toma una tarea real que hiciste esta semana —un correo difícil, un resumen, una propuesta— y vuelve a hacerla con IA aplicando las 3 reglas de oro.","pasos":["Escribe primero el prompt corto que habrías escrito antes de este taller. Guarda esa respuesta.","Ahora escribe el prompt completo: rol, contexto, tarea y formato. Usa el dictado si te da lata tipear.","Compara los dos resultados lado a lado y anota qué cambió.","Itera al menos dos veces sobre el segundo, hasta que quede mejor que lo que hiciste a mano.","Verifica todo dato importante que haya aparecido: cifras, nombres, fechas."],"prompt":"Eres [ROL]. Contexto: [SITUACIÓN COMPLETA, PARA QUIÉN ES Y POR QUÉ]. Tarea: [QUÉ NECESITAS EXACTAMENTE]. Formato: [LARGO, TONO Y ESTRUCTURA]. Si algo no te queda claro, pregúntamelo antes de escribir.","cierre":"Si el segundo resultado no te ganó al primero, casi seguro faltó contexto — no herramienta."},
    quiz: [{"q":"Según lo que vimos, ¿cuál es la idea de fondo sobre el impacto de la IA en el trabajo?","opts":["La IA va a reemplazar a la mayoría de los profesionales en 2 años","La IA no reemplaza personas, pero las personas que la ocupan sí reemplazan a las que no la ocupan","La IA solo sirve para trabajos técnicos y de programación","Conviene esperar a que la tecnología madure antes de aprenderla"],"correct":1,"explain":"Harvard Business Review, Forbes y Fast Company lo resumen igual, y Tom Davenport lo dijo en una frase: «La IA no te quitará tu trabajo, lo hará alguien que ocupe la IA mejor que tú». Empezar hoy es la única ventaja competitiva real."},{"q":"Tienes tres informes largos y necesitas sacar las diferencias entre ellos. ¿En qué esfera de la IA estás?","opts":["Redacción","Internet","Análisis","Multimedia"],"correct":2,"explain":"Análisis es leer archivos por ti: adjuntas los PDFs, Word o Excel y la IA los compara y resume. Es la esfera que más horas ahorra en oficina y la que menos gente ocupa — lo que era una tarde pasa a diez minutos."},{"q":"Cuando decimos que la IA «alucina», nos referimos a que…","opts":["Se apaga cuando la pregunta es muy difícil","Puede contestar de manera errática, porque responde por probabilidades y no por certeza absoluta","Solo funciona con conexión a internet","Repite siempre la misma respuesta"],"correct":1,"explain":"La IA no consulta una base de datos con la verdad: calcula cuál es la respuesta más probable. Por eso puede contestar de forma errática, y suena igual de segura cuando acierta que cuando se equivoca. Ahí está el motivo de verificar todo dato crítico."},{"q":"De las 3 reglas de oro del prompt, ¿cuál es la que más gente incumple?","opts":["Quedarse con la primera respuesta en vez de iterar 2 o 3 veces","Escribir en español en vez de inglés","Usar mayúsculas al principio de cada frase","Hacer las preguntas de a una por vez"],"correct":0,"explain":"La regla mental es clara: si te quedaste con la primera respuesta de la IA, seguramente la estás ocupando mal. El valor está en la conversación — pedir cambios, contradecir, pedir alternativas."},{"q":"Recibes un audio de tu jefe pidiéndote una transferencia urgente. ¿Cuál es la forma más simple y efectiva de descartar un deepfake?","opts":["Escuchar el audio varias veces buscando ruidos raros","Hacerle una pregunta que solo esa persona pueda responder","Pedirle que mande el audio de nuevo","Revisar si el número desde el que llegó es conocido"],"correct":1,"explain":"Es exactamente lo que salvó a Ferrari: un dirigente le hizo al supuesto CEO una pregunta personal que solo el verdadero podía responder. Un dato familiar o una broma interna vale más que cualquier análisis técnico del audio."}]
  },
  {
    n: 2,
    num: "01",
    label: "Sesión 1 · Copilot",
    title: "Copilot en tu día a día",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Dejar Copilot andando y sacarle partido: activación, tour por la herramienta, memoria, voz, imágenes y cuadernos.",
    conceptos: ["copilot-intro-activacion","copilot-tour","memoria-copilot","copilot-voz","copilot-crear-cuadernos"],
    desafio: {"titulo":"Copilot como tu asistente personal","intro":"Deja Copilot configurado a tu medida y úsalo una vez de punta a punta.","pasos":["Enciende la memoria y logra que memorice 5 cosas relevantes de ti y de tu rol. Después pregúntale «¿qué sabes de mí?» para verificar.","Instala la app en tu celular con la misma cuenta y ten una conversación hablada de 5 minutos sobre un tema de tu trabajo. Al final pídele el resumen por escrito.","Entra a Crear y genera una imagen o pieza visual para algo tuyo de verdad.","Arma un cuaderno con 3 documentos de un mismo proyecto y hazle tres preguntas que antes te habrían tomado media hora de lectura."],"prompt":"Memoriza lo siguiente sobre mí: soy [CARGO] en [ÁREA]. Mis tareas habituales son [TAREAS]. Prefiero respuestas [LARGO Y TONO]. A partir de ahora, considera esto en todas nuestras conversaciones.","cierre":"Ojo con el modo Work: si el selector quedó en Web, Copilot no va a ver ninguno de tus archivos."},
    quiz: [{"q":"¿Qué modo debes elegir al ingresar a Copilot con tu cuenta corporativa?","opts":["Personal","Student","Work","Enterprise"],"correct":2,"explain":"El modo Work conecta Copilot con tu cuenta corporativa y tus datos de Microsoft 365: OneDrive, SharePoint, Outlook y Teams. En modo Web funciona como cualquier chat y no sabe nada de ti ni de tu empresa."},{"q":"¿Qué modelos de lenguaje utiliza Copilot de Microsoft?","opts":["Solo ChatGPT","Solo Gemini","Solo Claude","GPT y Claude"],"correct":3,"explain":"Copilot no usa un solo modelo: Microsoft integra tanto GPT (de OpenAI) como Claude (de Anthropic) según la tarea, y en varias partes puedes elegir a mano. Gemini es de Google y no está en Copilot."},{"q":"¿Cuál es la diferencia entre el dictado y el modo de voz conversacional?","opts":["Ninguna, son dos nombres para lo mismo","El dictado convierte tu voz en texto; el modo conversacional es un ida y vuelta hablado donde la IA te responde con voz","El dictado solo existe en el celular","El modo conversacional solo funciona en inglés"],"correct":1,"explain":"El dictado transcribe y ahí se acaba. El modo conversacional es una conversación real: puedes interrumpirla, cambiar de tema y pedirle que se explique de otra forma — ideal para pensar en voz alta mientras manejas o caminas."},{"q":"Le pediste a Copilot que memorizara algo y quieres revisar qué guardó. ¿Cuál es la forma más rápida?","opts":["Abrir un chat nuevo y esperar a ver si lo aplica","Preguntarle directamente «¿qué sabes de mí? dame el resultado en bullets»","Escribirle a soporte de Microsoft","Revisar el historial completo de conversaciones"],"correct":1,"explain":"Preguntarle directamente es la forma más rápida de auditar la memoria y detectar datos incorrectos. Para borrarlas una a una: Configuración → Personalización."},{"q":"¿Qué es un Cuaderno de Copilot?","opts":["Una carpeta de OneDrive con permisos especiales","Un espacio donde agrupas archivos y notas sobre un tema, y Copilot responde solo con esas fuentes y con citas","Un documento de Word con formato automático","Un chat que se borra al cerrarlo"],"correct":1,"explain":"Es la respuesta de Copilot a NotebookLM: acotas las fuentes a un tema y las respuestas salen aterrizadas en ellas, con citas, sin traer ruido de otros lados. Ideal para un proyecto puntual."}]
  },
  {
    n: 3,
    num: "02",
    label: "Sesión 2 · Copilot",
    title: "Copilot dentro de M365",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Copilot metido en las herramientas donde ya trabajas: Word, PowerPoint, Excel, Outlook, Teams y SharePoint.",
    conceptos: ["copilot-m365-hub","copilot-word","copilot-powerpoint","copilot-excel","copilot-outlook","copilot-teams","copilot-sharepoint"],
    proximamente: true,
    desafio: {"titulo":"El flujo Pro: de datos crudos a presentación lista","intro":"Sin salir de M365, haz el recorrido completo con datos reales de tu área.","pasos":["Abre un Excel real tuyo —KPIs, ventas, lo que tengas—, activa Copilot y cambia el modelo automático a Claude.","Pídele que analice los datos y genere 2 o 3 gráficos.","Abre PowerPoint con Copilot y pídele que arme una presentación ejecutiva basada en ese análisis.","Pule un par de slides con instrucciones en lenguaje natural.","Redacta desde Outlook, con Copilot, el correo que acompaña la presentación."],"prompt":"Analiza esta planilla y dime las 3 conclusiones más relevantes para un comité ejecutivo. Genera los gráficos que mejor las respalden y explícame en una línea por qué elegiste cada tipo de gráfico.","cierre":"Si Copilot se pierde con la planilla, revisa la estructura antes que el prompt: celdas combinadas e imágenes incrustadas son la causa habitual."},
    quiz: [{"q":"¿Qué se puede hacer con Copilot dentro de Word?","opts":["Redactar cosas desde cero","Es solo para documentos ya existentes","Te corrige la ortografía con inteligencia artificial","Todo: documentos en blanco, documentos ya existentes, resumir, reescribir y mucho más"],"correct":3,"explain":"Copilot en Word es muy versátil — puedes partir desde cero, mejorar un documento existente, resumir, reescribir y mucho más. No está limitado a corrección ortográfica ni a documentos previos."},{"q":"¿Es importante que el Excel tenga una estructura ordenada para que la IA lo trabaje bien?","opts":["No, da lo mismo mientras uses un buen modelo","Sí, es fundamental: evita celdas combinadas, imágenes incrustadas y encabezados dobles","Lo que más importa es el largo de la planilla","Conviene que tenga pocos datos para que la IA la entienda"],"correct":1,"explain":"Una planilla ordenada, sin celdas combinadas ni imágenes incrustadas, permite que la IA entienda y procese los datos correctamente. La estructura es clave, independiente del modelo o la cantidad de datos."},{"q":"¿Cómo puede ayudarte Copilot en Teams?","opts":["Generando minutas automáticas de tus reuniones","Dándote ideas durante la reunión","No existe Copilot en Teams","Solo transcribiendo partes sueltas"],"correct":0,"explain":"Copilot en Teams genera minutas automáticas al terminar la reunión, resumiendo puntos clave y compromisos. Para eso necesita que actives la transcripción al inicio."},{"q":"¿Puedo ocupar Copilot sobre la información de mi SharePoint?","opts":["No, son datos privados y no los toca","Solo si tengo poca información","Sí: Copilot se integra con SharePoint y trabaja con esa información","Sí, pero pocas veces al día porque gasta muchos tokens"],"correct":2,"explain":"Copilot se integra con SharePoint para consultar, resumir y trabajar con lo que está ahí, y no hay restricción de frecuencia ni de volumen. Esa es precisamente una de sus ventajas corporativas."},{"q":"¿Cuál es la diferencia clave entre Copilot y ChatGPT en el trabajo diario?","opts":["Copilot es más rápido escribiendo","Copilot conoce tu contexto corporativo: tus archivos, tus correos y tus reuniones","ChatGPT no sabe redactar documentos","Copilot no puede buscar en internet"],"correct":1,"explain":"El mismo Copilot vive en Word, Excel, PowerPoint, Outlook, Teams y OneDrive, y en modo Work accede a tu contexto real: tus archivos de OneDrive, tus correos de Outlook y tus reuniones de Teams. Eso es lo que un chat externo no puede hacer."}]
  },
  {
    n: 4,
    num: "03",
    label: "Sesión 3 · Copilot",
    title: "Agentes y entregables vivos",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "El salto de conversar a delegar: agentes propios, el Investigador y el Analista, y entregables vivos en HTML y artefactos.",
    conceptos: ["intro-agentes-copilot","agentes-basicos","html-con-copilot","artefactos-copilot"],
    proximamente: true,
    desafio: {"titulo":"Tu primer agente propio","intro":"Piensa en una tarea o dolor recurrente de tu día a día y construye un agente para resolverlo.","pasos":["Dale un nombre y un propósito claro, en una frase.","Redacta una buena paleta de instrucciones — apóyate en la IA para escribirlas.","Cárgale conocimiento vinculante: SharePoint, Teams, Outlook o una web.","Pruébalo con un caso real y ajusta las instrucciones según el resultado.","Muéstraselo a alguien de tu equipo: si a esa persona le sirve tal cual, el agente quedó bien."],"prompt":"Ayúdame a escribir las instrucciones de un agente de Copilot que haga lo siguiente: [TAREA]. Su usuario soy yo, [CARGO] en [ÁREA]. El input que va a recibir es [DOCUMENTOS O DATOS] y el output que necesito es [FORMATO EXACTO]. Escribe las instrucciones en secciones separadas: identidad, procedimiento, formato de salida y qué NO debe hacer.","cierre":"Antes de construirlo, chequea si el Investigador o el Analista ya resuelven tu caso."},
    quiz: [{"q":"¿Qué es un agente en Copilot?","opts":["Un chat nuevo que se borra apenas cierras la ventana","Un asistente que configuras una vez con instrucciones y conocimiento, y que después repite esa lógica automáticamente","Un programa que debes descargar e instalar aparte","Una macro de Excel que solo sirve para planillas"],"correct":1,"explain":"Un agente se configura una vez —propósito, instrucciones y conocimiento— y de ahí en adelante repite esa lógica solo. No es un chat desechable ni algo que se instale aparte."},{"q":"¿Cuál es la señal más clara de que una tarea merece un agente y no un chat?","opts":["Que sea una tarea difícil","Que lleves semanas escribiendo el mismo prompt largo con las mismas instrucciones","Que involucre muchos archivos","Que la haga más de una persona del equipo"],"correct":1,"explain":"Si repites el mismo prompt cada semana, eso ya no es una conversación: es un procedimiento. Y los procedimientos se configuran una sola vez en vez de reescribirse."},{"q":"De los dos agentes que Copilot trae de fábrica, ¿cuál usarías para preparar una reunión con inteligencia de cliente?","opts":["El Analista, porque cruza datos","El Investigador, porque navega y sintetiza fuentes internas y externas con citas","Ninguno: hay que construir uno propio","Cualquiera de los dos da lo mismo"],"correct":1,"explain":"El Investigador navega de forma autónoma y combina lo externo (web) con lo interno (correos, reuniones, archivos), entregando un informe con fuentes. El Analista es para cruzar números de archivos que ya tienes."},{"q":"Armaste un dashboard en HTML y se lo quieres mandar a alguien por correo, sin adjuntos extra ni instrucciones. ¿Qué nivel de la escalera necesitas?","opts":["Nivel 1: el HTML con el Excel aparte","Nivel 3: los datos incrustados dentro del propio archivo","Nivel 5: conectado a datos en vivo","Ninguno: un HTML no se puede compartir"],"correct":1,"explain":"En el nivel 3 los datos quedan embebidos dentro del HTML: es un único archivo autosuficiente que se abre en cualquier navegador. El nivel 1 obliga a mandar el Excel aparte, y el 5 es innecesario si los datos no cambian solos."},{"q":"¿Cuál es la diferencia entre dejar una respuesta en el chat y convertirla en artefacto?","opts":["El artefacto se ve con mejores colores","El artefacto queda como entregable editable y compartible, y sigue conectado a Copilot para seguir trabajándolo","El artefacto se guarda con contraseña","No hay diferencia real, solo cambia dónde aparece"],"correct":1,"explain":"La respuesta de chat se pierde en el scroll. El artefacto queda como documento: lo editas tú, lo comparten otros con un link, y le puedes seguir pidiendo cambios a Copilot sin volver a explicarle el contexto."}]
  },
  {
    n: 5,
    num: "04",
    label: "Sesión 4 · Claude",
    title: "Primeros pasos con Claude",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Intro a Claude, activación y configuración, tour por la herramienta, razonamiento (Sonnet/Opus) y Proyectos.",
    conceptos: ["activacion-claude","claude-chat-tour","razonamiento-claude","proyectos-claude"],
    proximamente: true,
    desafio: {"titulo":"Tu Claude, configurado y con su primer Proyecto","intro":"Deja Claude listo para trabajar contigo y arma el primer mini cerebro de uno de tus temas.","pasos":["Entra con la misma cuenta desde el celular, el navegador y la app de escritorio, y comprueba que ves las mismas conversaciones.","En Configuración → General llena el apodo, la industria y unas instrucciones globales cortas: solo tono, idioma y formato.","Crea un Proyecto para el tema que más se te repite y súbele 2 o 3 documentos clave, idealmente en MD.","Escríbele las instrucciones en Markdown con las cuatro secciones: Quién soy, Qué hacemos acá, Cómo quiero que me respondas y Reglas.","Hazle la misma pregunta difícil dentro del Proyecto y en un chat suelto, y compara las dos respuestas."],"prompt":"Ayúdame a escribir las instrucciones de un Proyecto de Claude en Markdown. Hazme entre 3 y 5 preguntas sobre mi cargo, el tema del proyecto, cómo quiero las respuestas y qué no debes hacer nunca. Con mis respuestas, entrégame el archivo con cuatro secciones: ## Quién soy, ## Qué hacemos acá, ## Cómo quiero que me respondas y ## Reglas.","cierre":"Si la respuesta dentro del Proyecto no le ganó al chat suelto, faltó contexto en las instrucciones o en el conocimiento: ajústalo y vuelve a probar."},
    quiz: [{"q":"¿Por qué conviene entrar a Claude con la misma cuenta en el celular, en el navegador y en la app de escritorio?","opts":["Porque así el plan sale más barato","Porque la página web no funciona sin la app instalada","Porque quedan sincronizadas: tu historial, tus proyectos y tus preferencias te siguen estés donde estés","Da lo mismo: cada una guarda sus propias conversaciones"],"correct":2,"explain":"Con la misma cuenta las tres puertas conversan entre ellas. Empiezas algo en el computador y lo sigues en el celular, con los mismos proyectos y la misma configuración."},{"q":"¿Qué conviene poner en las «Instrucciones para Claude» de Configuración → General?","opts":["Lo que no cambia nunca: tu tono, idioma, formato y nivel de detalle preferidos","El contexto completo de tu cliente o proyecto principal","Los documentos que usas todas las semanas","Nada: esa sección es solo para programadores"],"correct":0,"explain":"Las instrucciones globales aplican en todos tus chats. El estilo va arriba; el contexto de un cliente o un tema va en las instrucciones de cada Proyecto, para que no se cuele donde no corresponde."},{"q":"Siguiendo la regla del octanaje, ¿cómo conviene repartir los modelos si tienes el plan Pro?","opts":["Opus siempre, porque es el mejor","Haiku para todo, para no gastar límites","Alternar al azar entre los tres","Sonnet el 97% del tiempo y Opus solo para el 3% de tareas que de verdad lo piden"],"correct":3,"explain":"Sonnet rinde igual para casi todo lo del día a día. Opus es el máximo octanaje: más profundo, pero consume tus límites mucho más rápido."},{"q":"Una respuesta de Claude te salió superficial en una tarea compleja. ¿Qué pruebas antes de reescribir todo el prompt?","opts":["Abrir una cuenta nueva","Subir el modelo o el esfuerzo, o activar el Pensamiento","Escribir el prompt en inglés","Pedirle lo mismo en mayúsculas"],"correct":1,"explain":"El modelo, el esfuerzo y el Pensamiento son los tres controles que más cambian el resultado y los que casi nadie toca. Muchas veces el problema no era cómo pediste, sino con qué."},{"q":"¿Qué convierte un Proyecto de Claude en un «mini cerebro» de un tema?","opts":["Ponerle un nombre largo y descriptivo","Tener un solo súper proyecto con todos tus temas","Cargarle instrucciones en MD y conocimiento, y hablar de ese tema siempre desde dentro del proyecto","Borrar los chats viejos cada semana"],"correct":2,"explain":"Las instrucciones y los documentos dejan el contexto cargado una vez; el hábito de conversar siempre desde dentro del proyecto es lo que lo hace acumular memoria. Mejor varios mini proyectos que uno gigante."}]
  },
  {
    n: 6,
    num: "05",
    label: "Sesión 5 · Claude",
    title: "Claude conectado: Office, MCP y Skills",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Claude en el Office, conectores MCP, Skills personalizadas y genéricas, y HTMLs hechos con Claude.",
    conceptos: ["claude-en-office","mcp-conectores","skills-claude","html-avanzado"],
    proximamente: true,
    desafio: {"titulo":"Claude trabajando donde ya trabajas","intro":"Saca a Claude del chat: mételo en tus documentos, conéctalo a tus herramientas y enséñale un procedimiento.","pasos":["Instala el complemento en Excel, Word o PowerPoint y pídele que audite una planilla o un documento real tuyo buscando errores — no que lo «analice».","Activa un conector de una herramienta que ya uses —Drive, correo o calendario—. Deja la lectura en «permitir siempre» y la escritura en «preguntar cada vez».","Pídele una tarea que cruce dos fuentes sin que copies nada, por ejemplo tu calendario de la semana con los documentos de esas reuniones.","Toma la tarea que más repites y pídele que la deje como Skill con tu formato de salida. Pruébala dos veces con casos distintos.","Con una planilla tuya, pídele un panel en HTML con los datos incrustados (nivel 3) y mándaselo a alguien de tu equipo."],"prompt":"Quiero convertir este procedimiento en una Skill reutilizable. La tarea es [DESCRIBE LA TAREA]. Paso a paso, la hago así: [PASOS]. El resultado siempre tiene este formato: [FORMATO]. Hazme las preguntas que necesites y después arma la Skill completa, lista para instalar.","cierre":"Una Skill buena es tu mejor versión de la tarea, escrita una sola vez: si la segunda prueba salió distinta a la primera, afina las instrucciones."},
    quiz: [{"q":"¿Qué es cierto sobre los complementos de Claude para Excel, Word y PowerPoint?","opts":["Vienen incluidos gratis en Microsoft 365","Son oficiales, los instalas tú mismo y requieren un plan de pago de Claude","Solo funcionan en Excel","Hay que pedirle a Microsoft que los active"],"correct":1,"explain":"Son complementos oficiales de Anthropic que instalas siguiendo el camino guiado. Ojo: solo están disponibles en la versión de pago de Claude."},{"q":"¿Qué necesitas para cruzar el puente de un conector, por ejemplo hacia tu Drive?","opts":["Tener cuenta en la herramienta del otro lado y, si tu Claude es corporativo, que TI lo habilite","Saber programar","Instalar un programa aparte en tu computador","Pagar una licencia extra por cada conector"],"correct":0,"explain":"Los conectores vienen prehechos: no se programa ni se instala nada. El requisito es tener cuenta al otro lado; en cuentas Team o Enterprise, es probable que TI tenga que autorizarlos."},{"q":"¿Cuál es la configuración de permisos recomendada al conectar una herramienta?","opts":["Todo en «permitir siempre», para que no pregunte","Todo bloqueado, por seguridad","Lectura en «permitir siempre» y escritura o eliminación en «preguntar cada vez»","Da lo mismo, Claude ignora los permisos"],"correct":2,"explain":"Leer no rompe nada, así que puede hacerlo sin preguntar. Escribir o borrar sí tiene consecuencias: ahí conviene que te pida confirmación cada vez."},{"q":"¿Cuál es el mejor candidato para convertirse en una Skill?","opts":["Una pregunta que te surgió una sola vez","Una búsqueda rápida en internet","Una conversación casual","Una tarea que repites seguido y que hoy te sale distinta cada vez"],"correct":3,"explain":"Una Skill empaqueta tu procedimiento —instrucciones, formato y referencias— para que el resultado salga siempre igual de bien. Estandariza y sube el piso de calidad."},{"q":"Quieres un dashboard que se actualice solo cuando cambia tu Google Sheets y que puedas abrir desde el celular. ¿Qué nivel de la escalera del HTML necesitas?","opts":["Nivel 1: HTML local con el Excel aparte","Nivel 3: datos incrustados en el archivo","Nivel 5: publicado en hosting y conectado a datos vivos","Ninguno: eso no se puede hacer con HTML"],"correct":2,"explain":"El nivel 5 está publicado con una URL (se abre desde cualquier dispositivo) y conectado en tiempo real a fuentes como Google Sheets o Supabase. Los niveles 1 a 3 son archivos que no se actualizan solos."}]
  },
  {
    n: 7,
    num: "06",
    label: "Sesión 6 · Claude",
    title: "Artefactos y Cowork",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Artefactos en Claude, intro a Cowork y sus tipos de acciones —reactivas, programadas y en vivo—, y casos reales del agente trabajando sobre tus archivos.",
    conceptos: ["artefactos-claude","intro-cowork","ejemplos-cowork"],
    proximamente: true,
    desafio: {"titulo":"De pedir a delegar","intro":"Haz que Claude te entregue algo que funciona y después déjalo actuar sobre tus archivos.","pasos":["Sube una planilla tuya y pídele un artefacto: un tablero visual con al menos un filtro y un botón para imprimir.","Itéralo dos veces con cambios concretos —colores, otra vista, un dato más— y descárgalo como HTML.","Abre Cowork desde la app de escritorio y préstale como sandbox una COPIA de una carpeta con varios archivos.","Pídele una tarea real: ordenar y renombrar, convertir Word a PDF en una subcarpeta, o consolidar planillas en un reporte.","Revisa lo que hizo en la carpeta y anota cuánto tiempo te habría tomado a mano."],"prompt":"En esta carpeta hay [QUÉ ARCHIVOS]. Quiero que [TAREA CONCRETA: ordenar, renombrar, convertir o consolidar]. Deja el resultado en una subcarpeta nueva llamada [NOMBRE] y no modifiques los archivos originales. Al terminar, dime qué hiciste archivo por archivo.","cierre":"Partir con una copia no es desconfianza: es como se le toma la mano a un practicante nuevo."},
    quiz: [{"q":"¿Qué diferencia a un artefacto de una respuesta normal del chat?","opts":["Es un entregable vivo: funciona, lo iteras, lo descargas como HTML o lo compartes con un link","Solo cambian los colores","Que se guarda con contraseña","No hay diferencia real"],"correct":0,"explain":"La respuesta de chat se lee y se pierde en el scroll. El artefacto es una mini app o documento que funciona en la vista previa, se sigue mejorando con mensajes y se comparte."},{"q":"¿Desde dónde funciona el Cowork que actúa sobre los archivos de tu computador?","opts":["Desde claude.ai en cualquier navegador","Desde la app del celular","Desde cualquier lado, da lo mismo","Solo desde la app de escritorio de Claude"],"correct":3,"explain":"El Cowork que se conecta con tu computador funciona única y exclusivamente en la app de escritorio. El botón «Cowork» de la página web es otra función."},{"q":"¿Qué es el sandbox en Cowork?","opts":["Un juego para aprender a usar Claude","La carpeta que tú le prestas: ahí puede leer, crear y ordenar archivos, y fuera de ella no existe nada para él","Una copia de seguridad automática de todo tu computador","El historial de tus chats"],"correct":1,"explain":"No le das acceso a todo tu computador: le prestas islas, que en la práctica son carpetas. Tú eliges qué isla le abres."},{"q":"¿Cuáles son los tres tipos de acciones de Cowork?","opts":["Fáciles, medias y difíciles","Texto, imagen y video","Reactivas, programadas e interactivas en vivo","Word, Excel y PowerPoint"],"correct":2,"explain":"Reactivas: responde a lo que le pides. Programadas: tareas agendadas que corren solas. Interactivas: trabaja contigo en tiempo real."},{"q":"Es tu primera vez usando Cowork con archivos importantes. ¿Qué conviene hacer?","opts":["Darle acceso a todo el disco para que trabaje más rápido","Pedirle la tarea más crítica de una vez","Probar con una copia de los archivos y partir con tareas acotadas de bajo riesgo","Desactivar los permisos del sistema"],"correct":2,"explain":"Piensa en Cowork como un practicante digital: tareas acotadas primero, sobre una copia, y subes la complejidad a medida que le tomas confianza."}]
  },
  {
    n: 8,
    num: "07",
    label: "Sesión 7 · Multimedia",
    title: "ChatGPT multimedia",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Intro a ChatGPT y sus complementos (GPTs, apps y proyectos), imágenes y videos pro, logos con Ideogram, infografías con Napkin y música con Gemini.",
    conceptos: ["intro-chatgpt","imagenes-pro","videos-con-ia","logos-ideogram","napkin-infografias","musica-gemini"],
    proximamente: true,
    desafio: {"titulo":"Una mini campaña hecha con IA","intro":"Elige un producto, servicio o iniciativa real de tu área y arma sus piezas con las herramientas que vimos.","pasos":["Saca una foto del producto (o usa una que ya tengas) y genera 2 imágenes publicitarias con distinto fondo y estilo.","Anima una de esas imágenes con Image to Video, usando un prompt en inglés que te haya ayudado a escribir Claude o ChatGPT.","Crea en Ideogram, modo Design, un logo o un mockup con el nombre bien escrito.","Escribe con IA un texto breve sobre la iniciativa y conviértelo en infografía con Napkin.","Cierra con un jingle corto en Gemini que mencione el nombre."],"prompt":"Tengo esta idea para un video: [TU IDEA EN ESPAÑOL]. Conviértela en un prompt cinematográfico detallado en inglés: tipo de plano, movimiento de cámara, iluminación, ambiente y estilo visual.","cierre":"Ojo con personas y marcas reales: nada de deepfakes ni logos ajenos. Lo que publiques sigue siendo tu responsabilidad."},
    quiz: [{"q":"Quieres una foto publicitaria de un producto real. ¿Qué hace la mayor diferencia en el resultado?","opts":["Subir la foto del producto como referencia y describir superficie, fondo, estilo y uso final","Escribir solo el nombre del producto","Pedirla en mayúsculas","Usar siempre la primera imagen que salga"],"correct":0,"explain":"La foto de referencia mantiene tu producto real, y el prompt detallado define todo lo demás. Después se itera en la misma conversación: otro fondo, otro color, personas."},{"q":"¿En qué idioma conviene escribir los prompts para generar video?","opts":["Da lo mismo el idioma","Siempre en español, para que entienda mejor","En inglés, porque los modelos de video rinden notablemente mejor","En el idioma del país donde se va a publicar"],"correct":2,"explain":"Los modelos de video se entrenaron principalmente en inglés. El truco: escribe tu idea en español y pídele a Claude o ChatGPT que la convierta en un prompt cinematográfico en inglés."},{"q":"¿Por qué Ideogram es la herramienta recomendada para logos y mockups?","opts":["Porque es la única gratuita","Porque genera videos","Porque no necesita prompt","Porque en modo Design escribe el nombre de tu marca correctamente dentro de la imagen"],"correct":3,"explain":"La mayoría de los generadores deforman el texto. Ideogram en modo Design es el más confiable para que la marca salga bien escrita, clave para branding y packaging."},{"q":"¿Cuál es el flujo recomendado para hacer una infografía con Napkin?","opts":["Dibujarla a mano y subirla","Generar el texto con Claude o ChatGPT y pegarlo en Napkin para convertirlo en visual","Pedirle a Napkin que invente el contenido desde cero","Exportarla desde Excel"],"correct":1,"explain":"Napkin convierte texto en visual con el botón del rayo. Si el texto ya viene bien escrito por un LLM, la infografía sale mucho mejor: una combinación poderosa para comunicaciones ejecutivas."},{"q":"¿Dónde creas música original en Gemini?","opts":["En la configuración de tu cuenta de Google","Solo en la app de YouTube","Botón «+» → «Más herramientas» → «Crear música»","No se puede: hay que pagar Suno"],"correct":2,"explain":"Gemini genera canciones con el modelo Lyria 3, gratis con tu Gmail: eliges un género o describes la pista, le das la letra o se la pides, y descargas el resultado sin problemas de derechos."}]
  },
  {
    n: 9,
    num: "08",
    label: "Sesión 8 · Cierre",
    title: "Alucinaciones, repaso y cierre",
    dur: "2 hrs · Presencial · Hands-On",
    resumen: "Control de alucinaciones, repaso final de todo el programa y cierre.",
    conceptos: ["control-alucinaciones","repaso-newell","cierre-newell"],
    proximamente: true,
    desafio: {"titulo":"Tu plan de 30 días","intro":"El programa termina hoy; el hábito empieza el lunes. Convierte lo aprendido en un compromiso con fecha.","pasos":["Semana 1: elige UNA tarea recurrente tuya y hazla con IA todos los días. Una sola.","Semana 2: arma el Cuaderno de Copilot o el Proyecto de Claude del tema en el que más trabajas.","Semana 3: convierte la tarea de la semana 1 en un agente de Copilot o en una Skill de Claude.","Semana 4: muéstrale a alguien de tu equipo lo que armaste.","Agenda ahora mismo 20 minutos a la semana en tu calendario llamados «probar algo con IA»."],"prompt":"Soy [CARGO] en [ÁREA]. Estas son mis tareas más repetitivas: [LISTA]. Ayúdame a elegir la que más tiempo me ahorraría con IA y arma un plan de 4 semanas: qué hago cada semana, con qué herramienta (Copilot o Claude) y cómo sé que funcionó.","cierre":"Y antes de mandar cualquier cosa hecha con IA: verifica cifras, nombres y fechas. Tu criterio sigue siendo tuyo."},
    quiz: [{"q":"¿Se pueden eliminar por completo las alucinaciones de la IA?","opts":["Sí, usando siempre el modelo más caro","No al 100%: se reducen con contexto, documentos reales, prompts defensivos, razonamiento y revisión humana","Sí, escribiendo los prompts en inglés","Solo Copilot alucina; Claude no"],"correct":1,"explain":"Todos los modelos pueden inventar con total seguridad. No hay forma de eliminarlo, pero sí de reducirlo mucho — y la revisión humana de lo importante no se negocia."},{"q":"¿Cuál de estos es un buen «prompt defensivo»?","opts":["«Respóndeme rápido»","«No te equivoques»","«Sé creativo»","«Responde solo si tienes al menos 90% de seguridad. Si no estás seguro, dímelo claramente en vez de inventar»"],"correct":3,"explain":"Darle permiso explícito para decir «no sé» cambia el resultado: deja de rellenar con lo que suena bien. Puedes dejarlo fijo en las instrucciones de un Proyecto."},{"q":"Tienes una tarea que haces igual todas las semanas. Según el mapa del programa, ¿qué te conviene armar?","opts":["Un agente en Copilot o una Skill en Claude","Un chat nuevo cada semana con el mismo prompt","Una imagen con Ideogram","Nada: las tareas repetitivas no se pueden automatizar"],"correct":0,"explain":"Si repites el mismo procedimiento, configúralo una vez: un agente en Copilot o una Skill en Claude lo ejecutan igual cada vez, sin reescribir el prompt."},{"q":"Necesitas que la IA ordene, renombre y convierta decenas de archivos de una carpeta de tu computador. ¿Qué herramienta usas?","opts":["El chat de Copilot en modo Web","Cowork, desde la app de escritorio de Claude","Napkin","Un Cuaderno de Copilot"],"correct":1,"explain":"Cowork es el agente que actúa sobre las carpetas que le prestas: ejecuta los cambios directamente en vez de darte instrucciones para que los hagas tú."},{"q":"Si te llevas una sola idea del programa, ¿cuál debería ser?","opts":["Que Opus siempre es mejor que Sonnet","Que hay que esperar a que la IA madure","Que el resultado depende mucho más del contexto que le das que de la herramienta que elijas","Que Copilot y Claude son lo mismo"],"correct":2,"explain":"La misma pregunta con tres líneas de contexto adicional cambia por completo lo que recibes. Por eso el hábito más rentable es dar contexto, iterar y verificar."}]
  }
];

// Una habilidad por concepto: marcar el check la desbloquea.
// Una rampa por sesión, con al menos tantos colores como conceptos tenga.
// Una rampa por sesión. Van con colores de sobra a propósito: agregarle un
// concepto a una sesión no debe dejar una habilidad sin color.
const COLORES = {
  "1": ["#334155", "#475569", "#64748B", "#7C8CA1", "#94A3B8", "#A9B4C2", "#BCC5D0"],
  "2": ["#08508F", "#0B78D0", "#2E9AE3", "#4FA8F5", "#8ACAF0", "#A6D8F5", "#C2E5F8"],
  "3": ["#0F766E", "#0D9488", "#14B8A6", "#2DD4BF", "#5EEAD4", "#7FEDDD", "#99F6E4"],
  "4": ["#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#C34AC6", "#D8B4FE"],
  "5": ["#9F1239", "#BE123C", "#E11D48", "#F43F5E", "#FB7185", "#FDA4AF", "#FECDD3"],
  "6": ["#3730A3", "#4338CA", "#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"],
  "7": ["#155E75", "#0E7490", "#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#A5F3FC"],
  "8": ["#065F46", "#047857", "#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"],
  "9": ["#86198F", "#A21CAF", "#C026D3", "#D946EF", "#E879F9", "#F0ABFC", "#F5D0FE"]
};
const COLOR_BASE = "#64748B";   // por si una sesión nueva todavía no tiene rampa
const SKILLS = TALLERES.flatMap(t =>
  t.conceptos.map((id, i) => ({
    id, taller: t.n, color: (COLORES[t.n] || [])[i] || COLOR_BASE
  }))
);

const SUPABASE_URL = 'https://adtyiqpcddxjnxfxrkod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdHlpcXBjZGR4am54Znhya29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODM2NjQsImV4cCI6MjA4ODU1OTY2NH0.hTKgoum0LEmrFPj7LE7VbHTMNUocxovJqmkfOsTNubA';
// El taller 1 es transversal: el mismo contenido sirve para el programa de
// Copilot, el de Gemini y el de Claude. En /taller01-general se sirve suelto,
// sin envoltorio de programa y con su propio avance, para poder repartirlo por
// QR al cierre de cualquier taller.
// El portal Newell no tiene taller suelto: esto queda en false siempre.
// Se conserva para no divergir del portal de Copilot, del que sale este archivo.
const SUELTO = false;

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
const VERSION = 'Octubre 21';

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
  // El taller suelto se reparte por QR al cierre de cualquier taller: se entra
  // directo, sin pedir datos. El avance queda solo en el navegador, que para un
  // material de consulta es suficiente. En los programas la identidad sí se pide,
  // porque ahí el avance se reporta a la empresa.
  if (SUELTO) { /* sin gate */ }
  else if (!user) openGate(false);
  else {
    // Esperamos la recuperación (con tope de 3s) para que la primera pantalla
    // ya se dibuje con el avance real, venga del navegador o del servidor.
    await Promise.race([recuperarProgreso(), new Promise(r => setTimeout(r, 3000))]);
    syncUser().then(resyncAll);
  }
  await cargarBloques(ids);
}

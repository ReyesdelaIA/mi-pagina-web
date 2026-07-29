/* ============================================================================
   Diagnóstico IA · Reyes IA — diccionarios de etiquetas (fuente única)
   ----------------------------------------------------------------------------
   Lo usan el mail de notificación (require en api/diagnostico-notify.js),
   el panel en vivo y el dashboard admin (<script src="/diagnostico/labels.js">).
   Si cambias una opción en form.js, actualízala también acá.

   Los diccionarios marcados LEGACY corresponden a preguntas que ya salieron del
   formulario; se mantienen para leer las respuestas históricas (mayo–julio 2026).
   ========================================================================== */
(function (root, factory) {
  const L = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = L;
  else root.DIAG_LABELS = L;
})(typeof self !== 'undefined' ? self : this, function () {
  return {
    MAIL: {
      outlook: 'Outlook / Office 365', gmail: 'Gmail / Google Workspace',
      mix: 'Mix de plataformas', otro: 'Otro',
    },
    REPO: {
      sharepoint: 'SharePoint / OneDrive', drive: 'Google Drive',
      dropbox: 'Dropbox u otro', mix: 'Mix de plataformas', no_seguro: 'No estoy seguro',
    },
    NIVEL: {
      cero: 'Foja cero, casi no la usa',
      basico: 'La usa de manera básica',
      frecuente: 'La usa casi todos los días',
      avanzado: 'Muy capacitado, casi experto',
    },
    NIVEL_CORTO: { cero: 'Cero', basico: 'Básico', frecuente: 'Frecuente', avanzado: 'Avanzado' },
    USOS: {
      redactar: 'Redactar y mejorar textos',
      resumir: 'Resumir documentos largos',
      investigar: 'Investigar y entender temas',
      buscar: 'Buscar en internet',
      analizar_archivos: 'Adjuntar archivos y analizarlos',
      datos: 'Analizar datos y planillas',
      presentaciones: 'Armar presentaciones',
      correos: 'Escribir o responder correos',
      imagenes: 'Crear imágenes o contenido visual',
      ideas: 'Lluvia de ideas',
      programar: 'Programar o automatizar',
      ninguna: 'Todavía no la usa',
    },
    TOOLS: {
      chatgpt: 'ChatGPT', copilot: 'Copilot', claude: 'Claude', gemini: 'Gemini',
      perplexity: 'Perplexity', notebooklm: 'NotebookLM', gamma: 'Gamma / Presentaciones',
      granola: 'Granola / Notas de reunión', imagen: 'IA de imagen o video',
      ninguna: 'Ninguna aún',
    },
    CAPACITACION: {
      si: 'Sí, le interesa mucho',
      si_pero: 'Le interesa, pero tiene poco tiempo',
      no_se: 'No está seguro todavía',
      no: 'No, por ahora no',
    },
    APRENDER: {
      redactar: 'Redactar y comunicar mejor',
      investigar: 'Investigar y sintetizar',
      datos: 'Analizar datos y planillas',
      presentaciones: 'Armar presentaciones',
      imagenes: 'Imágenes, video y multimedia',
      reuniones: 'Sacarle partido a las reuniones',
      prompts: 'Escribir mejores prompts',
      automatizar: 'Automatizar tareas repetitivas',
      agentes: 'Crear agentes',
      programar: 'Programar / vibe coding',
      todo: 'Todo lo que se pueda',
    },
    TEMORES: {
      ninguno: 'Ningún temor',
      confidencialidad: 'Confidencialidad de la información',
      alucinaciones: 'Que se equivoque o invente datos',
      calidad: 'Que el resultado no tenga el nivel necesario',
      empleo: 'Que reemplace puestos de trabajo',
      dependencia: 'Volverse dependiente, perder criterio',
      tiempo: 'No tener tiempo para aprender',
      etica: 'Temas éticos, legales o de propiedad intelectual',
    },
    TRABAJO: {
      finanzas: 'Finanzas', rrhh: 'Recursos Humanos', ventas: 'Ventas',
      operaciones: 'Operaciones', marketing: 'Marketing',
      programacion_ti: 'Programación & TI', gerencia_general: 'Gerencia General',
      otra: 'Otra',
      // Áreas propias de clones de cliente (prefijo = slug del cliente)
      ccu_compras_directas: 'Compras Directas',
      ccu_comercio_exterior: 'Comercio Exterior',
      ccu_control_gestion: 'Control de Gestión y Transformación Digital',
      ccu_compras_servicios: 'Compras de Servicios',
      ccu_compras_industriales: 'Compras Industriales y Marketing',
      ccu_gerencia_abastecimiento: 'Gerente de Abastecimiento',
    },

    /* ── LEGACY: preguntas retiradas, solo para leer el histórico ─────────── */
    REUNIONES: { teams: 'Microsoft Teams', zoom: 'Zoom', meet: 'Google Meet', mix: 'Mix' },
    RESISTENCIAS: { no: 'Apertura total', algo: 'Algo de escepticismo', si: 'Le cuesta engancharse', no_se: 'No lo sabe aún' },
    AREAS_INTERES: {
      finanzas: 'Finanzas', marketing: 'Marketing', operaciones: 'Operaciones',
      comercial: 'Comercial', rrhh: 'RRHH', ti: 'TI / Tecnología', legal: 'Legal',
      todas: 'Todas las áreas', otra: 'Otra',
    },
  };
});

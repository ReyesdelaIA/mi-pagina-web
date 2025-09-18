# Optimización de créditos Netlify

## Estrategias para minimizar el uso de créditos:

### 1. **Builds y Deploys**
- Solo hacer commits cuando tengas cambios significativos
- Agrupar múltiples cambios en un solo commit
- Usar `[skip ci]` en commits menores (si es necesario)

### 2. **Desarrollo local**
- Probar cambios localmente antes de hacer push
- Usar `git add . && git commit -m "mensaje" && git push` solo cuando esté listo

### 3. **Monitoreo**
- Revisar el dashboard de Netlify regularmente
- Configurar alertas de uso de créditos

### 4. **Optimización del sitio**
- Comprimir imágenes
- Minificar CSS/JS
- Usar CDN para assets estáticos

### 5. **Backend (Railway)**
- Railway tiene su propio sistema de créditos
- No afecta los créditos de Netlify
- El backend puede seguir funcionando independientemente

## Comandos optimizados:
```bash
# Solo cuando tengas cambios listos para producción
git add .
git commit -m "Descripción clara del cambio"
git push origin main
```

## Recomendación:
- Hacer commits solo cuando tengas una funcionalidad completa
- Probar localmente antes de hacer push
- Monitorear el uso en Netlify dashboard

# 📰 Sistema de Noticias IA - Intranet ReyesIA

## ✅ **Estado Actual**
El sistema de noticias IA está **FUNCIONANDO** y listo para usar.

## 🎯 **Funcionalidades Implementadas**

### 1. **Dashboard con Noticias**
- ✅ Sección "Noticias de Inteligencia Artificial" en el dashboard
- ✅ Diseño responsive con tarjetas elegantes
- ✅ Enlaces directos a las noticias originales
- ✅ Información de fuente y fecha

### 2. **API de Noticias**
- ✅ Endpoint: `GET /api/news` (requiere autenticación)
- ✅ Noticias de ejemplo configuradas
- ✅ Endpoint admin: `POST /api/admin/refresh-news` para actualizar

### 3. **Scraper de Noticias**
- ✅ Scraper simplificado con axios + cheerio
- ✅ Fuentes: TechCrunch AI, MIT Technology Review
- ✅ Fallback a noticias de ejemplo si falla el scraping
- ✅ Traducción automática al español

## 🚀 **Cómo Usar**

### **Para Clientes:**
1. Iniciar sesión en la intranet
2. Ver la sección "Noticias de Inteligencia Artificial" en el dashboard
3. Hacer clic en "Leer más" para abrir la noticia original

### **Para Admin (Felipe):**
1. Iniciar sesión como admin (felipe@reyesia.com)
2. Ir al panel de administración
3. Usar el botón "Actualizar Noticias" para refrescar el contenido

## 🔧 **Configuración de Automatización**

### **Opción 1: Ejecución Manual**
```bash
cd /Users/felipereyesp/Desktop/IA/Cursor
node run-news-update.js
```

### **Opción 2: Cron Job (Recomendado)**
Agregar al crontab para ejecutar cada 6 horas:
```bash
crontab -e
```
Agregar esta línea:
```
0 */6 * * * cd /Users/felipereyesp/Desktop/IA/Cursor && node run-news-update.js >> /tmp/news-update.log 2>&1
```

### **Opción 3: PM2 (Para producción)**
```bash
npm install -g pm2
pm2 start run-news-update.js --name "news-updater" --cron "0 */6 * * *"
pm2 save
pm2 startup
```

## 📁 **Archivos Principales**

- `public/dashboard.html` - Dashboard con sección de noticias
- `server.js` - API endpoints para noticias
- `news-scraper-simple.js` - Scraper de noticias
- `run-news-update.js` - Script de automatización

## 🔄 **Próximos Pasos**

1. **Configurar automatización** con cron o PM2
2. **Crear tabla en Supabase** para noticias reales
3. **Configurar notificaciones** cuando se actualicen las noticias
4. **Agregar más fuentes** de noticias IA

## 🐛 **Solución de Problemas**

### **Las noticias no se muestran:**
1. Verificar que el servidor esté ejecutándose
2. Comprobar la consola del navegador para errores
3. Verificar que el token de autenticación sea válido

### **El scraper falla:**
1. Verificar conexión a internet
2. Comprobar que las dependencias estén instaladas
3. Revisar los logs en `/tmp/news-update.log`

## 📞 **Contacto**
Para soporte técnico, contactar a Felipe Reyes.

---
*Última actualización: $(date)*

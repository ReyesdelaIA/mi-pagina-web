# Intranet ReyesIA

Sistema de intranet para clientes autorizados de ReyesIA con gestión de archivos PDF y sistema de autenticación.

## 🚀 Características

- **Sistema de Login**: Autenticación segura con JWT
- **Panel de Administración**: Gestión de usuarios y archivos
- **Descarga de Archivos**: Acceso exclusivo a PDFs y manuales
- **Base de Datos**: SQLite para almacenamiento local
- **Subida de Archivos**: Drag & drop para PDFs

## 📁 Estructura del Proyecto

```
intranet/
├── login.html          # Página de login
├── dashboard.html      # Panel del usuario
├── admin.html          # Panel de administración
├── server.js           # Servidor Node.js
├── package.json        # Dependencias
├── uploads/            # Archivos PDF subidos
└── intranet.db         # Base de datos SQLite
```

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   cd intranet
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   export JWT_SECRET="tu-secreto-super-seguro"
   export PORT=3000
   ```

3. **Ejecutar el servidor:**
   ```bash
   npm start
   ```

## 👤 Usuarios por Defecto

- **Admin**: `felipe@reyesia.com` / `admin123`
- **Estado**: Aprobado automáticamente

## 🔧 Configuración del Subdominio

1. **En GoDaddy DNS:**
   - Tipo: CNAME
   - Nombre: intranet
   - Valor: `tu-servidor-de-backend.com`

2. **En el servidor de backend:**
   - Configurar dominio personalizado
   - SSL/HTTPS automático

## 📋 Funcionalidades

### Para Usuarios Autorizados:
- ✅ Login con email y contraseña
- ✅ Descarga de archivos PDF
- ✅ Vista de archivos disponibles
- ✅ Sesión persistente (24h)

### Para Administrador:
- ✅ Gestión de usuarios (aprobar/rechazar)
- ✅ Subida de archivos PDF
- ✅ Eliminación de archivos
- ✅ Vista de todos los usuarios

## 🔒 Seguridad

- **JWT Tokens**: Autenticación segura
- **Bcrypt**: Contraseñas encriptadas
- **Middleware**: Verificación de permisos
- **Validación**: Solo archivos PDF permitidos

## 🚀 Deploy

### Opción 1: Railway
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático

### Opción 2: Render
1. Conectar repositorio GitHub
2. Configurar build command: `npm install`
3. Configurar start command: `npm start`

### Opción 3: Heroku
1. Crear app en Heroku
2. Conectar repositorio
3. Configurar variables de entorno
4. Deploy

## 📝 Notas Importantes

- **Cambiar contraseña admin** en producción
- **Configurar JWT_SECRET** seguro
- **Backup de base de datos** regularmente
- **Monitorear logs** del servidor

## 🔄 Actualizaciones Futuras

- [ ] Sistema de registro automático
- [ ] Notificaciones por email
- [ ] Categorías de archivos
- [ ] Búsqueda de archivos
- [ ] Estadísticas de descarga
- [ ] Videos y otros formatos

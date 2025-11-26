# Configuración de Notificaciones por Email

## 📧 Sistema de Notificaciones

El sistema envía automáticamente un email a `felipe@reyesia.com` cada vez que un nuevo usuario se registra en la intranet.

## 🔧 Configuración con Resend

### Paso 1: Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita (100 emails/día gratis)
3. Verifica tu dominio o usa el dominio de prueba

### Paso 2: Obtener API Key

1. En el dashboard de Resend, ve a "API Keys"
2. Crea una nueva API Key
3. Copia la clave (empieza con `re_...`)

### Paso 3: Configurar en Netlify

1. Ve a tu proyecto en Netlify
2. Ve a **Site settings** → **Environment variables**
3. Agrega las siguientes variables:

```
RESEND_API_KEY=re_tu_api_key_aqui
SITE_URL=https://reyesia.com
```

### Paso 4: Instalar dependencias

Si estás desarrollando localmente, ejecuta:

```bash
cd netlify
npm install
```

### Paso 5: Verificar dominio (Opcional pero recomendado)

Para usar `noreply@reyesia.com` como remitente:

1. En Resend, ve a "Domains"
2. Agrega tu dominio `reyesia.com`
3. Configura los registros DNS que Resend te proporciona
4. Espera a que se verifique (puede tomar unos minutos)

**Nota:** Si no verificas el dominio, puedes usar el dominio de prueba de Resend temporalmente, pero los emails pueden ir a spam.

## 📨 Formato del Email

El email incluye:
- Nombre del nuevo usuario
- Email del nuevo usuario
- Teléfono
- Empresa (si la proporcionó)
- Botón directo al panel de administración

## 🧪 Probar el Sistema

1. Registra un nuevo usuario desde `register.html`
2. Deberías recibir un email en `felipe@reyesia.com` en unos segundos
3. El email incluye un enlace directo al panel de admin

## ⚠️ Troubleshooting

### No recibo emails

1. Verifica que `RESEND_API_KEY` esté configurada en Netlify
2. Revisa los logs de Netlify Functions para ver errores
3. Verifica que el dominio esté verificado en Resend
4. Revisa la carpeta de spam

### Error: "API key is invalid"

- Verifica que copiaste la API key completa
- Asegúrate de que no haya espacios al inicio o final
- Crea una nueva API key si es necesario

### Los emails van a spam

- Verifica tu dominio en Resend
- Configura SPF y DKIM correctamente
- Usa un dominio verificado como remitente

## 🔄 Alternativas

Si prefieres otro servicio de email:

- **SendGrid**: Similar a Resend, más robusto pero más complejo
- **Mailgun**: Buena opción para producción
- **AWS SES**: Muy económico pero más complejo de configurar

Para cambiar de servicio, modifica la función `sendNewUserNotification` en `netlify/functions/server.js`.


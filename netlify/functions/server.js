const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');

// Configuración de Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET || 'reyesia-production-jwt-secret-2024';

// Configuración de Resend para emails
const resend = new Resend(process.env.RESEND_API_KEY);

// Función para enviar notificación de nuevo usuario
async function sendNewUserNotification(userData) {
    try {
        const adminEmail = 'felipe@reyesia.com';
        const siteUrl = process.env.SITE_URL || 'https://reyesia.com';
        const adminUrl = `${siteUrl}/admin`;

        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .user-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
                    .user-info p { margin: 10px 0; }
                    .user-info strong { color: #667eea; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .button:hover { background: #5568d3; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔔 Nuevo Usuario Registrado</h1>
                        <p>Hay un nuevo usuario esperando aprobación</p>
                    </div>
                    <div class="content">
                        <p>Hola Felipe,</p>
                        <p>Se ha registrado un nuevo usuario en la intranet de ReyesIA que requiere tu aprobación:</p>
                        
                        <div class="user-info">
                            <p><strong>Nombre:</strong> ${userData.nombre}</p>
                            <p><strong>Email:</strong> ${userData.email}</p>
                            <p><strong>Teléfono:</strong> ${userData.telefono}</p>
                            ${userData.empresa ? `<p><strong>Empresa:</strong> ${userData.empresa}</p>` : ''}
                            <p><strong>Estado:</strong> <span style="color: #ff9800; font-weight: bold;">Pendiente de aprobación</span></p>
                        </div>
                        
                        <p style="text-align: center;">
                            <a href="${adminUrl}" class="button">Ir al Panel de Administración</a>
                        </p>
                        
                        <p>Recuerda que el usuario no podrá acceder a la intranet hasta que apruebes su solicitud.</p>
                    </div>
                    <div class="footer">
                        <p>Este es un email automático del sistema de ReyesIA</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailText = `
Nuevo Usuario Registrado

Hola Felipe,

Se ha registrado un nuevo usuario en la intranet de ReyesIA que requiere tu aprobación:

Nombre: ${userData.nombre}
Email: ${userData.email}
Teléfono: ${userData.telefono}
${userData.empresa ? `Empresa: ${userData.empresa}` : ''}
Estado: Pendiente de aprobación

Accede al panel de administración: ${adminUrl}

Recuerda que el usuario no podrá acceder a la intranet hasta que apruebes su solicitud.

---
Este es un email automático del sistema de ReyesIA
        `;

        // Solo enviar email si hay API key configurada
        if (process.env.RESEND_API_KEY) {
            console.log('RESEND_API_KEY encontrada, intentando enviar email...');
            // Usar dominio verificado o el dominio de prueba de Resend
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
            
            try {
                const result = await resend.emails.send({
                    from: `ReyesIA <${fromEmail}>`,
                    to: adminEmail,
                    subject: `🔔 Nuevo usuario registrado: ${userData.nombre}`,
                    html: emailHtml,
                    text: emailText,
                });
                console.log('✅ Email de notificación enviado exitosamente a', adminEmail);
                console.log('Resend response:', JSON.stringify(result, null, 2));
            } catch (emailError) {
                console.error('❌ Error al enviar email con Resend:', emailError);
                console.error('Error details:', JSON.stringify(emailError, null, 2));
                throw emailError; // Re-lanzar para que se capture en el catch externo
            }
        } else {
            console.warn('⚠️ RESEND_API_KEY no configurada. Email no enviado.');
            console.warn('Configura RESEND_API_KEY en Netlify Environment Variables');
        }
    } catch (error) {
        // No fallar el registro si el email falla
        console.error('Error enviando email de notificación:', error);
    }
}

// Headers para CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

exports.handler = async (event, context) => {
    // Manejar CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    const { httpMethod, path, body } = event;
    
    try {
        // Registro de usuarios
        if (path === '/api/auth/register' && httpMethod === 'POST') {
            const { nombre, email, telefono, empresa, password } = JSON.parse(body || '{}');

            // Validar campos requeridos
            if (!nombre || !email || !telefono || !password) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Todos los campos son requeridos' })
                };
            }

            // Verificar si el usuario ya existe
            const { data: existingUser } = await supabase
                .from('users')
                .select('email')
                .eq('email', email)
                .single();

            if (existingUser) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'El usuario ya existe' })
                };
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario
            const { data: newUser, error } = await supabase
                .from('users')
                .insert({
                    nombre,
                    email,
                    telefono,
                    empresa: empresa || '',
                    cargo: '',
                    motivo: '',
                    password: hashedPassword,
                    status: 'pending'
                })
                .select()
                .single();

            if (error) {
                console.error('Error creando usuario:', error);
                return {
                    statusCode: 500,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Error interno del servidor' })
                };
            }

            // Enviar notificación por email al administrador (no bloquea el registro si falla)
            console.log('Intentando enviar notificación de nuevo usuario...');
            sendNewUserNotification({
                nombre: newUser.nombre,
                email: newUser.email,
                telefono: newUser.telefono,
                empresa: newUser.empresa
            }).catch(err => {
                console.error('Error enviando notificación:', err);
                console.error('Error details:', JSON.stringify(err, null, 2));
            });

            return {
                statusCode: 201,
                headers: corsHeaders,
                body: JSON.stringify({ 
                    message: 'Usuario creado exitosamente. Esperando aprobación del administrador.',
                    userId: newUser.id 
                })
            };
        }

        // Login
        if (path === '/api/auth/login' && httpMethod === 'POST') {
            const { email, password } = JSON.parse(body || '{}');

            // Buscar usuario
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !user) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Credenciales inválidas' })
                };
            }

            // Verificar contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Credenciales inválidas' })
                };
            }

            // Verificar si está aprobado
            if (user.status !== 'approved') {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Usuario pendiente de aprobación' })
                };
            }

            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: user.id, 
                    email: user.email,
                    nombre: user.nombre 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        nombre: user.nombre,
                        empresa: user.empresa
                    }
                })
            };
        }

        // Obtener usuarios (solo admin)
        if (path === '/api/admin/users' && httpMethod === 'GET') {
            const authHeader = event.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token de acceso requerido' })
                };
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                if (decoded.email !== 'felipe@reyesia.com') {
                    return {
                        statusCode: 403,
                        headers: corsHeaders,
                        body: JSON.stringify({ error: 'Acceso denegado. Solo administradores.' })
                    };
                }
            } catch (err) {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token inválido' })
                };
            }

            const { data: users, error } = await supabase
                .from('users')
                .select('*')
                .order('createdAt', { ascending: false });

            if (error) {
                console.error('Error obteniendo usuarios:', error);
                return {
                    statusCode: 500,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Error interno del servidor' })
                };
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify(users)
            };
        }

        // Actualizar estado de usuario (solo admin)
        if (path.startsWith('/api/admin/users/') && path.includes('/status') && httpMethod === 'PUT') {
            const authHeader = event.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token de acceso requerido' })
                };
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                if (decoded.email !== 'felipe@reyesia.com') {
                    return {
                        statusCode: 403,
                        headers: corsHeaders,
                        body: JSON.stringify({ error: 'Acceso denegado. Solo administradores.' })
                    };
                }
            } catch (err) {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token inválido' })
                };
            }

            const userId = path.split('/')[3];
            const { status } = JSON.parse(body || '{}');

            const updateData = { status };
            if (status === 'approved') {
                updateData.approvedAt = new Date().toISOString();
                updateData.approvedBy = 'felipe@reyesia.com';
            }

            const { data: updatedUser, error } = await supabase
                .from('users')
                .update(updateData)
                .eq('id', userId)
                .select()
                .single();

            if (error) {
                console.error('Error actualizando usuario:', error);
                return {
                    statusCode: 500,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Error interno del servidor' })
                };
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify(updatedUser)
            };
        }

        // Obtener archivos
        if (path === '/api/files' && httpMethod === 'GET') {
            const authHeader = event.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token de acceso requerido' })
                };
            }

            try {
                jwt.verify(token, JWT_SECRET);
            } catch (err) {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token inválido' })
                };
            }

            const { data: files, error } = await supabase
                .from('files')
                .select('*')
                .order('createdAt', { ascending: false });

            if (error) {
                console.error('Error obteniendo archivos:', error);
                return {
                    statusCode: 500,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Error interno del servidor' })
                };
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify(files)
            };
        }

        // Obtener noticias de IA
        if (path === '/api/news' && httpMethod === 'GET') {
            const authHeader = event.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return {
                    statusCode: 401,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token de acceso requerido' })
                };
            }

            try {
                jwt.verify(token, JWT_SECRET);
            } catch (err) {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Token inválido' })
                };
            }

            // Noticias actualizadas sobre IA en español
            const sampleNews = [
                {
                    id: 1,
                    title: 'OpenAI presenta GPT-4o: el modelo más avanzado hasta ahora',
                    excerpt: 'El nuevo modelo GPT-4o combina capacidades de texto, audio e imagen en tiempo real, revolucionando la interacción con IA.',
                    link: 'https://openai.com/blog/gpt-4o',
                    source: 'OpenAI',
                    date: new Date().toLocaleDateString('es-ES'),
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Google Gemini: la competencia directa a ChatGPT que ya está aquí',
                    excerpt: 'Google lanza su modelo de IA más potente, capaz de procesar texto, imágenes, audio y video de forma simultánea.',
                    link: 'https://blog.google/technology/ai/google-gemini-ai/',
                    source: 'Google',
                    date: new Date().toLocaleDateString('es-ES'),
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Microsoft Copilot: cómo la IA está transformando el trabajo',
                    excerpt: 'La integración de IA en Microsoft 365 está cambiando la forma en que trabajamos, aumentando la productividad de manera significativa.',
                    link: 'https://blogs.microsoft.com/blog/2024/01/15/the-future-of-work-with-microsoft-copilot/',
                    source: 'Microsoft',
                    date: new Date().toLocaleDateString('es-ES'),
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Midjourney vs DALL-E: la batalla de la IA generativa de imágenes',
                    excerpt: 'Comparativa de los dos modelos más populares para generar imágenes con IA, sus fortalezas y mejores casos de uso.',
                    link: 'https://www.midjourney.com/blog/midjourney-vs-dalle/',
                    source: 'Midjourney',
                    date: new Date().toLocaleDateString('es-ES'),
                    created_at: new Date().toISOString()
                },
                {
                    id: 5,
                    title: 'IA en medicina: diagnóstico más preciso que los médicos humanos',
                    excerpt: 'Los sistemas de IA están demostrando una precisión superior en el diagnóstico de enfermedades, especialmente en radiología y patología.',
                    link: 'https://www.nature.com/articles/ai-medicine-breakthrough',
                    source: 'Nature Medicine',
                    date: new Date().toLocaleDateString('es-ES'),
                    created_at: new Date().toISOString()
                }
            ];

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify(sampleNews)
            };
        }

        // Endpoint no encontrado
        return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Endpoint no encontrado' })
        };

    } catch (error) {
        console.error('Error en Netlify Function:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    }
};
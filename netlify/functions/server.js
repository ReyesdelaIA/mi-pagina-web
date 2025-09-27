const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuración de Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://ttmtnsyogyldmmxxjjpz.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXRuc3lvZ3lsZG1teHhqanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTc5ODcsImV4cCI6MjA3Mzg3Mzk4N30.imoJX22VH_8ntl5VG-IEdEKeIecC5u6ZkhgIhFLWDzg';
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET || 'reyesia-production-jwt-secret-2024';

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
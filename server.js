const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const supabase = require('./supabase-config');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiar-en-produccion';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF'), false);
        }
    }
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

// Middleware para verificar admin
const checkAdmin = (req, res, next) => {
    if (req.user.email !== 'felipe@reyesia.com') {
        return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    next();
};

// Middleware para proteger rutas HTML
const checkAuth = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.redirect('/login.html');
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login.html');
        }
        req.user = user;
        next();
    });
};

// Rutas estáticas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Página principal del sitio web
app.get('/sitio', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SEO files
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard.html', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin', checkAuth, (req, res) => {
    if (req.user.email !== 'felipe@reyesia.com') {
        return res.redirect('/dashboard.html?token=' + req.query.token);
    }
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API Routes
// Registro de usuarios
app.post('/api/auth/register', async (req, res) => {
    try {
        const { nombre, email, telefono, empresa, password } = req.body;

        // Validar campos requeridos
        if (!nombre || !email || !telefono || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
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
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.status(201).json({ 
            message: 'Usuario creado exitosamente. Esperando aprobación del administrador.',
            userId: newUser.id 
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar si está aprobado
        if (user.status !== 'approved') {
            return res.status(401).json({ error: 'Usuario pendiente de aprobación' });
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

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                empresa: user.empresa
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener usuarios (solo admin)
app.get('/api/admin/users', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Error obteniendo usuarios:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar estado de usuario (solo admin)
app.put('/api/admin/users/:id/status', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateData = { status };
        if (status === 'approved') {
            updateData.approvedAt = new Date().toISOString();
            updateData.approvedBy = req.user.email;
        }

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error actualizando usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener archivos
app.get('/api/files', authenticateToken, async (req, res) => {
    try {
        const { data: files, error } = await supabase
            .from('files')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Error obteniendo archivos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json(files);
    } catch (error) {
        console.error('Error obteniendo archivos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Subir archivo (solo admin)
app.post('/api/admin/files', authenticateToken, checkAdmin, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó archivo' });
        }

        const { data: newFile, error } = await supabase
            .from('files')
            .insert({
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                path: req.file.path
            })
            .select()
            .single();

        if (error) {
            console.error('Error guardando archivo:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json(newFile);
    } catch (error) {
        console.error('Error subiendo archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Servir archivos estáticos del directorio raíz
app.use(express.static(__dirname));

// Ruta específica para servir archivos con espacios en el nombre
app.get('/icono INSTAGRAM.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'icono INSTAGRAM.png'));
});

app.get('/icono LINKEDIN.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'icono LINKEDIN.png'));
});

app.get('/logo reyes IA horizontal blanco.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'logo reyes IA horizontal blanco.png'));
});

app.get('/icon reyes IA.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'icon reyes IA.png'));
});

app.get('/reyesIA foto.JPG', (req, res) => {
    res.sendFile(path.join(__dirname, 'reyesIA foto.JPG'));
});

// Servir archivos de uploads
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
});

// Obtener noticias de IA
app.get('/api/news', authenticateToken, async (req, res) => {
    try {
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

        res.json(sampleNews);
    } catch (error) {
        console.error('Error obteniendo noticias:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para ejecutar el scraper de noticias (solo admin)
app.post('/api/admin/refresh-news', authenticateToken, checkAdmin, async (req, res) => {
    try {
        // Ejecutar el scraper en background
        const { scrapeAndSaveNews } = require('./news-scraper-simple');
        scrapeAndSaveNews();
        
        res.json({ message: 'Scraper de noticias iniciado' });
    } catch (error) {
        console.error('Error ejecutando scraper:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
    console.log('Admin: felipe@reyesia.com / admin123');
    console.log('Base de datos: Supabase PostgreSQL');
});

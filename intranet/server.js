const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

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

// Inicializar base de datos
const db = new sqlite3.Database('intranet.db');

// Crear tablas
db.serialize(() => {
    // Tabla de usuarios
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        empresa TEXT NOT NULL,
        cargo TEXT NOT NULL,
        telefono TEXT,
        motivo TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        approvedAt DATETIME,
        approvedBy TEXT
    )`);

    // Tabla de archivos
    db.run(`CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        filename TEXT NOT NULL,
        size INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Crear usuario admin por defecto
    const adminEmail = 'felipe@reyesia.com';
    const adminPassword = 'admin123'; // Cambiar en producción
    
    db.get('SELECT * FROM users WHERE email = ?', [adminEmail], (err, row) => {
        if (!row) {
            bcrypt.hash(adminPassword, 10, (err, hash) => {
                db.run('INSERT INTO users (nombre, email, password, empresa, cargo, motivo, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                    ['Felipe Reyes', adminEmail, hash, 'ReyesIA', 'Fundador', 'Usuario administrador', 'approved']);
                console.log('Usuario admin creado:', adminEmail);
            });
        }
    });
});

// Middleware para verificar autenticación en páginas HTML
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || 
                  req.query.token || 
                  req.cookies?.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

// Middleware para verificar admin en páginas HTML
const checkAdmin = (req, res, next) => {
    if (req.user.email !== 'felipe@reyesia.com') {
        return res.status(403).send('Acceso denegado. Solo administradores.');
    }
    next();
};

// Middleware de autenticación para API
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

// Middleware de admin
const requireAdmin = (req, res, next) => {
    if (req.user.email !== 'felipe@reyesia.com') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};

// Rutas de autenticación
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        if (user.status !== 'approved') {
            return res.status(403).json({ message: 'Usuario no autorizado' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    });
});

// Registro de usuarios
app.post('/api/auth/register', async (req, res) => {
    const { nombre, email, telefono, empresa, password } = req.body;

    try {
        // Verificar si el email ya existe
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
            if (err) {
                return res.status(500).json({ message: 'Error del servidor' });
            }

            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar nuevo usuario con campos simplificados
            db.run(
                'INSERT INTO users (nombre, email, password, empresa, cargo, telefono, motivo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [nombre, email, hashedPassword, empresa || 'No especificada', 'No especificado', telefono, 'Solicitud de acceso', 'pending'],
                function(err) {
                    if (err) {
                        console.error('Error al crear usuario:', err);
                        return res.status(500).json({ message: 'Error al crear la cuenta' });
                    }

                    console.log('Nuevo usuario registrado:', email);
                    res.status(201).json({ 
                        message: 'Cuenta creada correctamente. Te contactaremos pronto para autorizar tu acceso.',
                        userId: this.lastID 
                    });
                }
            );
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Rutas de archivos
app.get('/api/files', authenticateToken, (req, res) => {
    db.all('SELECT id, name, description, size, createdAt FROM files ORDER BY createdAt DESC', 
        (err, files) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cargar archivos' });
            }
            res.json(files);
        });
});

app.get('/api/files/:id/download', authenticateToken, (req, res) => {
    const fileId = req.params.id;

    db.get('SELECT filename, name FROM files WHERE id = ?', [fileId], (err, file) => {
        if (err || !file) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }

        const filePath = path.join(__dirname, 'uploads', file.filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
        }

        res.download(filePath, file.name + '.pdf');
    });
});

// Rutas de administración
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
    db.all('SELECT id, nombre, email, empresa, cargo, telefono, motivo, status, createdAt, approvedAt, approvedBy FROM users ORDER BY createdAt DESC', 
        (err, users) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cargar usuarios' });
            }
            res.json(users);
        });
});

app.put('/api/admin/users/:id/status', authenticateToken, requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Estado inválido' });
    }

    const approvedAt = status === 'approved' ? new Date().toISOString() : null;
    const approvedBy = status === 'approved' ? req.user.email : null;

    db.run('UPDATE users SET status = ?, approvedAt = ?, approvedBy = ? WHERE id = ?', 
        [status, approvedAt, approvedBy, id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar usuario' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    });
});

app.get('/api/admin/files', authenticateToken, requireAdmin, (req, res) => {
    db.all('SELECT id, name, description, size, createdAt FROM files ORDER BY createdAt DESC', 
        (err, files) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cargar archivos' });
            }
            res.json(files);
        });
});

app.post('/api/admin/files', authenticateToken, requireAdmin, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    const { name, description } = req.body;

    db.run('INSERT INTO files (name, description, filename, size) VALUES (?, ?, ?, ?)', 
        [name, description, req.file.filename, req.file.size], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar archivo' });
            }
            res.json({ message: 'Archivo subido correctamente' });
        });
});

app.delete('/api/admin/files/:id', authenticateToken, requireAdmin, (req, res) => {
    const { id } = req.params;

    db.get('SELECT filename FROM files WHERE id = ?', [id], (err, file) => {
        if (err || !file) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }

        // Eliminar archivo del sistema
        const filePath = path.join(__dirname, 'uploads', file.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Eliminar registro de la base de datos
        db.run('DELETE FROM files WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar archivo' });
            }
            res.json({ message: 'Archivo eliminado correctamente' });
        });
    });
});

// Servir archivos estáticos
// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin', checkAuth, checkAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Manejo de errores
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'El archivo es demasiado grande' });
        }
    }
    
    if (error.message === 'Solo se permiten archivos PDF') {
        return res.status(400).json({ message: 'Solo se permiten archivos PDF' });
    }

    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
    console.log(`Admin: felipe@reyesia.com / admin123`);
});

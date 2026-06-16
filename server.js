require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'healthpulse-admin-secret-key-2024';

// Warn if using default JWT secret
if (JWT_SECRET === 'healthpulse-admin-secret-key-2024') {
  console.warn('[SECURITY WARNING] JWT_SECRET is set to the default hardcoded value. Set the JWT_SECRET environment variable to a strong random secret before deploying to production.');
}

// Middleware
app.use(helmet());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : true, // Allow all in development
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rate limiter: max 10 login attempts per 15 minutes
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' }
});

// File-based database
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'healthpulse-data.json');
const FALLBACK_DATA_FILE = path.join('/tmp', 'healthpulse-data.json');
const SEED_FILE = path.join(__dirname, 'healthpulse-data.json');

// Initialize database file
let db = {
  articles: [],
  admin_users: []
};

if (fs.existsSync(DATA_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (error) {
    console.error('Error reading database file, starting fresh');
  }
}

function loadSeedArticles() {
  try {
    const seedDb = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
    return Array.isArray(seedDb.articles) ? seedDb.articles : [];
  } catch (error) {
    console.error('Error reading seed article file, falling back to built-in samples');
    return [];
  }
}

// Helper to parse tags safely (whether stored as array or string)
function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') return tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
}

// Save database to file
function saveDb() {
  const payload = JSON.stringify(db, null, 2);

  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, payload);
    return DATA_FILE;
  } catch (error) {
    console.warn(`Primary data path unavailable (${DATA_FILE}), falling back to ${FALLBACK_DATA_FILE}`);
    fs.writeFileSync(FALLBACK_DATA_FILE, payload);
    return FALLBACK_DATA_FILE;
  }
}

// Ensure the bundled 12-article seed set is present.
const seedArticles = loadSeedArticles();
if (seedArticles.length > 0) {
  const existingIds = new Set(db.articles.map(article => article.id));
  const missingSeedArticles = seedArticles.filter(article => !existingIds.has(article.id));

  if (missingSeedArticles.length > 0) {
    db.articles = [...db.articles, ...missingSeedArticles];
    saveDb();
    console.log(`Seed articles merged into database (${missingSeedArticles.length} added)`);
  }
}

// Insert default admin user if admin_users is empty
if (db.admin_users.length === 0) {
  const defaultPassword = bcrypt.hashSync('admin123', 10);
  db.admin_users.push({
    id: 1,
    username: 'admin',
    password: defaultPassword,
    email: 'admin@healthpulse.sl',
    full_name: 'System Administrator',
    role: 'superadmin',
    created_at: new Date().toISOString(),
    last_login: null
  });
  saveDb();
  console.log('Default admin user created (username: admin, password: admin123)');
}

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireSuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Super Admin role required' });
  }
};

// AI Integration API proxy using Google Gemini API
app.post('/api/ai', async (req, res) => {
  try {
    const { messages, systemPrompt, maxTokens } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }
    
    // Map messages to Gemini's format (user or model roles)
    const contents = messages.map(msg => {
      const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
      const text = msg.content || msg.text || '';
      return {
        role,
        parts: [{ text }]
      };
    });
    
    const payload = {
      contents,
      generationConfig: {
        maxOutputTokens: maxTokens || 800,
        temperature: 0.2
      }
    };
    
    if (systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }
    
    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API request failed:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Gemini API request failed' 
      });
    }
    
    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    res.json({ text: replyText });
  } catch (error) {
    console.error('AI route error:', error);
    res.status(500).json({ error: 'Internal Server Error during AI generation' });
  }
});

// Admin Authentication Routes

// Admin Login (rate limited)
app.post('/api/admin/login', loginRateLimiter, (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const admin = db.admin_users.find(u => u.username === username);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = bcrypt.compareSync(password, admin.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    admin.last_login = new Date().toISOString();
    saveDb();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify Token
app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// Admin Dashboard Stats
app.get('/api/admin/stats', authenticateAdmin, (req, res) => {
  try {
    const totalArticles = db.articles.length;
    const totalAdmins = db.admin_users.length;
    const recentArticles = [...db.articles]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
    
    const topicCounts = {};
    db.articles.forEach(article => {
      topicCounts[article.topic] = (topicCounts[article.topic] || 0) + 1;
    });
    
    const topicStats = Object.entries(topicCounts).map(([topic, count]) => ({ topic, count }));
    
    res.json({
      totalArticles,
      totalAdmins,
      recentArticles: recentArticles.map(a => ({
        ...a,
        tags: parseTags(a.tags)
      })),
      topicStats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Admin User Management
app.get('/api/admin/users', authenticateAdmin, (req, res) => {
  try {
    const users = db.admin_users
      .map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        full_name: u.full_name,
        role: u.role,
        created_at: u.created_at,
        last_login: u.last_login
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/admin/users', authenticateAdmin, requireSuperAdmin, (req, res) => {
  try {
    const { username, password, email, full_name, role } = req.body;
    
    if (!username || !password || !email || !full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check for existing username or email
    if (db.admin_users.some(u => u.username === username || u.email === email)) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newId = Math.max(...db.admin_users.map(u => u.id), 0) + 1;
    
    const newUser = {
      id: newId,
      username,
      password: hashedPassword,
      email,
      full_name,
      role: role || 'admin',
      created_at: new Date().toISOString(),
      last_login: null
    };
    
    db.admin_users.push(newUser);
    saveDb();
    
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      full_name: newUser.full_name,
      role: newUser.role,
      created_at: newUser.created_at
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.delete('/api/admin/users/:id', authenticateAdmin, requireSuperAdmin, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (req.admin.id === userId) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }
    
    const userIndex = db.admin_users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.admin_users.splice(userIndex, 1);
    saveDb();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// API Routes

// GET all articles
app.get('/api/articles', (req, res) => {
  try {
    const { topic, lang, search } = req.query;
    
    let articles = [...db.articles];

    if (topic) {
      articles = articles.filter(a => a.topic === topic);
    }

    if (lang) {
      articles = articles.filter(a => a.lang === lang);
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(searchTerm) ||
        a.excerpt.toLowerCase().includes(searchTerm) ||
        a.body.toLowerCase().includes(searchTerm)
      );
    }

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Parse tags back to array
    const articlesWithTags = articles.map(a => ({
      ...a,
      tags: parseTags(a.tags)
    }));

    res.json(articlesWithTags);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET single article
app.get('/api/articles/:id', (req, res) => {
  try {
    const article = { ...db.articles.find(a => a.id === req.params.id) };
    
    if (!article || Object.keys(article).length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Parse tags back to array
    article.tags = parseTags(article.tags);
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST create article (requires authentication)
app.post('/api/articles', authenticateAdmin, (req, res) => {
  try {
    const { id, topic, title, excerpt, body, author, tags, date, lang, image } = req.body;
    
    if (!topic || !title || !excerpt || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const articleId = id || 'a' + Date.now();
    const tagsStr = Array.isArray(tags) ? tags.join(',') : tags;
    const articleDate = date || new Date().toISOString().split('T')[0];
    const articleLang = lang || 'en';

    const newArticle = {
      id: articleId,
      topic,
      title,
      excerpt,
      body,
      author,
      tags: tagsStr,
      date: articleDate,
      lang: articleLang,
      image: image || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.articles.push(newArticle);
    saveDb();

    newArticle.tags = parseTags(newArticle.tags);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT update article (requires authentication)
app.put('/api/articles/:id', authenticateAdmin, (req, res) => {
  try {
    const { topic, title, excerpt, body, author, tags, lang, image } = req.body;
    
    const tagsStr = Array.isArray(tags) ? tags.join(',') : tags;

    const articleIndex = db.articles.findIndex(a => a.id === req.params.id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    db.articles[articleIndex] = {
      ...db.articles[articleIndex],
      topic,
      title,
      excerpt,
      body,
      author,
      tags: tagsStr,
      lang,
      image: image || '',
      updated_at: new Date().toISOString()
    };

    saveDb();

    const updatedArticle = { ...db.articles[articleIndex] };
    updatedArticle.tags = parseTags(updatedArticle.tags);

    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE article (requires authentication)
app.delete('/api/articles/:id', authenticateAdmin, (req, res) => {
  try {
    const articleIndex = db.articles.findIndex(a => a.id === req.params.id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    db.articles.splice(articleIndex, 1);
    saveDb();

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// GET topics statistics
app.get('/api/stats', (req, res) => {
  try {
    const topicCounts = {};
    db.articles.forEach(article => {
      topicCounts[article.topic] = (topicCounts[article.topic] || 0) + 1;
    });

    const topicStats = Object.entries(topicCounts).map(([topic, count]) => ({ topic, count }));

    const langCounts = {};
    db.articles.forEach(article => {
      langCounts[article.lang] = (langCounts[article.lang] || 0) + 1;
    });

    const langStats = Object.entries(langCounts).map(([lang, count]) => ({ lang, count }));

    res.json({
      total: db.articles.length,
      byTopic: topicStats,
      byLang: langStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`HealthPulse SL server running on http://localhost:${PORT}`);
  console.log(`Database: ${DATA_FILE}`);
});

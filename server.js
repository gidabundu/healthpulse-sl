require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'healthpulse-admin-secret-key-2024';

// Warn if using default JWT secret
if (JWT_SECRET === 'healthpulse-admin-secret-key-2024') {
  console.warn('[SECURITY WARNING] JWT_SECRET is set to the default hardcoded value. Set the JWT_SECRET environment variable to a strong random secret before deploying to production.');
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: false
}));

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

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

// Helper to parse tags safely (whether stored as array or string)
function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') return tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
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
app.post('/api/admin/login', loginRateLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    const admin = result.rows[0];
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = bcrypt.compareSync(password, admin.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    await pool.query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [admin.id]);
    
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
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const articlesCountRes = await pool.query('SELECT COUNT(*) FROM articles');
    const totalArticles = parseInt(articlesCountRes.rows[0].count, 10);
    
    const adminsCountRes = await pool.query('SELECT COUNT(*) FROM admin_users');
    const totalAdmins = parseInt(adminsCountRes.rows[0].count, 10);
    
    const recentArticlesRes = await pool.query('SELECT * FROM articles ORDER BY created_at DESC LIMIT 5');
    const recentArticles = recentArticlesRes.rows;
    
    const topicStatsRes = await pool.query('SELECT topic, COUNT(*)::int as count FROM articles GROUP BY topic');
    const topicStats = topicStatsRes.rows;
    
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
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, role, created_at, last_login FROM admin_users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/admin/users', authenticateAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { username, password, email, full_name, role } = req.body;
    
    if (!username || !password || !email || !full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check for existing username or email
    const check = await pool.query('SELECT 1 FROM admin_users WHERE username = $1 OR email = $2', [username, email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const insert = await pool.query(
      `INSERT INTO admin_users (username, password, email, full_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, email, full_name, role, created_at`,
      [username, hashedPassword, email, full_name, role || 'admin']
    );
    
    res.status(201).json(insert.rows[0]);
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.delete('/api/admin/users/:id', authenticateAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    if (req.admin.id === userId) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }
    
    const result = await pool.query('DELETE FROM admin_users WHERE id = $1', [userId]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// API Routes

// GET all articles
app.get('/api/articles', async (req, res) => {
  try {
    const { topic, lang, search } = req.query;
    
    let queryText = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (topic) {
      queryText += ` AND topic = $${paramIndex}`;
      params.push(topic);
      paramIndex++;
    }

    if (lang) {
      queryText += ` AND lang = $${paramIndex}`;
      params.push(lang);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (title ILIKE $${paramIndex} OR excerpt ILIKE $${paramIndex} OR body ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    queryText += ' ORDER BY date DESC';

    const result = await pool.query(queryText, params);
    
    const articlesWithTags = result.rows.map(a => ({
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
app.get('/api/articles/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = result.rows[0];
    article.tags = parseTags(article.tags);
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST create article (requires authentication)
app.post('/api/articles', authenticateAdmin, async (req, res) => {
  try {
    const { id, topic, title, excerpt, body, author, tags, date, lang, image } = req.body;
    
    if (!topic || !title || !excerpt || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const articleId = id || 'a' + Date.now();
    const tagsArray = Array.isArray(tags) ? tags : parseTags(tags);
    const articleDate = date || new Date().toISOString().split('T')[0];
    const articleLang = lang || 'en';

    const result = await pool.query(
      `INSERT INTO articles (id, topic, title, excerpt, body, author, tags, date, lang, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [articleId, topic, title, excerpt, body, author, tagsArray, articleDate, articleLang, image || '']
    );

    const newArticle = result.rows[0];
    newArticle.tags = parseTags(newArticle.tags);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT update article (requires authentication)
app.put('/api/articles/:id', authenticateAdmin, async (req, res) => {
  try {
    const { topic, title, excerpt, body, author, tags, lang, image } = req.body;
    
    const tagsArray = Array.isArray(tags) ? tags : parseTags(tags);

    const result = await pool.query(
      `UPDATE articles 
       SET topic = $1, title = $2, excerpt = $3, body = $4, author = $5, tags = $6, lang = $7, image = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [topic, title, excerpt, body, author, tagsArray, lang, image || '', req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const updatedArticle = result.rows[0];
    updatedArticle.tags = parseTags(updatedArticle.tags);

    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE article (requires authentication)
app.delete('/api/articles/:id', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM articles WHERE id = $1', [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// GET topics statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM articles');
    const total = parseInt(totalRes.rows[0].count, 10);

    const byTopicRes = await pool.query('SELECT topic, COUNT(*)::int as count FROM articles GROUP BY topic');
    const byTopic = byTopicRes.rows;

    const byLangRes = await pool.query('SELECT lang, COUNT(*)::int as count FROM articles GROUP BY lang');
    const byLang = byLangRes.rows;

    res.json({
      total,
      byTopic,
      byLang
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`HealthPulse SL server running on http://localhost:${PORT}`);
  console.log(`Database (Neon PostgreSQL): Connected`);
});

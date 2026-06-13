const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'healthpulse-admin-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// File-based database
const DB_FILE = path.join(__dirname, 'healthpulse-data.json');

// Initialize database file
let db = {
  articles: [],
  admin_users: []
};

if (fs.existsSync(DB_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (error) {
    console.error('Error reading database file, starting fresh');
  }
}

// Save database to file
function saveDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// Insert sample articles if database is empty
if (db.articles.length === 0) {
  db.articles = [
    {
      id: 'a1',
      topic: 'malaria',
      title: 'Understanding Malaria: Causes, Symptoms & Prevention',
      excerpt: 'Malaria remains one of the leading causes of illness and death in Sierra Leone. Understanding how it spreads is the first step to protection.',
      body: 'Malaria is caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes. Common symptoms include fever, chills, headache, and fatigue. Prevention methods include using insecticide-treated bed nets, indoor residual spraying, and taking antimalarial medication as prescribed. Early diagnosis and treatment are crucial for recovery.',
      author: 'Dr. A. Kamara',
      tags: 'prevention,treatment,mosquito,community',
      date: '2024-08-15',
      lang: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'a2',
      topic: 'maternal',
      title: 'Safe Motherhood: Antenatal Care in Sierra Leone',
      excerpt: 'Regular antenatal visits dramatically reduce maternal and infant mortality. Every pregnant woman deserves quality care from the first trimester.',
      body: 'Antenatal care (ANC) is essential for monitoring the health of both mother and baby during pregnancy. In Sierra Leone, the Free Health Care Initiative provides free ANC services. Key components include blood pressure monitoring, iron supplementation, tetanus vaccination, and malaria prevention. Women should attend at least 8 ANC visits for optimal outcomes.',
      author: 'Nurse F. Conteh',
      tags: 'antenatal,pregnancy,newborn,free-healthcare',
      date: '2024-09-02',
      lang: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'a3',
      topic: 'nutrition',
      title: 'Fighting Malnutrition: Feeding Your Child for Life',
      excerpt: 'Stunting and wasting affect millions of children across West Africa. A diverse diet in the first 1,000 days of life changes everything.',
      body: 'Good nutrition is the foundation of child development. The first 1,000 days from conception to age 2 are critical. Breastfeeding exclusively for the first 6 months provides essential nutrients and antibodies. After 6 months, introduce complementary foods rich in protein, vitamins, and minerals. Community nutrition programs and education can help families make informed dietary choices.',
      author: 'Nutritionist M. Sesay',
      tags: 'children,breastfeeding,diet,stunting',
      date: '2024-07-20',
      lang: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'a4',
      topic: 'water',
      title: 'Clean Water & Sanitation: A Human Right, Not a Luxury',
      excerpt: 'Access to safe water prevents diarrhoea, cholera, and typhoid. Hand-washing alone can cut child deaths by up to 45%.',
      body: 'Clean water and proper sanitation are fundamental to public health. In Sierra Leone, waterborne diseases remain a leading cause of child mortality. Simple practices like boiling drinking water, using latrines, and washing hands with soap can prevent most waterborne illnesses. Community-led total sanitation (CLTS) approaches have shown success in improving hygiene behaviors and reducing disease transmission.',
      author: 'WASH Officer T. Bangura',
      tags: 'cholera,handwashing,latrine,water',
      date: '2024-10-10',
      lang: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  saveDb();
  console.log('Sample articles inserted into database');
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

// Admin Authentication Routes

// Admin Login
app.post('/api/admin/login', (req, res) => {
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
        tags: a.tags ? a.tags.split(',') : []
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

app.post('/api/admin/users', authenticateAdmin, (req, res) => {
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

app.delete('/api/admin/users/:id', authenticateAdmin, (req, res) => {
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
      tags: a.tags ? a.tags.split(',') : []
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
    const article = db.articles.find(a => a.id === req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Parse tags back to array
    article.tags = article.tags ? article.tags.split(',') : [];
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST create article
app.post('/api/articles', (req, res) => {
  try {
    const { id, topic, title, excerpt, body, author, tags, date, lang } = req.body;
    
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.articles.push(newArticle);
    saveDb();

    newArticle.tags = newArticle.tags ? newArticle.tags.split(',') : [];

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT update article
app.put('/api/articles/:id', (req, res) => {
  try {
    const { topic, title, excerpt, body, author, tags, lang } = req.body;
    
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
      updated_at: new Date().toISOString()
    };

    saveDb();

    const updatedArticle = { ...db.articles[articleIndex] };
    updatedArticle.tags = updatedArticle.tags ? updatedArticle.tags.split(',') : [];

    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE article
app.delete('/api/articles/:id', (req, res) => {
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
  console.log(`Database: ${DB_FILE}`);
});

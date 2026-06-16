// Admin Dashboard JavaScript
const API_BASE = window.__HEALTHPULSE_API_BASE__ || ((window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000/api' : 'https://healthpulse-sl.onrender.com/api');

// State
let currentAdmin = null;
let authToken = localStorage.getItem('adminToken');
let currentEditingArticleId = null;
let currentArticles = [];

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  
  // Check if we have credentials in URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const urlUsername = urlParams.get('username');
  const urlPassword = urlParams.get('password');
  
  if (urlUsername && urlPassword) {
    // Populate form fields
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput && passwordInput) {
      usernameInput.value = urlUsername;
      passwordInput.value = urlPassword;
    }
    
    // Clear any existing session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    authToken = null;
    currentAdmin = null;
    
    // Clean up URL query parameters to avoid re-login on refresh
    const url = new URL(window.location.href);
    url.searchParams.delete('username');
    url.searchParams.delete('password');
    window.history.replaceState({}, document.title, url.pathname + url.search);

    // Show login screen
    showLogin();
    
    // Dispatch submit event to trigger handleLogin
    if (loginForm) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      loginForm.dispatchEvent(event);
    }
  } else {
    if (authToken) {
      verifyToken();
    } else {
      showLogin();
    }
  }
});

// Setup Event Listeners
function setupEventListeners() {
  // Login form
  loginForm.addEventListener('submit', handleLogin);
  
  // Menu toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Close sidebar on click outside on mobile
  document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('menu-toggle');
    if (sidebar && sidebar.classList.contains('open') && window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
        closeSidebar();
      }
    }
  });
  
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const section = e.currentTarget.dataset.section;
      navigateTo(section);
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  
  // View Site button
  document.querySelectorAll('[data-section]').forEach(btn => {
    if (btn.tagName === 'BUTTON') {
      btn.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        navigateTo(section);
      });
    }
  });
  
  // Add User button
  document.getElementById('add-user-btn').addEventListener('click', () => {
    showUserModal();
  });

  // Add Article button
  document.getElementById('add-article-btn').addEventListener('click', () => {
    showArticleModal();
  });
  
  // User form
  document.getElementById('user-form').addEventListener('submit', handleUserSubmit);

  // Article form
  document.getElementById('article-form').addEventListener('submit', handleArticleSubmit);
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Modal overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      const modal = overlay.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  // Live Editor Preview Listeners
  const editorFields = [
    'article-title', 'article-topic', 'article-author', 'article-date', 
    'article-lang', 'article-excerpt', 'article-image', 'article-tags', 'article-body'
  ];
  editorFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateEditorPreview);
      el.addEventListener('change', updateEditorPreview);
    }
  });

  // Local Image Selector change helper
  const localImgSelect = document.getElementById('local-image-selector');
  if (localImgSelect) {
    localImgSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val) {
        document.getElementById('article-image').value = val;
        updateEditorPreview();
      }
    });
  }
}

// Show Login Screen
function showLogin() {
  loginScreen.style.display = 'flex';
  dashboardScreen.style.display = 'none';
}

// Show Dashboard
function showDashboard() {
  loginScreen.style.display = 'none';
  dashboardScreen.style.display = 'flex';
  loadDashboardData();
}

// Handle Login
async function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const btn = loginForm.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');
  
  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  loginError.classList.remove('show');
  
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      authToken = data.token;
      currentAdmin = data.admin;
      localStorage.setItem('adminToken', authToken);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      showDashboard();
      updateAdminInfo();
    } else {
      loginError.textContent = data.error || 'Login failed';
      loginError.classList.add('show');
    }
  } catch (error) {
    console.error('Login error:', error);
    loginError.textContent = 'Network error. Please try again.';
    loginError.classList.add('show');
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
}

// Verify Token
async function verifyToken() {
  try {
    const response = await fetch(`${API_BASE}/admin/verify`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      currentAdmin = data.admin;
      showDashboard();
      updateAdminInfo();
    } else {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      showLogin();
    }
  } catch (error) {
    console.error('Token verification error:', error);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    showLogin();
  }
}

// Handle Logout
function handleLogout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
  authToken = null;
  currentAdmin = null;
  showLogin();
  loginForm.reset();
}

// Update Admin Info
function updateAdminInfo() {
  if (currentAdmin) {
    document.getElementById('admin-name').textContent = currentAdmin.full_name || currentAdmin.username;
    document.getElementById('admin-role').textContent = currentAdmin.role === 'superadmin' ? 'Super Admin' : 'Admin';
    
    // Hide or show User Management nav button
    const usersBtn = document.querySelector('.nav-item[data-section="users"]');
    if (usersBtn) {
      if (currentAdmin.role === 'superadmin') {
        usersBtn.style.display = 'flex';
      } else {
        usersBtn.style.display = 'none';
      }
    }
  }
}

// Navigate to Section
function navigateTo(section) {
  if (section === 'users' && (!currentAdmin || currentAdmin.role !== 'superadmin')) {
    navigateTo('overview');
    return;
  }

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === section) {
      item.classList.add('active');
    }
  });
  
  // Update sections
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(`section-${section}`).classList.add('active');
  
  // Update page title
  const titles = {
    overview: 'Dashboard Overview',
    articles: 'Article Management',
    users: 'User Management',
    'article-edit': 'Write Article'
  };
  document.getElementById('page-title').textContent = titles[section] || 'Dashboard';
  
  // Load section data
  if (section === 'overview') {
    loadDashboardData();
  } else if (section === 'articles') {
    loadArticles();
  } else if (section === 'users') {
    loadUsers();
  }
}

// Load Dashboard Data
async function loadDashboardData() {
  try {
    const response = await fetch(`${API_BASE}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Update stats
      document.getElementById('stat-articles').textContent = data.totalArticles;
      document.getElementById('stat-users').textContent = data.totalAdmins;
      document.getElementById('stat-topics').textContent = data.topicStats.length;
      
      // Update recent articles
      renderRecentArticles(data.recentArticles);
      
      // Update topic stats
      renderTopicStats(data.topicStats);
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// Render Recent Articles
function renderRecentArticles(articles) {
  const container = document.getElementById('recent-articles');
  
  if (articles.length === 0) {
    container.innerHTML = '<p class="loading">No articles yet</p>';
    return;
  }
  
  container.innerHTML = articles.map(article => `
    <div class="article-item">
      <div class="article-item-info">
        <h4>${article.title}</h4>
        <p>${article.author || 'Unknown'} • ${formatDate(article.date)}</p>
      </div>
      <span class="article-item-topic">${capitalizeFirst(article.topic)}</span>
    </div>
  `).join('');
}

// Render Topic Stats
function renderTopicStats(stats) {
  const container = document.getElementById('topic-stats');
  
  if (stats.length === 0) {
    container.innerHTML = '<p class="loading">No data yet</p>';
    return;
  }
  
  container.innerHTML = stats.map(stat => `
    <div class="topic-stat-item">
      <span class="topic-stat-name">${capitalizeFirst(stat.topic)}</span>
      <span class="topic-stat-count">${stat.count}</span>
    </div>
  `).join('');
}

// Load Articles
async function loadArticles() {
  const tbody = document.getElementById('articles-table-body');
  tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';
  
  try {
    const response = await fetch(`${API_BASE}/articles`);
    
    if (response.ok) {
      const articles = await response.json();
      currentArticles = articles;
      renderArticlesTable(articles);
    }
  } catch (error) {
    console.error('Error loading articles:', error);
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Error loading articles</td></tr>';
  }
}

// Render Articles Table
function renderArticlesTable(articles) {
  const tbody = document.getElementById('articles-table-body');
  
  if (articles.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">No articles found</td></tr>';
    return;
  }
  
  tbody.innerHTML = articles.map(article => `
    <tr>
      <td>${article.title}</td>
      <td><span class="article-item-topic">${capitalizeFirst(article.topic)}</span></td>
      <td>${article.author || 'Unknown'}</td>
      <td>${article.lang.toUpperCase()}</td>
      <td>${formatDate(article.date)}</td>
      <td>
        <div class="table-actions">
          <button class="action-btn edit" title="Edit" onclick="editArticle('${article.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="action-btn delete" title="Delete" onclick="deleteArticle('${article.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Load Users
async function loadUsers() {
  const tbody = document.getElementById('users-table-body');
  tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';
  
  try {
    const response = await fetch(`${API_BASE}/admin/users`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (response.ok) {
      const users = await response.json();
      renderUsersTable(users);
    }
  } catch (error) {
    console.error('Error loading users:', error);
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Error loading users</td></tr>';
  }
}

// Render Users Table
function renderUsersTable(users) {
  const tbody = document.getElementById('users-table-body');
  
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">No users found</td></tr>';
    return;
  }
  
  tbody.innerHTML = users.map(user => `
    <tr>
      <td>${user.full_name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><span class="article-item-topic">${user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</span></td>
      <td>${user.last_login ? formatDate(user.last_login) : 'Never'}</td>
      <td>
        <div class="table-actions">
          ${user.id !== currentAdmin.id ? `
            <button class="action-btn delete" title="Delete" onclick="deleteUser(${user.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Show User Modal
function showUserModal() {
  openModal('user-modal');
  document.getElementById('user-form').reset();
  document.getElementById('user-modal-title').textContent = 'Add New User';
}

// Show Article Modal
function showArticleModal(article = null) {
  currentEditingArticleId = article ? article.id : null;

  const form = document.getElementById('article-form');
  form.reset();
  document.getElementById('article-modal-title').textContent = article ? 'Edit Article' : 'Add New Article';
  document.getElementById('article-title').value = article?.title || '';
  document.getElementById('article-topic').value = article?.topic || 'malaria';
  document.getElementById('article-excerpt').value = article?.excerpt || '';
  document.getElementById('article-body').value = article?.body || '';
  document.getElementById('article-image').value = article?.image || '';
  document.getElementById('article-author').value = article?.author || '';
  document.getElementById('article-tags').value = Array.isArray(article?.tags) ? article.tags.join(', ') : (article?.tags || '');
  document.getElementById('article-date').value = article?.date || new Date().toISOString().split('T')[0];
  document.getElementById('article-lang').value = article?.lang || 'en';

  document.getElementById('local-image-selector').value = '';
  navigateTo('article-edit');
  updateEditorPreview();
}

// Open Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
  }
}

// Close Modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
  if (modalId === 'article-modal') {
    currentEditingArticleId = null;
  }
}

// Handle Article Submit
async function handleArticleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const articleData = Object.fromEntries(formData.entries());
  articleData.tags = articleData.tags
    ? articleData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  const btn = e.target.querySelector('button[type="submit"]');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = currentEditingArticleId ? 'Updating...' : 'Saving...';

  try {
    const url = currentEditingArticleId
      ? `${API_BASE}/articles/${currentEditingArticleId}`
      : `${API_BASE}/articles`;
    const method = currentEditingArticleId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(articleData)
    });

    if (response.ok) {
      navigateTo('articles');
      await loadArticles();
      await loadDashboardData();
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to save article');
    }
  } catch (error) {
    console.error('Error saving article:', error);
    alert('Network error. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}

// Handle User Submit
async function handleUserSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const userData = Object.fromEntries(formData.entries());
  
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Saving...';
  
  try {
    const response = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      document.getElementById('user-modal').style.display = 'none';
      loadUsers();
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to create user');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Network error. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save User';
  }
}

// Delete User
async function deleteUser(userId) {
  if (!confirm('Are you sure you want to delete this user?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (response.ok) {
      loadUsers();
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('Network error. Please try again.');
  }
}

// Edit Article
function editArticle(articleId) {
  const article = currentArticles.find(item => item.id === articleId);

  if (article) {
    showArticleModal(article);
    return;
  }

  fetch(`${API_BASE}/articles/${articleId}`)
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Article not found')))
    .then(articleData => showArticleModal(articleData))
    .catch(error => {
      console.error('Error loading article for edit:', error);
      alert('Unable to load article for editing.');
    });
}

// Delete Article
async function deleteArticle(articleId) {
  if (!confirm('Are you sure you want to delete this article?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.ok) {
      loadArticles();
    } else {
      alert('Failed to delete article');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    alert('Network error. Please try again.');
  }
}

// Helper Functions
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Sidebar Toggle Functions
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
  }
}

// ── EDITOR PREVIEW & VALIDATION ──────────────────────
function updateEditorPreview() {
  const title = document.getElementById('article-title').value || 'Article Title';
  const topic = document.getElementById('article-topic').value || 'malaria';
  const excerpt = document.getElementById('article-excerpt').value || 'Short summary text...';
  const body = document.getElementById('article-body').value || 'Article content...';
  const image = document.getElementById('article-image').value || '';
  const author = document.getElementById('article-author').value || '';
  const lang = document.getElementById('article-lang').value || 'en';
  const date = document.getElementById('article-date').value || new Date().toISOString().split('T')[0];
  const tagsText = document.getElementById('article-tags').value || '';

  // Update text elements
  document.getElementById('p-title').textContent = title;
  document.getElementById('p-excerpt').textContent = excerpt;
  
  // Convert newlines to paragraphs
  const bodyHtml = body.split('\n\n').map(p => p.trim() ? `<p>${p.replace(/\n/g, '<br/>')}</p>` : '').join('');
  document.getElementById('p-body').innerHTML = bodyHtml || '<p>Article content...</p>';
  
  // Update char counters
  document.getElementById('title-char-count').textContent = `${title.length}/120`;
  document.getElementById('excerpt-char-count').textContent = `${excerpt.length}/280`;
  document.getElementById('body-char-count').textContent = `${body.length} characters`;

  // Update badge and colors
  const topicsMap = {
    malaria: { label: 'Malaria', emoji: '🦟', color: '#1A7A4A', bg: '#e6f4ee' },
    maternal: { label: 'Maternal Health', emoji: '🤱', color: '#9B2335', bg: '#fdeaec' },
    nutrition: { label: 'Nutrition', emoji: '🥗', color: '#E8A020', bg: '#fdf4e3' },
    hiv: { label: 'HIV/AIDS', emoji: '🎗️', color: '#8E44AD', bg: '#f3e8fa' },
    water: { label: 'Water & Sanitation', emoji: '💧', color: '#2471A3', bg: '#e8f4fd' },
    mentalhealth: { label: 'Mental Health', emoji: '🧠', color: '#16A085', bg: '#e3f6f3' },
    vaccination: { label: 'Vaccination', emoji: '💉', color: '#D35400', bg: '#fdebd0' },
    tuberculosis: { label: 'Tuberculosis', emoji: '🫁', color: '#6B7C72', bg: '#f0f3f1' },
    diabetes: { label: 'Diabetes', emoji: '🩸', color: '#E67E22', bg: '#fdf2e9' },
    hypertension: { label: 'Hypertension', emoji: '❤️‍🩹', color: '#C0392B', bg: '#f9ebe7' },
    cholera: { label: 'Cholera', emoji: '🚰', color: '#27AE60', bg: '#e9f7ef' },
    familyplanning: { label: 'Family Planning', emoji: '👨‍👩‍👧', color: '#8E44AD', bg: '#f4ecf7' }
  };
  const currentTopic = topicsMap[topic] || topicsMap.malaria;
  
  const badge = document.getElementById('p-badge');
  badge.textContent = `${currentTopic.emoji} ${currentTopic.label}`;
  badge.style.background = currentTopic.bg;
  badge.style.color = currentTopic.color;

  const headerBanner = document.getElementById('p-header-banner');
  headerBanner.style.background = currentTopic.color;

  // Language name
  const langsMap = { en: 'English', kr: 'Krio', tm: 'Temne', mn: 'Mende' };
  const currentLang = langsMap[lang] || 'English';

  // Format date
  let dateFormatted = date;
  try {
    dateFormatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch(e){}

  document.getElementById('p-meta').innerHTML = `
    <span>📅 Date: ${dateFormatted}</span>
    ${author ? `<span>✍️ Author: ${author}</span>` : ''}
    <span>🌐 Language: ${currentLang}</span>
  `;

  // Image preview
  const imgContainer = document.getElementById('p-image-container');
  const imgEl = document.getElementById('p-image');
  if (image) {
    imgEl.src = image;
    imgContainer.style.display = 'block';
  } else {
    imgContainer.style.display = 'none';
  }

  // Tags list
  const tagsList = document.getElementById('p-tags');
  tagsList.innerHTML = '';
  if (tagsText.trim()) {
    tagsText.split(',').map(t => t.trim()).filter(Boolean).forEach(tag => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.textContent = `#${tag}`;
      tagsList.appendChild(pill);
    });
  }

  // Perform WHO / MoH compliance checks
  runComplianceChecks(title, excerpt, body, topic);
}

function runComplianceChecks(title, excerpt, body, topic) {
  const list = document.getElementById('validation-rules-list');
  list.innerHTML = '';
  
  const warnings = [];

  // Rule 1: Excerpt character limit
  if (excerpt.length > 280) {
    warnings.push({
      type: 'danger',
      message: `Excerpt length (${excerpt.length} chars) exceeds the 280-character maximum limit.`
    });
  }

  // Rule 2: Referral warning checks (WHO standard)
  const lowerBody = body.toLowerCase();
  const hasReferral = lowerBody.includes('doctor') || 
                      lowerBody.includes('clinic') || 
                      lowerBody.includes('hospital') || 
                      lowerBody.includes('health facility') || 
                      lowerBody.includes('health worker') || 
                      lowerBody.includes('nurse');
                      
  if (!hasReferral && body.trim().length > 0) {
    warnings.push({
      type: 'warning',
      message: 'MoH Standard: Article is missing a "When to see a doctor" or referral instruction. Add guidance to visit nearest health facility.'
    });
  }

  // Rule 3: Chloroquine restriction for Malaria (PRD v3.0 risk point)
  if (topic === 'malaria' && lowerBody.includes('chloroquine')) {
    warnings.push({
      type: 'danger',
      message: 'CRITICAL WARNING: Chloroquine is NOT effective for treating malaria in Sierra Leone. Recommend ACT (Artemisinin-based Combination Therapy) instead.'
    });
  }

  // Rule 4: Check if ACT is mentioned for Malaria (PRD v3.0 standard)
  if (topic === 'malaria' && !lowerBody.includes('act') && !lowerBody.includes('artemisinin') && body.trim().length > 0) {
    warnings.push({
      type: 'warning',
      message: 'Guideline: For malaria treatment, specify ACT (Artemisinin-based Combination Therapy) as the correct standard treatment.'
    });
  }

  // Render warnings
  if (warnings.length === 0) {
    list.innerHTML = `<div class="validation-item success">✅ All MoH/WHO communications guidelines are met! Ready to publish.</div>`;
  } else {
    warnings.forEach(w => {
      const div = document.createElement('div');
      div.className = `validation-item ${w.type}`;
      div.innerHTML = `${w.type === 'danger' ? '❌' : '⚠️'} ${w.message}`;
      list.appendChild(div);
    });
  }
}

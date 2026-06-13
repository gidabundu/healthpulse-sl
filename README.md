# HealthPulse SL — Digital Health Awareness System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open Standards](https://img.shields.io/badge/Data-JSON%20%7C%20SQLite-blue)](https://www.json.org/)

A responsive, multilingual digital health awareness platform for Sierra Leone, empowering communities with accessible health knowledge.

## Overview

HealthPulse SL is a web-based health information system that provides accurate, accessible health knowledge across topics including malaria, maternal health, nutrition, HIV/AIDS, vaccination, and mental health.

## Features

- **CRUD Articles** — Create, read, update, and delete health articles
- **Search & Filter** — Real-time search + filter by health topic
- **4 Local Languages** — English, Krio, Temne, Mende UI support
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Privacy Compliant** — No personal data collected; data stored locally
- **Open Standards** — JSON data format for interoperability
- **8 Sample Articles** — Pre-loaded expert health content

## Quick Start

### Option 1: Full Stack with SQLite Backend (Recommended)
```bash
git clone https://github.com/yourusername/healthpulse-sl.git
cd healthpulse-sl
npm install
npm start
# Visit http://localhost:3000
```

### Option 2: Frontend Only (localStorage)
```bash
git clone https://github.com/yourusername/healthpulse-sl.git
# Open index.html in your browser — no build step needed!
```

### Option 3: Static Server
```bash
# Python
python3 -m http.server 8080

# Node.js
npm run frontend

# PHP
php -S localhost:8080
```
Then visit `http://localhost:8080`

## Project Structure

```
healthpulse-sl/
├── index.html          # Frontend application
├── admin.html          # Admin dashboard
├── server.js           # Node.js backend with SQLite
├── package.json        # Project metadata and dependencies
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── healthpulse-data.json  # Sample data
└── README.md           # This file
```

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js with Express
- **Database:** SQLite (via better-sqlite3)
- **API:** RESTful endpoints for CRUD operations
- **Fonts:** Google Fonts (Playfair Display, Nunito)
- **No build tools required** — pure open-web standards

### Architecture
- **Full Stack Mode:** Node.js + SQLite backend with REST API
- **Frontend Only Mode:** Browser localStorage for data persistence
- **Seamless switching:** Frontend automatically falls back to localStorage if API is unavailable

## Health Topics Covered

| Topic | Description |
|---|---|
| Malaria | Communicable disease prevention |
| Maternal Health | Pregnancy and childbirth care |
| Nutrition | Balanced diet and malnutrition |
| HIV/AIDS | Prevention and treatment |
| Water & Sanitation | Clean water access |
| Mental Health | Psychological wellbeing |
| Vaccination | Immunization schedules |
| Tuberculosis | TB prevention and care |
| Diabetes | Chronic disease management |
| Hypertension | Blood pressure control |
| Cholera | Waterborne disease prevention |
| Family Planning | Reproductive health |

## Language Support

| Code | Language | Region |
|---|---|---|
| `en` | English | National/Official |
| `kr` | Krio | Nationwide lingua franca |
| `tm` | Temne | Northern Province |
| `mn` | Mende | Southern Province |

## Privacy & Data Handling

- **No personal data is collected** from users
- All article data stored in browser `localStorage` (device-local only)
- No cookies, no tracking, no analytics
- GDPR/data protection compliant by design
- Data can be exported as JSON for system migration

## Hosting Recommendations

### Best Hosting Platforms

**1. Railway** (Recommended for Full Stack)
- Excellent Node.js support
- Built-in SQLite database
- Free tier available ($5/month after)
- Easy GitHub integration
- Automatic deployments

**2. Render**
- Great free tier for Node.js
- Persistent disk storage for SQLite
- Simple deployment process
- Good performance

**3. Vercel**
- Excellent for static frontend
- Serverless functions for backend
- Free tier generous
- Fast global CDN

**4. Netlify**
- Best for static hosting (frontend only)
- Free tier with SSL
- Easy drag-and-drop deployment
- Good for prototyping

### Deployment to Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

## License

MIT License — see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## Roadmap

- [x] Backend API (Node.js + SQLite)
- [ ] User authentication for article authors
- [ ] Audio content for low-literacy users
- [ ] Offline PWA support (Service Worker)
- [ ] SMS/USSD integration for feature phones
- [ ] Map view showing health facility locations
- [ ] Integration with Sierra Leone DHIS2

## Acknowledgements

Built in support of Sierra Leone's Ministry of Health and Sanitation, aligned with WHO health communication guidelines.

> "Health is a human right, not a privilege." — WHO Constitution

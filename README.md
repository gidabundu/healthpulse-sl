# HealthPulse SL — Digital Health Awareness System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.txt)
[![Open Standards](https://img.shields.io/badge/Data-JSON-blue)](https://www.json.org/)

A responsive, multilingual digital health awareness platform for Sierra Leone, empowering communities with accessible health knowledge.

## Overview

HealthPulse SL is a web-based health information system that provides accurate, accessible health knowledge across topics including malaria, maternal health, nutrition, HIV/AIDS, vaccination, and mental health.

## SDG Alignment

HealthPulse SL is directly aligned with **UN Sustainable Development Goal (SDG) 3: Good Health and Well-being**.

Specifically, the platform addresses:
- **Target 3.3 (End Epidemics & Communicable Diseases):** By providing localized preventive guidelines on Malaria, Cholera, Tuberculosis, and HIV/AIDS in major Sierra Leonean languages (English, Krio, Temne, Mende), we empower at-risk populations with actionable information.
- **Target 3.8 (Universal Health Coverage & Access to Information):** The system provides free, open, and clear health awareness resources. Features like first-aid instructions, disease prevention, and emergency hotlines are accessible offline or in low-literacy environments.
- **Target 3.c (Health Financing & Capacity Building in Developing Countries):** Developed specifically for the Sierra Leonean context, it assists local community health officers and volunteers in disseminating authenticated WHO/MoH medical guidelines without needing expensive proprietary software.

## Features

- **CRUD Articles** — Create, read, update, and delete health articles
- **Search & Filter** — Real-time search + filter by health topic
- **4 Local Languages** — English, Krio, Temne, Mende UI support
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Privacy Compliant** — No personal data collected; data stored locally
- **Open Standards** — JSON data format for interoperability
- **8 Sample Articles** — Pre-loaded expert health content

## Quick Start

### Option 1: Full Stack Node.js Backend (Recommended)
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
├── server.js           # Node.js backend with JSON database
├── package.json        # Project metadata and dependencies
├── vercel.json         # Vercel rewrite config for /api -> Render
├── render.yaml         # Render Blueprint for backend deployment
├── .env.example        # Local and production environment variables
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── healthpulse-data.json  # Sample data
└── README.md           # This file
```

## Integration of Previous Work (Assignments 1 & 2)

HealthPulse SL represents a complete implementation and refinement of the design artifacts developed in earlier course milestones:
- **Data Flow Diagram (DFD) Reflection:** The application directly implements the data flows modeled in Assignment 1. Public users fetch content (read-only flow) from the articles store, while validated admin roles push, modify, and delete records (read/write flow) securely via JWT tokens.
- **Entity Relationship Diagram (ERD) Reflection:** The database structure implements the relationships mapped in Assignment 2, supporting an `admin_users` entity with role definitions (Super Admin vs Author) and an `articles` entity containing metadata, body content, and tags.
- **System Flowchart Integration:** The flow for editing articles translates the flowchart checks into JavaScript. For instance, the **MoH/WHO Validation Checks** automatically audit user input in real time (e.g., verifying if ineffective treatments like chloroquine are suggested or confirming clinic referrals are listed) before allowing saves.
- **UI Mock-ups & Prototypes:** The final application matches the responsive dashboard and reading page wireframes. The interface adapts cleanly across mobile, tablet, and desktop screens with a professional sidebar and content layout.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js with Express
- **Database:** JSON File-based DB (`healthpulse-data.json` with automatic sync/backup)
- **API:** RESTful endpoints for CRUD operations
- **Fonts:** Google Fonts (Playfair Display, Nunito)
- **No build tools required** — pure open-web standards

### Architecture
- **Full Stack Mode:** Node.js + Express backend with REST API
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

## Data Privacy Statement

In accordance with international data protection standards (such as GDPR) and Digital Public Goods (DPG) standards, HealthPulse SL maintains strict user privacy policies:
- **No Personal Identifiable Information (PII) Collection:** The public-facing site does not collect, log, or store names, email addresses, phone numbers, or IP addresses of general visitors.
- **Strict Role-Based Admin Access:** Admin accounts utilize JSON Web Tokens (JWT) for secure authentication. Passwords are encrypted on the server using cryptographic one-way hashing (`bcrypt`).
- **No Cookies or Tracker Scripts:** The application does not load any third-party tracking pixels, marketing cookies, or analytics services.
- **Local Storage Control:** Users who prefer to run the system completely offline are supported. All modifications remain locally on the user's browser storage without transferring any details over the web.
- **System Portability:** The data schema is fully open and portable via standard JSON export/import formats, ensuring data ownership and zero vendor lock-in.

## Hosting Recommendations

### Best Hosting Platforms

**1. Railway** (Recommended for Full Stack)
- Excellent Node.js support
- Persistent disk storage for databases
- Free tier available ($5/month after)
- Easy GitHub integration
- Automatic deployments

**2. Render**
- Great free tier for Node.js
- Persistent disk storage for JSON database
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

## Deployment: Vercel + Render

Use Vercel for the static frontend and Render for the Node.js backend.

### 1) Deploy the backend on Render

1. Push the repo to GitHub.
2. In Render, create a new Blueprint deployment from this repository.
3. Render will read [render.yaml](render.yaml) and create the `healthpulse-sl-api` service.
4. After the first deploy, confirm the service URL is `https://healthpulse-sl-api.onrender.com`.
5. The backend stores JSON data on a persistent disk mounted at `/var/data`.

### 2) Point Vercel at the Render backend

1. Update the destination in [vercel.json](vercel.json) if your Render URL is different.
2. Deploy the repository to Vercel as a static site.
3. Vercel will proxy `/api/*` requests to Render, so the frontend can keep using a relative `/api` base.

### 3) Local development

1. Run `npm install`.
2. Start the backend with `npm start`.
3. Open `index.html` or `admin.html` locally; the scripts fall back to `http://localhost:3000/api` when running on localhost or from `file://`.

### Environment variables

Copy [`.env.example`](.env.example) for local settings. On Render, `JWT_SECRET` and `DATA_FILE` are set by the Blueprint.

### Notes

- The frontend does not need a build step.
- If you rename the Render service, update the destination in [vercel.json](vercel.json).
- The backend persists article/admin data only when the Render disk is attached.

### Render troubleshooting

If Render shows `Running 'node index.html'`, the service was created with the wrong type or start command.

1. Make sure the service is a **Web Service**, not a Static Site.
2. Set **Root Directory** to the repository root, or leave it blank if Render accepts that.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. If the service was created incorrectly, delete it and create a new Blueprint deployment from [render.yaml](render.yaml).
6. If you keep the existing service, manually replace the start command with `npm start` and remove any `node index.html` setting.

## License

MIT License — see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## Roadmap

- [x] Backend API (Node.js + JSON Database)
- [ ] User authentication for article authors
- [ ] Audio content for low-literacy users
- [ ] Offline PWA support (Service Worker)
- [ ] SMS/USSD integration for feature phones
- [ ] Map view showing health facility locations
- [ ] Integration with Sierra Leone DHIS2

## Acknowledgements

Built in support of Sierra Leone's Ministry of Health and Sanitation, aligned with WHO health communication guidelines.

> "Health is a human right, not a privilege." — WHO Constitution

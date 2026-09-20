<div align="center">

# ⚡ SAHIL RAMJAN PATHAN — ADVANCED MERN PORTFOLIO
### *Production Full-Stack Web Application • 3D Interactive Showcase • Dynamic Admin CMS*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-6366f1?style=for-the-badge&logo=react&logoColor=white)](https://github.com)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47a248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-interactive-3d-effects">3D Effects</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-author">Author</a>
</p>

</div>

---

## 🌟 Overview

Welcome to the official repository of **Sahil Ramjan Pathan's Portfolio & Dynamic Content Management System**. Built with the modern **MERN (MongoDB, Express, React, Node.js)** architecture and **Vite**, this project blends high-performance engineering with luxury, modern design aesthetics.

It features **100+ project showcases**, **15+ verified technical certifications with automatic 3D hover flips**, **real-time contact message dispatching**, and an **authenticated Admin CMS** to dynamically update portfolio records on MongoDB Atlas without touching code.

---

## ✨ Key Features

- **🚀 100+ Production Projects Showcase:**
  - Multi-category filtering (MERN, Full Stack, React, Frontend, AI/ML, Tools).
  - Real-time search by title, description, or technology stack.
  - Interactive Project Modal with screenshots, GitHub repository links, and live demos.
  - **Quick-Specs 3D Card Flip** to inspect backend architecture, database models, and capabilities directly on the grid.

- **🎴 Auto 3D Flip Verified Certifications:**
  - 15+ verified credentials with official issuing authorities (OneRoadmap, Udemy, HackerRank, etc.).
  - Hovering over any card activates a **180° 3D perspective flip** (`preserve-3d`) revealing official credential IDs, competency breakdown, and verified external launch buttons.
  - Non-overlapping, elevated z-index architecture with complete touch/mobile toggle support.

- **📊 Technical Arsenal Matrix:**
  - Comprehensive skill proficiencies across Frontend, Backend, Database, Languages, and Tools/Auth.
  - Laser light sweep animation traversing progress bars on card hover.
  - 3D gyro tilt and glowing accent halos on tech icons.

- **📚 Published Research Spotlight:**
  - Dedicated spotlight for scientific research publication in the **International Journal of Innovative Research in Technology (IJIRT, Nov 2025)** on AI-powered interview systems.

- **🛡️ Secure Admin Control CMS (`/admin`):**
  - JWT (JSON Web Token) authentication with HTTP-only tokens and bcrypt password hashing.
  - Manage projects, skills, certifications, experience timelines, and profile bio in real-time.
  - Live visitor inquiry inbox with unread status counters.

- **🌐 Production SEO & Performance:**
  - Dynamic Open Graph tags, canonical links, and JSON-LD structured data.
  - XML Sitemap (`sitemap.xml`) and Google Webmaster site verification included.
  - Sub-second build times with Vite 6.

---

## 🎛️ Interactive 3D Effects

| Effect | Component | Technology & Interaction |
| :--- | :--- | :--- |
| **Auto 3D Card Flip** | `EducationCerts.jsx` | 180° Y-axis rotation on hover/tap with backface-visibility and elevated z-index |
| **3D Mouse Perspective Tilt** | `Projects.jsx` | Cursor-tracking perspective tilt (`rotateX`, `rotateY`) with radial spotlight glare |
| **Quick-Specs Blueprint Flip** | `Projects.jsx` | In-place 3D card flip revealing architecture specs and database schema |
| **3D Gyro Frame & Ambient Aura**| `Hero.jsx` | Real-time 3D spring tilt on profile frame with orbiting magnetic tech chips |
| **Laser Progress Sweep** | `Skills.jsx` | Keyframe-animated beam sweeping across progress tracks upon hover |
| **Button Light Sheen** | `index.css` | 45-degree diagonal light sweep beam (`btnSheenSweep`) on all primary buttons |

---

## 🛠️ Tech Stack

### **Frontend**
- **Library:** React 18.3 (Hooks, Context API, useMemo, custom hooks)
- **Build Tool:** Vite 6.0 (Lightning-fast HMR)
- **Styling:** Modular Vanilla CSS Design System (Custom variables, glassmorphism, 3D perspective, responsive grids)
- **Icons:** Lucide React & Custom SVG brand icons

### **Backend**
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4.21
- **Database:** MongoDB Atlas via Mongoose 8.9 ODM
- **Authentication:** JWT (jsonwebtoken) & bcryptjs password salting
- **Logging:** Custom ANSI-colored interactive terminal logger & request tracker

---

## 📂 Project Architecture

```
myupdatedportflo/
├── client/                     # Frontend React + Vite Web Application
│   ├── public/                 # Static assets & web manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin Dashboard & Auth Modals
│   │   │   ├── common/         # Icons, Navbar, Theme Toggles
│   │   │   └── public/         # Hero, About, Projects, Skills, Certs, Contact, Footer
│   │   ├── context/            # PortfolioContext (Global state & API synchronization)
│   │   ├── App.jsx             # Main router & modal controller
│   │   ├── index.css           # Global Design System, 3D Utilities, & Animations
│   │   └── main.jsx            # Application root entry point
│   ├── index.html              # SEO metadata, Open Graph, & JSON-LD schema
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Express REST API Server
│   ├── middleware/             # JWT auth & error handlers
│   ├── models/                 # Mongoose Schemas (Profile, Project, Skill, Cert, etc.)
│   ├── routes/                 # Express REST Endpoints
│   ├── utils/
│   │   ├── logger.js           # Stylish terminal banner & request logger
│   │   └── seeder.js           # Auto-seed database from mock datasets
│   ├── .env.example            # Environment variables template
│   ├── index.js                # Server entry point & MongoDB connection
│   └── package.json
│
├── images/                     # Project screenshots & profile portrait
├── assets/                     # Resume PDF, certifications, & documents
├── .gitignore                  # Git ignore protecting secrets & node_modules
├── package.json                # Root concurrent scripts
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18.x or higher) — [Download Node.js](https://nodejs.org/)
- **MongoDB Atlas Account** or local MongoDB instance — [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** installed on your machine

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/sahil-mern-portfolio.git
cd sahil-mern-portfolio
```

### 3. Install All Dependencies
```bash
# Installs dependencies for root, server, and client simultaneously
npm run install:all
```

### 4. Configure Environment Variables
Inside the `server/` directory, create a `.env` file (refer to `server/.env.example`):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfoliodb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_2026
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=YourSecurePassword123!
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 5. Start Full-Stack Development
Run both the Express backend and the Vite frontend concurrently:
```bash
npm run dev
```

- **Frontend Application:** `http://localhost:5173`
- **Backend REST API:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`

---

## 🔌 API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Public | Aggregates all profile, projects, skills, education, and certs |
| `GET` | `/api/projects` | Public | Retrieves all showcase projects with category filtering |
| `POST` | `/api/projects` | Admin | Creates a new project entry with tech tags & live URLs |
| `PUT` | `/api/projects/:id` | Admin | Updates an existing project |
| `DELETE` | `/api/projects/:id` | Admin | Removes a project from database |
| `GET` | `/api/skills` | Public | Returns complete technical arsenal by categories |
| `GET` | `/api/certifications`| Public | Returns 15+ verified credentials for 3D flip cards |
| `POST` | `/api/messages` | Public | Dispatches visitor contact inquiries with timestamp |
| `POST` | `/api/auth/login` | Public | Authenticates admin user and returns JWT token |
| `GET` | `/api/health` | Public | Returns server health, uptime, and database connection status |

---

## 🌐 Deployment Guide

### Deploying Backend (Render / Railway)
1. Push repository to GitHub.
2. In Render, create a new **Web Service** pointing to your repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Under **Environment Variables**, add `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CLIENT_URL`.

### Deploying Frontend (Vercel / Netlify)
1. In Vercel, import your repository.
2. Set **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy!

---

## 👨‍💻 Author

**Sahil Ramjan Pathan**
- **Role:** Full-Stack MERN Developer & B.Tech CSE Graduate (2026)
- **Specialization:** React.js, Node.js, Express.js, MongoDB Atlas, PostgreSQL, Spring Boot
- **Location:** Maharashtra, India
- **LinkedIn:** [linkedin.com/in/sahil-pathan-78b7a4290](https://www.linkedin.com/in/sahil-pathan-78b7a4290/)
- **GitHub:** [github.com/sahil0486](https://github.com/sahil0486)
- **Email:** [sahilpathan52004@gmail.com](mailto:sahilpathan52004@gmail.com)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by Sahil Ramjan Pathan • Released under the MIT License</sub>
</div>

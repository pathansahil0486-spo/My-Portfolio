import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import profileRoutes from './routes/profile.js';
import projectsRoutes from './routes/projects.js';
import experienceRoutes from './routes/experience.js';
import skillsRoutes from './routes/skills.js';
import educationRoutes from './routes/education.js';
import certificationsRoutes from './routes/certifications.js';
import publicationRoutes from './routes/publication.js';
import messagesRoutes from './routes/messages.js';

import { seedDatabase } from './utils/seeder.js';
import { printStartupBanner, requestLoggerMiddleware, logInfo, logSuccess, logError } from './utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Stylish HTTP Request Logging Middleware
app.use(requestLoggerMiddleware);

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for images and assets
app.use('/images', express.static(path.join(workspaceRoot, 'images')));
app.use('/assets', express.static(path.join(workspaceRoot, 'assets')));
app.use('/favicon.svg', express.static(path.join(workspaceRoot, 'favicon.svg')));
app.use('/robots.txt', express.static(path.join(workspaceRoot, 'robots.txt')));
app.use('/sitemap.xml', express.static(path.join(workspaceRoot, 'sitemap.xml')));
app.use('/googlefe3e1871dbe4e1f4.html', express.static(path.join(workspaceRoot, 'googlefe3e1871dbe4e1f4.html')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/messages', messagesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Sahil Pathan Portfolio Dynamic MERN API Server',
    status: 'Running',
    documentation: '/api/portfolio/all'
  });
});

// Connect to MongoDB Atlas and start server
const startServer = async () => {
  try {
    logInfo('Establishing secure TLS handshake with MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    logSuccess('MongoDB Atlas Cloud Cluster verified & authenticated!');

    // Seed database if needed
    await seedDatabase();

    const server = app.listen(PORT, () => {
      printStartupBanner({
        port: PORT,
        env: process.env.NODE_ENV || 'development',
        clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        logError(`Port ${PORT} is already in use by another running process.`);
        logInfo(`A portfolio backend instance is already active on http://localhost:${PORT}`);
      } else {
        logError('Server Error:', err.message);
      }
    });
  } catch (error) {
    logError('MongoDB Atlas Connection Failure:', error.message);
    process.exit(1);
  }
};

startServer();

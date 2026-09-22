import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Publication from '../models/Publication.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    console.log('🔄 Checking database seed status...');

    // 1. Admin User
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || 'sahilpathan52004@gmail.com';
      const password = process.env.ADMIN_PASSWORD || 'Admin@Sahil2026';
      await User.create({
        email,
        password,
        name: 'SAHIL RAMJAN PATHAN',
        role: 'admin'
      });
      console.log(`✅ Default admin created: ${email}`);
    }

    // 2. Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: 'SAHIL RAMJAN PATHAN',
        title: 'MERN Stack Developer | Full-Stack Web Developer',
        roles: [
          'MERN Stack Developer',
          'Full-Stack Web Developer',
          'React.js Specialist',
          'Node.js & Express Architect',
          'REST API & SaaS Architect'
        ],
        bio: 'B.Tech CSE graduate (2026) and MERN Stack Developer with production experience across React.js, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, Angular 19, and Spring Boot. Built and fully deployed Flashly Digital (live vendor-panel platform), and currently developing AcadPrime (multi-tenant College ERP SaaS). Published researcher in AI-driven interview systems (IJIRT, 2025).',
        about: 'Passionate MERN and Full Stack Developer focused on building scalable, reliable, and user-centric web applications. Proven track record of architecting robust backends, developing dynamic role-based dashboards, and delivering responsive modern user experiences.',
        email: 'sahilpathan52004@gmail.com',
        phone: '+91 9371960486',
        location: 'Tuljapur, Maharashtra, India',
        avatarUrl: '/images/mypimg.jpeg',
        resumeUrl: '/assets/Sahil_Ramjan_Pathan_Resume.pdf',
        socialLinks: {
          github: 'https://github.com/pathansahil0486-spo',
          linkedin: 'https://www.linkedin.com/in/sahil-pathan-394513261',
          portfolio: 'https://mrsahilpathanpersonalportfolio.netlify.app',
          twitter: '',
          instagram: ''
        },
        stats: {
          projectsCount: '100+',
          experienceYears: '2+',
          modulesBuilt: '20+',
          satisfiedClients: '15+'
        },
        status: {
          availableForHire: true,
          statusText: 'Available for full-time & high-impact projects'
        }
      });
      console.log('✅ Default Profile seeded');
    }

    // 3. Experiences
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          role: 'MERN Stack Developer Intern',
          company: 'Softgrid Info Pvt. Ltd.',
          location: 'Maharashtra, India',
          period: 'March 2026 – Present',
          isCurrent: true,
          type: 'Internship',
          bullets: [
            'Developing AcadPrime, a multi-tenant College ERP SaaS platform (MERN) with three role-based portals — SuperAdmin, College Admin & Student — covering Academic Management, Examination & Online Exams, Fees & Finance, Library, Hostel, Transport, HR & Payroll, Placement, and Training modules.',
            'Built the SuperAdmin console for multi-college subscription management, analytics, demo/contact request handling, and system-wide activity & API logs.',
            'Collaborating on REST API design, code reviews, and debugging with the engineering team.'
          ],
          techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC', 'REST APIs'],
          order: 1
        },
        {
          role: 'Backend Lead (Independent Project)',
          company: 'Multi-Vendor Bus Booking System',
          location: 'Remote',
          period: '2026 – Present',
          isCurrent: true,
          type: 'Project Lead',
          bullets: [
            'Own full backend from SRS: database schema, REST APIs, JWT/RBAC authentication, and booking/scheduling logic for Admin, Customer & Vendor panels.',
            'Architected transactional database structures with concurrency control for live seat booking.'
          ],
          techStack: ['Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'RBAC', 'Postman'],
          order: 2
        },
        {
          role: 'Python/DSA & Machine Learning Intern',
          company: 'YBI Foundation',
          location: 'Tuljapur, Maharashtra',
          period: '2023 – 2024',
          isCurrent: false,
          type: 'Internship',
          bullets: [
            'Built Python projects in DSA (sorting, searching, dynamic programming) and trained ML models for business analytics use cases.',
            'Developed algorithms for predictive analytics and data processing workflows.'
          ],
          techStack: ['Python', 'Machine Learning', 'DSA', 'NumPy', 'Pandas'],
          order: 3
        }
      ]);
      console.log('✅ Default Experiences seeded');
    }

    // 4. Projects: Read all 108+ parsed projects and flagship resume projects
    const currentProjectCount = await Project.countDocuments();
    if (currentProjectCount < 50) {
      console.log('📦 Seeding all 100+ projects from projects.html and resume...');
      await Project.deleteMany({}); // refresh with complete collection

      const flagshipProjects = [
        {
          title: 'Flashly Digital (Live Production Platform)',
          slug: 'flashly-digital',
          category: 'mern',
          shortDescription: 'MERN vendor-panel platform, fully built and deployed to production with store administration and customer portals.',
          fullDescription: 'Production-ready MERN vendor ecosystem enabling multi-vendor storefronts, catalog management, inventory control, and real-time order processing.',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Vercel', 'Render'],
          image: '/images/flashly.png',
          liveUrl: 'https://flashlydigital.com',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 1
        },
        {
          title: 'AcadPrime College ERP SaaS Platform',
          slug: 'acadprime-college-erp',
          category: 'mern',
          shortDescription: 'Multi-tenant College ERP SaaS with SuperAdmin, College Admin & Student portals covering 10+ core institutional modules.',
          fullDescription: 'Comprehensive College ERP system featuring Academic Management, Exams & Online Testing, Fees & Finance, Library, Hostel, Transport, HR & Payroll, Placement & Training.',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'RBAC'],
          image: '/images/erp.png',
          liveUrl: 'https://mrsahilpathanpersonalportfolio.netlify.app/projects.html',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 2
        },
        {
          title: 'JeevanSathiHub Matrimony Platform',
          slug: 'jeevansathihub',
          category: 'mern',
          shortDescription: 'Matrimony platform with Admin & User panels, dynamic profile recommendation filters, authentication & RBAC.',
          fullDescription: 'Full-stack MERN matrimony application with profile verification, interest requests, match criteria filters, and an administrative management panel.',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'RBAC', 'JWT'],
          image: '/images/spfammas.png',
          liveUrl: 'https://mrsahilpathanpersonalportfolio.netlify.app/projects.html',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 3
        },
        {
          title: 'SMART AI-Powered Interview Platform',
          slug: 'smart-ai-interview-platform',
          category: 'ai-ml',
          shortDescription: 'ML/NLP-driven mock interview simulation and instant performance feedback platform; published in IJIRT (2025).',
          fullDescription: 'An innovative AI interview prep platform that evaluates candidate spoken and technical responses in real-time using natural language processing and semantic score scoring.',
          technologies: ['React.js', 'Node.js', 'Express.js', 'Python / ML', 'NLP', 'MongoDB Atlas'],
          image: '/images/ai-interview.png',
          liveUrl: 'https://smart-interviewai-frontend.vercel.app',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 4
        },
        {
          title: 'Saffron OTT Streaming Platform',
          slug: 'saffron-ott-platform',
          category: 'mern',
          shortDescription: 'Full-stack media streaming web app with Clerk Auth, custom video player, categories, and watchlist management.',
          fullDescription: 'High-performance video streaming web application featuring user playlists, search, categorized movies/series, and Clerk authentication.',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Clerk Auth'],
          image: '/images/saffron.png',
          liveUrl: 'https://saffron-ott-frontend.vercel.app/',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 5
        },
        {
          title: 'Solu Official Brand & E-Commerce',
          slug: 'solu-official-brand',
          category: 'fullstack',
          shortDescription: 'Modern brand storefront with Firebase Auth, MySQL/Node.js backend, product catalog, and Netlify deployment.',
          fullDescription: 'Fast, responsive corporate ecommerce brand portal with cart, product showcase, and multi-tier user authentication.',
          technologies: ['React', 'Vite', 'TypeScript', 'Node.js', 'Firebase', 'MySQL'],
          image: '/images/soluOW.png',
          liveUrl: 'https://soluofficial.netlify.app/',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 6
        },
        {
          title: 'Multi-Vendor Bus Booking System Backend',
          slug: 'multi-vendor-bus-booking',
          category: 'mern',
          shortDescription: 'Scalable multi-panel booking engine with concurrency seat reservation, route scheduling, and JWT/RBAC.',
          fullDescription: 'Independent backend architecture built from comprehensive SRS with three role portals: SuperAdmin, Vendors, and End-Users.',
          technologies: ['Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'RBAC', 'Postman'],
          image: '/images/spcarbooks.png',
          liveUrl: 'https://mrsahilpathanpersonalportfolio.netlify.app/projects.html',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 7
        },
        {
          title: 'Enterprise School Management System',
          slug: 'school-management-system',
          category: 'fullstack',
          shortDescription: 'Angular 19 + Spring Boot + MySQL institutional management system with RBAC for faculty, admin, and students.',
          fullDescription: 'Robust enterprise educational portal providing student grading, attendance tracking, and faculty department management.',
          technologies: ['Angular 19', 'Spring Boot', 'MySQL', 'Java', 'REST APIs'],
          image: '/images/sms.png',
          liveUrl: 'https://mrsahilpathanpersonalportfolio.netlify.app/projects.html',
          githubUrl: 'https://github.com/pathansahil0486-spo',
          featured: true,
          order: 8
        }
      ];

      // Read parsed projects
      const parsedPath = path.join(__dirname, 'all_parsed_projects.json');
      let parsedProjects = [];
      if (fs.existsSync(parsedPath)) {
        parsedProjects = JSON.parse(fs.readFileSync(parsedPath, 'utf8'));
      }

      const existingTitles = new Set(flagshipProjects.map((p) => p.title.toLowerCase()));
      const combinedProjects = [...flagshipProjects];

      let orderCounter = 9;
      for (const p of parsedProjects) {
        if (!existingTitles.has(p.title.toLowerCase())) {
          existingTitles.add(p.title.toLowerCase());
          combinedProjects.push({
            ...p,
            order: orderCounter++
          });
        }
      }

      await Project.insertMany(combinedProjects);
      console.log(`✅ Inserted ${combinedProjects.length} projects into MongoDB Atlas!`);
    }

    // 5. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        { name: 'React.js', category: 'Frontend', level: 95, order: 1, featured: true },
        { name: 'Angular 19', category: 'Frontend', level: 85, order: 2, featured: true },
        { name: 'JavaScript (ES6+)', category: 'Languages', level: 95, order: 3, featured: true },
        { name: 'TypeScript', category: 'Languages', level: 88, order: 4, featured: true },
        { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, order: 5, featured: true },
        { name: 'Redux / State Management', category: 'Frontend', level: 88, order: 6, featured: true },
        { name: 'Node.js', category: 'Backend', level: 95, order: 7, featured: true },
        { name: 'Express.js', category: 'Backend', level: 95, order: 8, featured: true },
        { name: 'Spring Boot', category: 'Backend', level: 85, order: 9, featured: true },
        { name: 'REST API Design & MVC', category: 'Backend', level: 95, order: 10, featured: true },
        { name: 'JWT & RBAC Auth', category: 'Backend', level: 95, order: 11, featured: true },
        { name: 'MongoDB & Atlas', category: 'Database', level: 95, order: 12, featured: true },
        { name: 'MySQL', category: 'Database', level: 88, order: 13, featured: true },
        { name: 'PostgreSQL', category: 'Database', level: 85, order: 14, featured: true },
        { name: 'Firebase', category: 'Database', level: 85, order: 15, featured: false },
        { name: 'Java', category: 'Languages', level: 88, order: 16, featured: true },
        { name: 'Python', category: 'Languages', level: 85, order: 17, featured: true },
        { name: 'C++ / C', category: 'Languages', level: 80, order: 18, featured: false },
        { name: 'Git & GitHub', category: 'Tools & Auth', level: 92, order: 19, featured: true },
        { name: 'Postman', category: 'Tools & Auth', level: 92, order: 20, featured: true },
        { name: 'Vercel & Render', category: 'Tools & Auth', level: 90, order: 21, featured: true },
        { name: 'Clerk Auth', category: 'Tools & Auth', level: 88, order: 22, featured: true }
      ]);
      console.log('✅ Skills seeded');
    }

    // 6. Education
    const eduCount = await Education.countDocuments();
    if (eduCount < 3) {
      await Education.deleteMany({});
      await Education.insertMany([
        {
          degree: 'B.Tech, Computer Science & Engineering',
          institution: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
          location: 'Maharashtra, India',
          period: '2021 – 2026',
          score: 'B.Tech CSE Graduate',
          details: 'Specialization in Full Stack Web Development, Cloud Architectures, Distributed Databases, and Artificial Intelligence.',
          order: 1
        },
        {
          degree: 'Higher Secondary Certificate (HSC - Science)',
          institution: 'Ramkrushna Paramhansa Mahavidyalaya, Dharashiv',
          location: 'Maharashtra, India',
          period: '2020 – 2022',
          score: '71.17%',
          details: 'Focus on Physics, Chemistry, Mathematics and Computer Science.',
          order: 2
        },
        {
          degree: 'Secondary School Certificate (SSC - 10th)',
          institution: 'Rajarshi Shahu Vidyalaya Gour',
          location: 'Maharashtra, India',
          period: '2019 – 2020',
          score: '89.60%',
          details: 'Passed with high distinction in Mathematics, Science and Technology.',
          order: 3
        }
      ]);
      console.log('✅ Education records seeded');
    }

    // 7. Verified Certifications with direct links
    const certCount = await Certification.countDocuments();
    if (certCount < 10) {
      await Certification.deleteMany({});
      await Certification.insertMany([
        {
          title: 'Frontend Development',
          issuer: 'OneRoadmap — CERT-F618D173',
          credentialUrl: 'https://oneroadmap.io/skills/frontend/certificate/CERT-F618D173',
          skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
          order: 1
        },
        {
          title: 'Full Stack Development',
          issuer: 'OneRoadmap — CERT-CDC7092E',
          credentialUrl: 'https://oneroadmap.io/skills/fs/certificate/CERT-CDC7092E',
          skills: ['MERN Stack', 'Node.js', 'Express', 'React', 'MongoDB'],
          order: 2
        },
        {
          title: 'SQL & Databases',
          issuer: 'OneRoadmap — CERT-A00AD3ED',
          credentialUrl: 'https://oneroadmap.io/skills/sql/certificate/CERT-A00AD3ED',
          skills: ['SQL', 'Relational DB', 'MySQL', 'Database Architecture'],
          order: 3
        },
        {
          title: 'CSS Mastery',
          issuer: 'OneRoadmap — CERT-97622526',
          credentialUrl: 'https://oneroadmap.io/skills/css/certificate/CERT-97622526',
          skills: ['Flexbox', 'CSS Grid', 'Animations', 'Glassmorphism'],
          order: 4
        },
        {
          title: 'Professional English',
          issuer: 'OneRoadmap — CERT-5E6693F3',
          credentialUrl: 'https://oneroadmap.io/skills/english/certificate/CERT-5E6693F3',
          skills: ['Business Communication', 'Technical Documentation'],
          order: 5
        },
        {
          title: 'Node.js Development',
          issuer: 'OneRoadmap — CERT-19EE24CA',
          credentialUrl: 'https://oneroadmap.io/skills/node/certificate/CERT-19EE24CA',
          skills: ['REST APIs', 'Backend Architecture', 'Event Loop', 'Express'],
          order: 6
        },
        {
          title: 'React.js Development',
          issuer: 'OneRoadmap — CERT-AE0720A8',
          credentialUrl: 'https://oneroadmap.io/skills/react/certificate/CERT-AE0720A8',
          skills: ['React Hooks', 'State Management', 'Components', 'Vite'],
          order: 7
        },
        {
          title: 'Python with DSA',
          issuer: 'YBI Foundation',
          credentialUrl: '',
          skills: ['Python', 'DSA', 'Algorithms', 'Problem Solving'],
          order: 8
        },
        {
          title: 'Java Fullstack Development',
          issuer: 'Professional Training',
          credentialUrl: '',
          skills: ['Core Java', 'Spring Boot', 'JDBC', 'MVC'],
          order: 9
        },
        {
          title: 'IoT & Arduino UNO Workshop',
          issuer: 'MKCL',
          credentialUrl: '',
          skills: ['Microcontrollers', 'Embedded Systems', 'Arduino C'],
          order: 10
        },
        {
          title: 'Build a Website with WordPress',
          issuer: 'Coursera',
          credentialUrl: '',
          skills: ['CMS', 'Web Design', 'Hosting'],
          order: 11
        },
        {
          title: 'Microsoft Excel Professional',
          issuer: 'Coursera',
          credentialUrl: '',
          skills: ['Data Analysis', 'Formulas', 'Reporting'],
          order: 12
        },
        {
          title: 'B10x AI Tools Certification',
          issuer: 'B10x',
          credentialUrl: '',
          skills: ['Generative AI', 'Prompt Engineering', 'Productivity'],
          order: 13
        },
        {
          title: 'C++ Programming Certification',
          issuer: 'Adhyayan',
          credentialUrl: '',
          skills: ['OOPs', 'Data Structures', 'Pointers'],
          order: 14
        },
        {
          title: 'C Programming – KLiC',
          issuer: 'MKCL',
          credentialUrl: '',
          skills: ['Structured Programming', 'Memory Management'],
          order: 15
        }
      ]);
      console.log('✅ All Verified Certifications seeded');
    }

    // 8. Publication
    const pubCount = await Publication.countDocuments();
    if (pubCount === 0) {
      await Publication.create({
        title: 'AI-Powered Interview Training and Preparation Platform',
        journal: 'International Journal of Innovative Research in Technology (IJIRT)',
        date: 'Nov 2025',
        link: 'https://ijirt.org',
        description: 'Published scientific research in AI-driven interview simulation and automated feedback systems using Machine Learning & Natural Language Processing.'
      });
      console.log('✅ Publication seeded');
    }

    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeder Error:', error);
  }
};

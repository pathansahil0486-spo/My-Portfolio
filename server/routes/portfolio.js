import express from 'express';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Publication from '../models/Publication.js';

const router = express.Router();

// @route   GET /api/portfolio/all
// @desc    Get all public portfolio data in a single fast call
router.get('/all', async (req, res) => {
  try {
    const [profile, projects, experiences, skills, education, certifications, publication] = await Promise.all([
      Profile.findOne(),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Skill.find().sort({ order: 1, level: -1 }),
      Education.find().sort({ order: 1 }),
      Certification.find().sort({ order: 1 }),
      Publication.findOne()
    ]);

    res.json({
      profile: profile || {},
      projects: projects || [],
      experiences: experiences || [],
      skills: skills || [],
      education: education || [],
      certifications: certifications || [],
      publication: publication || {}
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving portfolio data', error: error.message });
  }
});

export default router;

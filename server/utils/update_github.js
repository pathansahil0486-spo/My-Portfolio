import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function updateGithubLinks() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // 1. Update Profile
    const profile = await Profile.findOne();
    if (profile) {
      if (!profile.socialLinks) profile.socialLinks = {};
      profile.socialLinks.github = 'https://github.com/pathansahil0486-spo';
      await profile.save();
      console.log('Updated Profile socialLinks.github to:', profile.socialLinks.github);
    } else {
      console.log('No profile found to update!');
    }

    // 2. Update Projects that have spcoder0486-leg in githubUrl
    const projectsWithOldGithub = await Project.find({
      githubUrl: { $regex: 'spcoder0486-leg', $options: 'i' }
    });
    console.log(`Found ${projectsWithOldGithub.length} projects with old github username.`);

    for (const proj of projectsWithOldGithub) {
      proj.githubUrl = proj.githubUrl.replace(/spcoder0486-leg/gi, 'pathansahil0486-spo');
      await proj.save();
    }
    console.log(`Updated ${projectsWithOldGithub.length} projects to pathansahil0486-spo.`);

    // Also update any project whose githubUrl is empty or placeholder to user profile
    const emptyGithubProjects = await Project.find({
      $or: [{ githubUrl: '' }, { githubUrl: { $exists: false } }, { githubUrl: null }]
    });
    console.log(`Found ${emptyGithubProjects.length} projects with empty githubUrl.`);

    console.log('All updates complete!');
  } catch (err) {
    console.error('Error updating github links:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

updateGithubLinks();

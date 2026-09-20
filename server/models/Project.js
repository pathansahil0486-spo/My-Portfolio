import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['all', 'mern', 'fullstack', 'frontend', 'react', 'tools', 'ai-ml', 'mobile', 'other'],
    default: 'mern'
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    default: ''
  },
  technologies: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: '/images/saffron.png'
  },
  liveUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  highlights: {
    type: [String],
    default: []
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

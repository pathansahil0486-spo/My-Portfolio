import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  companyUrl: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Remote'
  },
  period: {
    type: String,
    required: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'Internship' // Internship, Full-time, Freelance, Project
  },
  bullets: {
    type: [String],
    default: []
  },
  techStack: {
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

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;

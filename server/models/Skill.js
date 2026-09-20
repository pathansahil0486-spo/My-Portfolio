import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Languages', 'Tools & Auth', 'Cloud & Deployment', 'Other'],
    default: 'Frontend'
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  icon: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;

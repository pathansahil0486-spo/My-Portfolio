import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Maharashtra, India'
  },
  period: {
    type: String,
    required: true
  },
  score: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Education = mongoose.model('Education', educationSchema);
export default Education;

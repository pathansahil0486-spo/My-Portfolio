import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  skills: {
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

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;

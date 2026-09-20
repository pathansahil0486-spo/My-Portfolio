import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'AI-Powered Interview Training and Preparation Platform'
  },
  journal: {
    type: String,
    required: true,
    default: 'International Journal of Innovative Research in Technology (IJIRT)'
  },
  date: {
    type: String,
    default: 'Nov 2025'
  },
  link: {
    type: String,
    default: 'https://ijirt.org'
  },
  description: {
    type: String,
    default: 'Published researcher in AI-driven interview systems. Research paper focusing on ML/NLP-driven mock interview simulation and instant performance feedback.'
  }
}, {
  timestamps: true
});

const Publication = mongoose.model('Publication', publicationSchema);
export default Publication;

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'SAHIL RAMJAN PATHAN'
  },
  title: {
    type: String,
    required: true,
    default: 'MERN Stack Developer | Full-Stack Web Developer'
  },
  roles: {
    type: [String],
    default: ['MERN Stack Developer', 'Full-Stack Web Developer', 'React.js Specialist', 'Node.js & Express Architect', 'Software Engineer']
  },
  bio: {
    type: String,
    default: 'B.Tech CSE graduate (2026) and MERN Stack Developer with production experience across React.js, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, Angular 19, and Spring Boot. Built and fully deployed Flashly Digital (live vendor-panel platform) and currently developing AcadPrime (multi-tenant College ERP SaaS). Published researcher in AI-driven interview systems (IJIRT, 2025).'
  },
  about: {
    type: String,
    default: 'Passionate MERN and Full Stack Developer focused on building scalable, reliable, and user-centric web applications. Proven track record of architecting robust backends, developing dynamic role-based dashboards, and delivering responsive modern user experiences.'
  },
  email: {
    type: String,
    default: 'sahilpathan52004@gmail.com'
  },
  phone: {
    type: String,
    default: '+91 9371960486'
  },
  location: {
    type: String,
    default: 'Tuljapur, Maharashtra, India'
  },
  avatarUrl: {
    type: String,
    default: '/images/mypimg.jpeg'
  },
  resumeUrl: {
    type: String,
    default: '/assets/Sahil_Ramjan_Pathan_Resume.pdf'
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com/spcoder0486-leg' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/sahil-pathan-394513261' },
    portfolio: { type: String, default: 'https://mrsahilpathanpersonalportfolio.netlify.app' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  stats: {
    projectsCount: { type: String, default: '80+' },
    experienceYears: { type: String, default: '2+' },
    modulesBuilt: { type: String, default: '20+' },
    satisfiedClients: { type: String, default: '15+' }
  },
  status: {
    availableForHire: { type: Boolean, default: true },
    statusText: { type: String, default: 'Available for full-time & high-impact projects' }
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;

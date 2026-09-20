import React, { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Cpu,
  GraduationCap,
  MessageSquare,
  KeyRound,
  ExternalLink,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  X,
  Star,
  Mail,
  Calendar,
  Layers,
  Terminal,
  ShieldCheck,
  Code2,
  Search,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Award,
  Menu,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminDashboard = () => {
  const [showPwdCurrent, setShowPwdCurrent] = useState(false);
  const [showPwdNew, setShowPwdNew] = useState(false);
  const { data, refetchPortfolio, adminToken, logoutAdmin, navigateTo, showToast } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Centered Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger',
    icon: 'trash',
    onConfirm: null
  });

  const requestConfirm = ({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', icon = 'trash', onConfirm }) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      type,
      icon,
      onConfirm
    });
  };

  const handleLogoutClick = () => {
    requestConfirm({
      title: 'Sign Out Confirmation',
      message: 'Are you sure you want to sign out from the Admin Control Center?',
      confirmText: 'Yes, Sign Out',
      cancelText: 'Stay Logged In',
      type: 'danger',
      icon: 'logout',
      onConfirm: () => {
        logoutAdmin();
      }
    });
  };

  // Messages state
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({});

  // Project Edit/Create state
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    category: 'mern',
    shortDescription: '',
    fullDescription: '',
    technologies: '',
    image: '/images/saffron.png',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    order: 0
  });

  // Projects table search & pagination
  const [projectSearch, setProjectSearch] = useState('');
  const [projectPage, setProjectPage] = useState(1);
  const projectsPerPage = 15;

  // Experience Edit/Create state
  const [editingExp, setEditingExp] = useState(null);
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    isCurrent: false,
    type: 'Internship',
    bullets: '',
    techStack: '',
    order: 0
  });

  // Skill Edit/Create state
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 85,
    order: 0
  });

  // Education Edit/Create state
  const [editingEdu, setEditingEdu] = useState(null);
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    location: 'Maharashtra, India',
    period: '',
    score: '',
    details: '',
    order: 0
  });

  // Certifications Edit/Create state
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    credentialUrl: '',
    skills: '',
    order: 0
  });

  // Password state
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '' });

  // Popular sample image assets available in workspace
  const workspaceImages = [
    { label: 'Saffron OTT', path: '/images/saffron.png' },
    { label: 'Solu Official', path: '/images/soluOW.png' },
    { label: 'Flashly / Shops', path: '/images/byp-shops.png' },
    { label: 'AI Interview', path: '/images/ai-interview.png' },
    { label: 'TaskFlow', path: '/images/taskflow.png' },
    { label: 'Hotel Diamond', path: '/images/hotel.png' },
    { label: 'School Management', path: '/images/sms.png' },
    { label: 'AcadPrime ERP', path: '/images/spgrandschool.png' },
    { label: 'JeevanSathiHub', path: '/images/spfammas.png' },
    { label: 'Bus Booking', path: '/images/spcarbooks.png' },
    { label: 'Profile Photo', path: '/images/mypimg.jpeg' }
  ];

  // Sync profile form from data
  useEffect(() => {
    if (data.profile) {
      setProfileForm({
        name: data.profile.name || '',
        title: data.profile.title || '',
        roles: data.profile.roles ? data.profile.roles.join(', ') : '',
        bio: data.profile.bio || '',
        about: data.profile.about || '',
        email: data.profile.email || '',
        phone: data.profile.phone || '',
        location: data.profile.location || '',
        avatarUrl: data.profile.avatarUrl || '',
        resumeUrl: data.profile.resumeUrl || '',
        github: data.profile.socialLinks?.github || '',
        linkedin: data.profile.socialLinks?.linkedin || '',
        portfolio: data.profile.socialLinks?.portfolio || '',
        projectsCount: data.profile.stats?.projectsCount || '100+',
        experienceYears: data.profile.stats?.experienceYears || '2+',
        modulesBuilt: data.profile.stats?.modulesBuilt || '20+',
        statusText: data.profile.status?.statusText || 'Available for full-time & high-impact projects'
      });
    }
  }, [data.profile]);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch('/api/messages', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const json = await res.json();
      setMessages(json.messages || []);
      setUnreadCount(json.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchMessages();
    }
  }, [adminToken]);

  // Filtered & Paginated Projects
  const filteredProjects = useMemo(() => {
    const list = data.projects || [];
    const query = projectSearch.toLowerCase().trim();
    if (!query) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(query)))
    );
  }, [data.projects, projectSearch]);

  const totalProjectPages = Math.ceil(filteredProjects.length / projectsPerPage) || 1;
  const currentProjectsSlice = filteredProjects.slice(
    (projectPage - 1) * projectsPerPage,
    projectPage * projectsPerPage
  );

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: profileForm.name,
        title: profileForm.title,
        roles: profileForm.roles.split(',').map((s) => s.trim()).filter(Boolean),
        bio: profileForm.bio,
        about: profileForm.about,
        email: profileForm.email,
        phone: profileForm.phone,
        location: profileForm.location,
        avatarUrl: profileForm.avatarUrl,
        resumeUrl: profileForm.resumeUrl,
        socialLinks: {
          github: profileForm.github,
          linkedin: profileForm.linkedin,
          portfolio: profileForm.portfolio
        },
        stats: {
          projectsCount: profileForm.projectsCount,
          experienceYears: profileForm.experienceYears,
          modulesBuilt: profileForm.modulesBuilt
        },
        status: {
          availableForHire: true,
          statusText: profileForm.statusText
        }
      };

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to update profile');
      await refetchPortfolio();
      showToast('Profile updated live in MongoDB Atlas!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Projects CRUD
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        technologies: typeof projectForm.technologies === 'string'
          ? projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : projectForm.technologies,
        order: Number(projectForm.order) || 0
      };

      const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save project');
      await refetchPortfolio();
      showToast(editingProject ? 'Project updated!' : 'New project added!', 'success');
      setEditingProject(null);
      setProjectForm({
        title: '',
        slug: '',
        category: 'mern',
        shortDescription: '',
        fullDescription: '',
        technologies: '',
        image: '/images/saffron.png',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        order: 0
      });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = (id, title) => {
    requestConfirm({
      title: 'Delete Project Confirmation',
      message: `Are you sure you want to permanently delete "${title || 'this project'}"? This action will remove it from MongoDB Atlas and your live portfolio.`,
      confirmText: 'Yes, Delete Project',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (!res.ok) throw new Error('Failed to delete project');
          await refetchPortfolio();
          showToast('Project deleted successfully', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  const handleEditProjectClick = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'mern',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      image: project.image || '/images/saffron.png',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: Boolean(project.featured),
      order: project.order || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Experience CRUD
  const handleSaveExp = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...expForm,
        bullets: typeof expForm.bullets === 'string'
          ? expForm.bullets.split('\n').map((b) => b.trim()).filter(Boolean)
          : expForm.bullets,
        techStack: typeof expForm.techStack === 'string'
          ? expForm.techStack.split(',').map((t) => t.trim()).filter(Boolean)
          : expForm.techStack,
        order: Number(expForm.order) || 0
      };

      const url = editingExp ? `/api/experience/${editingExp._id}` : '/api/experience';
      const method = editingExp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save experience');
      await refetchPortfolio();
      showToast('Experience saved successfully!', 'success');
      setEditingExp(null);
      setExpForm({
        role: '',
        company: '',
        location: '',
        period: '',
        isCurrent: false,
        type: 'Internship',
        bullets: '',
        techStack: '',
        order: 0
      });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteExp = (id, role, company) => {
    requestConfirm({
      title: 'Delete Experience Confirmation',
      message: `Are you sure you want to delete experience "${role || 'Role'} at ${company || 'Company'}"?`,
      confirmText: 'Yes, Delete Record',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/experience/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (!res.ok) throw new Error('Failed to delete');
          await refetchPortfolio();
          showToast('Experience deleted', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // Skills CRUD
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...skillForm,
        level: Number(skillForm.level) || 85,
        order: Number(skillForm.order) || 0
      };
      const url = editingSkill ? `/api/skills/${editingSkill._id}` : '/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save skill');
      await refetchPortfolio();
      showToast('Skill saved!', 'success');
      setEditingSkill(null);
      setSkillForm({ name: '', category: 'Frontend', level: 85, order: 0 });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteSkill = (id, name) => {
    requestConfirm({
      title: 'Delete Skill Confirmation',
      message: `Are you sure you want to delete skill "${name || 'this skill'}" from your skills matrix?`,
      confirmText: 'Yes, Delete Skill',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          await fetch(`/api/skills/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          await refetchPortfolio();
          showToast('Skill removed', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // Education CRUD
  const handleSaveEdu = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...eduForm, order: Number(eduForm.order) || 0 };
      const url = editingEdu ? `/api/education/${editingEdu._id}` : '/api/education';
      const method = editingEdu ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save education');
      await refetchPortfolio();
      showToast('Education saved!', 'success');
      setEditingEdu(null);
      setEduForm({ degree: '', institution: '', location: 'Maharashtra, India', period: '', score: '', details: '', order: 0 });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteEdu = (id, degree) => {
    requestConfirm({
      title: 'Delete Education Confirmation',
      message: `Are you sure you want to delete education record "${degree || 'this education record'}"?`,
      confirmText: 'Yes, Delete Record',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          await fetch(`/api/education/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminToken}` } });
          await refetchPortfolio();
          showToast('Education record deleted', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // Certifications CRUD
  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...certForm,
        skills: typeof certForm.skills === 'string'
          ? certForm.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : certForm.skills,
        order: Number(certForm.order) || 0
      };
      const url = editingCert ? `/api/certifications/${editingCert._id}` : '/api/certifications';
      const method = editingCert ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save certificate');
      await refetchPortfolio();
      showToast('Certificate saved!', 'success');
      setEditingCert(null);
      setCertForm({ title: '', issuer: '', credentialUrl: '', skills: '', order: 0 });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCert = (id, title) => {
    requestConfirm({
      title: 'Delete Certificate Confirmation',
      message: `Are you sure you want to delete certificate "${title || 'this certificate'}"?`,
      confirmText: 'Yes, Delete Certificate',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          await fetch(`/api/certifications/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminToken}` } });
          await refetchPortfolio();
          showToast('Certificate deleted', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // Messages Actions
  const handleToggleMessageRead = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (!res.ok) throw new Error('Failed to toggle status');
      fetchMessages();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteMessage = (id, name) => {
    requestConfirm({
      title: 'Delete Message Confirmation',
      message: `Are you sure you want to permanently delete the inquiry message from "${name || 'this sender'}"?`,
      confirmText: 'Yes, Delete Message',
      type: 'danger',
      icon: 'trash',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/messages/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (!res.ok) throw new Error('Failed to delete message');
          fetchMessages();
          showToast('Message deleted', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  };

  // Password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(pwdForm)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update password');
      showToast('Admin password updated successfully!', 'success');
      setPwdForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="admin-app-layout">
      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Terminal size={18} />
          </div>
          <div>
            <h1 className="admin-brand-title">Control Center &bull; Sahil Pathan</h1>
          </div>
        </div>

        {/* Dynamic Admin Profile Display */}
        <div className="admin-profile-widget">
          <div className="admin-avatar-wrap">
            <img
              src={data.profile?.avatarUrl || '/images/mypimg.jpeg'}
              alt={data.profile?.name || 'Admin'}
              className="admin-header-photo"
              onError={(e) => { e.target.src = '/images/mypimg.jpeg'; }}
            />
            <span className="admin-online-dot" title="Admin Active"></span>
          </div>
          <div className="admin-info-text">
            <span className="admin-profile-name">{data.profile?.name || 'SAHIL RAMJAN PATHAN'}</span>
            <span className="admin-profile-role">SuperAdmin &bull; Full-Stack MERN</span>
          </div>
        </div>

        <div className="admin-topbar-actions">
          <button
            onClick={() => navigateTo('home')}
            className="btn btn-secondary btn-sm admin-live-link"
            title="Open Live Portfolio Website"
          >
            <ExternalLink size={15} />
            <span>Live Portfolio</span>
          </button>

          <button onClick={handleLogoutClick} className="btn btn-secondary btn-sm logout-btn admin-logout-btn" title="Sign out of Dashboard">
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-admin-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Admin Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-admin-overlay" onClick={() => setMobileMenuOpen(false)}>
          <aside className="mobile-admin-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="admin-brand-icon">
                <Terminal size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Admin Menu</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MERN Control Center</span>
              </div>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Drawer"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <button
                className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
              >
                <User size={18} />
                <span>Hero & Profile</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              >
                <FolderGit2 size={18} />
                <span>Projects ({data.projects?.length || 0})</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => { setActiveTab('experience'); setMobileMenuOpen(false); }}
              >
                <Briefcase size={18} />
                <span>Work Experience</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => { setActiveTab('skills'); setMobileMenuOpen(false); }}
              >
                <Cpu size={18} />
                <span>Technical Skills</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => { setActiveTab('education'); setMobileMenuOpen(false); }}
              >
                <GraduationCap size={18} />
                <span>Education & Certs</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('messages');
                  setMobileMenuOpen(false);
                  fetchMessages();
                }}
              >
                <MessageSquare size={18} />
                <span>Inquiries</span>
                {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => { setActiveTab('security'); setMobileMenuOpen(false); }}
              >
                <KeyRound size={18} />
                <span>Security</span>
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.6rem' }}
              >
                <ExternalLink size={15} />
                <span>Live Portfolio Website</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogoutClick(); }}
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LogOut size={15} />
                <span>Sign Out of Admin</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="admin-main-container">
        
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <button
            className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Hero & Profile</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={18} />
            <span>Projects ({data.projects?.length || 0})</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={18} />
            <span>Experience</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Cpu size={18} />
            <span>Skills Matrix</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <GraduationCap size={18} />
            <span>Education & Certs</span>
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('messages');
              fetchMessages();
            }}
          >
            <MessageSquare size={18} />
            <span>Inquiries</span>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </button>

          <button
            className={`sidebar-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <KeyRound size={18} />
            <span>Security</span>
          </button>

          <button
            type="button"
            className="sidebar-nav-btn logout-sidebar-btn"
            onClick={handleLogoutClick}
            style={{ marginTop: 'auto', color: '#ef4444' }}
            title="Sign out of Dashboard"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="admin-content-pane">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Dashboard Metrics & Realtime Status</h2>
              
              <div className="overview-cards-grid">
                <div className="glass-panel stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Total Projects</span>
                    <FolderGit2 className="stat-icon" size={22} />
                  </div>
                  <div className="stat-value">{data.projects?.length || 0}</div>
                  <div className="stat-sub">
                    {data.projects?.filter((p) => p.featured).length || 0} Flagship Featured
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Inbound Inquiries</span>
                    <MessageSquare className="stat-icon" size={22} />
                  </div>
                  <div className="stat-value">{messages.length}</div>
                  <div className="stat-sub">
                    {unreadCount > 0 ? `${unreadCount} unread inquiries` : 'All caught up!'}
                  </div>
                </div>

                <div className="glass-panel stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Technical Skills</span>
                    <Cpu className="stat-icon" size={22} />
                  </div>
                  <div className="stat-value">{data.skills?.length || 0}</div>
                  <div className="stat-sub">Frontend, Backend, DB, Cloud</div>
                </div>

                <div className="glass-panel stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Verified Certs</span>
                    <Award className="stat-icon" size={22} />
                  </div>
                  <div className="stat-value">{data.certifications?.length || 0}</div>
                  <div className="stat-sub">OneRoadmap, MKCL, Coursera</div>
                </div>
              </div>

              <div className="quick-actions-panel glass-panel">
                <h3>Direct Quick Actions</h3>
                <p>Every change you make in this dashboard immediately writes to your live MongoDB Atlas cloud database and syncs instantly to your portfolio.</p>
                <div className="action-buttons-group">
                  <button onClick={() => setActiveTab('projects')} className="btn btn-primary btn-sm">
                    <Plus size={15} /> Add / Edit Projects ({data.projects?.length || 0})
                  </button>
                  <button onClick={() => setActiveTab('profile')} className="btn btn-secondary btn-sm">
                    <Edit size={15} /> Edit Hero & Resume Link
                  </button>
                  <button onClick={() => setActiveTab('education')} className="btn btn-secondary btn-sm">
                    <Award size={15} /> Manage Certificates & Links
                  </button>
                  <button onClick={() => setActiveTab('messages')} className="btn btn-secondary btn-sm">
                    <Mail size={15} /> View Contact Messages
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & HERO */}
          {activeTab === 'profile' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Hero, Bio & Contact Settings</h2>
              
              <form onSubmit={handleSaveProfile} className="glass-panel form-card">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Display Name</label>
                    <input
                      type="text"
                      value={profileForm.name || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Main Job Title</label>
                    <input
                      type="text"
                      value={profileForm.title || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Animated Typing Roles (Comma separated)</label>
                  <input
                    type="text"
                    value={profileForm.roles || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, roles: e.target.value })}
                    className="admin-form-input"
                  />
                  <small className="help-text">e.g. MERN Stack Developer, Full-Stack Web Developer, React & Node Specialist</small>
                </div>

                <div className="form-group">
                  <label>Hero Elevator Pitch</label>
                  <textarea
                    rows="3"
                    value={profileForm.bio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>About Me Section Detailed Story</label>
                  <textarea
                    rows="4"
                    value={profileForm.about || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      value={profileForm.email || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={profileForm.phone || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Base Location</label>
                    <input
                      type="text"
                      value={profileForm.location || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Resume Download URL / PDF Link</label>
                    <input
                      type="text"
                      value={profileForm.resumeUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Profile Avatar Image URL</label>
                    <div className="image-input-with-preview">
                      <input
                        type="text"
                        value={profileForm.avatarUrl || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        className="admin-form-input"
                      />
                      {profileForm.avatarUrl && (
                        <img src={profileForm.avatarUrl} alt="Preview" className="inline-img-preview" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                      type="text"
                      value={profileForm.github || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                      type="text"
                      value={profileForm.linkedin || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Status Badge</label>
                    <input
                      type="text"
                      value={profileForm.statusText || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, statusText: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <Save size={18} /> Save & Publish Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="admin-view-section">
              <div className="section-title-row">
                <h2 className="view-heading">
                  {editingProject ? `Edit Project: ${editingProject.title}` : `Projects Management (${data.projects?.length || 0} Total)`}
                </h2>
                {editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        title: '',
                        slug: '',
                        category: 'mern',
                        shortDescription: '',
                        fullDescription: '',
                        technologies: '',
                        image: '/images/saffron.png',
                        liveUrl: '',
                        githubUrl: '',
                        featured: false,
                        order: 0
                      });
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel Editing & Add New
                  </button>
                )}
              </div>

              {/* Project Form */}
              <form onSubmit={handleSaveProject} className="glass-panel form-card">
                <h3 className="form-section-title">
                  {editingProject ? 'Update Project Details' : 'Add New Portfolio Project'}
                </h3>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flashly Digital"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="admin-form-select"
                    >
                      <option value="mern">MERN Stack</option>
                      <option value="fullstack">Full Stack</option>
                      <option value="react">React.js</option>
                      <option value="frontend">Frontend</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="tools">Tools & Utilities</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Display Order</label>
                    <input
                      type="number"
                      value={projectForm.order}
                      onChange={(e) => setProjectForm({ ...projectForm, order: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Short Description (for cards) *</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Brief description showing on portfolio cards..."
                    value={projectForm.shortDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Full Description (for details modal)</label>
                  <textarea
                    rows="3"
                    placeholder="Comprehensive architecture and functionality details..."
                    value={projectForm.fullDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Technologies Used (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="React.js, Node.js, Express, MongoDB Atlas"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Image URL / Path</label>
                    <div className="image-input-with-preview">
                      <input
                        type="text"
                        placeholder="/images/saffron.png or https://..."
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        className="admin-form-input"
                      />
                      {projectForm.image && (
                        <img
                          src={projectForm.image}
                          alt="Preview"
                          className="inline-img-preview"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Image Picker from Workspace */}
                <div className="quick-image-picker">
                  <span className="picker-label"><ImageIcon size={14} /> Quick choose from existing project images:</span>
                  <div className="picker-chips-list">
                    {workspaceImages.map((img) => (
                      <button
                        key={img.path}
                        type="button"
                        className={`picker-chip ${projectForm.image === img.path ? 'active' : ''}`}
                        onClick={() => setProjectForm({ ...projectForm, image: img.path })}
                      >
                        <img src={img.path} alt="" className="picker-chip-thumb" />
                        <span>{img.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Live Demo URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>GitHub Source Code URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    />
                    <span>Mark as Flagship / Featured Project (displayed prominently)</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <Save size={16} />
                  <span>{editingProject ? 'Save Project Changes' : 'Create & Add Project'}</span>
                </button>
              </form>

              {/* Projects List Table with Search & Pagination */}
              <div className="glass-panel table-container">
                <div className="table-top-bar">
                  <div className="table-search-box">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search projects by title, category, tech..."
                      value={projectSearch}
                      onChange={(e) => {
                        setProjectSearch(e.target.value);
                        setProjectPage(1);
                      }}
                      className="admin-form-input table-search-input"
                    />
                  </div>

                  <div className="table-pagination-controls">
                    <span>Page <strong>{projectPage}</strong> of <strong>{totalProjectPages}</strong> ({filteredProjects.length} projects)</span>
                    <button
                      disabled={projectPage <= 1}
                      onClick={() => setProjectPage((p) => Math.max(1, p - 1))}
                      className="btn btn-secondary btn-sm"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      disabled={projectPage >= totalProjectPages}
                      onClick={() => setProjectPage((p) => Math.min(totalProjectPages, p + 1))}
                      className="btn btn-secondary btn-sm"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Featured</th>
                      <th>Links</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProjectsSlice.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={p.image || '/images/saffron.png'}
                            alt={p.title}
                            className="table-thumb"
                            onError={(e) => { e.target.src = '/images/saffron.png'; }}
                          />
                        </td>
                        <td>
                          <strong>{p.title}</strong>
                        </td>
                        <td>
                          <span className="tag">{p.category}</span>
                        </td>
                        <td>
                          {p.featured ? (
                            <span className="featured-star-pill">
                              <Star size={12} /> Yes
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>No</span>
                          )}
                        </td>
                        <td>
                          <div className="table-links">
                            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Live</a>}
                            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer">Code</a>}
                          </div>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => handleEditProjectClick(p)}
                              className="action-icon-btn"
                              title="Edit Project"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p._id, p.title)}
                              className="action-icon-btn delete"
                              title="Delete Project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Work Experience Management</h2>

              {/* Exp Form */}
              <form onSubmit={handleSaveExp} className="glass-panel form-card">
                <h3 className="form-section-title">
                  {editingExp ? 'Edit Experience' : 'Add Work Experience'}
                </h3>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Role / Position Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MERN Stack Developer Intern"
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Softgrid Info Pvt. Ltd."
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Time Period *</label>
                    <input
                      type="text"
                      required
                      placeholder="March 2026 – Present"
                      value={expForm.period}
                      onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Maharashtra, India / Remote"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Employment Type</label>
                    <input
                      type="text"
                      placeholder="Internship / Full-time"
                      value={expForm.type}
                      onChange={(e) => setExpForm({ ...expForm, type: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Achievement Bullets (One per line)</label>
                  <textarea
                    rows="4"
                    placeholder="Developing AcadPrime College ERP SaaS with SuperAdmin...&#10;Built SuperAdmin console for multi-college subscription..."
                    value={expForm.bullets}
                    onChange={(e) => setExpForm({ ...expForm, bullets: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Technologies Used (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="React.js, Node.js, Express.js, MongoDB, JWT, RBAC"
                    value={expForm.techStack}
                    onChange={(e) => setExpForm({ ...expForm, techStack: e.target.value })}
                    className="admin-form-input"
                  />
                </div>

                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={expForm.isCurrent}
                      onChange={(e) => setExpForm({ ...expForm, isCurrent: e.target.checked })}
                    />
                    <span>Currently working here</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <Save size={16} /> Save Experience
                </button>
              </form>

              {/* Exp List */}
              <div className="admin-exp-cards-list">
                {(data.experiences || []).map((exp) => (
                  <div key={exp._id} className="glass-panel admin-item-card">
                    <div className="item-card-header">
                      <div>
                        <h4>{exp.role} &bull; <span style={{ color: 'var(--accent-secondary)' }}>{exp.company}</span></h4>
                        <span className="item-card-meta">{exp.period} | {exp.location}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => {
                            setEditingExp(exp);
                            setExpForm({
                              role: exp.role || '',
                              company: exp.company || '',
                              location: exp.location || '',
                              period: exp.period || '',
                              isCurrent: Boolean(exp.isCurrent),
                              type: exp.type || 'Internship',
                              bullets: exp.bullets ? exp.bullets.join('\n') : '',
                              techStack: exp.techStack ? exp.techStack.join(', ') : '',
                              order: exp.order || 0
                            });
                          }}
                          className="action-icon-btn"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExp(exp._id, exp.role, exp.company)}
                          className="action-icon-btn delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === 'skills' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Technical Skills Management</h2>

              {/* Skill Form */}
              <form onSubmit={handleSaveSkill} className="glass-panel form-card">
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Skill Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js / Docker"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="admin-form-select"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Languages">Languages</option>
                      <option value="Tools & Auth">Tools & Auth</option>
                      <option value="Cloud & Deployment">Cloud & Deployment</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Proficiency: {skillForm.level}%</label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                      className="range-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                  <Save size={15} /> {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </form>

              {/* Skills Grid in Admin */}
              <div className="admin-skills-grid">
                {(data.skills || []).map((s) => (
                  <div key={s._id} className="glass-panel admin-skill-pill">
                    <div>
                      <strong>{s.name}</strong>
                      <span className="skill-cat-sub">{s.category} ({s.level}%)</span>
                    </div>
                    <div className="table-actions">
                      <button
                        onClick={() => {
                          setEditingSkill(s);
                          setSkillForm({
                            name: s.name,
                            category: s.category,
                            level: s.level,
                            order: s.order || 0
                          });
                        }}
                        className="action-icon-btn"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(s._id, s.name)}
                        className="action-icon-btn delete"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION & CERTIFICATIONS */}
          {activeTab === 'education' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Education & Verified Certifications</h2>

              {/* Add/Edit Education */}
              <form onSubmit={handleSaveEdu} className="glass-panel form-card">
                <h3 className="form-section-title">{editingEdu ? 'Edit Degree' : 'Add Education Record'}</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Degree / Qualification *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.Tech, Computer Science & Engineering"
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution / University *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DBATU University"
                      value={eduForm.institution}
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Period *</label>
                    <input
                      type="text"
                      required
                      placeholder="2021 – 2026"
                      value={eduForm.period}
                      onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Score / Percentage</label>
                    <input
                      type="text"
                      placeholder="71.17% / 89.60%"
                      value={eduForm.score}
                      onChange={(e) => setEduForm({ ...eduForm, score: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Maharashtra, India"
                      value={eduForm.location}
                      onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                    <Save size={15} /> Save Education Record
                  </button>
                  {editingEdu && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditingEdu(null);
                        setEduForm({ degree: '', institution: '', period: '', score: '', location: '', order: 0 });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Education List */}
              <div className="glass-panel form-card" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Active Education Records ({(data.education || []).length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(data.education || []).map((edu) => (
                    <div
                      key={edu._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.degree}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {edu.institution} • {edu.period} {edu.score ? `(${edu.score})` : ''}
                        </div>
                      </div>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="action-icon-btn"
                          title="Edit"
                          onClick={() => {
                            setEditingEdu(edu);
                            setEduForm({
                              degree: edu.degree || '',
                              institution: edu.institution || '',
                              period: edu.period || '',
                              score: edu.score || '',
                              location: edu.location || '',
                              order: edu.order || 0
                            });
                          }}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          type="button"
                          className="action-icon-btn delete"
                          title="Delete Record"
                          onClick={() => handleDeleteEdu(edu._id, edu.degree)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add/Edit Certifications */}
              <form onSubmit={handleSaveCert} className="glass-panel form-card">
                <h3 className="form-section-title">{editingCert ? 'Edit Certification' : 'Add Verified Certification'}</h3>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Certificate Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full Stack Development"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer / Credential Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OneRoadmap — CERT-CDC7092E"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Online Credential Verification Link</label>
                    <input
                      type="url"
                      placeholder="https://oneroadmap.io/skills/fs/certificate/CERT-..."
                      value={certForm.credentialUrl}
                      onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Skills Verified (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, Express, MongoDB"
                      value={certForm.skills}
                      onChange={(e) => setCertForm({ ...certForm, skills: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                  <Save size={15} /> Save Certificate
                </button>
              </form>

              {/* Certifications List */}
              <div className="admin-certs-table-wrap glass-panel">
                <h4 style={{ marginBottom: '1rem' }}>Active Certifications ({data.certifications?.length || 0})</h4>
                <div className="admin-certs-grid">
                  {(data.certifications || []).map((c) => (
                    <div key={c._id} className="admin-cert-card glass-panel">
                      <div className="cert-top">
                        <strong>{c.title}</strong>
                        <div className="table-actions">
                          <button
                            onClick={() => {
                              setEditingCert(c);
                              setCertForm({
                                title: c.title || '',
                                issuer: c.issuer || '',
                                credentialUrl: c.credentialUrl || '',
                                skills: c.skills ? c.skills.join(', ') : '',
                                order: c.order || 0
                              });
                            }}
                            className="action-icon-btn"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCert(c._id, c.title)}
                            className="action-icon-btn delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <span className="cert-issuer-text">{c.issuer}</span>
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="cert-link-text">
                          Verify Link <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Visitor Inquiries & Contact Messages</h2>

              {loadingMessages ? (
                <p>Loading messages from MongoDB Atlas...</p>
              ) : messages.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                  <p>No messages received yet. Inquiries sent via the portfolio contact form will display here in real-time!</p>
                </div>
              ) : (
                <div className="messages-list">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`glass-panel message-card ${!msg.isRead ? 'unread' : ''}`}
                    >
                      <div className="message-header">
                        <div>
                          <div className="msg-sender-row">
                            <h4 className="msg-sender-name">{msg.name}</h4>
                            {!msg.isRead && <span className="new-badge">New</span>}
                          </div>
                          <span className="msg-email">{msg.email}</span>
                        </div>
                        <div className="msg-meta-right">
                          <span className="msg-date">
                            {new Date(msg.createdAt).toLocaleDateString()} at{' '}
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <div className="table-actions">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="action-icon-btn"
                              title="Reply via Email"
                            >
                              <Mail size={16} />
                            </a>
                            <button
                              onClick={() => handleToggleMessageRead(msg._id)}
                              className="action-icon-btn"
                              title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msg._id, msg.name)}
                              className="action-icon-btn delete"
                              title="Delete Message"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="msg-subject">
                        <strong>Subject:</strong> {msg.subject}
                      </div>

                      <p className="msg-body">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SECURITY */}
          {activeTab === 'security' && (
            <div className="admin-view-section">
              <h2 className="view-heading">Admin Password & Security</h2>

              <form onSubmit={handleUpdatePassword} className="glass-panel form-card" style={{ maxWidth: '500px' }}>
                <div className="form-group">
                  <label>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwdCurrent ? 'text' : 'password'}
                      required
                      value={pwdForm.currentPassword}
                      onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                      className="admin-form-input"
                      style={{ paddingRight: '2.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwdCurrent(!showPwdCurrent)}
                      style={{
                        position: 'absolute', right: '0.8rem', top: '50%',
                        transform: 'translateY(-50%)', background: 'none',
                        border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', padding: '0.2rem'
                      }}
                      title={showPwdCurrent ? 'Hide password' : 'Show password'}
                    >
                      {showPwdCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwdNew ? 'text' : 'password'}
                      required
                      value={pwdForm.newPassword}
                      onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                      className="admin-form-input"
                      style={{ paddingRight: '2.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwdNew(!showPwdNew)}
                      style={{
                        position: 'absolute', right: '0.8rem', top: '50%',
                        transform: 'translateY(-50%)', background: 'none',
                        border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', padding: '0.2rem'
                      }}
                      title={showPwdNew ? 'Hide password' : 'Show password'}
                    >
                      {showPwdNew ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <KeyRound size={16} /> Update Password
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* Centered Confirmation Modal Popup */}
      {confirmModal.isOpen && (
        <div className="confirm-modal-overlay" onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}>
          <div className="confirm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className={`confirm-icon-wrap ${confirmModal.type}`}>
              {confirmModal.icon === 'logout' ? <LogOut size={28} /> : <Trash2 size={28} />}
            </div>
            <h3 className="confirm-title">{confirmModal.title}</h3>
            <p className="confirm-message">{confirmModal.message}</p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-secondary confirm-btn-cancel"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
              >
                {confirmModal.cancelText || 'Cancel'}
              </button>
              <button
                type="button"
                className={`btn ${confirmModal.type === 'danger' ? 'btn-danger' : 'btn-primary'} confirm-btn-action`}
                onClick={async () => {
                  const cb = confirmModal.onConfirm;
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                  if (cb) await cb();
                }}
              >
                {confirmModal.icon === 'logout' ? <LogOut size={16} /> : <Trash2 size={16} />}
                <span>{confirmModal.confirmText}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-app-layout {
          height: 100vh;
          height: 100dvh;
          background: var(--bg-primary);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .admin-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          flex-shrink: 0;
          z-index: 60;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .admin-brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .admin-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient-subtle);
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-brand-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .admin-profile-widget {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.35rem 0.95rem 0.35rem 0.45rem;
          background: var(--bg-card);
          border: 1px solid var(--border-hover);
          border-radius: 9999px;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .admin-profile-widget:hover {
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }
        .admin-avatar-wrap {
          position: relative;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
        }
        .admin-header-photo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid var(--accent-primary);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.35);
        }
        .admin-online-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 11px;
          height: 11px;
          background: #10b981;
          border: 2px solid var(--bg-secondary);
          border-radius: 50%;
          box-shadow: 0 0 6px #10b981;
        }
        .admin-info-text {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }
        .admin-profile-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .admin-profile-role {
          font-size: 0.72rem;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          font-weight: 600;
        }
        .admin-topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logout-btn:hover {
          color: #ef4444;
        }
        .admin-main-container {
          display: grid;
          grid-template-columns: 240px 1fr;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .admin-sidebar {
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          overflow-y: auto;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .sidebar-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          width: 100%;
          text-align: left;
          transition: var(--transition-fast);
          position: relative;
        }
        .sidebar-nav-btn:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }
        .sidebar-nav-btn.active {
          background: var(--accent-gradient);
          color: #ffffff !important;
        }
        .unread-badge {
          position: absolute;
          right: 1rem;
          background: #ef4444;
          color: #fff;
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }
        .admin-content-pane {
          padding: 2.5rem;
          overflow-y: auto;
          height: 100%;
          min-height: 0;
          -webkit-overflow-scrolling: touch;
          background: var(--bg-primary);
          transition: background-color 0.3s ease;
        }
        .admin-view-section {
          max-width: 1100px;
          margin: 0 auto;
        }
        .view-heading {
          font-size: 1.6rem;
          margin-bottom: 1.8rem;
          color: var(--text-primary);
        }
        .overview-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .stat-card {
          padding: 1.6rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .stat-icon {
          color: var(--accent-primary);
        }
        .stat-value {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-mono);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .stat-sub {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .quick-actions-panel {
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .quick-actions-panel h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .quick-actions-panel p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .action-buttons-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Form Cards */
        .form-card {
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .form-section-title {
          font-size: 1.15rem;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.2rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .help-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Adaptive Theme Inputs */
        .admin-form-input, .admin-form-textarea, .admin-form-select {
          width: 100%;
          background: var(--bg-secondary) !important;
          color: var(--text-primary) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
          font-family: inherit !important;
          font-size: 0.92rem !important;
          outline: none !important;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
        }
        .admin-form-input:focus, .admin-form-textarea:focus, .admin-form-select:focus {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2) !important;
        }
        .admin-form-select option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        /* Image Picker with Preview */
        .image-input-with-preview {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .inline-img-preview {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid var(--border-hover);
          flex-shrink: 0;
        }
        .quick-image-picker {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
          border: 1px dashed var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .picker-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .picker-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .picker-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .picker-chip:hover, .picker-chip.active {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          background: var(--accent-gradient-subtle);
        }
        .picker-chip-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          object-fit: cover;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Table & Controls */
        .table-container {
          overflow-x: auto;
          margin-top: 2rem;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
        }
        .table-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .table-search-box {
          position: relative;
          min-width: 280px;
        }
        .table-search-box .search-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .table-search-input {
          padding-left: 2.4rem !important;
        }
        .table-pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.84rem;
          color: var(--text-secondary);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th, .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.88rem;
          color: var(--text-primary);
        }
        .admin-table th {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .table-thumb {
          width: 48px;
          height: 34px;
          object-fit: cover;
          border-radius: 4px;
        }
        .featured-star-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .table-links {
          display: flex;
          gap: 0.6rem;
        }
        .table-links a {
          color: var(--accent-secondary);
          font-size: 0.8rem;
          text-decoration: underline;
        }
        .table-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .action-icon-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
        }
        .action-icon-btn.delete:hover {
          color: #ef4444;
          border-color: #ef4444;
        }

        .admin-exp-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .admin-item-card {
          padding: 1.4rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .item-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .item-card-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .admin-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }
        .admin-skill-pill {
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
        }
        .skill-cat-sub {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        /* Certs Grid in Admin */
        .admin-certs-table-wrap {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .admin-certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .admin-cert-card {
          padding: 1rem;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cert-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cert-issuer-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .cert-link-text {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: var(--accent-secondary);
        }

        /* Messages */
        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .message-card {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .message-card.unread {
          border-left: 4px solid var(--accent-primary);
        }
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .msg-sender-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .msg-sender-name {
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .new-badge {
          background: #ef4444;
          color: #fff;
          font-size: 0.7rem;
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }
        .msg-email {
          font-size: 0.82rem;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
        }
        .msg-meta-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .msg-date {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .msg-subject {
          font-size: 0.92rem;
          color: var(--text-primary);
        }
        .msg-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 1rem;
          border-radius: var(--radius-sm);
        }
        .range-input {
          accent-color: var(--accent-primary);
          height: 6px;
        }

        /* Centered Confirmation Modal Popup */
        .confirm-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeInModal 0.2s ease-out;
        }
        .confirm-modal-card {
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2.2rem 2rem;
          box-shadow: var(--shadow-lg), 0 0 40px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .confirm-icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .confirm-icon-wrap.danger {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
        }
        .confirm-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }
        .confirm-message {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.8rem;
        }
        .confirm-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
        }
        .confirm-actions .btn {
          flex: 1;
          justify-content: center;
          padding: 0.75rem 1.2rem;
          font-size: 0.88rem;
        }
        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff !important;
          border: 1px solid rgba(239, 68, 68, 0.5);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }
        .btn-danger:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          transform: translateY(-1px);
        }
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpModal {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Mobile Admin Hamburger & Drawer Styles */
        .mobile-admin-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-admin-hamburger:hover {
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
        }
        .mobile-admin-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          animation: fadeInModal 0.2s ease;
        }
        .mobile-admin-drawer {
          width: 280px;
          max-width: 82vw;
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: slideInDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        @keyframes slideInDrawer {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 1rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-primary);
          gap: 0.75rem;
        }
        .close-drawer-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-left: auto;
        }
        .close-drawer-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .mobile-drawer-nav {
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .mobile-drawer-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-primary);
        }

        @media (max-width: 900px) {
          .admin-app-layout {
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
          }
          .mobile-admin-hamburger {
            display: flex;
          }
          .admin-topbar {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            flex-shrink: 0;
            z-index: 60;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
          }
          .admin-main-container {
            grid-template-columns: 1fr;
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }
          .admin-sidebar {
            display: none !important;
          }
          .admin-live-link {
            display: none !important;
          }
          .admin-content-pane {
            padding: 1.4rem 1rem 3.5rem 1rem;
            height: 100%;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .admin-topbar {
            padding: 0.65rem 0.8rem;
            gap: 0.4rem;
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            z-index: 60;
          }
          .admin-info-text {
            display: none;
          }
          .admin-brand-icon {
            width: 32px;
            height: 32px;
          }
          .admin-brand-title {
            font-size: 0.95rem;
          }
          .admin-topbar-actions {
            gap: 0.35rem;
          }
          .admin-logout-btn span {
            display: none;
          }
          .admin-logout-btn {
            padding: 0.45rem 0.6rem;
          }
          .admin-content-pane {
            padding: 1rem 0.65rem 3.5rem 0.65rem;
            height: 100%;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .view-heading {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }
          .stat-card {
            padding: 1rem 0.85rem;
          }
          .form-card {
            padding: 1.1rem 0.75rem;
          }
          .table-container {
            padding: 0.8rem 0.5rem;
            margin-top: 1.2rem;
          }
          .table-top-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.6rem;
          }
          .table-search-box {
            min-width: 0;
            width: 100%;
          }
          .admin-skills-grid {
            grid-template-columns: 1fr;
          }
          .confirm-modal-overlay {
            padding: 0.75rem;
          }
          .confirm-modal-card {
            padding: 1.5rem 1rem;
            width: 100%;
            max-width: calc(100vw - 1.5rem);
          }
          .confirm-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.6rem;
          }
          .confirm-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 360px) {
          .admin-brand-title {
            display: none;
          }
          .admin-topbar {
            padding: 0.5rem;
          }
          .admin-avatar-wrap, .admin-header-photo {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

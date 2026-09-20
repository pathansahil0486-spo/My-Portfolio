import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Palette, FileText, Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
  const { data, theme, setTheme, currentView, setCurrentView, navigateTo } = usePortfolio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const profile = data.profile || {};

  const themes = [
    { id: 'midnight', name: 'Midnight', color: '#6366f1' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#f43f5e' },
    { id: 'ocean', name: 'Ocean', color: '#0284c7' },
    { id: 'forest', name: 'Forest', color: '#10b981' },
    { id: 'violet', name: 'Violet', color: '#8b5cf6' },
    { id: 'light', name: 'Light', color: '#64748b' }
  ];

  return (
    <header className="site-header">
      <nav className="navbar-inner">
        {/* Brand */}
        <button onClick={() => navigateTo('home')} className="navbar-brand" title="Home - Sahil Pathan">
          <span className="brand-avatar">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name || 'Sahil Pathan'}
                className="brand-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <span className="brand-fallback-icon" style={{ display: profile.avatarUrl ? 'none' : 'flex' }}>
              <Terminal size={18} />
            </span>
          </span>
          <div className="brand-text">
            <span className="brand-name">{profile.name || 'Sahil Pathan'}</span>
            <span className="brand-role">{profile.roles?.[0] || (profile.title ? profile.title.split('|')[0].trim() : 'MERN Stack Developer')}</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu">
          <li>
            <button
              onClick={() => navigateTo('home')}
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('about')}
              className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('projects')}
              className={`nav-link-btn ${currentView === 'projects' ? 'active' : ''}`}
            >
              Projects ({data.projects?.length || '100+'})
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo('contact')}
              className={`nav-link-btn ${currentView === 'contact' ? 'active' : ''}`}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Theme Dropdown */}
          <div className="theme-dropdown-wrap">
            <button
              className="action-btn"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              title="Change Theme"
            >
              <Palette size={16} />
              <span className="theme-name-label">{theme}</span>
            </button>
            {themeMenuOpen && (
              <div className="theme-menu">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-menu-item ${theme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeMenuOpen(false);
                    }}
                  >
                    <span className="theme-dot" style={{ backgroundColor: t.color }}></span>
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Resume Download */}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm nav-resume-btn"
              title="Download Resume"
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <ul className="mobile-menu-links">
            <li><button onClick={() => { setMobileOpen(false); navigateTo('home'); }}>Home</button></li>
            <li><button onClick={() => { setMobileOpen(false); navigateTo('about'); }}>About</button></li>
            <li><button onClick={() => { setMobileOpen(false); navigateTo('projects'); }}>Projects ({data.projects?.length || '100+'})</button></li>
            <li><button onClick={() => { setMobileOpen(false); navigateTo('contact'); }}>Contact</button></li>
          </ul>
          <div className="mobile-drawer-footer">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}
              >
                <FileText size={16} /> Download Resume
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--header-bg, rgba(7, 9, 19, 0.82));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .navbar-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          color: inherit;
        }
        .brand-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient-subtle);
          border: 1px solid var(--border-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-secondary);
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.25);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .navbar-brand:hover .brand-avatar {
          transform: scale(1.05);
          border-color: var(--accent-secondary);
        }
        .brand-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-sm);
          display: block;
        }
        .brand-fallback-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }
        .brand-name {
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
          color: var(--text-primary) !important;
          transition: color 0.2s ease;
        }
        .navbar-brand:hover .brand-name {
          color: var(--accent-secondary) !important;
        }
        .brand-role {
          font-size: 0.75rem;
          color: var(--text-secondary) !important;
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .nav-link-btn {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-secondary);
          position: relative;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          transition: var(--transition-fast);
        }
        .nav-link-btn:hover {
          color: var(--text-primary);
          background: rgba(99, 102, 241, 0.1);
        }
        .nav-link-btn.active {
          color: var(--text-primary) !important;
          background: var(--accent-gradient-subtle);
          border: 1px solid var(--border-hover);
          font-weight: 700;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .action-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .theme-name-label {
          text-transform: capitalize;
          font-size: 0.8rem;
        }
        .theme-dropdown-wrap {
          position: relative;
        }
        .theme-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 130px;
          box-shadow: var(--shadow-md);
          z-index: 100;
        }
        .theme-menu-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.7rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          border-radius: 6px;
          width: 100%;
          text-align: left;
        }
        .theme-menu-item:hover, .theme-menu-item.active {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }
        .theme-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .admin-badge-btn {
          background: var(--accent-gradient-subtle);
          color: var(--badge-text);
          border-color: var(--badge-border);
        }
        .admin-badge-btn:hover {
          background: var(--badge-bg);
          color: var(--text-primary);
        }
        .mobile-toggle-btn {
          display: none;
          color: var(--text-primary);
          padding: 0.3rem;
        }
        .mobile-drawer {
          display: none;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          padding: 1.5rem;
        }
        .mobile-menu-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mobile-menu-links a {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        @media (max-width: 900px) {
          .nav-menu {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
          .mobile-drawer {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .navbar-inner {
            padding: 0.65rem 1rem;
            gap: 0.75rem;
          }
          .theme-name-label {
            display: none;
          }
          .nav-resume-btn {
            display: none;
          }
          .action-btn {
            padding: 0.4rem 0.6rem;
          }
        }

        @media (max-width: 420px) {
          .navbar-inner {
            padding: 0.55rem 0.65rem;
            gap: 0.4rem;
          }
          .brand-avatar {
            width: 34px;
            height: 34px;
          }
          .brand-name {
            font-size: 0.92rem;
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .brand-role {
            display: none;
          }
          .admin-btn-label {
            display: none;
          }
          .action-btn {
            padding: 0.35rem 0.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;

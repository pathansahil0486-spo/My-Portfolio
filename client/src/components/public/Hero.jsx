import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Download, Mail, MapPin, Layers, CheckCircle, Code2, Database, Server } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

const Hero = () => {
  const { data, navigateTo } = usePortfolio();
  const profile = data.profile || {};
  const stats = profile.stats || {};
  const social = profile.socialLinks || {};

  const roles = profile.roles && profile.roles.length > 0
    ? profile.roles
    : ['MERN Stack Developer', 'Full-Stack Web Developer', 'React & Node.js Specialist'];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const avatarRef = useRef(null);

  const handleAvatarMouseMove = (e) => {
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const tiltX = ((y / 100) - 0.5) * -12;
    const tiltY = ((x / 100) - 0.5) * 12;

    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
    el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  };

  const handleAvatarMouseLeave = () => {
    const el = avatarRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');
  };

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let timer;

    if (!isDeleting && displayText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(100);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
        );
        setTypingSpeed(isDeleting ? 45 : 90);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        
        {/* Left Content */}
        <div className="hero-content">
          {/* Status Pill */}
          <div className="status-pill">
            <span className="pulsing-indicator"></span>
            <span>{profile.status?.statusText || 'Available for full-time & freelance projects'}</span>
          </div>

          <h1 className="hero-heading">
            Hi, I'm <span className="gradient-text">{profile.name || 'Sahil Ramjan Pathan'}</span>
          </h1>

          <div className="role-typing-wrapper">
            <span className="role-prefix">I build </span>
            <span className="typing-text">{displayText}</span>
            <span className="cursor-caret">|</span>
          </div>

          <p className="hero-description">
            {profile.bio ||
              'B.Tech CSE graduate (2026) and MERN Stack Developer with production experience across React.js, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, Angular 19, and Spring Boot. Built and fully deployed Flashly Digital, and currently developing AcadPrime (multi-tenant College ERP SaaS).'}
          </p>

          {/* Key Metrics Quick Bar */}
          <div className="hero-metrics">
            <div className="metric-box">
              <span className="metric-number">{stats.projectsCount || '100+'}</span>
              <span className="metric-label">Projects Built</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <span className="metric-number">{stats.experienceYears || '2+'}</span>
              <span className="metric-label">Years Hands-On</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <span className="metric-number">{stats.modulesBuilt || '20+'}</span>
              <span className="metric-label">SaaS & ERP Modules</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button onClick={() => navigateTo('projects')} className="btn btn-primary">
              <span>Explore All {stats.projectsCount || '100+'} Projects</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => navigateTo('contact')} className="btn btn-secondary">
              <span>Hire Me</span>
            </button>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary resume-btn"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            )}
          </div>

          {/* Socials & Location */}
          <div className="hero-footer-bar">
            <div className="location-tag">
              <MapPin size={15} />
              <span>{profile.location || 'Tuljapur, Maharashtra, India'}</span>
            </div>

            <div className="social-links-row">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="social-circle" title="GitHub">
                  <GithubIcon size={18} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="social-circle" title="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="social-circle" title="Email Sahil">
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Avatar Card: 3D Perspective Tilt Showcase */}
        <div className="hero-media">
          <div
            ref={avatarRef}
            className="avatar-showcase-wrapper perspective-container"
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
          >
            
            {/* Ambient Background Aura Glow */}
            <div className="avatar-ambient-glow"></div>

            {/* Orbiting Tech Badges floating safely outside the photo with magnetic hover */}
            <div className="floating-chip chip-top-left magnetic-chip">
              <Code2 size={15} className="chip-icon react-color" />
              <span>React.js</span>
            </div>
            <div className="floating-chip chip-top-right magnetic-chip">
              <Server size={15} className="chip-icon node-color" />
              <span>Node.js</span>
            </div>
            <div className="floating-chip chip-mid-left magnetic-chip">
              <Database size={15} className="chip-icon mongo-color" />
              <span>MongoDB</span>
            </div>
            <div className="floating-chip chip-mid-right magnetic-chip">
              <Layers size={15} className="chip-icon express-color" />
              <span>Express.js</span>
            </div>

            {/* Main Portrait Frame with 3D Tilt */}
            <div className="portrait-frame">
              <div className="spotlight-glare"></div>
              <div className="portrait-glow-border"></div>
              <div className="portrait-image-container">
                <img
                  src={profile.avatarUrl || '/images/mypimg.jpeg'}
                  alt={profile.name || 'Sahil Ramjan Pathan'}
                  className="portrait-photo"
                />
                <div className="portrait-overlay-gradient"></div>
              </div>
            </div>

            {/* Elegant Glass Base Card - Positioned cleanly BELOW the photo */}
            <div className="portrait-caption-card glass-panel border-beam-card">
              <div className="caption-status-dot"></div>
              <div className="caption-text-group">
                <span className="caption-primary">MERN Stack Developer Intern</span>
                <span className="caption-secondary">Softgrid Info Pvt. Ltd. &bull; AcadPrime ERP</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .hero-section {
          padding: 5.5rem 0 2rem 0;
          position: relative;
          min-height: calc(100vh - 65px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 2.8rem;
          align-items: center;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.9rem;
        }
        .pulsing-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .hero-heading {
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 0.45rem;
        }
        .role-typing-wrapper {
          font-size: clamp(1.05rem, 2.2vw, 1.45rem);
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.85rem;
          min-height: 2rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .typing-text {
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          font-weight: 700;
        }
        .cursor-caret {
          color: var(--accent-primary);
          animation: blink 0.9s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .hero-description {
          font-size: 0.96rem;
          color: var(--text-secondary);
          line-height: 1.62;
          margin-bottom: 1.25rem;
          max-width: 580px;
        }
        .hero-metrics {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 0.75rem 1.2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 1.35rem;
          width: fit-content;
        }
        .metric-box {
          display: flex;
          flex-direction: column;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }
        .metric-box:hover {
          transform: translateY(-3px) scale(1.04);
          background: rgba(99, 102, 241, 0.12);
        }
        .metric-box:hover .metric-number {
          color: var(--accent-secondary);
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        .metric-number {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-mono);
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .metric-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .metric-divider {
          width: 1px;
          height: 28px;
          background: var(--border-color);
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.35rem;
          flex-wrap: wrap;
        }
        .hero-footer-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .location-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .social-links-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .social-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-circle:hover {
          color: #fff;
          border-color: var(--accent-secondary);
          transform: translateY(-3px) scale(1.15) rotate(6deg);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
          background: var(--accent-gradient-subtle);
        }

        /* Redesigned Photo Showcase with 3D Tilt */
        .hero-media {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .avatar-showcase-wrapper {
          position: relative;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .avatar-ambient-glow {
          position: absolute;
          top: 15%;
          width: 340px;
          height: 340px;
          background: var(--accent-gradient);
          opacity: 0.28;
          filter: blur(50px);
          border-radius: 50%;
          z-index: 0;
          animation: floatSlow 12s infinite alternate ease-in-out;
        }
        .portrait-frame {
          position: relative;
          z-index: 2;
          width: min(320px, 32vw);
          height: 385px;
          border-radius: 30px;
          padding: 3px;
          background: linear-gradient(145deg, rgba(99, 102, 241, 0.9), rgba(6, 182, 212, 0.8), rgba(168, 85, 247, 0.6));
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22), 0 0 30px rgba(99, 102, 241, 0.2);
          transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transition: transform 0.15s ease-out, box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }
        .avatar-showcase-wrapper:not(:hover) .portrait-frame {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .portrait-frame:hover {
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35), 0 0 45px rgba(99, 102, 241, 0.45);
        }
        .portrait-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 27px;
          overflow: hidden;
          background: var(--photo-bg, #0d1124);
        }
        .portrait-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .portrait-overlay-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: var(--photo-overlay, linear-gradient(to top, rgba(13, 17, 36, 0.6), transparent));
          pointer-events: none;
        }

        /* Floating Tech Badges with Magnetic Interactive Hover */
        .floating-chip {
          position: absolute;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          background: var(--chip-bg, rgba(13, 17, 36, 0.85));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--chip-border, var(--border-hover));
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--chip-text, var(--text-primary));
          box-shadow: var(--shadow-md);
          white-space: nowrap;
          animation: floatChip 6s ease-in-out infinite alternate;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
        }
        .floating-chip:hover {
          animation-play-state: paused;
          transform: scale(1.18) translateY(-6px) !important;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.5);
          border-color: var(--accent-secondary);
          z-index: 10;
        }
        .chip-top-left {
          top: 15px;
          left: -15px;
          animation-delay: 0s;
        }
        .chip-top-right {
          top: 25px;
          right: -15px;
          animation-delay: -2s;
        }
        .chip-mid-left {
          bottom: 110px;
          left: -25px;
          animation-delay: -4s;
        }
        .chip-mid-right {
          bottom: 90px;
          right: -15px;
          animation-delay: -1.5s;
        }
        @keyframes floatChip {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        .chip-icon.react-color { color: #06b6d4; }
        .chip-icon.node-color { color: #10b981; }
        .chip-icon.mongo-color { color: #22c55e; }
        .chip-icon.express-color { color: #a855f7; }

        /* Caption Card Below Photo */
        .portrait-caption-card {
          position: relative;
          z-index: 4;
          margin-top: -20px;
          padding: 0.7rem 1.2rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--card-solid, rgba(18, 24, 52, 0.92));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hover);
          box-shadow: var(--shadow-lg);
          max-width: 300px;
          width: 90%;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .caption-status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          flex-shrink: 0;
        }
        .caption-text-group {
          display: flex;
          flex-direction: column;
        }
        .caption-primary {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .caption-secondary {
          font-size: 0.7rem;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding: 4.8rem 0 3rem 0;
            min-height: auto;
          }
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2.5rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-metrics {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-footer-bar {
            justify-content: center;
          }
          .chip-top-left { left: 0; }
          .chip-top-right { right: 0; }
          .chip-mid-left { left: 0; }
          .chip-mid-right { right: 0; }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 4.2rem 0 2rem 0;
          }
          .hero-heading {
            font-size: clamp(1.65rem, 7.5vw, 2.2rem);
            margin-bottom: 0.35rem;
          }
          .role-typing-wrapper {
            font-size: 1.05rem;
            margin-bottom: 0.75rem;
          }
          .hero-description {
            font-size: 0.88rem;
            line-height: 1.55;
            margin-bottom: 1.1rem;
          }
          .hero-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            width: 100%;
            max-width: 100%;
            gap: 0.3rem;
            padding: 0.65rem 0.4rem;
            margin-bottom: 1.1rem;
          }
          .metric-divider {
            display: none;
          }
          .metric-number {
            font-size: 1.15rem;
            text-align: center;
          }
          .metric-label {
            font-size: 0.62rem;
            text-align: center;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.6rem;
            margin-bottom: 1.1rem;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
            font-size: 0.88rem;
            padding: 0.75rem 1rem;
          }
          .hero-footer-bar {
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
          }
          .avatar-showcase-wrapper {
            max-width: 100%;
          }
          .portrait-frame {
            width: min(280px, 80vw);
            height: min(340px, 95vw);
            border-radius: 24px;
          }
          .portrait-image-container {
            border-radius: 21px;
          }
          .floating-chip {
            font-size: 0.7rem;
            padding: 0.25rem 0.55rem;
            gap: 0.35rem;
          }
          .chip-top-left { top: 8px; left: -4px; }
          .chip-top-right { top: 12px; right: -4px; }
          .chip-mid-left { bottom: 60px; left: -4px; }
          .chip-mid-right { bottom: 60px; right: -4px; }
          .portrait-caption-card {
            max-width: 260px;
            width: 88%;
            padding: 0.55rem 0.75rem;
            margin-top: -16px;
          }
          .caption-primary {
            font-size: 0.76rem;
          }
          .caption-secondary {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

const Footer = () => {
  const { data, navigateTo } = usePortfolio();
  const profile = data.profile || {};
  const social = profile.socialLinks || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="brand-title">Sahil Ramjan Pathan</h3>
            <p className="brand-tagline">
              MERN Stack Developer &bull; Full-Stack Software Engineer
            </p>
            <p className="brand-location">
              Tuljapur, Maharashtra, India
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="links-header">Navigation</h4>
            <ul className="footer-nav">
              <li><button onClick={() => navigateTo('home')} className="footer-nav-btn">Home</button></li>
              <li><button onClick={() => navigateTo('about')} className="footer-nav-btn">About</button></li>
              <li><button onClick={() => navigateTo('projects')} className="footer-nav-btn">Projects ({data.projects?.length || '100+'})</button></li>
              <li><button onClick={() => navigateTo('contact')} className="footer-nav-btn">Contact</button></li>
            </ul>
          </div>

          <div className="footer-social-group">
            <h4 className="links-header">Connect</h4>
            <div className="footer-social-icons">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                  <GithubIcon size={18} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="social-icon-btn" title="Email Sahil">
                  <Mail size={18} />
                </a>
              )}
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Sahil Ramjan Pathan. Built with high performance MERN Stack.
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          padding: 4.5rem 0 2rem 0;
          position: relative;
          z-index: 1;
        }
        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 3rem;
        }
        .brand-title {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }
        .brand-tagline {
          font-size: 0.9rem;
          color: var(--accent-secondary);
          margin-bottom: 0.4rem;
          font-family: var(--font-mono);
        }
        .brand-location {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .links-header {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 1.2rem;
        }
        .footer-nav {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-nav a, .footer-nav-btn {
          font-size: 0.88rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          transition: var(--transition-fast);
        }
        .footer-nav a:hover, .footer-nav-btn:hover {
          color: var(--accent-secondary);
          transform: translateX(4px);
        }
        .footer-social-icons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .social-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-icon-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }
        .footer-admin-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
        }
        .footer-admin-link:hover {
          color: var(--accent-secondary);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
        }
        .back-to-top-btn:hover {
          color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 480px) {
          .site-footer {
            padding: 3rem 0 1.5rem 0;
          }
          .footer-top {
            gap: 1.8rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

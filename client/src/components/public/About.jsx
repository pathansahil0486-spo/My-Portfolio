import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code2, Server, Database, Cloud, Award, Check } from 'lucide-react';

const About = () => {
  const { data } = usePortfolio();
  const profile = data.profile || {};

  const pillars = [
    {
      icon: <Code2 size={24} />,
      title: 'Frontend Engineering',
      desc: 'Expertise in React.js, Vite, Angular 19, Redux, modern responsive design, state management, and smooth micro-interactions.'
    },
    {
      icon: <Server size={24} />,
      title: 'Backend & SaaS Architecture',
      desc: 'Robust RESTful API design, Node.js, Express.js, Spring Boot, JWT authentication, and strict Role-Based Access Control (RBAC).'
    },
    {
      icon: <Database size={24} />,
      title: 'Database Mastery',
      desc: 'Data modeling, schema indexing, and optimization across MongoDB Atlas, MySQL, PostgreSQL, and Firebase.'
    },
    {
      icon: <Cloud size={24} />,
      title: 'Deployment & CI/CD',
      desc: 'Production deployment pipelines on Vercel, Render, Netlify, Git workflows, and postman API validation.'
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Background & Craft</div>
          <h2 className="section-title">
            About <span className="gradient-text">Sahil Pathan</span>
          </h2>
          <p className="section-subtitle">
            Engineering robust digital solutions from architectural foundation to polished user experience.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Story Panel */}
          <div className="glass-panel about-story-card">
            <h3 className="story-title">Crafting Scalable Full-Stack Web Applications</h3>
            <p className="story-text">
              {profile.about ||
                'Passionate MERN and Full Stack Developer focused on building scalable, reliable, and user-centric web applications. Proven track record of architecting robust backends, developing dynamic role-based dashboards, and delivering responsive modern user experiences.'}
            </p>
            <p className="story-text">
              Currently interning as a <strong>MERN Stack Developer at Softgrid Info Pvt. Ltd.</strong>, engineering <strong>AcadPrime</strong> — a multi-tenant College ERP SaaS with 10+ core modules. Concurrently leading the complete backend architecture for an independent multi-vendor Bus Booking platform from SRS specifications.
            </p>

            <div className="strengths-list">
              <div className="strength-item">
                <Check size={18} className="check-icon" />
                <span>Production experience with live deployed platforms (Flashly Digital, Saffron OTT)</span>
              </div>
              <div className="strength-item">
                <Check size={18} className="check-icon" />
                <span>Published researcher in AI-driven interview systems (IJIRT, Nov 2025)</span>
              </div>
              <div className="strength-item">
                <Check size={18} className="check-icon" />
                <span>Clean code advocate adhering to MVC patterns and Agile/SDLC workflows</span>
              </div>
            </div>
          </div>

          {/* Pillars Cards */}
          <div className="pillars-container">
            {pillars.map((pillar, i) => (
              <div key={i} className="glass-panel pillar-card">
                <div className="pillar-icon-box">{pillar.icon}</div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .about-section {
          position: relative;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .about-story-card {
          padding: 2.2rem;
        }
        .story-title {
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
          color: var(--text-primary);
        }
        .story-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1.2rem;
        }
        .story-text strong {
          color: var(--text-primary);
        }
        .strengths-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }
        .strength-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }
        .check-icon {
          color: #10b981;
          flex-shrink: 0;
        }
        .pillars-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }
        .pillar-card {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
        }
        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient-subtle);
          border: 1px solid var(--border-hover);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .pillar-title {
          font-size: 1.05rem;
          margin-bottom: 0.6rem;
        }
        .pillar-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .pillars-container {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .about-story-card {
            padding: 1.25rem 0.95rem;
          }
          .story-title {
            font-size: 1.15rem;
            margin-bottom: 0.9rem;
          }
          .story-text {
            font-size: 0.88rem;
            line-height: 1.6;
          }
          .pillar-card {
            padding: 1.15rem 0.95rem;
          }
          .strength-item {
            font-size: 0.84rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

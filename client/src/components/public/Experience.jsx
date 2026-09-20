import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, ChevronRight, Layers } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();
  const experiences = data.experiences || [];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Career & Roles</div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Professional software engineering roles, enterprise SaaS development, and architectural leadership.
          </p>
        </div>

        <div className="timeline-wrapper">
          {experiences.map((exp, idx) => (
            <div key={exp._id || idx} className="timeline-item">
              
              {/* Timeline Marker */}
              <div className="timeline-marker">
                <div className="marker-dot">
                  <Briefcase size={14} />
                </div>
                {idx !== experiences.length - 1 && <div className="marker-line"></div>}
              </div>

              {/* Timeline Content Card */}
              <div className="glass-panel timeline-card">
                <div className="card-top-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company">
                      {exp.company}
                      {exp.type && <span className="exp-type-badge">{exp.type}</span>}
                      {exp.isCurrent && <span className="current-badge">Active</span>}
                    </h4>
                  </div>
                  <div className="exp-meta">
                    <div className="meta-pill">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    {exp.location && (
                      <div className="meta-pill">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <ChevronRight size={16} className="bullet-arrow" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="exp-tech-stack">
                    <div className="tech-stack-label">
                      <Layers size={13} />
                      <span>Technologies:</span>
                    </div>
                    <div className="tech-tags-list">
                      {exp.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        .timeline-wrapper {
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
        }
        .timeline-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          position: relative;
        }
        .marker-dot {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--accent-primary);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.35);
          z-index: 2;
        }
        .marker-line {
          width: 2px;
          flex-grow: 1;
          background: linear-gradient(to bottom, var(--accent-primary), var(--border-color));
          margin-top: 0.5rem;
          margin-bottom: -1rem;
        }
        .timeline-card {
          padding: 2rem;
        }
        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .exp-role {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .exp-company {
          font-size: 1.05rem;
          color: var(--accent-secondary);
          font-weight: 600;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .exp-type-badge {
          font-size: 0.72rem;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .current-badge {
          font-size: 0.72rem;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-family: var(--font-mono);
        }
        .exp-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .meta-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .exp-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .exp-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.94rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .bullet-arrow {
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        .exp-tech-stack {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding-top: 1.2rem;
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
        }
        .tech-stack-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .tech-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        @media (max-width: 650px) {
          .timeline-item {
            grid-template-columns: 1fr;
          }
          .timeline-marker {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .timeline-card {
            padding: 1.2rem 0.9rem;
          }
          .exp-role {
            font-size: 1.15rem;
          }
          .exp-company {
            font-size: 0.92rem;
          }
          .exp-bullets li {
            font-size: 0.86rem;
            line-height: 1.55;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;

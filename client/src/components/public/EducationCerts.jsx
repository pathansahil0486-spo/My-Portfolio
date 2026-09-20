import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, MapPin, RotateCw, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

const EducationCerts = () => {
  const { data } = usePortfolio();
  const education = data.education || [];
  const certifications = data.certifications || [];
  const publication = data.publication || {};

  // State for manual flip toggle on mobile or click
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id, e) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="education" className="section edu-certs-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Academic & Credentials</div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Formal engineering degree, scientific research publication, and interactive 3D verified technical credentials.
          </p>
        </div>

        {/* Top Grid: Academic Education (Left) & Research Paper Spotlight + Milestones (Right) */}
        <div className="edu-top-grid">
          {/* Education Column */}
          <div className="edu-column">
            <h3 className="column-title">
              <GraduationCap size={22} className="col-icon" />
              <span>Academic Education</span>
            </h3>

            <div className="edu-list">
              {education.map((edu, idx) => (
                <div key={edu._id || idx} className="glass-panel edu-card interactive-card">
                  <div className="spotlight-glare"></div>
                  <div className="edu-card-header">
                    <h4 className="edu-degree">{edu.degree}</h4>
                    {edu.score && <span className="edu-score-badge">{edu.score}</span>}
                  </div>
                  <h5 className="edu-institution">{edu.institution}</h5>
                  <div className="edu-meta">
                    <span className="meta-pill">
                      <Calendar size={13} /> {edu.period}
                    </span>
                    {edu.location && (
                      <span className="meta-pill">
                        <MapPin size={13} /> {edu.location}
                      </span>
                    )}
                  </div>
                  {edu.details && <p className="edu-details">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Research & Milestones Column */}
          <div className="research-highlight-column">
            <h3 className="column-title">
              <BookOpen size={22} className="col-icon" />
              <span>Research & Accomplishments</span>
            </h3>

            {publication.title && (
              <div className="glass-panel publication-spotlight-card border-beam-card">
                <div className="spotlight-glare"></div>
                <div className="pub-badge">
                  <BookOpen size={15} />
                  <span>Published Scientific Paper</span>
                </div>
                <h4 className="pub-title">{publication.title}</h4>
                <p className="pub-journal">
                  <strong>Journal:</strong> {publication.journal} &bull; <strong>Date:</strong> {publication.date}
                </p>
                <p className="pub-desc">{publication.description}</p>
                {publication.link && (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm pub-link"
                  >
                    <span>View Publication (IJIRT)</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}

            <div className="glass-panel milestones-summary-card border-beam-card">
              <div className="spotlight-glare"></div>
              <h4 className="milestones-card-title">Technical Rigor & Verification</h4>
              <div className="milestones-metrics-grid">
                <div className="milestone-box">
                  <span className="milestone-number">15+</span>
                  <span className="milestone-label">Verified Certifications</span>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">100%</span>
                  <span className="milestone-label">Credential Verification</span>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">1st Author</span>
                  <span className="milestone-label">IJIRT ML Research</span>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">4+ Years</span>
                  <span className="milestone-label">Engineering Focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Verified Certifications Full-Width Grid with 3D FLIP CARDS */}
        <div className="certs-section-block">
          <div className="certs-header-row">
            <div>
              <h3 className="column-title" style={{ marginBottom: '0.4rem' }}>
                <Award size={22} className="col-icon" />
                <span>Verified Technical Certifications ({certifications.length})</span>
              </h3>
              <p className="certs-subtitle">
                Accredited credentials across full-stack engineering. <strong>Hover over any card to 3D flip</strong> and view verification link & skills.
              </p>
            </div>
          </div>

          <div className="certs-full-grid">
            {certifications.map((cert, idx) => {
              const certId = cert._id || `cert-${idx}`;
              const isFlipped = !!flippedCards[certId];

              return (
                <div
                  key={certId}
                  className={`flip-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={(e) => toggleFlip(certId, e)}
                  title="Hover or tap to flip card"
                >
                  <div className="flip-card-inner">
                    
                    {/* Front Face of 3D Card */}
                    <div className="glass-panel flip-card-front cert-face-front">
                      <div className="spotlight-glare"></div>

                      <div className="cert-front-header">
                        <div className="cert-icon-circle">
                          <Award size={18} />
                        </div>
                        <span className="cert-verified-pill">
                          <span className="pulsing-dot"></span> Verified
                        </span>
                      </div>

                      <div className="cert-info-main">
                        <h4 className="cert-title">{cert.title}</h4>
                        <span className="cert-issuer">{cert.issuer}</span>
                      </div>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="cert-skills-row">
                          {cert.skills.slice(0, 3).map((s, sIdx) => (
                            <span key={sIdx} className="tag">{s}</span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="tag-more">+{cert.skills.length - 3}</span>
                          )}
                        </div>
                      )}

                      <div className="cert-flip-prompt">
                        <span className="flip-hint-btn">
                          <RotateCw size={12} className="flip-icon-spin" /> Hover to View Credential &rarr;
                        </span>
                      </div>
                    </div>

                    {/* Back Face of 3D Card (Rotated 180deg) */}
                    <div className="glass-panel flip-card-back cert-face-back">
                      <div className="cert-back-badge">
                        <ShieldCheck size={15} className="back-shield-icon" />
                        <span>Official Credential Record</span>
                      </div>

                      <div className="cert-back-content">
                        <h4 className="cert-back-title">{cert.title}</h4>
                        <div className="cert-back-meta">
                          <span><strong>Authority:</strong> {cert.issuer}</span>
                          {cert.issueDate && <span>&bull; {cert.issueDate}</span>}
                        </div>

                        <div className="cert-back-skills">
                          <span className="back-skills-label">Core Competencies:</span>
                          <div className="back-tags-container">
                            {cert.skills && cert.skills.slice(0, 4).map((skill, sIdx) => (
                              <span key={sIdx} className="tag back-tag">{skill}</span>
                            ))}
                            {cert.skills && cert.skills.length > 4 && (
                              <span className="tag-more">+{cert.skills.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="cert-back-actions">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm cert-launch-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="Open verified credential in new tab"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="cert-verified-static">
                            <CheckCircle2 size={13} /> Verified
                          </span>
                        )}

                        <button
                          type="button"
                          className="btn-flip-back"
                          onClick={(e) => toggleFlip(certId, e)}
                          title="Flip back to front"
                        >
                          <RotateCw size={11} /> Back
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .publication-spotlight-card {
          padding: 2.2rem;
          margin-bottom: 3.5rem;
          border-left: 4px solid var(--accent-secondary);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%);
        }
        .pub-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-secondary);
          text-transform: uppercase;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          margin-bottom: 0.8rem;
        }
        .pub-title {
          font-size: 1.45rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .pub-journal {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 0.9rem;
        }
        .edu-top-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 2rem;
          align-items: start;
          margin-bottom: 3.5rem;
        }
        .publication-spotlight-card {
          padding: 1.8rem;
          border-left: 4px solid var(--accent-secondary);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%);
          margin-bottom: 1.2rem;
        }
        .pub-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-secondary);
          text-transform: uppercase;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          margin-bottom: 0.8rem;
        }
        .pub-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .pub-journal {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }
        .pub-journal strong {
          color: var(--text-secondary);
        }
        .pub-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }
        .pub-link {
          width: fit-content;
        }
        .milestones-summary-card {
          padding: 1.6rem;
        }
        .milestones-card-title {
          font-size: 1.05rem;
          margin-bottom: 1.1rem;
          color: var(--text-primary);
        }
        .milestones-metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .milestone-box {
          padding: 0.9rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
        }
        .milestone-number {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: var(--font-mono);
        }
        .milestone-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.2rem;
        }

        .column-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.3rem;
          margin-bottom: 1.4rem;
          color: var(--text-primary);
        }
        .col-icon {
          color: var(--accent-primary);
        }
        .edu-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .edu-card {
          padding: 1.6rem;
        }
        .edu-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.4rem;
          flex-wrap: wrap;
        }
        .edu-degree {
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .edu-score-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          font-family: var(--font-mono);
        }
        .edu-institution {
          font-size: 0.9rem;
          color: var(--accent-secondary);
          font-weight: 500;
          margin-bottom: 0.8rem;
        }
        .edu-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          margin-bottom: 0.6rem;
        }
        .edu-details {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Bottom Full-Width Certifications Section */
        .certs-section-block {
          padding-top: 1rem;
        }
        .certs-header-row {
          margin-bottom: 1.8rem;
        }
        .certs-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .certs-full-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* 3D Flip Card Styles */
        .flip-card-wrapper {
          perspective: 1200px;
          -webkit-perspective: 1200px;
          height: 295px;
          min-height: 295px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flip-card-wrapper:hover {
          transform: translateY(-5px);
          z-index: 40;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          border-radius: var(--radius-md);
        }

        /* Auto flip smoothly on hover */
        @media (hover: hover) and (pointer: fine) {
          .flip-card-wrapper:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        .flip-card-wrapper.is-flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Front Face */
        .cert-face-front {
          padding: 1.25rem 1.35rem;
          justify-content: space-between;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .flip-card-wrapper:hover .cert-face-front {
          border-color: var(--border-hover);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
        }

        .cert-front-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .cert-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent-gradient-subtle);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border-glow);
        }

        .cert-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }

        .cert-info-main {
          margin-bottom: 0.4rem;
        }

        .cert-title {
          font-size: 0.98rem;
          color: var(--text-primary);
          font-weight: 700;
          line-height: 1.35;
          margin-bottom: 0.2rem;
        }

        .cert-issuer {
          font-size: 0.8rem;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          display: block;
        }

        .cert-skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.6rem;
        }

        .tag-more {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          display: inline-flex;
          align-items: center;
          padding: 0.15rem 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-sm);
        }

        .cert-flip-prompt {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-top: 0.4rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          margin-top: auto;
        }

        .flip-hint-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--accent-secondary);
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .flip-card-wrapper:hover .flip-hint-btn {
          background: rgba(6, 182, 212, 0.2);
          border-color: var(--accent-secondary);
          color: #fff;
          transform: scale(1.03);
        }

        .flip-icon-spin {
          transition: transform 0.4s ease;
        }

        .flip-card-wrapper:hover .flip-icon-spin {
          transform: rotate(180deg);
        }

        /* Back Face */
        .cert-face-back {
          transform: rotateY(180deg);
          padding: 1.25rem 1.35rem;
          justify-content: space-between;
          background: var(--card-solid);
          border: 1px solid var(--accent-primary);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.35);
        }

        .cert-back-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .back-shield-icon {
          color: var(--accent-secondary);
        }

        .cert-back-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cert-back-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .cert-back-meta {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-bottom: 0.3rem;
        }

        .cert-back-meta strong {
          color: var(--text-secondary);
        }

        .cert-back-skills {
          margin-bottom: 0.3rem;
        }

        .back-skills-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }

        .back-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .back-tag {
          background: rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          color: #c7d2fe !important;
          font-size: 0.72rem;
          padding: 0.12rem 0.5rem;
        }

        .cert-back-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }

        .cert-launch-btn {
          flex-grow: 1;
          font-size: 0.8rem;
          padding: 0.45rem 0.8rem;
        }

        .cert-verified-static {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: #10b981;
          font-weight: 600;
        }

        .btn-flip-back {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          color: var(--text-muted);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .btn-flip-back:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        @media (max-width: 900px) {
          .edu-top-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .certs-full-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .edu-top-grid {
            margin-bottom: 2.2rem;
            gap: 2rem;
          }
          .publication-spotlight-card {
            padding: 1.15rem 0.85rem;
          }
          .pub-title {
            font-size: 1.15rem;
          }
          .pub-desc {
            font-size: 0.86rem;
          }
          .milestones-summary-card {
            padding: 1.15rem 0.85rem;
          }
          .milestones-metrics-grid {
            gap: 0.5rem;
          }
          .milestone-box {
            padding: 0.65rem;
          }
          .milestone-number {
            font-size: 1.15rem;
          }
          .column-title {
            font-size: 1.15rem;
            margin-bottom: 1rem;
          }
          .edu-card {
            padding: 1.1rem 0.85rem;
          }
          .edu-degree {
            font-size: 0.98rem;
          }
          .certs-full-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
          .cert-card {
            padding: 0.95rem 0.85rem;
            gap: 0.75rem;
          }
          .cert-icon-circle {
            width: 32px;
            height: 32px;
          }
          .cert-title {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
};

export default EducationCerts;

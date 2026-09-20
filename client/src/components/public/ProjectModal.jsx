import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';

const ProjectModal = () => {
  const { activeProjectModal, setActiveProjectModal } = usePortfolio();

  if (!activeProjectModal) return null;

  const project = activeProjectModal;

  return (
    <div className="modal-backdrop" onClick={() => setActiveProjectModal(null)}>
      <div className="glass-panel modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={() => setActiveProjectModal(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div className="modal-image-wrap">
          <img
            src={project.image || '/images/saffron.png'}
            alt={project.title}
            className="modal-img"
            onError={(e) => { e.target.src = '/images/saffron.png'; }}
          />
          <div className="modal-image-overlay">
            <span className="modal-category-tag">{project.category?.toUpperCase() || 'MERN'}</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          
          <p className="modal-desc">
            {project.fullDescription || project.shortDescription}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-highlights">
              <h4 className="highlights-title">Key Engineering Highlights:</h4>
              <ul>
                {project.highlights.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="highlight-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="modal-tech-stack">
              <div className="modal-tech-label">
                <Layers size={15} />
                <span>Tech Stack:</span>
              </div>
              <div className="modal-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="modal-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                <span>Open Live Project</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <GithubIcon size={18} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(4, 7, 18, 0.82);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-card {
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          background: var(--bg-secondary);
          border: 1px solid var(--border-hover);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
        }
        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }
        .modal-image-wrap {
          width: 100%;
          height: 280px;
          position: relative;
          background: #000;
          overflow: hidden;
        }
        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-image-overlay {
          position: absolute;
          bottom: 1rem;
          left: 1.5rem;
        }
        .modal-category-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          background: var(--accent-gradient);
          color: #fff;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .modal-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }
        .modal-title {
          font-size: 1.65rem;
          color: var(--text-primary);
        }
        .modal-desc {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .modal-highlights {
          background: var(--bg-card);
          padding: 1.2rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }
        .highlights-title {
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .modal-highlights ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .modal-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .highlight-check {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        .modal-tech-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .modal-tech-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .modal-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .modal-backdrop {
            padding: 0.6rem;
          }
          .modal-image-wrap {
            height: 180px;
          }
          .modal-body {
            padding: 1.15rem 0.85rem;
            gap: 1rem;
          }
          .modal-title {
            font-size: 1.25rem;
          }
          .modal-desc {
            font-size: 0.88rem;
          }
          .modal-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.6rem;
          }
          .modal-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;

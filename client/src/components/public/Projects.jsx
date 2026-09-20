import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExternalLink, Search, Star, Eye, Layers, ChevronDown, RotateCw, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';

// Individual 3D Interactive Project Card with 3D Tilt & Quick Flip Specs
const ProjectItemCard = ({ project, onOpenModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    const tiltX = ((y / rect.height) - 0.5) * -8;
    const tiltY = ((x / rect.width) - 0.5) * 8;

    el.style.setProperty('--mouse-x', `${percentX}%`);
    el.style.setProperty('--mouse-y', `${percentY}%`);
    el.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      className={`project-flip-container ${isFlipped ? 'is-card-flipped' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-flip-inner">
        
        {/* Front Face: Visual Preview & Live Links */}
        <div className="glass-panel project-card project-card-front border-beam-card">
          <div className="spotlight-glare"></div>

          {/* Thumbnail */}
          <div
            className="project-thumb-box"
            onClick={() => onOpenModal(project)}
            title="Click to view screenshots & details"
          >
            <img
              src={project.image || '/images/saffron.png'}
              alt={project.title}
              className="project-thumb-img"
              onError={(e) => { e.target.src = '/images/saffron.png'; }}
            />
            <div className="thumb-overlay">
              <span className="view-details-btn">
                <Eye size={16} /> Quick View
              </span>
            </div>
            {project.featured && (
              <div className="featured-badge" title="Featured Project">
                <Star size={12} /> Featured
              </div>
            )}
            <span className="project-category-badge">
              {project.category?.toUpperCase() || 'MERN'}
            </span>
          </div>

          {/* Content */}
          <div className="project-card-content">
            <h3
              className="project-card-title"
              onClick={() => onOpenModal(project)}
            >
              {project.title}
            </h3>

            <p className="project-card-desc">
              {project.shortDescription}
            </p>

            {/* Tech Tags */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="project-tags-wrap">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="tag">{tech}</span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="tag-more">+{project.technologies.length - 4}</span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="project-card-footer">
              <div className="card-btn-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-link"
                    title="Open Live Website"
                  >
                    <ExternalLink size={15} />
                    <span>Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-link secondary"
                    title="View GitHub Code"
                  >
                    <GithubIcon size={15} />
                    <span>Code</span>
                  </a>
                )}
              </div>

              <div className="card-action-group">
                <button
                  type="button"
                  className="btn-card-flip"
                  onClick={() => setIsFlipped(true)}
                  title="3D Flip card to view architectural specs"
                >
                  <RotateCw size={13} className="spin-hover" />
                  <span>Specs</span>
                </button>
                <button
                  className="btn-card-details"
                  onClick={() => onOpenModal(project)}
                >
                  Details &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face: Architectural Stack & Specs (Rotated 180deg) */}
        <div className="glass-panel project-card project-card-back">
          <div className="project-back-header">
            <div className="back-spec-pill">
              <Code2 size={15} />
              <span>Architectural Specs</span>
            </div>
            <span className="project-back-cat">{project.category?.toUpperCase()}</span>
          </div>

          <div className="project-back-body">
            <h4 className="project-back-title">{project.title}</h4>
            <p className="project-back-desc">
              {project.fullDescription || project.shortDescription}
            </p>

            <div className="back-spec-section">
              <span className="spec-heading">Key Capabilities & Stack:</span>
              <div className="spec-tags-grid">
                {project.technologies && project.technologies.map((t, idx) => (
                  <span key={idx} className="tag back-spec-tag">{t}</span>
                ))}
              </div>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="back-spec-highlights">
                <span className="spec-heading">Highlights:</span>
                <ul className="spec-bullet-list">
                  {project.highlights.slice(0, 2).map((h, hIdx) => (
                    <li key={hIdx}>
                      <CheckCircle2 size={13} className="bullet-spec-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="project-back-footer">
            <button
              type="button"
              className="btn btn-primary btn-sm back-modal-btn"
              onClick={() => onOpenModal(project)}
            >
              <span>Full Details & Screenshots</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              className="btn-card-flip-return"
              onClick={() => setIsFlipped(false)}
              title="Return to preview face"
            >
              <RotateCw size={12} /> Flip Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const Projects = ({ isFullPage = false }) => {
  const { data, setActiveProjectModal, navigateTo } = usePortfolio();
  const projects = data.projects || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(isFullPage ? 24 : 12);

  const categories = [
    { id: 'all', label: `All (${projects.length})` },
    { id: 'mern', label: 'MERN Stack' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'react', label: 'React.js' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ai-ml', label: 'AI & ML' },
    { id: 'tools', label: 'Tools & Utilities' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchCategory =
        activeCategory === 'all' || item.category?.toLowerCase() === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        (item.technologies && item.technologies.some((t) => t.toLowerCase().includes(query)));
      return matchCategory && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="projects" className={`section projects-section ${isFullPage ? 'full-page' : ''}`}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Production Showcase ({projects.length}+ Projects)</div>
          <h2 className="section-title">
            Explore My <span className="gradient-text">Work & Projects</span>
          </h2>
          <p className="section-subtitle">
            From multi-tenant MERN SaaS ERP platforms to AI-powered interview simulators, frontend applications, and full-stack tools. <strong>Hover for 3D tilt & flip for specs!</strong>
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="projects-controls">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill magnetic-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(24);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${projects.length} projects...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="search-input"
            />
          </div>
        </div>

        {/* Counter Info */}
        <div className="projects-results-bar">
          <span>Showing <strong>{displayedProjects.length}</strong> of <strong>{filteredProjects.length}</strong> matching projects</span>
          {!isFullPage && projects.length > 12 && (
            <button onClick={() => navigateTo('projects')} className="view-all-projects-link">
              View Complete Dedicated Projects Page &rarr;
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <p>No projects found matching "{searchQuery}". Try selecting another category.</p>
          </div>
        ) : (
          <div className="projects-grid perspective-container">
            {displayedProjects.map((project) => (
              <ProjectItemCard
                key={project._id || project.slug}
                project={project}
                onOpenModal={setActiveProjectModal}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProjects.length > displayedProjects.length && (
          <div className="load-more-container">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="btn btn-secondary load-more-btn"
            >
              <span>Load More Projects ({filteredProjects.length - displayedProjects.length} remaining)</span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}

      </div>

      <style>{`
        .projects-section.full-page {
          padding-top: 8rem;
          min-height: 100vh;
        }
        .projects-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .category-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .category-pill {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: var(--transition-fast);
        }
        .category-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .category-pill.active {
          background: var(--accent-gradient);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
        }
        .search-box {
          position: relative;
          min-width: 260px;
          max-width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.4rem;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.85rem;
          outline: none;
        }
        .search-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
        }
        .projects-results-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        .projects-results-bar strong {
          color: var(--text-primary);
        }
        .view-all-projects-link {
          color: var(--accent-secondary);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .view-all-projects-link:hover {
          text-decoration: underline;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.2rem;
        }

        /* 3D Interactive Project Flip Container */
        .project-flip-container {
          perspective: 1200px;
          -webkit-perspective: 1200px;
          min-height: 460px;
          transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transition: transform 0.15s ease-out;
        }

        .project-flip-container:not(:hover) {
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          border-radius: var(--radius-md);
        }

        .project-flip-container.is-card-flipped .project-flip-inner {
          transform: rotateY(180deg);
        }

        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-sizing: border-box;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Front Face */
        .project-card-front {
          transform: rotateY(0deg);
          z-index: 2;
        }

        .project-card-front:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        /* Back Face */
        .project-card-back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
          z-index: 1;
          background: var(--card-solid);
          border: 1px solid var(--accent-primary);
          box-shadow: 0 14px 40px rgba(99, 102, 241, 0.3);
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .project-back-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.8rem;
          margin-bottom: 1rem;
        }

        .back-spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-back-cat {
          font-size: 0.72rem;
          padding: 0.2rem 0.55rem;
          background: var(--accent-gradient-subtle);
          color: var(--accent-primary);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        .project-back-body {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-back-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .project-back-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .spec-heading {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-family: var(--font-mono);
          display: block;
          margin-bottom: 0.4rem;
        }

        .spec-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .back-spec-tag {
          background: rgba(99, 102, 241, 0.12) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          color: #c7d2fe !important;
          font-size: 0.74rem;
        }

        .spec-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .spec-bullet-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .bullet-spec-icon {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .project-back-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          margin-top: 1rem;
        }

        .back-modal-btn {
          flex-grow: 1;
          font-size: 0.85rem;
        }

        .btn-card-flip-return {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.8rem;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .btn-card-flip-return:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .project-thumb-box {
          position: relative;
          width: 100%;
          height: 200px;
          background: var(--bg-secondary);
          overflow: hidden;
          cursor: pointer;
        }
        .project-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-thumb-img {
          transform: scale(1.06);
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4, 7, 18, 0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-thumb-box:hover .thumb-overlay {
          opacity: 1;
        }
        .view-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .featured-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(245, 158, 11, 0.9);
          color: #000;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          font-family: var(--font-mono);
        }
        .project-category-badge {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-family: var(--font-mono);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .project-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .project-card-title {
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .project-card-title:hover {
          color: var(--accent-secondary);
        }
        .project-card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.4rem;
          margin-top: auto;
        }
        .tag-more {
          font-size: 0.75rem;
          color: var(--text-muted);
          align-self: center;
          font-family: var(--font-mono);
        }
        .project-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .card-btn-links {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .card-action-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-card-flip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-secondary);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .btn-card-flip:hover {
          background: rgba(6, 182, 212, 0.2);
          border-color: var(--accent-secondary);
          transform: translateY(-1px);
        }
        .spin-hover {
          transition: transform 0.4s ease;
        }
        .btn-card-flip:hover .spin-hover {
          transform: rotate(180deg);
        }
        .btn-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-primary);
        }
        .btn-card-link:hover {
          color: var(--accent-secondary);
        }
        .btn-card-link.secondary {
          color: var(--text-secondary);
        }
        .btn-card-link.secondary:hover {
          color: var(--text-primary);
        }
        .btn-card-details {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .btn-card-details:hover {
          color: var(--text-primary);
        }
        .load-more-container {
          display: flex;
          justify-content: center;
          margin-top: 3.5rem;
        }
        .load-more-btn {
          padding: 0.85rem 2rem;
          font-size: 0.95rem;
        }
        .no-projects-box {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            width: 100%;
            min-width: 0;
          }
        }
        @media (max-width: 480px) {
          .category-pills {
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.5rem;
            width: 100%;
          }
          .category-pill {
            flex-shrink: 0;
            padding: 0.4rem 0.8rem;
            font-size: 0.76rem;
          }
          .project-card-content {
            padding: 1.15rem 0.95rem;
          }
          .project-card-title {
            font-size: 1.05rem;
          }
          .project-card-desc {
            font-size: 0.84rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;

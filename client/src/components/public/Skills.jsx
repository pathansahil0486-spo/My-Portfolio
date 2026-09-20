import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Cpu, Layout, Server, Database, Terminal, Shield } from 'lucide-react';

const Skills = () => {
  const { data } = usePortfolio();
  const skills = data.skills || [];

  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'Tools & Auth'];

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Frontend': return <Layout size={18} />;
      case 'Backend': return <Server size={18} />;
      case 'Database': return <Database size={18} />;
      case 'Languages': return <Terminal size={18} />;
      case 'Tools & Auth': return <Shield size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  const filteredSkills = skills.filter(
    (s) => activeTab === 'All' || s.category === activeTab
  );

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Technical Arsenal</div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <p className="section-subtitle">
            Specialized engineering capabilities across the entire full-stack spectrum and modern cloud tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skill-tabs-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skill-tab-btn magnetic-chip ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-matrix-grid">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id || skill.name}
              className="glass-panel skill-card interactive-card border-beam-card"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="spotlight-glare"></div>

              <div className="skill-card-top">
                <div className="skill-icon-pill">
                  {getCategoryIcon(skill.category)}
                </div>
                <div className="skill-details">
                  <h4 className="skill-name">{skill.name}</h4>
                  <span className="skill-cat-label">{skill.category}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>

              {/* Progress Track */}
              <div className="skill-progress-track">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .skill-tabs-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .skill-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.2rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: var(--transition-fast);
        }
        .skill-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .skill-tab-btn.active {
          background: var(--accent-gradient);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
        }
        .skills-matrix-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .skill-card {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          border-radius: var(--radius-md);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: var(--border-hover);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.25);
        }
        .skill-card-top {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .skill-icon-pill {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient-subtle);
          border: 1px solid var(--border-hover);
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .skill-card:hover .skill-icon-pill {
          transform: scale(1.15) rotate(10deg);
          border-color: var(--accent-secondary);
          box-shadow: 0 0 14px rgba(6, 182, 212, 0.45);
        }
        .skill-details {
          flex-grow: 1;
        }
        .skill-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .skill-cat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .skill-percentage {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .skill-card:hover .skill-percentage {
          color: #38bdf8;
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
        }
        .skill-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .skill-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          background: var(--accent-gradient);
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default Skills;

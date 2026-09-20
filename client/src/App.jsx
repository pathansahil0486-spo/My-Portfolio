import React, { useEffect } from 'react';
import { usePortfolio } from './context/PortfolioContext';

// Public Components
import Navbar from './components/public/Navbar';
import Hero from './components/public/Hero';
import About from './components/public/About';
import Experience from './components/public/Experience';
import Projects from './components/public/Projects';
import Skills from './components/public/Skills';
import EducationCerts from './components/public/EducationCerts';
import Contact from './components/public/Contact';
import Footer from './components/public/Footer';
import ProjectModal from './components/public/ProjectModal';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const { currentView, setCurrentView, adminToken, loading, error } = usePortfolio();

  // Listen to hash changes for browser back/forward button navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') setCurrentView('admin');
      else if (hash === 'about') setCurrentView('about');
      else if (hash === 'projects') setCurrentView('projects');
      else if (hash === 'contact') setCurrentView('contact');
      else setCurrentView('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentView]);

  if (loading) {
    return (
      <div className="portfolio-loading-screen">
        <div className="loader-orbit">
          <div className="orbit-spin"></div>
          <div className="loader-core">SP</div>
        </div>
        <p className="loader-text">Loading Sahil Pathan's Portfolio from MongoDB Atlas...</p>
        <style>{`
          .portfolio-loading-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #070913;
            color: #f8fafc;
            gap: 1.5rem;
          }
          .loader-orbit {
            position: relative;
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .orbit-spin {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #6366f1;
            border-right-color: #06b6d4;
            animation: spin 1s linear infinite;
          }
          .loader-core {
            font-size: 1.2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'JetBrains Mono', monospace;
          }
          .loader-text {
            font-size: 0.95rem;
            color: #94a3b8;
            letter-spacing: 0.05em;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Render Admin View
  if (currentView === 'admin') {
    return (
      <div className="app-root">
        {adminToken ? <AdminDashboard /> : <AdminLogin />}
      </div>
    );
  }

  // Render Public Multi-Page Views
  return (
    <div className="app-root">
      {/* Ambient Background Blobs */}
      <div className="ambient-bg">
        <div className="ambient-blob ambient-blob-1"></div>
        <div className="ambient-blob ambient-blob-2"></div>
        <div className="ambient-blob ambient-blob-3"></div>
      </div>
      <div className="grid-overlay"></div>

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content Switching */}
      <main className="public-content-main">
        {currentView === 'home' && (
          <>
            <Hero />
            <About />
            <Experience />
            <Projects isFullPage={false} />
            <Skills />
            <EducationCerts />
            <Contact />
          </>
        )}

        {currentView === 'about' && (
          <div className="page-container-standalone" style={{ paddingTop: '6rem' }}>
            <About />
            <Experience />
            <Skills />
            <EducationCerts />
          </div>
        )}

        {currentView === 'projects' && (
          <div className="page-container-standalone">
            <Projects isFullPage={true} />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="page-container-standalone" style={{ paddingTop: '6rem' }}>
            <Contact />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Details Modal */}
      <ProjectModal />
    </div>
  );
}

export default App;

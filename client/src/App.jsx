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

import BrandLoader from './components/common/BrandLoader';

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
    return <BrandLoader />;
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

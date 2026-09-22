import React, { createContext, useContext, useState, useEffect } from 'react';
import initialPortfolioData from '../data/initialPortfolioData.json';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // Instant Hydration: Load cached data if available, otherwise bundled initial data
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem('sahil-portfolio-cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.projects && parsed.projects.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read cached portfolio data:', e);
    }
    return initialPortfolioData;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sahil-theme') || 'midnight';
  });

  // Admin Auth State
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('sahil-admin-token') || null;
  });
  const [adminUser, setAdminUser] = useState(null);

  // Active View ('home', 'about', 'projects', 'contact', 'admin')
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (window.location.pathname.startsWith('/admin') || hash === 'admin') return 'admin';
    if (hash === 'about') return 'about';
    if (hash === 'projects') return 'projects';
    if (hash === 'contact') return 'contact';
    return 'home';
  });

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'home') {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Selected project for modal view
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync theme attribute to documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sahil-theme', theme);
  }, [theme]);

  // Fetch all portfolio data from backend with silent background sync
  const fetchPortfolioData = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const res = await fetch('/api/portfolio/all');
      if (!res.ok) throw new Error('Failed to fetch portfolio data');
      const json = await res.json();
      if (json && json.projects && json.projects.length > 0) {
        setData(json);
        try {
          localStorage.setItem('sahil-portfolio-cache', JSON.stringify(json));
        } catch (e) {}
      }
      setError(null);
    } catch (err) {
      console.warn('Backend sync notice (using cached/initial data):', err.message);
      setError(err.message);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    // Show sleek brand intro for a fast ~700ms, then let the user in instantly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    // Fetch fresh updates from MongoDB Atlas in background
    fetchPortfolioData(true);

    return () => clearTimeout(timer);
  }, []);

  // Verify Admin Token on load
  useEffect(() => {
    if (!adminToken) {
      setAdminUser(null);
      return;
    }
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((json) => {
        setAdminUser(json.user);
      })
      .catch(() => {
        localStorage.removeItem('sahil-admin-token');
        setAdminToken(null);
        setAdminUser(null);
      });
  }, [adminToken]);

  const loginAdmin = (token, user) => {
    localStorage.setItem('sahil-admin-token', token);
    setAdminToken(token);
    setAdminUser(user);
    showToast(`Welcome back, ${user.name || 'Sahil'}!`, 'success');
  };

  const logoutAdmin = () => {
    localStorage.removeItem('sahil-admin-token');
    setAdminToken(null);
    setAdminUser(null);
    showToast('Logged out of Admin Panel', 'info');
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        error,
        refetchPortfolio: fetchPortfolioData,
        theme,
        setTheme,
        adminToken,
        adminUser,
        loginAdmin,
        logoutAdmin,
        currentView,
        setCurrentView,
        navigateTo,
        showToast,
        activeProjectModal,
        setActiveProjectModal
      }}
    >
      {children}
      {/* Toast rendering */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);

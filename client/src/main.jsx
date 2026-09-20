import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';
import './index.css';

// ── Production API Base URL Routing ──────────────────────────────────────────
// If VITE_API_URL is configured (e.g. Render backend URL), automatically route /api requests to it
if (import.meta.env.VITE_API_URL) {
  const apiBase = import.meta.env.VITE_API_URL.replace(/\/$/, '');
  const originalFetch = window.fetch;
  window.fetch = (input, init) => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      return originalFetch(`${apiBase}${input}`, init);
    }
    return originalFetch(input, init);
  };
}
// ─────────────────────────────────────────────────────────────────────────────

// ── Scrolling Browser Tab Title ──────────────────────────────────────────────
const TITLE_PREFIX = 'Sahil Ramjan Pathan  |  ';
const TITLE_SCROLL = 'MERN Stack Developer -FullStack Web Developer     -React.js & Node.js   -MongoDB Atlas  -Published Researcher    ';
let titlePos = 0;
let pauseFrames = 0;
const PAUSE_AT_START = 22; // pause at start so full text is readable

setInterval(() => {
  if (titlePos === 0 && pauseFrames < PAUSE_AT_START) {
    pauseFrames++;
    document.title = TITLE_PREFIX + TITLE_SCROLL.trim();
    return;
  }
  pauseFrames = 0;
  const scrolled = TITLE_SCROLL.substring(titlePos) + TITLE_SCROLL.substring(0, titlePos);
  document.title = TITLE_PREFIX + scrolled;
  titlePos = (titlePos + 1) % TITLE_SCROLL.length;
}, 160);
// ─────────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);

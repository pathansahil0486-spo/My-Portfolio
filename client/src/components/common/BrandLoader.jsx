import React, { useEffect, useState } from 'react';

const BrandLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Smooth high-speed progress sequence
    const t1 = setTimeout(() => setProgress(55), 180);
    const t2 = setTimeout(() => setProgress(88), 420);
    const t3 = setTimeout(() => setProgress(100), 650);
    const t4 = setTimeout(() => setExiting(true), 750);
    const t5 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div className={`brand-loader-overlay ${exiting ? 'fade-exit' : ''}`} id="brand-preloader" aria-live="polite">
      <div className="loader-ambient-glow glow-1"></div>
      <div className="loader-ambient-glow glow-2"></div>
      
      <div className="loader-card">
        {/* Animated Cybernetic Monogram Badge */}
        <div className="loader-crest">
          <div className="crest-orbital-ring outer"></div>
          <div className="crest-orbital-ring inner"></div>
          <div className="crest-core-glass">
            <span className="crest-monogram">SP</span>
          </div>
          <div className="crest-pulse-aura"></div>
        </div>

        {/* Brand Information */}
        <div className="loader-info">
          <h1 className="loader-name">SAHIL PATHAN</h1>
          <div className="loader-pill">
            <span className="pill-dot"></span>
            <span className="pill-text">MERN STACK &amp; FULL STACK DEVELOPER</span>
          </div>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="loader-progress-track">
          <div 
            className="loader-progress-fill" 
            style={{ width: `${progress}%` }}
          >
            <div className="loader-progress-light"></div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="loader-status">
          <span className="status-label">INITIALIZING WORKSPACE</span>
          <span className="status-pct">{progress}%</span>
        </div>
      </div>

      <style>{`
        .brand-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060813;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brand-loader-overlay.fade-exit {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        /* Ambient glowing nebulas */
        .loader-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .glow-1 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.28), transparent 70%);
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseGlow 3s ease-in-out infinite alternate;
        }

        .glow-2 {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.22), transparent 70%);
          bottom: 25%;
          left: 50%;
          transform: translate(-50%, 50%);
        }

        @keyframes pulseGlow {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }

        /* Centered Content Container */
        .loader-card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
          padding: 2.5rem 3rem;
          max-width: 90vw;
          text-align: center;
        }

        /* Monogram Crest */
        .loader-crest {
          position: relative;
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crest-orbital-ring.outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px dashed rgba(99, 102, 241, 0.45);
          animation: spinOuter 8s linear infinite;
        }

        .crest-orbital-ring.inner {
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #06b6d4;
          border-right-color: #6366f1;
          animation: spinInner 1.4s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .crest-core-glass {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crest-monogram {
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px rgba(56, 189, 248, 0.4));
        }

        .crest-pulse-aura {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%);
          animation: auraBlink 1.8s ease-in-out infinite alternate;
          z-index: -1;
        }

        @keyframes spinOuter {
          to { transform: rotate(360deg); }
        }

        @keyframes spinInner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes auraBlink {
          0% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0.85; transform: scale(1.1); }
        }

        /* Typography */
        .loader-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
        }

        .loader-name {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          color: #f8fafc;
          text-transform: uppercase;
          background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loader-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: dotBlink 1.2s ease-in-out infinite;
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .pill-text {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #94a3b8;
          text-transform: uppercase;
        }

        /* Progress Bar */
        .loader-progress-track {
          position: relative;
          width: 220px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
        }

        .loader-progress-fill {
          position: relative;
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 50%, #38bdf8 100%);
          border-radius: 9999px;
          transition: width 0.25s ease-out;
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.6);
        }

        .loader-progress-light {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 14px;
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff, 0 0 20px #38bdf8;
          filter: blur(1px);
        }

        /* Status Details */
        .loader-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 220px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .status-label {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
        }

        .status-pct {
          color: #38bdf8;
          font-weight: 700;
        }

        @media (max-width: 480px) {
          .loader-card {
            padding: 1.5rem;
          }
          .loader-name {
            font-size: 1rem;
            letter-spacing: 0.2em;
          }
          .pill-text {
            font-size: 0.68rem;
          }
          .loader-progress-track, .loader-status {
            width: 190px;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandLoader;

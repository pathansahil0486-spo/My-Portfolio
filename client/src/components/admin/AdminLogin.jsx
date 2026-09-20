import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, Mail, ArrowLeft, ShieldAlert, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const { loginAdmin, setCurrentView, showToast, data } = usePortfolio();
  const [email, setEmail] = useState('sahilpathan52004@gmail.com');
  const [password, setPassword] = useState('Admin@Sahil2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const profile = data?.profile || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Login failed. Please check credentials.');
      }

      loginAdmin(json.token, json);
    } catch (err) {
      setErrorMsg(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="glass-panel admin-login-card">
        
        <button
          onClick={() => setCurrentView('home')}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <div className="login-header">
          <div className="login-avatar-badge">
            <img
              src={profile.avatarUrl || '/images/mypimg.jpeg'}
              alt={profile.name || 'Admin'}
              className="login-admin-photo"
              onError={(e) => { e.target.src = '/images/mypimg.jpeg'; }}
            />
          </div>
          <h2 className="login-title">Admin Dashboard Login</h2>
          <p className="login-subtitle">
            Enter your credentials to manage your live MERN portfolio content and messages.
          </p>
        </div>

        {errorMsg && (
          <div className="error-alert">
            <ShieldAlert size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Admin Email</label>
            <div className="input-with-icon">
              <Mail size={17} className="field-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-field"
                placeholder="sahilpathan52004@gmail.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={17} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-field"
                placeholder="••••••••"
                style={{ paddingRight: '2.8rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '0.8rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', padding: '0.2rem'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary login-submit-btn"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          position: relative;
          z-index: 1;
        }
        .admin-login-card {
          width: 100%;
          max-width: 440px;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-hover);
          box-shadow: var(--shadow-lg);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          transition: color 0.2s ease;
        }
        .back-btn:hover {
          color: var(--text-primary);
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-avatar-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1.2rem auto;
          border: 3px solid var(--accent-primary);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
          position: relative;
        }
        .login-admin-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .login-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .login-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .error-alert {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm);
          color: #f87171;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }
        .login-form .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.45rem;
        }
        .input-with-icon {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
          z-index: 2;
        }
        .login-field {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.9rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-main);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          -webkit-appearance: none;
        }
        .login-field:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .login-field::placeholder {
          color: var(--text-muted);
          opacity: 1;
        }
        .login-submit-btn {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.85rem;
        }
        @media (max-width: 480px) {
          .admin-login-page {
            padding: 1.2rem 0.75rem;
          }
          .admin-login-card {
            padding: 1.4rem 1rem;
            border-radius: var(--radius-md);
          }
          .login-title {
            font-size: 1.25rem;
          }
          .login-subtitle {
            font-size: 0.82rem;
          }
          .login-avatar-badge {
            width: 60px;
            height: 60px;
            margin-bottom: 0.8rem;
          }
          .back-btn {
            margin-bottom: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;

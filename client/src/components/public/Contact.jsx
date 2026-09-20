import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

const Contact = () => {
  const { data, showToast } = usePortfolio();
  const profile = data.profile || {};
  const social = profile.socialLinks || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to send message');

      setSubmitted(true);
      showToast(json.message || 'Message sent successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-badge">Get In Touch</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Collaborate</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, need full-stack architectural expertise, or looking to hire? Drop a message below!
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Side Panel */}
          <div className="glass-panel contact-info-card">
            <h3 className="info-heading">Contact Channels</h3>
            <p className="info-desc">
              I am actively seeking software engineering and MERN developer opportunities. Reach out directly or submit an inquiry through the form.
            </p>

            <div className="info-channels-list">
              <a href={`mailto:${profile.email || 'sahilpathan52004@gmail.com'}`} className="channel-item">
                <div className="channel-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="channel-label">Email Address</span>
                  <strong className="channel-val">{profile.email || 'sahilpathan52004@gmail.com'}</strong>
                </div>
              </a>

              <a href={`tel:${profile.phone || '+919371960486'}`} className="channel-item">
                <div className="channel-icon-box">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="channel-label">Phone & WhatsApp</span>
                  <strong className="channel-val">{profile.phone || '+91 9371960486'}</strong>
                </div>
              </a>

              <div className="channel-item static">
                <div className="channel-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="channel-label">Base Location</span>
                  <strong className="channel-val">{profile.location || 'Tuljapur, Maharashtra, India'}</strong>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-social-row">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="social-pill" title="GitHub">
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" title="LinkedIn">
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel contact-form-card">
            {submitted ? (
              <div className="success-submitted-box">
                <CheckCircle size={48} className="success-icon" />
                <h3>Thank You!</h3>
                <p>Your message has been sent directly to Sahil's inbox in MongoDB. He will review it and reply as soon as possible.</p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell me about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary submit-btn"
                >
                  {submitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 0.95fr 1.25fr;
          gap: 2.5rem;
          align-items: start;
        }
        .contact-info-card {
          padding: 2.2rem;
        }
        .info-heading {
          font-size: 1.35rem;
          margin-bottom: 0.8rem;
          color: var(--text-primary);
        }
        .info-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .info-channels-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }
        .channel-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: var(--transition-fast);
        }
        .channel-item:not(.static):hover {
          border-color: var(--border-hover);
          transform: translateX(4px);
        }
        .channel-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--accent-gradient-subtle);
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .channel-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .channel-val {
          display: block;
          font-size: 0.92rem;
          color: var(--text-primary);
        }
        .contact-social-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
        }
        .social-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .contact-form-card {
          padding: 2.2rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }
        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          transition: var(--transition-fast);
        }
        .form-input:focus, .form-textarea:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          font-size: 1rem;
        }
        .success-submitted-box {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .success-icon {
          color: #10b981;
        }
        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .form-group-row {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .contact-info-card, .contact-form-card {
            padding: 1.15rem 0.85rem;
          }
          .info-heading {
            font-size: 1.15rem;
          }
          .channel-item {
            padding: 0.65rem 0.75rem;
            gap: 0.7rem;
          }
          .channel-val {
            font-size: 0.82rem;
            word-break: break-all;
          }
          .channel-icon-box {
            width: 34px;
            height: 34px;
          }
          .form-input, .form-textarea {
            padding: 0.65rem 0.75rem;
            font-size: 0.88rem;
          }
          .submit-btn {
            font-size: 0.9rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;

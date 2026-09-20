// ============================================================
//   SAHIL R. PATHAN — PORTFOLIO JS
//   Features: Custom Cursor · Left Hamburger + Overlay ·
//   Typed.js · Scroll Reveal · Counter · Parallax Orbs ·
//   Navbar Scroll Effect · Card Tilt · Magnetic Buttons ·
//   Ripple Effect · Page Load Sparkle · SVG Nav Icons
//   + Theme & Language Switcher (integrated)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────
  //  SVG ICON LIBRARY (inline, no external dependency)
  // ─────────────────────────────────────────────────────────
  const SVG_ICONS = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 98 96" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    gmail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/></svg>`,
    times: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  };

  // ─────────────────────────────────────────────────────────
  //  CUSTOM CURSOR
  // ─────────────────────────────────────────────────────────
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    }
  });

  function animateRing() {
    if (cursorRing) {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .skill-item, .project-card, .cert-card, .filter-btn, .info-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor)     { cursor.style.width = '18px'; cursor.style.height = '18px'; cursor.style.background = 'var(--amber-light)'; }
      if (cursorRing) { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; cursorRing.style.borderColor = 'rgba(245,166,35,0.75)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor)     { cursor.style.width = '10px'; cursor.style.height = '10px'; cursor.style.background = 'var(--amber)'; }
      if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; cursorRing.style.borderColor = 'rgba(245,166,35,0.55)'; }
    });
  });

  document.addEventListener('mouseleave', () => {
    if (cursor)     cursor.style.opacity = '0';
    if (cursorRing) cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursor)     cursor.style.opacity = '1';
    if (cursorRing) cursorRing.style.opacity = '1';
  });

  // ─────────────────────────────────────────────────────────
  //  NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─────────────────────────────────────────────────────────
  //  HELPER — normalize a nav href to a pathname for matching
  //  Works for both local (.html) and Netlify (clean URLs)
  // ─────────────────────────────────────────────────────────
  function getNavPath(href) {
    if (!href) return '/';
    // Anchor-only links (#home etc.) — ignore
    if (href.startsWith('#')) return href;
    try {
      const url = new URL(href, window.location.origin);
      // Strip trailing slash and .html so both forms match the same key
      return url.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    } catch {
      return href.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    }
  }

  // Icon map — keyed by normalized pathname (no .html, no trailing slash)
  const iconMap = {
    '/':          'home',
    '/index':     'home',   // just in case
    '/about':     'user',
    '/projects':  'code',
    '/contact':   'mail',
  };

  // ─────────────────────────────────────────────────────────
  //  ACTIVE NAV LINK  (Netlify-safe)
  // ─────────────────────────────────────────────────────────
  const currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll('.nav-links a').forEach(a => {
    const aPath = getNavPath(a.getAttribute('href'));
    if (aPath === currentPath || (currentPath === '/' && aPath === '/index')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // ─────────────────────────────────────────────────────────
  //  PREMIUM LEFT DRAWER
  // ─────────────────────────────────────────────────────────
  const toggle   = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  function buildDrawer() {
    if (window.innerWidth > 768) return;
    if (navLinks.querySelector('.nav-drawer-profile')) return;

    // 1. Profile card (with close button inside)
    const profile = document.createElement('div');
    profile.className = 'nav-drawer-profile';
    profile.innerHTML = `
      <div class="nav-drawer-avatar-placeholder">
        <img src="images/mypimg.jpeg" alt="Sahil R. Pathan" onerror="this.parentElement.textContent='SP'" />
      </div>
      <div class="nav-drawer-info">
        <div class="nav-drawer-name">Sahil R. Pathan</div>
        <div class="nav-drawer-role">fullstack developer</div>
        <div class="nav-drawer-status">
          <span class="nav-drawer-status-dot"></span>
          Open to opportunities
        </div>
      </div>
      <button class="nav-drawer-close" aria-label="Close menu">
        ${SVG_ICONS.times}
      </button>`;
    navLinks.prepend(profile);
    navLinks.querySelector('.nav-drawer-close').addEventListener('click', closeMenu);

    // 2. Section label
    const label = document.createElement('span');
    label.className = 'nav-drawer-section-label';
    label.textContent = 'Navigation';
    const firstLi = navLinks.querySelector('li');
    navLinks.insertBefore(label, firstLi || navLinks.children[1]);

    // 3. Add SVG icons to nav links — use normalized path matching
    navLinks.querySelectorAll('a').forEach(a => {
      if (a.querySelector('.nav-icon')) return;
      const aPath  = getNavPath(a.getAttribute('href'));
      const svgKey = iconMap[aPath] || 'home';
      const icon   = document.createElement('span');
      icon.className = 'nav-icon';
      icon.innerHTML = SVG_ICONS[svgKey];
      a.insertBefore(icon, a.firstChild);
    });

    // 4. Divider
    const div1 = document.createElement('div');
    div1.className = 'nav-drawer-divider';
    navLinks.appendChild(div1);

    // 5. Social buttons
    const socials = document.createElement('div');
    socials.className = 'nav-drawer-socials';
    socials.innerHTML = `
      <a href="https://github.com/spcoder0486-leg" target="_blank" class="nav-drawer-social-btn" data-brand="github">
        ${SVG_ICONS.github}
        <span>GitHub</span>
      </a>
      <a href="https://www.linkedin.com/in/sahil-pathan-394513261" target="_blank" class="nav-drawer-social-btn" data-brand="linkedin">
        ${SVG_ICONS.linkedin}
        <span>LinkedIn</span>
      </a>
      <a href="mailto:sahilpathan52004@gmail.com" class="nav-drawer-social-btn" data-brand="gmail">
        ${SVG_ICONS.gmail}
        <span>Gmail</span>
      </a>`;
    navLinks.appendChild(socials);

    // 6. Footer tagline
    const foot = document.createElement('div');
    foot.className = 'nav-drawer-footer';
    foot.textContent = '© 2025 Sahil R. Pathan';
    navLinks.appendChild(foot);
  }

  buildDrawer();
  window.addEventListener('resize', buildDrawer);

  // ── Overlay ──
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    buildDrawer();
    navLinks.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (toggle) {
      toggle.style.opacity       = '0';
      toggle.style.visibility    = 'hidden';
      toggle.style.pointerEvents = 'none';
    }

    navLinks.querySelectorAll('a').forEach((a, i) => {
      a.style.opacity   = '0';
      a.style.transform = 'translateX(-18px)';
      setTimeout(() => {
        a.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.28s, background 0.28s, border-color 0.28s, padding 0.28s';
        a.style.opacity   = '1';
        a.style.transform = '';
      }, 120 + i * 60);
    });
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    if (toggle) {
      toggle.style.opacity       = '1';
      toggle.style.visibility    = 'visible';
      toggle.style.pointerEvents = 'auto';
    }
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
    });
  }

  // ─────────────────────────────────────────────────────────
  //  TYPED.JS
  // ─────────────────────────────────────────────────────────
  const typedEl = document.getElementById('typed');
  if (typedEl && window.Typed) {
    new Typed('#typed', {
      strings: [
        'Java FullStack Developer',
        'React & Angular Dev',
        'Spring Boot Engineer',
        'Database Designer',
        'UI/UX Enthusiast',
        'Problem Solver'
      ],
      typeSpeed:  55,
      backSpeed:  30,
      backDelay:  2000,
      loop:       true,
      cursorChar: '█',
    });
  }

  // ─────────────────────────────────────────────────────────
  //  SCROLL REVEAL
  // ─────────────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => revealObserver.observe(el));

  // ─────────────────────────────────────────────────────────
  //  ANIMATED COUNTER
  // ─────────────────────────────────────────────────────────
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        let current  = 0;
        const step   = target / 60;
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ─────────────────────────────────────────────────────────
  //  PARALLAX ORBS
  // ─────────────────────────────────────────────────────────
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 10;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  // ─────────────────────────────────────────────────────────
  //  3D CARD TILT
  // ─────────────────────────────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const cx      = rect.width  / 2;
      const cy      = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) *  6;
      card.style.transform  = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.35s var(--ease, cubic-bezier(0.22,1,0.36,1))';
    });
  });

  // ─────────────────────────────────────────────────────────
  //  MAGNETIC BUTTONS
  // ─────────────────────────────────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x    = e.clientX - rect.left - rect.width  / 2;
      const y    = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform  = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      btn.style.transition = 'transform 0.15s ease, background 0.35s, box-shadow 0.35s';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'all 0.35s var(--ease, cubic-bezier(0.22,1,0.36,1))';
    });
  });

  // ─────────────────────────────────────────────────────────
  //  RIPPLE EFFECT
  // ─────────────────────────────────────────────────────────
  function createRipple(e) {
    const btn    = e.currentTarget;
    const circle = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    circle.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
      background:rgba(255,255,255,0.2); border-radius:50%;
      transform:scale(0); animation:rippleAnim 0.6s linear;
      pointer-events:none;
    `;

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `@keyframes rippleAnim { to { transform:scale(4); opacity:0; } }`;
      document.head.appendChild(style);
    }

    btn.style.overflow = 'hidden';
    btn.style.position = btn.style.position || 'relative';
    btn.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }

  document.querySelectorAll('.btn-primary, .btn-ghost, .filter-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // ─────────────────────────────────────────────────────────
  //  SKILL ITEM COLOR SHIMMER
  // ─────────────────────────────────────────────────────────
  const skillColors = [
    'rgba(245,166,35,0.18)',
    'rgba(95,184,138,0.15)',
    'rgba(74,144,217,0.14)',
  ];

  document.querySelectorAll('.skill-item').forEach((el, i) => {
    el.addEventListener('mouseenter', () => { el.style.background = skillColors[i % skillColors.length]; });
    el.addEventListener('mouseleave', () => { el.style.background = ''; });
  });

  // ─────────────────────────────────────────────────────────
  //  CONTACT FORM
  // ─────────────────────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function() {
      const btn    = form.querySelector('button[type="submit"]');
      const status = document.getElementById('form-status');
      if (btn) {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          Sending…`;
        btn.disabled = true;
        if (!document.getElementById('spin-style')) {
          const s = document.createElement('style');
          s.id = 'spin-style';
          s.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
          document.head.appendChild(s);
        }
        setTimeout(() => {
          btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Message Sent!`;
          btn.style.background = 'var(--sage)';
          if (status) status.textContent = '✓ Thank you! I will reply shortly.';
          setTimeout(() => {
            btn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Send Message`;
            btn.disabled = false;
            btn.style.background = '';
            if (status) status.textContent = '';
          }, 3500);
        }, 2200);
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  //  HERO NAME GLOW
  // ─────────────────────────────────────────────────────────
  const heroName = document.querySelector('.hero-content h1 .name');
  if (heroName) {
    setTimeout(() => {
      heroName.style.textShadow = '0 0 60px rgba(245,166,35,0.25)';
      heroName.style.transition = 'text-shadow 1s ease';
    }, 900);
  }

  // ─────────────────────────────────────────────────────────
  //  SECTION LINE DRAW ON SCROLL
  // ─────────────────────────────────────────────────────────
  const sectionLines = document.querySelectorAll('.section-line');
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width   = '48px';
        entry.target.style.opacity = '1';
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sectionLines.forEach(line => {
    line.style.width      = '0px';
    line.style.opacity    = '0';
    line.style.transition = 'width 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s, opacity 0.4s ease 0.2s';
    lineObserver.observe(line);
  });

  // ─────────────────────────────────────────────────────────
  //  FLOATING TAGS ENTRANCE
  // ─────────────────────────────────────────────────────────
  document.querySelectorAll('.floating-tag').forEach((tag, i) => {
    tag.style.opacity    = '0';
    tag.style.transform  = tag.style.transform + ' translateX(16px)';
    tag.style.transition = `opacity 0.5s ease ${0.8 + i * 0.15}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.8 + i * 0.15}s`;
    setTimeout(() => {
      tag.style.opacity   = '1';
      tag.style.transform = tag.style.transform.replace(' translateX(16px)', '');
    }, 800 + i * 150);
  });

  // ─────────────────────────────────────────────────────────
  //  SPARKLE ON HERO IMAGE HOVER
  // ─────────────────────────────────────────────────────────
  const heroImgWrap = document.querySelector('.hero-img-wrap');
  if (heroImgWrap) {
    heroImgWrap.addEventListener('mouseenter', () => {
      for (let i = 0; i < 8; i++) spawnSparkle(heroImgWrap);
    });
  }

  function spawnSparkle(parent) {
    const spark = document.createElement('span');
    const size  = Math.random() * 6 + 3;
    const x     = Math.random() * 100;
    const y     = Math.random() * 100;
    const angle = Math.random() * 360;
    const dist  = 40 + Math.random() * 40;

    spark.style.cssText = `
      position:absolute; left:${x}%; top:${y}%;
      width:${size}px; height:${size}px;
      background:var(--amber); border-radius:50%;
      pointer-events:none; z-index:10; opacity:1;
      transform:scale(1);
      transition:transform 0.6s ease, opacity 0.6s ease, left 0.6s ease, top 0.6s ease;
    `;
    parent.appendChild(spark);

    requestAnimationFrame(() => {
      const rad = (angle * Math.PI) / 180;
      spark.style.left      = `calc(${x}% + ${Math.cos(rad) * dist}px)`;
      spark.style.top       = `calc(${y}% + ${Math.sin(rad) * dist}px)`;
      spark.style.opacity   = '0';
      spark.style.transform = 'scale(0)';
    });

    setTimeout(() => spark.remove(), 700);
  }

  // ─────────────────────────────────────────────────────────
  //  SMOOTH ANCHOR SCROLL
  // ─────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─────────────────────────────────────────────────────────
  //  THEME & LANGUAGE SWITCHER  (new)
  // ─────────────────────────────────────────────────────────
  // Theme switcher
  const themeBtn = document.getElementById('themeBtn');
  const themeMenu = document.getElementById('themeMenu');
  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('open');
      // Close language menu if open
      const langMenu = document.getElementById('langMenu');
      if (langMenu) langMenu.classList.remove('open');
    });

    themeMenu.querySelectorAll('[data-theme-set]').forEach(item => {
      item.addEventListener('click', () => {
        const theme = item.getAttribute('data-theme-set');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('sp-theme', theme);
        themeMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      themeMenu.classList.remove('open');
    });
  }

  // Language switcher
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  const langBtnLabel = document.getElementById('langBtnLabel');
  const langSwitcherEl = document.getElementById('langSwitcher');
  if (langBtn && langMenu) {
    // Mark active lang on load
    const activeLang = document.documentElement.getAttribute('data-lang') || 'en';
    langMenu.querySelectorAll('[data-lang-set]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-lang-set') === activeLang);
    });
    const labels = { en: 'EN', hi: 'हि', mr: 'मर' };
    if (langBtnLabel) langBtnLabel.textContent = labels[activeLang] || activeLang.toUpperCase();

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle('open');
      if (langSwitcherEl) langSwitcherEl.classList.toggle('open', isOpen);
      if (themeMenu) themeMenu.classList.remove('open');
    });

    langMenu.querySelectorAll('[data-lang-set]').forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang-set');
        document.documentElement.setAttribute('data-lang', lang);
        localStorage.setItem('sp-lang', lang);
        if (langBtnLabel) langBtnLabel.textContent = labels[lang] || lang.toUpperCase();
        // Mark active
        langMenu.querySelectorAll('[data-lang-set]').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        langMenu.classList.remove('open');
        if (langSwitcherEl) langSwitcherEl.classList.remove('open');
        if (window.updateI18n) window.updateI18n();
      });
    });

    document.addEventListener('click', () => {
      langMenu.classList.remove('open');
      if (langSwitcherEl) langSwitcherEl.classList.remove('open');
    });
  }

});
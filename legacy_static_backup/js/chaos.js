// ============================================================
//   chaos.js — Extra animations & decorative effects
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Subtle random sparkles on grid background ──
  const gridBg = document.querySelector('.grid-bg');
  if (gridBg) {
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('span');
      const size = 1 + Math.random() * 3;
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255,0,160,0.18);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: 0.3;
        animation: floatDot ${8 + Math.random() * 12}s linear infinite;
        animation-delay: ${Math.random() * 6}s;
      `;
      document.body.appendChild(dot);
    }
    if (!document.getElementById('chaos-keyframes')) {
      const style = document.createElement('style');
      style.id = 'chaos-keyframes';
      style.textContent = `
        @keyframes floatDot {
          0%   { transform: translate(0,0); opacity:0.1; }
          25%  { opacity:0.5; }
          50%  { transform: translate(40px, -30px); opacity:0.3; }
          75%  { opacity:0.6; }
          100% { transform: translate(-30px, 40px); opacity:0.1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ── Hero image shine effect on load ──
  const heroImg = document.querySelector('.hero-img-wrap img');
  if (heroImg) {
    setTimeout(() => {
      heroImg.style.transition = 'filter 1.2s ease';
      heroImg.style.filter = 'brightness(1) saturate(1.05)';
    }, 400);
  }

  // ── Subtle tilt on info/cert cards ──
  document.querySelectorAll('.info-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(400px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-2px)`;
      card.style.transition = 'transform 0.15s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.22,1,0.36,1)';
    });
  });

  // NOTE: Hero name glint removed — it was setting color:transparent and breaking visibility.

});
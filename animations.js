/* ═══════════════════════════════════════════════════════════════════
   ANIMATIONS.JS — Civil Engineering Canvas & Enhanced Animations
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── ENGINEERING BACKGROUND CANVAS ── */
  function initEngineeringCanvas() {
    const canvas = document.getElementById('engineering-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf;

    const STEEL  = '#4D8FCC';
    const GOLD   = '#E8A420';
    const nodes  = [];
    const GRID   = 80;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function buildGrid() {
      nodes.length = 0;
      const cols = Math.ceil(W / GRID) + 1;
      const rows = Math.ceil(H / GRID) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.45) {
            nodes.push({
              x:  c * GRID + (Math.random() - 0.5) * 20,
              y:  r * GRID + (Math.random() - 0.5) * 20,
              vx: (Math.random() - 0.5) * 0.18,
              vy: (Math.random() - 0.5) * 0.18,
              r:  Math.random() * 2 + 1,
              gold: Math.random() < 0.2,
              pulse: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Move nodes
      nodes.forEach(n => {
        n.x  += n.vx; n.y  += n.vy;
        n.pulse += 0.02;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      });

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const lineAlpha = isDark ? 0.07 : 0.05;
      const dotAlpha  = isDark ? 0.22 : 0.15;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < GRID * 1.6) {
            const alpha = (1 - dist / (GRID * 1.6)) * lineAlpha;
            ctx.beginPath();
            ctx.strokeStyle = a.gold || b.gold
              ? `rgba(232,164,32,${alpha})`
              : `rgba(77,143,204,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = n.r + pulse * 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.gold
          ? `rgba(232,164,32,${dotAlpha * (0.6 + pulse * 0.4)})`
          : `rgba(77,143,204,${dotAlpha * (0.5 + pulse * 0.3)})`;
        ctx.fill();
      });

      // Draw floating measurement annotations
      if (isDark) {
        drawAnnotations(ctx, t);
      }

      raf = requestAnimationFrame(draw);
    }

    function drawAnnotations(ctx, t) {
      const annotations = [
        { x: 0.12, y: 0.15, text: 'SPAN: 12.5m', color: GOLD },
        { x: 0.78, y: 0.82, text: 'GRADE: 1:2.5', color: STEEL },
        { x: 0.88, y: 0.22, text: 'θ = 45°', color: GOLD },
        { x: 0.05, y: 0.75, text: 'RCC M25', color: STEEL },
      ];
      annotations.forEach((a, i) => {
        const ox = Math.sin(t * 0.4 + i) * 6;
        const oy = Math.cos(t * 0.3 + i * 1.2) * 4;
        const alpha = 0.08 + Math.sin(t * 0.6 + i) * 0.03;
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillStyle = a.color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
        if (a.color === GOLD) {
          ctx.fillStyle = `rgba(232,164,32,${alpha})`;
        } else {
          ctx.fillStyle = `rgba(77,143,204,${alpha})`;
        }
        ctx.fillText(a.text, W * a.x + ox, H * a.y + oy);
      });
    }

    window.addEventListener('resize', () => { resize(); buildGrid(); });
    resize();
    buildGrid();
    draw();
  }

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, suffix) {
    if (!el) return;
    const isFloat = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = isFloat
        ? (target * ease).toFixed(2)
        : Math.round(target * ease);
      el.textContent = val + (suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── INTERSECTION OBSERVER FOR REVEAL ── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => observer.observe(el));
  }

  /* ── PARALLAX SUBTLE ── */
  function initParallax() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const blueprint = document.querySelector('.blueprint-lines');
          if (blueprint) {
            blueprint.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
          const heroBg = document.querySelector('.hero-bg');
          if (heroBg) {
            heroBg.style.transform = `translateY(${scrollY * 0.12}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── SMOOTH NAV INDICATOR ── */
  function initActiveNavIndicator() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
          const id = e.target.getAttribute('id');
          navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
  }

  /* ── CURSOR MAGNETIC EFFECT ON BUTTONS ── */
  function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-primary, .btn-secondary, #back-to-top');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── INIT ── */
  function init() {
    initEngineeringCanvas();
    initParallax();
    setTimeout(initActiveNavIndicator, 500);
    setTimeout(initMagneticButtons, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init magnetic buttons after loader hides (dynamic content)
  setTimeout(initMagneticButtons, 3000);

})();

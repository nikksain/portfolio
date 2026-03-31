/* ═══════════════════════════════════════════════
   APP.JS — Portfolio Engine
   ═══════════════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const D = PORTFOLIO_DATA;

  // 1. Render all content from data.js
  renderPersonal(D);
  renderNavLinks();
  renderHero(D);
  renderAbout(D);
  renderSkills(D);
  renderEducation(D);
  renderProjects(D);
  renderAchievements(D);
  renderExperience(D);
  renderCertifications(D);
  renderGallery(D);
  renderContact(D);
  renderSocialStrip(D);
  renderFooter(D);

  // 2. Init all interactive features
  initLoader();
  initTheme();
  initCursor();
  initScrollProgress();
  initNav();
  initReveal();
  initTypewriter(D.typedRoles);
  initProjectFilter();
  initGallery(D);
  initLightbox();
  initContactForm(D);
  initCounters();
  initRadar(D);
});

/* ═══════════════════════════════════════════════
   RENDERERS
   ═══════════════════════════════════════════════ */

function renderPersonal(D) {
  const p = D.personal;
  document.title = p.fullName + ' — ' + p.title;
  const m = document.querySelector('meta[name="description"]');
  if (m) m.content = p.fullName + ' — Civil Engineering student at ' + p.university + '. ' + p.tagline;
}

function renderNavLinks() {
  const links = [
    { href: '#hero',           label: 'Home'         },
    { href: '#about',          label: 'About'        },
    { href: '#skills',         label: 'Skills'       },
    { href: '#education',      label: 'Education'    },
    { href: '#projects',       label: 'Projects'     },
    { href: '#experience',     label: 'Experience'   },
    { href: '#achievements',   label: 'Achievements' },
    { href: '#certifications', label: 'Certificates' },
    { href: '#gallery',        label: 'Gallery'      },
    { href: 'blog.html',       label: 'Blog ↗'       },
    { href: '#contact',        label: 'Contact'      },
  ];
  const desktop = document.getElementById('nav-links-container');
  const mobile  = document.getElementById('nav-mobile-links');
  if (desktop) desktop.innerHTML = links.map(l => `<li><a href="${l.href}" class="nav-link">${l.label}</a></li>`).join('');
  if (mobile)  mobile.innerHTML  = links.map(l => `<a href="${l.href}" class="nav-mobile-link">${l.label}</a>`).join('');
}

function renderHero(D) {
  const p = D.personal;
  setText('hero-first-name',  p.firstName);
  setText('hero-last-name',   p.lastName);
  setText('hero-availability', p.availability);
  setText('hero-stat-cgpa',   p.cgpa);
  setText('hero-stat-intern', p.internship);
  setText('hero-stat-year',   p.gradYear);
  setText('hero-stat-year-2', p.gradYear);

  const img = document.getElementById('hero-photo');
  if (img) { img.src = p.photo; img.alt = p.fullName + ' — Civil Engineer'; }

  const hireBtn = document.getElementById('hero-hire-btn');
  if (hireBtn) hireBtn.href = 'mailto:' + p.email + '?subject=Job%20Opportunity%20for%20' + encodeURIComponent(p.fullName);

  const navHire = document.getElementById('nav-hire-btn');
  if (navHire) navHire.href = 'mailto:' + p.email + '?subject=Job%20Opportunity';

  const resumeBtn = document.getElementById('hero-resume-btn');
  if (resumeBtn) resumeBtn.href = p.resumeLink;
}

function renderAbout(D) {
  const a = D.about, p = D.personal;
  setText('about-quote',       a.quote);
  setHTML('about-bio1',        a.bio1);
  setHTML('about-bio2',        a.bio2);
  setHTML('about-bio3',        a.bio3);
  setText('about-stat-cgpa',   p.cgpa);
  setText('about-stat-intern', p.internship);

  const chips = document.getElementById('about-chips');
  if (chips) chips.innerHTML = a.tags.map(t => `<span class="chip">${t}</span>`).join('');

  const hl = document.getElementById('about-highlights');
  if (hl) hl.innerHTML = a.highlights.map(h => `<li class="about-hl-item">${h}</li>`).join('');
}

function renderSkills(D) {
  // Skill cards — NO percentages shown
  const grid = document.getElementById('skills-cards-grid');
  if (grid) {
    grid.innerHTML = D.skills.technical.map((s, i) => `
      <div class="skill-card card" data-reveal="up" data-delay="${i + 1}">
        <div class="skill-card-icon"><i class="${s.icon}"></i></div>
        <h3 class="skill-card-name">${s.name}</h3>
        <p class="skill-card-desc">${s.desc}</p>
      </div>`).join('');
  }

  // Hide skill bars entirely (no percentages)
  const bars = document.getElementById('skill-bars');
  if (bars) bars.style.display = 'none';

  // Soft skills tags
  const soft = document.getElementById('soft-skills');
  if (soft) {
    soft.innerHTML = D.skills.soft.map(s =>
      `<span class="soft-tag"><i class="${s.icon}"></i>${s.name}</span>`).join('');
  }
}

function renderEducation(D) {
  const tl = document.getElementById('edu-timeline');
  if (!tl) return;
  const line = tl.querySelector('.timeline-line');
  tl.innerHTML = '';
  if (line) tl.appendChild(line);
  D.education.forEach((e, i) => {
    const art = document.createElement('article');
    art.className = 'timeline-item';
    art.setAttribute('data-reveal', 'up');
    art.setAttribute('data-delay', String(i + 2));
    art.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card card">
        <div class="timeline-date"><i class="fas fa-calendar-alt"></i> ${e.year}</div>
        <h3 class="timeline-degree">${e.degree}</h3>
        <p class="timeline-inst">${e.inst}</p>
        <div class="timeline-tags">
          ${e.tags.map((t, j) => `<span class="badge ${j === 0 ? 'badge-gold' : 'badge-steel'}">${t}</span>`).join('')}
        </div>
      </div>`;
    tl.appendChild(art);
  });
}

function renderProjects(D) {
  const tabs = document.getElementById('project-filter-tabs');
  if (tabs) {
    tabs.innerHTML = D.projectFilters.map(f =>
      `<button class="filter-tab${f === 'all' ? ' active' : ''}" data-filter="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</button>`).join('');
  }

  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = D.projects.map((p, i) => `
    <article class="project-card card" data-reveal="up" data-delay="${(i % 3) + 1}" data-filter="${p.filter}">
      <div class="project-media">
        ${p.image ? `<img class="project-img" src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
        <div class="project-img-placeholder" style="${p.image ? 'display:none' : ''}">${p.icon}</div>
        <div class="project-media-gradient"></div>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${p.tags.map((t, ti) => `<span class="badge badge-${p.tagTypes[ti] || 'steel'}">${t}</span>`).join('')}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-meta">
          <span class="project-meta-item"><i class="fas fa-map-marker-alt"></i> ${p.location}</span>
          <span class="project-meta-item"><i class="fas fa-clock"></i> ${p.duration}</span>
          <span class="project-meta-item"><i class="fas fa-building"></i> ${p.type}</span>
        </div>
      </div>
    </article>`).join('');
}

function renderAchievements(D) {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
  grid.innerHTML = D.achievements.map((a, i) => `
    <div class="achievement-card card" data-reveal="up" data-delay="${(i % 4) + 1}">
      <div class="achievement-icon"><i class="${a.icon}"></i></div>
      <h3 class="achievement-title">${a.title}</h3>
      <p class="achievement-desc">${a.desc}</p>
      <div class="achievement-year">${a.year}</div>
    </div>`).join('');
}

function renderExperience(D) {
  const e = D.experience;
  setText('exp-company',  e.company);
  setText('exp-subtitle', e.subtitle);
  setText('exp-duration', e.duration);

  const mg = document.getElementById('exp-metrics');
  if (mg) {
    mg.innerHTML = e.metrics.map(m => `
      <div class="exp-metric card">
        <div class="exp-metric-val">${m.value}</div>
        <div class="exp-metric-label">${m.label}</div>
      </div>`).join('');
  }

  const iw = document.getElementById('exp-items');
  if (iw) {
    iw.innerHTML = e.items.map((item, i) => `
      <div class="exp-item" data-reveal="right" data-delay="${i + 2}">
        <div class="exp-item-icon"><i class="${item.icon}"></i></div>
        <div>
          <h4 class="exp-item-title">${item.title}</h4>
          <p class="exp-item-desc">${item.desc}</p>
        </div>
      </div>`).join('');
  }
}

function renderCertifications(D) {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  grid.innerHTML = D.certifications.map((c, i) => `
    <div class="cert-card card" data-reveal="up" data-delay="${(i % 3) + 1}">
      <div class="cert-image-wrap">
        ${c.image
          ? `<img src="${c.image}" alt="${c.title}" class="cert-image" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="cert-no-image" style="${c.image ? 'display:none' : ''}">🏅</div>
      </div>
      <div class="cert-body">
        <div class="cert-issuer">${c.issuer}</div>
        <h3 class="cert-title">${c.title}</h3>
        <p class="cert-desc">${c.desc}</p>
        <div class="cert-footer">
          <span class="cert-year">${c.year}</span>
          ${c.demoLink ? `<span class="cert-demo-tag"><i class="fas fa-link"></i> Demo Certificate Link</span>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function renderGallery(D) {
  const sw = document.getElementById('gallery-slides');
  const tw = document.getElementById('gallery-thumbs');
  const dw = document.getElementById('gallery-dots');
  if (!sw) return;

  sw.innerHTML = D.gallery.map((g, i) => `
    <div class="gallery-slide${i === 0 ? ' active' : ''}">
      ${g.src ? `<img src="${g.src}" alt="${g.caption}" loading="${i === 0 ? 'eager' : 'lazy'}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
      <div class="gallery-slide-placeholder" style="${g.src ? 'display:none' : ''}">${g.icon}</div>
      <div class="gallery-caption">
        <div class="gallery-caption-num">0${i + 1} / 0${D.gallery.length}</div>
        <div class="gallery-caption-title">${g.caption}</div>
      </div>
    </div>`).join('');

  if (dw) dw.innerHTML = D.gallery.map((_, i) =>
    `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Go to image ${i + 1}"></button>`).join('');

  if (tw) tw.innerHTML = D.gallery.map((g, i) => `
    <div class="gallery-thumb${i === 0 ? ' active' : ''}" data-idx="${i}" role="button" tabindex="0" aria-label="View image ${i + 1}">
      ${g.src ? `<img src="${g.src}" alt="${g.caption}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
      <div class="gallery-thumb-placeholder" style="${g.src ? 'display:none' : ''}">${g.icon}</div>
    </div>`).join('');
}

function renderContact(D) {
  const p = D.personal;
  const emailRow = document.getElementById('contact-email-row');
  if (emailRow) emailRow.setAttribute('data-copy', p.email);

  const emailVal = document.getElementById('contact-email-val');
  if (emailVal) emailVal.textContent = p.email;

  setText('contact-location-val', p.location);

  const resumeRow = document.getElementById('contact-resume-row');
  if (resumeRow) resumeRow.href = p.resumeLink;

  const linkedinRow = document.getElementById('contact-linkedin-row');
  if (linkedinRow) linkedinRow.href = p.linkedin;
}

function renderSocialStrip(D) {
  const p = D.personal;
  const row = document.getElementById('social-strip-row');
  if (!row) return;
  const socials = [
    { href: p.linkedin,          icon: 'fab fa-linkedin-in', label: 'LinkedIn'    },
    { href: p.instagram,         icon: 'fab fa-instagram',   label: 'Instagram'   },
    { href: p.youtube,           icon: 'fab fa-youtube',     label: 'YouTube'     },
    { href: p.twitter,           icon: 'fab fa-x-twitter',   label: 'Twitter / X' },
    { href: 'mailto:' + p.email, icon: 'fas fa-envelope',    label: 'Email Me'    },
  ].filter(s => s.href && s.href.length > 2);

  row.innerHTML = socials.map(s => `
    <a href="${s.href}" target="${s.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener noreferrer" class="social-pill">
      <span class="social-pill-icon"><i class="${s.icon}"></i></span>
      <span>${s.label}</span>
    </a>`).join('');
}

function renderFooter(D) {
  const p = D.personal;
  setText('footer-name',      p.firstName);
  setText('footer-name-last', p.lastName);

  const emailLink = document.getElementById('footer-email-link');
  if (emailLink) { emailLink.href = 'mailto:' + p.email; emailLink.textContent = p.email; }

  const resumeLink = document.getElementById('footer-resume-link');
  if (resumeLink) resumeLink.href = p.resumeLink;

  const socials = document.getElementById('footer-socials');
  if (socials) {
    const links = [
      { href: p.linkedin,  icon: 'fab fa-linkedin-in', label: 'LinkedIn'  },
      { href: p.instagram, icon: 'fab fa-instagram',   label: 'Instagram' },
      { href: p.twitter,   icon: 'fab fa-x-twitter',   label: 'Twitter'   },
      { href: p.youtube,   icon: 'fab fa-youtube',     label: 'YouTube'   },
    ].filter(s => s.href && s.href.length > 2);
    socials.innerHTML = links.map(s =>
      `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('');
  }
}

/* ═══════════════════════════════════════════════
   INTERACTIVE FEATURES
   ═══════════════════════════════════════════════ */

function initLoader() {
  const loader = document.getElementById('page-loader');
  const bar    = document.getElementById('loader-bar');
  const text   = document.getElementById('loader-text');
  if (!loader) return;
  const msgs = ['Loading…', 'Reading blueprints…', 'Mixing concrete…', 'Raising columns…', 'Welcome!'];
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct > 100) pct = 100;
    if (bar)  bar.style.width = pct + '%';
    if (text) text.textContent = msgs[Math.min(Math.floor(pct / 22), msgs.length - 1)];
    if (pct >= 100) { clearInterval(iv); setTimeout(() => loader.classList.add('loaded'), 400); }
  }, 80);
}

function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;
  const saved = localStorage.getItem('ns-theme') || 'dark';
  apply(saved);
  if (btn) btn.addEventListener('click', () => {
    const n = html.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(n);
    localStorage.setItem('ns-theme', n);
  });
  function apply(t) {
    html.dataset.theme = t;
    if (icon) icon.className = t === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  }, { passive: true });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, [role="button"], [data-copy]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
  }, { passive: true });
}

function initNav() {
  const nav     = document.getElementById('navbar');
  const toggle  = document.getElementById('nav-toggle');
  const mobile  = document.getElementById('nav-mobile');
  const backTop = document.getElementById('back-to-top');
  const SECS = ['hero','about','skills','education','projects','experience','achievements','certifications','gallery','blog','contact'];

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (nav)     nav.classList.toggle('scrolled', sy > 60);
    if (backTop) backTop.classList.toggle('visible', sy > 500);
    let active = 'hero';
    SECS.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 140) active = id;
    });
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(a => {
      a.classList.toggle('active', (a.getAttribute('href') || '').replace('#','') === active);
    });
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const nh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      window.scrollTo({ top: el.offsetTop - nh - 8, behavior: 'smooth' });
      closeMobile();
    });
  });

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !mobile.contains(e.target)) closeMobile();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });
  }

  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function closeMobile() {
    if (!mobile || !toggle) return;
    mobile.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

function initTypewriter(roles) {
  const el = document.getElementById('typed-word');
  if (!el || !roles || !roles.length) return;
  let ri = 0, ci = 0, del = false;
  function tick() {
    const cur = roles[ri];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, del ? 45 : 80);
  }
  setTimeout(tick, 1500);
}

function initProjectFilter() {
  document.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.project-card').forEach(c => {
      c.style.display = (f === 'all' || c.dataset.filter === f) ? '' : 'none';
    });
  });
}

function initGallery(D) {
  let cur = 0, timer = null;
  const total = D.gallery.length;

  function go(idx) {
    cur = ((idx % total) + total) % total;
    document.querySelectorAll('.gallery-slide').forEach((s, i) => s.classList.toggle('active', i === cur));
    document.querySelectorAll('.gallery-dot').forEach((d, i)   => d.classList.toggle('active', i === cur));
    document.querySelectorAll('.gallery-thumb').forEach((t, i) => t.classList.toggle('active', i === cur));
  }
  function reset() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); }

  const prev = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  if (prev) prev.addEventListener('click', () => { go(cur - 1); reset(); });
  if (next) next.addEventListener('click', () => { go(cur + 1); reset(); });

  document.querySelectorAll('.gallery-dot, .gallery-thumb').forEach(el => {
    el.addEventListener('click', () => { go(parseInt(el.dataset.idx)); reset(); });
  });

  const track = document.getElementById('gallery-slides');
  if (track) {
    let sx = 0;
    track.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const d = sx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 40) { go(d > 0 ? cur + 1 : cur - 1); reset(); }
    }, { passive: true });
  }

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  { go(cur - 1); reset(); }
    if (e.key === 'ArrowRight') { go(cur + 1); reset(); }
  });

  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : reset());
  reset();

  // Click slide to open lightbox
  document.querySelectorAll('.gallery-slide').forEach(slide => {
    slide.addEventListener('click', () => {
      const img = slide.querySelector('img');
      if (img && img.src) openLightbox(img.src, img.alt);
    });
  });
}

function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbBtn = document.getElementById('lightbox-close');
  if (!lb) return;

  window.openLightbox = function(src, alt) {
    if (lbImg) { lbImg.src = src; lbImg.alt = alt || ''; }
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  if (lbBtn) lbBtn.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initContactForm(D) {
  // Copy email on click
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
      const txt = el.dataset.copy;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(txt)
          .then(() => showToast('📋 Email copied!'))
          .catch(() => showToast('Email: ' + txt));
      } else { showToast('Email: ' + txt); }
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  });

  const submit = document.getElementById('form-submit');
  if (!submit) return;
  submit.addEventListener('click', () => {
    const name  = (document.getElementById('form-name')?.value    || '').trim();
    const email = (document.getElementById('form-email')?.value   || '').trim();
    const co    = (document.getElementById('form-company')?.value || '').trim() || 'N/A';
    const msg   = (document.getElementById('form-message')?.value || '').trim();

    if (!name || !email) { showToast('⚠️ Please fill in your name and email.'); return; }

    const sub  = encodeURIComponent('Portfolio Inquiry from ' + name);
    const body = encodeURIComponent(
      'Hello Nikhil,\n\nName: ' + name +
      '\nEmail: ' + email +
      '\nOrganization: ' + co +
      '\n\nMessage:\n' + msg +
      '\n\nBest regards,\n' + name
    );
    window.location.href = 'mailto:' + D.personal.email + '?subject=' + sub + '&body=' + body;

    const orig = submit.innerHTML;
    submit.innerHTML = '<i class="fas fa-check"></i> Opening Email Client…';
    submit.disabled = true;
    setTimeout(() => { submit.innerHTML = orig; submit.disabled = false; }, 3000);
  });
}

function initCounters() {
  const els = document.querySelectorAll('.count-up');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseFloat(el.dataset.target || 0);
      const dur = 1400, start = performance.now();
      (function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - t, 3);
        el.textContent = Number.isInteger(end) ? Math.round(e * end) : (e * end).toFixed(1);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = end % 1 === 0 ? end : end.toFixed(1);
      })(start);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

function initRadar(D) {
  const canvas = document.getElementById('radar-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  const isDark = document.documentElement.dataset.theme !== 'light';
  const tc = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
  const gc = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  new Chart(canvas, {
    type: 'radar',
    data: {
      labels: D.skills.radar.labels,
      datasets: [{
        data: D.skills.radar.scores,
        backgroundColor: 'rgba(77,143,204,0.12)',
        borderColor: 'rgba(77,143,204,0.7)',
        pointBackgroundColor: 'rgba(232,164,32,0.9)',
        pointBorderColor: 'transparent',
        pointRadius: 5,
        borderWidth: 1.8,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, color: tc, font: { size: 10 }, backdropColor: 'transparent' },
          grid: { color: gc },
          angleLines: { color: gc },
          pointLabels: { color: tc, font: { size: 11, family: 'Outfit' } },
        },
      },
    },
  });
}

/* ── Helpers ── */
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML  = val; }

function showToast(msg) {
  const toast = document.getElementById('toast');
  const text  = document.getElementById('toast-text');
  if (!toast) return;
  if (text) text.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => toast.classList.remove('show'), 3000);
}

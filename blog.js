/* ═══════════════════════════════════════════════════
   BLOG.JS  |  CMS-Powered Blog Controller
   Loads posts from /blog/*.md markdown files.
   All original UI features preserved.
═══════════════════════════════════════════════════ */
'use strict';

/* ── CATEGORY CONFIG ── */
const CAT = {
  all:          { label:'All',          icon:'fas fa-th',               c:'gold'  },
  construction: { label:'Construction', icon:'fas fa-hard-hat',          c:'gold'  },
  surveying:    { label:'Surveying',    icon:'fas fa-drafting-compass',  c:'steel' },
  water:        { label:'Water Infra',  icon:'fas fa-water',             c:'steel' },
  highway:      { label:'Highway',      icon:'fas fa-road',              c:'gold'  },
  structural:   { label:'Structural',   icon:'fas fa-building',          c:'steel' },
  career:       { label:'Career',       icon:'fas fa-user-tie',          c:'gold'  },
};

/* ── STATE ── */
let BLOG_POSTS  = [];
let activeCat   = 'all';
let activeView  = 'grid';
let activePost  = null;
let readerFs    = 16;

/* ═══════════════════════════════════════════════════
   MARKDOWN PARSER
═══════════════════════════════════════════════════ */
function parseMarkdown(md) {
  if (!md) return '';
  let html = md;

  // Protect code blocks
  const codeBlocks = [];
  html = html.replace(/```[\s\S]*?```/g, m => {
    codeBlocks.push(m.replace(/^```[^\n]*\n?/, '').replace(/```$/, ''));
    return `%%CB_${codeBlocks.length - 1}%%`;
  });

  // Tables
  html = html.replace(/^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (_, header, body) => {
    const ths = header.split('|').map(c => c.trim()).filter(Boolean).map(c => `<th>${c}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const tds = row.split('|').map(c => c.trim()).filter(Boolean).map(c => `<td>${c}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, (_, t) => `<blockquote>${t}</blockquote>`);

  // Headings
  html = html.replace(/^###### (.+)$/gm, (_, t) => `<h6>${t}</h6>`);
  html = html.replace(/^##### (.+)$/gm,  (_, t) => `<h5>${t}</h5>`);
  html = html.replace(/^#### (.+)$/gm,   (_, t) => `<h4>${t}</h4>`);
  html = html.replace(/^### (.+)$/gm,    (_, t) => `<h3>${t}</h3>`);
  html = html.replace(/^## (.+)$/gm,     (_, t) => `<h2>${t}</h2>`);
  html = html.replace(/^# (.+)$/gm,      (_, t) => `<h1>${t}</h1>`);

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr>');

  // Unordered lists
  html = html.replace(/(^[-*] .+\n?)+/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/(^\d+\. .+\n?)+/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Inline formatting
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g,         '<em>$1</em>');
  html = html.replace(/__(.+?)__/g,         '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g,           '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g,         '<code>$1</code>');

  // Images and links
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g,  '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Paragraphs
  html = html.replace(/^(?!<[hupotbilcdt]|%%CB|<img|<a |<strong|<em)(.+)$/gm, '<p>$1</p>');

  // Restore code blocks
  codeBlocks.forEach((code, i) => {
    html = html.replace(`%%CB_${i}%%`,
      `<pre><code>${code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`);
  });

  html = html.replace(/<p>\s*<\/p>/g, '');
  return html;
}

/* ═══════════════════════════════════════════════════
   FRONTMATTER PARSER
═══════════════════════════════════════════════════ */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  let currentKey = null;
  match[1].split('\n').forEach(line => {
    if (/^\s+- (.+)$/.test(line)) {
      if (currentKey) {
        if (!Array.isArray(meta[currentKey])) meta[currentKey] = [];
        meta[currentKey].push(line.match(/^\s+- (.+)$/)[1].trim());
      }
      return;
    }
    const kv = line.match(/^([^:]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1].trim();
      const val = kv[2].trim().replace(/^["']|["']$/g, '');
      if (val === '')           meta[currentKey] = [];
      else if (val === 'true')  meta[currentKey] = true;
      else if (val === 'false') meta[currentKey] = false;
      else                      meta[currentKey] = val;
    }
  });

  return { meta, body: match[2] };
}

/* ═══════════════════════════════════════════════════
   LOAD POSTS
   1. Try /blog/posts-index.json  (generated by build)
   2. Try directory listing
   3. Try known slugs from data attribute
═══════════════════════════════════════════════════ */
async function loadPosts() {
  let slugs = [];
  try {
    const res = await fetch('/blog/posts-index.json');
    if (res.ok) slugs = await res.json();
  } catch (_) {}

  if (!slugs.length) slugs = await discoverPosts();

  const results = await Promise.allSettled(slugs.map(fetchPost));
  BLOG_POSTS = results
    .filter(r => r.status === 'fulfilled' && r.value)
    .map(r => r.value)
    .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));
}

async function discoverPosts() {
  try {
    const res = await fetch('/blog/');
    if (res.ok) {
      const html = await res.text();
      const m = [...html.matchAll(/href="([^"]+\.md)"/g)];
      if (m.length) return m.map(x => x[1].replace('.md','').split('/').pop());
    }
  } catch (_) {}

  const el = document.getElementById('blog-post-list');
  if (el) { try { return JSON.parse(el.dataset.slugs || '[]'); } catch (_) {} }
  return [];
}

async function fetchPost(slug) {
  try {
    const res = await fetch(`/blog/${slug}.md`);
    if (!res.ok) return null;
    const { meta, body } = parseFrontmatter(await res.text());
    if (!meta.title) return null;

    const cfg = CAT[meta.category] || { label: meta.category || 'General', c: 'gold' };
    const displayDate = formatDate(meta.date);
    const tags = Array.isArray(meta.tags) ? meta.tags : [];

    const content = `
<div class="rd-hero-img">${meta.image
  ? `<img src="${meta.image}" alt="${meta.title}" loading="lazy" onerror="this.parentElement.style.display='none'">`
  : ''}</div>
<div class="post-meta">
  <span class="cat-pill cp-${cfg.c}">${cfg.label}</span>
  <span class="fc-date"><i class="fas fa-calendar-alt"></i>${displayDate}</span>
  <span class="fc-time"><i class="fas fa-clock"></i>${meta.readTime || '5 min read'}</span>
</div>
<h1 class="post-h1">${meta.title}</h1>
<p class="post-lead">${meta.excerpt || ''}</p>
<div class="post-author">
  <img src="/nikhil.png" alt="Nikhil Sain" class="pa-av" onerror="this.style.display='none'">
  <div><div class="pa-name">Nikhil Sain</div><div class="pa-role">B.Tech Civil Eng · DCRUST 2026</div></div>
  <div class="pa-end"><span class="pa-chip"><i class="fas fa-clock"></i>${meta.readTime || '5 min read'}</span></div>
</div>
<div class="article-body">${parseMarkdown(body)}</div>`;

    return {
      id: slug, title: meta.title,
      category: meta.category || 'general',
      date: displayDate, dateSort: meta.date || '2024-01-01',
      readTime: meta.readTime || '5 min read',
      image: meta.image || '', excerpt: meta.excerpt || '',
      tags, featured: meta.featured === true, emoji: '🏗️', content,
    };
  } catch (e) { return null; }
}

function formatDate(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'long' }); }
  catch (_) { return d; }
}

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  initTheme(); initNav(); initCursor(); initScrollProg(); initBTT(); initCanvas(); initReveal();
  showSkeleton();
  await loadPosts();
  hideSkeleton();
  buildCats(); buildFeatured(); buildGrid(); buildTopics();
  initSearch(); initViewToggle(); initReader(); initKeyboard(); updateCount();
  const hc = document.getElementById('hero-count');
  if (hc) hc.textContent = BLOG_POSTS.length;
  const hash = location.hash.replace('#','');
  if (hash) { const p = BLOG_POSTS.find(x => x.id === hash); if (p) setTimeout(() => openPost(p.id), 200); }
});

function showSkeleton() {
  const g = document.getElementById('grid');
  if (!g) return;
  g.innerHTML = [0,1,2].map(() => `
    <article class="card" style="pointer-events:none">
      <div class="card-img" style="background:var(--b2);animation:skPulse 1.4s ease-in-out infinite"></div>
      <div class="card-body">
        <div style="height:12px;width:60%;background:var(--b2);border-radius:4px;margin-bottom:12px;animation:skPulse 1.4s ease-in-out infinite"></div>
        <div style="height:18px;width:90%;background:var(--b2);border-radius:4px;margin-bottom:8px;animation:skPulse 1.4s ease-in-out infinite .1s"></div>
        <div style="height:14px;width:75%;background:var(--b2);border-radius:4px;animation:skPulse 1.4s ease-in-out infinite .2s"></div>
      </div>
    </article>`).join('');
  if (!document.getElementById('sk-style')) {
    const s = document.createElement('style');
    s.id = 'sk-style';
    s.textContent = '@keyframes skPulse{0%,100%{opacity:.4}50%{opacity:.9}}';
    document.head.appendChild(s);
  }
}
function hideSkeleton() { const g = document.getElementById('grid'); if (g) g.innerHTML = ''; }

/* ═══════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('ns-theme') || 'dark';
  applyTheme(saved);
  document.getElementById('theme-btn')?.addEventListener('click', () =>
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
}
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('ns-theme', t);
  const ico = document.getElementById('theme-ico');
  if (ico) ico.className = t === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ═══════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob-nav');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 36), { passive:true });
  ham?.addEventListener('click', () => {
    const o = mob.classList.toggle('open');
    ham.classList.toggle('open', o);
    ham.setAttribute('aria-expanded', o);
  });
  mob?.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => {
    mob.classList.remove('open'); ham.classList.remove('open'); ham.setAttribute('aria-expanded','false');
  }));
}

/* ═══════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════ */
function initCursor() {
  const ring = document.getElementById('cur-ring');
  const dot  = document.getElementById('cur-dot');
  if (!ring || !dot || !matchMedia('(pointer:fine)').matches) return;
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px)`;
  });
  (function raf() {
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    ring.style.transform=`translate(${rx}px,${ry}px)`;
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll('a,button,[onclick],.card,.topic-card,#featured-card').forEach(el => {
    el.addEventListener('mouseenter',()=>{ ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='var(--steel-l)'; });
    el.addEventListener('mouseleave',()=>{ ring.style.width=ring.style.height=ring.style.borderColor=''; });
  });
}

/* SCROLL PROGRESS */
function initScrollProg() {
  const bar = document.getElementById('scroll-prog');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    bar.style.width = Math.min(window.scrollY/(document.documentElement.scrollHeight-innerHeight)*100,100)+'%';
  }, { passive:true });
}

/* BACK TO TOP */
function initBTT() {
  const btn = document.getElementById('btt');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY>600), {passive:true});
  btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

/* ═══════════════════════════════════════════════════
   HERO CANVAS
═══════════════════════════════════════════════════ */
function initCanvas() {
  const cv = document.getElementById('hero-cv');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, nodes=[], t=0;
  const GAP=85;
  function resize() {
    W=cv.width=cv.parentElement.offsetWidth; H=cv.height=cv.parentElement.offsetHeight; buildNodes();
  }
  function buildNodes() {
    nodes=[];
    const cols=Math.ceil(W/GAP)+2, rows=Math.ceil(H/GAP)+2;
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++)
      if(Math.random()<.4) nodes.push({x:c*GAP+(Math.random()-.5)*26,y:r*GAP+(Math.random()-.5)*26,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14,r:Math.random()*1.6+.7,gold:Math.random()<.17,ph:Math.random()*Math.PI*2});
  }
  function draw() {
    ctx.clearRect(0,0,W,H); t+=.005;
    const dark=document.documentElement.dataset.theme!=='light', la=dark?.07:.045, da=dark?.26:.16;
    nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;n.ph+=.016;if(n.x<-25)n.x=W+25;if(n.x>W+25)n.x=-25;if(n.y<-25)n.y=H+25;if(n.y>H+25)n.y=-25;});
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<GAP*1.65){const al=(1-d/(GAP*1.65))*la;ctx.beginPath();ctx.strokeStyle=(a.gold||b.gold)?`rgba(232,164,32,${al})`:`rgba(77,143,204,${al})`;ctx.lineWidth=.6;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    nodes.forEach(n=>{const p=Math.sin(n.ph)*.5+.5;ctx.beginPath();ctx.arc(n.x,n.y,n.r+p*1.1,0,Math.PI*2);ctx.fillStyle=n.gold?`rgba(232,164,32,${da*(.5+p*.5)})`:`rgba(77,143,204,${da*(.4+p*.4)})`;ctx.fill();});
    if(dark)[{x:.72,y:.18,txt:'SPAN: 12.5m',g:true},{x:.84,y:.62,txt:'GRADE: 1:2.5',g:false},{x:.60,y:.40,txt:'θ = 45°',g:true},{x:.88,y:.36,txt:'RCC M25',g:false},{x:.65,y:.74,txt:'∑FS = 4.235m',g:true},{x:.78,y:.82,txt:'BM +142.36m',g:false}].forEach((a,i)=>{const al=.065+Math.sin(t*.5+i)*.02;ctx.font='10.5px JetBrains Mono,monospace';ctx.fillStyle=a.g?`rgba(232,164,32,${al})`:`rgba(77,143,204,${al})`;ctx.fillText(a.txt,W*a.x+Math.sin(t*.4+i)*4,H*a.y+Math.cos(t*.3+i)*4);});
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize,{passive:true}); resize(); draw();
}

/* REVEAL */
function initReveal() {
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),parseInt(e.target.dataset.delay)||0);obs.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>obs.observe(el));
}

/* ═══════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════ */
function buildCats() {
  const wrap=document.getElementById('fb-cats');
  if(!wrap) return;
  const used=new Set(BLOG_POSTS.map(p=>p.category));
  const list=['all',...Object.keys(CAT).filter(c=>c!=='all'&&used.has(c))];
  wrap.innerHTML=list.map(c=>{
    const n=c==='all'?BLOG_POSTS.length:BLOG_POSTS.filter(p=>p.category===c).length;
    const cfg=CAT[c]||{label:c,icon:'fas fa-tag'};
    return `<button class="cat-btn${c==='all'?' on':''}" data-cat="${c}" role="tab" aria-selected="${c==='all'}"><i class="${cfg.icon}"></i>${cfg.label}<span class="cat-n">${n}</span></button>`;
  }).join('');
  wrap.querySelectorAll('.cat-btn').forEach(btn=>btn.addEventListener('click',()=>{
    activeCat=btn.dataset.cat;
    wrap.querySelectorAll('.cat-btn').forEach(b=>{b.classList.toggle('on',b===btn);b.setAttribute('aria-selected',b===btn);});
    buildGrid(); updateCount();
    const lbl=document.getElementById('grid-lbl');
    if(lbl) lbl.textContent=activeCat==='all'?'Latest Articles':(CAT[activeCat]?.label||activeCat);
  }));
}

/* ═══════════════════════════════════════════════════
   FEATURED
═══════════════════════════════════════════════════ */
function buildFeatured() {
  const el=document.getElementById('featured-card');
  if(!el) return;
  const post=BLOG_POSTS.find(p=>p.featured)||BLOG_POSTS[0];
  if(!post){ el.innerHTML='<p style="color:var(--t3);padding:2rem 0">No posts yet — check back soon!</p>'; return; }
  const cfg=CAT[post.category]||{label:post.category};
  el.innerHTML=`
    <div class="fc-img${!post.image?' ei':''}" onclick="openPost('${post.id}')">
      ${post.image?`<img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.parentElement.classList.add('ei');this.remove()">`:post.emoji||'🏗️'}
      <div class="fc-img-ov"></div>
      <div class="fc-badge"><i class="fas fa-star"></i> Featured</div>
    </div>
    <div class="fc-body">
      <div class="fc-meta">
        <span class="cat-pill cp-${cfg.c||'gold'}">${cfg.label}</span>
        <span class="fc-date"><i class="fas fa-calendar-alt"></i>${post.date}</span>
        <span class="fc-time"><i class="fas fa-clock"></i>${post.readTime}</span>
      </div>
      <h2 class="fc-h2">${post.title}</h2>
      <p class="fc-exc">${post.excerpt}</p>
      <div class="fc-tags">${(post.tags||[]).map(t=>`<span class="tag" onclick="event.stopPropagation();tagSearch('${t}')">${t}</span>`).join('')}</div>
      <button class="fc-cta" onclick="openPost('${post.id}')"><i class="fas fa-book-open"></i> Read Full Article <i class="fas fa-arrow-right"></i></button>
    </div>`;
}

/* ═══════════════════════════════════════════════════
   GRID
═══════════════════════════════════════════════════ */
function getFiltered() {
  return BLOG_POSTS.filter(p=>activeCat==='all'||p.category===activeCat).sort((a,b)=>new Date(b.dateSort)-new Date(a.dateSort));
}
function buildGrid() {
  const grid=document.getElementById('grid'), none=document.getElementById('no-results');
  if(!grid) return;
  const posts=getFiltered();
  if(!posts.length){ grid.innerHTML=''; none&&(none.style.display='flex'); return; }
  none&&(none.style.display='none');
  grid.innerHTML=posts.map((p,i)=>{
    const cfg=CAT[p.category]||{label:p.category,c:'gold'};
    return `<article class="card" onclick="openPost('${p.id}')" tabindex="0" role="button" aria-label="Read: ${p.title}" style="animation-delay:${i*.07}s">
      <div class="card-img${!p.image?' ei':''}">
        ${p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.parentElement.classList.add('ei');this.remove()">`:p.emoji||'🏗️'}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="cat-pill cp-${cfg.c}">${cfg.label}</span>
          <span class="fc-date"><i class="fas fa-calendar-alt"></i>${p.date}</span>
          <span class="fc-time"><i class="fas fa-clock"></i>${p.readTime}</span>
        </div>
        <h3 class="card-h3">${p.title}</h3>
        <p class="card-exc">${p.excerpt}</p>
        <div class="card-tags">${(p.tags||[]).slice(0,3).map(t=>`<span class="tag" onclick="event.stopPropagation();tagSearch('${t}')">${t}</span>`).join('')}</div>
        <button class="card-read" onclick="event.stopPropagation();openPost('${p.id}')">Read Article <i class="fas fa-arrow-right"></i></button>
      </div>
    </article>`;
  }).join('');
}
function updateCount() {
  const el=document.getElementById('fb-count');
  if(!el) return;
  const n=getFiltered().length;
  el.textContent=n===BLOG_POSTS.length?`${n} articles`:`${n} of ${BLOG_POSTS.length}`;
}

/* ═══════════════════════════════════════════════════
   TOPICS
═══════════════════════════════════════════════════ */
function buildTopics() {
  const grid=document.getElementById('topics');
  if(!grid) return;
  const used=Object.keys(CAT).filter(c=>c!=='all'&&BLOG_POSTS.some(p=>p.category===c));
  grid.innerHTML=used.map(c=>{
    const n=BLOG_POSTS.filter(p=>p.category===c).length, cfg=CAT[c];
    return `<div class="topic-card" onclick="filterCat('${c}')" tabindex="0" role="button"><div class="tc-icon"><i class="${cfg.icon}"></i></div><div class="tc-name">${cfg.label}</div><div class="tc-n">${n} article${n!==1?'s':''}</div></div>`;
  }).join('');
  grid.querySelectorAll('.topic-card').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')el.click();}));
}

/* ═══════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════ */
function initSearch() {
  const ov=document.getElementById('search-ov'), inp=document.getElementById('search-inp'), res=document.getElementById('so-results'), open=document.getElementById('search-open-btn');
  function show(){ov.classList.add('open');setTimeout(()=>inp?.focus(),80);}
  function hide(){ov.classList.remove('open');if(inp)inp.value='';if(res)res.innerHTML='';}
  open?.addEventListener('click',show);
  ov?.addEventListener('click',e=>{if(e.target===ov)hide();});
  inp?.addEventListener('input',()=>{
    const q=inp.value.trim().toLowerCase();
    if(!q){res.innerHTML='';return;}
    const hits=BLOG_POSTS.filter(p=>p.title.toLowerCase().includes(q)||p.excerpt.toLowerCase().includes(q)||(p.tags||[]).some(t=>t.toLowerCase().includes(q))||p.category.toLowerCase().includes(q));
    res.innerHTML=hits.length
      ?hits.map(p=>`<div class="sr-card" onclick="hide_search();openPost('${p.id}')" tabindex="0" role="button"><div class="sr-ico"><i class="${CAT[p.category]?.icon||'fas fa-file-alt'}"></i></div><div><div class="sr-t">${p.title}</div><div class="sr-x">${p.excerpt.slice(0,85)}…</div></div></div>`).join('')
      :`<div class="so-empty"><i class="fas fa-search"></i>No articles match "<strong>${q}</strong>"</div>`;
  });
  window.hide_search=hide;
}
window.quickSearch=function(q){
  const inp=document.getElementById('search-inp'),ov=document.getElementById('search-ov');
  if(inp){inp.value=q;inp.dispatchEvent(new Event('input'));}
  ov&&ov.classList.add('open'); setTimeout(()=>inp?.focus(),80);
};

/* VIEW TOGGLE */
function initViewToggle(){
  const grid=document.getElementById('grid'),gb=document.getElementById('vb-grid'),lb=document.getElementById('vb-list');
  if(!gb||!lb||!grid) return;
  gb.addEventListener('click',()=>{grid.classList.remove('list');gb.classList.add('active');lb.classList.remove('active');});
  lb.addEventListener('click',()=>{grid.classList.add('list');lb.classList.add('active');gb.classList.remove('active');});
}

/* ═══════════════════════════════════════════════════
   READER MODAL
═══════════════════════════════════════════════════ */
function initReader(){
  const bd=document.getElementById('rd-bd'), back=document.getElementById('rd-back'), scroll=document.getElementById('rd-scroll'), bar=document.getElementById('rd-bar'), pct=document.getElementById('rd-pct');
  bd?.addEventListener('click',closePost);
  back?.addEventListener('click',closePost);
  scroll?.addEventListener('scroll',()=>{
    const p=(scroll.scrollTop/(scroll.scrollHeight-scroll.clientHeight))*100, v=Math.min(Math.round(p),100);
    if(bar) bar.style.width=v+'%'; if(pct) pct.textContent=v+'%';
  },{passive:true});
}
window.openPost=function(id){
  const post=BLOG_POSTS.find(p=>p.id===id);
  if(!post) return;
  activePost=post;
  const modal=document.getElementById('reader'), art=document.getElementById('rd-article'), relDiv=document.getElementById('rd-related'), scroll=document.getElementById('rd-scroll');
  if(!modal||!art) return;
  art.innerHTML=post.content||'<p>Content coming soon.</p>';
  const related=BLOG_POSTS.filter(p=>p.id!==post.id&&(p.category===post.category||(p.tags||[]).some(t=>(post.tags||[]).includes(t)))).slice(0,4);
  if(relDiv) relDiv.innerHTML=related.length
    ?`<h3>Continue Reading</h3><div class="rel-grid">${related.map(r=>`<div class="rel-card" onclick="openPost('${r.id}')" tabindex="0" role="button"><div class="rel-cat">${CAT[r.category]?.label||r.category}</div><div class="rel-t">${r.title}</div><div class="rel-d">${r.date} · ${r.readTime}</div></div>`).join('')}</div>`
    :'<h3>Continue Reading</h3><p style="color:var(--t3);font-size:.84rem">More articles coming soon!</p>';
  history.pushState(null,'',`#${id}`);
  document.title=post.title+' — Nikhil Sain';
  modal.classList.add('open'); document.body.style.overflow='hidden';
  if(scroll) scroll.scrollTop=0;
  const bar=document.getElementById('rd-bar'), pct=document.getElementById('rd-pct');
  if(bar) bar.style.width='0%'; if(pct) pct.textContent='0%';
  setTimeout(()=>document.getElementById('rd-back')?.focus(),100);
};
window.closePost=function(){
  const modal=document.getElementById('reader');
  if(!modal) return;
  modal.classList.remove('open'); document.body.style.overflow='';
  document.title='Civil Engineering Blog — Nikhil Sain';
  history.pushState(null,'',location.pathname); activePost=null;
};

/* FONT CONTROLS */
window.adjustFont=function(d){
  readerFs=Math.max(13,Math.min(22,readerFs+d));
  const body=document.querySelector('.article-body'); if(body) body.style.fontSize=readerFs+'px';
  const lbl=document.getElementById('font-lbl'); if(lbl) lbl.textContent=readerFs+'px';
};

/* SHARE */
window.shareOn=function(plat){
  if(!activePost) return;
  const u=encodeURIComponent(location.href), tt=encodeURIComponent(activePost.title+' — Nikhil Sain');
  const urls={twitter:`https://twitter.com/intent/tweet?text=${tt}&url=${u}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${u}`};
  if(urls[plat]) window.open(urls[plat],'_blank','noopener,noreferrer');
};
window.copyLink=function(){
  navigator.clipboard.writeText(location.href).then(()=>showToast('Link copied to clipboard!'));
};

/* TOAST */
function showToast(msg){
  const el=document.getElementById('toast'),tx=document.getElementById('toast-txt');
  if(!el) return; if(tx) tx.textContent=msg;
  el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),3000);
}

/* FILTER HELPERS */
window.filterCat=function(cat){
  activeCat=cat;
  document.querySelectorAll('.cat-btn').forEach(b=>{b.classList.toggle('on',b.dataset.cat===cat);b.setAttribute('aria-selected',b.dataset.cat===cat);});
  buildGrid(); updateCount();
  const lbl=document.getElementById('grid-lbl'); if(lbl) lbl.textContent=cat==='all'?'Latest Articles':(CAT[cat]?.label||cat);
  document.getElementById('grid-sec')?.scrollIntoView({behavior:'smooth',block:'start'});
};
window.tagSearch=function(tag){
  const match=Object.keys(CAT).find(c=>c!=='all'&&c.toLowerCase()===tag.toLowerCase());
  if(match) filterCat(match); else window.quickSearch(tag);
};
window.resetAll=function(){ filterCat('all'); };

/* KEYBOARD */
function initKeyboard(){
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(document.getElementById('reader').classList.contains('open')) closePost();
      else if(document.getElementById('search-ov').classList.contains('open')) window.hide_search();
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){ e.preventDefault(); document.getElementById('search-ov').classList.add('open'); setTimeout(()=>document.getElementById('search-inp')?.focus(),80); }
  });
}

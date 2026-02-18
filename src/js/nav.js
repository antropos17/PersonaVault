/* nav.js — navigation, SPA routing, scroll tracking, keyboard shortcuts */

const $ = (id) => document.getElementById(id);

/* ── Smooth scroll ── */
export function sTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const ct = $('pvContent');
  const y = el.getBoundingClientRect().top + (ct ? ct.scrollTop : window.pageYOffset) - 96;
  (ct || window).scrollTo({ top: y, behavior: 'smooth' });
}

/* ── Mobile menu ── */
export function tMob() {
  const mob = $('mob'), ham = $('ham');
  if (!mob || !ham) return;
  mob.classList.toggle('on');
  ham.classList.toggle('on');
  document.body.style.overflow = mob.classList.contains('on') ? 'hidden' : '';
}

export function cMob() {
  const mob = $('mob'), ham = $('ham');
  if (mob) mob.classList.remove('on');
  if (ham) ham.classList.remove('on');
  document.body.style.overflow = '';
}

/* ── SPA page routing (sidebar) ── */
export function showPage(name) {
  document.querySelectorAll('.pv-page').forEach((p) => p.classList.remove('active'));
  const pg = $('page-' + name);
  if (pg) pg.classList.add('active');
  document.querySelectorAll('.sb-i').forEach((i) => {
    const active = i.dataset.page === name;
    i.classList.toggle('active', active);
    if (active) i.setAttribute('aria-current', 'page');
    else i.removeAttribute('aria-current');
  });
  const ct = $('pvContent');
  if (ct) ct.scrollTop = 0;
  if (pg) {
    pg.querySelectorAll('.uc:not(.vis)').forEach((c) => c.classList.add('vis'));
    pg.querySelectorAll('.sh').forEach((s) => { s.style.opacity = '1'; s.style.transform = 'none'; });
  }
  closeSb();
}

export function toggleSb() {
  const sb = $('pvSb'), ov = $('sbOv');
  if (!sb) return;
  sb.classList.toggle('open');
  if (ov) ov.classList.toggle('open');
  const ham = $('sbHam');
  if (ham) ham.setAttribute('aria-expanded', sb.classList.contains('open'));
}

export function closeSb() {
  const sb = $('pvSb'), ov = $('sbOv');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('open');
  const ham = $('sbHam');
  if (ham) ham.setAttribute('aria-expanded', 'false');
}

/* ── Scroll progress bar ── */
function updateScrollProgress() {
  const bar = document.querySelector('.spb');
  if (!bar) return;
  const ct = $('pvContent');
  const top = ct ? ct.scrollTop : window.pageYOffset;
  const total = (ct ? ct.scrollHeight - ct.clientHeight : document.documentElement.scrollHeight - window.innerHeight) || 1;
  bar.style.width = (top / total) * 100 + '%';
}

/* ── Back to top ── */
function updateBackToTop() {
  const btn = document.querySelector('.btt');
  if (!btn) return;
  const top = $('pvContent') ? $('pvContent').scrollTop : window.pageYOffset;
  btn.classList.toggle('show', top > 400);
}

function scrollToTop() {
  const ct = $('pvContent');
  (ct || window).scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Sub-nav highlighting (IntersectionObserver) ── */
function initSubNavHighlight() {
  const links = document.querySelectorAll('.sna');
  if (!links.length) return;
  const ids = Array.from(links).map((a) => a.getAttribute('href')).filter(Boolean).map((h) => h.replace('#', ''));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('on'));
      const act = document.querySelector('.sna[href="#' + entry.target.id + '"]');
      if (act) act.classList.add('on');
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
  ids.forEach((id) => { const el = $(id); if (el) observer.observe(el); });
}

/* ── Keyboard shortcuts ── */
function handleKeydown(e) {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    const si = $('si');
    if (si) si.focus();
  }
  if (e.key === 'Escape') {
    if (typeof window.closeMod === 'function') window.closeMod();
    if (typeof window.closeSV === 'function') window.closeSV();
    cMob();
    closeSb();
  }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button' && e.target.tagName === 'A') {
    e.preventDefault();
    e.target.click();
  }
}

/* ── Init ── */
export function initNav() {
  document.querySelectorAll('.sna').forEach((a) => {
    a.addEventListener('click', (e) => { e.preventDefault(); sTo(a.getAttribute('href')); });
  });
  initSubNavHighlight();
  const scrollTarget = $('pvContent') || window;
  scrollTarget.addEventListener('scroll', () => { updateScrollProgress(); updateBackToTop(); }, { passive: true });
  const btt = document.querySelector('.btt');
  if (btt) btt.addEventListener('click', scrollToTop);
  document.addEventListener('keydown', handleKeydown);
}

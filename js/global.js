/* ══════════════════════════════════════════
   CICCHITTI — GLOBAL JS
   Nav scroll · Scroll reveal · Helpers
══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('main-nav');
  if (nav && !nav.classList.contains('nav--solid')) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── SCROLL REVEAL ── */
  window.initReveal = function (root) {
    const scope = root || document;
    const reveals = scope.querySelectorAll('.reveal:not(.visible)');
    if (!reveals.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  };

  window.initReveal();

  /* ── SENSORY BARS (wine detail) ── */
  const barsSection = document.querySelector('.tasting__bars');
  if (barsSection) {
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.tasting__bar-fill').forEach(b => b.classList.add('visible'));
          barIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    barIO.observe(barsSection);
  }

})();

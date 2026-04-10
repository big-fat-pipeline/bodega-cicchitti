/* ══════════════════════════════════════════
   CICCHITTI — HOME JS
   Hero crossfade slideshow
   Reemplazarlo por lógica de video cuando
   tengas el archivo hero.mp4
══════════════════════════════════════════ */

(function () {
  'use strict';

  const slides = document.querySelectorAll('.hero__bg-slide');
  const dots   = document.querySelectorAll('.hero__dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots.length) dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (dots.length) dots[current].classList.add('active');
  }

  function startTimer() {
    timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5200);
  }

  // Click en dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.index));
      startTimer();
    });
  });

  startTimer();

})();

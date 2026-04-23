/**
 * vino.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Popula la página de detalle de vino (vino.html) leyendo
 * ?slug= de la URL y consultando Sanity via getWineBySlugAsync().
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  function getSlug() {
    return new URLSearchParams(window.location.search).get('slug');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const slug = getSlug();
    if (!slug) return;

    getWineBySlugAsync(slug).then(function (data) {
      if (!data) return;

      const { linea } = data;

      /* ── Datos en nav (back button) ── */
      const navEl = document.getElementById('main-nav');
      if (navEl) {
        navEl.dataset.backLabel = linea.nombre;
        navEl.dataset.backHref  = '/linea?slug=' + linea.slug;
      }

      /* ── Título y meta ── */
      document.title = `${linea.nombre} ${data.varietal} — Bodega Cicchitti`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', data.descripcion);

      /* ── Hero — range tag ── */
      const rangeTag = document.querySelector('.wine-hero__range-tag');
      if (rangeTag) rangeTag.textContent = linea.nombre;

      /* ── Hero — bg word ── */
      const bgWord = document.querySelector('.wine-hero__bg-word');
      if (bgWord) bgWord.textContent = data.varietal.toUpperCase();

      /* ── Hero — cosecha ── */
      const vintageNum = document.querySelector('.wine-hero__vintage-num');
      if (vintageNum && data.cosecha) vintageNum.textContent = data.cosecha;

      /* ── Hero — imagen de botella ── */
      const bottleImg = document.querySelector('.wine-hero__bottle-img');
      if (bottleImg) {
        if (data.imagen) {
          bottleImg.src = data.imagen;
          bottleImg.alt = `${linea.nombre} ${data.varietal} — Bodega Cicchitti`;
        } else {
          bottleImg.style.display = 'none';
        }
      }

      /* ── Hero info ── */
      const heroEyebrow = document.querySelector('.wine-hero__eyebrow');
      if (heroEyebrow) heroEyebrow.textContent = 'Bodega Cicchitti';

      const heroName = document.querySelector('.wine-hero__name');
      if (heroName) heroName.textContent = linea.nombre;

      const heroVarietal = document.querySelector('.wine-hero__varietal');
      if (heroVarietal) heroVarietal.textContent = data.varietal;

      const heroTagline = document.querySelector('.wine-hero__tagline');
      if (heroTagline && data.tagline) heroTagline.textContent = data.tagline;

      /* ── Hero meta ── */
      const metaValues = document.querySelectorAll('.wine-hero__meta-value');
      if (metaValues.length >= 2) {
        metaValues[0].textContent = data.varietal_full || data.varietal;
        metaValues[1].innerHTML   = data.vinedo ? data.vinedo.replace(', ', '<br>') : '—';
      }

      /* ── Premios ── */
      const awardsEl = document.getElementById('wine-awards');
      if (awardsEl && data.premios && data.premios.length > 0) {
        awardsEl.innerHTML = data.premios
          .filter(Boolean)
          .map(src => `<img class="wine-hero__award-img" src="${src}" alt="Premio">`)
          .join('');
      }

      /* ── Sección "Otros vinos de la línea" ── */
      const otherSection = document.querySelector('.other-wines');
      const lineaVinos   = linea.vinos || [];

      if (otherSection && lineaVinos.length > 1) {
        const otherTitle = otherSection.querySelector('.other-wines__title');
        if (otherTitle) {
          otherTitle.innerHTML = `Otros vinos <em>${linea.nombre}.</em>`;
        }

        const grid = otherSection.querySelector('.other-wines__grid');
        if (grid) {
          const siblings = lineaVinos.filter(v => v.slug !== slug);
          const ARROW = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          grid.innerHTML = siblings.slice(0, 4).map((v, i) => `
            <a href="/vino?slug=${v.slug}" class="other-wines__card other-wines__card--light reveal delay-${i}">
              <div class="other-wines__img-wrap other-wines__img-wrap--light">
                ${v.imagen
                  ? `<img class="other-wines__card-img" src="${v.imagen}" alt="${v.varietal}" loading="lazy">`
                  : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(75,15,26,0.2);font-family:var(--serif);font-size:13px;font-style:italic;">${v.varietal}</div>`
                }
              </div>
              <div class="other-wines__card-body">
                <div class="other-wines__card-range">${linea.nombre}</div>
                <div class="other-wines__card-name">${v.varietal}</div>
                <div class="other-wines__card-link">Ver vino ${ARROW}</div>
              </div>
            </a>`).join('');
        }
      } else if (otherSection && lineaVinos.length === 1) {
        const otherTitle = otherSection.querySelector('.other-wines__title');
        if (otherTitle) otherTitle.innerHTML = `Explorá<br><em>otras líneas.</em>`;
      }

      if (typeof initReveal === 'function') initReveal();
    });
  });
})();

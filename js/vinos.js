/**
 * vinos.js — Bodega Cicchitti
 * Renderiza el catálogo de líneas en vinos.html.
 * Usa getAllLinesAsync() para obtener datos de Sanity.
 */

(function () {
  'use strict';

  const ARROW = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none">
    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const BOTTLE_PLACEHOLDER = `<svg viewBox="0 0 40 100" fill="none" stroke="currentColor" stroke-width="1">
    <path d="M15 28V18a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10l4 8v44a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V36l4-8z"/>
    <line x1="11" y1="52" x2="29" y2="52" stroke-width="0.5" opacity="0.5"/>
  </svg>`;

  function getFeaturedImage(linea) {
    const wine = (linea.vinos || []).find(v => v.imagen);
    return wine ? wine.imagen : null;
  }

  function renderLineCard(linea, index) {
    const bg    = linea.heroImg ? `background-image:url('${linea.heroImg}')` : '';
    const delay = Math.min(index, 4);
    const count = (linea.vinos || []).length;

    return `
      <a href="/linea?slug=${linea.slug}"
         class="linea-card reveal delay-${delay}">
        <div class="linea-card__bg" style="${bg}"></div>
        <div class="linea-card__overlay"></div>
        <div class="linea-card__body">
          <div class="linea-card__eyebrow">Línea</div>
          <div class="linea-card__name">${linea.nombre}</div>
          <div class="linea-card__count">${count} ${count === 1 ? 'varietal' : 'varietales'}</div>
          <p class="linea-card__desc">${linea.descripcion}</p>
          <span class="linea-card__cta">Explorar línea ${ARROW}</span>
        </div>
      </a>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('catalogo-grid');
    if (!grid) return;

    getAllLinesAsync().then(function (lines) {
      if (!lines || lines.length === 0) {
        grid.innerHTML = '<p style="font-family:var(--sans);font-size:13px;color:rgba(75,15,26,0.4);padding:40px;">No hay líneas de vino publicadas.</p>';
        return;
      }
      grid.innerHTML = lines.map((l, i) => renderLineCard(l, i)).join('');
      if (typeof initReveal === 'function') initReveal();
    });
  });
})();

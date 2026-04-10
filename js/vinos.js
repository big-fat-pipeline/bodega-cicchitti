/**
 * vinos.js — Bodega Cicchitti
 * Renderiza el catálogo de líneas en vinos.html desde wines-data.js.
 * Al migrar a Sanity: reemplazar getAllLines() por query a la API.
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
    const wine = linea.vinos.find(v => v.imagen);
    return wine ? wine.imagen : null;
  }

  function renderLineCard(linea, index) {
    const isFeatured = index === 0;
    const img        = getFeaturedImage(linea);
    const num        = String(linea.orden || index + 1).padStart(2, '0');
    const delay      = Math.min(index, 4);

    const imgContent = img
      ? `<img class="linea-card__img" src="${img}" alt="${linea.nombre}" loading="lazy">`
      : `<div class="linea-card__img-placeholder">${BOTTLE_PLACEHOLDER}</div>`;

    const badgeHTML = linea.etiqueta
      ? `<div class="linea-card__badge">${linea.etiqueta}</div>`
      : '';

    return `
      <a href="linea.html?slug=${linea.slug}"
         class="linea-card${isFeatured ? ' linea-card--featured' : ''} reveal delay-${delay}">
        <div class="linea-card__img-wrap">${imgContent}</div>
        <div class="linea-card__body">
          ${badgeHTML}
          <div class="linea-card__num">${num}</div>
          <div class="linea-card__name">${linea.nombre}</div>
          <div class="linea-card__count">
            ${linea.vinos.length} ${linea.vinos.length === 1 ? 'varietal' : 'varietales'}
          </div>
          <p class="linea-card__desc">${linea.descripcion}</p>
          <span class="linea-card__cta">Explorar línea ${ARROW}</span>
        </div>
      </a>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('catalogo-grid');
    if (!grid) return;

    const lines = getAllLines();
    grid.innerHTML = lines.map((l, i) => renderLineCard(l, i)).join('');

    if (typeof initReveal === 'function') initReveal();
  });
})();

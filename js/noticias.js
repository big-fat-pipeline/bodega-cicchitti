/**
 * noticias.js — Bodega Cicchitti
 * Renderiza el archivo de noticias en noticias.html.
 * Usa getAllNoticiasAsync() para obtener datos de Sanity.
 */

(function () {
  'use strict';

  const ARROW = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none">
    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const CATEGORY_COLORS = {
    'Novedades': 'var(--wine)',
    'Premios':   '#9A7A4A',
    'Eventos':   '#3A5A3A',
    'Bodega':    '#2A3A5A',
  };

  function formatDate(isoDate) {
    const d = new Date(isoDate + 'T00:00:00');
    const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function renderNoticiaCard(noticia, index) {
    const delay     = Math.min(index % 3, 3);
    const catColor  = CATEGORY_COLORS[noticia.categoria] || 'var(--wine)';
    const dateStr   = formatDate(noticia.fecha);
    const isFeatured = index === 0;

    const imgContent = noticia.imagen
      ? `<img class="noticia-card__img" src="${noticia.imagen}" alt="${noticia.titulo}" loading="lazy">`
      : `<div class="noticia-card__img-placeholder">
           <svg viewBox="0 0 80 48" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.2">
             <rect x="4" y="4" width="72" height="40" rx="2"/>
             <circle cx="22" cy="20" r="7"/>
             <path d="M4 36l16-12 14 10 12-8 16 14"/>
           </svg>
         </div>`;

    return `
      <a href="/noticia?slug=${noticia.slug}"
         class="noticia-card${isFeatured ? ' noticia-card--featured' : ''} reveal delay-${delay}">
        <div class="noticia-card__img-wrap">${imgContent}</div>
        <div class="noticia-card__body">
          <div class="noticia-card__meta">
            <span class="noticia-card__cat" style="background:${catColor}">${noticia.categoria}</span>
            <span class="noticia-card__date">${dateStr}</span>
          </div>
          <h2 class="noticia-card__titulo">${noticia.titulo}</h2>
          <p class="noticia-card__bajada">${noticia.bajada}</p>
          <span class="noticia-card__cta">Leer nota ${ARROW}</span>
        </div>
      </a>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('noticias-grid');
    if (!grid) return;

    getAllNoticiasAsync().then(function (noticias) {
      if (!noticias || noticias.length === 0) {
        grid.innerHTML = `<p class="noticias-empty">No hay noticias publicadas por el momento.</p>`;
        return;
      }
      grid.innerHTML = noticias.map((n, i) => renderNoticiaCard(n, i)).join('');
      if (typeof initReveal === 'function') initReveal();
    });
  });
})();

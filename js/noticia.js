/**
 * noticia.js — Bodega Cicchitti
 * Renderiza el detalle de una noticia individual.
 * Usa getNoticiaBySlugAsync() y getRelatedNoticiasAsync() de Sanity.
 * Requiere portable-text.js cargado antes.
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
    const months = [
      'enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre'
    ];
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
  }

  function renderRelatedCard(noticia) {
    const catColor = CATEGORY_COLORS[noticia.categoria] || 'var(--wine)';
    return `
      <a href="/noticia?slug=${noticia.slug}" class="related-card reveal">
        <div class="related-card__img-wrap">
          ${noticia.imagen
            ? `<img class="related-card__img" src="${noticia.imagen}" alt="${noticia.titulo}" loading="lazy">`
            : `<div class="related-card__img-placeholder">
                 <svg viewBox="0 0 80 48" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.18">
                   <rect x="4" y="4" width="72" height="40" rx="2"/>
                   <circle cx="22" cy="20" r="7"/>
                   <path d="M4 36l16-12 14 10 12-8 16 14"/>
                 </svg>
               </div>`}
        </div>
        <div class="related-card__body">
          <span class="related-card__cat" style="background:${catColor}">${noticia.categoria}</span>
          <h3 class="related-card__titulo">${noticia.titulo}</h3>
          <span class="related-card__cta">Leer ${ARROW}</span>
        </div>
      </a>`;
  }

  function render404() {
    document.title = 'Noticia no encontrada — Bodega Cicchitti';
    const root = document.getElementById('noticia-root');
    if (root) {
      root.innerHTML = `
        <div class="noticia-404">
          <div class="section-tag dark" style="margin-bottom:16px;">Error 404</div>
          <h1 class="section-title" style="color:var(--wine);margin-bottom:20px;">Noticia no encontrada</h1>
          <p style="font-family:var(--sans);font-size:14px;color:rgba(75,15,26,0.5);margin-bottom:36px;">
            La nota que buscás no existe o fue eliminada.
          </p>
          <a href="/noticias" class="btn btn--outline-dark" style="font-size:10px;padding:12px 32px;">
            Ver todas las noticias ${ARROW}
          </a>
        </div>`;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const slug   = params.get('slug');

    if (!slug) { render404(); return; }

    /* Fetch noticia (con cuerpo completo) y relacionadas en paralelo */
    Promise.all([
      getNoticiaBySlugAsync(slug),
      getRelatedNoticiasAsync(slug, 3)
    ]).then(function (results) {
      const noticia = results[0];
      const related = results[1];

      if (!noticia) { render404(); return; }

      /* ── Actualizar meta ── */
      document.title = `${noticia.titulo} — Bodega Cicchitti`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', noticia.bajada);

      /* ── Hero ── */
      const catColor = CATEGORY_COLORS[noticia.categoria] || 'var(--wine)';

      const heroEl = document.getElementById('noticia-hero');
      if (heroEl) {
        const imgWrap = heroEl.querySelector('#noticia-hero-img');
        if (imgWrap) {
          imgWrap.innerHTML = noticia.imagen
            ? `<img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-hero__cover-img">`
            : '';
          if (!noticia.imagen) imgWrap.style.display = 'none';
        }

        const catEl = heroEl.querySelector('#noticia-hero-cat');
        if (catEl) { catEl.textContent = noticia.categoria; catEl.style.background = catColor; }

        const dateEl = heroEl.querySelector('#noticia-hero-date');
        if (dateEl) dateEl.textContent = formatDate(noticia.fecha);

        const titleEl = heroEl.querySelector('#noticia-hero-title');
        if (titleEl) titleEl.textContent = noticia.titulo;

        const bajadaEl = heroEl.querySelector('#noticia-hero-bajada');
        if (bajadaEl) bajadaEl.textContent = noticia.bajada;

        const autorEl = heroEl.querySelector('#noticia-hero-autor');
        if (autorEl) autorEl.textContent = noticia.autor;
      }

      /* ── Cuerpo del artículo (Portable Text o HTML fallback) ── */
      const bodyEl = document.getElementById('noticia-body');
      if (bodyEl) {
        bodyEl.innerHTML = typeof portableTextToHtml === 'function'
          ? portableTextToHtml(noticia.cuerpo)
          : (typeof noticia.cuerpo === 'string' ? noticia.cuerpo : '');
      }

      /* ── Noticias relacionadas ── */
      const relatedGrid    = document.getElementById('related-grid');
      const relatedSection = document.getElementById('related-section');
      if (relatedGrid) {
        if (related && related.length > 0) {
          relatedGrid.innerHTML = related.map(renderRelatedCard).join('');
          if (typeof initReveal === 'function') initReveal();
        } else if (relatedSection) {
          relatedSection.style.display = 'none';
        }
      }
    });
  });
})();

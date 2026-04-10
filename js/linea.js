/**
 * linea.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Renderiza la página de una línea de vinos leyendo el parámetro
 * ?slug= de la URL y consultando wines-data.js.
 *
 * Al migrar a Sanity, reemplazar getLineBySlug() y getOtherLines()
 * por llamadas a la API de Sanity. El HTML renderizado no cambia.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── SVG helpers ── */
  const ARROW_SVG = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none">
    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const BOTTLE_SVG = `<svg viewBox="0 0 40 100" fill="none" stroke="currentColor" stroke-width="1">
    <path d="M15 28V18a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10l4 8v44a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V36l4-8z"/>
    <line x1="11" y1="52" x2="29" y2="52" stroke-width="0.5" opacity="0.5"/>
  </svg>`;

  /* ── Leer slug de la URL ── */
  function getSlug() {
    return new URLSearchParams(window.location.search).get('slug');
  }

  /* ── Render: estado de error ── */
  function renderError(root) {
    root.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--dark);gap:20px;padding:40px;">
        <div style="font-family:var(--serif);font-size:48px;font-weight:300;color:rgba(200,169,110,0.3);">404</div>
        <div style="font-family:var(--sans);font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(244,236,216,0.3);">Línea no encontrada</div>
        <a href="../index.html" style="font-family:var(--sans);font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:var(--gold);text-decoration:none;margin-top:12px;display:flex;align-items:center;gap:8px;">
          Volver al inicio ${ARROW_SVG}
        </a>
      </div>`;
  }

  /* ── Render: card de un vino ── */
  function renderWineCard(vino, lineaNombre) {
    const imgContent = vino.imagen
      ? `<img class="line-card__img" src="${vino.imagen}" alt="${lineaNombre} ${vino.varietal}" loading="lazy">`
      : `<div class="line-card__img-placeholder">
           ${BOTTLE_SVG}
           <span>${vino.varietal}</span>
         </div>`;

    const cosechaLabel = vino.cosecha
      ? `<div class="line-card__line-tag">${vino.cosecha}</div>`
      : '';

    return `
      <a href="vino.html?slug=${vino.slug}" class="line-card reveal">
        <div class="line-card__img-wrap">${imgContent}</div>
        <div class="line-card__body">
          ${cosechaLabel}
          <div class="line-card__varietal">${vino.varietal}</div>
          <p class="line-card__desc">${vino.descripcion}</p>
          <span class="line-card__cta">
            Ver vino ${ARROW_SVG}
          </span>
        </div>
      </a>`;
  }

  /* ── Render: card de otra línea ── */
  function renderLineCard(linea, index) {
    const num = String(linea.orden || index + 1).padStart(2, '0');
    return `
      <a href="linea.html?slug=${linea.slug}" class="other-lines__card reveal delay-${Math.min(index, 4)}">
        <div class="other-lines__card-num">${num}</div>
        <div class="other-lines__card-name">${linea.nombre}</div>
        <div class="other-lines__card-count">${linea.vinos.length} ${linea.vinos.length === 1 ? 'vino' : 'vinos'}</div>
        <span class="other-lines__card-link">
          Explorar ${ARROW_SVG}
        </span>
      </a>`;
  }

  /* ── Render principal ── */
  function renderPage(linea) {
    const winesHTML   = linea.vinos.map(v => renderWineCard(v, linea.nombre)).join('');
    const otherLines  = getOtherLines(linea.slug);
    const othersHTML  = otherLines.map((l, i) => renderLineCard(l, i)).join('');

    const badgeHTML = linea.etiqueta
      ? `<div class="line-hero__badge">${linea.etiqueta}</div>`
      : '';

    return `
      <!-- HERO -->
      <section class="line-hero">
        <div class="line-hero__ornament"></div>
        <div class="line-hero__bg-word">${linea.nombre}</div>

        <div class="line-hero__inner">
          ${badgeHTML}
          <div class="line-hero__eyebrow">Bodega Cicchitti</div>
          <h1 class="line-hero__name">${linea.nombre}</h1>
          <div class="line-hero__divider"></div>
          <p class="line-hero__desc">${linea.descripcion}</p>
          <div class="line-hero__count">
            <span class="line-hero__count-num">${linea.vinos.length}</span>
            ${linea.vinos.length === 1 ? 'vino en esta línea' : 'vinos en esta línea'}
          </div>
        </div>

        <div class="line-hero__scroll">
          <span>Scroll</span>
          <div class="line-hero__scroll-line"></div>
        </div>
      </section>

      <!-- TRANSICIÓN -->
      <div class="line-torn"></div>

      <!-- GRID DE VINOS -->
      <section class="line-wines">
        <div class="line-wines__header reveal">
          <div>
            <div class="section-tag dark" style="margin-bottom:14px;">Línea ${linea.nombre}</div>
            <h2 class="section-title line-wines__title">
              Los vinos <em>${linea.nombre}.</em>
            </h2>
          </div>
          <div class="line-wines__subtitle">
            ${linea.vinos.length} ${linea.vinos.length === 1 ? 'varietal' : 'varietales'}
          </div>
        </div>
        <div class="line-wines__grid">
          ${winesHTML}
        </div>
      </section>

      <!-- OTRAS LÍNEAS -->
      <section class="other-lines">
        <div class="other-lines__eyebrow reveal">Seguí explorando</div>
        <h2 class="section-title other-lines__title reveal delay-1">
          Otras líneas <em>de la bodega.</em>
        </h2>
        <div class="other-lines__grid">
          ${othersHTML}
        </div>
      </section>`;
  }

  /* ── Actualizar meta tags ── */
  function updateMeta(linea) {
    document.title = `${linea.nombre} — Bodega Cicchitti`;
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) {
      metaDesc.setAttribute('content',
        `Línea ${linea.nombre}: ${linea.descripcion} — Bodega Cicchitti, Mendoza.`
      );
    }
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('page-root');
    const slug = getSlug();

    if (!slug) { renderError(root); return; }

    const linea = getLineBySlug(slug);
    if (!linea) { renderError(root); return; }

    updateMeta(linea);
    root.innerHTML = renderPage(linea);

    /* Activar scroll reveal (global.js ya lo inicializa,
       pero llamamos de nuevo para los elementos recién inyectados) */
    if (typeof initReveal === 'function') {
      initReveal();
    } else {
      /* Fallback: activar todos los .reveal visibles */
      requestAnimationFrame(function () {
        document.querySelectorAll('.reveal').forEach(function (el) {
          const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
              }
            });
          }, { threshold: 0.08 });
          io.observe(el);
        });
      });
    }
  });
})();

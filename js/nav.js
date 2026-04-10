/**
 * nav.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Construye e inyecta el nav completo (con mega menú de vinos)
 * en cualquier página que tenga <nav id="main-nav">.
 *
 * Requiere wines-data.js cargado antes.
 *
 * Data-attributes en <nav>:
 *   data-type="wine-detail"  → nav con botón "Volver" (vino.html)
 *   data-current="vinos"     → activa el link correspondiente
 *   data-back-label="Emblema"→ texto del botón Volver (wine-detail)
 *   data-back-href="..."     → href del botón Volver
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── Detectar si estamos en la raíz o dentro de /pages/ ── */
  function getPaths() {
    const inPages = window.location.pathname.replace(/\\/g, '/').includes('/pages/');
    return {
      base:     inPages ? ''      : 'pages/',   // hacia pages/
      rootBase: inPages ? '../'   : '',          // hacia raíz
    };
  }

  /* ── Chevron SVG ── */
  const CHEVRON = `<svg class="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const ARROW = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none">
    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  /* ── Mega menú: columna por línea ── */
  function buildLineColumn(line, base) {
    const MAX = 4;
    const shown     = line.vinos.slice(0, MAX);
    const remaining = line.vinos.length - MAX;

    const wineLinks = shown.map(v => `
      <li>
        <a href="${base}vino.html?slug=${v.slug}" class="nav__mega-wine">
          ${v.varietal}
        </a>
      </li>`).join('');

    const moreLink = remaining > 0
      ? `<li>
           <a href="${base}linea.html?slug=${line.slug}" class="nav__mega-more">
             + ${remaining} más ${ARROW}
           </a>
         </li>`
      : '';

    return `
      <div class="nav__mega-col">
        <a href="${base}linea.html?slug=${line.slug}" class="nav__mega-line-link">
          <span class="nav__mega-line-name">${line.nombre}</span>
          <span class="nav__mega-line-count">
            ${line.vinos.length} ${line.vinos.length === 1 ? 'varietal' : 'varietales'}
          </span>
        </a>
        <ul class="nav__mega-wines">
          ${wineLinks}
          ${moreLink}
        </ul>
      </div>`;
  }

  /* ── Mega menú completo ── */
  function buildMegaMenu(base) {
    const lines   = getAllLines();
    const columns = lines.map(l => buildLineColumn(l, base)).join('');

    return `
      <div class="nav__mega" role="region" aria-label="Líneas de vino">
        <div class="nav__mega-inner">
          <div class="nav__mega-grid">${columns}</div>
          <div class="nav__mega-footer">
            <a href="${base}vinos.html" class="nav__mega-cta">
              Ver toda la colección ${ARROW}
            </a>
            <a href="${base}espumantes.html" class="nav__mega-cta nav__mega-cta--secondary">
              Espumantes Soigné ${ARROW}
            </a>
          </div>
        </div>
      </div>`;
  }

  /* ── Nav principal (home, vinos, espumantes, bodega…) ── */
  function buildMainNav(base, rootBase, current) {
    const isActive = page => current === page ? ' class="nav__link--active"' : '';

    return `
      <a href="${rootBase}index.html" class="nav__logo">
        <img src="${rootBase}assets/img/logo.png" alt="Bodega Cicchitti" class="nav__logo-img">
      </a>

      <ul class="nav__links" id="nav-links-list">
        <li class="nav__item nav__item--has-mega">
          <a href="${base}vinos.html"${isActive('vinos')}>
            Vinos ${CHEVRON}
          </a>
          ${buildMegaMenu(base)}
        </li>
        <li class="nav__item">
          <a href="${base}espumantes.html"${isActive('espumantes')}>Espumantes</a>
        </li>
        <li class="nav__item">
          <a href="${base}bodega.html"${isActive('bodega')}>Bodega</a>
        </li>
        <li class="nav__item">
          <a href="#"${isActive('vinedos')}>Viñedos</a>
        </li>
      </ul>

      <div class="nav__actions">
        <button class="nav__hamburger" id="nav-hamburger" aria-label="Menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <a href="${base}contacto.html" class="btn btn--outline-light nav__btn-desktop" style="font-size:10px;padding:9px 20px;">Contacto</a>
        <a href="${base}personalizado.html" class="btn btn--gold nav__btn-desktop" style="font-size:10px;padding:9px 20px;">Etiqueta Personalizada</a>
      </div>

      <!-- Drawer mobile -->
      <div class="nav__drawer" id="nav-drawer">
        <div class="nav__drawer-header">
          <a href="${rootBase}index.html" class="nav__logo">
            <img src="${rootBase}assets/img/logo.png" alt="Bodega Cicchitti" class="nav__logo-img">
          </a>
          <button class="nav__drawer-close" id="nav-drawer-close" aria-label="Cerrar menú">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <nav class="nav__drawer-nav">
          <div class="nav__drawer-section">
            <div class="nav__drawer-label">Vinos</div>
            ${getAllLines().map(l => `
              <a href="${base}linea.html?slug=${l.slug}" class="nav__drawer-link">
                ${l.nombre}
                <span class="nav__drawer-count">${l.vinos.length} ${l.vinos.length === 1 ? 'varietal' : 'vinos'}</span>
              </a>`).join('')}
            <a href="${base}vinos.html" class="nav__drawer-link nav__drawer-link--all">
              Ver colección completa ${ARROW}
            </a>
          </div>
          <div class="nav__drawer-section">
            <a href="${base}espumantes.html" class="nav__drawer-link">Espumantes Soigné</a>
            <a href="${base}bodega.html" class="nav__drawer-link">Bodega</a>
            <a href="#" class="nav__drawer-link">Viñedos</a>
          </div>
          <div class="nav__drawer-section nav__drawer-section--actions">
            <a href="${base}contacto.html" class="btn btn--outline-light" style="font-size:10px;padding:12px 28px;width:100%;justify-content:center;">Contacto</a>
            <a href="${base}personalizado.html" class="btn btn--gold" style="font-size:10px;padding:12px 28px;width:100%;justify-content:center;">Etiqueta Personalizada</a>
          </div>
        </nav>
      </div>
      <div class="nav__overlay" id="nav-overlay"></div>`;
  }

  /* ── Nav wine detail (vino.html) ── */
  function buildWineDetailNav(base, rootBase, backLabel, backHref) {
    return `
      <a href="${backHref || 'javascript:history.back()'}" class="nav__back">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M13 5H1M5 9L1 5L5 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${backLabel || 'Volver'}
      </a>
      <a href="${rootBase}index.html" class="nav__logo nav__logo--center">
        <img src="${rootBase}assets/img/logo.png" alt="Bodega Cicchitti" class="nav__logo-img">
      </a>
      <a href="${base}personalizado.html" class="btn btn--outline-dark" style="font-size:10px;padding:9px 20px;">
        Etiqueta personalizada
      </a>`;
  }

  /* ── Interactividad del mega menú y drawer ── */
  function initInteractions() {
    /* --- Mega menú hover (desktop) --- */
    const megaItem = document.querySelector('.nav__item--has-mega');
    const megaMenu = document.querySelector('.nav__mega');
    if (megaItem && megaMenu) {
      let closeTimer;
      megaItem.addEventListener('mouseenter', () => {
        clearTimeout(closeTimer);
        megaMenu.classList.add('nav__mega--open');
      });
      megaItem.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => megaMenu.classList.remove('nav__mega--open'), 120);
      });
      megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      megaMenu.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => megaMenu.classList.remove('nav__mega--open'), 120);
      });
    }

    /* --- Hamburger / drawer (mobile) --- */
    const hamburger = document.getElementById('nav-hamburger');
    const drawer    = document.getElementById('nav-drawer');
    const overlay   = document.getElementById('nav-overlay');
    const closeBtn  = document.getElementById('nav-drawer-close');

    function openDrawer() {
      drawer && drawer.classList.add('nav__drawer--open');
      overlay && overlay.classList.add('nav__overlay--visible');
      hamburger && hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer && drawer.classList.remove('nav__drawer--open');
      overlay && overlay.classList.remove('nav__overlay--visible');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger && hamburger.addEventListener('click', openDrawer);
    closeBtn  && closeBtn.addEventListener('click', closeDrawer);
    overlay   && overlay.addEventListener('click', closeDrawer);

    /* Cerrar drawer al navegar */
    drawer && drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const { base, rootBase } = getPaths();
    const type      = nav.dataset.type    || 'main';
    const current   = nav.dataset.current || '';
    const backLabel = nav.dataset.backLabel || 'Volver';
    const backHref  = nav.dataset.backHref  || '';

    if (type === 'wine-detail') {
      nav.innerHTML = buildWineDetailNav(base, rootBase, backLabel, backHref);
    } else {
      nav.innerHTML = buildMainNav(base, rootBase, current);
      initInteractions();
    }
  });
})();

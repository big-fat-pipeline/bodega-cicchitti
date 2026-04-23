/**
 * nav.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Construye e inyecta el nav completo (con mega menú de vinos)
 * en cualquier página que tenga <nav id="main-nav">.
 *
 * Requiere wines-data.js cargado antes.
 * Escucha 'cicchitti:lines-loaded' para reconstruir el mega menú
 * cuando los datos de Sanity están disponibles.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── SVG helpers ── */
  const CHEVRON = `<svg class="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const ARROW = `<svg width="12" height="9" viewBox="0 0 14 10" fill="none">
    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  /* ── Mega menú: columna por línea ── */
  function buildLineColumn(line) {
    const MAX      = 4;
    const shown    = line.vinos ? line.vinos.slice(0, MAX) : [];
    const remaining = line.vinos ? line.vinos.length - MAX : 0;

    const wineLinks = shown.map(v => `
      <li>
        <a href="/vino?slug=${v.slug}" class="nav__mega-wine">
          ${v.varietal}
        </a>
      </li>`).join('');

    const moreLink = remaining > 0
      ? `<li>
           <a href="/linea?slug=${line.slug}" class="nav__mega-more">
             + ${remaining} más ${ARROW}
           </a>
         </li>`
      : '';

    return `
      <div class="nav__mega-col">
        <a href="/linea?slug=${line.slug}" class="nav__mega-line-link">
          <span class="nav__mega-line-name">${line.nombre}</span>
          <span class="nav__mega-line-count">
            ${line.vinos ? line.vinos.length : 0} ${!line.vinos || line.vinos.length === 1 ? 'varietal' : 'varietales'}
          </span>
        </a>
        <ul class="nav__mega-wines">
          ${wineLinks}
          ${moreLink}
        </ul>
      </div>`;
  }

  /* ── Mega menú completo ── */
  function buildMegaMenu(lines) {
    const columns = lines.map(l => buildLineColumn(l)).join('');

    return `
      <div class="nav__mega" role="region" aria-label="Líneas de vino">
        <div class="nav__mega-inner">
          <div class="nav__mega-grid">${columns}</div>
          <div class="nav__mega-footer">
            <a href="/vinos" class="nav__mega-cta">
              Ver todos los vinos ${ARROW}
            </a>
            <a href="/espumantes" class="nav__mega-cta nav__mega-cta--secondary">
              Ver todos los espumantes ${ARROW}
            </a>
          </div>
        </div>
      </div>`;
  }

  /* ── Drawer mobile: sección de líneas ── */
  function buildDrawerLines(lines) {
    return lines.map(l => `
      <a href="/linea?slug=${l.slug}" class="nav__drawer-link">
        ${l.nombre}
        <span class="nav__drawer-count">${l.vinos ? l.vinos.length : 0} ${!l.vinos || l.vinos.length === 1 ? 'varietal' : 'vinos'}</span>
      </a>`).join('');
  }

  /* ── Nav principal ── */
  function buildMainNav(current, lines) {
    const isActive = page => current === page ? ' class="nav__link--active"' : '';

    return `
      <a href="/" class="nav__logo">
        <img src="/assets/img/logo.png" alt="Bodega Cicchitti" class="nav__logo-img">
      </a>

      <ul class="nav__links" id="nav-links-list">
        <li class="nav__item nav__item--has-mega">
          <a href="/vinos"${isActive('vinos')}>
            Vinos ${CHEVRON}
          </a>
          ${buildMegaMenu(lines)}
        </li>
        <li class="nav__item">
          <a href="/espumantes"${isActive('espumantes')}>Espumantes</a>
        </li>
        <li class="nav__item">
          <a href="/bodega"${isActive('bodega')}>Bodega</a>
        </li>
        <li class="nav__item">
          <a href="#"${isActive('vinedos')}>Viñedos</a>
        </li>
        <li class="nav__item">
          <a href="/noticias"${isActive('noticias')}>Noticias</a>
        </li>
        <li class="nav__item">
          <a href="/postularme"${isActive('postularme')}>Trabajá con nosotros</a>
        </li>
      </ul>

      <div class="nav__actions">
        <button class="nav__hamburger" id="nav-hamburger" aria-label="Menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <a href="/contacto" class="btn btn--outline-light nav__btn-desktop" style="font-size:10px;padding:9px 20px;">Contacto</a>
      </div>

      <!-- Drawer mobile -->
      <div class="nav__drawer" id="nav-drawer">
        <div class="nav__drawer-header">
          <a href="/" class="nav__logo">
            <img src="/assets/img/logo.png" alt="Bodega Cicchitti" class="nav__logo-img">
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
            ${buildDrawerLines(lines)}
            <a href="/vinos" class="nav__drawer-link nav__drawer-link--all">
              Ver todos los vinos ${ARROW}
            </a>
          </div>
          <div class="nav__drawer-section">
            <a href="/espumantes" class="nav__drawer-link">Espumantes Soigné</a>
            <a href="/bodega" class="nav__drawer-link">Bodega</a>
            <a href="#" class="nav__drawer-link">Viñedos</a>
            <a href="/noticias" class="nav__drawer-link">Noticias</a>
            <a href="/postularme" class="nav__drawer-link">Trabajá con nosotros</a>
          </div>
          <div class="nav__drawer-section nav__drawer-section--actions">
            <a href="/contacto" class="btn btn--outline-light" style="font-size:10px;padding:12px 28px;width:100%;justify-content:center;">Contacto</a>
          </div>
        </nav>
      </div>
      <div class="nav__overlay" id="nav-overlay"></div>`;
  }

  /* ── Interactividad ── */
  function initInteractions() {
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

    const hamburger = document.getElementById('nav-hamburger');
    const drawer    = document.getElementById('nav-drawer');
    const overlay   = document.getElementById('nav-overlay');
    const closeBtn  = document.getElementById('nav-drawer-close');

    function openDrawer() {
      drawer   && drawer.classList.add('nav__drawer--open');
      overlay  && overlay.classList.add('nav__overlay--visible');
      hamburger && hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer   && drawer.classList.remove('nav__drawer--open');
      overlay  && overlay.classList.remove('nav__overlay--visible');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger && hamburger.addEventListener('click', openDrawer);
    closeBtn  && closeBtn.addEventListener('click', closeDrawer);
    overlay   && overlay.addEventListener('click', closeDrawer);

    drawer && drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* ── Rebuild del mega menú y drawer sin perder estado del nav ── */
  function rebuildMenuContent(lines) {
    const megaGrid    = document.querySelector('.nav__mega-grid');
    const drawerLines = document.querySelector('.nav__drawer-section');

    if (megaGrid) {
      megaGrid.innerHTML = lines.map(l => buildLineColumn(l)).join('');
    }
    if (drawerLines) {
      /* Reemplazar sólo los links de líneas (antes del "Ver todos") */
      const allLink = drawerLines.querySelector('.nav__drawer-link--all');
      const label   = drawerLines.querySelector('.nav__drawer-label');
      if (allLink && label) {
        /* Remover links existentes entre label y allLink */
        let node = label.nextSibling;
        while (node && node !== allLink) {
          const next = node.nextSibling;
          drawerLines.removeChild(node);
          node = next;
        }
        /* Insertar nuevos links */
        const temp = document.createElement('div');
        temp.innerHTML = buildDrawerLines(lines);
        while (temp.firstChild) {
          drawerLines.insertBefore(temp.firstChild, allLink);
        }
      }
    }
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const current = nav.dataset.current || '';
    const lines   = getAllLines(); /* Puede estar vacío si Sanity no cargó aún */

    nav.innerHTML = buildMainNav(current, lines);
    initInteractions();

    /* Reconstruir mega menú cuando lleguen los datos de Sanity */
    document.addEventListener('cicchitti:lines-loaded', function (e) {
      const freshLines = e.detail || getAllLines();
      if (freshLines.length > 0) {
        rebuildMenuContent(freshLines);
      }
    });
  });

})();

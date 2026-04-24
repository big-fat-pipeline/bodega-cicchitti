/**
 * home.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Renderiza dinámicamente las secciones de la home que provienen
 * de Sanity: líneas destacadas y noticias destacadas.
 *
 * Depende de (cargar antes en el HTML):
 *   sanity-client.js, wines-data.js, noticias-data.js
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── GROQ: documento único de configuración del home ── */
  var Q_HOME_CONFIG = [
    '*[_type == "homeConfig"][0] {',
    '  "lineasDestacadas": lineasDestacadas[]-> {',
    '    "slug": slug.current,',
    '    nombre,',
    '    descripcion,',
    '    etiqueta,',
    '    "heroImg": heroImg.asset->url',
    '  },',
    '  "noticiasDestacadas": noticiasDestacadas[]-> {',
    '    "slug": slug.current,',
    '    titulo,',
    '    fecha,',
    '    categoria,',
    '    "imagen": imagen.asset->url,',
    '    bajada',
    '  }',
    '}'
  ].join('\n');

  var CAT_COLORS = {
    'Novedades': 'var(--wine)',
    'Premios':   'var(--gold)',
    'Eventos':   '#4a6741',
    'Bodega':    '#4a5568'
  };

  var ARROW_SVG = '<svg width="12" height="9" viewBox="0 0 14 10" fill="none">' +
    '<path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" stroke-width="1.2"' +
    ' stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ── Fetch homeConfig desde Sanity ── */
  function _fetchHomeConfig() {
    if (!window.SanityClient || window.SanityClient.projectId === 'TU_PROJECT_ID') {
      return Promise.resolve(null);
    }
    return window.SanityClient.fetch(Q_HOME_CONFIG).catch(function () { return null; });
  }

  /* ── Formato de fecha en español ── */
  function _formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* ── Renderizar tarjetas de líneas ── */
  function _renderWineCards(lines) {
    var grid = document.getElementById('wines-grid');
    if (!grid || !lines || !lines.length) return;

    grid.innerHTML = lines.map(function (linea, i) {
      var delay = i > 0 ? ' delay-' + i : '';
      var bg = linea.heroImg
        ? 'background-image:url(\'' + linea.heroImg + '\')'
        : 'background:#3a0d17';
      return [
        '<a href="pages/linea.html?slug=' + linea.slug + '"',
        '   class="line-promo-card line-promo-card--small reveal' + delay + '">',
        '  <div class="line-promo-card__bg" style="' + bg + '"></div>',
        '  <div class="line-promo-card__overlay"></div>',
        '  <div class="line-promo-card__body">',
        '    <div class="line-promo-card__eyebrow">Línea</div>',
        '    <div class="line-promo-card__name">' + linea.nombre + '</div>',
        '    <p class="line-promo-card__desc">' + (linea.descripcion || '') + '</p>',
        '    <span class="line-promo-card__cta">Explorar línea ' + ARROW_SVG + '</span>',
        '  </div>',
        '</a>'
      ].join('\n');
    }).join('\n');
  }

  /* ── Renderizar tarjetas de noticias ── */
  function _renderNewsCards(noticias) {
    var grid = document.getElementById('home-noticias-grid');
    if (!grid || !noticias || !noticias.length) return;

    grid.innerHTML = noticias.map(function (n, i) {
      var delay = i > 0 ? ' delay-' + i : '';
      var bg = n.imagen
        ? 'background-image:url(\'' + n.imagen + '\')'
        : '';
      var catColor = CAT_COLORS[n.categoria] || 'var(--wine)';

      return [
        '<a href="pages/noticia.html?slug=' + n.slug + '"',
        '   class="home-noticia-promo reveal' + delay + '">',
        '  <div class="home-noticia-promo__bg" style="' + bg + '"></div>',
        '  <div class="home-noticia-promo__overlay"></div>',
        '  <div class="home-noticia-promo__body">',
        '    <div class="home-noticia-promo__meta">',
        '      <span class="home-noticia-promo__cat" style="background:' + catColor + '">' + (n.categoria || '') + '</span>',
        '      <span class="home-noticia-promo__date">' + _formatDate(n.fecha) + '</span>',
        '    </div>',
        '    <div class="home-noticia-promo__titulo">' + n.titulo + '</div>',
        '    <p class="home-noticia-promo__bajada">' + (n.bajada || '') + '</p>',
        '    <span class="home-noticia-promo__cta">Leer más ' + ARROW_SVG + '</span>',
        '  </div>',
        '</a>'
      ].join('\n');
    }).join('\n');
  }

  /* ── Init ── */
  function init() {
    Promise.all([
      window.getAllLinesAsync    ? window.getAllLinesAsync()    : Promise.resolve([]),
      window.getAllNoticiasAsync ? window.getAllNoticiasAsync() : Promise.resolve([]),
      _fetchHomeConfig()
    ]).then(function (results) {
      var allLines    = results[0];
      var allNoticias = results[1];
      var config      = results[2];

      var lines = (config && config.lineasDestacadas && config.lineasDestacadas.length)
        ? config.lineasDestacadas
        : allLines.slice(0, 3);

      var noticias = (config && config.noticiasDestacadas && config.noticiasDestacadas.length)
        ? config.noticiasDestacadas
        : allNoticias.slice(0, 3);

      _renderWineCards(lines);
      _renderNewsCards(noticias);

      if (window.initReveal) window.initReveal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

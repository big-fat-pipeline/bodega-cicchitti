/**
 * wines-data.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Capa de datos para vinos. Consulta Sanity CMS via GROQ y
 * cae en datos estáticos si Sanity no está configurado o falla.
 *
 * API pública (todas globales):
 *   Sync  — getAllLines(), getLineBySlug(s), getWineBySlug(s), getOtherLines(s)
 *           Devuelven datos del caché (vacío hasta que carga Sanity).
 *   Async — getAllLinesAsync(), getLineBySlugAsync(s), getWineBySlugAsync(s),
 *           getOtherLinesAsync(s)  → devuelven Promise con los datos.
 *
 * Evento: 'cicchitti:lines-loaded' en document cuando los datos están listos.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     DATOS ESTÁTICOS (fallback mientras Sanity no está configurado)
  ══════════════════════════════════════════════════════════ */
  var STATIC_LINES = [
    {
      slug: 'emblema', nombre: 'Emblema', orden: 1,
      descripcion: 'Nuestro vino insignia. Elaborado con uvas seleccionadas de los mejores terruños de Mendoza, representa el vínculo más profundo de la familia Cicchitti con el varietal y la naturaleza.',
      etiqueta: 'Insignia', heroImg: null,
      vinos: [
        { slug: 'emblema-malbec', varietal: 'Malbec', varietal_full: '100% Malbec',
          vinedo: 'Altamira, Valle de Uco', cosecha: 2021,
          imagen: '../assets/img/vinos/emblema-malbec.png',
          premios: ['../assets/img/cucardas-07.png'],
          descripcion: 'Violeta intenso, ciruelas maduras, chocolate. Gran vino insignia elaborado con tradición familiar.',
          tagline: '«Gran vino insignia, elaborado con tradición familiar.»' }
      ]
    },
    {
      slug: 'edicion-limitada', nombre: 'Edición Limitada', orden: 2,
      descripcion: 'Producción restringida de los varietales más expresivos de nuestra bodega. Cada botella es una promesa de calidad sin compromisos.',
      etiqueta: null, heroImg: null,
      vinos: [
        { slug: 'edicion-limitada-malbec', varietal: 'Malbec', varietal_full: '100% Malbec',
          vinedo: 'Valle de Uco, Tupungato y Maipú', cosecha: 2021, premios: null,
          imagen: '../assets/img/vinos/edicion-limitada-malbec.png',
          descripcion: 'Color rojo profundo, concentrado y elegante. Frutos rojos maduros con notas especiadas.',
          tagline: '«Producción limitada, calidad sin compromisos.»' },
        { slug: 'edicion-limitada-cabernet-sauvignon', varietal: 'Cabernet Sauvignon',
          varietal_full: '100% Cabernet Sauvignon', vinedo: 'Mendoza', cosecha: 2021,
          premios: null, imagen: null,
          descripcion: 'Intenso y estructurado, con notas de cassis, tabaco y cedro.',
          tagline: '«Expresión pura del Cabernet Sauvignon mendocino.»' }
      ]
    },
    {
      slug: 'gran-reserva', nombre: 'Gran Reserva', orden: 3,
      descripcion: 'Vinos de guarda elaborados con uvas de alta gama y crianza en barrica de roble. Complejos, estructurados y pensados para el tiempo.',
      etiqueta: null, heroImg: null,
      vinos: [
        { slug: 'gran-reserva-malbec', varietal: 'Malbec', varietal_full: '100% Malbec',
          vinedo: 'Valle de Uco', cosecha: 2020, premios: null,
          imagen: '../assets/img/vinos/gran-reserva-malbec.png',
          descripcion: 'Frutos rojos maduros, canela y chocolate. Largo y persistente.',
          tagline: '«Tradición y terroir en cada copa.»' }
      ]
    },
    {
      slug: 'blend', nombre: 'Blend', orden: 4,
      descripcion: 'El arte del ensamble. Varietales que se complementan para crear algo mayor que la suma de sus partes. Complejidad, equilibrio y carácter.',
      etiqueta: null, heroImg: null,
      vinos: [
        { slug: 'blend-cabernet-franc-cabernet-sauvignon', varietal: 'Cab. Franc & Cab. Sauvignon',
          varietal_full: 'Cabernet Franc · Cabernet Sauvignon', vinedo: 'Mendoza', cosecha: 2021,
          premios: null, imagen: '../assets/img/vinos/blend-cabernet-franc-cabernet-sauvignon.png',
          descripcion: 'Elegante ensamble de dos varietales bordeleses. Especiado, mineral y de gran complejidad.',
          tagline: '«Dos varietales, una sola expresión.»' },
        { slug: 'blend-malbec-cabernet-sauvignon-merlot', varietal: 'Malbec, Cab. Sauv. & Merlot',
          varietal_full: 'Malbec · Cabernet Sauvignon · Merlot', vinedo: 'Mendoza', cosecha: 2021,
          premios: null, imagen: null,
          descripcion: 'Ensamble clásico mendocino de gran cuerpo y equilibrio.',
          tagline: '«El alma de Mendoza en una botella.»' },
        { slug: 'blend-superterra', varietal: 'Superterra', varietal_full: 'Blend Superterra',
          vinedo: 'Mendoza', cosecha: 2021, premios: null, imagen: null,
          descripcion: 'Nuestro blend premium. Complejo, profundo y memorable.',
          tagline: '«Nuestra tierra, nuestra identidad.»' }
      ]
    },
    {
      slug: 'coleccion', nombre: 'Colección', orden: 5,
      descripcion: 'Una amplia gama de varietales que expresa la diversidad del terruño mendocino. Para cada paladar, una expresión auténtica.',
      etiqueta: null, heroImg: null,
      vinos: [
        { slug: 'coleccion-malbec', varietal: 'Malbec', varietal_full: '100% Malbec', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Frutos rojos, violetas y especias. Fresco y accesible.', tagline: null },
        { slug: 'coleccion-cabernet-sauvignon', varietal: 'Cabernet Sauvignon', varietal_full: '100% Cabernet Sauvignon', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Cassis, pimiento verde y taninos firmes.', tagline: null },
        { slug: 'coleccion-sangiovese', varietal: 'Sangiovese', varietal_full: '100% Sangiovese', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Cereza, hierbas mediterráneas y acidez vibrante.', tagline: null },
        { slug: 'coleccion-merlot', varietal: 'Merlot', varietal_full: '100% Merlot', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Suave, frutal y de taninos sedosos.', tagline: null },
        { slug: 'coleccion-pinot-noir', varietal: 'Pinot Noir', varietal_full: '100% Pinot Noir', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Frutos rojos delicados, tierra húmeda y final elegante.', tagline: null },
        { slug: 'coleccion-chardonnay', varietal: 'Chardonnay', varietal_full: '100% Chardonnay', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Pera, manzana verde y toques mantecosos.', tagline: null },
        { slug: 'coleccion-sauvignon-blanc', varietal: 'Sauvignon Blanc', varietal_full: '100% Sauvignon Blanc', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Cítricos frescos, hierba y mineralidad vibrante.', tagline: null },
        { slug: 'coleccion-blanco-de-malbec', varietal: 'Blanco de Malbec', varietal_full: 'Malbec Vinificado en Blanco', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Floral, frutal y sorprendentemente fresco.', tagline: null },
        { slug: 'coleccion-rosado', varietal: 'Rosado', varietal_full: 'Rosado', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Frutillas, frambuesas y acidez refrescante.', tagline: null },
        { slug: 'coleccion-nectar', varietal: 'Néctar', varietal_full: 'Néctar', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Dulce natural, equilibrado y de larga persistencia.', tagline: null }
      ]
    },
    {
      slug: 'primmo', nombre: 'Primmo', orden: 6,
      descripcion: 'Vinos jóvenes, frescos y accesibles. Perfectos para el día a día, sin sacrificar la identidad de la bodega.',
      etiqueta: null, heroImg: null,
      vinos: [
        { slug: 'primmo-malbec', varietal: 'Malbec', varietal_full: '100% Malbec', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: '../assets/img/vinos/primmo-malbec.png', descripcion: 'Fresco, frutal y de taninos suaves. Ideal para cualquier ocasión.', tagline: null },
        { slug: 'primmo-cabernet-sauvignon', varietal: 'Cabernet Sauvignon', varietal_full: '100% Cabernet Sauvignon', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'Directo y frutado, con taninos amigables.', tagline: null }
      ]
    },
    {
      slug: 'esteoeste', nombre: 'EsteOeste', orden: 7,
      descripcion: 'Donde el este y el oeste de Mendoza se encuentran en una sola botella. La fusión de dos terruños, dos expresiones, una identidad.',
      etiqueta: null, heroImg: '../assets/img/lines/esteoeste-hero.jpg',
      vinos: [
        { slug: 'esteoeste-malbec', varietal: 'Malbec', varietal_full: '100% Malbec', vinedo: 'Mendoza', cosecha: 2023, premios: null, imagen: null, descripcion: 'La fusión de dos terruños mendocinos en un solo vino expresivo y genuino.', tagline: null }
      ]
    }
  ];

  /* ══════════════════════════════════════════════════════════
     CACHÉ — se rellena con datos de Sanity al cargar
  ══════════════════════════════════════════════════════════ */
  var _cache = {
    lines:       null,   /* null = no cargado aún */
    bySlug:      {},     /* lineSlug → línea */
    wineBySlug:  {}      /* wineSlug → { ...vino, linea: línea } */
  };

  /* Indica si ya comenzó la carga (evita fetch duplicado) */
  var _fetchPromise = null;

  /* ── Indexar líneas en el caché ── */
  function _indexLines(lines) {
    _cache.lines = lines;
    _cache.bySlug = {};
    _cache.wineBySlug = {};
    lines.forEach(function (linea) {
      _cache.bySlug[linea.slug] = linea;
      if (Array.isArray(linea.vinos)) {
        linea.vinos.forEach(function (vino) {
          _cache.wineBySlug[vino.slug] = Object.assign({}, vino, { linea: linea });
        });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     QUERIES GROQ
  ══════════════════════════════════════════════════════════ */
  var Q_ALL_LINES = [
    '*[_type == "wineRange"] | order(orden asc) {',
    '  "slug": slug.current,',
    '  nombre,',
    '  descripcion,',
    '  etiqueta,',
    '  "heroImg": heroImg.asset->url,',
    '  orden,',
    '  "vinos": vinos[]-> {',
    '    "slug": slug.current,',
    '    varietal,',
    '    "varietal_full": varietal_full,',
    '    vinedo,',
    '    cosecha,',
    '    "imagen": imagen.asset->url,',
    '    "premios": premios[].asset->url,',
    '    descripcion,',
    '    tagline,',
    '    metodo,',
    '    millesime',
    '  }',
    '}'
  ].join('\n');

  /* ── Fetch desde Sanity ── */
  function _fetchFromSanity() {
    if (_fetchPromise) return _fetchPromise;

    /* Si SanityClient no está disponible o el project ID es placeholder, usar fallback */
    if (!window.SanityClient || window.SanityClient.projectId === 'TU_PROJECT_ID') {
      _indexLines(STATIC_LINES);
      document.dispatchEvent(new CustomEvent('cicchitti:lines-loaded', { detail: _cache.lines }));
      _fetchPromise = Promise.resolve(_cache.lines);
      return _fetchPromise;
    }

    _fetchPromise = window.SanityClient.fetch(Q_ALL_LINES)
      .then(function (lines) {
        if (!lines || lines.length === 0) {
          console.warn('[Cicchitti] Sanity devolvió líneas vacías. Usando datos estáticos.');
          lines = STATIC_LINES;
        }
        _indexLines(lines);
        document.dispatchEvent(new CustomEvent('cicchitti:lines-loaded', { detail: _cache.lines }));
        return _cache.lines;
      })
      .catch(function (err) {
        console.error('[Cicchitti] Error al cargar vinos desde Sanity. Usando datos estáticos.', err);
        _indexLines(STATIC_LINES);
        document.dispatchEvent(new CustomEvent('cicchitti:lines-loaded', { detail: _cache.lines }));
        return _cache.lines;
      });

    return _fetchPromise;
  }

  /* ══════════════════════════════════════════════════════════
     API PÚBLICA — SYNC (desde caché)
  ══════════════════════════════════════════════════════════ */
  function getAllLines() {
    return _cache.lines || [];
  }

  function getLineBySlug(slug) {
    return _cache.bySlug[slug] || null;
  }

  function getWineBySlug(slug) {
    return _cache.wineBySlug[slug] || null;
  }

  function getOtherLines(excludeSlug) {
    return (_cache.lines || []).filter(function (l) { return l.slug !== excludeSlug; });
  }

  /* ══════════════════════════════════════════════════════════
     API PÚBLICA — ASYNC (garantiza que los datos están listos)
  ══════════════════════════════════════════════════════════ */
  function getAllLinesAsync() {
    if (_cache.lines !== null) return Promise.resolve(_cache.lines);
    return _fetchFromSanity();
  }

  function getLineBySlugAsync(slug) {
    return getAllLinesAsync().then(function () {
      return _cache.bySlug[slug] || null;
    });
  }

  function getWineBySlugAsync(slug) {
    return getAllLinesAsync().then(function () {
      return _cache.wineBySlug[slug] || null;
    });
  }

  function getOtherLinesAsync(excludeSlug) {
    return getAllLinesAsync().then(function (lines) {
      return lines.filter(function (l) { return l.slug !== excludeSlug; });
    });
  }

  /* ══════════════════════════════════════════════════════════
     EXPOSICIÓN GLOBAL
  ══════════════════════════════════════════════════════════ */
  window.getAllLines          = getAllLines;
  window.getLineBySlug       = getLineBySlug;
  window.getWineBySlug       = getWineBySlug;
  window.getOtherLines       = getOtherLines;
  window.getAllLinesAsync     = getAllLinesAsync;
  window.getLineBySlugAsync  = getLineBySlugAsync;
  window.getWineBySlugAsync  = getWineBySlugAsync;
  window.getOtherLinesAsync  = getOtherLinesAsync;

  /* Iniciar fetch inmediatamente para que los datos estén listos lo antes posible */
  _fetchFromSanity();

})();

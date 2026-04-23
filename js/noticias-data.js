/**
 * noticias-data.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Capa de datos para noticias. Consulta Sanity CMS via GROQ y
 * cae en datos estáticos si Sanity no está configurado o falla.
 *
 * API pública (globales):
 *   Sync  — getAllNoticias(), getNoticiaBySlug(s), getRelatedNoticias(s, n)
 *   Async — getAllNoticiasAsync(), getNoticiaBySlugAsync(s), getRelatedNoticiasAsync(s, n)
 *
 * Evento: 'cicchitti:noticias-loaded' en document cuando los datos están listos.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     DATOS ESTÁTICOS (fallback)
  ══════════════════════════════════════════════════════════ */
  var STATIC_NOTICIAS = [
    {
      slug: 'emblema-malbec-cosecha-2023',
      titulo: 'Presentamos el Emblema Malbec cosecha 2023',
      fecha: '2026-03-20',
      categoria: 'Novedades',
      imagen: null,
      bajada: 'Después de dos años de añejamiento en barrica francesa de primer uso, nuestro vino insignia llega con una nueva expresión que refleja el terruño de Altamira en estado puro.',
      cuerpo: '<p>El Emblema Malbec es, desde hace décadas, la promesa más íntima de la familia Cicchitti con la tierra mendocina. La cosecha 2023 no es la excepción: un año marcado por amplitudes térmicas extraordinarias en el Valle de Uco que regalaron uvas de concentración excepcional y acidez vibrante.</p>\n<p>Durante los meses de vendimia, nuestro equipo trabajó block por block en los viñedos de Altamira, seleccionando sólo las uvas con el índice de madurez ideal. El resultado es un vino de violeta profundo, con aromas de ciruelas frescas, chocolate amargo y una fina nota de cedro que anuncia los 18 meses en barrica.</p>\n<p>El lanzamiento oficial tendrá lugar en mayo de 2026, con una presentación a prensa y sommeliers en la bodega. Los pedidos anticipados ya están disponibles a través de nuestro contacto comercial.</p>',
      autor: 'Bodega Cicchitti'
    },
    {
      slug: 'feria-internacional-vino-mendoza-2026',
      titulo: 'Cicchitti en la Feria Internacional del Vino de Mendoza',
      fecha: '2026-02-10',
      categoria: 'Eventos',
      imagen: null,
      bajada: 'Participamos por octavo año consecutivo en la feria más importante de la industria vitivinícola argentina, presentando toda nuestra línea de varietales y los espumantes Soigné.',
      cuerpo: '<p>La Feria Internacional del Vino de Mendoza es, año tras año, el escenario donde la industria vitivinícola argentina se reencuentra. Bodega Cicchitti lleva ocho ediciones consecutivas siendo parte de esta celebración del vino y la cultura mendocina.</p>\n<p>Este año presentamos en nuestro stand la colección completa: desde el Primmo, con su perfil jovial y accesible, hasta el Emblema, nuestro vino insignia de guarda.</p>\n<p>El equipo de enología compartió degustaciones guiadas para grupos de compradores y prensa internacional. Fue, una vez más, una oportunidad de mostrar al mundo de qué está hecha la bodega familiar más comprometida con el terruño de Rodeo de la Cruz.</p>',
      autor: 'Bodega Cicchitti'
    },
    {
      slug: 'gran-reserva-malbec-93-puntos',
      titulo: 'Nuestro Gran Reserva Malbec obtiene 93 puntos internacionales',
      fecha: '2025-11-05',
      categoria: 'Premios',
      imagen: null,
      bajada: 'El Gran Reserva Malbec cosecha 2021 fue evaluado por un panel de críticos internacionales especializados en vinos del Nuevo Mundo, obteniendo 93 puntos sobre 100.',
      cuerpo: '<p>El Gran Reserva Malbec cosecha 2021 acaba de recibir 93 puntos en una evaluación realizada por un panel de críticos internacionales. Para nosotros, este reconocimiento no es solo una cifra: es la validación de años de trabajo silencioso en el viñedo y la bodega.</p>\n<p>Los evaluadores destacaron la "complejidad aromática sorprendente para su precio" y el "final largo con notas de especias tostadas y frutos negros".</p>\n<p>El Gran Reserva Malbec 2021 se encuentra disponible en nuestra lista de distribuidores y en bodega.</p>',
      autor: 'Bodega Cicchitti'
    },
    {
      slug: 'como-se-hace-un-vino-personalizado',
      titulo: 'Cómo elaboramos un vino con tu nombre en la etiqueta',
      fecha: '2025-09-18',
      categoria: 'Bodega',
      imagen: null,
      bajada: 'Nuestro servicio de vinos personalizados tiene una historia que pocos conocen. Desde la selección del varietal hasta el diseño de la etiqueta, te contamos el proceso completo.',
      cuerpo: '<p>Cuando alguien llega a la bodega con la idea de tener su propio vino, la pregunta que siempre les hacemos es: ¿qué historia querés que cuente?</p>\n<p>El proceso comienza eligiendo el varietal base. Dependiendo del perfil buscado, recomendamos distintas líneas como punto de partida. Luego viene la etiqueta: trabajamos con un diseñador gráfico para crear una pieza personal, elegante y coherente con la identidad visual de Cicchitti.</p>\n<p>El mínimo de producción es de 6 botellas. Cada vino personalizado incluye certificado de bodega con los datos de la cosecha y el varietal.</p>',
      autor: 'Bodega Cicchitti'
    }
  ];

  /* ══════════════════════════════════════════════════════════
     CACHÉ
  ══════════════════════════════════════════════════════════ */
  var _cache = {
    noticias:  null,   /* null = no cargado */
    bySlug:    {}
  };

  var _fetchPromise = null;

  function _indexNoticias(noticias) {
    _cache.noticias = noticias.slice().sort(function (a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    });
    _cache.bySlug = {};
    _cache.noticias.forEach(function (n) {
      _cache.bySlug[n.slug] = n;
    });
  }

  /* ══════════════════════════════════════════════════════════
     QUERIES GROQ
  ══════════════════════════════════════════════════════════ */
  var Q_ALL_NOTICIAS = [
    '*[_type == "noticia"] | order(fecha desc) {',
    '  "slug": slug.current,',
    '  titulo,',
    '  fecha,',
    '  categoria,',
    '  "imagen": imagen.asset->url,',
    '  bajada,',
    '  autor',
    '}'
  ].join('\n');

  var Q_NOTICIA_BY_SLUG = [
    '*[_type == "noticia" && slug.current == $slug][0] {',
    '  "slug": slug.current,',
    '  titulo,',
    '  fecha,',
    '  categoria,',
    '  "imagen": imagen.asset->url,',
    '  bajada,',
    '  cuerpo,',
    '  autor',
    '}'
  ].join('\n');

  /* ── Fetch desde Sanity ── */
  function _fetchFromSanity() {
    if (_fetchPromise) return _fetchPromise;

    if (!window.SanityClient || window.SanityClient.projectId === 'TU_PROJECT_ID') {
      _indexNoticias(STATIC_NOTICIAS);
      document.dispatchEvent(new CustomEvent('cicchitti:noticias-loaded', { detail: _cache.noticias }));
      _fetchPromise = Promise.resolve(_cache.noticias);
      return _fetchPromise;
    }

    _fetchPromise = window.SanityClient.fetch(Q_ALL_NOTICIAS)
      .then(function (noticias) {
        if (!noticias || noticias.length === 0) {
          console.warn('[Cicchitti] Sanity devolvió noticias vacías. Usando datos estáticos.');
          noticias = STATIC_NOTICIAS;
        }
        _indexNoticias(noticias);
        document.dispatchEvent(new CustomEvent('cicchitti:noticias-loaded', { detail: _cache.noticias }));
        return _cache.noticias;
      })
      .catch(function (err) {
        console.error('[Cicchitti] Error al cargar noticias desde Sanity. Usando datos estáticos.', err);
        _indexNoticias(STATIC_NOTICIAS);
        document.dispatchEvent(new CustomEvent('cicchitti:noticias-loaded', { detail: _cache.noticias }));
        return _cache.noticias;
      });

    return _fetchPromise;
  }

  /* ── Fetch noticia individual con cuerpo completo ── */
  function _fetchNoticiaBySlug(slug) {
    if (!window.SanityClient || window.SanityClient.projectId === 'TU_PROJECT_ID') {
      return Promise.resolve(
        STATIC_NOTICIAS.find(function (n) { return n.slug === slug; }) || null
      );
    }
    return window.SanityClient.fetch(Q_NOTICIA_BY_SLUG, { slug: slug })
      .then(function (noticia) {
        if (noticia) {
          _cache.bySlug[noticia.slug] = noticia;
        }
        return noticia || null;
      })
      .catch(function (err) {
        console.error('[Cicchitti] Error al cargar noticia "' + slug + '" desde Sanity.', err);
        return STATIC_NOTICIAS.find(function (n) { return n.slug === slug; }) || null;
      });
  }

  /* ══════════════════════════════════════════════════════════
     API PÚBLICA — SYNC
  ══════════════════════════════════════════════════════════ */
  function getAllNoticias() {
    return _cache.noticias || [];
  }

  function getNoticiaBySlug(slug) {
    return _cache.bySlug[slug] || null;
  }

  function getRelatedNoticias(excludeSlug, limit) {
    limit = limit || 3;
    return (_cache.noticias || [])
      .filter(function (n) { return n.slug !== excludeSlug; })
      .slice(0, limit);
  }

  /* ══════════════════════════════════════════════════════════
     API PÚBLICA — ASYNC
  ══════════════════════════════════════════════════════════ */
  function getAllNoticiasAsync() {
    if (_cache.noticias !== null) return Promise.resolve(_cache.noticias);
    return _fetchFromSanity();
  }

  function getNoticiaBySlugAsync(slug) {
    /* Si ya está en caché con cuerpo (campo 'cuerpo' presente), retornar directo */
    var cached = _cache.bySlug[slug];
    if (cached && (cached.cuerpo !== undefined)) return Promise.resolve(cached);
    /* Si no tiene cuerpo, fetch individual para obtener el body completo */
    return _fetchNoticiaBySlug(slug);
  }

  function getRelatedNoticiasAsync(excludeSlug, limit) {
    return getAllNoticiasAsync().then(function (noticias) {
      limit = limit || 3;
      return noticias
        .filter(function (n) { return n.slug !== excludeSlug; })
        .slice(0, limit);
    });
  }

  /* ══════════════════════════════════════════════════════════
     EXPOSICIÓN GLOBAL
  ══════════════════════════════════════════════════════════ */
  window.getAllNoticias           = getAllNoticias;
  window.getNoticiaBySlug        = getNoticiaBySlug;
  window.getRelatedNoticias      = getRelatedNoticias;
  window.getAllNoticiasAsync      = getAllNoticiasAsync;
  window.getNoticiaBySlugAsync   = getNoticiaBySlugAsync;
  window.getRelatedNoticiasAsync = getRelatedNoticiasAsync;

  /* Iniciar fetch inmediatamente */
  _fetchFromSanity();

})();

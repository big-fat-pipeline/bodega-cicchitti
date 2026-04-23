/**
 * sanity-client.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Cliente HTTP para la API GROQ de Sanity.
 * No requiere npm: usa fetch() nativo del browser.
 *
 * Configuración:
 *   1. Crear un proyecto en sanity.io
 *   2. Reemplazar SANITY_PROJECT_ID con tu Project ID
 *   3. Asegurarse de que el dataset sea "production" (o cambiar SANITY_DATASET)
 *   4. En sanity.io → API → CORS: agregar el dominio del sitio
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── Configuración ── */
  var SANITY_PROJECT_ID = 'w8bmd1rz';
  var SANITY_DATASET    = 'production';
  var SANITY_API_VER    = '2024-01-01';

  /* CDN URL (datos publicados, edge-cached, sin autenticación) */
  var BASE_URL = 'https://' + SANITY_PROJECT_ID + '.apicdn.sanity.io/v' +
                 SANITY_API_VER + '/data/query/' + SANITY_DATASET;

  /* ── Codificación de query y parámetros ── */
  function buildQueryString(query, params) {
    var qs = '?query=' + encodeURIComponent(query);
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(function (key) {
        qs += '&$' + key + '=' + encodeURIComponent(JSON.stringify(params[key]));
      });
    }
    return qs;
  }

  /* ── Fetch con retry simple ── */
  function sanityFetch(query, params) {
    var url = BASE_URL + buildQueryString(query, params);
    return fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('[Sanity] HTTP ' + res.status + ' al consultar: ' + url);
        }
        return res.json();
      })
      .then(function (data) {
        if (data.error) {
          throw new Error('[Sanity] Error GROQ: ' + JSON.stringify(data.error));
        }
        return data.result;
      });
  }

  /* ── Construcción de URL de imagen ── */
  function buildImageUrl(imageField, opts) {
    if (!imageField || !imageField.asset || !imageField.asset._ref) return null;
    var ref = imageField.asset._ref;
    /* Formato del _ref: image-{hash}-{WxH}-{ext} */
    var match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
    if (!match) return null;
    var hash = match[1], dims = match[2], ext = match[3];
    var url = 'https://cdn.sanity.io/images/' + SANITY_PROJECT_ID + '/' +
              SANITY_DATASET + '/' + hash + '-' + dims + '.' + ext;
    var params = [];
    if (opts && opts.width)  params.push('w=' + opts.width);
    if (opts && opts.height) params.push('h=' + opts.height);
    params.push('auto=format');
    return url + '?' + params.join('&');
  }

  /* ── API pública ── */
  window.SanityClient = {
    fetch:         sanityFetch,
    buildImageUrl: buildImageUrl,
    projectId:     SANITY_PROJECT_ID,
    dataset:       SANITY_DATASET
  };

})();

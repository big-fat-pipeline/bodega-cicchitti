/**
 * portable-text.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Convierte Portable Text (formato de Sanity) a HTML.
 * Soporta: párrafos, h2, h3, blockquote, listas ul/ol,
 *          marks: strong, em, underline, links.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderSpan(span, markDefs) {
    if (!span || span._type !== 'span') return '';
    var text = escapeHtml(span.text || '');
    var marks = span.marks || [];

    marks.forEach(function (mark) {
      /* Link annotation */
      var def = (markDefs || []).find(function (d) { return d._key === mark; });
      if (def && def._type === 'link') {
        var href = escapeHtml(def.href || '#');
        var target = def.blank ? ' target="_blank" rel="noopener"' : '';
        text = '<a href="' + href + '"' + target + '>' + text + '</a>';
        return;
      }
      /* Decorators */
      switch (mark) {
        case 'strong':    text = '<strong>' + text + '</strong>'; break;
        case 'em':        text = '<em>' + text + '</em>'; break;
        case 'underline': text = '<u>' + text + '</u>'; break;
        case 'code':      text = '<code>' + text + '</code>'; break;
      }
    });

    return text;
  }

  function renderBlock(block) {
    if (!block) return '';

    /* Bloques de imagen embebida */
    if (block._type === 'image') {
      var url = block.asset && block.asset.url ? block.asset.url : null;
      if (!url && window.SanityClient && block.asset && block.asset._ref) {
        url = window.SanityClient.buildImageUrl(block, { width: 900 });
      }
      if (!url) return '';
      var alt = escapeHtml(block.alt || '');
      return '<figure class="noticia-figure"><img src="' + url + '" alt="' + alt + '" loading="lazy"></figure>';
    }

    /* Bloques estándar de texto */
    if (block._type !== 'block') return '';

    var style     = block.style || 'normal';
    var markDefs  = block.markDefs || [];
    var children  = block.children || [];
    var content   = children.map(function (c) { return renderSpan(c, markDefs); }).join('');

    switch (style) {
      case 'h2':         return '<h2>' + content + '</h2>';
      case 'h3':         return '<h3>' + content + '</h3>';
      case 'h4':         return '<h4>' + content + '</h4>';
      case 'blockquote': return '<blockquote>' + content + '</blockquote>';
      default:           return '<p>' + content + '</p>';
    }
  }

  /**
   * Convierte un array de bloques Portable Text a string HTML.
   * Si recibe un string (fallback estático), lo devuelve sin cambios.
   */
  function portableTextToHtml(blocks) {
    /* Fallback: si ya es HTML string (datos estáticos), devolver directo */
    if (typeof blocks === 'string') return blocks;
    if (!Array.isArray(blocks) || blocks.length === 0) return '';

    var html = [];
    var i = 0;

    while (i < blocks.length) {
      var block = blocks[i];

      /* Agrupar items de lista consecutivos */
      if (block._type === 'block' && block.listItem) {
        var listType = block.listItem === 'number' ? 'ol' : 'ul';
        var items = [];

        while (i < blocks.length &&
               blocks[i]._type === 'block' &&
               blocks[i].listItem === block.listItem) {
          var markDefs = blocks[i].markDefs || [];
          var content  = (blocks[i].children || [])
            .map(function (c) { return renderSpan(c, markDefs); })
            .join('');
          items.push('<li>' + content + '</li>');
          i++;
        }

        html.push('<' + listType + '>' + items.join('') + '</' + listType + '>');
        continue;
      }

      html.push(renderBlock(block));
      i++;
    }

    return html.join('\n');
  }

  window.portableTextToHtml = portableTextToHtml;

})();

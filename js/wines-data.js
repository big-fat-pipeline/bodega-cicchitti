/**
 * wines-data.js — Bodega Cicchitti
 * ─────────────────────────────────────────────────────────────
 * Capa de datos estática. Al integrar Sanity CMS, este archivo
 * se reemplaza por queries a la API de Sanity. La estructura de
 * datos replica los document types que tendrá el schema de Sanity:
 *   WineRange (línea) → wines[] (vinos individuales)
 * ─────────────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════
   LÍNEAS DE VINO (wineRange en Sanity)
══════════════════════════════════════ */
const WINE_LINES = [
  {
    slug:        'emblema',
    nombre:      'Emblema',
    descripcion: 'Nuestro vino insignia. Elaborado con uvas seleccionadas de los mejores terruños de Mendoza, representa el vínculo más profundo de la familia Cicchitti con el varietal y la naturaleza.',
    etiqueta:    'Insignia',
    orden:       1,
    vinos: [
      {
        slug:         'emblema-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Altamira, Valle de Uco',
        altitud:      '1.100 msnm',
        cosecha:      2021,
        imagen:       'http://bodegacicchitti.com/wp-content/uploads/2023/07/emblema_malbec.webp',
        descripcion:  'Violeta intenso, ciruelas maduras, chocolate. Gran vino insignia elaborado con tradición familiar.',
        tagline:      '«Gran vino insignia, elaborado con tradición familiar.»',
      }
    ]
  },
  {
    slug:        'edicion-limitada',
    nombre:      'Edición Limitada',
    descripcion: 'Producción restringida de los varietales más expresivos de nuestra bodega. Cada botella es una promesa de calidad sin compromisos.',
    etiqueta:    null,
    orden:       2,
    vinos: [
      {
        slug:         'edicion-limitada-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Valle de Uco, Tupungato y Maipú',
        altitud:      null,
        cosecha:      2021,
        imagen:       'https://bodegacicchitti.com/wp-content/uploads/2023/07/ED-LIMITADA-MALBEC-CICCHITTI.png',
        descripcion:  'Color rojo profundo, concentrado y elegante. Frutos rojos maduros con notas especiadas.',
        tagline:      '«Producción limitada, calidad sin compromisos.»',
      },
      {
        slug:         'edicion-limitada-cabernet-sauvignon',
        varietal:     'Cabernet Sauvignon',
        varietal_full:'100% Cabernet Sauvignon',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2021,
        imagen:       null,
        descripcion:  'Intenso y estructurado, con notas de cassis, tabaco y cedro.',
        tagline:      '«Expresión pura del Cabernet Sauvignon mendocino.»',
      }
    ]
  },
  {
    slug:        'gran-reserva',
    nombre:      'Gran Reserva',
    descripcion: 'Vinos de guarda elaborados con uvas de alta gama y crianza en barrica de roble. Complejos, estructurados y pensados para el tiempo.',
    etiqueta:    null,
    orden:       3,
    vinos: [
      {
        slug:         'gran-reserva-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Valle de Uco',
        altitud:      null,
        cosecha:      2020,
        imagen:       'https://bodegacicchitti.com/wp-content/uploads/2023/07/GRAN-RES-MALBEC-CICCHITTI.png',
        descripcion:  'Frutos rojos maduros, canela y chocolate. Largo y persistente.',
        tagline:      '«Tradición y terroir en cada copa.»',
      }
    ]
  },
  {
    slug:        'blend',
    nombre:      'Blend',
    descripcion: 'El arte del ensamble. Varietales que se complementan para crear algo mayor que la suma de sus partes. Complejidad, equilibrio y carácter.',
    etiqueta:    null,
    orden:       4,
    vinos: [
      {
        slug:         'blend-cabernet-franc-cabernet-sauvignon',
        varietal:     'Cab. Franc & Cab. Sauvignon',
        varietal_full:'Cabernet Franc · Cabernet Sauvignon',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2021,
        imagen:       'https://bodegacicchitti.com/wp-content/uploads/2023/07/BLEND-CFCS-CICCHITTI.png',
        descripcion:  'Elegante ensamble de dos varietales bordeleses. Especiado, mineral y de gran complejidad.',
        tagline:      '«Dos varietales, una sola expresión.»',
      },
      {
        slug:         'blend-malbec-cabernet-sauvignon-merlot',
        varietal:     'Malbec, Cab. Sauv. & Merlot',
        varietal_full:'Malbec · Cabernet Sauvignon · Merlot',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2021,
        imagen:       null,
        descripcion:  'Ensamble clásico mendocino de gran cuerpo y equilibrio.',
        tagline:      '«El alma de Mendoza en una botella.»',
      },
      {
        slug:         'blend-superterra',
        varietal:     'Superterra',
        varietal_full:'Blend Superterra',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2021,
        imagen:       null,
        descripcion:  'Nuestro blend premium. Complejo, profundo y memorable.',
        tagline:      '«Nuestra tierra, nuestra identidad.»',
      }
    ]
  },
  {
    slug:        'coleccion',
    nombre:      'Colección',
    descripcion: 'Una amplia gama de varietales que expresa la diversidad del terruño mendocino. Para cada paladar, una expresión auténtica.',
    etiqueta:    null,
    orden:       5,
    vinos: [
      {
        slug:         'coleccion-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Frutos rojos, violetas y especias. Fresco y accesible.',
        tagline:      null,
      },
      {
        slug:         'coleccion-cabernet-sauvignon',
        varietal:     'Cabernet Sauvignon',
        varietal_full:'100% Cabernet Sauvignon',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Cassis, pimiento verde y taninos firmes.',
        tagline:      null,
      },
      {
        slug:         'coleccion-sangiovese',
        varietal:     'Sangiovese',
        varietal_full:'100% Sangiovese',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Cereza, hierbas mediterráneas y acidez vibrante.',
        tagline:      null,
      },
      {
        slug:         'coleccion-merlot',
        varietal:     'Merlot',
        varietal_full:'100% Merlot',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Suave, frutal y de taninos sedosos.',
        tagline:      null,
      },
      {
        slug:         'coleccion-pinot-noir',
        varietal:     'Pinot Noir',
        varietal_full:'100% Pinot Noir',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Frutos rojos delicados, tierra húmeda y final elegante.',
        tagline:      null,
      },
      {
        slug:         'coleccion-chardonnay',
        varietal:     'Chardonnay',
        varietal_full:'100% Chardonnay',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Pera, manzana verde y toques mantecosos.',
        tagline:      null,
      },
      {
        slug:         'coleccion-sauvignon-blanc',
        varietal:     'Sauvignon Blanc',
        varietal_full:'100% Sauvignon Blanc',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Cítricos frescos, hierba y mineralidad vibrante.',
        tagline:      null,
      },
      {
        slug:         'coleccion-blanco-de-malbec',
        varietal:     'Blanco de Malbec',
        varietal_full:'Malbec Vinificado en Blanco',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Floral, frutal y sorprendentemente fresco.',
        tagline:      null,
      },
      {
        slug:         'coleccion-rosado',
        varietal:     'Rosado',
        varietal_full:'Rosado',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Frutillas, frambuesas y acidez refrescante.',
        tagline:      null,
      },
      {
        slug:         'coleccion-nectar',
        varietal:     'Néctar',
        varietal_full:'Néctar',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Dulce natural, equilibrado y de larga persistencia.',
        tagline:      null,
      }
    ]
  },
  {
    slug:        'primmo',
    nombre:      'Primmo',
    descripcion: 'Vinos jóvenes, frescos y accesibles. Perfectos para el día a día, sin sacrificar la identidad de la bodega.',
    etiqueta:    null,
    orden:       6,
    vinos: [
      {
        slug:         'primmo-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       'http://bodegacicchitti.com/wp-content/uploads/2023/07/Recurso-5.webp',
        descripcion:  'Fresco, frutal y de taninos suaves. Ideal para cualquier ocasión.',
        tagline:      null,
      },
      {
        slug:         'primmo-cabernet-sauvignon',
        varietal:     'Cabernet Sauvignon',
        varietal_full:'100% Cabernet Sauvignon',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'Directo y frutado, con taninos amigables.',
        tagline:      null,
      }
    ]
  },
  {
    slug:        'esteoeste',
    nombre:      'EsteOeste',
    descripcion: 'Donde el este y el oeste de Mendoza se encuentran en una sola botella. La fusión de dos terruños, dos expresiones, una identidad.',
    etiqueta:    null,
    orden:       7,
    vinos: [
      {
        slug:         'esteoeste-malbec',
        varietal:     'Malbec',
        varietal_full:'100% Malbec',
        vinedo:       'Mendoza',
        altitud:      null,
        cosecha:      2023,
        imagen:       null,
        descripcion:  'La fusión de dos terruños mendocinos en un solo vino expresivo y genuino.',
        tagline:      null,
      }
    ]
  }
];

/* ══════════════════════════════════════
   ESPUMANTES — SOIGNÉ (línea separada)
══════════════════════════════════════ */
const SOIGNE_LINE = {
  slug:        'soigne',
  nombre:      'Soigné',
  descripcion: 'Elaborados con el método champenoise, los espumantes Soigné son una celebración de la pasión, la tradición y el arte de la vinificación.',
  etiqueta:    'Espumantes',
  vinos: [
    {
      slug:         'soigne-pinot-noir',
      varietal:     'Pinot Noir',
      varietal_full:'100% Pinot Noir',
      metodo:       'Champenoise',
      millesime:    '2020',
      vinedo:       'Mendoza',
      imagen:       'http://bodegacicchitti.com/wp-content/uploads/2023/07/espuante_pinot.webp',
      descripcion:  'Burbuja fina y persistente. Frutos rojos frescos, levadura y brioche.',
      tagline:      '«La elegancia del Pinot Noir en cada burbuja.»',
    },
    {
      slug:         'soigne-chardonnay',
      varietal:     'Chardonnay',
      varietal_full:'100% Chardonnay',
      metodo:       'Champenoise',
      millesime:    '2020',
      vinedo:       'Mendoza',
      imagen:       'http://bodegacicchitti.com/wp-content/uploads/2023/08/espuante_chardonnay.webp',
      descripcion:  'Elegante y fresco. Manzana verde, cítricos y tostados delicados.',
      tagline:      '«Frescura y elegancia en cada sorbo.»',
    }
  ]
};

/* ══════════════════════════════════════
   HELPERS — API pública
   Al migrar a Sanity, estos helpers se
   reemplazarán por llamadas a la API.
══════════════════════════════════════ */

/**
 * Retorna todas las líneas de vino.
 * Sanity: client.fetch(`*[_type == "wineRange"] | order(orden asc)`)
 */
function getAllLines() {
  return [...WINE_LINES];
}

/**
 * Retorna una línea por su slug.
 * Sanity: client.fetch(`*[_type == "wineRange" && slug.current == $slug][0]`, { slug })
 */
function getLineBySlug(slug) {
  return WINE_LINES.find(l => l.slug === slug) || null;
}

/**
 * Retorna un vino individual por su slug, buscando en todas las líneas.
 * Sanity: client.fetch(`*[_type == "wine" && slug.current == $slug][0]{ ..., linea-> }`, { slug })
 */
function getWineBySlug(slug) {
  for (const line of WINE_LINES) {
    const wine = line.vinos.find(v => v.slug === slug);
    if (wine) return { ...wine, linea: line };
  }
  const soigneWine = SOIGNE_LINE.vinos.find(v => v.slug === slug);
  if (soigneWine) return { ...soigneWine, linea: SOIGNE_LINE };
  return null;
}

/**
 * Retorna todas las líneas excepto la indicada (para sección "Otras líneas").
 */
function getOtherLines(excludeSlug) {
  return WINE_LINES.filter(l => l.slug !== excludeSlug);
}

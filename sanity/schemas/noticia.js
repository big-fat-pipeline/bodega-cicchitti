export default {
  name: 'noticia',
  title: 'Noticia',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: Rule => Rule.required()
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Novedades', value: 'Novedades' },
          { title: 'Premios',   value: 'Premios'   },
          { title: 'Eventos',   value: 'Eventos'   },
          { title: 'Bodega',    value: 'Bodega'    }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'imagen',
      title: 'Imagen destacada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descripción de la imagen para accesibilidad y SEO'
        }
      ]
    },
    {
      name: 'bajada',
      title: 'Bajada / resumen',
      type: 'text',
      rows: 3,
      description: 'Texto corto que aparece en las tarjetas de noticias (100-200 caracteres)',
      validation: Rule => Rule.required().max(250)
    },
    {
      name: 'cuerpo',
      title: 'Cuerpo del artículo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Párrafo',      value: 'normal'     },
            { title: 'Título H2',    value: 'h2'         },
            { title: 'Título H3',    value: 'h3'         },
            { title: 'Cita',         value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Negrita',  value: 'strong' },
              { title: 'Cursiva', value: 'em'     }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href',  type: 'url',     title: 'URL'   },
                  { name: 'blank', type: 'boolean', title: 'Abrir en nueva pestaña' }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo' }
          ]
        }
      ]
    },
    {
      name: 'autor',
      title: 'Autor',
      type: 'string',
      initialValue: 'Bodega Cicchitti'
    }
  ],
  orderings: [
    {
      title: 'Fecha (reciente primero)',
      name: 'fechaDesc',
      by: [{ field: 'fecha', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title:    'titulo',
      subtitle: 'fecha',
      media:    'imagen'
    }
  }
}

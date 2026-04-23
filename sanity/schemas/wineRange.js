export default {
  name: 'wineRange',
  title: 'Línea de Vinos',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre de la línea',
      type: 'string',
      description: 'Ej: Emblema, Colección, Gran Reserva',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nombre', maxLength: 96 },
      description: 'Se genera automáticamente. Ej: gran-reserva',
      validation: Rule => Rule.required()
    },
    {
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número de orden en el catálogo. 1 = primera',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'etiqueta',
      title: 'Etiqueta / badge',
      type: 'string',
      description: 'Texto opcional sobre la tarjeta. Ej: Insignia, Espumantes'
    },
    {
      name: 'heroImg',
      title: 'Imagen hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen de fondo para la página de la línea (opcional)'
    },
    {
      name: 'vinos',
      title: 'Vinos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'wine' }] }],
      description: 'Arrastrá para reordenar'
    }
  ],
  orderings: [
    {
      title: 'Orden de aparición',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'descripcion',
      media: 'heroImg'
    }
  }
}

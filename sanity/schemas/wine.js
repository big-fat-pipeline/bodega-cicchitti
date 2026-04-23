export default {
  name: 'wine',
  title: 'Vino',
  type: 'document',
  fields: [
    {
      name: 'varietal',
      title: 'Varietal',
      type: 'string',
      description: 'Ej: Malbec, Cabernet Sauvignon, Blend Superterra',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'varietal', maxLength: 96 },
      description: 'Se genera automáticamente. Ej: emblema-malbec',
      validation: Rule => Rule.required()
    },
    {
      name: 'varietal_full',
      title: 'Varietal completo',
      type: 'string',
      description: 'Ej: 100% Malbec, Cabernet Franc · Cabernet Sauvignon'
    },
    {
      name: 'vinedo',
      title: 'Viñedo / procedencia',
      type: 'string',
      description: 'Ej: Altamira, Valle de Uco'
    },
    {
      name: 'cosecha',
      title: 'Cosecha (año)',
      type: 'number',
      description: 'Año de vendimia. Ej: 2021'
    },
    {
      name: 'imagen',
      title: 'Imagen de botella',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'premios',
      title: 'Premios / cucardas',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Imágenes de medallas o cucardas obtenidas'
    },
    {
      name: 'descripcion',
      title: 'Descripción / notas de cata',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Frase corta entre comillas. Ej: «Gran vino insignia…»'
    },
    {
      name: 'metodo',
      title: 'Método de elaboración (espumantes)',
      type: 'string',
      description: 'Solo para espumantes. Ej: Champenoise'
    },
    {
      name: 'millesime',
      title: 'Millesime (espumantes)',
      type: 'string',
      description: 'Solo para espumantes. Ej: 2020'
    }
  ],
  preview: {
    select: { title: 'varietal', media: 'imagen' }
  }
}

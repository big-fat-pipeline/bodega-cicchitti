export default {
  name: 'homeConfig',
  title: 'Configuración del Home',
  type: 'document',
  fields: [
    {
      name: 'lineasDestacadas',
      title: 'Líneas destacadas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'wineRange' }] }],
      description: 'Hasta 3 líneas que aparecen en la home. Arrastrá para reordenar.',
      validation: Rule => Rule.max(3)
    },
    {
      name: 'noticiasDestacadas',
      title: 'Noticias destacadas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'noticia' }] }],
      description: 'Noticias que aparecen en la home. Arrastrá para reordenar.'
    }
  ]
}

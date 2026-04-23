import { defineConfig } from 'sanity'
import { deskTool }    from 'sanity/desk'
import { visionTool }  from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name:    'bodega-cicchitti',
  title:   'Bodega Cicchitti — CMS',

  projectId: 'w8bmd1rz',
  dataset:   'production',

  plugins: [
    deskTool({
      structure: S =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Líneas de Vino')
              .schemaType('wineRange')
              .child(S.documentTypeList('wineRange').title('Líneas de Vino')),
            S.listItem()
              .title('Vinos')
              .schemaType('wine')
              .child(S.documentTypeList('wine').title('Vinos')),
            S.divider(),
            S.listItem()
              .title('Noticias')
              .schemaType('noticia')
              .child(S.documentTypeList('noticia').title('Noticias'))
          ])
    }),
    visionTool()   /* Explorador GROQ en el studio */
  ],

  schema: { types: schemaTypes }
})

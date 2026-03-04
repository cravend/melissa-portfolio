import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const configuredTypes = [
  'post',
  'resource',
  'book',
  'siteSettings',
  'travelPage',
  'fulbrightPage',
  'kidsCornerPage',
  'authorPage',
  'contactPage',
]

export default defineConfig({
  name: 'melissa-craven-portfolio',
  title: "Melissa's Portfolio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) => {
        const pageDoc = (type: string, id: string) =>
          S.document().schemaType(type).documentId(id)

        const siteAndPages = S.listItem()
          .title('Site & Pages')
          .id('siteAndPages')
          .child(
            S.list()
              .title('Site & Pages')
              .items([
                S.listItem()
                  .title('Site Settings')
                  .id('siteSettingsSingleton')
                  .child(
                    S.document()
                      .schemaType('siteSettings')
                      .documentId('siteSettings'),
                  ),
                S.divider(),
                S.listItem()
                  .title('Travel Page')
                  .id('travelPage')
                  .child(pageDoc('travelPage', 'travelPage')),
                S.listItem()
                  .title('Fulbright Page')
                  .id('fulbrightPage')
                  .child(pageDoc('fulbrightPage', 'fulbrightPage')),
                S.listItem()
                  .title("Kids' Corner Page")
                  .id('kidsCornerPage')
                  .child(pageDoc('kidsCornerPage', 'kidsCornerPage')),
                S.listItem()
                  .title('Author Page')
                  .id('authorPage')
                  .child(pageDoc('authorPage', 'authorPage')),
                S.listItem()
                  .title('Contact Page')
                  .id('contactPage')
                  .child(pageDoc('contactPage', 'contactPage')),
              ]),
          )

        const content = S.listItem()
          .title('Content')
          .id('content')
          .child(
            S.list()
              .title('Content')
              .items([
                S.listItem()
                  .title('Travel Posts')
                  .child(
                    S.documentList()
                      .title('Travel Posts')
                      .schemaType('post')
                      .filter('_type == "post" && category == $category')
                      .params({ category: 'travel' })
                      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                  ),
                S.listItem()
                  .title('Fulbright Posts')
                  .child(
                    S.documentList()
                      .title('Fulbright Posts')
                      .schemaType('post')
                      .filter('_type == "post" && category == $category')
                      .params({ category: 'fulbright' })
                      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                  ),
                S.listItem()
                  .title("Kids' Corner / Polls")
                  .child(
                    S.documentList()
                      .title("Kids' Corner / Polls")
                      .schemaType('post')
                      .filter('_type == "post" && category == $category')
                      .params({ category: 'kids-corner/polls' })
                      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                  ),
                S.listItem()
                  .title("Kids' Corner / Tours")
                  .child(
                    S.documentList()
                      .title("Kids' Corner / Tours")
                      .schemaType('post')
                      .filter('_type == "post" && category == $category')
                      .params({ category: 'kids-corner/tours' })
                      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                  ),
                S.listItem()
                  .title('Author Posts')
                  .child(
                    S.documentList()
                      .title('Author Posts')
                      .schemaType('post')
                      .filter('_type == "post" && category == $category')
                      .params({ category: 'author' })
                      .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                  ),
                S.divider(),
                S.documentTypeListItem('resource').title('Resources'),
                S.divider(),
                S.documentTypeListItem('book').title('Books'),
              ]),
          )

        return S.list()
          .title('Content')
          .items([
            siteAndPages,
            content,
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !configuredTypes.includes(listItem.getId() || ''),
            ),
          ])
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

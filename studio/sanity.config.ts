import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const configuredTypes = ['post', 'resource', 'tour', 'poll', 'book', 'siteSettings']

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettingsSingleton')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Travel')
              .id('travelContent')
              .child(
                S.documentList()
                  .title('Travel Posts')
                  .schemaType('post')
                  .filter('_type == "post" && category == $category')
                  .params({ category: 'travel' }),
              ),
            S.listItem()
              .title('Fulbright')
              .id('fulbrightContent')
              .child(
                S.list()
                  .title('Fulbright')
                  .items([
                    S.listItem()
                      .title('Fulbright Posts')
                      .child(
                        S.documentList()
                          .title('Fulbright Posts')
                          .schemaType('post')
                          .filter('_type == "post" && category == $category')
                          .params({ category: 'fulbright' }),
                      ),
                    S.listItem()
                      .title('Resources')
                      .child(
                        S.list()
                          .title('Resources')
                          .items([
                            S.listItem()
                              .title('Fulbright Prep Resources')
                              .child(
                                S.documentList()
                                  .title('Fulbright Prep Resources')
                                  .schemaType('resource')
                                  .filter('_type == "resource" && category == $category')
                                  .params({ category: 'fulbright-prep' }),
                              ),
                            S.listItem()
                              .title('ESOL Resources')
                              .child(
                                S.documentList()
                                  .title('ESOL Resources')
                                  .schemaType('resource')
                                  .filter('_type == "resource" && category == $category')
                                  .params({ category: 'esol' }),
                              ),
                          ]),
                      ),
                  ]),
              ),
            S.listItem()
              .title("Kids' Corner")
              .id('kidsCornerContent')
              .child(
                S.list()
                  .title("Kids' Corner")
                  .items([
                    S.listItem()
                      .title("Kids' Corner Posts")
                      .child(
                        S.documentList()
                          .title("Kids' Corner Posts")
                          .schemaType('post')
                          .filter('_type == "post" && category == $category')
                          .params({ category: 'kids-corner' }),
                      ),
                    S.documentTypeListItem('tour').title('Tours'),
                    S.documentTypeListItem('poll').title('Polls'),
                  ]),
              ),
            S.listItem()
              .title('Author')
              .id('authorContent')
              .child(
                S.list()
                  .title('Author')
                  .items([
                    S.listItem()
                      .title('Author Posts')
                      .child(
                        S.documentList()
                          .title('Author Posts')
                          .schemaType('post')
                          .filter('_type == "post" && category == $category')
                          .params({ category: 'author' }),
                      ),
                    S.documentTypeListItem('book').title('Books'),
                  ]),
              ),
            S.divider(),
            S.documentTypeListItem('post').title('All Posts'),
            S.documentTypeListItem('resource').title('All Resources'),
            ...S.documentTypeListItems().filter(
              (listItem) => !configuredTypes.includes(listItem.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

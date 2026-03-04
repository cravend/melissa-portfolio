import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

const CONTENT_TYPES = [
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

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'vercel-deploy',
      event: {
        on: ['create', 'update', 'delete'],
        filter: CONTENT_TYPES.map((t) => `_type == "${t}"`).join(' || '),
        projection: '{_id, _type}',
      },
    }),
  ],
})
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'I am happy to connect about travel writing, Fulbright and ESOL resources, or author events.',
    }),
    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      of: [
        defineField({
          name: 'contactLink',
          title: 'Contact Link',
          type: 'object', preview: {
            select: {
              label: 'label',
              url: 'url',
            },
            prepare(selection) {
              const { label, url } = selection
              return {
                title: label,
                subtitle: url,
              }
            }
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              }),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})

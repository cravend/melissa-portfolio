import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'poll',
  title: 'Poll',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Current poll',
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      validation: (Rule) => Rule.min(2),
      of: [
        defineField({
          name: 'option',
          title: 'Option',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              initialValue: 'Unnamed option',
            }),
            defineField({
              name: 'votes',
              title: 'Votes',
              type: 'number',
              initialValue: 0,
              validation: (Rule) => Rule.min(0),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'resultsDisplay',
      title: 'Results Display',
      type: 'string',
      initialValue: 'afterVote',
      options: {
        list: [
          { title: 'Always', value: 'always' },
          { title: 'After vote', value: 'afterVote' },
          { title: 'Hidden', value: 'hidden' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'question',
      active: 'active',
    },
    prepare(selection) {
      const { title, active } = selection
      return {
        title,
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  },
})

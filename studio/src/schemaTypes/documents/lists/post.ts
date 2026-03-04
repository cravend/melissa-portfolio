import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Untitled post',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Travel', value: 'travel' },
          { title: 'Fulbright', value: 'fulbright' },
          { title: "Kids' Corner / Polls", value: 'kids-corner/polls' },
          { title: "Kids' Corner / Tours", value: 'kids-corner/tours' },
          { title: 'Author', value: 'author' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Post image',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const { category, publishedAt } = selection
      const categoryLabels: Record<string, string> = {
        travel: 'Travel',
        fulbright: 'Fulbright',
        'kids-corner/polls': "Kids' Corner / Polls",
        'kids-corner/tours': "Kids' Corner / Tours",
        author: 'Author',
      }
      const categoryLabel = categoryLabels[category] ?? 'Uncategorized'
      const dateLabel = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'

      return { ...selection, subtitle: `${categoryLabel} · ${dateLabel}` }
    },
  },
})

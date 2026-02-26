import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Melissa Craven',
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'Displayed in the header brand link.',
      initialValue: 'Melissa Craven',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Displayed in the site footer.',
      initialValue: '© 2026 Melissa Craven',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      initialValue:
        "Melissa Craven shares travel writing, Fulbright teaching resources, stories for kids, and updates about her author work.",
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          initialValue: 'Site headshot',
        }),
      ],
    }),
    defineField({
      name: 'home',
      title: 'Home Page',
      type: 'object',
      initialValue: {
        travelDescription: "Stories, reflections, and updates from Melissa's travels.",
        fulbrightDescription:
          "Updates from Fulbright work, plus resources and ESOL teaching tools.",
        kidsDescription:
          "Activities, polls, and educational tours designed for young learners.",
        authorDescription:
          "Book news, release updates, and writing-related announcements.",
        contactDescription:
          "Reach out for collaborations, classroom connections, or speaking.",
      },
      fields: [
        defineField({ name: 'travelDescription', title: 'Travel Description', type: 'text', rows: 3 }),
        defineField({
          name: 'fulbrightDescription',
          title: 'Fulbright Description',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'kidsDescription', title: "Kids' Corner Description", type: 'text', rows: 3 }),
        defineField({ name: 'authorDescription', title: 'Author Description', type: 'text', rows: 3 }),
        defineField({ name: 'contactDescription', title: 'Contact Description', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
      }
    },
  },
})

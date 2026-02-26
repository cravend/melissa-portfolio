import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kidsCornerPage',
  title: "Kids' Corner Page",
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore weekly questions, classroom-friendly polls, and student tours.',
    }),
    defineField({
      name: 'pollsSectionDescription',
      title: 'Polls Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Share your answer and compare ideas with other kids.',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Kids' Corner Page" }),
  },
})

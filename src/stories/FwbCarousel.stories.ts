import type { Meta, StoryObj } from '@storybook/vue3'
import FwbCarousel from '@/components/FwbCarousel/FwbCarousel.vue'

const meta = {
  title: 'Example/FwbCarousel',
  component: FwbCarousel,
  tags: ['autodocs'],
  argTypes: {
    pictures: {
      control: 'object',
      description: 'Array of picture objects'
    }
  },
  args: {
    pictures: [
      {
        alt: 'Picture 1',
        src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg'
      },
      {
        alt: 'Picture 2',
        src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg'
      },
      {
        alt: 'Picture 3',
        src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg'
      }
    ]
  }
} satisfies Meta<typeof FwbCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { FwbCarousel },
    setup() {
      return { args }
    },
    template: '<FwbCarousel v-bind="args" />'
  })
}

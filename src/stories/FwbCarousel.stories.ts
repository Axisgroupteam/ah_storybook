import type { Meta, StoryObj } from '@storybook/vue3'
import FwbCarousel from '@/components/FwbCarousel/FwbCarousel.vue'

/**
 * Use the carousel component to slide through multiple elements and images using custom controls, indicators, intervals, and options.
 *
 * The carousel component can be used to cycle through a set of elements using custom options, controls, and indicators.
 */
const meta = {
  title: 'Example/CarouselX',
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

/**
 * The component can be initialized with many items as you want, with left and right navigation button controls you can trigger slide event on each direction, and indicator dots shows the position of the slider element. Reset, zoom, and rotate buttons complement content display.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbCarousel },
    setup() {
      return { args }
    },
    template: `<FwbCarousel v-bind="args" />`
  })
}

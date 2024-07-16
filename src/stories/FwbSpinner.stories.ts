import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbSpinner from '@/components/FwbSpinner/FwbSpinner.vue'

/**
 * Use the spinner component as a loader indicator in your projects when fetching data based on an animated SVG.
 *
 * The spinner component can be used as a loading indicator which comes in multiple colors, sizes, and styles separately or inside elements such as buttons to improve the user experience whenever data is being fetched from your server.
 */
const meta = {
  title: 'Example/SpinnerX',
  component: FwbSpinner,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbSpinner>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use the following SVG element to show a loading animation.
 */
export const Default: Story = {
  args: {}
}

/**
 * This example can be used to change the size of the spinner component.
 */
export const Size: Story = {
  render: (args) => ({
    components: { FwbSpinner },
    setup() {
      return { args }
    },
    template: `
        <div class="flex justify-center items-center gap-4">
            <FwbSpinner />
            <FwbSpinner size="6" />
            <FwbSpinner size="8" />
            <FwbSpinner size="10" />
            <FwbSpinner size="12" />
        </div>              
        `
  }),
  args: {}
}

/**
 * This example can be used to change the colors of the spinner element.
 */
export const Colors: Story = {
  render: (args) => ({
    components: { FwbSpinner },
    setup() {
      return { args }
    },
    template: `
        <div class="flex justify-center items-center gap-4">
            <FwbSpinner color="white" />            
            <FwbSpinner color="blue" />
            <FwbSpinner color="gray" />
            <FwbSpinner color="green" />
            <FwbSpinner color="pink" />
            <FwbSpinner color="purple" />
            <FwbSpinner color="red" />
            <FwbSpinner color="yellow" />
        </div>              
        `
  }),
  args: {}
}

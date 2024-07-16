import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbRange from '@/components/FwbRange/FwbRange.vue'

/**
 * Get started with the range component to receive a number from the user anywhere from 1 to 100 by sliding form control horizontally.
 *
 *The range component can be used as an input field to get a number from the user based on your custom selection (ie. from 1 to 100) by using a sliding animation.
 */
const meta = {
  title: 'Example/RangeX',
  component: FwbRange,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbRange>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Get started with this default example with values from 1 to 100 and the default value of 50.
 */
export const Default: Story = {
  args: {}
}

/**
 * Use this example if you want to apply the required state to a range component.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this example if you want to apply the disabled state to a range component.
 */
export const Required: Story = {
  args: {
    required: true
  }
}

/**
 * Use the following example to apply a small size for the range component.
 */
export const Small: Story = {
  args: {
    size: 'sm'
  }
}

/**
 * Use the following example to apply a large size for the range component.
 */
export const Large: Story = {
  args: {
    size: 'lg'
  }
}

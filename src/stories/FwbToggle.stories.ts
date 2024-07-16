import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbToggle from '@/components/FwbToggle/FwbToggle.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the toggle component to switch between a binary state of true or false using a single click.
 *
 * The toggle component can be used to receive a simple “yes” or “no” type of answer from the user by choosing a single option from two options.
 */
const meta = {
  title: 'Example/ToggleX',
  component: FwbToggle,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {
    label: { control: 'text' },
    customClass: { table: { disabled: false } }
    //disabled: { control: 'boolean' },
  },
  args: {}
} satisfies Meta<typeof FwbToggle>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Get started with the default toggle component example as a checkbox element to receive a true or false selection from the user.
 */
export const Default: Story = {
  args: {}
}

/**
 * This example can be used for the disabled state of the toggle component.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this variant of a toggle item with a custom background color to contrast in a specific case.
 */
export const Custom: Story = {
  render: (args) => ({
    components: { FwbToggle },
    setup() {
      return { args }
    },
    template: `
      <FwbToggle v-bind="args" />                      
    `
  }),
  args: {
    customClass: 'bg-neutral-500 dark:bg-neutral-800'
  }
}

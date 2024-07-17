import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbCheckbox from '@/components/FwbCheckbox/FwbCheckbox.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Get started with the checkbox component to allow the user to select one or more options in the form of a square box.
 *
 * The checkbox component can be used to receive one or more selected options from the user in the form of a square box.
 */
const meta = {
  title: 'Example/CheckboxX',
  component: FwbCheckbox,
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
} satisfies Meta<typeof FwbCheckbox>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
/**
 * Use this variant of a checkbox element in a checked and unchecked state.
 */
export const Default: Story = {
  args: {}
}

/**
 * This example can be used for the disabled state of the checkbox component.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this variant of a checkbox item with a custom background color to contrast in an specific case.
 */
export const CustomBackgroundColor: Story = {
  render: (args) => ({
    components: { FwbCheckbox },
    setup() {
      return { args }
    },
    template: `
      <FwbCheckbox v-bind="args" />                      
    `
  }),
  args: {
    customClass: 'bg-neutral-500 dark:bg-neutral-800'
  }
}

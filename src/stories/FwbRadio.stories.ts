import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbRadio from '@/components/FwbRadio/FwbRadio.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Get started with the radio component to let the user choose a single option from multiple options in the form of a circle.
 *
 * The radio component can be used to allow the user to choose a single option from one or more available options.
 */
const meta = {
  title: 'Example/RadioX',
  component: FwbRadio,
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
    customClass: { table: { disabled: false } },
    checked: { table: { disabled: false } }
  },
  args: {}
} satisfies Meta<typeof FwbRadio>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
/**
 * Use the default example of a radio component with the checked and unchecked state.
 */
export const Default: Story = {
  args: {}
}

export const Dual: Story = {
  render: (args) => ({
    components: { FwbRadio },
    setup() {
      return { args }
    },
    template: `
      <div>
        <FwbRadio class="mb-2" label="Option 1" v-bind="args" />
        <FwbRadio label="Option 2" v-bind="args" />
      </div>
    `
  }),
  args: {
  }
}

/**
 * This example can be used for the disabled state of the radio component.
 */
/* export const Disabled: Story = {
  args: {
    disabled: true,
    value: false,
  }
} */

/* export const Checked: Story = {
  args: {
    chequed: false,
  }
} */

/**
 * Use this variant of a radio item with a custom background color to contrast in an specific case.
 */
/* export const Custom: Story = {
  render: (args) => ({
    components: { FwbRadio },
    setup() {
      return { args }
    },
    template: `
      <FwbRadio v-bind="args" />                      
    `
  }),
  args: {
    customClass: 'bg-neutral-500 dark:bg-neutral-800',
    value: false
  }
} */

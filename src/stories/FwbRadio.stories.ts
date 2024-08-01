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
  args: { modelValue: 'option1', label: 'Label' }
}

export const Dual2: Story = {
  render: (args) => ({
    components: { FwbRadio },
    setup() {
      return { args }
    },
    template: `
      <div>
        <FwbRadio class="mb-2" label="Label" v-bind="args" model-value="option1" />
        <FwbRadio class="mb-2" label="Label" v-bind="args" model-value="option2" />
        <FwbRadio :disabled="true" label="Label" v-bind="args" model-value="option3" />
      </div>
    `
  })
}
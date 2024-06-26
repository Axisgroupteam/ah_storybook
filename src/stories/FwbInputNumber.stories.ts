import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbInput from '@/components/FwbInput/FwbInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbInputNumber',
  component: FwbInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['normal', 'error'] },
    type: { table: { disable: true } },
    modelValue: { table: { disable: true } }
  },
  args: {
    label: 'Text'
  }
} satisfies Meta<typeof FwbInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {
    type: 'number'
  }
}

export const Disabled: Story = {
  args: {
    type: 'number',
    disabled: true
  }
}

export const Required: Story = {
  args: {
    type: 'number',
    required: true
  }
}

export const Medium: Story = {
  args: {
    size: 'md',
    type: 'number'
  }
}

export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      return { args }
    },
    template: `
      <FwbInput v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbInput>
    `
  }),
  args: {
    type: 'number',
    validationStatus: 'error'
  }
}

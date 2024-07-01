import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbTextarea from '@/components/FwbTextarea/FwbTextarea.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbTextarea',
  component: FwbTextarea,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    validationStatus: { control: 'radio', options: ['normal', 'error'] }
  },
  args: {}
} satisfies Meta<typeof FwbTextarea>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Required: Story = {
  args: {
    required: true
  }
}

export const Readonly: Story = {
  args: {
    readonly: true
  }
}

export const Large: Story = {
  args: {
    rows: 10
  }
}

export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbTextarea },
    setup() {
      return { args }
    },
    template: `
      <FwbTextarea v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbTextarea>
    `
  }),
  args: {
    validationStatus: 'error'
  }
}
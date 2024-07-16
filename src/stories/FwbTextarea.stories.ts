import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbTextarea from '@/components/FwbTextarea/FwbTextarea.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the textarea component as a multi-line text field input and use it inside form elements.
 *
 * The textarea component is a multi-line text field input that can be used to receive longer chunks of text from the user in the form of a comment box, description field, and more.
 */
const meta = {
  title: 'Example/TextareaX',
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

/**
 * Use this example to create a default textarea component.
 */
export const Default: Story = {
  args: {}
}

/**
 * Use this example if you want to apply the disabled state to a textarea.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this example if you want to apply the required state to a textarea.
 */
export const Required: Story = {
  args: {
    required: true
  }
}

/**
 * Use this example if you want to apply the readonly state to a textarea.
 */
export const Readonly: Story = {
  args: {
    readonly: true
  }
}

/**
 * Use the following example to apply a large size for the textarea.
 */
export const Large: Story = {
  args: {
    rows: 10
  }
}

/**
 * Use the following example to apply validation styles for an error case.
 */
export const Error: Story = {
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

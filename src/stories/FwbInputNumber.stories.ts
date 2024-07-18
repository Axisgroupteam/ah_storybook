import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbInput from '@/components/FwbInput/FwbInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the number input component to set a numeric value inside a form field.
 *
 * The number input component can be used to introduce numeric values inside a form such as for a quantity field.
 */
const meta = {
  title: 'Example/InputNumberX',
  component: FwbInput,
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

/**
 * Use this component to set a number value inside a form field.
 */
export const Default: Story = {
  args: {
    type: 'number'
  }
}

/**
 * Use this example if you want to apply the disabled state to an input number.
 */
export const Disabled: Story = {
  args: {
    type: 'number',
    disabled: true
  }
}

/**
 * Use this example if you want to apply the required state to an input number.
 */
export const Required: Story = {
  args: {
    type: 'number',
    required: true
  }
}

/**
 * Use the following example to apply a medium size for the input number.
 */
export const Medium: Story = {
  args: {
    size: 'md',
    type: 'number'
  }
}

/**
 * Use the following example to apply validation styles for an error case.
 */
export const Error: Story = {
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

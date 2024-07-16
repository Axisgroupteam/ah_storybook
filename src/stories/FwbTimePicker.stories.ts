import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbTimePicker from '@/components/TimePicker/TimePicker.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbTimePicker',
  component: FwbTimePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['normal', 'error'] },  
    modelValue: { table: { disable: true } }
  },
  args: {
    label: 'Text'
  }
} satisfies Meta<typeof FwbTimePicker>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  render: (args) => ({
    components: { FwbTimePicker },
    setup() {
      return { args }
    },
    template: `
      <FwbTimePicker v-bind="args">            
      </FwbTimePicker>
    `
  }),
  args: {
    label: "Time",
    size: 'sm',
    validationStatus: ''
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Required: Story = {
  args: {
    label: "Time",
    size: 'sm',
    required: true
  }
}


export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbTimePicker },
    setup() {
      return { args }
    },
    template: `
      <FwbTimePicker v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbTimePicker>
    `
  }),
  args: {
    label: "Time",
    size: 'sm',
    validationStatus: 'error'
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/TimePickerX',
  component: TimePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    validationStatus: { control: 'select', options: ['error', 'success', ''] }
  },
  decorators: [
    () => ({
      template: `
      <div class="p-4 h-[300px]">
    
        <story />
      
      </div>`
    })
  ],
  args: {}
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

 export const Normal: Story = {
  render: (args: any) => ({
    components: { TimePicker },
    setup() {
      return { args }
    },
    template: `
      <TimePicker v-bind="args">            
      </TimePicker>
    `
  }),
  args: {
    label: "Time",
    size: 'sm',
    modelValue: "",
    validationStatus: ''
  }
}

export const Disabled: Story = {
  args: {
    label: "Time",
    size: 'sm',
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
  render: (args: any) => ({
    components: { TimePicker },
    setup() {
      return { args }
    },
    template: `
      <TimePicker v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </TimePicker>
    `
  }),
  args: {
    label: "Time",
    size: 'sm',
    validationStatus: 'error'
  }
}
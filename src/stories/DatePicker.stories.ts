import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/DatePicker',
  component: DatePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },   
    validationStatus: { control: 'select', options: ['error', 'success', ''] }, 
  },
  args: {}
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const DefaultDatePicker: Story = { 
  render: (args) => ({
    components: { DatePicker },
    setup() {
      return { args }
    },
    template: `
      <DatePicker v-bind="args"> 
      <template #validationMessage>
        <span>{{args.errorMessage}}</span>
        </template>  
      </DatePicker>
    `
  }),
  args: {
    id:"defaultDatePicker",
    size: 'md',
    label: 'Date',
    required: false,
    errorMessage: "",
    validationStatus: '',   
  }
}

export const RequiredDatePicker: Story = { 
  render: (args) => ({
    components: { DatePicker },
    setup() {
      return { args }
    },
    template: `
      <DatePicker v-bind="args"> 
      <template #validationMessage>
        <span>{{args.errorMessage}}</span>
        </template>  
      </DatePicker>
    `
  }),
  args: {
    id:"requiredDatePicker",
    size: 'md',
    label: 'Date',
    required: true,
    errorMessage: "",
    validationStatus: '',   
  }
}

export const DisabledDatePicker: Story = { 
  render: (args) => ({
    components: { DatePicker },
    setup() {
      return { args }
    },
    template: `
      <DatePicker v-bind="args"> 
      <template #validationMessage>
        <span>{{args.errorMessage}}</span>
        </template>  
      </DatePicker>
    `
  }),
  args: {
    id:"disabledDatePicker",
    size: 'md',
    label: 'Date',
    disabled: true,
    required: false,
    errorMessage: "",
    validationStatus: '',   
  }
}

export const ErrorDatePicker: Story = { 
  render: (args) => ({
    components: { DatePicker },
    setup() {
      return { args }
    },
    template: `
      <DatePicker v-bind="args"> 
      <template #validationMessage>
        <span>{{args.errorMessage}}</span>
        </template>  
      </DatePicker>
    `
  }),
  args: {
    id:"errorDatePicker",
    size: 'md',
    label: 'Date',
    disabled: false,
    required: false,
    errorMessage: "This Field is requuired",
    validationStatus: 'error',   
  }
}




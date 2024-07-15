import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Start receiving date data from your users using this datepicker element.
 *
 *The datepicker features a simple picker and a date range picker functionality, also some extra options such as today selection and clear all selections in a fast way.
 */
const meta = {
  title: 'Example/DatePickerX',
  component: DatePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    validationStatus: { control: 'select', options: ['error', 'success', ''] }
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
/**
 * Use this variant to input a single date, clicking on the today button will browse back to the current day/month/year, and clicking on the clear button will reset all selections.
 */
export const Default: Story = {
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
    id: 'defaultDatePicker',
    size: 'md',
    label: 'Date',
    required: false,
    errorMessage: '',
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a mandatory requirement case.
 */
export const Required: Story = {
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
    id: 'requiredDatePicker',
    size: 'md',
    label: 'Date',
    required: true,
    errorMessage: '',
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a disabled component case.
 */
export const Disabled: Story = {
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
    id: 'disabledDatePicker',
    size: 'md',
    label: 'Date',
    disabled: true,
    required: false,
    errorMessage: '',
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a component error case.
 */
export const Error: Story = {
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
    id: 'errorDatePicker',
    size: 'md',
    label: 'Date',
    disabled: false,
    required: false,
    errorMessage: 'This field is required',
    validationStatus: 'error'
  }
}

/**
 * Use this variant of two datepickers to input a date range.
 */
export const RangeDatePicker: Story = {
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
    id: 'requiredDatePicker',
    size: 'md',
    label: 'Date',
    required: false,
    errorMessage: '',
    validationStatus: '',
    typeCalendar: 'range'
  }
}

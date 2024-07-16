import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import { Disabled } from './FwbButton.stories'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the timepicker component from Flowbite to select the time of the day in terms of hours, minutes and even seconds using an input selector.
 *
 * The timepicker component can be used to choose the hours and minutes of a given day through the usage of input fields.
 */
const meta = {
  title: 'Example/TimepickerX',
  component: TimePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    validationStatus: { control: 'select', options: ['error', 'success', ''] }
  },
  args: {}
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Use this variant to input a single time.
 */
export const Default: Story = {
  render: (args) => ({
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
    size: 'md',
    label: 'Time',
    required: true,
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a disabled component case.
 */
export const Disabled: Story = {
  render: (args) => ({
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
    size: 'md',
    label: 'Time',
    required: true,
    disabled: true,
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a component error case.
 */
export const Error: Story = {
  render: (args) => ({
    components: { TimePicker },
    setup() {
      return { args }
    },
    template: `
      <TimePicker v-bind="args">
         <template #validationMessage>
            Error in input Time
          </template>       
      </TimePicker>
    `
  }),
  args: {
    size: 'md',
    label: 'Time',
    required: true,
    validationStatus: 'error'
  }
}

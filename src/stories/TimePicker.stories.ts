import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the timepicker component from Flowbite to select the time of the day in terms of hours, minutes and even seconds using an input selector.
 *
 * The timepicker component can be used to choose the hours and minutes of a given day through the usage of input fields.
 */
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

/**
 * Use this variant to input a single time.
 */
export const Default: Story = {
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
    label: 'Time',
    size: 'sm',
    modelValue: '',
    validationStatus: ''
  }
}

/**
 * Use this contextual variant for a mandatory requirement case.
 */
export const Disabled: Story = {
  args: {
    label: 'Time',
    size: 'sm',
    disabled: true
  }
}

/**
 *  Use this contextual variant for a disabled component case.
 */
export const Required: Story = {
  args: {
    label: 'Time',
    size: 'sm',
    required: true
  }
}

/**
 * Use this contextual variant for a component error case.
 */
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
    label: 'Time',
    size: 'sm',
    validationStatus: 'error'
  }
}

/**
 *  Use this variant of two timepickers to input a time range.
 */
export const Range: Story = {
  render: (args: any) => ({
    components: { TimePicker },
    setup() {
      return { args }
    },
    template: `
      <div class="flex justify-center items-end gap-4">
      <TimePicker v-bind="args" class="w-full" label="Start Time" />        
      <span class="h-full pb-2 text-neutral-500" >to</span>
      <TimePicker v-bind="args" class="w-full" label="End Time" />        
      </div>
      
    `
  }),
  args: {
    size: 'md',
    modelValue: ''
  }
}

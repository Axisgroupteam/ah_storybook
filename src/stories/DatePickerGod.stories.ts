import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import DatePicker from '@/components/DatePickerGod/DatePicker.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Start receiving date data from your users using this datepicker element.
 *
 *The datepicker features a simple picker and a date range picker functionality, also some extra options such as today selection and clear all selections in a fast way.
 */
const meta = {
  title: 'Example/DatePickerGodX',
  component: DatePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4 h-[500px]">
    
        <story />
    
      </div>`
    })
  ],
  argTypes: {},
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

export const Primary: Story = {
  args: {}
}

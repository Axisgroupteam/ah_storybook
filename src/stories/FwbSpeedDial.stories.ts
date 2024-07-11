import type { Meta, StoryObj } from '@storybook/vue3'
import {ref} from 'vue'
import SpeedDial from '@/components/FwbSpeedDial/FwbSpeedDial.vue'
import { boolean, object } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbSpeedDial',
  component: SpeedDial,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    // moduleData: object
  },
  decorators: [
    () => ({
      template: `
      <div class="w-full h-[300px] flex items-center justify-center">
        <story />
      </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof SpeedDial>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // moduleData: [
      
    // ]
  }
}
import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import DefaultAccordion from '@/components/FwbAccordion/DefaultAccordion.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbAccordion',
  component: DefaultAccordion,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {
  }
} satisfies Meta<typeof DefaultAccordion>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

 export const DefaultSlot: Story = { 
  args: {
    groupedObject: [
    "first", "second" 
  ]
  }
}





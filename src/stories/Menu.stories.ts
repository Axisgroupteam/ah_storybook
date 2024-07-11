import type { Meta, StoryObj } from '@storybook/vue3'
import {ref} from 'vue'
import AppLayout from '@/components/menu/temp/layout.vue'
import { boolean, object } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Menu',
  component: AppLayout,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    moduleData: object
  },

  args: {}
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    moduleData: [{
      title: "Module 1",
      icon: "manager_icon" 
    },
    {
      title: "Module 2",
      icon: "manager_icon" 
    },
    {
      title: "Module 3",
      icon: "manager_icon" 
    },

  ]
  }
}

export const OneOption: Story = {
  args: {
    moduleData: [
      
    ]
  }
}
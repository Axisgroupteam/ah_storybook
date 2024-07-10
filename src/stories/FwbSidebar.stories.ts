import type { Meta, StoryObj } from '@storybook/vue3'
import {ref} from 'vue'
//import Button from './Button.vue'
import Drawer from '@/components/Drawer/presentation/Drawer.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { boolean, object } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbSidebar',
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
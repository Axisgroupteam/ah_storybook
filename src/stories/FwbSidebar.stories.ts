import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
//import Button from './Button.vue'
import Drawer from '@/components/Drawer/presentation/Drawer.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { boolean, object } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use this sidebar component to navigate between groups of modules and content listings in your application.
 *
 * The sidebar component is widely used in navigation between application content that is displayed on medium or big screens where the body content can be pushed aside and rearrange the interface grid.
 */
const meta = {
  title: 'Example/SidebarX',
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

/**
 * Use this variant to navigate between content lists grouped into modules accessible from a dropdown menu.
 */
export const Default: Story = {
  args: {
    moduleData: [
      {
        title: 'Module 1',
        icon: 'manager_icon'
      },
      {
        title: 'Module 2',
        icon: 'manager_icon'
      },
      {
        title: 'Module 3',
        icon: 'manager_icon'
      }
    ]
  }
}

/**
 * Use this variant to navigate between content listings in a single module that is displayed as a label.
 */
export const Simple: Story = {
  args: {
    moduleData: []
  }
}

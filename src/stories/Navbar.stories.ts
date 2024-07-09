import type { Meta, StoryObj } from '@storybook/vue3'
import Navbar from '@/components/navBar/presentation/AppNavBar.vue'
import { boolean, object } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Navbar',
  component: Navbar,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
//   argTypes: {
//     moduleData: object
//   },
decorators: [
    () => ({
      template: `
      <div class=" flex flex-col justify-start  w-full h-screen bg-neutral-200 dark:bg-neutral-950">
        <story />
      </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // moduleData: []
  }
}

export const DotActions: Story = {
  args: {
    temp: true
  }
}

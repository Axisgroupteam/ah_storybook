import type { Meta, StoryObj } from '@storybook/vue3'

import BaseNotification from '@/components/Toast/BaseNotification.vue'

const meta = {
    title: 'Example/BaseNotification',
    component: BaseNotification,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
      status: { control: 'select', options: ['success', 'error', 'warning'] },
    },
    args: {}
  } satisfies Meta<typeof BaseNotification>

  export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

 export const Success: Story = {
    args:  {
        status: 'success',
        content: 'Default message'
    }
 }

 export const Error: Story = {
    args:  {
      status: 'error',
      content: 'Default message'
    }
 }

 export const Warning: Story = {
  args:  {
    status: 'warning',
    content: 'Default message'
  }
}


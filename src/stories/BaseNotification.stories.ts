import type { Meta, StoryObj } from '@storybook/vue3'

import BaseNotification from '@/components/Toast/BaseNotification.vue'

const meta = {
  title: 'Example/Toast',
  component: BaseNotification,
  decorators: [
    () => ({
      template: `<div class="w-[400px] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">        
        <story />
      </div>`
    })
  ],
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'error', 'warning', 'action', 'info'] }
  },
  args: {
    content: 'Text'
  }
} satisfies Meta<typeof BaseNotification>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    content: 'Some message'
  }
}

export const Success: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args"  />
      
    `
  }),
  args: {
    status: 'success',
    content: 'Success notification'
  }
}

export const Error: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args"  />
      
    `
  }),
  args: {
    status: 'error',
    content: 'Error notification'
  }
}

export const Warning: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args"  />
      
    `
  }),
  args: {
    status: 'warning',
    content: 'Warning notification'
  }
}

export const Information: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args"  />
      
    `
  }),
  args: {
    status: 'info',
    content: 'Information notification'
  }
}

export const Action: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args"  />
      
    `
  }),
  args: {
    status: 'action',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis vero iste.'
  }
}

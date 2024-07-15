import type { Meta, StoryObj } from '@storybook/vue3'

import BaseNotification from '@/components/Toast/BaseNotification.vue'

/**
 * Push notifications to your users using the toast component and choose from multiple styles.
 *
 * The toast component can be used to enhance your website’s interactivity by pushing notifications to your visitors.
 */
const meta = {
  title: 'Example/ToastX',
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

/**
 * Use this simple toast variant with an icon, message, and dismissible close button to show alert messages to your website visitors.
 */
export const Default: Story = {
  args: {
    content: 'Some message'
  }
}

/**
 * Use this contextual variant to show success alert messages to your users.
 */
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

/**
 * Use this contextual variant to show error alert messages to your users.
 */
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

/**
 * Use this contextual variant to show warning alert messages to your users.
 */
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

/**
 * Use this contextual variant to show information alert messages to your users.
 */
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

/**
 * Use this interactive variant to encourage users to make a certain action such as updating to the latest software version. You can set an icon, message, and two buttons.
 */
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

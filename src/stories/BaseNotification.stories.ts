import type { Meta, StoryObj } from '@storybook/vue3'

import BaseNotification from '@/components/Toast/BaseNotification.vue'

const meta = {
    title: 'Example/BaseNotification',
    component: BaseNotification,
    decorators: [()=>({
      template: `<div class="w-[400px] ">        
        <story />
      </div>`
    })],
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
      status: { control: 'select', options: ['success', 'error', 'warning', 'action', 'info'] },
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

 export const Succeess: Story = {
  render: (args) => ({
    components: { BaseNotification },
    setup() {
      return { args }
    },
    template: `
              
        <BaseNotification v-bind="args" class="shadow-[0_3px_10px_rgb(0,0,0,0.2)]" />
      
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
              
        <BaseNotification v-bind="args" class="shadow-[0_3px_10px_rgb(0,0,0,0.2)]" />
      
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
              
        <BaseNotification v-bind="args" class="shadow-[0_3px_10px_rgb(0,0,0,0.2)]" />
      
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
              
        <BaseNotification v-bind="args" class="shadow-[0_3px_10px_rgb(0,0,0,0.2)]" />
      
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
              
        <BaseNotification v-bind="args" class="shadow-[0_3px_10px_rgb(0,0,0,0.2)]" />
      
    `
  }),
  args: {
    status: 'action',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe reiciendis vero iste.'
  }
}


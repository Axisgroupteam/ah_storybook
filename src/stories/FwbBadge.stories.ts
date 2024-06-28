import type { Meta, StoryObj } from '@storybook/vue3'

import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'

const meta = {
  title: 'Example/FwbBadge',
  component: FwbBadge,
  decorators: [
    () => ({
      template: `<div class="w-[400px] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">        
        <story />
      </div>`
    })
  ],
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {
    
  }
} satisfies Meta<typeof FwbBadge>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
    
  }
}

export const Success: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
    
  }
}

export const Error: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
  }
}

export const Warning: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
  }
}

export const Information: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
  }
}

export const Action: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
              
        <FwbBadge v-bind="args"  />
      
    `
  }),
  args: {
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbButton',
  component: FwbButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'select', options: ['primary', 'secondary', 'terciary'] },
    loadingPosition: { control: 'select', options: ['prefix', 'suffix'] }
  },
  args: {}
} satisfies Meta<typeof FwbButton>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'xl'
  }
}

export const Secondary: Story = {
  args: {
    color: 'secondary'
  }
}

export const Terciary: Story = {
  args: {
    color: 'terciary'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const LoadingPrefix: Story = {
  args: {
    loading: true,
    loadingPosition: 'prefix'
  }
}

export const LoadingSuffix: Story = {
  args: {
    loading: true,
    loadingPosition: 'suffix'
  }
}

export const DefaultSlot: Story = {
  render: (args) => ({
    components: { FwbButton },
    setup() {
      return { args }
    },
    template: `
      <FwbButton v-bind="args">
        <template #default>Default Slot Content</template>        
      </FwbButton>
    `
  }),
  args: {
    color: 'primary',
    size: 'md'
  }
}

export const PrefixSlots: Story = {
  render: (args) => ({
    components: { FwbButton },
    setup() {
      return { args }
    },
    template: `
      <FwbButton v-bind="args">        
        <template #prefix>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </template>        
      </FwbButton>
    `
  }),
  args: {
    color: 'primary',
    size: 'md'
  }
}

export const SuffixSlot: Story = {
  render: (args) => ({
    components: { FwbButton },
    setup() {
      return { args }
    },
    template: `
      <FwbButton v-bind="args">        
        <template #suffix>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </template>        
      </FwbButton>
    `
  }),
  args: {
    color: 'primary',
    size: 'md'
  }
}

export const Pill: Story = {
  render: (args) => ({
    components: { FwbButton },
    setup() {
      return { args }
    },
    template: `
      <FwbButton v-bind="args">        
        <template #default>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </template>        
      </FwbButton>
    `
  }),
  args: {
    color: 'primary',
    size: 'md',
    pill: true,
    square: true
  }
}

export const Square: Story = {
  render: (args) => ({
    components: { FwbButton },
    setup() {
      return { args }
    },
    template: `
      <FwbButton v-bind="args">        
        <template #default>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </template>        
      </FwbButton>
    `
  }),
  args: {
    color: 'primary',
    size: 'md',
    square: true
  }
}

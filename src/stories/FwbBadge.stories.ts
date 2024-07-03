import type { Meta, StoryObj } from '@storybook/vue3'
//import { fn } from '@storybook/test'
import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'

const meta = {
  title: 'Example/FwbBadge',
  component: FwbBadge,

  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary'] }
  },
  args: {
    color: 'primary',
    size:'sm'
  }
} satisfies Meta<typeof FwbBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">
        <template #preffix><span>3</span></template>        
        <template #default>Notifications</template>
        <template #suffix>
          <button type="button" class="flex items-center justify-center w-3.5 h-3.5 hover:bg-red-200 dark:hover:bg-red-800 rounded-sm">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </template>     
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size:'sm' 
  }
}

export const Normal: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #default>
          <span>Badge</span>
        </template>        
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size: 'sm',
  }
}

export const CounterPill: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">    
        <template #default>
          <span>3</span>        
        </template>    
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size: 'sm',
    pill: true,
  }
}

export const Indicator: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
      </FwbBadge>
    `
  }),
  args: {
    size: 'sm',
    indicator: true,
  }
}

export const PrefixSlots: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">        
        <template #preffix>
          <span class="">3</span>
        </template>
        <template #default>Badge</template>     
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size: 'sm'
  }
}

export const SuffixSlot: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args">
        <template #default>Badge</template>
        <template #suffix>
          <button type="button" class="flex items-center justify-center w-3.5 h-3.5 hover:bg-red-200 dark:hover:bg-red-800 rounded-sm">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </template>       
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size:'sm'
  }
}

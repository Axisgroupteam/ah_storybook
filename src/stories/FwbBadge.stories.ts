import type { Meta, StoryObj } from '@storybook/vue3'
import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'
import {ref} from 'vue'

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
    components: { FwbBadge},
    methods: {
      closeBadge(): void{
          this.showBadge = false;
      }
    },
    setup() {
      return { args, showBadge: ref(false) }
    },
    template: `
      <FwbBadge v-bind="args">
        <template #preffix><span>3</span></template>        
        <template #default>Notifications</template>
        <template #suffix />
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
        <template #suffix />
      </FwbBadge>
    `
  }),
  args: {
    color: 'primary',
    size:'sm'
  }
}

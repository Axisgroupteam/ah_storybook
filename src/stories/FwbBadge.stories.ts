import type { Meta, StoryObj } from '@storybook/vue3'
import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'
import { ref } from 'vue'

const meta = {
  title: 'Example/BadgeX',
  component: FwbBadge,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
        <story />
      </div>`
    })
  ],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm'] },
    type: {
      control: 'select',
      options: ['primary', 'dark', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'blue']
    },
    variant: {
      control: 'select',
      options: ['default', 'counter', 'indicator']
    }
  },
  args: {
    type: 'primary',
    size: 'xs',
    variant: 'default'
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
        <template #icon><span>3</span></template>        
        <template #default>Notifications</template>
      </FwbBadge>
    `
  }),
  args: {
    type: 'primary',
    size: 'xs',
    variant: 'default'
  }
}

export const Counter: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args" variant="counter" :count="7000" />
    `
  }),
  args: {
    type: 'primary',
    size: 'xs'
  }
}

export const Indicator: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <FwbBadge v-bind="args" variant="indicator" />
    `
  }),
  args: {
    type: 'primary',
    size: 'xs'
  }
}

export const ColorVariants: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 items-center justify-center w-full min-h-32">
        <FwbBadge v-bind="args" type="primary">Primary</FwbBadge>
        <FwbBadge v-bind="args" type="dark">Dark</FwbBadge>
        <FwbBadge v-bind="args" type="red">Red</FwbBadge>
        <FwbBadge v-bind="args" type="green">Green</FwbBadge>
        <FwbBadge v-bind="args" type="yellow">Yellow</FwbBadge>
        <FwbBadge v-bind="args" type="indigo">Indigo</FwbBadge>
        <FwbBadge v-bind="args" type="purple">Purple</FwbBadge>
        <FwbBadge v-bind="args" type="pink">Pink</FwbBadge>
        <FwbBadge v-bind="args" type="blue">Blue</FwbBadge>
      </div>
    `
  }),
  args: {
    size: 'xs',
    variant: 'default'
  }
}

export const Closable: Story = {
  render: (args) => ({
    components: { FwbBadge },
    setup() {
      const visibleBadges = ref([
        { text: 'Primary', type: 'primary' },
        { text: 'Dark', type: 'dark' },
        { text: 'Red', type: 'red' },
        { text: 'Green', type: 'green' },
        { text: 'Yellow', type: 'yellow' },
        { text: 'Indigo', type: 'indigo' },
        { text: 'Purple', type: 'purple' },
        { text: 'Pink', type: 'pink' },
        { text: 'Blue', type: 'blue' }
      ])
      const handleClose = (badge) => {
        visibleBadges.value = visibleBadges.value.filter((b) => b.text !== badge.text)
      }
      return { args, visibleBadges, handleClose }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <FwbBadge 
          v-for="badge in visibleBadges" 
          :key="badge.text" 
          v-bind="args" 
          :type="badge.type"
          @close="handleClose(badge)"
        >
          {{ badge.text }}
        </FwbBadge>
      </div>
    `
  }),
  args: {
    size: 'xs',
    variant: 'default',
    closable: true
  }
}

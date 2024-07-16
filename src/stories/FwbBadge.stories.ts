import type { Meta, StoryObj } from '@storybook/vue3'
import FwbBadge from '@/components/FwbBadge/FwbBadge.vue'
import { ref } from 'vue'

/**
 * Use badges as elements to show counts or labels separately or inside other components.
 *
 * The badge component can be used to complement other elements such as buttons or text elements as a label or to show the count of a given data, such as the number of comments for an article or how much time has passed by since a comment has been made.
 */
const meta = {
  title: 'Example/BadgeX',
  component: FwbBadge,

  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary'] }
  },
  args: {
    color: 'primary',
    size: 'sm'
  }
} satisfies Meta<typeof FwbBadge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use the following badge variant to indicate a count and label, the close button is useful to dismiss the current badge.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbBadge },
    methods: {
      closeBadge(): void {
        this.showBadge = false
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
    size: 'sm'
  }
}

/**
 * Use the following badge variant to indicate labels.
 */
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
    size: 'sm'
  }
}

/**
 * Use this example to add a badge variant for a count indicator.
 */
export const Counter: Story = {
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
    pill: true
  }
}

/**
 * Use this example to add a badge variant for a simple color indicator.
 */
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
    indicator: true
  }
}

/**
 * Use this example to add a badge variant that has a counter as a prefix.
 */
export const Prefix: Story = {
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

/**
 * Use this example to add a badge variant that has a close button as a suffix.
 */
export const Suffix: Story = {
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
    size: 'sm'
  }
}

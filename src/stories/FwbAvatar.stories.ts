import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAvatar from '@/components/FwbAvatar/FwbAvatarBtn.vue'

const meta = {
  title: 'Example/FwbAvatar',
  component: FwbAvatar,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbAvatar>

export default meta
type Story = StoryObj<typeof meta>

 export const Default: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
        <FwbAvatar v-bind="args" />
      `
  }),
  args: {
    img: 'Avatar_40_1.png',
    disabled: true,
    size: 'md'
  }
}

export const PlaceholderIcon: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
        <FwbAvatar v-bind="args" />
      `
  }),
  args: {
    disabled: true,
    size: 'md'
  }
}

export const PlaceholderInitials: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
        <FwbAvatar v-bind="args" />
      `
  }),
  args: {
    fullName: 'Master Employee',
    disabled: true,
    size: 'md'
  }
}

export const StackedCounter: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
        <FwbAvatar v-bind="args" />
      `
  }),
  args: {
    img: 'avatar.png',
    stacked: true,
    maxInStack: 4,
    imgStacks: ['Avatar_40_2.png','Avatar_40_3.png', 'Avatar_40_4.png', 'Avatar_40_5.png', 'Avatar_40_6.png', 'Avatar_40_1.png'],
    totalStacked: 5,
    size: 'md'
  }
}

export const UserDropdown: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="h-64 mb-auto">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    img: 'Avatar_40_1.png',
    fullName: 'Luis Enrique Bauza Pena de la Torriente',
    email: 'contact@detooo.com',
    size: 'md'    
  }
}
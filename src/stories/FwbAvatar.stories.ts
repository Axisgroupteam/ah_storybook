import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAvatar from '@/components/FwbAvatar/FwbAvatarBtn.vue'

const meta = {
  title: 'Example/FwbAvatar',
  component: FwbAvatar,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['bottom-left', 'bottom-center', 'bottom-right'] }
  },
  args: {
    placement: 'left-bottom',
  }
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
      <div class="flex justify-center w-full h-64 mb-auto ml-auto p-4">
        <FwbAvatar v-bind="args" />
      </div>
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
      <div class="flex justify-center w-full h-64 mb-auto ml-auto p-4">
        <FwbAvatar v-bind="args" />
      </div>
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
      <div class="flex justify-center w-full h-64 mb-auto ml-auto p-4">
        <FwbAvatar v-bind="args" />
      </div>
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
      <div class="flex justify-center w-full h-64 mb-auto ml-auto p-4">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    img: 'avatar.png',
    stacked: true,
    maxInStack: 4,
    imgStacks: ['Avatar_40_1.png', 'Avatar_40_2.png', 'Avatar_40_3.png', 'Avatar_40_4.png','Avatar_40_5.png','Avatar_40_6.png'],
    totalStacked: 99,
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
      <div class="flex justify-center w-full h-64 mb-auto ml-auto p-4">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    img: 'Avatar_40_1.png',
    fullName: 'Master Employee',
    email: 'contact@detooo.com',
    size: 'md',
    placement: 'left'  
  }
}
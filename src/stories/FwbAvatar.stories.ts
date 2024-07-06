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
    size: 'sm',
    rounded: true,
    initials: '',
    img: 'avatar.png',
    stacked: false,
    maxInStack: 0,
    totalStacked: 0,
    imgStacks: [],
    fullName: '',
    email: '',
    options: [{'icon': '', 'label': '', 'link': ''}],
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
    size: 'sm',
    rounded: true,
    initials: '',
    img: '',
    stacked: false,
    maxInStack: 0,
    imgStacks: [],
    totalStacked: 0,
    fullName: '',
    email: '',
    options: [{'icon': '', 'label': '', 'link': ''}],
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
    size: 'sm',
    rounded: true,
    initials: 'ME',
    img: '',
    stacked: false,
    maxInStack: 0,
    imgStacks: [],
    totalStacked: 0,
    fullName: 'Mas Esnt',
    email: '',
    options: [{'icon': '', 'label': '', 'link': ''}],
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
    size: 'sm',
    rounded: true,
    initials: '',
    img: 'avatar.png',
    stacked: true,
    maxInStack: 4,
    imgStacks: ['avatar.png','avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png', 'avatar6.png'],
    totalStacked: 5,
    fullName: '',
    email: '',
    options: [{'icon': '', 'label': '', 'link': ''}],
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
    size: 'sm',
    rounded: true,
    initials: 'ME',
    img: 'avatar2.png',
    stacked: false,
    maxInStack: 0,
    imgStacks: [],
    totalStacked: 0,
    fullName: 'Luis Enrique Bauza Pena de la Torriente',
    email: 'contact@detooo.com',
    options: [
      {'icon': 'user', 'label': 'Profile', 'link': 'profile'},
      {'icon': 'arrow-right-to-bracket', 'label': 'Logout', 'link': 'logout'},
    ],
  }
}
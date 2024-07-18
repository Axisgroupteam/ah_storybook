import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAvatar from '@/components/FwbAvatar/FwbAvatar.vue'
import FwbAvatarStack from '@/components/FwbAvatar/FwbAvatarStack.vue'

/**
 * Use the avatar component to show a visual representation of a user profile using an image element or SVG object based on multiple styles.
 *
 * The avatar component can be used as a visual identifier for a user profile on your website.
 */
const meta = {
  title: 'Example/AvatarX',
  component: FwbAvatar,
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
    placement: { control: 'select', options: ['bottom', 'left', 'right'] }
  },
  args: {
    placement: 'bottom'
  }
} satisfies Meta<typeof FwbAvatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this example to create a circle avatar on an image element.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex justify-center items-start w-full h-60">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    img: 'Avatar_40_1.png',
    fullName: 'Master Employee',
    email: 'contact@detooo.com',
    options: [{ label: 'Profile', icon: 'user', link: 'profile' }, { label: 'Logout', icon: 'arrow-right-to-bracket', link: 'logout' }],
  }
}

/**
 * Use this example as a placeholder icon for the user profile when there is no custom image available.
 */
export const Icon: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex justify-center items-start w-full h-60">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    options: [{ label: 'Profile', icon: 'user', link: 'profile' }, { label: 'Logout', icon: 'arrow-right-to-bracket', link: 'logout' }],
  }
}

/**
 * This example can be used to show the initials of the user’s first and last name as a placeholder when no profile picture is available.
 */
export const Initials: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex justify-center items-start w-full h-60">
        <FwbAvatar v-bind="args" />
      </div>
      `
  }),
  args: {
    fullName: 'Master Employee',
    email: 'contact@detooo.com',
    options: [{ label: 'Profile', icon: 'user', link: 'profile' }, { label: 'Logout', icon: 'arrow-right-to-bracket', link: 'logout' }],
  }
}

/**
 * Use this example if you want to stack a group of users by overlapping the avatar components.
 */
export const Stacked: Story = {
  render: (args) => ({
    components: { FwbAvatarStack },
    setup() {
      return { args }
    },
    template: `
      <div class="flex justify-center items-start w-full h-60">
        <FwbAvatarStack v-bind="args" />
      </div>
      `
  }),
  args: {
    options: [{ label: 'Element 1', icon: 'user', link: 'profile' }, { label: 'Element 2', icon: 'user', link: 'profile' }, { label: 'Element 3', icon: 'user', link: 'profile' }, { label: 'Element 4', icon: 'user', link: 'profile' }],    maxInStack: 3,
    imgStacks: ["Avatar_40_1.png", "Avatar_40_2.png", "Avatar_40_3.png", "Avatar_40_4.png", "Avatar_40_5.png", "Avatar_40_6.png"]
  }
}

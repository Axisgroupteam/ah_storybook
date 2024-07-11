import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbRange from '@/components/FwbRange/FwbRange.vue'

const meta = {
  title: 'Example/FwbRange',
  component: FwbRange,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Required: Story = {
  args: {
    required: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Small: Story = {
  args: {
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    size: 'lg'
  }
}

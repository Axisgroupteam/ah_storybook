import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbText from '@/components/FwbText/FwbText.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbText',
  component: FwbText,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean', default: false},
    validationStatus: { control: 'radio', options: ['error', 'success'], },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    validationMessage: { control: 'text', },
    label: { control: 'text' },
  },
  args: {}
} satisfies Meta<typeof FwbText>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Disabled: Story = {
  args: {
    label: "Comments: ",
    disabled: true,
  }
}

export const Error: Story = {
  args: {
    label: "Comments: ",
    required: true,
    validationStatus: "error",
    validationMessage: "This field is required",
  }
}

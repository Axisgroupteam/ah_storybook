import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbProgress from '@/components/FwbProgress/FwbProgress.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbProgress',
  component: FwbProgress,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    // color: { control: 'select', options: ['default', 'dark', 'green', 'red'] },
    labelPosition: { control: 'select', options: ['outside', 'inside'] }
  },
  args: {}
} satisfies Meta<typeof FwbProgress>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // color: 'red',
    // size: 'lg',
    // label: "Progress Bar",
    progress: 50,
    // labelPosition: 'inside'
  }
}

export const LabelInside: Story = {
    args: {
      size: 'lg',
    //   label: "Progress Bar",
      progress: 50,
      labelPosition: 'inside',
      labelProgress: true
    }
  }

  export const LabelOutside: Story = {
    args: {
    //   size: 'lg',
      label: "Progress Bar",
      progress: 50,
      labelPosition: 'outside',
      labelProgress: true
    }
  }
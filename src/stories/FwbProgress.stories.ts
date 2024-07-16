import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbProgress from '@/components/FwbProgress/FwbProgress.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the progress bar component to show the completion rate of a data indicator or use it as a loader element.
 *
 * The progress bar component can be used as an indicator to show the completion rate of data sets or it can be used as an animated loader component.
 */
const meta = {
  title: 'Example/ProgressBarX',
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
/**
 * Use the following example of a progress bar element to show a completion rate of a certain percentage.
 */
export const Default: Story = {
  args: {
    // color: 'red',
    // size: 'lg',
    // label: "Progress Bar",
    progress: 50
    // labelPosition: 'inside'
  }
}

/**
 * Here is an example of using a progress bar with the label inside the bar.
 */
export const Inside: Story = {
  args: {
    size: 'lg',
    //   label: "Progress Bar",
    progress: 50,
    labelPosition: 'inside',
    labelProgress: true
  }
}

/**
 * And this is an example of using a progress bar outside the bar.
 */
export const Outside: Story = {
  args: {
    //   size: 'lg',
    label: 'Progress Bar',
    progress: 50,
    labelPosition: 'outside',
    labelProgress: true
  }
}

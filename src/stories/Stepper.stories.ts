import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import Stepper from '@/components/FwbStepper/Stepper.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Stepper',
  component: Stepper,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {}
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const InicialSteper: Story = {
  args: {
    iconIni:"ini_stepper_report",
    iconEnd:"end_stepper_report",
    activeStep: false,
  }
}

export const EndSteper: Story = {
  args: {
    iconIni:"ini_stepper_report",
    iconEnd:"end_stepper_report",
    activeStep: true,
  }
}


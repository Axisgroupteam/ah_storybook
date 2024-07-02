import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbFileInput from '@/components/FwbFileInput/FwbFileInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbFileInput',
  component: FwbFileInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbFileInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args">
        
      </FwbFileInput>
    `
  }),
  args: {}
}

export const Required: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args" />
    `
  }),
  args: {
    required: true
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args" />
    `
  }),
  args: {
    disabled: true
  }
}

export const Large: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args" />
    `
  }),
  args: {
    size: 'lg'
  }
}

export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args">
        <span>
          Required Field
        </span>
      </FwbFileInput>
    `
  }),
  args: {
    validationStatus: 'error'
  }
}

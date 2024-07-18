import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbFileInput from '@/components/FwbFileInput/FwbFileInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use this input file component to let the user to upload one single file from their device storage.
 *
 * The input file can be used to upload one single file from the device storage of the user.
 */
const meta = {
  title: 'Example/InputFileX',
  component: FwbFileInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
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

/**
 * The input file component can be used to upload one single file.
 */
export const Default: Story = {
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

/**
 * Use this contextual variant for a mandatory requirement case.
 */
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

/**
 * Use this contextual variant for a disabled component case.
 */
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

/**
 * Use this contextual variant to display a larger component.
 */
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

/**
 * Use this contextual variant for a component error case.
 */
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

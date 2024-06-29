import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbImage from '@/components/FwbImage/FwbImage.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbImage',
  component: FwbImage,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbImage>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  render: (args) => ({
    components: { FwbImage },
    setup() {
      return { args }
    },
    template: `
      <FwbImage v-bind="args">
        
      </FwbImage>
    `
  }),
  args: {
    existingImages: [],
    required: true
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { FwbImage },
    setup() {
      return { args }
    },
    template: `
      <FwbImage v-bind="args">
        
      </FwbImage>
    `
  }),
  args: {
    existingImages: [],
    required: false,
    disabled: true
  }
}

export const StatusError: Story = {
  render: (args) => ({
    components: { FwbImage },
    setup() {
      return { args }
    },
    template: `
      <FwbImage v-bind="args">
         <template #validationMessage>
        <span>This field is required</span>
        </template>
      </FwbImage>
    `
  }),
  args: {
    existingImages: [],
    required: true,
    validationStatus: 'error'
  }
}
import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbDropzone from '@/components/FwbDropzone/FwbFileInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbDropzone',
  component: FwbDropzone,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbDropzone>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Dropzone: Story = {
  render: (args) => ({
    components: { FwbDropzone },
    setup() {
      return { args }
    },
    template: `
      <FwbDropzone v-bind="args" />
    `
  }),
  args: {
    label: 'Upload file',
    dropzone: true
  }
}

export const DropzoneRequired: Story = {
  render: (args) => ({
    components: { FwbDropzone },
    setup() {
      return { args }
    },
    template: `
        <FwbDropzone v-bind="args" />
      `
  }),
  args: {
    label: 'Upload file',
    dropzone: true,
    required: true
  }
}

export const DisabledDropzone: Story = {
  render: (args) => ({
    components: { FwbDropzone },
    setup() {
      return { args }
    },
    template: `
      <FwbDropzone v-bind="args" />
    `
  }),
  args: {
    label: 'Upload file',
    dropzone: true,
    disabled: true
  }
}

export const ErrorDropzone: Story = {
  render: (args) => ({
    components: { FwbDropzone },
    setup() {
      return { args }
    },
    template: `
      <FwbDropzone v-bind="args">
        <template #validationMessage>        
          Required Field        
        </template>
      </FwbDropzone>
    `
  }),
  args: {
    label: 'Upload file',
    dropzone: true,
    validationStatus: 'error'
  }
}

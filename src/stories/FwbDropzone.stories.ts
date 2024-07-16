import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbDropzone from '@/components/FwbDropzone/FwbFileInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use this dropzone component to let the user to upload one or more images from their device storage.
 *
 * The dropzone component is a type of file input that can be used to upload one or more images from the device storage of the user.
 */
const meta = {
  title: 'Example/DropzoneX',
  component: FwbDropzone,
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
} satisfies Meta<typeof FwbDropzone>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * The dropzone file input component can be used to upload one or more images by clicking anywhere in the area.
 */
export const Default: Story = {
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

/**
 * Use this contextual variant for a mandatory requirement case.
 */
export const Required: Story = {
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

/**
 * Use this contextual variant for a disabled component case.
 */
export const Disabled: Story = {
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

/**
 * Use this contextual variant for a component error case.
 */
export const Error: Story = {
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

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
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    //color: { control: 'select', options: ['primary', 'secondary', 'terciary'] },   
    validationStatus: { control: 'select', options: ['success', 'error']  },
  },
  args: {}
} satisfies Meta<typeof FwbFileInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */


export const DefaultSlot: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args">
        <template #prefix>
          <label for="file-input"  class="text-white text-xs md:text-sm">
            Examinar...
          </label>
        </template>             
      </FwbFileInput>
    `
  }),
  args: {  
    label: "Upload file" ,
    required: true,
    size: 'md',
    type: 'file' ,
    validationStatus: ""   
  }
}


export const WithError: Story = {
  render: (args) => ({
    components: { FwbFileInput },
    setup() {
      return { args }
    },
    template: `
      <FwbFileInput v-bind="args">
        <template #prefix>
          <label for="file-input"  class="text-white text-xs md:text-sm">
            Examinar...
          </label>
        </template> 
        <template #validationMessage>
               There was an error with your file upload
          </template>             
      </FwbFileInput>
    `
  }),
  args: {  
    label: "Upload file" ,
    required: true,
    size: 'md',    
    validationStatus: "error"   ,
    errors: {
      application: "There was an error with your file upload"
    }
    
  }
}



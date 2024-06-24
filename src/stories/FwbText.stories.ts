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
    label: "Opinion: ",
    disabled: true,
  }
}

export const Error: Story = {
  args: {
    label: "Opinion: ",
    required: true,
    validationStatus: "error",
    validationMessage: "This field is required",
  }
}



/* export const validationMessage: Story = {
  render: (args) => ({
    components: { FwbText },
    setup() {
      return { args }
    },
    template: `
      <FwbText 
          @input=""
          zise="lg" 
          label="Issuess" 
          
          validationStatus="error"
      >
        <template #validationMessage>
            {{validationMessage}}
        </template>
      </FwbText>
    `
  }),
  args: {
    size: 'md',
    validationMessage: "This field is required",
  }
} */

/* export const PrefixSlots: Story = {
  render: (args) => ({
    components: { FwbText },
    setup() {
      return { args }
    },
    template: `
      <FwbText v-bind="args">        
        <template #prefix>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </template>        
      </FwbText>
    `
  }),
  args: {
    size: 'md'
  }
} */

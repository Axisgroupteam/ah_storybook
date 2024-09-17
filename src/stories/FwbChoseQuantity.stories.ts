import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbChooseQuantity from '@/components/FwbChooseQuantity/FwbChooseQuantity.vue'
import { action } from '@storybook/addon-actions'
import { readonly, ref } from 'vue'
import { Readonly } from './FwbTextarea.stories';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input field to start accepting data from the user.
 *
 * The input field is an important part of the form element that can be used to create interactive controls to accept data from the user based on multiple input types, such as text, email, URL, and more.
 */
const meta = {
  title: 'Example/ChooseQuantityX',
  component: FwbChooseQuantity,
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
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['normal', 'error'] },
    type: { table: { disable: true } },
    modelValue: { table: { disable: true } }
  },
  args: {
    label: 'Count'
  }
} satisfies Meta<typeof FwbChooseQuantity>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Use this example to create multiple input fields types such as text, email, URL, and more.
 */
export const Default: Story = {
  args: {
      label: "LABEL",      
  }
}


/**
 * Use this example if you want to apply the readOnly state to an input field.
 */
export const ReadOnly: Story = {
  args: {
    label: "",
    readonly: true
  }
}


/**
 * Use this example if you want to apply maximum and minimum value to.
 */
export const MaxAndMin: Story = {
  args: {
    label:"",
    min: 0,
    max: 10
  }
}







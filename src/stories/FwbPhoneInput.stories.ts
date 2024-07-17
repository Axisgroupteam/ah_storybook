import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbPhoneInput from '@/components/FwbPhoneInput/FwbPhoneInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input password to set a phone number inside a form field and use a dropdown menu to select the country code.
 *
 * The phone number input component an be used to set a phone number inside a form field and also use a dropdown menu to select the country code.
 */
const meta = {
  title: 'Example/InputPhoneX',
  component: FwbPhoneInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    () => ({
      template: `
    <div class="w-full h-[250px] flex justify-center p-4">
        <div class="w-full ">
            <story />
        </div>
    </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof FwbPhoneInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * This example can be used to select the country code from a dropdown menu and set the phone number inside an input field.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbPhoneInput },
    setup() {
      return { args }
    },
    template: `
      <FwbPhoneInput v-bind="args">
        
      </FwbPhoneInput>
    `
  }),
  args: {}
}

/**
 * Use this example if you want to apply the disabled state to an input phone.
 */
export const Disabled: Story = {
  render: (args) => ({
    components: { FwbPhoneInput },
    setup() {
      return { args }
    },
    template: `
      <FwbPhoneInput v-bind="args">
        
      </FwbPhoneInput>
    `
  }),
  args: {
    disabled: true
  }
}

/**
 * Use this example if you want to apply the required state to an input phone.
 */
export const Required: Story = {
  render: (args) => ({
    components: { FwbPhoneInput },
    setup() {
      return { args }
    },
    template: `
      <FwbPhoneInput v-bind="args">
        
      </FwbPhoneInput>
    `
  }),
  args: {
    required: true
  }
}

/**
 * Use the following example to apply a medium size for the input phone.
 */
export const Medium: Story = {
  render: (args) => ({
    components: { FwbPhoneInput },
    setup() {
      return { args }
    },
    template: `
      <FwbPhoneInput v-bind="args">
        
      </FwbPhoneInput>
    `
  }),
  args: {
    size: 'md'
  }
}

/**
 * Use the following example to apply validation styles for an error case.
 */
export const Error: Story = {
  render: (args) => ({
    components: { FwbPhoneInput },
    setup() {
      return { args }
    },
    template: `
      <FwbPhoneInput v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbPhoneInput>
    `
  }),
  args: {
    validationStatus: 'error'
  }
}

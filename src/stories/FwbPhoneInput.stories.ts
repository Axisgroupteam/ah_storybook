import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
//import Button from './Button.vue'
import FwbPhoneInput from '@/components/FwbPhoneInput/FwbPhoneInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbPhoneInput',
  component: FwbPhoneInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    () => ({
      template: `
    <div class="w-full h-[300px] flex justify-center">
        <div class="w-full px-6">
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

export const Normal: Story = {
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

export const ErrorStatus: Story = {
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

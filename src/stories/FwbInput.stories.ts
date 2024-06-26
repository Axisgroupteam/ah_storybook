import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbInput from '@/components/FwbInput/FwbInput.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbInput',
  component: FwbInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['normal', 'error'] },
    type: { table: { disable: true } },
    modelValue: { table: { disable: true } }
  },
  args: {
    label: 'Text'
  }
} satisfies Meta<typeof FwbInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Normal: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Required: Story = {
  args: {
    required: true
  }
}

export const Medium: Story = {
  args: {
    size: 'md'
  }
}

export const Number: Story = {
  args: {
    type: 'number'
  }
}

export const Search: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      return { args }
    },
    template: `
          <FwbInput v-bind="args">
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
          </FwbInput>
        `
  }),
  args: {}
}

export const Password: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleTypeChange = () => {
        action('toggleVisibility')()
        args.type = args.type === 'text' ? 'password' : 'text'
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleTypeChange, handleInput }
    },
    template: `
      <FwbInput
        v-bind="args"
        :modelValue="inputValue"
        @toggleVisibility="handleTypeChange"
        @input="handleInput"
      >
        <template #suffix>
          <svg class="w-6 h-6 text-neutral-500 dark:text-neutral-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
          </svg>
        </template>
      </FwbInput>
    `
  }),
  args: {
    type: 'password',
    modelValue: ''
  }
}

export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      return { args }
    },
    template: `
      <FwbInput v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbInput>
    `
  }),
  args: {
    validationStatus: 'error'
  }
}

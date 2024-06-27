import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbInput from '@/components/FwbInput/FwbInput.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbInputSearch',
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
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleClear = () => {
        action('toggleVisibility')()
        args.modelValue = ''
        inputValue.value = ''
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleClear, handleInput }
    },
    template: `
        <FwbInput
          v-bind="args"
          :modelValue="inputValue"
          @toggleVisibility="handleClear"
          @input="handleInput"
        >
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
            <template #suffix v-if="inputValue.length > 0">
                <svg class="w-6 h-6 text-neutral-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </template>
          </FwbInput>
        `
  }),
  args: {
    modelValue: ''
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleClear = () => {
        action('toggleVisibility')()
        args.modelValue = ''
        inputValue.value = ''
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleClear, handleInput }
    },
    template: `
        <FwbInput
          v-bind="args"
          :modelValue="inputValue"
          @toggleVisibility="handleClear"
          @input="handleInput"
        >
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
            <template #suffix v-if="inputValue.length > 0">
                <svg class="w-6 h-6 text-neutral-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </template>
          </FwbInput>
        `
  }),
  args: {
    modelValue: '',
    disabled: true
  }
}

export const Required: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleClear = () => {
        action('toggleVisibility')()
        args.modelValue = ''
        inputValue.value = ''
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleClear, handleInput }
    },
    template: `
        <FwbInput
          v-bind="args"
          :modelValue="inputValue"
          @toggleVisibility="handleClear"
          @input="handleInput"
        >
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
            <template #suffix v-if="inputValue.length > 0">
                <svg class="w-6 h-6 text-neutral-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </template>
          </FwbInput>
        `
  }),
  args: {
    modelValue: '',
    required: true
  }
}

export const Medium: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleClear = () => {
        action('toggleVisibility')()
        args.modelValue = ''
        inputValue.value = ''
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleClear, handleInput }
    },
    template: `
        <FwbInput
          v-bind="args"
          :modelValue="inputValue"
          @toggleVisibility="handleClear"
          @input="handleInput"
        >
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
            <template #suffix v-if="inputValue.length > 0">
                <svg class="w-6 h-6 text-neutral-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </template>
          </FwbInput>
        `
  }),
  args: {
    modelValue: '',
    size: 'md'
  }
}

export const ErrorStatus: Story = {
  render: (args) => ({
    components: { FwbInput },
    setup() {
      const inputValue = ref(args.modelValue)

      const handleClear = () => {
        action('toggleVisibility')()
        args.modelValue = ''
        inputValue.value = ''
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        inputValue.value = target.value
        action('update:modelValue')(target.value)
      }

      return { args, inputValue, handleClear, handleInput }
    },
    template: `
        <FwbInput
          v-bind="args"
          :modelValue="inputValue"
          @toggleVisibility="handleClear"
          @input="handleInput"
        >
              <template #prefix>
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </template>
            <template #suffix v-if="inputValue.length > 0">
                <svg class="w-6 h-6 text-neutral-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </template>
            <template #validationMessage>
            <span>This field is required</span>
          </template>                   
          </FwbInput>
        `
  }),
  args: {
    modelValue: '',
    validationStatus: 'error'
  }
}

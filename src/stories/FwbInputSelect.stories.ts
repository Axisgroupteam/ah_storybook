import type { Meta, StoryObj } from '@storybook/vue3'

import FwbSelect from '@/components/FwbSelect/FwbSelect.vue'
import { action } from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbInputSelect',
  component: FwbSelect,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['success', 'error'] },
    modelValue: { table: { disable: true } }
  },
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
  args: {
    label: 'Text'
  }
} satisfies Meta<typeof FwbSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Options: Story = {
  args: {
    options: [
      {
        name: 'first',
        value: '1',
        icon: ''
      },
      {
        name: 'second',
        value: '2',
        icon: ''
      },
      {
        name: 'third',
        value: '4',
        icon: ''
      }
    ]
  }
}

export const OptionsWithIcons: Story = {
  args: {
    label: 'Options with icons',
    options: [
      {
        name: 'primero',
        value: '1',
        icon: 'home'
      },
      {
        name: 'segundo',
        value: '2',
        icon: 'home'
      },
      {
        name: 'tercero',
        value: '3',
        icon: 'home'
      },
      {
        name: 'first',
        value: '1',
        icon: 'home'
      },
      {
        name: 'second',
        value: '2',
        icon: 'home'
      },
      {
        name: 'third',
        value: '3',
        icon: 'home'
      }
    ]
  }
}

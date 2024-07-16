import type { Meta, StoryObj } from '@storybook/vue3'

import FwbSelect from '@/components/FwbSelect/FwbSelect.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the select component to allow the user to choose from one or more options from a dropdown list.
 *
 * The select input component can be used to gather information from users based on multiple options in the form of a dropdown list.
 */
const meta = {
  title: 'Example/InputSelectX',
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
    <div class="w-full h-[300px] flex justify-center p-4">
        <div class="w-full ">
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

/**
 * Use this example of an input select trigger to show a dropdown list component.
 */
export const Default: Story = {
  args: {}
}

/**
 * Use this example if you want to apply the disabled state to an input select.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this example if you want to apply the required state to an input select.
 */
export const Required: Story = {
  args: {
    required: true
  }
}

/**
 * Use the following example to apply a medium size for the input select.
 */
export const Medium: Story = {
  args: {
    size: 'md'
  }
}

/**
 *Use the following example to apply validation styles for an error case.
 */
export const Error: Story = {
  render: (args) => ({
    components: { FwbSelect },
    setup() {
      return { args }
    },
    template: `
      <FwbSelect v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbSelect>
    `
  }),
  args: {
    validationStatus: 'error'
  }
}

/**
 * Use this example of an input select component to get a single option selection from a dropdown list.
 */
export const Dropdown: Story = {
  args: {
    options: [
      {
        name: 'Element 1',
        value: '1',
        icon: ''
      },
      {
        name: 'Element 2',
        value: '2',
        icon: ''
      },
      {
        name: 'Element 3',
        value: '4',
        icon: ''
      }
    ]
  }
}

/**
 * Use this example of an input select component to get a single option selection from a dropdown list with icons.
 */
export const OptionsWithIcons: Story = {
  args: {
    label: 'Options with icons',
    options: [
      {
        name: 'Element 1',
        value: '1',
        icon: 'home'
      },
      {
        name: 'Element 2',
        value: '2',
        icon: 'home'
      },
      {
        name: 'Element 3',
        value: '3',
        icon: 'home'
      },
      {
        name: 'Element 4',
        value: '1',
        icon: 'home'
      },
      {
        name: 'Element 5',
        value: '2',
        icon: 'home'
      }
    ]
  }
}

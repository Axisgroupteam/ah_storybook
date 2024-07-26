import type { Meta, StoryObj } from '@storybook/vue3'
import FwbInputSearchCustom from '@/components/FwbInputSearchCustom/FwbInputSearchCustom.vue'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input field to start accepting data from the user.
 *
 * The input field is an important part of the form element that can be used to create interactive controls to accept data from the user based on multiple input types, such as text, email, URL, and more.
 */
const meta = {
  title: 'Example/AdvanceSearch',
  component: FwbInputSearchCustom,
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
    label: 'Text'
  }
} satisfies Meta<typeof FwbInputSearchCustom>

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
    tableConfig: [
      {
        key: "name",
        title: "Name",
        tableConfig: {
          order: 1,
          show: true,
          width: "auto",
        },
      },      
    ],
  }
}

/**
 * Use this example if you want to apply the disabled state to an input field.
 */
export const Disabled: Story = {
  args: {
    disabled: true
  }
}

/**
 * Use this example if you want to apply the required state to an input field.
 */
export const Required: Story = {
  args: {
    required: true,
    tableConfig: [
      {
        key: "name",
        title: "Name",
        tableConfig: {
          order: 1,
          show: true,
          width: "auto",
        },
      }      
    ],
  }
}

/**
 * Use the following example to apply a medium size for the input field.
 */
export const Multiple: Story = {
  args: {
    tableConfig: [
      {
        key: "name",
        title: "Name",
        tableConfig: {
          order: 1,
          show: true,
          width: "auto",
        },
      },
      {
        key: "lastName",
        title: "Last Name",
        tableConfig: {
          order: 2,
          show: true,
          width: "auto",
        },
      },
    ],
  }
}

/**
 * Use the following example to apply validation styles for an error case.
 */
export const Error: Story = {
  render: (args) => ({
    components: { FwbInputSearchCustom },
    setup() {
      return { args }
    },
    template: `
      <FwbInputSearchCustom v-bind="args">
        <template #validationMessage>
        <span>This field is required</span>
        </template>       
      </FwbInputSearchCustom>
    `
  }),
  args: {
    tableConfig: [
      {
        key: "name",
        title: "Name",
        tableConfig: {
          order: 1,
          show: true,
          width: "auto",
        },
      },      
    ],
    validationStatus: 'error',
    error: "This field is required"
  }
}

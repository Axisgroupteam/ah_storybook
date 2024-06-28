import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbRadio from '@/components/FwbRadio/FwbRadio.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbRadio',
  component: FwbRadio,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    customClass: { table: { disabled: false } }
    //disabled: { control: 'boolean' },
  },
  args: {}
} satisfies Meta<typeof FwbRadio>

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

export const CustomBackgroundColor: Story = {
  render: (args) => ({
    components: { FwbRadio },
    setup() {
      return { args }
    },
    template: `
      <FwbRadio v-bind="args" />                      
    `
  }),
  args: {
    customClass: 'bg-neutral-500 dark:bg-neutral-800'
  }
}

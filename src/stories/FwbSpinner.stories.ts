import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbSpinner from '@/components/FwbSpinner/FwbSpinner.vue'

const meta = {
  title: 'Example/FwbSpinner',
  component: FwbSpinner,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {}
}

export const Size: Story = {
  render: (args) => ({
    components: { FwbSpinner },
    setup() {
      return { args }
    },
    template: `
        <div class="flex justify-center items-center gap-4">
            <FwbSpinner />
            <FwbSpinner size="6" />
            <FwbSpinner size="8" />
            <FwbSpinner size="10" />
            <FwbSpinner size="12" />
        </div>              
        `
  }),
  args: {}
}

export const Colors: Story = {
  render: (args) => ({
    components: { FwbSpinner },
    setup() {
      return { args }
    },
    template: `
        <div class="flex justify-center items-center gap-4">
            <FwbSpinner color="white" />            
            <FwbSpinner color="blue" />
            <FwbSpinner color="gray" />
            <FwbSpinner color="green" />
            <FwbSpinner color="pink" />
            <FwbSpinner color="purple" />
            <FwbSpinner color="red" />
            <FwbSpinner color="yellow" />
        </div>              
        `
  }),
  args: {}
}

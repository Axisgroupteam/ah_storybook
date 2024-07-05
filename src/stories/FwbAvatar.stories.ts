import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAvatar from '@/components/FwbAvatar/FwbAvatar.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbAvatar',
  component: FwbAvatar,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    //status: { control: 'select', options: ['normal', 'expanded'] },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'lx',
        'xl',
      ]
    }
  },
  /* decorators: [
    () => ({
      template: `
      <div class="inline-flex items-center justify-center">
        <story />
      </div>
    `
    }) 
  ],*/
  args: {}
} satisfies Meta<typeof FwbAvatar>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

 export const Default: Story = {
  render: (args) => ({
    components: { FwbAvatar },
    setup() {
      return { args }
    },
    template: `
        <FwbAvatar v-bind="args">        
          
        </FwbAvatar>
      `
  }),
  args: {}
}

import type { Meta, StoryObj } from '@storybook/vue3'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbDropdown from '@/components/FwbDropdown/FwbDropdown.vue'

const meta = {
    title: 'Example/FwbDropdown',
    component: FwbDropdown,
    decorators: [()=>({
        template: `<div class="w-full pt-[45px] pb-[100px] pl-20">        
          <story />
        </div>`
      })],
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
      placement: { control: 'select', options: ['top', 'bottom', 'right', 'left'] },
    },
    args: {}
  } satisfies Meta<typeof FwbDropdown>

  export default meta
type Story = StoryObj<typeof meta>

export const BottomPlacement: Story = {
    render: (args) => ({
      components: { FwbDropdown },
      setup() {
        return { args }
      },
      template: `
                <fwbDropdown >
                <template #trigger>
                <FwbButton
                    square
                    color="secondary"
                    class="w-16 h-[42px] font-normal text-sm hover:bg-neutral-100 hover:dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900"
                   
                >Some</FwbButton>
                </template>
                <ul>
                    <li>
                    Profile
                    </li>
                    <li>
                    Settings
                    </li>
                    <li>
                    Messages
                    </li>
                    <li>
                    Download
                    </li>
                </ul>
                </fwbDropdown>
      `
    }),
    args: {
      placement: 'bottom',
    }
  }
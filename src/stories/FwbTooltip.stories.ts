import type { Meta, StoryObj } from '@storybook/vue3'

import FwbTooltip from '@/components/FwbTooltip/FwbTooltip.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the following tooltips to show extra content when hovering or focusing on an element.
 *
 * Use the tooltip component to show extra information when hovering or focusing over an element.
 */
const meta = {
  title: 'Example/TooltipX',
  component: FwbTooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: 'select', options: ['hover', 'click'] },
    placement: {
      control: 'select',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end'
      ]
    }
  },
  decorators: [
    () => ({
      template: `
      <div class="w-full py-[100px] flex items-center justify-center p-4">
        <story />
      </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof FwbTooltip>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Get started with the default toggle component example as a checkbox element to receive a true or false selection from the user.
 */
export const Bottom: Story = {
  render: (args) => ({
    components: { FwbTooltip },
    setup() {
      return { args }
    },
    template: `
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me </span>
            </div>
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Bottom placement</span>
          </template> 
        </FwbTooltip>
 
      `
  }),
  args: {
    placement: 'bottom'
  }
}
/**
 * Use this variant to display a tooltip component in a position above the trigger element when hovering over it.
 */
export const Top: Story = {
  render: (args) => ({
    components: { FwbTooltip },
    setup() {
      return { args }
    },
    template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me </span>
            </div>
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Top placement</span>
          </template> 
        </FwbTooltip>
   
      `
  }),
  args: {
    placement: 'top'
  }
}

/**
 * Use this variant to display a tooltip component in a position to the left of the trigger element when you hover over it.
 */
export const Left: Story = {
  render: (args) => ({
    components: { FwbTooltip },
    setup() {
      return { args }
    },
    template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me</span>
            </div>
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Left placement</span>
          </template> 
        </FwbTooltip>
    
      `
  }),
  args: {
    placement: 'left'
  }
}

/**
 * Use this variant to display a tooltip component in a position to the right of the trigger element when you hover over it.
 */
export const Right: Story = {
  render: (args) => ({
    components: { FwbTooltip },
    setup() {
      return { args }
    },
    template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me</span>
            </div>
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Right placement</span>
          </template> 
        </FwbTooltip>
 
      `
  }),
  args: {
    placement: 'right'
  }
}

/**
 * Use this variant to choose whether you want to show the tooltip when hovering or clicking on the element.
 */
export const Click: Story = {
  render: (args) => ({
    components: { FwbTooltip },
    setup() {
      return { args }
    },
    template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Click Me</span>
            </div>
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Hovering after click</span>
          </template> 
        </FwbTooltip>
     
      `
  }),
  args: {
    placement: 'top',
    trigger: 'click'
  }
}

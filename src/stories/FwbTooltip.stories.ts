import type { Meta, StoryObj } from '@storybook/vue3'
 
 
import FwbTooltip from '@/components/FwbTooltip/FwbTooltip.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbTooltip',
  component: FwbTooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: { 
    trigger: { control: 'select', options: ['hover', 'click' ] },
    placement: { control: 'select', options: [, "auto"
        , "auto-start"
        , "auto-end"
        , "top"
        , "top-start"
        , "top-end"
        , "bottom"
        , "bottom-start"
        , "bottom-end"
        , "right"
        , "right-start"
        , "right-end"
        , "left"
        , "left-start"
        , "left-end"] }
  },
  decorators: [()=>({
    template: `
      <div class="w-full py-[100px] flex items-center justify-center">
        <story />
      </div>
    `
  })],
  args: {}
} satisfies Meta<typeof FwbTooltip>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */


export const BootomHover: Story = {
    render: (args) => ({
      components: { FwbTooltip },
      setup() {
        return { args }
      },
      template: `
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me<span>
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
  export const topHover: Story = {
    render: (args) => ({
      components: { FwbTooltip },
      setup() {
        return { args }
      },
      template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me<span>
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
  
  export const leftHover: Story = {
    render: (args) => ({
      components: { FwbTooltip },
      setup() {
        return { args }
      },
      template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me<span>
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
  
  export const rightHover: Story = {
    render: (args) => ({
      components: { FwbTooltip },
      setup() {
        return { args }
      },
      template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me<span>
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

  export const topClickAction: Story = {
    render: (args) => ({
      components: { FwbTooltip },
      setup() {
        return { args }
      },
      template: ` 
        <FwbTooltip v-bind="args">        
          <template #trigger>
            <div class="w-[90px] h-[35px] pl-3 items-center bg-neutral-700 flex rounded-md text-neutral-100 cursor-pointer" >
                <span >Hover Me<span>
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
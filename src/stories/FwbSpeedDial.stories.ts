import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SpeedDial from '@/components/FwbSpeedDial/FwbSpeedDial.vue'
import FwbTooltip from '@/components/FwbTooltip/FwbTooltip.vue'
import FwbSpeedDial from '@/components/FwbSpeedDial/FwbSpeedDial.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * The speed dial component can be used as a quick way to show a list of action buttons to a user when clicking on the main trigger element.
 *
 * Get started with the speed dial component to show a list of buttons or menu items positioned relative to the body in either corner as a quick way to allow certains actions to be made by your users.
 */
const meta = {
  title: 'Example/SpeedDialX',
  component: SpeedDial,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['vertical', 'horizontal'] }
  },
  decorators: [
    () => ({
      template: `
      <div class="w-full h-[400px] flex items-center justify-center p-4">
        <story />
      </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof SpeedDial>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default alignment of the menu items of the speed dial is vertical.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbSpeedDial, FwbTooltip, FwbButton },
    setup() {
      return { args }
    },
    template: `
       <fwb-speed-dial>
       <FwbTooltip placement="left">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
            </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Share</span>
          </template> 
        </FwbTooltip>  
       <FwbTooltip placement="left">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
                <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
              </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Print</span>
          </template> 
        </FwbTooltip>  
       <FwbTooltip placement="left">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Download</span>
          </template> 
        </FwbTooltip>
        <FwbTooltip placement="left">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
              </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Copy</span>
          </template> 
        </FwbTooltip>
       </fwb-speed-dial>
 
      `
  }),
  args: {
    // moduleData: [
    // ]
  }
}

/**
 * This example can be used to horizontally align the speed dial menu items.
 */
export const Horizontal: Story = {
  render: (args) => ({
    components: { FwbSpeedDial, FwbTooltip, FwbButton },
    setup() {
      return { args }
    },
    template: `
       <fwb-speed-dial  v-bind="args">
       <FwbTooltip placement="top">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
            </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Share</span>
          </template> 
        </FwbTooltip>  
       <FwbTooltip placement="top">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
                <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
              </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Print</span>
          </template> 
        </FwbTooltip>  
       <FwbTooltip placement="top">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Download</span>
          </template> 
        </FwbTooltip>
        <FwbTooltip placement="top">        
          <template #trigger>
            <fwb-button   color="secondary" square pill size="xl"   class=" w-[52px] h-[52px] items-center flex justify-center">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
              </svg>
            </fwb-button >
          </template>       
          <template #content>
            <span class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">Copy</span>
          </template> 
        </FwbTooltip>
       </fwb-speed-dial>
 
      `
  }),
  args: {
    placement: 'horizontal'
  }
}

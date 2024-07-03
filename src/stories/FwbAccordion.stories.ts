import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAccordion from '../components/FwbAccordion/FwbAccordion.vue'
import FwbAccordionContent from '../components/FwbAccordion//FwbAccordionContent.vue'
import FwbAccordionHeader from '../components/FwbAccordion//FwbAccordionHeader.vue'
import FwbAccordionPanel from '../components/FwbAccordion//FwbAccordionPanel.vue'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/FwbAccordion',
  component: FwbAccordion,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `<div class="w-full h-[400px] flex justify-start p-2">        
      <story />
    </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbAccordion>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Simple: Story = {
  render: (args) => ({
    components: { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel },
    setup() {
      return { args }
    },
    template: `            
        <fwb-accordion class="w-full">
        <fwb-accordion-panel>
          <fwb-accordion-header>
            <div class="flex justify-between items-center">
              <div class="flex justify-start items-center gap-2">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                </svg>
                <span >Accordion</span>
              </div>
             <p >More</p>
            </div>
          </fwb-accordion-header>
          <fwb-accordion-content>
            <fwb-accordion always-open>
              <span class="text-neutral-900 dark:text-white">Description text</span>
            </fwb-accordion>
          </fwb-accordion-content>
        </fwb-accordion-panel>
      </fwb-accordion>
    `
  }),
  args: {}
}

export const Nested: Story = {
  render: (args) => ({
    components: { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel },
    setup() {
      return { args }
    },
    template: `            
         <fwb-accordion class="w-full">
        <fwb-accordion-panel>
          <fwb-accordion-header>
            <div class="flex justify-between items-center">
              <div class="flex justify-start items-center gap-2">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                </svg>
                Accordion
              </div>
             <p>More</p>
            </div>
          </fwb-accordion-header>
          <fwb-accordion-content>
            <fwb-accordion always-open>
              <fwb-accordion-panel
                v-for="i in 1"
                :key="value"
              >
                <fwb-accordion-header>
                  <div class="flex justify-between items-center">
                    Accordion Nested           
                  </div>
                </fwb-accordion-header>
                <fwb-accordion-content>
                  <div class="flex dark:text-white flex-col gap-4">
                    Content Text
                  </div>
                </fwb-accordion-content>
              </fwb-accordion-panel>
            </fwb-accordion>
          </fwb-accordion-content>
        </fwb-accordion-panel>
      </fwb-accordion>
    `
  }),
  args: {}
}

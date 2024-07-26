import type { Meta, StoryObj } from '@storybook/vue3'
import FwbAccordionFilter from '../components/FwbAccordionFilter/FwbAccordionFilter.vue'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the accordion component to show hidden information based on the collapse and expand state of the child elements.
 *
 * The accordion component is a collection of vertically collapsing header and body elements that can be used to show and hide information.
 */
const meta = {
  title: 'Example/AccordionFilterX',
  component: FwbAccordionFilter,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
      <div class="w-full flex justify-start p-2">        
        <story />
      </div>
      </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbAccordionFilter>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Use this variant to open and collapse child elements and keep previously opened accordion elements unchanged.
 */
export const Default: Story = {  
  render: (args) => ({
    components: { FwbAccordionFilter },
    setup() {
      return { args }
    },
    template: ` 
    <FwbAccordionFilter :categories="args.categories">
      <template v-slot:content-0>
          <div>
            <p>Custom content for Category 1</p>            
          </div>
       </template>
      <template v-slot:content-1>
        <div>
          <p>Custom content for Category 2</p>            
        </div>
      </template>
      <template v-slot:content-2>
        <div>
          <p>Custom content for Category 3</p>            
        </div>
      </template>
      </FwbAccordionFilter>
    `
  }),
  args: {
    categories: ['Category 1', 'Category 2', 'Category 3'],
    
  }
}


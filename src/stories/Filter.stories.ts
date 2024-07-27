import type { Meta, StoryObj } from '@storybook/vue3'
import Filter from '@/components/Filter/CustomFilter.vue'
import FwbAccordionFilter from '../components/FwbAccordionFilter/FwbAccordionFilter.vue'
import FwbCheckbox from '../components/FwbCheckbox/FwbCheckbox.vue'
import { computed, ref } from 'vue'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input field to start accepting data from the user.
 *
 * The input field is an important part of the form element that can be used to create interactive controls to accept data from the user based on multiple input types, such as text, email, URL, and more.
 */
const meta = {
  title: 'Example/FilterX',
  component: Filter,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
    <div class="w-full h-screen flex justify-center p-4">
        <div class="w-full h-full">
            <story />
        </div>
    </div>
    `
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
} satisfies Meta<typeof Filter>

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
  render: (args) => ({
    components: {Filter ,FwbAccordionFilter, FwbCheckbox },
    methods: {
           
    },
    setup() {
      //const selectedItems= ref<string[]>([]);      
      const categories = ['Category 1', 'Category 2', 'Category 3'];
        const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
        const checkedItems = ref<{ [key: string]: boolean }>({
          'Item 1': false,
          'Item 2': false,
          'Item 3': false,
          'Item 4': false,
          'Item 5': false,
        });
        
        const selectedItems = computed(() => {
          return Object.keys(checkedItems.value).filter(item => checkedItems.value[item]);
        });

        const clearSelection = ():void =>{        
          Object.keys(checkedItems.value).forEach(key => {
            checkedItems.value[key] = false;
          });
        }; 

        const refFilter = ref(null);;
       
        const funcionReturn = (index: any) => {          
          console.log(`output->recibe eventchange`)
          refFilter.value?.handleEventChangeOption(index);
          /*const filterComponent = document.querySelector('Filter');
          if (filterComponent && filterComponent.__vue__) {
            filterComponent.__vue__.handleEventChangeOption(index);
          }*/
      }

      return { args, selectedItems, categories, checkedItems, items, refFilter, clearSelection, funcionReturn}
    },
    template: ` 
    <Filter ref="refFilter" @clearData="clearSelection" >
      <FwbAccordionFilter :categories="categories" @eventChangeOption = "funcionReturn"> 
        {{ selectedItems }}
        <template v-slot:content-0>           
        <div class="flex-wrap overscroll-none">
            <p>Custom content for Category 2 </p>            
          </div>
         </template>
        <template v-slot:content-1>
        <FwbCheckbox 
          v-for="(item, index) in items"
          :key="index"
          v-model="checkedItems[item]"
          :label="item"
          class="my-[6px] hover:bg-neutral-100 dark:hover:bg-neutral-500 p-2 rounded"          
          />          
        </template>
        <template v-slot:content-2>
          <div>
            <p>Custom content for Category 3</p>            
          </div>
        </template>
        </FwbAccordionFilter>
      </Filter>
       <p>Selected Items: {{ selectedItems.join(', ') }}</p>
    `
  }),
  args: {   
    
  }
}



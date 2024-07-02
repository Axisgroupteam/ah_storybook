import type { Meta, StoryObj } from '@storybook/vue3'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbDropdown from '@/components/FwbDropdown/FwbDropdown.vue'
import {ref} from 'vue'


const meta = {
    title: 'Example/FwbDropdown',
    component: FwbDropdown,
    decorators: [()=>({
        template: `<div class="w-full pt-[200px] pb-[100px] pl-[120px]">        
          <story />
        </div>`
      })],
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
      placement: { control: 'select', options: ['top', 'bottom', 'right', 'left'] },
      type: { control: 'select', options: [ 'secondary', 'primary'] },
    },
    args: {},
    
  } satisfies Meta<typeof FwbDropdown>

  export default meta
type Story = StoryObj<typeof meta>

export const PrimaryDropdown: Story = {
  render: (args) => ({
    components: { FwbDropdown, FwbButton },
   
    methods: {
      toggleVisibility(value: boolean): void{
          this.isVisible = value;
      }
    },
    setup() {
      return { args, isVisible: ref(false) }
    },
    template: `
              <fwbDropdown @toogle="toggleVisibility">
              <template #trigger>
              <FwbButton
                  square                
                  color="secondary"
      
              >
                  <span class="text-black dark:text-white">
                      Click me
                  </span>
                  <template #suffix>
                  <svg
                      :class="isVisible ? 'rotate-180' : 'rotate-0'"
                      class="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path
                      d="M19 9l-7 7-7-7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      />
                  </svg>
                  </template>
              </FwbButton>
              </template>
              <ul>
                  <li v-for="i in 3" class="px-8 py-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-700 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-neutral-900 dark:text-white text-sm font-medium">
                  {{"Element " + i}}
                  </li>
                  
              </ul>
              </fwbDropdown>
    `
  }),
  args: {
    placement: 'bottom',
    
  },

}

export const SecondaryDropdown: Story = {
    render: (args) => ({
      components: { FwbDropdown, FwbButton },
     
      methods: {
        toggleVisibility(value: boolean): void{
            this.isVisible = value;
        }
      },
      setup() {
        return { args, isVisible: ref(false) }
      },
      template: `
                <fwbDropdown v-bind="args" @toogle="toggleVisibility">
                <template #trigger>
                <FwbButton
                    square                
                    color="secondary"
        
                >
                    <span class="text-black dark:text-white">
                        Click me
                    </span>
                    <template #suffix>
                    <svg
                        :class="isVisible ? 'rotate-180' : 'rotate-0'"
                        class="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M19 9l-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        />
                    </svg>
                    </template>
                </FwbButton>
                </template>
                <div >
                    <div v-for="i in 3" >
                      <div class="px-8 py-2 whitespace-nowrap   hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer rounded-lg text-neutral-900 dark:text-white text-sm font-medium" >{{"Element " + i}}</div>
                    </div>
                    
                </div>
                </fwbDropdown>
      `
    }),
    args: {
      placement: 'bottom',
      type: 'secondary'
    },

  }

  
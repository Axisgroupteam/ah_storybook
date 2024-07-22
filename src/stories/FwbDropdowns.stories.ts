import type { Meta, StoryObj } from '@storybook/vue3'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbDropdown from '@/components/FwbDropdown/FwbDropdown.vue'
import { ref } from 'vue'

/**
 * Use this dropdown component to show a list of menu items when clicking on the trigger element.
 *
 * The dropdown component can be used to show a list of menu items when clicking on an element such as a button and hiding it when focusing outside of the triggering element.
 */
const meta = {
  title: 'Example/DropdownX',
  component: FwbDropdown,
  decorators: [
    () => ({
      template: `
        <div class="p-4">
        <div class="w-full h-[500px]">        
          <story />
        </div>
        </div>`
    })
  ],
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'right', 'left'] },
    type: { control: 'select', options: ['secondary', 'primary'] }
  },
  args: {}
} satisfies Meta<typeof FwbDropdown>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this variant of styles with separators between items that take up the entire container to display important menu lists.
 */

export const Primary: Story = {
  render: (args) => ({
    components: { FwbDropdown, FwbButton },

    methods: {
      toggleVisibility(value: boolean): void {
        this.isVisible = value
      }
    },
    setup() {
      return { args, isVisible: ref(false) }
    },
    template: `
              <fwbDropdown @toggleVisibility="toggleVisibility">
              <template #trigger>
              <FwbButton
                 size="md"
                  color="secondary"
                  class="whitespace-nowrap"
      
              >
                 
                      Click me
                 
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
                  <li v-for="i in 7" class="px-4 overflow-x-clip w-[200px] py-4 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium">
                  <svg class="w-5 h-5"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                  </svg>
                  <span >{{"Element " + i}}</span>
                  </li>
                  
              </ul>
              </fwbDropdown>
    `
  }),
  args: {
    placement: 'bottom'
  }
}

/**
 * Use this variant of styles with rounded edges and inside item paddings to display minor menu lists.
 */
export const Secondary: Story = {
  render: (args) => ({
    components: { FwbDropdown, FwbButton },

    methods: {
      toggleVisibility(value: boolean): void {
        this.isVisible = value
      }
    },
    setup() {
      return { args, isVisible: ref(false) }
    },
    template: `
                <fwbDropdown v-bind="args" @toggleVisibility="toggleVisibility">
                <template #trigger>
                <FwbButton
                            
                    color="secondary"
                    size="md"
                    class="whitespace-nowrap"
                >
                    
                        Click me
                    
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
                    <ul  >
                    
                      <li v-for="i in 7" class="px-2  py-2 whitespace-nowrap  flex gap-2 justify-start w-[250px] items-center   hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium" >
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                        </svg>
                        {{"Element " + i}}</li>
                    </ul>
                    
                </fwbDropdown>
      `
  }),
  args: {
    placement: 'bottom',
    type: 'secondary'
  }
}

/**
 * Use this variant to readjust the height of the primary dropdown component
 */
export const ResizablePrimary: Story = {
  render: (args) => ({
    components: { FwbDropdown, FwbButton },

    methods: {
      toggleVisibility(value: boolean): void {
        this.isVisible = value
      }
    },
    setup() {
      return { args, isVisible: ref(false) }
    },
    template: `
                <FwbDropdown @toggleVisibility="toggleVisibility" v-bind="args">
              <template #trigger>
              <FwbButton
                 size="md"
                  color="secondary"
                  class="whitespace-nowrap"
      
              >
                 
                      Click me
                 
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
                  <li v-for="i in 7" class="px-4 overflow-x-clip w-[200px] py-4 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium">
                  <svg class="w-5 h-5"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                  </svg>
                  <span >{{"Element " + i}}</span>
                  </li>
                  
              </ul>
              </FwbDropdown>
    `
  }),
  args: {
    placement: 'bottom',
    type: 'primary',
    resizable: true
  }
}

/**
 * Use this variant to readjust the height of the secondary dropdown component
 */

export const ResizableSecondary: Story = {
  render: (args) => ({
    components: { FwbDropdown, FwbButton },

    methods: {
      toggleVisibility(value: boolean): void {
        this.isVisible = value
      }
    },
    setup() {
      return { args, isVisible: ref(false) }
    },
    template: `
                <fwbDropdown v-bind="args" @toggleVisibility="toggleVisibility">
                <template #trigger>
                <FwbButton
                            
                    color="secondary"
                    size="md"
                    class="whitespace-nowrap"
                >
                    
                        Click me
                    
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
                    <ul  >
                    
                      <li v-for="i in 7" class="px-2  py-2 whitespace-nowrap  flex gap-2 justify-start w-[250px] items-center   hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium" >
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                        </svg>
                        {{"Element " + i}}</li>
                    </ul>
                    
                </fwbDropdown>
      `
  }),
  args: {
    placement: 'bottom',
    type: 'secondary',
    resizable: true
  }
}

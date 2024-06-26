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
    },
    args: {},
    
  } satisfies Meta<typeof FwbDropdown>

  export default meta
type Story = StoryObj<typeof meta>

export const BottomPlacement: Story = {
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

  export const TopPlacement: Story = {
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
                    color="primary"
                >
                    <template #default>
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                        </svg>
                    </template>
                    
                </FwbButton>
                </template>
                <ul>
                    <li v-for="i in 3" class="px-2 py-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-700 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-neutral-900 dark:text-white text-sm font-medium">
                    top element 
                    </li>
                    
                </ul>
                </fwbDropdown>
      `
    }),
    args: {
      placement: 'top',
      
    },

  }

  export const leftPlacement: Story = {
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
                    pill
                    square                
                    color="primary"
                >
                    <template #default>
                        Go Left
                    </template>
                    
                </FwbButton>
                </template>
                <ul>
                    <li v-for="i in 3" class="px-2 py-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-700 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-neutral-900 dark:text-white text-sm font-medium">
                    left element 
                    </li>
                    
                </ul>
                </fwbDropdown>
      `
    }),
    args: {
      placement: 'left',
      
    },
  }

  export const RightPlacement: Story = {
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
                    pill
                    square              
                    color="terciary"
                >
                    <template #default>
                        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                        </svg>
                    </template>
                    
                </FwbButton>
                </template>
                <ul>
                    <li v-for="i in 3" class="px-2 py-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-700 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-neutral-900 dark:text-white text-sm font-medium">
                    right element 
                    </li>
                    
                </ul>
                </fwbDropdown>
      `
    }),
    args: {
      placement: 'right',
      
    },
  }
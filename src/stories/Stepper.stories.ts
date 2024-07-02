import type { Meta, StoryObj } from '@storybook/vue3'
import {ref} from 'vue'
//import Button from './Button.vue'
import Stepper from '@/components/FwbStepper/Stepper.vue'
import FwbStepper from '@/components/FwbStepper/FwbStepper.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Stepper',
  component: FwbStepper,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {}
} satisfies Meta<typeof FwbStepper>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

 export const Progress: Story = {
  args: {}
 }

 export const Form: Story = {
  render: (args) => ({
    components: { FwbStepper, FwbButton },
    setup() {
      const items = ref([
        {
            icon: 'ticket',
            completed: false,
        },
        {
            icon: 'ticket',
            completed: false,
        },
        {
          icon: 'ticket',
          completed: false,
        },
        {
            icon: 'completedReport',
            completed: false,
        }
    ])

    const index = ref(1);
    
    function handleSteps (){
      if(index.value === items.value.length)
        return
      items.value[index.value].completed = true;
      index.value ++
    } 

      return { items, handleSteps, index }
    },
    template: `            
        <div class="w-full p-3 flex flex-col items-center">
          <FwbStepper :steps="items"/>
          <div class="w-full flex flex-col h-[350px]">
            <div class=" h-[300px] flex flex-col justify-center text-center gap-6 items-start">
            <span class="text-white">content of Step {{index}}</span>
            <FwbButton color="primary" @click="handleSteps">
            <span>Next</span>
            </FwbButton>
            </div>
            
          </div>
          
        </div>
    `
  }),
  args: {
    
  }
}

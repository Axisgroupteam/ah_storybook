import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
//import Button from './Button.vue'
import Stepper from '@/components/FwbStepper/Stepper.vue'
import FwbStepper from '@/components/FwbStepper/FwbStepper.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the stepper component to show the number of steps required to complete a form inside your application.
 *
 * The stepper component can be used to show a numbered list of steps next to a form component to indicate the progress and number of steps that are required to complete and submit the form data.
 */
const meta = {
  title: 'Example/StepperX',
  component: FwbStepper,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbStepper>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * This example can be used to show the progress of the stepper component based only on icons.
 */
export const Progress: Story = {
  args: {}
}

/**
 * Use this example to show the stepper component next to a form layout and change the content based on which currently step you are completing.
 */
export const Form: Story = {
  render: (args) => ({
    components: { FwbStepper, FwbButton },
    setup() {
      const items = ref([
        {
          icon: 'home',
          completed: true
        },
        {
          icon: 'ticket',
          completed: false
        },

        {
          icon: 'completedReport',
          completed: false
        }
      ])

      const index = ref(1)

      function handleStepsForward() {
        if (index.value === items.value.length) return
        items.value[index.value].completed = true
        // items.value[index.value].icon = 'checked';
        index.value++
      }

      function handleStepsBack() {
        if (index.value === 1) return
        index.value--
        items.value[index.value].completed = false
        // items.value[index.value].icon = 'ticket';
      }

      return { items, handleStepsForward, handleStepsBack, index }
    },
    template: `            
        <div class="w-full pb-0 flex flex-col items-center">
          <FwbStepper :steps="items"/>
          <div class="w-full flex flex-col ">
            <div class="w-full h-[100px] flex flex-col justify-center text-center gap-6 items-center">
            <span class="text-black dark:text-white ">Content of Step {{index}}</span>
            
            </div>
            <div class="w-full flex gap-4 ">
              <FwbButton color="secondary" class="w-[80px]"  @click="handleStepsBack">
              <span>{{ index === 1 ? 'Cancel'  : ' Prev '}}</span>
              </FwbButton>
            
              <FwbButton color="primary" class="w-[80px]" @click="handleStepsForward">
              <span>{{ index === items.length  ? 'Finish'  : ' Next '}}</span>
              </FwbButton>
            </div>
          </div>
          
        </div>
    `
  }),
  args: {}
}

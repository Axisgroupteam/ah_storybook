import type { Meta, StoryObj } from '@storybook/vue3'
import FwbIndicator from '@/components/FwbIndicators/FwbIndicator.vue'

/**
 * Use the indicator component to show a number count, account status, or as a label.
 *
 * The indicator component can be used as a small element positioned absolutely relative to another component such as a button or card and show a number count, account status (red for offline, green for online) and other useful information.
 */
const meta = {
  title: 'Example/IndicatorX',
  component: FwbIndicator,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbIndicator>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this example to create a simple indicator with multiple colors and position it anywhere on the website.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbIndicator },
    setup() {
      return { args }
    },
    template: `
        <FwbIndicator color="neutral" />        
        <FwbIndicator color="dark" />        
        <FwbIndicator color="blue" />        
        <FwbIndicator color="green" />        
        <FwbIndicator color="red" />        
        <FwbIndicator color="purple" />        
        <FwbIndicator color="indigo" />        
        <FwbIndicator color="yellow" />        
        <FwbIndicator color="teal" />                
      `
  }),
  decorators: [
    () => ({
      template: `<div class="w-full flex justify-start items-center gap-2">        
      <story />
    </div>`
    })
  ],
  args: {}
}

/**
 * This example can be used as a legend indicator for charts to also add a text next to the bullet point.
 */
export const Text: Story = {
  render: (args) => ({
    components: { FwbIndicator },
    setup() {
      return { args }
    },
    template: `
        <FwbIndicator variant="with-text" color="blue">Blue</FwbIndicator>
        <FwbIndicator variant="with-text" color="red">Red</FwbIndicator>
        <FwbIndicator variant="with-text" color="green">Green</FwbIndicator>        
        `
  }),
  decorators: [
    () => ({
      template: `<div class="w-full flex justify-start items-center gap-2">        
        <story />
      </div>`
    })
  ],
  args: {}
}

/**
 * This example can be used to show a number count inside the indicator and position it relative to a button or other component.
 */
export const Count: Story = {
  render: (args) => ({
    components: { FwbIndicator },
    setup() {
      return { args }
    },
    template: `
          <FwbIndicator variant="contained-text" color="blue">8</FwbIndicator>          
          <FwbIndicator variant="contained-text" color="red">8</FwbIndicator>          
          <FwbIndicator variant="contained-text" color="green">8</FwbIndicator>          
          `
  }),
  decorators: [
    () => ({
      template: `<div class="w-full flex justify-start items-center gap-2">        
          <story />
        </div>`
    })
  ],
  args: {}
}

/**
 * This example can be used to add an indicator inside of a badge component.
 */
export const Badge: Story = {
  render: (args) => ({
    components: { FwbIndicator },
    setup() {
      return { args }
    },
    template: `
            <FwbIndicator variant="pill" color="blue">Blue</FwbIndicator>          
            <FwbIndicator variant="pill" color="red">Red</FwbIndicator>          
            <FwbIndicator variant="pill" color="green">Green</FwbIndicator>          
            
            `
  }),
  decorators: [
    () => ({
      template: `<div class="w-full flex justify-start items-center gap-2">        
            <story />
          </div>`
    })
  ],
  args: {}
}

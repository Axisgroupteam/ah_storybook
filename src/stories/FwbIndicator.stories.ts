import type { Meta, StoryObj } from '@storybook/vue3'
import FwbIndicator from '@/components/FwbIndicators/FwbIndicator.vue'

const meta = {
  title: 'Example/FwbIndicator',
  component: FwbIndicator,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbIndicator>

export default meta
type Story = StoryObj<typeof meta>

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

export const WithText: Story = {
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

export const Pill: Story = {
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

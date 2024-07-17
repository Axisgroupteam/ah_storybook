import type { Meta, StoryObj } from '@storybook/vue3'
import AreaChart from '@/components/FwbCharts/Area/AreaChart.vue'

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaX',
  component: AreaChart,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-6 w-full flex justify-center items-center">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof AreaChart>

export const Default: Story = {
  args: {}
}

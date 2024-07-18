import type { Meta, StoryObj } from '@storybook/vue3'
import DonutChart from '@/components/FwbCharts/Donut/DonutChart.vue'

const meta: Meta<typeof DonutChart> = {
  title: 'Charts/DonutX',
  component: DonutChart,
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
type Story = StoryObj<typeof DonutChart>

export const Default: Story = {
  args: {}
}

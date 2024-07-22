import type { Meta, StoryObj } from '@storybook/vue3'
import PieChart from '@/components/FwbCharts/Pie/PieChart.vue'

/**
 * Use the pie chart and graph component to create a pie chart with multiple data series.
 *
 * This is a pie chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 */
const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieX',
  component: PieChart,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-6 w-full flex justify-center items-center ">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof PieChart>

export const Default: Story = {
  args: {}
}

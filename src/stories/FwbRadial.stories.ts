import type { Meta, StoryObj } from '@storybook/vue3'
import RadialChart from '@/components/FwbCharts/Radial/RadialChart.vue'

/**
 * Use the radial chart and graph component to create a radial chart with multiple data entries.
 *
 * This is a radial chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 *
 */
const meta: Meta<typeof RadialChart> = {
  title: 'Charts/RadialX',
  component: RadialChart,
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
type Story = StoryObj<typeof RadialChart>

export const Default: Story = {
  args: {}
}

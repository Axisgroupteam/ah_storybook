import type { Meta, StoryObj } from '@storybook/vue3'
import PieChart from '@/components/FwbCharts/Pie/PieChart.vue'

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieX',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof PieChart>

export const Default: Story = {
  args: {}
}

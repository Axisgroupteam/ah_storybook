import type { Meta, StoryObj } from '@storybook/vue3'
import BarChart from '@/components/FwbCharts/Bar/BarChart.vue'

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarX',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof BarChart>

export const Default: Story = {
  args: {}
}

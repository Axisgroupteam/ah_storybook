import type { Meta, StoryObj } from '@storybook/vue3'
import LineChart from '@/components/FwbCharts/Line/LineChart.vue'

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineX',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: {}
}

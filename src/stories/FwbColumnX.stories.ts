import type { Meta, StoryObj } from '@storybook/vue3'
import ColumnChart from '@/components/FwbCharts/Column/ColumnChart.vue'

const meta: Meta<typeof ColumnChart> = {
  title: 'Charts/ColumnX',
  component: ColumnChart,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof ColumnChart>

export const Default: Story = {
  args: {}
}

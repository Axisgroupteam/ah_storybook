import type { Meta, StoryObj } from '@storybook/vue3'
import RadialChart from '@/components/FwbCharts/Radial/RadialChart.vue'

const meta: Meta<typeof RadialChart> = {
  title: 'Charts/RadialX',
  component: RadialChart,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof RadialChart>

export const Default: Story = {
  args: {}
}

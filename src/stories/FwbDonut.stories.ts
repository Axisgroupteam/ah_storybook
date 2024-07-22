import type { Meta, StoryObj } from '@storybook/vue3'
import DonutChart from '@/components/FwbCharts/Donut/DonutChart.vue'
import { ref } from 'vue'

/**
 * Use the donut chart and graph component to create a donut chart.
 *
 * This is a donut chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 */
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
  render: (args) => ({
    components: { DonutChart },
    setup() {
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
      }

      const chartData = ref({
        totalReports: 0,
        ticketsCount: 0,
        issuesCount: 0,
        percentageIncrease: 0,
        labels: [],
        series: []
      })

      const fetchData = async (range) => {
        const today = new Date()
        let newLabels, newSeries, start, end

        switch (range) {
          case 'Yesterday':
            start = new Date(today)
            start.setDate(start.getDate() - 1)
            start.setHours(0, 0, 0, 0)
            end = new Date(start)
            end.setHours(23, 59, 59, 999)
            newLabels = ['Open', 'Working', 'Pending', 'Complete']
            newSeries = [30, 25, 15, 30]
            break
          case 'Today':
            start = new Date(today)
            start.setHours(0, 0, 0, 0)
            end = new Date(today)
            newLabels = ['Open', 'Working', 'Pending', 'Complete']
            newSeries = [35, 20, 20, 25]
            break
          case 'Last 7 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 6)
            newLabels = ['Open', 'Working', 'Pending', 'Complete']
            newSeries = [200, 150, 100, 180]
            break
          case 'Last 30 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 29)
            newLabels = ['Open', 'Working', 'Pending', 'Complete']
            newSeries = [800, 600, 400, 700]
            break
          case 'Last 90 days':
            end = new Date(today)
            start = new Date(today)
            start.setMonth(start.getMonth() - 2)
            start.setDate(1)
            newLabels = ['Open', 'Working', 'Pending', 'Complete']
            newSeries = [2400, 1800, 1200, 2100]
            break
          default:
            newLabels = chartData.value.labels
            newSeries = chartData.value.series
        }

        // Simular una llamada API
        await new Promise((resolve) => setTimeout(resolve, 500))

        const totalReports = newSeries.reduce((sum, value) => sum + value, 0)
        const ticketsCount = newSeries[0]
        const issuesCount = newSeries[1]
        const percentageIncrease = (
          ((totalReports - chartData.value.totalReports) / chartData.value.totalReports) *
          100
        ).toFixed(1)

        const newChartData = {
          totalReports,
          ticketsCount,
          issuesCount,
          percentageIncrease,
          labels: newLabels,
          series: newSeries
        }

        chartData.value = newChartData
        return newChartData
      }

      const generateReport = (range) => {
        console.log(`Generating report analysis for ${range}`)
      }

      const initialData = async () => {
        await fetchData('Last 7 days')
      }

      initialData()

      return { args, chartData, fetchData, generateReport }
    },
    template: `
      <DonutChart 
        :initialData="chartData"
        @fetch-data="fetchData"
        @generate-report="generateReport"
      />
    `
  }),
  args: {}
}

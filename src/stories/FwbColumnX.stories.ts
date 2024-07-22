import type { Meta, StoryObj } from '@storybook/vue3'
import ColumnChart from '@/components/FwbCharts/Column/ColumnChart.vue'
import { ref } from 'vue'

/**
 * Use the column chart and graph component to represent multiple data entries using columns.
 *
 * This is a column chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 */

const meta: Meta<typeof ColumnChart> = {
  title: 'Charts/ColumnX',
  component: ColumnChart,
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
type Story = StoryObj<typeof ColumnChart>

export const Default: Story = {
  render: (args) => ({
    components: { ColumnChart },
    setup() {
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
      }

      function formatMonth(date) {
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        return `${month} ${year}`
      }

      function getDatesInRange(start, end) {
        const dates = []
        const currentDate = new Date(start)
        while (currentDate <= end) {
          dates.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
        return dates
      }

      const chartData = ref({
        totalExpenses: 0,
        vehiclesExpenses: 0,
        trailersExpenses: 0,
        percentageIncrease: 0,
        labels: [],
        vehiclesData: [],
        trailersData: []
      })

      const fetchData = async (range) => {
        const today = new Date()
        let newLabels, newVehiclesData, newTrailersData, start, end

        switch (range) {
          case 'Yesterday':
            start = new Date(today)
            start.setDate(start.getDate() - 1)
            start.setHours(0, 0, 0, 0)
            end = new Date(start)
            end.setHours(23, 59, 59, 999)
            newLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59']
            newVehiclesData = [300, 350, 450, 550, 500, 450, 400]
            newTrailersData = [200, 250, 300, 350, 300, 250, 250]
            break
          case 'Today':
            start = new Date(today)
            start.setHours(0, 0, 0, 0)
            end = new Date(today)
            newLabels = [
              '00:00',
              '04:00',
              '08:00',
              '12:00',
              '16:00',
              '20:00',
              `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`
            ]
            newVehiclesData = [350, 400, 500, 600, 550, 500, 450]
            newTrailersData = [200, 250, 300, 350, 300, 250, 250]
            break
          case 'Last 7 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 6)
            newLabels = getDatesInRange(start, end).map((date) => formatDate(date))
            newVehiclesData = [2000, 1950, 2100, 2200, 2050, 2150, 2100]
            newTrailersData = [1250, 1259, 1128, 1063, 1128, 1078, 1150]
            break
          case 'Last 30 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 29)
            newLabels = []
            for (let i = 0; i < 5; i++) {
              const date = new Date(start)
              date.setDate(date.getDate() + i * 7)
              newLabels.push(formatDate(date))
            }
            newVehiclesData = [8000, 8500, 9000, 9500, 5000]
            newTrailersData = [4500, 4500, 4500, 4500, 2500]
            break
          case 'Last 90 days':
            end = new Date(today)
            start = new Date(today)
            start.setMonth(start.getMonth() - 2)
            start.setDate(1)
            newLabels = []
            for (let i = 0; i < 3; i++) {
              const date = new Date(start)
              date.setMonth(date.getMonth() + i)
              newLabels.push(formatMonth(date))
            }
            newVehiclesData = [25000, 27500, 10000]
            newTrailersData = [15000, 15000, 5000]
            break
          default:
            newLabels = chartData.value.labels
            newVehiclesData = chartData.value.vehiclesData
            newTrailersData = chartData.value.trailersData
        }

        // Simular una llamada API
        await new Promise((resolve) => setTimeout(resolve, 500))

        const totalVehiclesExpenses = newVehiclesData.reduce((sum, value) => sum + value, 0)
        const totalTrailersExpenses = newTrailersData.reduce((sum, value) => sum + value, 0)
        const totalExpenses = totalVehiclesExpenses + totalTrailersExpenses
        const vehiclesExpenses = newVehiclesData[newVehiclesData.length - 1]
        const trailersExpenses = newTrailersData[newTrailersData.length - 1]
        const percentageIncrease = (
          ((vehiclesExpenses + trailersExpenses - newVehiclesData[0] - newTrailersData[0]) /
            (newVehiclesData[0] + newTrailersData[0])) *
          100
        ).toFixed(1)

        const newChartData = {
          totalExpenses,
          vehiclesExpenses,
          trailersExpenses,
          percentageIncrease,
          labels: newLabels,
          vehiclesData: newVehiclesData,
          trailersData: newTrailersData
        }

        chartData.value = newChartData
        return newChartData
      }

      const generateReport = (range) => {
        console.log(`Generating expenses report for ${range}`)
      }

      const initialData = async () => {
        await fetchData('Last 7 days')
      }

      initialData()

      return { args, chartData, fetchData, generateReport }
    },
    template: `
      <ColumnChart 
        :initialData="chartData"
        @fetch-data="fetchData"
        @generate-report="generateReport"
      />
    `
  }),
  args: {}
}

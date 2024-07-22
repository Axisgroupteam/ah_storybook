import type { Meta, StoryObj } from '@storybook/vue3'
import BarChart from '@/components/FwbCharts/Bar/BarChart.vue'
import { ref } from 'vue'

/**
 * Use the bar chart and graph component to create a horizontal bar chart with as many data series as you like.
 *
 * This is a bar chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 */
const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarX',
  component: BarChart,
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
type Story = StoryObj<typeof BarChart>

export const Default: Story = {
  render: (args) => ({
    components: { BarChart },
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
        totalCosts: 0,
        laborCosts: 0,
        partCosts: 0,
        percentageIncrease: 0,
        labels: [],
        laborCostsData: [],
        partCostsData: []
      })

      const fetchData = async (range) => {
        const today = new Date()
        let newLabels, newLaborCostsData, newPartCostsData, start, end

        switch (range) {
          case 'Yesterday':
            start = new Date(today)
            start.setDate(start.getDate() - 1)
            start.setHours(0, 0, 0, 0)
            end = new Date(start)
            end.setHours(23, 59, 59, 999)
            newLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59']
            newLaborCostsData = [500, 600, 750, 900, 800, 700, 650]
            newPartCostsData = [400, 450, 500, 550, 500, 450, 400]
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
            newLaborCostsData = [550, 650, 800, 950, 850, 750, 700]
            newPartCostsData = [450, 500, 550, 600, 550, 500, 450]
            break
          case 'Last 7 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 6)
            newLabels = getDatesInRange(start, end).map((date) => formatDate(date))
            newLaborCostsData = [3250, 3209, 3228, 3263, 3178, 3228, 3250]
            newPartCostsData = [2600, 2567, 2582, 2610, 2542, 2582, 2600]
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
            newLaborCostsData = [12500, 13000, 13500, 14000, 7500]
            newPartCostsData = [10000, 10400, 10800, 11200, 6000]
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
            newLaborCostsData = [40000, 42500, 15000]
            newPartCostsData = [32000, 34000, 12000]
            break
          default:
            newLabels = chartData.value.labels
            newLaborCostsData = chartData.value.laborCostsData
            newPartCostsData = chartData.value.partCostsData
        }

        // Simular una llamada API
        await new Promise((resolve) => setTimeout(resolve, 500))

        const totalLaborCosts = newLaborCostsData.reduce((sum, value) => sum + value, 0)
        const totalPartCosts = newPartCostsData.reduce((sum, value) => sum + value, 0)
        const totalCosts = totalLaborCosts + totalPartCosts
        const percentageIncrease = (
          ((newLaborCostsData[newLaborCostsData.length - 1] +
            newPartCostsData[newPartCostsData.length - 1] -
            (newLaborCostsData[0] + newPartCostsData[0])) /
            (newLaborCostsData[0] + newPartCostsData[0])) *
          100
        ).toFixed(2)

        const newChartData = {
          totalCosts,
          laborCosts: totalLaborCosts,
          partCosts: totalPartCosts,
          percentageIncrease,
          labels: newLabels,
          laborCostsData: newLaborCostsData,
          partCostsData: newPartCostsData
        }

        chartData.value = newChartData
        return newChartData
      }

      const generateReport = (range) => {
        console.log(`Generating cost report for ${range}`)
      }

      const initialData = async () => {
        await fetchData('Last 7 days')
      }

      initialData()

      return { args, chartData, fetchData, generateReport }
    },
    template: `
      <BarChart 
        :initialData="chartData"
        @fetch-data="fetchData"
        @generate-report="generateReport"
      />
    `
  }),
  args: {}
}

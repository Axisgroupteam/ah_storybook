import type { Meta, StoryObj } from '@storybook/vue3'
import LineChart from '@/components/FwbCharts/Line/LineChart.vue'
import { ref } from 'vue'

/**
 * Use the line chart and graph component to create a double line chart.
 *
 * Description: This is a line chart type that can help you visualize complex data inside graphs in admin dashboard layouts, analytics, diagrams, and more.
 */

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineX',
  component: LineChart,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-6 flex justify-center items-center w-full">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  render: (args) => ({
    components: { LineChart },
    setup() {
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
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
          case 'Last 7 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 6)
            newLabels = getDatesInRange(start, end).map((date) => formatDate(date))
            newLaborCostsData = [3250, 3209, 3228, 3263, 3178, 3228, 3250]
            newPartCostsData = [2600, 2567, 2582, 2610, 2542, 2582, 2600]
            break
          // Add more cases for other time ranges as needed
          default:
            newLabels = chartData.value.labels
            newLaborCostsData = chartData.value.laborCostsData
            newPartCostsData = chartData.value.partCostsData
        }

        // Simulate API call
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
      <LineChart 
        :initialData="chartData"
        @fetch-data="fetchData"
        @generate-report="generateReport"
      />
    `
  }),
  args: {}
}

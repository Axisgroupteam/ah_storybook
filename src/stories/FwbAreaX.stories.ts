import type { Meta, StoryObj } from '@storybook/vue3'
import AreaChart from '@/components/FwbCharts/Area/AreaChart.vue'
import { ref } from 'vue'

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaX',
  component: AreaChart,
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
type Story = StoryObj<typeof AreaChart>

export const Default: Story = {
  render: (args) => ({
    components: { AreaChart },
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
        let currentDate = new Date(start)
        while (currentDate <= end) {
          dates.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
        return dates
      }

      const chartData = ref({
        totalCount: 0,
        percentageIncrease: 0,
        labels: [],
        data: []
      })

      const fetchData = async (range) => {
        const today = new Date()
        let newLabels, newData, start, end

        switch (range) {
          case 'Yesterday':
            start = new Date(today)
            start.setDate(start.getDate() - 1)
            start.setHours(0, 0, 0, 0)
            end = new Date(start)
            end.setHours(23, 59, 59, 999)
            newLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59']
            newData = [1000, 1200, 1500, 1800, 1600, 1400, 1300]
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
            newData = [1100, 1300, 1600, 1900, 1700, 1500, 1400]
            break
          case 'Last 7 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 6)
            newLabels = getDatesInRange(start, end).map((date) => formatDate(date))
            newData = [6500, 6418, 6456, 6526, 6356, 6456, 6500]
            break
          case 'Last 30 days':
            end = new Date(today)
            start = new Date(today)
            start.setDate(start.getDate() - 29)
            newLabels = []
            for (let i = 0; i < 5; i++) {
              let date = new Date(start)
              date.setDate(date.getDate() + i * 7)
              newLabels.push(formatDate(date))
            }
            newData = [25000, 26000, 27000, 28000, 15000]
            break
          case 'Last 90 days':
            end = new Date(today)
            start = new Date(today)
            start.setMonth(start.getMonth() - 2)
            start.setDate(1)
            newLabels = []
            for (let i = 0; i < 3; i++) {
              let date = new Date(start)
              date.setMonth(date.getMonth() + i)
              newLabels.push(formatMonth(date))
            }
            newData = [80000, 85000, 30000]
            break
          default:
            newLabels = chartData.value.labels
            newData = chartData.value.data
        }

        // Simular una llamada API
        await new Promise((resolve) => setTimeout(resolve, 500))

        const totalCount = newData.reduce((sum, value) => sum + value, 0)
        const percentageIncrease = (
          ((newData[newData.length - 1] - newData[0]) / newData[0]) *
          100
        ).toFixed(2)

        const newChartData = {
          totalCount,
          percentageIncrease,
          labels: newLabels,
          data: newData
        }

        chartData.value = newChartData
        return newChartData
      }

      const generateReport = (range) => {
        console.log(`Generating report for ${range}`)
      }

      const initialData = async () => {
        await fetchData('Last 7 days')
      }

      initialData()

      return { args, chartData, fetchData, generateReport }
    },
    template: `
      <AreaChart 
        :initialData="chartData"
        @fetch-data="fetchData"
        @generate-report="generateReport"
      />
      `
  }),
  args: {}
}

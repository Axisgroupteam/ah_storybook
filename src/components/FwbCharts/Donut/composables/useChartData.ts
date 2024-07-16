import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [35.1, 23.5, 2.4, 5.4]
  })

  const updateChartSeries = (newSeries) => {
    chartData.series = newSeries
  }

  return { chartData, updateChartSeries }
}

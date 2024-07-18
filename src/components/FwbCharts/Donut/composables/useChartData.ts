import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [45, 36, 70, 74]
  })

  const updateChartSeries = (newSeries) => {
    chartData.series = newSeries
  }

  return { chartData, updateChartSeries }
}

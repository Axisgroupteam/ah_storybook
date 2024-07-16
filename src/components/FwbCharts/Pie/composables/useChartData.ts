import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [52.8, 26.8, 20.4]
  })

  return { chartData }
}

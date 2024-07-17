import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [70, 85, 90]
  })

  return { chartData }
}

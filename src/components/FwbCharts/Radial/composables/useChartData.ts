import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [90, 85, 70]
  })

  return { chartData }
}

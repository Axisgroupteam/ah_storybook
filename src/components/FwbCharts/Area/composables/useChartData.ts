import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    name: 'New users',
    data: [6500, 6418, 6456, 6526, 6356, 6456],
    color: '#1A56DB'
  })

  return { chartData }
}

import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive([
    {
      name: 'Clicks',
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: '#1A56DB'
    },
    {
      name: 'CPC',
      data: [6456, 6356, 6526, 6332, 6418, 6500],
      color: '#7E3AF2'
    }
  ])

  return { chartData }
}

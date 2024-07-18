import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [
      {
        name: 'Labor Costs',
        color: '#ef4444',
        data: ['1420', '1620', '1820', '1420', '1650', '2120']
      },
      {
        name: 'Part Costs',
        data: ['788', '810', '866', '788', '1100', '1200'],
        color: '#f59e0b'
      }
    ]
  })

  return { chartData }
}

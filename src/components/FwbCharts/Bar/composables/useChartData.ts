import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [
      {
        name: 'Income',
        color: '#31C48D',
        data: ['1420', '1620', '1820', '1420', '1650', '2120']
      },
      {
        name: 'Expense',
        data: ['788', '810', '866', '788', '1100', '1200'],
        color: '#F05252'
      }
    ]
  })

  return { chartData }
}

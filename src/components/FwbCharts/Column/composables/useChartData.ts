import { reactive } from 'vue'

export function useChartData() {
  const chartData = reactive({
    series: [
      {
        name: 'Vehicles',
        color: '#ef4444',
        data: [
          { x: 'Mon', y: 231 },
          { x: 'Tue', y: 122 },
          { x: 'Wed', y: 63 },
          { x: 'Thu', y: 421 },
          { x: 'Fri', y: 122 },
          { x: 'Sat', y: 323 },
          { x: 'Sun', y: 111 }
        ]
      },
      {
        name: 'Trailers',
        color: '#f59e0b',
        data: [
          { x: 'Mon', y: 232 },
          { x: 'Tue', y: 113 },
          { x: 'Wed', y: 341 },
          { x: 'Thu', y: 224 },
          { x: 'Fri', y: 522 },
          { x: 'Sat', y: 411 },
          { x: 'Sun', y: 243 }
        ]
      }
    ]
  })
  return { chartData }
}

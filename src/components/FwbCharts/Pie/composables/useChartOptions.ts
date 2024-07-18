import { reactive } from 'vue'

export function useChartOptions() {
  const options = reactive({
    colors: ['#a855f7', '#6366f1', '#0ea5e9', '#14b8a6', '#22c55e'],
    chart: {
      height: 420,
      width: '100%',
      type: 'pie'
    },
    stroke: {
      colors: ['white'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        labels: {
          show: true
        },
        size: '100%',
        dataLabels: {
          offset: -25
        }
      }
    },
    labels: ['Brakes', 'Air', 'Tire', 'Electrical', 'Engine'],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%'
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '%'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  })

  return { options }
}

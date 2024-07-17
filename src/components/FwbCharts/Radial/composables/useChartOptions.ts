import { reactive } from 'vue'

export function useChartOptions() {
  const options = reactive({
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
    chart: {
      height: '380px',
      width: '100%',
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB'
        },
        dataLabels: {
          show: false
        },
        hollow: {
          margin: 0,
          size: '32%'
        }
      }
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20
      }
    },
    labels: ['By days', 'By trucks', 'By customers'],
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      }
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return value + '%'
        }
      }
    }
  })

  return { options }
}

import { reactive } from 'vue'

export function useChartOptions() {
  const options = reactive({
    colors: ['#a855f7', '#3b82f6', '#eab308', '#22c55e'],
    chart: {
      height: 320,
      width: '100%',
      type: 'donut'
    },
    stroke: {
      colors: ['transparent'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Reports',
              fontFamily: 'Inter, sans-serif',
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
                return sum
              }
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value) {
                return value
              }
            }
          },
          size: '80%'
        }
      }
    },
    grid: {
      padding: {
        top: -2
      }
    },
    labels: ['Open', 'Working', 'Pending', 'Completed'],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value
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

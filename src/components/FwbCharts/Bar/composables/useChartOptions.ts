import { reactive } from 'vue'

export function useChartOptions() {
  const options = reactive({
    chart: {
      sparkline: {
        enabled: false
      },
      type: 'bar',
      width: '100%',
      height: 400,
      toolbar: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        borderRadiusApplication: 'end',
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
        return '$' + value
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function (value) {
          return '$' + value
        }
      },
      categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      }
    }
  })

  return { options }
}

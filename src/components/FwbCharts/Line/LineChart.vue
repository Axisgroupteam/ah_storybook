<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-5">
      <div class="flex justify-between items-center w-full">
        <MetricBox title="Income by Trucks" value="$42,3k" :popoverId="'clicks-info'" />
        <MetricBox title="Income by Customers" value="$5,40k" :popoverId="'cpc-info'" />
        <FwbButton color="secondary" square class="border-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4C11.1046 4 12 3.10457 12 2C12 0.895431 11.1046 0 10 0C8.89543 0 8 0.895431 8 2C8 3.10457 8.89543 4 10 4Z"
              fill="currentColor"
            />
            <path
              d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
              fill="currentColor"
            />
            <path
              d="M10 20C11.1046 20 12 19.1046 12 18C12 16.8954 11.1046 16 10 16C8.89543 16 8 16.8954 8 18C8 19.1046 8.89543 20 10 20Z"
              fill="currentColor"
            />
          </svg>
        </FwbButton>
      </div>
    </div>
    <div ref="chartContainer" id="line-chart"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5"
    >
      <div class="pt-5 flex justify-between items-center">
        <TimeRangeDropdown />

        <FwbButton color="terciary" class="whitespace-nowrap">
          Incomes Report
          <template #suffix>
            <svg
              class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </template>
        </FwbButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import MetricBox from './MetricBox.vue'
import TimeRangeDropdown from './TimeRangeDropdown.vue'
import { useChartData } from './composables/useChartData'
import { useChartOptions } from './composables/useChartOptions'
import { initFlowbite } from 'flowbite'
import ApexCharts from 'apexcharts'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

const chartContainer = ref(null)
let chartInstance = null

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const { options } = useChartOptions()
  const { chartData } = useChartData()

  // Desactivar animación inicial
  options.chart = {
    ...options.chart
  }
  options.series = chartData

  if (chartContainer.value) {
    chartInstance = new ApexCharts(chartContainer.value, options)
    chartInstance.render()
  }
}

onMounted(() => {
  initFlowbite()
  renderChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

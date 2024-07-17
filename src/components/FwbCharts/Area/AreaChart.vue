<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6">
    <div class="flex justify-between">
      <div>
        <h5 class="leading-none text-3xl font-bold text-neutral-900 dark:text-white pb-2">
          {{ usersCount }}
        </h5>
        <p class="text-base font-normal text-neutral-500 dark:text-neutral-400">
          Total Work Orders
        </p>
      </div>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center"
      >
        {{ percentageIncrease }}
        <svg
          class="w-3 h-3 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13V1m0 0L1 5m4-4 4 4"
          />
        </svg>
      </div>
    </div>
    <div ref="chartContainer" id="area-chart"></div>
    <div
      class="grid grid-cols-1 items-center border-neutral-200 border-t dark:border-neutral-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <TimeRangeDropdown />
        <FwbButton color="terciary" class="whitespace-nowrap">
          Work Orders Report
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
import TimeRangeDropdown from './TimeRangeDropdown.vue'
import { useChartData } from './composables/useChartData'
import { useChartOptions } from './composables/useChartOptions'
import { initFlowbite } from 'flowbite'
import ApexCharts from 'apexcharts'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

const usersCount = ref('32.4k')
const percentageIncrease = ref('12%')
const chartContainer = ref(null)
let chartInstance = null

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const { options } = useChartOptions()
  const { chartData } = useChartData()

  options.chart = {
    ...options.chart
  }
  options.series = [chartData]

  if (chartContainer.value) {
    chartInstance = new ApexCharts(chartContainer.value, options)
    chartInstance.render()
  }
}

const updateChartData = () => {
  const { chartData } = useChartData()
  // Simulate data update
  chartData.data = chartData.data.map((data) => data + Math.floor(Math.random() * 10 - 5))
  renderChart()
}

onMounted(() => {
  initFlowbite()
  renderChart()
  // Simulate real-time data update
  //setInterval(updateChartData, 5000)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped></style>

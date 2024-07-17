<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Costs</dt>
        <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">$41,865</dd>
      </dl>
      <div>
        <span
          class="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-red-900 dark:text-red-300"
        >
          <svg
            class="w-2.5 h-2.5 me-1.5"
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
          Increase 23.5%
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 py-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Labor Costs</dt>
        <dd class="leading-none text-xl font-bold text-red-500 dark:text-red-500">$23,635</dd>
      </dl>
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Part Costs</dt>
        <dd class="leading-none text-xl font-bold text-amber-500 dark:text-amber-500">$18,230</dd>
      </dl>
    </div>

    <div id="bar-chart" ref="chartContainer"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <!-- Button -->

        <!-- Dropdown menu -->
        <TimeRangeDropdown />
        <FwbButton color="terciary" class="whitespace-nowrap">
          Cost Report
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
import { useChartData } from './composables/useChartData'
import { useChartOptions } from './composables/useChartOptions'
import { initFlowbite } from 'flowbite'
import ApexCharts from 'apexcharts'
import TimeRangeDropdown from './TimeRangeDropdown.vue'
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
  options.series = chartData.series

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

<style scoped></style>

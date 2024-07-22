<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6">
    <div class="flex justify-between">
      <div>
        <h5 class="leading-none text-3xl font-bold text-neutral-900 dark:text-white pb-2">
          {{ formattedTotalCount }}
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
        <TimeRangeDropdown :selected-range="selectedRange" @range-changed="handleRangeChange" />
        <FwbButton color="terciary" class="whitespace-nowrap" @click="generateReport">
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
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import TimeRangeDropdown from './TimeRangeDropdown.vue'
import { useChartOptions } from './composables/useChartOptions'
import { initFlowbite } from 'flowbite'
import ApexCharts from 'apexcharts'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

const props = defineProps({
  initialData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['fetch-data', 'generate-report'])

const chartData = ref(props.initialData)
const selectedRange = ref('Last 7 days')
const chartContainer = ref(null)
let chartInstance = null

const formattedTotalCount = computed(() => {
  const count = chartData.value.totalCount
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()
})

const percentageIncrease = computed(() => {
  return `${chartData.value.percentageIncrease}%`
})

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const { options } = useChartOptions()
  options.xaxis.categories = chartData.value.labels
  options.series = [
    {
      name: 'New Work Orders',
      data: chartData.value.data,
      color: '#3b82f6'
    }
  ]

  if (chartContainer.value) {
    chartInstance = new ApexCharts(chartContainer.value, options)
    chartInstance.render()
  }
}

const handleRangeChange = async (newRange) => {
  selectedRange.value = newRange
  const newData = await emit('fetch-data', newRange)
  if (newData) {
    chartData.value = newData
    renderChart()
  }
}

const generateReport = () => {
  emit('generate-report', selectedRange.value)
}

watch(
  () => props.initialData,
  (newData) => {
    chartData.value = newData
    renderChart()
  },
  { deep: true }
)

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

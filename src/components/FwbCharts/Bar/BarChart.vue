<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Costs</dt>
        <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">
          {{ formattedTotalCosts }}
        </dd>
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
          Increase {{ percentageIncrease }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 py-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Labor Costs</dt>
        <dd class="leading-none text-xl font-bold text-red-500 dark:text-red-500">
          {{ formattedLaborCosts }}
        </dd>
      </dl>
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Part Costs</dt>
        <dd class="leading-none text-xl font-bold text-amber-500 dark:text-amber-500">
          {{ formattedPartCosts }}
        </dd>
      </dl>
    </div>

    <div id="bar-chart" ref="chartContainer"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <TimeRangeDropdown :selected-range="selectedRange" @range-changed="handleRangeChange" />
        <FwbButton color="terciary" class="whitespace-nowrap" @click="generateReport">
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
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import { useChartOptions } from './composables/useChartOptions'
import { initFlowbite } from 'flowbite'
import ApexCharts from 'apexcharts'
import TimeRangeDropdown from './TimeRangeDropdown.vue'
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

const formattedTotalCosts = computed(() => {
  return `$${chartData.value.totalCosts.toLocaleString()}`
})

const formattedLaborCosts = computed(() => {
  return `$${chartData.value.laborCosts.toLocaleString()}`
})

const formattedPartCosts = computed(() => {
  return `$${chartData.value.partCosts.toLocaleString()}`
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
      name: 'Labor Costs',
      data: chartData.value.laborCostsData,
      color: '#ef4444'
    },
    {
      name: 'Part Costs',
      data: chartData.value.partCostsData,
      color: '#f59e0b'
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

<style scoped></style>

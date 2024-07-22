<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center">
        <div
          class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3"
        >
          <svg
            class="w-6 h-6 text-neutral-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
            {{ formattedTotalExpenses }}
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Total Expenses</p>
        </div>
      </div>
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
          {{ percentageIncrease }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <dl class="flex items-center">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Vehicles:</dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">
          {{ formattedVehiclesExpenses }}
        </dd>
      </dl>
      <dl class="flex items-center justify-end">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Trailers:</dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">
          {{ formattedTrailersExpenses }}
        </dd>
      </dl>
    </div>

    <div id="column-chart" ref="chartContainer"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <TimeRangeDropdown :selected-range="selectedRange" @range-changed="handleRangeChange" />
        <FwbButton color="terciary" class="whitespace-nowrap" @click="generateReport">
          Expenses Report
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
import ApexCharts from 'apexcharts'
import { initFlowbite } from 'flowbite'
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

const formattedTotalExpenses = computed(() => {
  return `$${chartData.value.totalExpenses.toLocaleString()}`
})

const formattedVehiclesExpenses = computed(() => {
  return `$${chartData.value.vehiclesExpenses.toLocaleString()}`
})

const formattedTrailersExpenses = computed(() => {
  return `$${chartData.value.trailersExpenses.toLocaleString()}`
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
      name: 'Vehicles',
      data: chartData.value.vehiclesData,
      color: '#ef4444'
    },
    {
      name: 'Trailers',
      data: chartData.value.trailersData,
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

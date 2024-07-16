<template>
  <div>
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="lastDaysdropdown"
      data-dropdown-placement="bottom"
      class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
      type="button"
    >
      {{ selectedRange }}
      <svg
        class="w-2.5 m-2.5 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <div
      id="lastDaysdropdown"
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li v-for="range in timeRanges" :key="range">
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="selectRange(range)"
            >{{ range }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FwbDropdown from '@/components/FwbDropdown/FwbDropdown.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

const timeRanges = ['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days']
const selectedRange = ref('Last 7 days')

const selectRange = (range: string) => {
  selectedRange.value = range
}
</script>

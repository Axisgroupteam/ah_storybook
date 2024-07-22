<template>
  <div>
    <FwbDropdown placement="top" max_h="max-h-[200px]" @toggleVisibility="handleToogle">
      <template #trigger>
        <FwbButton color="secondary" class="whitespace-nowrap">
          {{ selectedRange }}
          <template #suffix>
            <div class="w-full flex justify-end">
              <svg
                :class="visible ? 'rotate-180' : 'rotate-0'"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </div>
          </template>
        </FwbButton>
      </template>

      <ul class="w-full">
        <li
          class="px-4 py-2 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium"
          v-for="range in timeRanges"
          :key="range"
        >
          <span href="#" @click="selectRange(range)">{{ range }}</span>
        </li>
      </ul>
    </FwbDropdown>
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="lastDaysdropdown"
      data-dropdown-placement="bottom"
      class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
      type="button"
      v-if="false"
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
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-full"
    >
      <ul class="w-full">
        <li v-for="range in timeRanges" :key="range">
          <div
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
            @click="selectRange(range)"
          >
            {{ range }}
          </div>
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

const visible = ref(false)

const handleToogle = () => {
  visible.value = !visible.value
}

const selectRange = (range: string) => {
  selectedRange.value = range
}
</script>

<template>
  <div>
    <FwbDropdown placement="top" max_h="max-h-[200px]" @toogle="handleToogle">
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
          v-for="range in timeRanges"
          :key="range"
          class="px-4 py-2 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium"
          @click="selectRange(range)"
        >
          <span>{{ range }}</span>
        </li>
      </ul>
    </FwbDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FwbDropdown from '@/components/FwbDropdown/FwbDropdown.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'

const props = defineProps({
  selectedRange: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['range-changed'])

const timeRanges = ['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days']
const visible = ref(false)

const handleToogle = () => {
  visible.value = !visible.value
}

const selectRange = (range: string) => {
  emit('range-changed', range)
}
</script>

<template>
  <div class="col-span-7 w-full text-neutral-900 dark:text-neutral-700 mb-2">
    <div class="h-[40px] w-full flex justify-between items-center">
      <FwbButton
        color="secondary"
        class="bg-white dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-600 hover:text-neutral-900 dark:hover:text-white text-lg border-0"
        square
        @click.stop="handlePrevClick"
      >
        <IconWrapper name="arrow-left" />
      </FwbButton>
      <div @click.stop="toggleYearState">
        <FwbButton
          v-if="yearState === 'month'"
          color="terciary"
          class="text-sm rounded-lg text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 font-semibold py-2.5 px-5 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          {{ shortMonthStr }} {{ calendarStore.getYear }}
        </FwbButton>
        <FwbButton
          v-else-if="yearState === 'year'"
          color="terciary"
          class="text-sm rounded-lg text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 font-semibold py-2.5 px-5 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          {{ calendarStore.getYear }}
        </FwbButton>
        <FwbButton
          v-else-if="yearState === 'decade'"
          color="terciary"
          class="text-sm rounded-lg text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 font-semibold py-2.5 px-5 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          {{ getDecade(calendarStore.getYear) }}
        </FwbButton>
        <FwbButton
          v-else
          color="terciary"
          class="text-sm rounded-lg text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 font-semibold py-2.5 px-5 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-200"
        >
          {{ getCentury(calendarStore.getYear) }}
        </FwbButton>
      </div>
      <FwbButton
        color="secondary"
        class="bg-white dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-600 hover:text-neutral-900 dark:hover:text-white text-lg border-0"
        square
        @click.stop="handleNextClick"
      >
        <IconWrapper name="arrow-left" class="rotate-180" />
      </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCalendarStore } from './calendar'
import IconWrapper from '@/components/IconWrapper.vue'
import FwbButton from '@/new_design/components/storybook/components/FwbButton/FwbButton.vue'

interface Props {
  state: 'month' | 'year' | 'decade' | 'century'
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const calendarStore = useCalendarStore()

const yearState = ref('month')

watch(
  () => props.state,
  (newValue) => {
    yearState.value = newValue
  },
  { immediate: true, deep: true }
)

const toggleYearState = () => {
  if (yearState.value === 'month') {
    yearState.value = 'year'
  } else if (yearState.value === 'year') {
    yearState.value = 'decade'
  } else if (yearState.value === 'decade') {
    yearState.value = 'century'
  }
  emitUpdate()
}

const emitUpdate = () => {
  emit('update')
}

const getDecade = (year) => {
  return `${Math.floor(year / 10) * 10} - ${Math.floor(year / 10) * 10 + 9}`
}

const getCentury = (year) => {
  return `${Math.floor(year / 100) * 100} - ${Math.floor(year / 100) * 100 + 99}`
}

const shortMonthStr = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    new Date(calendarStore.getYear, calendarStore.getMonth, calendarStore.getDay)
  )
})

const handlePrevClick = () => {
  if (yearState.value === 'month') {
    calendarStore.decrementMonth(1)
  } else if (yearState.value === 'year') {
    calendarStore.decrementYear(1)
  } else if (yearState.value === 'decade') {
    calendarStore.decrementDecade(10)
  } else if (yearState.value === 'century') {
    calendarStore.decrementCentury(100)
  }
}

const handleNextClick = () => {
  if (yearState.value === 'month') {
    calendarStore.incrementMonth(1)
  } else if (yearState.value === 'year') {
    calendarStore.incrementYear(1)
  } else if (yearState.value === 'decade') {
    calendarStore.incrementDecade(10)
  } else if (yearState.value === 'century') {
    calendarStore.incrementCentury(100)
  }
}
</script>

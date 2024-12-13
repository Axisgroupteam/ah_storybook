<template>
  <div
    class="grid grid-cols-7 rounded-lg bg-white dark:bg-neutral-700 gap-0 max-w-[296px] w-[296px] shadow-lg p-4"
  >
    <Top :state="yearState" @update="toggleYearState" />
    <div v-if="yearState === 'month'" class="col-span-7 grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in daysOfTheWeek"
        :key="day"
        class="text-center h-6 leading-6 text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1"
      >
        {{ day }}
      </div>
      <div
        v-for="(day, index) in firstDayOfCurrentMonth"
        v-if="firstDayOfCurrentMonth > 0"
        :key="day"
        class="min-w-9 min-h-9 h-9 w-9 max-h-9 min-w-9"
        @click="handleSelectPrev(day)"
      >
        <div
          class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm"
          :class="{
            'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
              selectedDate?.getDate() === daysInPastMonth - (firstDayOfCurrentMonth - day) &&
              (selectedDate?.getMonth() === calendarStore.getMonth - 1 ||
                (selectedDate?.getMonth() === 11 && calendarStore.getMonth === 0)) &&
              (selectedDate?.getFullYear() ===
                calendarStore.getYear - (calendarStore.getMonth === 0 ? 1 : 0) ||
                selectedDate?.getFullYear() === calendarStore.getYear)
          }"
        >
          {{ daysInPastMonth - firstDayOfCurrentMonth + index + 1 }}
        </div>
      </div>
      <div
        v-for="day in daysInCurrentMonth"
        :key="day"
        class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm min-w-9 min-h-9 h-9 w-9 max-h-9 min-w-9"
        :class="{
          'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === calendarStore.getMonth &&
            selectedDate?.getFullYear() === calendarStore.getYear
        }"
        @click="handleSelect(day)"
      >
        {{ day }}
      </div>
      <div
        v-for="day in lastEmptyCells"
        :key="`next-${day}`"
        class="min-w-9 min-h-9 h-9 w-9 max-h-9 min-w-9"
        @click="handleSelectNext(day)"
      >
        <div
          class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm"
          :class="{
            'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
              selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === (calendarStore.getMonth + 1) % 12 &&
              selectedDate?.getFullYear() ===
                (calendarStore.getMonth === 11 ? calendarStore.getYear + 1 : calendarStore.getYear)
          }"
        >
          {{ day }}
        </div>
      </div>
    </div>
    <div v-else-if="yearState === 'year'" class="col-span-7 grid grid-cols-4 gap-2 mb-2">
      <div
        v-for="(month, index) in months"
        :key="index"
        class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm"
        :class="{
          'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
            selectedDate?.getMonth() === index &&
            selectedDate?.getFullYear() === calendarStore.getYear
        }"
        @click="handleMonthSelect(index)"
      >
        {{ month.substring(0, 3) }}
      </div>
    </div>
    <div v-else-if="yearState === 'decade'" class="col-span-7 grid grid-cols-4 gap-2 mb-2">
      <div
        v-for="year in getYearsInDecade(calendarStore.getYear)"
        :key="year"
        class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm"
        :class="{
          'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
            selectedDate?.getFullYear() === year
        }"
        @click="handleYearSelect(year)"
      >
        {{ year }}
      </div>
    </div>
    <div v-else class="col-span-7 grid grid-cols-4 gap-2 mb-2">
      <div
        v-for="year in getYearsInCentury(calendarStore.getYear)"
        :key="year"
        class="hover:bg-neutral-100 dark:hover:bg-neutral-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-neutral-900 dark:text-white font-semibold text-sm"
        :class="{
          'bg-red-700 text-white hover:!bg-red-700 dark:hover:!bg-red-700':
            year <= selectedDate.getFullYear() &&
            year + 9 >= selectedDate.getFullYear() &&
            selectedDate.getFullYear() <= year + 9
        }"
        @click="handleYearSelect(year)"
      >
        {{ year }}
      </div>
    </div>
    <div class="flex justify-center items-center w-full col-span-7 gap-2 mt-2">
      <FwbButton
        class="text-white bg-red-700 !bg-primary-700 dark:bg-red-600 hover:bg-red-800 dark:hover:!bg-red-700 font-medium text-sm px-5 py-2 text-center w-1/2"
        color="primary"
        @click="handleTodayClick"
      >
        Today
      </FwbButton>
      <FwbButton
        color="secondary"
        class="text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 font-medium text-sm text-center w-1/2"
        @click="handleClearClick"
      >
        Clear
      </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Top from './Top.vue'
import { useCalendarStore } from './calendar'
import FwbButton from '@/new_design/components/storybook/components/FwbButton/FwbButton.vue'

interface Props {
  modelValue: Date | null
  initialDate: Date
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const selectedDate = ref<Date | null>(props.modelValue || null)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== null) {
      if (typeof newValue === 'string') selectedDate.value = new Date(newValue)
      else selectedDate.value = newValue
    }
  },
  { deep: true, immediate: true }
)

watch(
  selectedDate,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true, immediate: true }
)

const calendarStore = useCalendarStore()
calendarStore.$subscribe((mutation, state) => {
  getDaysInMonth()
  getFirstDayOfMonth()
})

const daysOfTheWeek = {
  1: 'Su',
  2: 'Mo',
  3: 'Tu',
  4: 'We',
  5: 'Th',
  6: 'Fr',
  7: 'Sa'
}

const yearState = ref('month')
const toggleYearState = () => {
  if (yearState.value === 'month') {
    yearState.value = 'year'
  } else if (yearState.value === 'year') {
    yearState.value = 'decade'
  } else if (yearState.value === 'decade') {
    yearState.value = 'century'
  }
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const daysInCurrentMonth = ref(0)
const firstDayOfCurrentMonth = ref(0)
const lastEmptyCells = ref(0)
const daysInPastMonth = ref(0)

const getDaysInMonth = () => {
  daysInCurrentMonth.value = new Date(
    calendarStore.getYear,
    calendarStore.getMonth + 1, // 👈️ months are 0-based
    0
  ).getDate()
}

const getDaysInPastMonth = () => {
  daysInPastMonth.value = new Date(calendarStore.getYear, calendarStore.getMonth, 0).getDate()
}

const getFirstDayOfMonth = () => {
  firstDayOfCurrentMonth.value = new Date(calendarStore.getYear, calendarStore.getMonth, 1).getDay()
}

const lastCalendarCells = () => {
  const totalGrid = 42
  const usedCells = firstDayOfCurrentMonth.value + daysInCurrentMonth.value
  lastEmptyCells.value = totalGrid - usedCells
  /*lastEmptyCells.value =
    totalGrid - daysInCurrentMonth.value - firstDayOfCurrentMonth.value;*/
}

const handleSelect = (day) => {
  const auxDate = new Date(calendarStore.getYear, calendarStore.getMonth, day)
  selectedDate.value = auxDate
}

const handleSelectNext = (day) => {
  const nextMonth = (calendarStore.getMonth + 1) % 12
  const nextYear = calendarStore.getMonth === 11 ? calendarStore.getYear + 1 : calendarStore.getYear
  const auxDate = new Date(nextYear, nextMonth, day)
  selectedDate.value = auxDate
  calendarStore.incrementMonth(1)
}

const handleSelectPrev = (day) => {
  const auxDate = new Date(
    calendarStore.getYear,
    calendarStore.getMonth - 1,
    daysInPastMonth.value - (firstDayOfCurrentMonth.value - day)
  )
  selectedDate.value = auxDate
  calendarStore.decrementMonth(1)
}

const handleTodayClick = () => {
  yearState.value = 'month'
  const currentDate = new Date()
  selectedDate.value = new Date(currentDate)
  calendarStore.setYear(currentDate.getFullYear())
  calendarStore.setMonth(currentDate.getMonth())
  getDaysInMonth()
  getFirstDayOfMonth()
  lastCalendarCells()
}

const handleClearClick = () => {
  selectedDate.value = null
}

const handleMonthSelect = (index) => {
  calendarStore.setMonth(index)
  yearState.value = 'month'
}

const getYearsInDecade = (year) => {
  const startYear = Math.floor(year / 10) * 10 - 1
  return Array.from({ length: 12 }, (_, i) => startYear + i)
}

const getYearsInCentury = (year) => {
  const startYear = Math.floor(year / 100) * 100 - 10
  return Array.from({ length: 12 }, (_, i) => startYear + i * 10)
}

const handleYearSelect = (year) => {
  if (yearState.value === 'century') {
    yearState.value = 'decade'
    calendarStore.setDecade(year)
  } else if (yearState.value === 'decade') {
    calendarStore.setYear(year)
    yearState.value = 'year'
  } else {
    calendarStore.setMonth(year)
    yearState.value = 'month'
  }
}

onMounted(() => {
  getDaysInMonth()
  getDaysInPastMonth()
  getFirstDayOfMonth()
  lastCalendarCells()
  /*if (!selectedDate.value) {
    const today = new Date();
    selectedDate.value = today;
  } else {
    calendarStore.setYear(selectedDate.value.getFullYear());
    calendarStore.setMonth(selectedDate.value.getMonth());
  }*/
})

// Watch for changes in initialDate and update the calendar state
watch(
  () => props.initialDate,
  (newDate) => {
    if (newDate) {
      selectedDate.value = newDate
      calendarStore.setYear(newDate.getFullYear())
      calendarStore.setMonth(newDate.getMonth())
      getDaysInMonth()
      getFirstDayOfMonth()
      lastCalendarCells()
    }
  },
  { immediate: true }
)

watch(
  [() => calendarStore.getMonth, () => calendarStore.getYear],
  () => {
    getDaysInMonth()
    getFirstDayOfMonth()
    getDaysInPastMonth()
    lastCalendarCells()
  },
  { immediate: true }
)
</script>

<style scoped></style>

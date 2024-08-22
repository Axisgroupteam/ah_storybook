<template>
  <div
    ref="calendarContainer"
    class="min-h-full min-w-full text-gray-800 bg-white max-w-[296px] w-[296px] divide-x"
  >
    <div class="w-full border grid grid-cols-7 rounded-t-lg bg-rose-700 bg-opacity-5">
      <Top v-if="false" @month="handleMonth" @year="handleYear" />
      <div
        v-for="day in daysOfTheWeek"
        :key="day"
        class="text-center text-[12px] leading-[16px] max-w-9 bg-red-500 w-9 h-9 flex justify-center items-center text-[#201A1A] font-bold"
      >
        {{ day }}
      </div>

      <div
        v-for="(day, index) in firstDayOfCurrentMonth"
        v-if="firstDayOfCurrentMonth > 0"
        :key="day"
        class="h-9 w-9 text-[12px] leading-[16px] flex justify-center items-center text-[#201A1A] text-semibold text-[#524342]"
      >
        {{ daysInPastMonth - firstDayOfCurrentMonth + index + 1 }}
      </div>

      <!--<div
          
          class="min-h-9 min-w-9 h-9 w-9 flex justify-center items-center align-top cursor-pointer font-bold
          "
          :class="{
              'bg-rose-700 text-white rounded-full': isToday(day) ,
              'hover:bg-rose-300 rounded-full hover:text-stone-50': !isToday(day),
              'bg-rose-700 text-white rounded-full': selectedDate.getDate() === day && selectedDate.getMonth() ===  (calendarStore.getMonth) && selectedDate.getFullYear() === (calendarStore.getYear),
            }"
            @click="handleSelect(day)"
        >-->
      <FwbButton
        v-for="day in daysInCurrentMonth"
        :key="day"
        color="secondary"
        square
        class="!min-w-9 !max-w-9 !min-h-9 !max-h-9 !h-9 !w-9"
      >
        {{ day }}
      </FwbButton>
      <!--
        </div>-->

      <div
        v-for="(day, index) in lastEmptyCells"
        v-if="lastEmptyCells > 0"
        :key="day"
        class="h-9 w-9 text-[12px] leading-[16px] flex justify-center items-center"
      >
        {{ index + 1 }}
      </div>

      <div
        class="text-rose-700 h-[56px] flex justify-center items-center w-full col-span-7 font-bold !bg-red-500"
      >
        <FwbButton color="primary"> Today </FwbButton>
        <FwbButton color="secondary"> Clear </FwbButton>
      </div>

      <!--Month Selector -->
      <div
        class="scrollBar right-0 top-[64px] absolute border-t border-stone-300 bg-red-100 w-full rounded-b-xl transition-all duration-100 h ease-linear"
        :class="
          showMonthSelector
            ? 'max-h-[1000px] overflow-y-auto pt-2 pb-5 block'
            : 'max-h-0 overflow-hidden p-0 hidden'
        "
      >
        <div
          v-for="(i, index) in months"
          class="flex pl-4 pr-6 py-3 justify-start items-center w-full hover:bg-zinc-900/10 cursor-pointer"
          @click="monthSelected(index)"
        >
          <!--
            <component 
              :is="getAssetComponent('check_24px')"
              v-if="index === calendarStore.getMonth"
              class="min-h-[24px] min-w-[24px] fill-black"
            />
            <div 
              v-else
              class="min-h-[24px] min-w-[24px]"
            ></div>
            -->
          <span class="text-stone-900 text-[16px] font-normal">
            {{ i }}
          </span>
        </div>
      </div>

      <!--Year Selector-->
      <div
        id="yearDropDown"
        class="scrollBar right-0 top-[64px] absolute border-t border-stone-300 bg-red-100 w-full rounded-b-xl transition-all duration-100 h ease-linear"
        :class="
          showYearSelector
            ? 'max-h-[1000px] overflow-y-auto pt-2 pb-5 block'
            : 'max-h-0 overflow-hidden p-0 hidden'
        "
      >
        <div
          v-for="(i, index) in 200"
          :id="calendarStore.getYear - 100 + index === calendarStore.getYear ? 'yearCheck' : ''"
          class="flex pl-4 pr-6 py-3 justify-start items-center w-full hover:bg-zinc-900/10 cursor-pointer"
          @click="yearSelected(calendarStore.getYear - 100 + index)"
        >
          <!--
            <component               
              :is="getAssetComponent('check_24px')"
              v-if="((calendarStore.getYear - 100) + index) === calendarStore.getYear"
              class="min-h-[24px] min-w-[24px] fill-black "
            />
            <div 
              v-else
              class="min-h-[24px] min-w-[24px]"
            ></div>
            -->
          <span class="text-stone-900 text-[16px] font-normal">
            {{ calendarStore.getYear - 100 + index }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import Top from './Top.vue'
import { useCalendarStore } from './calendar.ts'
import FwbButton from '../FwbButton/FwbButton.vue'

//import { getAssetComponent } from '@/utils/getSvg';

const emit = defineEmits(['change', 'close'])

/**************************************
 * PROPS
 * ************************************
 */

const showModal = ref(false)
const showOtherModal = ref(false)
const modalContent = ref()
const itemSelected = ref(null)
const selectedDate = ref(null)

const handleShowModal = () => {
  showModal.value = !showModal.value
}

const handleShowOtherModal = () => {
  showOtherModal.value = !showOtherModal.value
}

const itemClear = () => {
  itemSelected.value = null
}

// Store initialization and subscription
const calendarStore = useCalendarStore()
calendarStore.$subscribe((mutation, state) => {
  getDaysInMonth()
  getFirstDayOfMonth()
})

// component variables
const daysOfTheWeek = {
  1: 'Su',
  2: 'Mo',
  3: 'Tu',
  4: 'We',
  5: 'Th',
  6: 'Fr',
  7: 'Sa'
}

const showMonthSelector = ref(false)
const showYearSelector = ref(false)

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

/**
 * Gets the number of days present in a month
 * The month is gotten from the calendar store
 */
const getDaysInMonth = () => {
  daysInCurrentMonth.value = new Date(
    calendarStore.getYear,
    calendarStore.getMonth + 1, // 👈️ months are 0-based
    0
  ).getDate()
}

const getDaysInPastMonth = () => {
  daysInPastMonth.value = new Date(calendarStore.getYear, calendarStore.getMonth, 0).getDate()
  console.log(daysInPastMonth.value)
}

/**
 * Gets in number, the first day of a month
 * The month is gottenn from the calendar store
 */
const getFirstDayOfMonth = () => {
  firstDayOfCurrentMonth.value = new Date(calendarStore.getYear, calendarStore.getMonth, 1).getDay()
}

/**
 * Gets the last empty cells (if any) on the calendar grid
 */
const lastCalendarCells = () => {
  const totalGrid = firstDayOfCurrentMonth.value <= 5 ? 35 : 42

  lastEmptyCells.value = totalGrid - daysInCurrentMonth.value - firstDayOfCurrentMonth.value
}

/**
 * Validates a day to check if it's today or not
 *
 * @param {number} day The day to validate
 * @return boolean True or false if it's today or not
 */
const isToday = (day) => {
  const today = new Date()
  if (
    calendarStore.getYear == today.getFullYear() &&
    calendarStore.getMonth == today.getMonth() &&
    day == today.getDate()
  )
    return true

  return false
}

const handleSelect = (day) => {
  const auxDate = new Date(calendarStore.getYear, calendarStore.getMonth, day)
  selectedDate.value = auxDate
  console.log(selectedDate.value.getDate())
  //emit('change',auxDate.toLocaleDateString())
  //console.log(auxDate.toLocaleDateString())
}

const handleClose = () => {
  const today = new Date()
  selectedDate.value = today
  emit('close')
}

const exportDate = () => {
  emit('change', selectedDate.value.toLocaleDateString())
  console.log(selectedDate.value.toLocaleDateString())
}

const monthSelected = (index) => {
  calendarStore.setMonth(index)
  showMonthSelector.value = false
}

const yearSelected = (index) => {
  calendarStore.setYear(index)
  showYearSelector.value = false
}

const handleShowMonthSelector = () => {
  showMonthSelector.value = !showMonthSelector.value
}

const handleShowYearSelector = () => {
  showYearSelector.value = !showYearSelector.value
}

const handleMonth = () => {
  handleShowMonthSelector()
}

const handleYear = () => {
  handleShowYearSelector()
  scrollToElement('yearCheck')
}

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  console.log(element)
  if (element) {
    element.scrollIntoView()
  }
}

/************************************************************************
 *  LIFECYCLE HOOKS
 * **********************************************************************
 */
onMounted(() => {
  getDaysInMonth()
  getDaysInPastMonth()
  getFirstDayOfMonth()
  lastCalendarCells()
  const today = new Date()
  selectedDate.value = today
})

onUpdated(() => {
  getFirstDayOfMonth()
  lastCalendarCells()
})
</script>

<style scoped>
.scrollBar {
  @apply scrollbar-track-transparent scrollbar-thin scrollbar-thumb-primary/50 scrollbar-thumb-rounded-xl hover:scrollbar-thumb-primary/75 active:scrollbar-thumb-primary transition-colors duration-200;
  overflow: overlay;
  height: calc(100% - 64px);
}
</style>

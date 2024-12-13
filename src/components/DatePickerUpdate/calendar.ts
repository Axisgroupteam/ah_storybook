import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const year = ref(new Date().getFullYear())
  const month = ref(new Date().getMonth())
  const day = ref(new Date().getDate())

  // Computed properties for decade and century
  const decade = computed(() => Math.floor(year.value / 10) * 10)
  const century = computed(() => Math.floor(year.value / 100) * 100)

  const getYear = computed(() => year.value)
  const getMonth = computed(() => month.value)
  const getDay = computed(() => day.value)
  const getDecade = computed(() => decade.value)
  const getCentury = computed(() => century.value)

  function incrementYear(val) {
    year.value += val
  }

  function decrementYear(val) {
    year.value -= val
  }

  function incrementMonth(val) {
    if (month.value === 11) {
      incrementYear(1)
      month.value = 0
    } else {
      month.value += val
    }
  }

  function decrementMonth(val) {
    if (month.value === 0) {
      decrementYear(1)
      month.value = 11
    } else {
      month.value -= val
    }
  }

  function incrementDay(val) {
    day.value += val
  }

  // New functions for handling decades and centuries
  function incrementDecade(val) {
    console.log(val)
    year.value += val
  }

  function decrementDecade(val) {
    year.value -= val
  }

  function incrementCentury(val) {
    year.value += val
  }

  function decrementCentury(val) {
    year.value -= val
  }

  function setMonth(val) {
    month.value = val
  }

  function setYear(val) {
    year.value = val
  }

  // New functions for setting decade and century manually
  function setDecade(decadeVal) {
    // Ajusta el año al principio de la nueva década, manteniendo los últimos dígitos del año actual.
    const yearUnits = year.value % 10 // Obtiene los últimos dígitos del año actual
    year.value = Math.floor(decadeVal / 10) * 10 + yearUnits
  }

  function setCentury(centuryVal) {
    year.value = centuryVal * 100 + (year.value % 100)
  }

  function resetDate() {
    year.value = new Date().getFullYear()
    month.value = new Date().getMonth()
    day.value = new Date().getDate()
  }

  return {
    year,
    month,
    day,
    getYear,
    getMonth,
    getDay,
    getDecade,
    getCentury,
    incrementYear,
    incrementMonth,
    decrementMonth,
    decrementYear,
    incrementDecade,
    decrementDecade,
    incrementCentury,
    decrementCentury,
    setMonth,
    setYear,
    setDecade,
    setCentury,
    resetDate
  }
})

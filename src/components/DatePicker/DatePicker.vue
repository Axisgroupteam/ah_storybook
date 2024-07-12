<template>
  <!-- <div
    v-if="typeCalendar === 'simple'"
    data-testid="input-wrapper"
    class="flex text-white flex-col w-full"
  >
    <div v-if="label" class="flex justify-start">
      <span :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </span>
      <slot name="labelEnd" />
    </div>
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        :class="validationWrapperClassesIcon"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        :id="id"
        datepicker
        datepicker-buttons
        datepicker-autohide
        datepicker-autoselect-today
        type="text"
        class="block w-full ps-10 p-2.5"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
        :disabled="disabled"
        placeholder="Select date"
        :value="modelValue"
        @input="handleInput"
        @click="desactiveError"
        @blur="enabledError"
      />
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot v-if="showValidationMessage" name="validationMessage" />
    </p>
  </div>

  <div
    v-else-if="typeCalendar === 'range'"
    date-rangepicker
    class="flex items-center w-full"
    ref="rangePicker"
  >
    <div class="relative w-full">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        :class="validationWrapperClassesIcon"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        ref="dateInputStart"
        id="datepicker-custom-range-start"
        datepicker-range-autohide
        name="start"
        type="text"
        class="block w-full ps-10 p-2.5"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
        placeholder="Select date start"
        @input="handleInput"
        @click="desactiveError"
        @blur="enabledError"
      />

      <div
        v-if="dateStart"
        class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
        :class="validationWrapperClassesIcon"
        @click.stop="clearDate('start')"
      >
        <svg
          v-if="showTrash"
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </div>
    </div>
    <span class="mx-4 text-gray-500">to</span>
    <div class="relative w-full">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        :class="validationWrapperClassesIcon"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        ref="dateInputEnd"
        id="datepicker-custom-range-start"
        name="end"
        type="text"
        class="block w-full ps-10 p-2.5"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
        placeholder="Select date end"
      />
      <div
        v-if="dateEnd"
        class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
        :class="validationWrapperClassesIcon"
        @click.stop="clearDate('end')"
      >
        <svg
          v-if="showTrash"
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </div>
    </div>
  </div> -->
  <div ref="datePickerRange" class="flex gap-4">
    <div class="relative max-w-sm">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        ref="rangePickerStart"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select date"
        @click="datePickerStart?.show()"
      />
    </div>
    <div class="relative max-w-sm">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        ref="rangePickerEnd"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select date"
        @click="datePickerEnd?.show()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { initFlowbite, type DatepickerOptions } from 'flowbite'
import { DateRangePicker, type Datepicker } from 'flowbite-datepicker'
import { twMerge } from 'tailwind-merge'
import { useInputClasses } from './composables/useInputClasses'
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
  type TypeCalendar
} from './types'

//TODO
// LA CARGA GLOBAL DE ESTOS ESTILOS AFECTA LOS DEMAS COMPONENTES
import './css/flowbite.css'
import './css/custom.scss'
import { nextTick } from 'vue'

const datePickerRange = ref()
const rangePickerStart = ref()
const rangePickerEnd = ref()

interface InputProps {
  id: string
  disabled?: boolean
  label?: string
  modelValue: string
  required?: boolean
  size?: InputSize
  type?: InputType
  validationStatus?: ValidationStatus
  readonly?: boolean
  typeCalendar?: TypeCalendar
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: '',
  modelValue: '',
  required: false,
  size: 'md',
  type: 'text',
  validationStatus: 'normal',
  readonly: false,
  typeCalendar: 'simple'
})

const emit = defineEmits(['update:modelValue', 'toggleVisibility'])

const showValidationMessage = ref(true)
const dateInputStart = ref<HTMLElement | null>(null)
const dateStart = ref()

const dateInputEnd = ref<HTMLElement | null>(null)
const dateEnd = ref()

const showTrash = ref(true)

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  console.log('HAGO CLICK EN EL INPUT', value)
  emit('update:modelValue', value)
}

const classes = computed(() => useInputClasses(props.size, props.disabled, props.validationStatus))

const inputClasses = computed(() => classes.value.inputClasses.value)
const labelClasses = computed(() => classes.value.labelClasses.value)

const validationWrapperClasses = computed(() =>
  twMerge(
    'text-sm',
    props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : ''
  )
)

const validationWrapperClassesIcon = computed(() =>
  twMerge(
    'text-sm',
    props.validationStatus === validationStatusMap.Error
      ? 'text-red-600 dark:text-red-500'
      : 'text-neutral-500 dark:text-neutral-400'
  )
)

const enabledError = () => {
  showValidationMessage.value = true
}

const desactiveError = () => {
  showValidationMessage.value = false
}

const clearDate = (type: string) => {
  if (type === 'start') {
    ;(dateInputStart.value as HTMLInputElement).value = ''
    dateStart.value = ''
  } else if (type === 'end') {
    ;(dateInputEnd.value as HTMLInputElement).value = ''
    dateEnd.value = ''
  }
}

const dateStartComputed = computed(() => dateInputStart.value.value)

// optional options with default values and callback functions
const options: DatepickerOptions = {
  defaultDatepickerId: null,
  autohide: true,
  format: 'mm/dd/yyyy',
  maxDate: null,
  minDate: null,
  orientation: 'bottom',
  buttons: false,
  title: null,
  rangePicker: true
}

const datePickerRangeCmp = ref<DateRangePicker>()

const eventHandlerStart = (e: Event) => {
  const target = e.target as HTMLInputElement

  dateStart.value = target.value
}

const eventHandlerEnd = (e: Event) => {
  const target = e.target as HTMLInputElement
  dateEnd.value = target.value
}

onMounted(() => {
  nextTick(() => {
    datePickerRangeCmp.value = new DateRangePicker(datePickerRange.value, options)
    if (rangePickerStart.value) {
      rangePickerStart.value?.addEventListener('changeDate', eventHandlerStart)
    }
    if (rangePickerEnd.value) {
      rangePickerEnd.value?.addEventListener('changeDate', eventHandlerEnd)
    }

    setTimeout(() => {
      const datst = new Date()
      datst.setDate(-10)
      const datend = new Date()
      datend.setDate(10)
      datePickerRangeCmp.value?.setDates([datst.toISOString(), datend.toISOString()])
    }, 1000)
  })

  initFlowbite()
})

onBeforeUnmount(() => {
  if (rangePickerStart.value) {
    rangePickerStart.value?.removeEventListener('changeDate', eventHandlerStart)
  }
  if (rangePickerEnd.value) {
    rangePickerEnd.value?.removeEventListener('changeDate', eventHandlerEnd)
  }
})
</script>

<style scoped></style>

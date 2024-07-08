<template>
  <div v-if="typeCalendar === 'simple'" data-testid="input-wrapper" class="flex text-white flex-col w-full">
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
      :class="validationWrapperClassesIcon ">
        <svg
          class="w-4 h-4 "
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
      <slot v-if="showValidationMessage"  name="validationMessage" />
    </p>
  </div>
  

<div v-else-if="typeCalendar === 'range'" id="date-range-picker" date-rangepicker class="flex items-center w-full " >
  <div class="relative w-full">
    <div 
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      :class="validationWrapperClassesIcon ">
        <svg
          class="w-4 h-4 "
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
      id="datepicker-range-start" 
      name="start" 
      type="text" 
      class="block w-full ps-10 p-2.5"
      :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
      placeholder="Select date start">
  </div>
  <span class="mx-4 text-gray-500">to</span>
  <div class="relative w-full">
    <div 
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      :class="validationWrapperClassesIcon ">
         <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
    </div>
    <input 
      id="datepicker-range-end" 
      name="end" 
      type="text" 
      class="block w-full ps-10 p-2.5"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
      placeholder="Select date end">
</div>
</div>


</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { twMerge } from 'tailwind-merge'
import { useInputClasses } from './composables/useInputClasses'
import { type InputSize, type InputType, type ValidationStatus, validationStatusMap, type TypeCalendar } from './types'

//TODO
// LA CARGA GLOBAL DE ESTOS ESTILOS AFECTA LOS DEMAS COMPONENTES
import './css/flowbite.css'
import './css/custom.scss'

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

const showValidationMessage = ref(true);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
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
    props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : 'text-neutral-500 dark:text-neutral-400'
  )
)

const enabledError = () =>{
  showValidationMessage.value = true;
}

const desactiveError = () =>{
  showValidationMessage.value = false;
}

onMounted(() => {
  initFlowbite()
})
</script>

<style scoped></style>

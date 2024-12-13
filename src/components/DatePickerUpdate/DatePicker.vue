<template>
  <div ref="wrapper" class="relative">
    <FwbInput
      v-model="selectedDate"
      :label="label"
      :disabled="disabled"
      type="text"
      :placeholder="placeholder"
      readonly
      :required="required"
      :validation-status="computed(() => validationStatus).value"
      @click.stop="handleClick"
    >
      <template #prefix>
        <component
          :is="icons.calendar"
          :class="[
            'w-4 h-4',
            validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : '',
            disabled ? '!text-neutral-400 dark:!text-neutral-500' : ''
          ]"
        />
      </template>
      <template #validationMessage>
        {{ validationMessage }}
      </template>
    </FwbInput>
    <div
      v-if="visible"
      :class="[
        'bg-neutral-50 dark:bg-neutral-700 z-10 shadow-md rounded-lg border-neutral-200 w-fit',
        getPositionClass,
        getCalendarPosition
      ]"
      @click.stop
    >
      <Calendar
        :model-value="selectedDate"
        :initial-date="initialDate"
        @update:model-value="handleUpdateModelValue"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Calendar from './Calendar.vue'
import type { InputSize, ValidationStatus } from './../FwbInput/types'
import FwbInput from '../FwbInput/FwbInput.vue'
import { formatDate } from '@/new_design/utils/dateFormat'
import { getFBIcon } from '@/utils/getAssets'
import { formatDateTime } from '@/utils/formatDate'

// Define the props interface
interface InputProps {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  underline?: boolean
  size?: InputSize
  validationStatus?: ValidationStatus
  validationMessage?: string
  initialState?: string
  required?: boolean
  position?: 'up' | 'down' | 'left' | 'right' | 'center'
  onlyDate?: boolean
}

// Define default props
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  label: '',
  placeholder: 'Select Date',
  disabled: false,
  validationMessage: '',
  underline: false,
  loading: false,
  size: 'md',
  validationStatus: undefined,
  initialState: '',
  required: false,
  position: 'down',
  onlyDate: false
})

// Define emits
const emit = defineEmits(['update:modelValue', 'blur'])

// Reactive state for selected date
const selectedDate = ref<string | null | Date>(
  props.modelValue
    ? props.onlyDate
      ? formatDateTime(props.modelValue).date
      : formatDate(props.modelValue)
    : null
)

// Watch for changes in selectedDate and emit updates
watch(
  selectedDate,
  (newValue) => {
    if (typeof newValue === 'string') {
      if (newValue && props.onlyDate) {
        const valueFormat = formatDateTime(new Date(newValue).toISOString())
        emit('update:modelValue', valueFormat.date)
      } else {
        emit('update:modelValue', new Date(newValue).toISOString())
      }
    } else {
      // emit("update:modelValue", newValue);
    }
  },
  { immediate: true, deep: true }
)

// Reactive state for visibility of the calendar
const visible = ref(false)

// Reference to the wrapper element
const wrapper = ref<HTMLDivElement>()

// Handle updates to the model value
const handleUpdateModelValue = (newDate: Date | null) => {
  if (newDate) {
    if (props.onlyDate) {
      const valueFormat = formatDateTime(new Date(newDate).toISOString())
      selectedDate.value = valueFormat.date
    } else selectedDate.value = formatDate(newDate)
  } else {
    selectedDate.value = null
  }
}

// Handle click events to toggle visibility
const handleClick = () => {
  if (!props.disabled) {
    visible.value = !visible.value
  }
}

// Reactive state for icons
const icons = reactive({
  calendar: computed(() => getFBIcon('calendar'))
})

// Close the calendar when clicking outside
onClickOutside(wrapper, () => {
  if (!visible.value) return
  visible.value = false
  emit('blur')
})

// Function to get the initial date for the calendar
const initialDate = computed(() => {
  return selectedDate.value ? new Date(selectedDate.value) : null
})

const getPositionClass = computed(() => {
  return props.position === 'center' ? 'fixed' : 'absolute'
})

// Computed property for calendar position
const getCalendarPosition = computed(() => {
  switch (props.position) {
    case 'up':
      return 'bottom-full mb-2 left-0'
    case 'down':
      return 'top-full mt-2 left-0'
    case 'left':
      return 'top-0 right-full mr-2'
    case 'right':
      return 'top-0 left-full ml-2'
    case 'center':
      return 'centered-element' // Clase para centrar el elemento
    default:
      return 'top-full mt-2 left-0'
  }
})

// Set calendar position on mount and when visibility changes
onMounted(() => {
  watch(visible, () => {
    if (visible.value) {
      // Additional logic if needed when calendar becomes visible
    }
  })
})

// Recalculate position on window resize if needed
window.addEventListener('resize', () => {
  // Add any resize logic if necessary
})
</script>

<style scoped>
.centered-element {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

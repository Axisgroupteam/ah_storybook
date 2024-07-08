<template>
  <div>
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    <div class="flex relative">
      <div
        v-if="$slots.prefix"
        class="w-10 flex absolute inset-y-0 left-0 items-center pl-0 justify-center overflow-hidden text-neutral-500 dark:text-neutral-400 cursor-pointer"
        :class="[
          validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : '',
          disabled ? '!text-neutral-400 dark:!text-neutral-500 !cursor-not-allowed' : ''
        ]"
      >
        <slot name="prefix" />
      </div>
      <input
        v-bind="$attrs"
        :value="internalValue"
        :disabled="disabled"
        :type="type"
        :required="required"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
        :readonly="readonly"
        @input="handleInput"
      />
      <div
        v-if="$slots.suffix"
        class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 text-neutral-500 dark:text-neutral-400"
        :class="[
          validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : '',
          disabled ? '!text-neutral-400 dark:!text-neutral-500' : ''
        ]"
        @click="toggle"
      >
        <slot name="suffix" />
      </div>
      <div
        v-if="props.type === 'number' && !disabled"
        class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 top-0 text-neutral-500 dark:text-neutral-400"
        :class="validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : ''"
      >
        <div class="flex flex-col justify-center items-center h-full w-full">
          <component :is="icons.caretUp" class="cursor-pointer" @click="increment" />
          <component :is="icons.caretDown" class="cursor-pointer" @click="decrement" />
        </div>
      </div>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" />
    </p>
    <p v-if="$slots.helper" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <slot name="helper" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, watch, reactive } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useInputClasses } from './composables/useInputClasses'
import { type InputSize, type InputType, type ValidationStatus, validationStatusMap } from './types'
import { getFBIcon } from '@/utils/getAssets'

interface InputProps {
  disabled?: boolean
  label?: string
  initialValue?: string | number
  required?: boolean
  size?: InputSize
  type?: InputType
  validationStatus?: ValidationStatus
  readonly?: boolean
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: '',
  initialValue: '',
  required: false,
  size: 'md',
  type: 'text',
  validationStatus: 'normal',
  readonly: false,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1
})

const emit = defineEmits(['update:value', 'toggleVisibility'])

const internalValue = ref(props.initialValue)

watch(
  () => props.initialValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  internalValue.value = value
  emit('update:value', value)
}

const increment = () => {
  if (!props.disabled && !props.readonly && props.type === 'number') {
    const currentValue = Number(internalValue.value) || 0
    const newValue = Math.min(currentValue + props.step, props.max)
    internalValue.value = String(newValue)
    emit('update:value', newValue)
  }
}

const decrement = () => {
  if (!props.disabled && !props.readonly && props.type === 'number') {
    const currentValue = Number(internalValue.value) || 0
    const newValue = Math.max(currentValue - props.step, props.min)
    internalValue.value = String(newValue)
    emit('update:value', newValue)
  }
}

const toggle = () => {
  if (!props.disabled) emit('toggleVisibility')
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

const icons = reactive({
  caretUp: computed(() => getFBIcon('caret-up')),
  caretDown: computed(() => getFBIcon('caret-down2'))
})
</script>

<style scoped>
.autofill-text:-webkit-autofill {
  -webkit-text-fill-color: rgb(163, 163, 163);
}
input {
  @apply dark:autofill:text-neutral-400;
  @apply autofill:shadow-[inset_0_0_0px_1000px_#FAFAFA];
  @apply dark:autofill:shadow-[inset_0_0_0px_1000px_#404040] dark:autofill:border-neutral-600;
}
input::-ms-reveal,
input::-ms-clear {
  display: none;
}

/* Para navegadores basados en Webkit (Chrome, Safari, etc.) */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Para Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

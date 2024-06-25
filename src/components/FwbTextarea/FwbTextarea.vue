<template>
  <label>
    <span :class="labelClasses"
      >{{ label }} <span class="text-red-500" v-if="required">*</span></span
    >
    <span :class="wrapperClasses">
      <textarea
        v-model="model"
        v-bind="$attrs"
        class="text-neutral-900 dark:text-white"
        :class="textareaClasses"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
      />
      <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
        <slot name="validationMessage" />
      </p>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTextareaClasses } from './composables/useTextareaClasses'
import { twMerge } from 'tailwind-merge'
import { type ValidationStatus, validationStatusMap } from './types'
import { useMergeClasses } from '@/composables/userMergeClasses'

interface TextareaProps {
  modelValue?: string
  label?: string
  rows?: number
  custom?: boolean
  placeholder?: string
  required?: boolean
  validationStatus?: ValidationStatus
  disabled?: boolean
  readonly?: boolean
}

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  label: 'Your message',
  rows: 4,
  custom: false,
  placeholder: 'Write your message here...',
  required: false,
  validationStatus: undefined,
  disabled: false,
  readonly: false
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const validationWrapperClasses = computed(() =>
  twMerge(
    'mt-2 text-sm',
    props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : ''
  )
)

const classes = computed(() =>
  useTextareaClasses(props.custom, props.validationStatus, props.disabled)
)

const textareaClasses = computed(() => classes.value.textareaClasses.value)

const labelClasses = computed(() => classes.value.labelClasses.value)

const wrapperClasses = computed(() => classes.value.wrapperClasses.value)
</script>

<style scoped>
textarea:focus {
  outline: none;
}
</style>

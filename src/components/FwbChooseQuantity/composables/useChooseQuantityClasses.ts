import { computed, type Ref } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type InputSize, type ValidationStatus, validationStatusMap } from '../types'

// LABEL
const baseLabelClasses = 'block mb-2 text-sm font-medium'
const disabledLabelClasses = 'text-neutral-400 dark:text-neutral-500'

// INPUT
const defaultInputClasses =
  'bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400  dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 outline-0 ring-0 border-[1px] focus:outline-0 focus-visible:ring-0'
const disabledInputClasses =
  'cursor-not-allowed bg-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500'
const inputSizeClasses: Record<InputSize, string> = {
  lg: 'p-4',
  md: 'p-2.5 text-sm',
  sm: 'p-2 text-sm'
}

const errorInputClasses =
  'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'

export function useChooseQuantityClasses(
  size: InputSize,
  disabled: boolean,
  validationStatus: ValidationStatus | undefined
): {
  inputClasses: Ref<string>
  labelClasses: Ref<string>
} {
  const inputClasses = computed(() => {
    const vs = validationStatus

    const classByStatus = vs === validationStatusMap.Error ? errorInputClasses : ''

    return twMerge(
      defaultInputClasses,
      classByStatus,
      inputSizeClasses[size],
      disabled ? disabledInputClasses : ''
    )
  })

  const labelClasses = computed(() => {
    const vs = validationStatus
    const classByStatus =
      vs === validationStatusMap.Error
        ? 'text-red-700 dark:text-red-500'
        : 'text-neutral-900 dark:text-white'

    const disabledClasses = disabled ? disabledLabelClasses : ''

    return twMerge(baseLabelClasses, classByStatus, disabledClasses)
  })

  return {
    inputClasses,
    labelClasses
  }
}

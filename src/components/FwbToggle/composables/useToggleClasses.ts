import { computed } from 'vue'
import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses'
import { twMerge } from 'tailwind-merge'

// LABEL
const defaultLabelClasses = 'ms-3 block text-sm font-medium text-neutral-900 dark:text-neutral-300'
const disabledLabelClasses = 'text-neutral-400 dark:text-neutral-500'

// TOGGLE
const defaultToggleClasses =
  "relative w-11 h-6 bg-neutral-200 border-neutral-300 peer-focus:outline-none peer-focus:ring-red-200 dark:peer-focus:ring-red-600 peer-focus:ring-4 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-red-700"

const disabledToggleClasses = 'cursor-not-allowed'

export function useToggleClasses(disabled: boolean) {
  const toggleClasses = computed(() => {
    const isDisabled = disabled ? disabledToggleClasses : ''
    simplifyTailwindClasses(defaultToggleClasses)
    return twMerge(defaultToggleClasses, isDisabled)
  })
  const labelClasses = computed(() => {
    const isDisabled = disabled ? disabledLabelClasses : ''
    return twMerge(defaultLabelClasses, isDisabled)
  })
  return {
    toggleClasses,
    labelClasses
  }
}

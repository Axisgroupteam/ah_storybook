import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses'
import { computed } from 'vue'
import { type ValidationStatus, validationStatusMap } from '../types'
import { twMerge } from 'tailwind-merge'

const textareaWrapperClasses =
  'block w-full mb-4 border-neutral-200 rounded-lg bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 border-[1px]'
const textareaDefaultClasses =
  'block p-2.5 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg border-[1px] border-neutral-200 focus:border-red-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:border-red-500 outline-0 ring-0 focus:outline-0 focus-visible:ring-0'
const textareaLabelClasses = 'block mb-2 text-sm font-medium text-neutral-900 dark:text-white'

const errorTextAreaClasses =
  'bg-red-50 border-[1px] border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 placeholder:text-sm'

const disabledTextAreaClasses =
  'cursor-not-allowed bg-gray-100 placeholder-neutral-400 dark:placeholder-neutral-500'

const disabledLClasses = ' text-neutral-400 dark:text-neutral-500'

export function useTextareaClasses(
  custom: boolean,
  validationStatus: ValidationStatus | undefined,
  disabled: boolean
) {
  const textareaClasses = computed(() => {
    const vs = validationStatus

    const classByStatus = vs === validationStatusMap.Error ? errorTextAreaClasses : ''

    return simplifyTailwindClasses(
      textareaDefaultClasses,
      classByStatus,
      custom ? 'bg-white dark:bg-neutral-800 border-none' : 'border-[1px]',
      disabled ? disabledTextAreaClasses : ''
    )
  })

  const labelClasses = computed(() => {
    const vs = validationStatus
    const classByStatus =
      vs === validationStatusMap.Error
        ? 'text-red-700 dark:text-red-500'
        : 'text-neutral-900 dark:text-white'

    const isDisabled = disabled ? disabledLClasses : ''

    return twMerge(textareaLabelClasses, classByStatus, isDisabled)
  })
  const wrapperClasses = computed(() => (custom ? textareaWrapperClasses : ''))

  return {
    textareaClasses,
    labelClasses,
    wrapperClasses
  }
}

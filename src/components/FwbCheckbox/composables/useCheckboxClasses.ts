import { computed } from 'vue'
import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses'
import { twMerge } from 'tailwind-merge'

// LABEL
const defaultLabelClasses = 'block text-sm font-medium text-neutral-900 dark:text-neutral-300'
const disabledLabelClasses = 'text-neutral-400 dark:text-neutral-500';

// CHECKBOX
const defaultCheckboxClasses =
  'w-4 h-4 text-red-600 bg-neutral-100 border-neutral-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600'

const disabledCheckboxClasses ='cursor-not-allowed';

export function useCheckboxClasses(disabled : boolean) {
  const checkboxClasses = computed(() => {
    const isDisabled =  disabled ? disabledCheckboxClasses : '';
    simplifyTailwindClasses(defaultCheckboxClasses)
    return twMerge(defaultCheckboxClasses, isDisabled)
  });
  const labelClasses = computed(() => {
    const isDisabled =  disabled ? disabledLabelClasses : '';
    return twMerge(defaultLabelClasses, isDisabled)
  });
  return {
    checkboxClasses,
    labelClasses,
  }
}

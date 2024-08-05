import { computed } from 'vue'
import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses'
import { twMerge } from 'tailwind-merge'
import { validationStatusMap, type ValidationStatus } from "../types";

// LABEL
const defaultLabelClasses = 'block text-sm font-medium text-neutral-900 dark:text-neutral-300'
const disabledLabelClasses = 'text-neutral-400 dark:text-neutral-500';

// RADIO
const defaultRadioClasses =
  'w-4 h-4 text-red-600 bg-neutral-100 border-neutral-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600'

const disabledRadioClasses ='cursor-not-allowed';

export function useRadioClasses(disabled : boolean,  validationStatus: ValidationStatus | undefined) {
  const radioClasses = computed(() => {
    const isDisabled =  disabled ? disabledRadioClasses : '';
    simplifyTailwindClasses(defaultRadioClasses)
    return twMerge(defaultRadioClasses, isDisabled)
  });

  const labelClasses = computed(() => {
    const isDisabled = disabled ? disabledLabelClasses : "";
    const vs = validationStatus;
    const classByStatus =
      vs === validationStatusMap.Error
        ? "text-red-700 dark:text-red-500"
        : "text-neutral-900 dark:text-white";

    return twMerge(defaultLabelClasses, classByStatus, isDisabled);
  });
  return {
    radioClasses,
    labelClasses,
  }
}

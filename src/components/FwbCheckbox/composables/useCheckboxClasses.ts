import { computed } from "vue";
import { simplifyTailwindClasses } from "../utils/simplifyTailwindClasses";

// LABEL
const defaultLabelClasses =
  "block text-sm font-medium text-neutral-500 dark:text-neutral-300";

// CHECKBOX
const defaultCheckboxClasses =
  "w-4 h-4 rounded text-red-600 dark:text-red-600 bg-neutral-50 border-neutral-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-neutral-800 focus:ring-2 dark:border-neutral-600";

export function useCheckboxClasses() {
  const checkboxClasses = computed(() =>
    simplifyTailwindClasses(defaultCheckboxClasses)
  );
  const labelClasses = computed(() => defaultLabelClasses);

  return {
    checkboxClasses,
    labelClasses,
  };
}

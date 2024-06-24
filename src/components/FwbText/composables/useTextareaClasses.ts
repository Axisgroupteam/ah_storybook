import { computed } from "vue";
import { simplifyTailwindClasses } from "@/components/FwbText/utils/simplifyTailwindClasses";

const textareaWrapperClasses =
  "block w-full mb-4 border border-neutral-300 rounded-lg bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600";
const textareaDefaultClasses =
  "block p-2.5 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg border border-neutral-300 focus:ring-red-500 focus:border-red-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 outline-0 ring-0 border-[1px] focus:outline-0 focus-visible:ring-0";
const textareaLabelClasses =
  "block mb-2 text-sm font-medium text-neutral-900 dark:text-white";
const textareaFooterClasses =
  "block py-2 px-3 border-neutral-300 dark:border-neutral-600";

export function useTextareaClasses(custom: boolean) {
  const textareaClasses = computed(() => 
    simplifyTailwindClasses(
      textareaDefaultClasses,
      custom ? "bg-white dark:bg-neutral-800 border-none" : "border"
    )
  );

  const labelClasses = computed(() => textareaLabelClasses);
  const wrapperClasses = computed(() => (custom ? textareaWrapperClasses : ""));
  const footerClasses = computed(() => textareaFooterClasses);

  return {
    textareaClasses,
    labelClasses,
    wrapperClasses,
    footerClasses,
  };
}

import { computed, type Ref } from "vue";
import { twMerge } from "tailwind-merge";
import {
  type InputSize,
  type ValidationStatus,
  validationStatusMap,
} from "../types";

// LABEL
const baseLabelClasses = "block mb-2 text-sm font-medium";

// INPUT
const defaultSelectClasses =
  "w-full text-neutral-900 bg-neutral-50 focus:ring-red-500 focus:border-red-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
const disabledSelectClasses = "cursor-not-allowed bg-neutral-100";
const underlineSelectClasses =
  "bg-transparent dark:bg-transparent border-b-2 border-neutral-200 appearance-none dark:border-neutral-700 focus:outline-none focus:ring-0 focus:border-neutral-200 peer";
const selectSizeClasses: Record<InputSize, string> = {
  lg: "p-4",
  md: "p-2.5 text-sm",
  sm: "p-2 text-sm",
};

const successInputClasses =
  "bg-green-50 border-green-500 dark:border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500";
const errorInputClasses =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

export type UseSelectClassesProps = {
  size: Ref<InputSize>;
  disabled: Ref<boolean>;
  underline: Ref<boolean>;
  validationStatus: Ref<ValidationStatus | undefined>;
};

export function useSelectClasses(props: UseSelectClassesProps): {
  selectClasses: Ref<string>;
  labelClasses: Ref<string>;
} {
  const selectClasses = computed(() => {
    const vs = props.validationStatus.value;

    const classByStatus =
      vs === validationStatusMap.Success
        ? successInputClasses
        : vs === validationStatusMap.Error
        ? errorInputClasses
        : "";

    const underlineByStatus =
      vs === validationStatusMap.Success
        ? "focus:border-green-500"
        : vs === validationStatusMap.Error
        ? "focus:border-red-500"
        : "";

    return twMerge(
      defaultSelectClasses,
      classByStatus,
      selectSizeClasses[props.size.value],
      props.disabled.value && disabledSelectClasses,
      props.underline.value
        ? underlineSelectClasses
        : "border border-neutral-300 rounded-lg",
      props.underline.value && underlineByStatus
    );
  });

  const labelClasses = computed(() => {
    const vs = props.validationStatus.value;
    const classByStatus =
      vs === validationStatusMap.Success
        ? "text-green-700 dark:text-green-500"
        : vs === validationStatusMap.Error
        ? "text-red-700 dark:text-red-500"
        : "text-gray-900 dark:text-white";

    return twMerge(baseLabelClasses, classByStatus);
  });

  return {
    selectClasses,
    labelClasses,
  };
}

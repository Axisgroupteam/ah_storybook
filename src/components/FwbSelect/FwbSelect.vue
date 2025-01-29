<template>
  <div ref="wrapper" class="relative">
    <span
      v-if="label"
      :class="[
        labelClasses,
        disabled ? '!text-neutral-400 dark:!text-neutral-500' : '',
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500"> * </span>
    </span>
    <FwbInput
      :key="selectedName"
      v-model="selectedName"
      :disabled="disabled"
      type="text"
      :class="inputClasses"
      :placeholder="placeholder"
      readonly
      :validation-status="validationStatus === 'error' ? 'error' : 'normal'"
      @click.stop="handleClick"
    >
      <template #suffix>
        <svg
          :class="[
            svgClasses,
            validationStatus === 'error'
              ? '!text-red-600 dark:!text-red-500'
              : '',
            disabled ? '!text-neutral-400 dark:!text-neutral-500' : '',
            visible
              ? props.dropDirection === 'up'
                ? 'rotate-0'
                : 'rotate-180'
              : props.dropDirection === 'up'
              ? 'rotate-180'
              : '',
          ]"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </template>
    </FwbInput>
    <div
      v-if="visible && !loading"
      :class="[
        'bg-neutral-50 dark:bg-neutral-700 z-[9999] p-3 shadow-md rounded-lg border-neutral-200 w-full',
        dropDirection === 'up' ? 'bottom-full -mb-5' : 'top-full mt-2',
        isAbsolute ? 'absolute' : '',
      ]"
      @click.stop
    >
      <PerfectScrollbar>
        <div class="w-full max-h-[144px]">
          <div
            v-for="(op, index) in options"
            :key="index"
            class="px-2 py-2 whitespace-nowrap flex gap-2 justify-start items-center hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium w-full"
            @click="handleSelect(op)"
          >
            <div v-if="op.icon">
              <IconWrapper
                :name="op.icon"
                class="h-full w-full max-h-5 max-w-5"
                size="14"
              />
            </div>
            {{ op.name }}
          </div>
        </div>
      </PerfectScrollbar>
    </div>
    <div
      v-if="visible && loading"
      :class="[
        'bg-neutral-50 dark:bg-neutral-700 z-10 p-3 shadow-md rounded-lg border-neutral-200 w-full flex justify-center items-center',
        props.dropDirection === 'up' ? 'top-0' : 'top-full mt-2',
        isAbsolute ? 'absolute' : '',
      ]"
    >
      <FwbSpinner color="red" />
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot v-if="!visible" name="validationMessage" />
    </p>
    <p
      v-if="$slots.helper"
      class="mt-2 text-sm text-gray-500 dark:text-gray-400"
    >
      <slot name="helper" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs, ref, watch } from "vue";
import { useVModel } from "@vueuse/core";
import { twMerge } from "tailwind-merge";
import { useSelectClasses } from "./composables/useSelectClasses";
import type { InputSize } from "./../FwbInput/types";
import IconWrapper from '@/components/IconWrapper.vue'
import {
  type OptionsType,
  type ValidationStatus,
  validationStatusMap,
} from "./types";
import FwbInput from "../FwbInput/FwbInput.vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { onClickOutside } from "@vueuse/core";
import { getFBIcon } from "@/utils/getAssets";
import FwbSpinner from "../FwbSpinner/FwbSpinner.vue";

interface InputProps {
  modelValue?: string;
  label?: string;
  options?: OptionsType[];
  placeholder?: string;
  disabled?: boolean;
  underline?: boolean;
  size?: InputSize;
  validationStatus?: ValidationStatus;
  initialState?: string;
  loading?: boolean;
  required?: boolean;
  dropDirection?: "up" | "down";
  isAbsolute: boolean;
}
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  label: "",
  options: () => [],
  placeholder: "Please select one",
  disabled: false,
  underline: false,
  loading: false,
  size: "md",
  validationStatus: undefined,
  initialState: "",
  required: false,
  dropDirection: "down",
  isAbsolute: true,
});
const emit = defineEmits(["update:modelValue", "blur"]);

const model = useVModel(props, "modelValue", emit);

// Inicializar selectedName con el valor de initialState si está presente
const selectedName = ref("");

watch(
  [computed(() => props.initialState), computed(() => props.options)],
  ([newInitialState]) => {
    const selectedOption = props.options.find(
      (item) => item.value === newInitialState
    );
    selectedName.value = selectedOption ? selectedOption.name : "";
  },
  { immediate: true }
);

const visible = ref(false);

const wrapper = ref<HTMLDivElement>();

const handleSelect = (op: any) => {
  model.value = op.value;
  selectedName.value = op.name;
  emit("blur");
  visible.value = false;
};

const { labelClasses } = useSelectClasses(toRefs(props));

const validationWrapperClasses = computed(() =>
  twMerge(
    "text-sm",
    props.validationStatus === validationStatusMap.Success
      ? "text-green-600 dark:text-green-500"
      : "",
    props.validationStatus === validationStatusMap.Error
      ? "text-red-600 dark:text-red-500"
      : ""
  )
);

const optionCLasses = {
  disabled: {
    visible: "w-full ",
    notVisible:
      "w-full border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 focus:dark:border-neutral-600",
  },
  able: {
    visible: "w-full border-red-500  cursor-pointer",
    notVisible:
      "w-full border-neutral-300 cursor-pointer dark:border-neutral-600 focus:border-neutral-500 focus:dark:border-red-500",
  },
};

const disabledValue = computed(() => (props.disabled ? "disabled" : "able"));
const visibleValue = computed(() => (visible.value ? "visible" : "notVisible"));

const inputClasses = computed(
  () => optionCLasses[disabledValue.value][visibleValue.value]
);

const optionSvgClasses = {
  disabled: {
    visible:
      "text-neutral-500 dark:text-neutral-400 w-6 h-6 shrink-0 -ml-[2px] cursor-not-allowed",
    notVisible:
      "text-neutral-500 dark:text-neutral-400 w-6 h-6 shrink-0 -ml-[2px] cursor-not-allowed",
  },
  able: {
    visible: "text-neutral-900 dark:text-white w-6 h-6 shrink-0 -ml-[2px]",
    notVisible:
      "text-neutral-500 dark:text-neutral-400 w-6 h-6 shrink-0 -ml-[2px]",
  },
};
const svgClasses = computed(
  () => optionSvgClasses[disabledValue.value][visibleValue.value]
);

const handleClick = () => {
  if (!props.disabled) {
    visible.value = !visible.value;
  }
};

onClickOutside(wrapper, () => {
  if (!visible.value) return;
  visible.value = false;
});
</script>

<style></style>

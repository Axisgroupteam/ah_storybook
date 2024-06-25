<template>
  <div>
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    <div class="flex relative">
      <div
        v-if="$slots.prefix"
        class="w-10 flex absolute inset-y-0 left-0 items-center pl-3 overflow-hidden"
      >
        <slot name="prefix" />
      </div>
      <input
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :type="type"
        :required="required"
        :class="[
          inputClasses,
          $slots.prefix ? 'pl-10' : '',
          dark ? 'autofill-text' : '',
        ]"
        :readonly="readonly"
        @input="handleInput"
      />
      <div
        v-if="$slots.suffix"
        class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0"
        @click="toggle"
      >
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" />
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
import { computed, ref, toRefs } from "vue";
import { twMerge } from "tailwind-merge";
import { useInputClasses } from "./composables/useInputClasses";
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
} from "./types";
import { storeToRefs } from "pinia";
//import { useAuthStore } from "@/new_design/auth/stores/auth";

interface InputProps {
  disabled?: boolean;
  label?: string;
  modelValue: string;
  required?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
  readonly?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: "",
  modelValue: "",
  required: false,
  size: "md",
  type: "text",
  validationStatus: undefined,
  readonly: false,
});

const emit = defineEmits(["update:modelValue", "toggleVisibility"]);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};

const toggle = () => {
  emit("toggleVisibility");
};

const { inputClasses, labelClasses } = useInputClasses(toRefs(props));

const validationWrapperClasses = computed(() =>
  twMerge(
    "mt-2 text-sm",
    props.validationStatus === validationStatusMap.Success
      ? "text-green-600 dark:text-green-500"
      : "",
    props.validationStatus === validationStatusMap.Error
      ? "text-red-600 dark:text-red-500"
      : ""
  )
);

//const authStore = useAuthStore();
//const { dark } = storeToRefs(authStore);

const dark = ref(false);
</script>

<style scoped>
.autofill-text:-webkit-autofill {
  -webkit-text-fill-color: rgb(163, 163, 163);
}
input {
  @apply dark:autofill:text-neutral-400;
  @apply autofill:shadow-[inset_0_0_0px_1000px_#FAFAFA];
  @apply dark:autofill:shadow-[inset_0_0_0px_1000px_#404040] dark:autofill:border-neutral-600;
}
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
</style>

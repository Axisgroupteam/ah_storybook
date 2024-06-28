<template>
  <div class="flex gap-2 items-center">
    <input
      type="radio"
      :id="id"
      :name="groupName"
      :value="value"
      v-model="selectedValue"
      class="mb-2 w-4 h-4 text-red-700 focus:border-red-700 dark:focus:border-red-700 focus:ring-red-700 dark:focus:ring-red-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white"
      @change="handleSelection"
    />
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, toRefs } from "vue";
import { type ValidationStatus } from "@/new_design/utils/UseInputClass/types";

import { useInputClasses } from "@/new_design/utils/UseInputClass/useInputClasses";

interface RadioProps {
  id: string;
  disabled?: boolean;
  label: string;
  modelValue: string;
  required?: boolean;
  value: string;
  groupName: string;
  name: string;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
}

const props = withDefaults(defineProps<RadioProps>(), {
  id: "",
  disabled: false,
  label: "",
  modelValue: "",
  required: false,
  value: "",
  groupName: "",
  name: "",
  size: "md",
  type: "text",
  validationStatus: undefined,
});

const { inputClasses, labelClasses, validationWrapperClasses } =
  useInputClasses(toRefs(props));

const emits = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue);

const handleSelection = () => {
  emits("update:modelValue", selectedValue.value);
};

// Watch to keep prop and internal state in sync
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal;
  }
);
</script>

<style scoped></style>

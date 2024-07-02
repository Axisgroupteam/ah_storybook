<template>
  <div  >
    <div v-if="label" class="flex flex-row justify-start">
     <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    </div>
    <div class="flex w-full flex-col justify-start"> 
            <div class="relative">
                <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <input 
                  type="time" 
                  id="time" 
                  class="leading-none block w-full p-2.5  " 
                  :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"                  
                  :value="modelValue" 
                  :required="required"
                  :disabled="disabled"                  
                  @input="handleInput"
                  />
            </div>  

      <slot data-testid="input-icon" name="trailing" />
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" />
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, toRefs, computed } from "vue";
import { useInputClasses } from "./composables/useInputClasses";
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
} from "./types";
import { twMerge } from "tailwind-merge";

const dp = ref();

interface InputProps {
  id?: string;
  modelValue?: Date;
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  checkPattern?: boolean;
  msgPatternError?: string;
  isTime?: boolean;
  validValue?: boolean;
  errorMessage?: string;
  isRestricted?: boolean;
  disabled?: boolean;
  themeDark?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
}

const props = withDefaults(defineProps<InputProps>(), {
  id: "",
  disabled: false,
  label: "",
  modelValue: "",
  required: false,
  size: "md",
  type: "text",
  validationStatus: undefined,
  placeholder: "",
  pattern: "",
  checkPattern: false,
  msgPatternError: "The format is wrong",
  themeDark: false,
  isTime: false,
  validValue: false,
  errorMessage: "",
  isRestricted: true,
});

const { inputClasses, labelClasses } =
  useInputClasses(toRefs(props));

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

const emit = defineEmits(["update:modelValue", "blur"]);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

onMounted(() => {
 
});


</script>
<style scoped>

</style>

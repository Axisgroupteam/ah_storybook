<template>
  <div  >
    <div v-if="label" class="flex flex-row justify-start">
     <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    </div>
    <div class="flex w-full flex-col justify-start">
      <VueDatePicker
        ref="dp"
        v-model="date"
        :teleport="true"
        time-picker
        input-class-name="dp-custom-input"
        menu-class-name="dp-custom-menu"
        calendar-cell-class-name="dp-custom-cell"
        :state="false"
        auto-apply
        :dark="themeDark"
      >

      <template #dp-input="{ value }">
          <fwb-input
            type="text"
            readonly
            :modelValue="value"
            :placeholder="placeholder" 
            :validation-status="validationStatus"
            style="width: 100%; text-align: center; align-items: center;"
          >
           <template #prefix>
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80025 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40924 11.3656 2.88413 10.2407 1.75929C9.11587 0.634449 7.59076 0.00174696 6 0ZM8.3892 8.3892C8.27668 8.50168 8.1241 8.56487 7.965 8.56487C7.8059 8.56487 7.65332 8.50168 7.5408 8.3892L5.5764 6.4248C5.46417 6.31181 5.40082 6.15925 5.4 6V3.6C5.4 3.44087 5.46322 3.28826 5.57574 3.17574C5.68826 3.06321 5.84087 3 6 3C6.15913 3 6.31174 3.06321 6.42427 3.17574C6.53679 3.28826 6.6 3.44087 6.6 3.6V5.7516L8.3892 7.5408C8.50168 7.65331 8.56487 7.8059 8.56487 7.965C8.56487 8.1241 8.50168 8.27668 8.3892 8.3892Z" fill="#737373"/>
              </svg>
            </template> 
          </fwb-input>
        </template>        

        <template #action-extra="{ selectCurrentTime }">
          <div
            class="flex w-full justify-center items-center gap-2 pb-2 -top-5"
          >
            <fwb-button color="secondary" :loading="false" @click="clearDate">
              Clear
            </fwb-button>
          </div>
        </template>     
        
      </VueDatePicker>
      <slot data-testid="input-icon" name="trailing" />
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" />
    </p>
  </div>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, watch, onMounted, toRefs, computed } from "vue";
import { useInputClasses } from "./composables/useInputClasses";

import "./datepicker/datepicker.scss";

import FwbButton from "../FwbButton/FwbButton.vue";
import FwbInput from "../FwbInput/FwbInput.vue";

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
const date = ref("");

watch(date, (val) => {
  if (val instanceof Date) {
    emit("update:modelValue", val.toISOString());
  } else {
    emit("update:modelValue", val);
  }

  //}
});

onMounted(() => {
  if (!props.isTime) {
    if (props.modelValue && !isNaN(new Date(props.modelValue))) {
      date.value = new Date(props.modelValue).toISOString();
    } else {
      date.value = new Date().toISOString();
    }
  }
  if (props.isTime) {
    if (props.modelValue) {
      date.value = {
        hours: props.modelValue?.hours,
        minutes: props.modelValue?.minutes,
      };
    } else {
      date.value = {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      };
    }
  }
  emit("update:modelValue", new Date().toISOString());
});

const selectDate = () => {
  dp.value.selectDate();
};

const clearDate = () => {
  dp.value.closeMenu();
};
</script>
<style scoped>
.input-slot-image {
  @apply pl-2 pr-6;
}
.dp-custom-menu {
  box-shadow: 10 0 16px #b91c1c;
}

.dp-custom-cell {
  border-radius: 50%;
}
</style>

<template>
  <div data-testid="input-wrapper" class="flex flex-col w-full">
    <div v-if="label" class="flex justify-start">
      <span :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </span>
      <slot name="labelEnd" />
    </div>
    <div class="flex w-full flex-col justify-start ">
      <VueDatePicker
        ref="dp"
        v-model="date"
        :teleport="true"
        :format="formatter"
        :time-picker="false"
        display-format="YYYY.MM.DD"
        input-class-name="dp-custom-input"
        menu-class-name="dp-custom-menu"
        calendar-cell-class-name="dp-custom-cell"
        ignore-time-validation
        :enable-time-picker="false"
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
            style="width: 100%; text-align: center;"
          >
           <template #prefix>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M12.3 1.6V2.1H12.8H14.4C14.6917 2.1 14.9715 2.21589 15.1778 2.42218C15.3841 2.62847 15.5 2.90826 15.5 3.2V4.3H0.5V3.2C0.5 2.90826 0.615892 2.62847 0.822182 2.42218C1.02847 2.21589 1.30826 2.1 1.6 2.1H3.2H3.7V1.6V0.8C3.7 0.720435 3.73161 0.644129 3.78787 0.587868C3.84413 0.531607 3.92044 0.5 4 0.5C4.07957 0.5 4.15587 0.531607 4.21213 0.587867C4.26839 0.644129 4.3 0.720435 4.3 0.8V1.6V2.1H4.8H7.2H7.7V1.6V0.8C7.7 0.720435 7.73161 0.644129 7.78787 0.587868C7.84413 0.531607 7.92043 0.5 8 0.5C8.07957 0.5 8.15587 0.531607 8.21213 0.587868C8.26839 0.644129 8.3 0.720435 8.3 0.8V1.6V2.1H8.8H11.2H11.7V1.6V0.8C11.7 0.720435 11.7316 0.644128 11.7879 0.587868C11.8441 0.531607 11.9204 0.5 12 0.5C12.0796 0.5 12.1559 0.531607 12.2121 0.587868C12.2684 0.644128 12.3 0.720434 12.3 0.8V1.6ZM0.822183 15.1778C0.615892 14.9715 0.5 14.6917 0.5 14.4V6.9H15.5V14.4C15.5 14.6917 15.3841 14.9715 15.1778 15.1778C14.9715 15.3841 14.6917 15.5 14.4 15.5H1.6C1.30826 15.5 1.02847 15.3841 0.822183 15.1778ZM12 7.5H4C3.65522 7.5 3.32456 7.63696 3.08076 7.88076C2.83696 8.12456 2.7 8.45522 2.7 8.8C2.7 9.14478 2.83696 9.47544 3.08076 9.71924C3.32456 9.96304 3.65522 10.1 4 10.1H12C12.3448 10.1 12.6754 9.96304 12.9192 9.71924C13.163 9.47544 13.3 9.14478 13.3 8.8C13.3 8.45522 13.163 8.12456 12.9192 7.88076C12.6754 7.63696 12.3448 7.5 12 7.5Z" fill="#737373" stroke="#737373"/>
          </svg>
        </template> 
        </fwb-input>
        </template>        

        <template #action-extra="{ selectCurrentDate }">
          <div class="flex w-full justify-center items-center gap-4 pb-2">
            <fwb-button
              color="primary"
              :loading="false"
              @click="selectCurrentDate()"
            >
              Today
            </fwb-button>
            <fwb-button color="secondary" :loading="false" @click="clearDate">
              Clear
            </fwb-button>
          </div>
        </template>      
        
      </VueDatePicker>
      <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
        <slot name="validationMessage" />
      </p>
      <slot data-testid="input-icon" name="trailing" />
    </div>   
  </div>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, watch, onMounted, toRefs, computed } from "vue";
import { useInputClasses } from "./composables/useInputClasses";

import FwbButton from "../FwbButton/FwbButton.vue";
import FwbInput from "../FwbInput/FwbInput.vue";

import "./datepicker/datepicker.scss";

import {
  validationStatusMap,
  type InputSize,
  type InputType,
  type ValidationStatus,
} from "./types";
import { twMerge } from 'tailwind-merge';

const dp = ref();
const dark = ref(false);

const disabledDates = (e) => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return props.isRestricted ? new Date(e) < yesterday : "";
};

const formatter = (date: any, with_time: false) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const min = date.getMinutes();
  return with_time
    ? `${month}/${day}/${year},${hours}:${min}`
    : `${month}/${day}/${year}`;
};

interface InputProps {
  id?: string;
  modelValue?: string;
  label?: string;
  placeholder?: string;
  required?: boolean; 
  disabled?: boolean;
  themeDark?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
  isRestricted?: boolean;
  isTime?: boolean;
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
  isRestricted: true, 
  isTime: false,
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

<!-- src/components/CustomTimePicker.vue -->
<template>
  <div class="">
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    <div class="flex relative p-0 m-0">
      <div
        v-if="$slots.prefix"
        class="w-10 flex absolute inset-y-0 left-0 items-center pl-0 justify-center overflow-hidden text-neutral-500 dark:text-neutral-400 cursor-pointer"
        :class="[
          validationStatus === 'error'
            ? '!text-red-600 dark:!text-red-500'
            : '',
          disabled
            ? '!text-neutral-400 dark:!text-neutral-500 !cursor-not-allowed'
            : '',
        ]"
      >
        <slot name="prefix" />
      </div>      
      <div
        class="flex items-center justify-start m-0 p-0"
        :class="[
          inputClasses,
          $slots.prefix ? 'pl-10' : '',
          showDropdown ? seletedInputClasses : '',
        ]"
        :style="{
          padding: '10px',
          height: '40px',
        }"
        @click.stop="inputHours?.focus()"
      >
        <input
          id="hours"
          ref="inputHours"
          v-model.number="selectedHour"          
          type="number"          
          min="1"
          max="12"
          maxlength="2"
          :disabled="disabled"
          :size="size"
          placeholder="--"
          class="w-4 no-border no-spinner no-outline dynamic-width-input bg-neutral-50 dark:bg-neutral-700"
          :class="inputClassesError"
          @focus="selectAllText"
          @input="validateHour"
          @keydown="checkKey($event, 'inputHours')"
          @click.stop="inputHours?.focus()"
          @keydown.down.prevent="checkDown($event, 'inputHours')"
          @keydown.up.prevent="checkUP($event, 'inputHours')"
        />
        <div class="h-4 flex items-center justify-center">
          <span           
            :class="[
              {
                'text-neutral-500': disabled,
                'text-neutral-900  dark:text-white': !disabled,
              },
              inputClassesError
            ]"
            >:</span
          >
        </div>
        <input
          id="minutes"
          ref="inputMinutes"
          v-model="selectedMinute"
          type="number"          
          min="0"
          max="59"
          maxlength="2"
          :disabled="disabled"
          :size="size"
          placeholder="--"
          class="w-4 no-border no-spinner no-outline dynamic-width-input bg-neutral-50 dark:bg-neutral-700"
          :class="inputClassesError"
          @focus="selectAllText"
          @input="validateMinute"
          @keydown="checkKey($event, 'inputMinutes')"
          @click.stop="inputMinutes?.focus()"
          @keydown.down.prevent="checkDown($event, 'inputMinutes')"
          @keydown.up.prevent="checkUP($event, 'inputMinutes')"
        />

        <input
          id="period"
          ref="inputPeriods"
          v-model="selectedPeriod"
          type="text"         
          :size="size"
          :disabled="disabled"
          maxlength="2"
          placeholder="--"
          class="no-border no-outline dynamic-width-input max-w-[25px] min-w-[25px] bg-neutral-50 dark:bg-neutral-700"
          :class="inputClassesError"
          @input="validatePeriod"
          @focus="selectAllText"
          @keydown="checkKey($event, 'inputPeriods')"
          @click.stop="inputPeriods?.focus()"
          @keydown.down.prevent="checkDownOrUpPeriod"
          @keydown.up.prevent="checkDownOrUpPeriod"
        />
      </div>
      <div
        v-if="$slots.suffix"
        class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 text-neutral-500 dark:text-neutral-400"
        :class="[
          validationStatus === 'error'
            ? '!text-red-600 dark:!text-red-500'
            : '',
          disabled
            ? '!text-neutral-400 dark:!text-neutral-500 cursor-none'
            : 'cursor-pointer',
        ]"
        @click="toggleDropdown"
      >
        <slot name="suffix" />
      </div>
      <div
        v-else
        class="absolute flex items-center justify-center w-[40px] h-full bg-transparent right-[1px] bottom-0"
        :class="[
          !disabled ? 'cursor-pointer' : 'cursor-none',
          validationWrapperClassesIcon,
        ]"
        @click="toggleDropdown"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div
      v-if="showDropdown"
      ref="wrapper"      
      class="shadow-drowpdown absolute mt-2 p-4 bg-neutral-50 dark:bg-neutral-700 text-xs font-bold text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-600 rounded-lg z-10 transition ease-in-out delay-75"
    >
      <div class="grid grid-cols-3 gap-2">
        <div
          class="flex flex-col items-center overflow-y-auto max-h-[238px] custom-scroll"
        >
          <div
            ref="hoursColumn"
            class="column"
            @scroll="() => onScroll('hours')"            
          >
            <div
              v-for="(hour, index) in hoursToShow"
              :key="'hour-' + index"             
              :class="{
                'bg-red-700 text-white rounded-lg flex align-middle justify-center':
                  hour === selectedHour,
                'cursor-pointer p-1': true,
              }"
              class="w-9 h-9 hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center active:bg-red-700 items-center"
               @click="selectHour(hour, index)"
            >
              {{ hour }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-col items-center overflow-y-auto max-h-[238px] custom-scroll"
        >
          <div
          ref="minutesColumn"
            class="column"
            @scroll="() => onScroll('minutes')"
            
          >
            <div
              v-for="(minute, index) in minutesToShow"
              :key="'minute-' + index"             
              :class="{
                'bg-red-700 text-white rounded-lg flex align-middle justify-center':
                  minute === selectedMinute,
                'cursor-pointer p-2': true,
              }"
              class="w-9 h-9 hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center items-center"
               @click="selectMinute(minute, index)"
            >
              {{ minute }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-col items-center overflow-y-auto max-h-[238px] custom-scroll"
        >
          <div
            ref="periodsColumn"
            class="column"
            @scroll="() => onScroll('periods')"            
          >
            <div
              v-for="(period, index) in periods"
              :key="'period-' + index"             
              :class="{
                'bg-red-700 text-white rounded-lg flex align-middle justify-center':
                  period === selectedPeriod,
                'cursor-pointer p-2': true,
              }"
              class="w-9 h-9 hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center items-center"
              @click="selectPeriod(period, index)"
            >
              {{ period }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot v-if="showValidationMessage" name="validationMessage" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useTimePicker } from "./composables/useTimePicker";
import { useInputClasses } from "./composables/useInputClasses";
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
} from "./types";
import { twMerge } from "tailwind-merge";
import { computed, nextTick, onMounted, watch } from "vue";

interface InputProps {
  disabled?: boolean;
  label?: string;
  initialValue?: string;
  required?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
  readonly?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: "",
  initialValue: "",
  required: false,
  size: "md",
  type: "text",
  validationStatus: "normal",
  readonly: false,
  modelValue: "12:00",
});

const emit = defineEmits(["update:modelValue", "toggleVisibility"]);
const classes = computed(() =>
  useInputClasses(props.size, props.disabled, props.validationStatus)
);

const inputClasses = computed(() => classes.value.inputClasses.value);
const labelClasses = computed(() => classes.value.labelClasses.value);

const inputClassesError = computed(() =>
  twMerge(
    "text-sm",
    props.validationStatus === "error"
      ? "bg-red-50 text-red-900 dark:text-red-500 place-holder:text-red-900 placeholder-red-900 dark:placeholder-red-500"
      : props.disabled
      ? "text-neutral-500"
      : "text-neutral-900 dark:text-white"
  )
);

const seletedInputClasses = "ring-red-500 border-red-500";

const validationWrapperClasses = computed(() =>
  twMerge(
    "text-sm",
    props.validationStatus === validationStatusMap.Error
      ? "text-red-600 dark:text-red-500"
      : ""
  )
);

const validationWrapperClassesIcon = computed(() =>
  twMerge(
    "text-sm",
    props.validationStatus === validationStatusMap.Error
      ? "text-red-600 dark:text-red-500"
      : "text-neutral-500 dark:text-neutral-400"
  )
);

const {
  checkKey,
  checkDown,
  checkUP,
  checkDownOrUpPeriod,
  convertTo24HourFormat,
  formattedTime,
  formatTime,
  hoursColumn,
  hoursToShow,
  inputHours,
  inputMinutes,
  inputPeriods,
  minutesColumn,
  minutesToShow,
  onScroll,
  periods,
  selectAllText,
  selectedHour,
  selectedMinute,
  selectedPeriod,
  selectHour,
  selectMinute,
  selectPeriod,
  showDropdown,
  showValidationMessage,
  updateAllColumns,
  validateHour,
  validateMinute,
  validatePeriod,
  wrapper,
} = useTimePicker();

const toggleDropdown = () => {
  if (!props.disabled) {
    showValidationMessage.value = false;
    showDropdown.value = !showDropdown.value;
    if (showDropdown.value) {
      nextTick(() => {
        const selectedHourElement = document.querySelector(".selected-hour");
        const selectedMinuteElement =
          document.querySelector(".selected-minute");
        const selectedPeriodElement =
          document.querySelector(".selected-period");

        selectedHourElement?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
        selectedMinuteElement?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
        selectedPeriodElement?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      });
    }
  }
};

onMounted(() => {
  if (
    props.modelValue !== null &&
    props.modelValue !== undefined &&
    props.modelValue !== ""
  ) {
    const { hour, minute, period } = formatTime(props.modelValue);

    selectedHour.value = hour.toString().padStart(2, "0");
    selectedMinute.value = minute.toString().padStart(2, "0");
    selectedPeriod.value = period;
  }
  updateAllColumns();
});

watch(selectedHour, () => {
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  emit("update:modelValue", timeReturn);
});

watch(selectedMinute, () => {
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  emit("update:modelValue", timeReturn);
});

watch(selectedPeriod, () => {
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  emit("update:modelValue", timeReturn);
});
</script>

<style scoped>
.column {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
}

input.no-border {
  border: none;
  text-align: center;
  height: 16px;
  padding: 0;
  margin: 0;
}

input.no-spinner::-webkit-outer-spin-button,
input.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.no-spinner {
  -moz-appearance: textfield;
}

input.no-outline:focus {
  /* Eliminar borde, sombra, y cualquier otro estilo predeterminado */
  border: none;
  outline: none;
  box-shadow: none;
  background: none;
  padding: 0;
  margin: 0;
}

.dynamic-width-input {
  /*font-family: monospace; /* To match the hidden text helper */
  text-align: center;
  box-sizing: content-box;
  text-align: left; /* Alinear el texto a la izquierda */
  padding: 0px; /* Adjust if necessary to match the input padding */
}

/* Ocultar barra de scroll */
.custom-scroll::-webkit-scrollbar {
  width: 0; /* Remueve la barra de scroll en navegadores Webkit */
  height: 0; /* Remueve la barra de scroll en navegadores Webkit */
}
.custom-scroll {
  -ms-overflow-style: none; /* IE y Edge */
  scrollbar-width: none; /* Firefox */
}

.shadow-drowpdown {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1) !important;
}
</style>

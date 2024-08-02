<template>
  <div
    v-if="typeCalendar === 'simple'"
    data-testid="input-wrapper"
    class="flex text-white flex-col w-full"
  >
    <div v-if="label" class="flex justify-start">
      <span :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </span>
      <slot name="labelEnd" />
    </div>
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        :class="validationWrapperClassesIcon"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>      
      <input
        :id="id ?? 'datepicker'"
        ref="datePickerSimple"
        type="text"
        class="block w-full ps-10 p-2.5"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
        :disabled="disabled"
        placeholder="Select date"
        datepicker
        datepicker-buttons
        datepicker-autohide
        datepicker-autoselect-today
        @click="desactiveError('picker')"
        @blur="enabledError"
        @changeDate="handleInput"
      />
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot v-if="showValidationMessage" name="validationMessage" />
    </p>
  </div>

  <!-- RENGE DATEPICKER-->
  <div
    v-else-if="typeCalendar === 'range'"
    id="date-range-picker"
    ref="datePickerRange"
    class="flex w-full"
  >
    <div class="w-full">
      <div class="flex justify-start">
        <span :class="labelClasses">
          Start Date
          <span class="text-red-500">*</span>
        </span>
        <slot name="labelEnd" />
      </div>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          :class="validationWrapperClassesIcon"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          id="datepicker-range-start"
          ref="rangePickerStart"
          name="start"
          type="text"
          class="block w-full ps-10 p-2.5"
          :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
          placeholder="Select date start"
          @input="handleInput"
          @click="desactiveError('start')"
          @blur="enabledError"
        />
        <div
          v-if="dateStart"
          class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
          :class="validationWrapperClassesIcon"
          @click.stop="clearDate('start')"
        >
          <svg
            v-if="showTrash"
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
      </div>
      <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
        <slot v-if="showValidationMessageStart" name="validationMessage" />
      </p>
    </div>
    <span class="mt-9 mx-4 text-gray-500">to</span>
    <div class="w-full">
      <div class="flex justify-start">
        <span :class="labelClasses">
          End Date
          <span class="text-red-500">*</span>
        </span>
        <slot name="labelEnd" />
      </div>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          :class="validationWrapperClassesIcon"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          id="datepicker-range-end"
          ref="rangePickerEnd"
          name="end"
          type="text"
          class="block w-full ps-10 p-2.5"
          :class="[inputClasses, $slots.prefix ? 'pl-10' : '']"
          placeholder="Select date end"
        />
        <div
          v-if="dateEnd"
          class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
          :class="validationWrapperClassesIcon"
          @click.stop="clearDate('end')"
        >
          <svg
            v-if="showTrash"
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
      </div>
      <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
        <slot v-if="showValidationMessageEnd" name="validationMessage" />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { initFlowbite, type DatepickerOptions } from "flowbite";
import { DateRangePicker, Datepicker } from "flowbite-datepicker";
import { twMerge } from "tailwind-merge";
import { useInputClasses } from "./composables/useInputClasses";
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
  type TypeCalendar,
} from "./types";
import "flowbite/dist/flowbite.turbo.js";
// LA CARGA GLOBAL DE ESTOS ESTILOS AFECTA LOS DEMAS COMPONENTES
import "./css/flowbite.css";
import "./css/custom.scss";
import { nextTick } from "vue";

const datePickerSimple = ref();
const datePickerRange = ref();
const rangePickerStart = ref();
const rangePickerEnd = ref();

interface InputProps {
  id: string;
  disabled?: boolean;
  label?: string;
  modelValue: string;
  required?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
  readonly?: boolean;
  typeCalendar?: TypeCalendar;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: "",
  modelValue: "",
  required: false,
  size: "md",
  type: "text",
  validationStatus: "normal",
  readonly: false,
  typeCalendar: "simple",
});

const emit = defineEmits(["update:modelValue", "toggleVisibility"]);

const showValidationMessage = ref(true);
const showValidationMessageStart = ref(true);
const showValidationMessageEnd = ref(true);
const dateStart = ref();
const dateEnd = ref();

const showTrash = ref(true);

const classes = computed(() =>
  useInputClasses(props.size, props.disabled, props.validationStatus)
);

const inputClasses = computed(() => classes.value.inputClasses.value);
const labelClasses = computed(() => classes.value.labelClasses.value);

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

const enabledError = () => {
  showValidationMessage.value = true;
};

const desactiveError = (type: "start" | "end" | "picker") => {
  if (type === "picker") showValidationMessage.value = false;
  else if (type === "start") showValidationMessageStart.value = false;
  else if (type === "end") showValidationMessageEnd.value = false;
};

const clearDate = (type: string) => {
  datePickerRangeCmp.value?.setDates({ clear: true });
  showValidationMessageStart.value = true;
  showValidationMessageEnd.value = true;
};

const datePickerRangeCmp = ref<DateRangePicker>();
const datePickerCmp = ref<Datepicker>();

// optional options with default values and callback functions
const options: DatepickerOptions = {
  defaultDatepickerId: null,
  autohide: false,
  format: "mm/dd/yyyy",
  maxDate: null,
  minDate: null,
  orientation: "bottom",
  buttons: true,
  title: null,
};

const eventHandlerStart = (e: Event) => {
  const target = e.target as HTMLInputElement;
  dateStart.value = target.value;
  if (props.typeCalendar === "simple") emit("update:modelValue", target.value);
};

const eventHandlerEnd = (e: Event) => {
  const target = e.target as HTMLInputElement;
  dateEnd.value = target.value;
};

const handleInput = (e: Event) => {
  // datePickerCmp.value?.hide();
  if (!e.target) return;
  const value = (e.target as HTMLInputElement).value;
  const dat = new Date();
  const [month, day, year] = value?.split("/") ?? [];
  dat.setFullYear(
    +(year ?? dat.getFullYear()),
    +(month ? +month - 1 : dat.getMonth()),
    +(day ?? dat.getDate())
  );
  emit("update:modelValue", dat);
};

onMounted(() => {
  nextTick(() => {
    if (props.typeCalendar === "simple") {
      // datePickerCmp.value = new Datepicker(datePickerSimple.value, {
      //   ...options,
      // });
    } else {
      datePickerRangeCmp.value = new DateRangePicker(datePickerRange.value, {
        ...options,
        rangePicker: true,
      });
      if (rangePickerStart.value) {
        rangePickerStart.value?.addEventListener(
          "changeDate",
          eventHandlerStart
        );
      }
      if (rangePickerEnd.value) {
        rangePickerEnd.value?.addEventListener("changeDate", eventHandlerEnd);
      }

      setTimeout(() => {
        const datst = new Date();
        datst.setDate(-10);
        const datend = new Date();
        datend.setDate(10);

        const datst_convert = formatDateToDMYYYY(datst.toISOString());
        const datend_convert = formatDateToDMYYYY(datend.toISOString());

        datePickerRangeCmp.value?.setDates([datst_convert, datend_convert]);
      }, 1000);
    }
  });

  initFlowbite();
});

onBeforeUnmount(() => {
  if (rangePickerStart.value) {
    rangePickerStart.value?.removeEventListener(
      "changeDate",
      eventHandlerStart
    );
  }
  if (rangePickerEnd.value) {
    rangePickerEnd.value?.removeEventListener("changeDate", eventHandlerEnd);
  }
});

function formatDateToDMYYYY(dateString: string) {
  // Crear un objeto de fecha a partir del string ISO
  const date = new Date(dateString);

  // Extraer el día, mes y año
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Los meses van de 0 a 11
  const year = date.getUTCFullYear();

  // Formatear día y mes con dos dígitos
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Retornar la fecha en el formato deseado
  return `${formattedDay}/${formattedMonth}/${year}`;
}

function getPreviousSaturday(dateString: string) {
  // Crear un objeto de fecha a partir del string ISO
  const date = new Date(dateString);

  // Obtener el día de la semana (0 es domingo, 6 es sábado)
  const dayOfWeek = date.getUTCDay();

  // Calcular la diferencia en días hasta el sábado anterior
  const daysToPreviousSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1;

  // Restar los días necesarios para llegar al sábado anterior
  date.setUTCDate(date.getUTCDate() - daysToPreviousSaturday);

  // Extraer el día, mes y año
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Los meses van de 0 a 11
  const year = date.getUTCFullYear();

  // Formatear día y mes con dos dígitos
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Retornar la fecha en el formato deseado
  return `${formattedDay}/${formattedMonth}/${year}`;
}
</script>

<style scoped></style>

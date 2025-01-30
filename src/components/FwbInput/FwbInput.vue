<template>
  <div>
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    <div class="flex relative">
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
      <input
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :type="type"
        :required="required"
        :class="[
          inputClasses,
          $slots.prefix ? 'pl-10' : '',
          disabled ? 'opacity-75' : '',
        ]"
        :readonly="readonly"
        @input="handleInput"
        @keypress.enter="$emit('enterPressed', $event)"
      />
      <div
        v-if="$slots.suffix"
        class="absolute flex items-center justify-center min-w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 text-neutral-500 dark:text-neutral-400"
        :class="[
          validationStatus === 'error'
            ? '!text-red-600 dark:!text-red-500'
            : '',
          disabled ? '!text-neutral-400 dark:!text-neutral-500' : '',
        ]"
        @click="toggle"
      >
        <slot name="suffix" />
      </div>
      <div
        v-if="showNumberControls"
        class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 top-0 text-neutral-500 dark:text-neutral-400"
        :class="
          validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : ''
        "
      >
        <div class="flex flex-col justify-center items-center h-full w-full">
          <component
            :is="icons.caretUp"
            class="cursor-pointer"
            @click="handleIncrement"
          />
          <component
            :is="icons.caretDown"
            class="cursor-pointer"
            @click="handleDecrement"
          />
        </div>
      </div>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" />
    </p>
    <p
      v-if="$slots.helper"
      class="mt-2 text-sm text-neutral-500 dark:text-neutral-400"
    >
      <slot name="helper" />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, watch, reactive } from "vue";
import { twMerge } from "tailwind-merge";
import { useInputClasses } from "./composables/useInputClasses";
import {
  type InputSize,
  type InputType,
  type ValidationStatus,
  validationStatusMap,
} from "./types";
import { getFBIcon } from "@/utils/getAssets";

interface InputProps {
  disabled?: boolean;
  label?: string;
  initialValue?: string | number;
  required?: boolean;
  size?: InputSize;
  type?: InputType;
  validationStatus?: ValidationStatus;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  modelValue?: string | number;
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
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  modelValue: "",
});

const emit = defineEmits([
  "update:modelValue",
  "toggleVisibility",
  "enterPressed",
]);

// Inicializa el valor interno con el valor del modelo
const internalValue = ref(props.modelValue);

// Observa cambios en el valor del modelo para mantener sincronización
watch(
  () => props.modelValue,
  (newValue) => {
    // Solo actualizar si el valor interno es diferente al nuevo valor
    if (internalValue.value !== newValue) {
      if (props.type === "number") {
        internalValue.value =
          newValue === null || newValue === "" ? "" : String(newValue);
      } else {
        internalValue.value = newValue;
      }
    }
  },
  { immediate: true }
);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  if (props.type === "number") {
    // Permitir valor vacío
    if (value === "") {
      internalValue.value = "";
      emit("update:modelValue", null); // Cambiar a null en lugar de string vacío
      return;
    }

    const numValue = Number(value);

    // Solo validar límites si es un número válido
    if (!isNaN(numValue)) {
      if (numValue < props.min) {
        internalValue.value = String(props.min);
        emit("update:modelValue", props.min);
        return;
      } else if (numValue > props.max) {
        internalValue.value = String(props.max);
        emit("update:modelValue", props.max);
        return;
      }

      internalValue.value = value;
      emit("update:modelValue", numValue);
    } else {
      // Si no es un número válido, mantener el valor actual
      internalValue.value = value;
    }
  } else {
    internalValue.value = value;
    emit("update:modelValue", value);
  }
};

const increment = () => {
  // Solo ejecutar si es tipo número y está habilitado
  if (!props.disabled && !props.readonly && props.type === "number") {
    const currentValue = Number(internalValue.value);
    // Si no es un número válido, comenzar desde 0 o el mínimo
    const baseValue = isNaN(currentValue)
      ? Math.max(0, props.min)
      : currentValue;
    const newValue = Math.min(baseValue + props.step, props.max);
    internalValue.value = String(newValue);
    emit("update:modelValue", newValue);
  }
};

const decrement = () => {
  // Solo ejecutar si es tipo número y está habilitado
  if (!props.disabled && !props.readonly && props.type === "number") {
    const currentValue = Number(internalValue.value);
    // Si no es un número válido, comenzar desde 0 o el máximo
    const baseValue = isNaN(currentValue)
      ? Math.min(0, props.max)
      : currentValue;
    const newValue = Math.max(baseValue - props.step, props.min);
    internalValue.value = String(newValue);
    emit("update:modelValue", newValue);
  }
};

const toggle = () => {
  if (!props.disabled) emit("toggleVisibility");
};

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

const icons = reactive({
  caretUp: computed(() => getFBIcon("caret-up")),
  caretDown: computed(() => getFBIcon("caret-down2")),
});

// Mostrar los controles de incremento/decremento solo si es tipo número
const showNumberControls = computed(() => {
  return props.type === "number" && !props.disabled && !props.readonly;
});

const handleIncrement = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.classList.add("scale-animation");
  setTimeout(() => target.classList.remove("scale-animation"), 200);
  increment();
};

const handleDecrement = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.classList.add("scale-animation");
  setTimeout(() => target.classList.remove("scale-animation"), 200);
  decrement();
};
</script>

<style scoped>
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.scale-animation {
  animation: scale 0.2s ease-in-out;
}

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

/* Para navegadores basados en Webkit (Chrome, Safari, etc.) */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Para Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Estilos para el autofill en tema claro */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #171717 !important;
  transition: background-color 5000s ease-in-out 0s;
  background-clip: content-box !important;
}

/* Estilos para el autofill en tema oscuro */
.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover,
.dark input:-webkit-autofill:focus,
.dark input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #404040 inset !important;
  -webkit-text-fill-color: white !important;
}

/* Para Firefox */
input:autofill {
  background-color: transparent !important;
  color: inherit !important;
}
</style>



<template>
    <div class="max-w-xs mx-auto">   
        <label v-if="label" for="counter-input" :class="labelClasses">
            {{ label }} <span v-if="required" class="text-red-500">* </span>
      </label>

    <div class="relative flex items-center">        
        <fwb-button
            :ring="false"
            :square="true"
            color="secondary"
            :pill="false"
            text=""           
            @click="decreaseQuantity"
        >         
            <svg class="w-2.5 h-2.5 text-neutral-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>                
        </fwb-button>

      
        <input 
            ref="inputRef"
            type="number" 
            id="counter-input" 
            data-input-counter 
            :class="['flex-shrink-0 border-0 bg-transparent focus:outline-none focus:ring-0  text-center text-neutral-900 dark:text-white min-w-[1ch]', maxWidthClass]" 
            placeholder="" 
            :value="internalValue" 
            :readonly="readonly"
            required 
            @input="onInput"
            />
       
        <fwb-button
            :ring="false"
            :square="true"
            color="secondary"
            :pill="false"
            text=""
            @click="incrementQuantity"
        >
           <svg class="w-2.5 h-2.5 text-neutral-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </fwb-button>

    </div>

    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed, ref, watch } from "vue"
import type { InputType, InputSize, ValidationStatus } from "../FwbInput/types"
import { useChooseQuantityClasses } from './composables/useChooseQuantityClasses';

import FwbButton from '../FwbButton/FwbButton.vue';

interface InputProps {
  disabled?: boolean
  label?: string
  initialValue?: number
  required?: boolean
  size?: InputSize  
  validationStatus?: ValidationStatus
  readonly?: boolean
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  label: '',
  initialValue: 0,
  required: false,
  size: 'md',  
  validationStatus: 'normal',
  readonly: false,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1
})

const emit = defineEmits(['update:value', 'update:modelValue'])

const inputRef = ref(null);

const internalValue = ref(props.initialValue ?? 0)

const classes = computed(() => useChooseQuantityClasses(props.size, props.disabled, props.validationStatus))

const inputClasses = computed(() => classes.value.inputClasses.value);
const labelClasses = computed(() => classes.value.labelClasses.value);

const maxWidthClass = computed(() => {
  const numberOfDigits = getNumberOfDigits(internalValue.value);

  // Definir clases predefinidas según la longitud del número
  if (numberOfDigits <= 3) {
    return 'max-w-[6ch]'; // Para números medianos (3-4 dígitos)
  } else {
    return 'max-w-[8ch]'; // Para números más grandes (5+ dígitos)
  }
});

function getNumberOfDigits(number: number): number {
  // Convertir el número a una cadena
  const numberStr = number.toString();

  // Remover el signo negativo si existe
  const cleanedNumberStr = numberStr.replace('-', '');

  // Retorna la longitud de la cadena resultante
  return cleanedNumberStr.length;
}


const decreaseQuantity = () => {
  if(props.min !== undefined && props.min > internalValue.value -1) return;
  internalValue.value = internalValue.value -1;
};

const incrementQuantity = () => {
   if(props.min !== undefined && props.max < internalValue.value +1) return;
    internalValue.value = internalValue.value +1
};

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.valueAsNumber;
 
  // Validar contra el mínimo y el máximo solo si están definidos
  if ((props.min !== undefined && value >= props.min) && (props.max !== undefined && value <= props.max) ) {    
    internalValue.value = value;
  }
  else{
    if (isNaN(value)) inputRef.value.value = 0;
    else inputRef.value.value = internalValue.value;
  }
};


watch(
  () => props.initialValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

// Observa los cambios en el valor interno
watch(
  () => internalValue.value,
  (newValue, oldValue) => {
    emit('update:value', newValue, oldValue); // Emite el valor actual y el anterior
    emit('update:modelValue', newValue); // Emite solo el valor actual  
  }
);

</script>

<style scoped>
/* Oculta los controles de incremento y decremento en navegadores basados en WebKit (como Chrome y Safari) */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Oculta los controles de incremento y decremento en Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
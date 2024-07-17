<!-- src/components/CustomTimePicker.vue -->
<template>
  <div class="p-20">
     <label v-if="label" :class="labelClasses"
       >{{ label }} <span v-if="required" class="text-red-500">* </span></label
     >
     <div class="flex relative p-0 m-0">
       <div
         v-if="$slots.prefix"
         class="w-10 flex absolute inset-y-0 left-0 items-center pl-0 justify-center overflow-hidden text-neutral-500 dark:text-neutral-400 cursor-pointer"
         :class="[
           validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : '',
           disabled ? '!text-neutral-400 dark:!text-neutral-500 !cursor-not-allowed' : ''
         ]"
       >
         <slot name="prefix" />
       </div>    
       <!--<input
         v-bind="$attrs"
         v-model="formattedTime"
         :disabled="disabled"
         :type="type"
         :required="required"
         :class="[inputClasses, $slots.prefix ? 'pl-10' : '', showDropdown ? seletedInputClasses: '']"
         :readonly="readonly"        
       />-->
      <div
       class="flex items-center justify-center gap-1" 
       :class="[inputClasses, $slots.prefix ? 'pl-10' : '', showDropdown ? seletedInputClasses: '']">
       <input 
          ref="inputHours"
          id="hours" 
          type="number" 
          v-model.number="selectedHour" 
          min="1" 
          max="12"
          maxlength="2" 
          :disabled="disabled"
          :size="size"
          :class="[inputClassesError]"
          class="no-border no-spinner no-outline dynamic-width-input bg-neutral-50  text-neutral-900 dark:bg-neutral-700 dark:text-white"
          @focus="selectAllText"
          @input="validateHour"
        />
        <span>:</span>
        <input 
          ref="inputMinutes"
          id="minutes" 
          type="number" 
          v-model="selectedMinute" 
          min="0" 
          max="59" 
          maxlength="2"
          :disabled="disabled"
          :size="size"
          :class="[inputClassesError]"
          class="no-border no-spinner no-outline dynamic-width-input  bg-neutral-50  text-neutral-900 dark:bg-neutral-700 dark:text-white"
          @focus="selectAllText"
          @input="validateMinute"          
        />
       
        <input 
          ref="inputPeriods"
          id="period" 
          type="text" 
          v-model="selectedPeriod" 
          :size="size"
          @input="validatePeriod"
          maxlength="2"
          :class="[inputClassesError]"
          class="no-border no-outline dynamic-width-input max-w-[25px] min-w-[25px]  bg-neutral-50  text-neutral-900 dark:bg-neutral-700 dark:text-white"
          @focus="selectAllText"
          @keydown="checkKey"
        />
       </div>
       <div
         v-if="$slots.suffix"
         class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0 text-neutral-500 dark:text-neutral-400"
         :class="[
           validationStatus === 'error' ? '!text-red-600 dark:!text-red-500' : '',
           disabled ? '!text-neutral-400 dark:!text-neutral-500 cursor-none' : 'cursor-pointer',
 
         ]"
         @click="toggleDropdown"
       >
         <slot name="suffix" />
       </div>  
       <div 
        v-else
        class="absolute flex items-center justify-center w-[40px] h-full  bg-transparent right-[1px] bottom-0 "
        :class="[!disabled ? 'cursor-pointer' : 'cursor-none', validationWrapperClassesIcon]"       
        @click="toggleDropdown">
          <svg 
            class="w-4 h-4 " 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor"
            stroke="currentColor" 
            viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
          </svg>
       </div>    
     </div>
     <div 
     ref="wrapper"
      v-if="showDropdown" 
      class="absolute mt-2 w-40 bg-neutral-50 dark:bg-neutral-700 border-[1px] text-xs font-bold text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-600 rounded-lg shadow-lg z-10 transition ease-in-out delay-75"
      >
      <div class="grid grid-cols-3 gap-2 p-2">
        <div class="flex flex-col items-center overflow-y-auto max-h-40 custom-scroll">   
          <div class="column" @scroll="() => onScroll('hours')" ref="hoursColumn">
            <div 
              v-for="(hour, index) in hoursToShow" 
              :key="'hour-' + index"
              @click="selectHour(hour, index)"
              :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': hour === selectedHour, 'cursor-pointer p-2': true}"
              class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center active:bg-red-700 my-[2px]">
              {{ hour }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center overflow-y-auto max-h-40 custom-scroll">
          <div class="column" @scroll="() => onScroll('minutes')" ref="minutesColumn">
            <div 
              v-for="(minute, index) in minutesToShow" 
              :key="'minute-' + index"
              @click="selectMinute(minute, index)"
              :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': minute === selectedMinute, 'cursor-pointer p-2': true}"
              class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center my-[2px]"
              >
              {{ minute }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center overflow-y-auto max-h-40 custom-scroll">
          <div class="column" @scroll="() => onScroll('periods')" ref="periodsColumn">
            <div 
              v-for="(period, index) in periods" 
              :key="'period-' + index"
              @click="selectPeriod(period, index)"
              :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': period === selectedPeriod, 'cursor-pointer p-2': true}"
              class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center my-[2px]"
              >
              {{ period }}
            </div>
          </div>
        </div>
       </div>
       
     </div>
     <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
       <slot name="validationMessage" />
     </p>
   </div>
 </template>
 
 <script lang="ts" setup>
 import {useTimePicker} from "./composables/useTimePicker";
 import { useInputClasses } from "./composables/useInputClasses";
 import { type InputSize, type InputType, type ValidationStatus, validationStatusMap } from "./types";
 import { twMerge } from "tailwind-merge";
import { computed, nextTick, onMounted, watch } from "vue";

 interface InputProps {
   disabled?: boolean
   label?: string
   initialValue?: string
   required?: boolean
   size?: InputSize
   type?: InputType
   validationStatus?: ValidationStatus
   readonly?: boolean 
   modelValue?: string, 
 }
 
 const props = withDefaults(defineProps<InputProps>(), {
   disabled: false,
   label: '',
   initialValue: '',
   required: false,
   size: 'md',
   type: 'text',
   validationStatus: 'normal',
   readonly: false, 
   modelValue: "12:00"  
 })

 const emit = defineEmits(['update:modelValue', 'toggleVisibility'])
 const classes = computed(() => useInputClasses(props.size, props.disabled, props.validationStatus))
 
 const inputClasses = computed(() => classes.value.inputClasses.value)
 const labelClasses = computed(() => classes.value.labelClasses.value)

 const inputClassesError = computed(() => props.validationStatus === 'error' ? 'bg-red-50 text-red-900 dark:text-red-500': '')
 
 const seletedInputClasses =
   'ring-red-500 border-red-500';
 
 const validationWrapperClasses = computed(() =>
   twMerge(
     'text-sm',
     props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : ''
   )
 )

 const validationWrapperClassesIcon = computed(() =>
  twMerge(
    'text-sm',
    props.validationStatus === validationStatusMap.Error
      ? 'text-red-600 dark:text-red-500'
      : 'text-neutral-500 dark:text-neutral-400'
  )
)

 const { 
  checkKey,  
  formatTime,
  hoursToShow,  
  minutesColumn,
  minutesToShow,
  inputHours,
  inputMinutes,
  inputPeriods,
  onScroll,
  periods, 
  selectAllText,
  formattedTime,
  selectedHour,
  selectedMinute,
  selectedPeriod,
  selectHour,
  selectMinute,
  selectPeriod,
  showDropdown,
  updateAllColumns,
  convertTo24HourFormat,
  validateHour,
  validateMinute,
  validatePeriod,
  wrapper
} = useTimePicker();

const toggleDropdown = () => {
   if(!props.disabled){
   showDropdown.value = !showDropdown.value;
   if (showDropdown.value) {
     nextTick(() => {
       const selectedHourElement = document.querySelector('.selected-hour');
       const selectedMinuteElement = document.querySelector('.selected-minute');
       const selectedPeriodElement = document.querySelector('.selected-period');
 
       selectedHourElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
       selectedMinuteElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
       selectedPeriodElement?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
     });
   }
  }
 };

onMounted(() => {
  if(props.modelValue !== null && props.modelValue !== undefined){
    const { hour, minute, period } = formatTime(props.modelValue); 

    selectedHour.value = hour.toString().padStart(2, '0');;
    selectedMinute.value = minute.toString().padStart(2, '0');
    selectedPeriod.value = period;
  }
  updateAllColumns();
})


watch(selectedHour, ()=>{
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  emit("update:modelValue", timeReturn);
})

watch(selectedMinute, ()=>{
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  emit("update:modelValue", timeReturn);
})

watch(selectedPeriod, ()=>{
  const timeReturn = convertTo24HourFormat(formattedTime.value);
  updateAllColumns();
  emit("update:modelValue", timeReturn)
})
 
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
  font-family: monospace; /* To match the hidden text helper */
  text-align: center;
  box-sizing: content-box;
  text-align: left; /* Alinear el texto a la izquierda */
  padding: 0px; /* Adjust if necessary to match the input padding */
}

 /* Ocultar barra de scroll */
 .custom-scroll::-webkit-scrollbar {
   width: 0;  /* Remueve la barra de scroll en navegadores Webkit */
   height: 0; /* Remueve la barra de scroll en navegadores Webkit */
 }
 .custom-scroll {
   -ms-overflow-style: none;  /* IE y Edge */
   scrollbar-width: none;  /* Firefox */
 }
 </style>
 
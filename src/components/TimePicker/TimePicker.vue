<!-- src/components/CustomTimePicker.vue -->
<template>
  <div class="p-20">
     <label v-if="label" :class="labelClasses"
       >{{ label }} <span v-if="required" class="text-red-500">* </span></label
     >
     <div class="flex relative">
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
       <input
         v-bind="$attrs"
         v-model="formattedTime"
         :disabled="disabled"
         :type="type"
         :required="required"
         :class="[inputClasses, $slots.prefix ? 'pl-10' : '', showDropdown ? seletedInputClasses: '']"
         :readonly="readonly"        
       />
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
              class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center active:bg-red-700">
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
              v-for="(period, index) in periodsToShow" 
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
 import { computed, nextTick, onMounted, ref } from "vue";
 import { useInputClasses } from "./composables/useInputClasses";
 import { type InputSize, type InputType, type ValidationStatus, validationStatusMap } from "./types";
 import { twMerge } from "tailwind-merge";
 import { onClickOutside } from "@vueuse/core";
 
 interface InputProps {
   disabled?: boolean
   label?: string
   initialValue?: string
   required?: boolean
   size?: InputSize
   type?: InputType
   validationStatus?: ValidationStatus
   readonly?: boolean  
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
 })
 
 const emit = defineEmits(['update:value', 'toggleVisibility'])
 
 const classes = computed(() => useInputClasses(props.size, props.disabled, props.validationStatus))
 
 const inputClasses = computed(() => classes.value.inputClasses.value)
 const labelClasses = computed(() => classes.value.labelClasses.value)
 
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
 
 const wrapper = ref<HTMLDivElement>();
 
 const showDropdown = ref(false);
 const selectedHour = ref('12');
 const selectedMinute = ref('00');
 const selectedPeriod = ref('AM');

 const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
 const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
 const periods = ['AM', 'PM'];
 
 const hoursStartIndex = ref(0);
 const minutesStartIndex = ref(0);
 const periodsStartIndex = ref(0);

 const positionHourSelected = ref(0);
 const positionMinuteSelected = ref(0);
 const positionPeriodSelected = ref(0);

 
 const formattedTime = computed(() => {
   return `${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`;
 });
 
 
 
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
 
 const selectHour = (hour: string, index: number) => {
   selectedHour.value = hour;
   positionHourSelected.value = index;
   //showDropdown.value = false;
 };
 
 const selectMinute = (minute: string, index: number) => {
   selectedMinute.value = minute;
   positionMinuteSelected.value = index;
   //showDropdown.value = false;
 };
 
 const selectPeriod = (period: string, index: number) => {
   selectedPeriod.value = period;
   positionPeriodSelected.value = index;
   //showDropdown.value = false;
 };
 
 onClickOutside(wrapper, () => {
   if (!showDropdown.value) return;
   showDropdown.value = false;  

  // Asegurar que las otras columnas también se actualicen
  updateAllColumns();
  
 });

 const updateAllColumns = () => {
  hoursStartIndex.value = +(selectedHour.value) -1;//positionHourSelected.value;  
  minutesStartIndex.value = +(selectedMinute.value);//positionMinuteSelected.value;  
  periodsStartIndex.value = positionPeriodSelected.value;

  const hoursColumnEl = hoursColumn.value;
  const minutesColumnEl = minutesColumn.value;
  const periodsColumnEl = periodsColumn.value;

  if (hoursColumnEl) hoursColumnEl.scrollTop = 0;
  if (minutesColumnEl) minutesColumnEl.scrollTop = 0;
  if (periodsColumnEl) periodsColumnEl.scrollTop = 0;
};

 //////////////////NUEVO PARA CICLO /////////

const itemHeight = 50; // Altura de cada elemento

const hoursColumn = ref<HTMLElement | null>(null);
const minutesColumn = ref<HTMLElement | null>(null);
const periodsColumn = ref<HTMLElement | null>(null);

const cyclicArray = (arr: string[], startIndex: number) => {
  return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
};

const hoursToShow = computed(() => cyclicArray(hours, hoursStartIndex.value));
const minutesToShow = computed(() => cyclicArray(minutes, minutesStartIndex.value));
const periodsToShow = computed(() => cyclicArray(periods, periodsStartIndex.value));

const onScroll = (type: 'hours' | 'minutes' | 'periods') => {
  const column = type === 'hours' ? hoursColumn.value : type === 'minutes' ? minutesColumn.value : periodsColumn.value;
  if (!column) return;

  const { scrollTop, scrollHeight, clientHeight } = column;
  const maxScrollTop = scrollHeight - clientHeight;

  if (scrollTop >= maxScrollTop) {
    incrementStartIndex(type);
    column.scrollTop = 1;
  } else if (scrollTop <= 0) {
    decrementStartIndex(type);
    column.scrollTop = maxScrollTop - 1;
  }
};

const incrementStartIndex = (type: 'hours' | 'minutes' | 'periods') => {
  if (type === 'hours') {
    hoursStartIndex.value = (hoursStartIndex.value + 1) % hours.length;
  } else if (type === 'minutes') {
    minutesStartIndex.value = (minutesStartIndex.value + 1) % minutes.length;
  } else if (type === 'periods') {
    periodsStartIndex.value = (periodsStartIndex.value + 1) % periods.length;
  }
};

const decrementStartIndex = (type: 'hours' | 'minutes' | 'periods') => {
  if (type === 'hours') {
    hoursStartIndex.value = (hoursStartIndex.value - 1 + hours.length) % hours.length;
  } else if (type === 'minutes') {
    minutesStartIndex.value = (minutesStartIndex.value - 1 + minutes.length) % minutes.length;
  } else if (type === 'periods') {
    periodsStartIndex.value = (periodsStartIndex.value - 1 + periods.length) % periods.length;
  }
};


onMounted(() => {
  updateAllColumns();
})
 
 </script>
 
 <style scoped>
 .column {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
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
 
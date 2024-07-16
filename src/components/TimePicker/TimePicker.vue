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
        class="absolute flex items-center justify-center w-[40px] h-full  bg-transparent right-[1px] bottom-0 text-neutral-500 dark:text-neutral-400"
        :class="[!disabled ? 'cursor-pointer' : 'cursor-none']"
        @click="toggleDropdown">
             <svg 
               class="w-4 h-4 text-gray-500 dark:text-gray-400" 
               aria-hidden="true" 
               xmlns="http://www.w3.org/2000/svg" 
               fill="currentColor" 
               viewBox="0 0 24 24">
                 <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
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
           <div
             v-for="hour in reorderedHours"
             :key="hour"
             @click="selectHour(hour)"
             :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': hour === selectedHour, 'cursor-pointer p-2': true}"
             class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center my-[2px] active:bg-red-700"
           >
             {{ hour }}
           </div>
         </div>
         <div class="flex flex-col items-center overflow-y-auto max-h-40 custom-scroll">
           <div
             v-for="minute in reorderedMinutes"
             :key="minute"
             @click="selectMinute(minute)"
             :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': minute === selectedMinute, 'cursor-pointer p-2': true}"
             class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center my-[2px]"
           >
             {{ minute }}
           </div>
         </div>
         <!--<div class="flex flex-col items-center">
           <div
             @click="selectPeriod('AM')"
             :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': selectedPeriod === 'AM', 'cursor-pointer p-2': true}"
           >
             AM
           </div>
           <div
             @click="selectPeriod('PM')"
             :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': selectedPeriod === 'PM', 'cursor-pointer p-2': true}"
           >
             PM
           </div>
         </div>-->
         <div class="flex flex-col items-center overflow-y-auto max-h-40 custom-scroll">
           <div
             v-for="period in reorderedPeriod"
             :key="period"
             @click="selectPeriod(period)"
             :class="{'bg-red-700 text-white rounded-lg flex align-middle justify-center': period === selectedPeriod, 'cursor-pointer p-2': true}"
             class="hover:bg-red-500 hover:text-white rounded-lg flex align-middle justify-center my-[2px]"
           >
             {{ period }}
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
 import { computed, nextTick, ref } from "vue";
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
 
 const wrapper = ref<HTMLDivElement>();
 
 const showDropdown = ref(false);
 const selectedHour = ref('12');
 const selectedMinute = ref('00');
 const selectedPeriod = ref('AM');
 
 const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
 const minutes = Array.from({ length: 60 }, (_, i) => String(i * 1).padStart(2, '0'));
 const periods = ["AM", "PM"];
 
 const formattedTime = computed(() => {
   return `${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`;
 });
 
 /* reorderedHours = computed(() => {
   //return [selectedHour.value, ...hours.filter(hour => hour !== selectedHour.value)];
   return [...hours];
 });*/

 let reorderedHours = ref([...hours]);
 
 /*const reorderedMinutes = computed(() => {
   //return [selectedMinute.value, ...minutes.filter(minute => minute !== selectedMinute.value)];
   return [...minutes]
 });*/
 let reorderedMinutes = ref([...minutes]);
 
 /*const reorderedPeriod = computed(() => {
   //return [selectedPeriod.value, ...periods.filter(period => period !== selectedPeriod.value)];
   return [...periods];
 });*/
 let reorderedPeriod = ref([...periods]);
 
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
 
 const selectHour = (hour: string) => {
   selectedHour.value = hour;
   //showDropdown.value = false;
 };
 
 const selectMinute = (minute: string) => {
   selectedMinute.value = minute;
   //showDropdown.value = false;
 };
 
 const selectPeriod = (period: string) => {
   selectedPeriod.value = period;
   //showDropdown.value = false;
 };
 
 onClickOutside(wrapper, () => {
   if (!showDropdown.value) return;
   showDropdown.value = false;
   reorderedHours.value = [selectedHour.value, ...hours.filter(hour => hour !== selectedHour.value)];
   reorderedMinutes.value =[selectedMinute.value, ...minutes.filter(minute => minute !== selectedMinute.value)];
   reorderedPeriod.value = [selectedPeriod.value, ...periods.filter(period => period !== selectedPeriod.value)];
 });
 
 </script>
 
 <style scoped>
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
 
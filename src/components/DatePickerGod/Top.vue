<template>
    <div class="col-span-7 w-[296px] max-w-[296px]">
      <div class="h-[64px] w-full flex justify-between items-center">
        
        <!-- Current month and year -->
        <div class="flex justify-center items-center gap-2">
          <div class="">
            <!--<component
              :is="getAssetComponent('navigate_before')"
              class="fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer"
              @click="calendarStore.decrementMonth(1)"
            />-->
          </div>

          <div class="flex justify-center items-center">
            <span
              class="text-stone-700 text-[14px] font-bold"
              >{{ shortMonthStr }}</span
            >                        
            <!--
            <component
              :is="getAssetComponent('arrow_drop_up_24px')"
              class="fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer rotate-180"              
              @click="handleMonth"
            />
            -->
          </div>
            

            <!--<span>{{ calendarStore.getYear }}</span>-->
            <div class="">
            <!--<component
              :is="getAssetComponent('navigate_before')"
              class="rotate-180 fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer "
              @click="calendarStore.incrementMonth(1)"
              />
              -->
            </div>
                      
        </div>

        <div class="flex justify-center items-center font-['Montserrat'] ">
          <div class="">
            <!--<component
              :is="getAssetComponent('navigate_before')"
              class="fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer"
              @click="calendarStore.decrementYear(1)"
            />
            -->
          </div>

          <div class="flex justify-center items-center">
            <span
              class="text-stone-700 text-[14px] font-bold"
              >{{ calendarStore.getYear }}</span
            >  
            <!--
            <component
              :is="getAssetComponent('arrow_drop_up_24px')"
              class="fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer rotate-180"              
              @click="handleYear"
            />
            -->                      
          </div>
            

            <!--<span>{{ calendarStore.getYear }}</span>-->
            <div class="">
                <!--
            <component
              :is="getAssetComponent('navigate_before')"
              class="rotate-180 fill-stone-700 hover:bg-rose-300 rounded-full cursor-pointer "
              @click="calendarStore.incrementYear(1)"
              />
              -->
            </div>
                      
        </div>
        <!-- -------------------------- -->
  
        <!-- Naviigation -->
     
        <!-- ----------------------------- -->
  
        <!-- Date picker and date view -->
        <!--<div class=" grow max-w-[33%] flex justify-end">
          <div class="flex space-x-2 md:space-x-5">
            
            <div
              class="flex justify-center items-center border rounded-sm px-2 py-1 cursor-pointer hover:bg-gray-200 transition-colors"
              @click="calendarStore.resetDate()"
            >
              <h1 class="text-[16px] font-['bankgothic']">
                Today
              </h1>
            </div>
          </div>
        </div>
        -->

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { useCalendarStore } from "./calendar";
  //import { getAssetComponent } from '@/utils/getSvg';
  
  
  const emit = defineEmits(['month', 'year'])

  const handleMonth = () => {
    emit('month')
  }

  const handleYear = () => {
    emit('year')
  }

  // Store initialization and subscription
  const calendarStore = useCalendarStore();
  calendarStore.$subscribe((mutation, state) => {
    //prepareMonths();
    initializeDatePicker();
  });
  
  // Component variables
  const date = ref(); // for datepicker
  const monthStr = ref("");
  //const shortMonthStr = ref("");
  const shortMonthStr = computed(() => {
    monthStr.value = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(
        calendarStore.getYear,
        calendarStore.getMonth,
        calendarStore.getDay
      )
    );
    console.log(monthStr.value)
    return monthStr.value.substring(0, 3);
  })
  
  /**
   * Populate the month variable with month data from store
   */
  /*const prepareMonths = () => {
    monthStr.value = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(
        calendarStore.getYear,
        calendarStore.getMonth,
        calendarStore.getDay
      )
    );
    console.log(monthStr.value)
    shortMonthStr.value = monthStr.value.substring(0, 3);
  };
  */
  /**
   * Initiializes the datepicker with data gotten from store
   */
  const initializeDatePicker = () => {
    date.value = new Date(
      calendarStore.getYear,
      calendarStore.getMonth,
      calendarStore.getDay
    );
  };
  
  /**
   * Change date from the datepicker
   * @param {Date} modelData The selected date from the datepicker
   */
  const handleDate = (modelData) => {
    date.value = modelData;
  
    calendarStore.setMonth(date.value.getMonth());
    calendarStore.setYear(date.value.getFullYear());
  
    // do something else with the data
  };
  
  /************************************************************************
   *  LIFECYCLE HOOKS
   * **********************************************************************
   */
  onMounted(() => {
    //prepareMonths();
    initializeDatePicker();
  });
  </script>
  

  <style scoped>
    #yearDrop {
      @apply scrollbar-track-transparent scrollbar-thin scrollbar-thumb-primary/50 scrollbar-thumb-rounded-xl hover:scrollbar-thumb-primary/75 active:scrollbar-thumb-primary transition-colors duration-200;
      overflow: overlay;
    }
  </style>
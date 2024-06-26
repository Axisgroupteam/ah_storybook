<template>  
    <ol class="flex items-center w-full justify-between ">              
            <li 
              class="flex w-full items-center text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-[#FEE2E2] after:border-4 after:inline-block dark:after:border-red-800"
             >
                  <span class="flex items-center justify-center w-10 h-10 bg-[#FEE2E2] rounded-full md:h-12 md:w-12 dark:bg-red-800 shrink-0">                     
                     <component :is="getFBIcon(iconIni)" v-if="iconIni" class="w-6"/>
                  </span>
              </li>              
              <li class="flex items-center ">
                  <span                    
                    class="flex items-center justify-center w-10 h-10 bg-neutral-100 dark:neutral-700 rounded-full md:h-12 md:w-12 shrink-0 text-[#737373]"
                    :class="[{'bg-[#FEE2E2] dark:bg-red-800 text-[#EF4444]': activeStep}]"
                    >                     
                     <component :is="getFBIcon(iconEnd)" v-if="iconEnd" class="w-6"/>
                  </span>
            </li>
          </ol>
</template>

<script setup lang="ts">
import { getFBIcon } from "@/utils/getAssets";

defineProps({
  iconIni: { type: String, required: true },
  iconEnd: { type: String, required: true },
  activeStep: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>

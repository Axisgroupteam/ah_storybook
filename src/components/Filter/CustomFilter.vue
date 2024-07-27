<template>
    <div>       
        <fwbDropdown 
            ref="refDropdown"            
            @toggleVisibility="toggleVisibility"
        >
        <template #trigger>
                <FwbButton                            
                    color="secondary"
                    size="md"
                    class="whitespace-nowrap font-medium text-sm text-neutral-900"
                >                    
                        Filters
                    <template #prefix>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_8193_2084)">
                            <path d="M0.572001 1.05553L0.572007 1.05552L0.570286 1.05328C0.530454 1.00135 0.507046 0.940745 0.501364 0.878436C0.495684 0.816156 0.507787 0.753093 0.5371 0.696053C0.566468 0.638905 0.612393 0.589314 0.671092 0.554079C0.729881 0.518789 0.798543 0.499726 0.86925 0.500003V0.500007H0.871208L13.1288 0.500011L13.1307 0.500003C13.2015 0.499726 13.2701 0.518789 13.3289 0.554079C13.3876 0.589314 13.4335 0.638905 13.4629 0.696052C13.4922 0.753097 13.5043 0.816161 13.4986 0.878434L13.9966 0.923843L13.4986 0.878437C13.493 0.940743 13.4695 1.00134 13.4297 1.05327L13.428 1.05553L8.34656 7.75855L8.24501 7.89251V8.06061V13.0165L5.75499 11.2004V8.06061V7.89251L5.65344 7.75855L0.572001 1.05553ZM13.1288 6.81074e-06H0.871208H13.1288Z" fill="currentColor" stroke="currentColor"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_8193_2084">
                            <rect width="14" height="14" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </template>
                    <template #suffix>
                    <svg
                        :class="isVisible ? 'rotate-180' : 'rotate-0'"
                        class="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M19 9l-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        />
                    </svg>
                    </template>
                </FwbButton>
        </template>                
                
            <div 
                class="flex flex-col p-3 gap-3 whitespace-nowrap w-[250px] rounded-lg  text-sm font-medium" 
                @click.stop=""
                >
                <div class="flex justify-between">
                    <label class="text-sm font-semibold text-neutral-900 dark:text-white">Filters</label>
                    <div class="flex gap-[10px] text-red-500 font-medium text-sm">
                        <label class="label-container" @click.stop="clearData">Reset</label>
                        <label class="label-container" @click.stop="applyData">Apply</label>
                    </div>
                </div>

                <slot />

            </div>        
    </fwbDropdown>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue';
import FwbButton from '../FwbButton/FwbButton.vue';


const emit = defineEmits(['clearData', 'applyData']);

const isVisible = ref(true)
const refDropdown = ref(null);

const toggleVisibility = (value: boolean): void => {
        isVisible.value = value
      }

const clearData = () =>{
    emit("clearData");
}

const applyData = () =>{   
  isVisible.value = false;
  refDropdown.value?.onToggle();
  emit("applyData");    
}

const handleEventChangeOption = (index: number) => {
  refDropdown.value?.resetModalSize()
};

defineExpose({  
  handleEventChangeOption
});
</script>

<style scoped>
.label-container{
    @apply cursor-pointer inline-block relative;
}

.label-container::after {
  @apply bg-red-500 absolute w-full h-[2px] -bottom-1 left-0 ;
  content: '';
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.label-container:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
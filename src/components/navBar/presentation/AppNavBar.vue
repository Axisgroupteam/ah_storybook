<template>
  <nav
    class="pl-[12px] pr-[16px] flex h-[64px] bg-white border-b border-b-neutral-200 dark:bg-neutral-800 dark:border-b-neutral-700 fixed left-0 right-0 top-0 z-30 justify-between"
  >
    <div class="flex gap-4 items-center">
      <fwb-button
        square
        color="secondary"
        class="border-0"
      >
      <svg width="20" height="21"  viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8235 3.95236H1.17647C0.864451 3.95236 0.565212 3.81439 0.344581 3.56881C0.123949 3.32323 0 2.99014 0 2.64284C0 2.29553 0.123949 1.96245 0.344581 1.71686C0.565212 1.47128 0.864451 1.33331 1.17647 1.33331H18.8235C19.1355 1.33331 19.4348 1.47128 19.6554 1.71686C19.8761 1.96245 20 2.29553 20 2.64284C20 2.99014 19.8761 3.32323 19.6554 3.56881C19.4348 3.81439 19.1355 3.95236 18.8235 3.95236Z" fill="currentColor"/>
        <path d="M18.8235 11.8095H1.17647C0.864451 11.8095 0.565212 11.6715 0.344581 11.426C0.123949 11.1804 0 10.8473 0 10.5C0 10.1527 0.123949 9.81959 0.344581 9.57401C0.565212 9.32842 0.864451 9.19046 1.17647 9.19046H18.8235C19.1355 9.19046 19.4348 9.32842 19.6554 9.57401C19.8761 9.81959 20 10.1527 20 10.5C20 10.8473 19.8761 11.1804 19.6554 11.426C19.4348 11.6715 19.1355 11.8095 18.8235 11.8095Z" fill="currentColor"/>
        <path d="M18.8235 19.6666H1.17647C0.864451 19.6666 0.565212 19.5287 0.344581 19.2831C0.123949 19.0375 0 18.7044 0 18.3571C0 18.0098 0.123949 17.6767 0.344581 17.4311C0.565212 17.1856 0.864451 17.0476 1.17647 17.0476H18.8235C19.1355 17.0476 19.4348 17.1856 19.6554 17.4311C19.8761 17.6767 20 18.0098 20 18.3571C20 18.7044 19.8761 19.0375 19.6554 19.2831C19.4348 19.5287 19.1355 19.6666 18.8235 19.6666Z" fill="currentColor"/>
      </svg>

      </fwb-button>

      <HubSmall class="text-neutral-900 dark:text-white"/>
    </div>

    <div class="flex gap-2 items-center">
    <!-- report -->
    <fwb-button square color="secondary" class="border-0">  
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67316C0.00433284 8.50042 -0.1937 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3078C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C19.9971 7.84873 18.9426 5.30688 17.0679 3.43215C15.1931 1.55741 12.6513 0.502912 10 0.5ZM10 15.5C9.80222 15.5 9.60888 15.4413 9.44443 15.3315C9.27998 15.2216 9.15181 15.0654 9.07612 14.8827C9.00044 14.7 8.98063 14.4989 9.01922 14.3049C9.0578 14.1109 9.15304 13.9327 9.2929 13.7929C9.43275 13.653 9.61093 13.5578 9.80491 13.5192C9.99889 13.4806 10.2 13.5004 10.3827 13.5761C10.5654 13.6518 10.7216 13.78 10.8315 13.9444C10.9414 14.1089 11 14.3022 11 14.5C11 14.7652 10.8946 15.0196 10.7071 15.2071C10.5196 15.3946 10.2652 15.5 10 15.5ZM11 11.5C11 11.7652 10.8946 12.0196 10.7071 12.2071C10.5196 12.3946 10.2652 12.5 10 12.5C9.73479 12.5 9.48043 12.3946 9.2929 12.2071C9.10536 12.0196 9 11.7652 9 11.5V6.5C9 6.23478 9.10536 5.98043 9.2929 5.79289C9.48043 5.60536 9.73479 5.5 10 5.5C10.2652 5.5 10.5196 5.60536 10.7071 5.79289C10.8946 5.98043 11 6.23478 11 6.5V11.5Z" fill="currentColor"/>
      </svg>
    </fwb-button> 
    <!-- notification -->
      <fwb-dropdown align-to-end>
        <template #trigger>
          <fwb-button square color="secondary" class="border-0">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1106 11.5862V9.69145C16.1113 8.41087 15.6236 7.1675 14.7262 6.16237C13.8288 5.15725 12.5742 4.44915 11.1653 4.15258C11.176 4.11584 11.1844 4.07859 11.1903 4.041V1.55262C11.1903 1.27345 11.0649 1.00571 10.8416 0.808304C10.6184 0.610901 10.3156 0.5 9.99984 0.5C9.6841 0.5 9.3813 0.610901 9.15804 0.808304C8.93479 1.00571 8.80936 1.27345 8.80936 1.55262V4.041C8.81528 4.07859 8.82363 4.11584 8.83436 4.15258C7.42545 4.44915 6.17085 5.15725 5.27346 6.16237C4.37606 7.1675 3.88833 8.41087 3.88912 9.69145V11.5862C3.88912 14.0977 1.6665 14.7251 1.6665 15.9808C1.6665 16.605 1.6665 17.2366 2.30698 17.2366H17.6927C18.3332 17.2366 18.3332 16.605 18.3332 15.9808C18.3332 14.7251 16.1106 14.0977 16.1106 11.5862Z" fill="currentColor"/>
            <path d="M6.21769 18.2892C6.5335 18.945 7.06042 19.5043 7.73289 19.8973C8.40536 20.2904 9.1937 20.5 9.99984 20.5C10.806 20.5 11.5943 20.2904 12.2668 19.8973C12.9393 19.5043 13.4662 18.945 13.782 18.2892H6.21769Z" fill="currentColor"/>
            </svg>
          </fwb-button>
        </template>
        <ul>
          <li v-for="i in 3" class="px-4 overflow-x-clip w-[200px] py-4 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium">
            
            <span >{{"Notification " + i}}</span>
          </li>
            
        </ul>
      </fwb-dropdown>

      <fwb-button
        square
        color="secondary"
        class="border-0"
      
      >
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9693 15.7123C16.8385 15.6858 15.7239 15.432 14.6893 14.9652C13.6547 14.4985 12.7204 13.828 11.9398 12.9922C11.1592 12.1564 10.5477 11.1716 10.1403 10.0942C9.7328 9.01675 9.53738 7.86787 9.5652 6.71326C9.59711 5.56909 9.85039 4.44267 10.3104 3.39888C10.7705 2.35509 11.4282 1.41455 12.2458 0.631426C11.8257 0.562404 11.4017 0.520658 10.9765 0.50644C9.68546 0.459104 8.39804 0.673088 7.18837 1.13606C5.9787 1.59904 4.8707 2.30186 3.92821 3.20402C2.98572 4.10619 2.22736 5.18987 1.69684 6.39263C1.16631 7.59539 0.874099 8.89346 0.837038 10.2121C0.799978 11.5306 1.0188 12.8437 1.4809 14.0755C1.943 15.3074 2.63923 16.4337 3.5295 17.3896C4.41977 18.3455 5.48647 19.112 6.66814 19.6451C7.84982 20.1781 9.12311 20.4671 10.4147 20.4955C12.1622 20.5488 13.8925 20.1287 15.4296 19.2781C16.9668 18.4274 18.256 17.1765 19.1663 15.6523C18.7692 15.7006 18.3692 15.7207 17.9693 15.7123Z" fill="currentColor"/>
      </svg>
      </fwb-button>

      <FwbButton class="border-0" color="secondary" size="md" pill square>        
        <template #default>
          CP
        </template>        
      </FwbButton>

      <FwbDropdown :alignToEnd="true" >
        <template #trigger>
          <fwb-button
            square
            color="secondary"
            class="border-0"
          >
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4.5C11.1046 4.5 12 3.60457 12 2.5C12 1.39543 11.1046 0.5 10 0.5C8.89543 0.5 8 1.39543 8 2.5C8 3.60457 8.89543 4.5 10 4.5Z" fill="currentColor"/>
            <path d="M10 12.5C11.1046 12.5 12 11.6046 12 10.5C12 9.39543 11.1046 8.5 10 8.5C8.89543 8.5 8 9.39543 8 10.5C8 11.6046 8.89543 12.5 10 12.5Z" fill="currentColor"/>
            <path d="M10 20.5C11.1046 20.5 12 19.6046 12 18.5C12 17.3954 11.1046 16.5 10 16.5C8.89543 16.5 8 17.3954 8 18.5C8 19.6046 8.89543 20.5 10 20.5Z" fill="currentColor"/>
          </svg>
          </fwb-button>
        </template>
        <ul>
          <li v-for="i in 7" class="px-4 overflow-x-clip w-[200px] py-4 items-start flex gap-2 border-b whitespace-nowrap border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium">
            <svg class="w-5 h-5"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
            </svg>
            <span >{{"Element " + i}}</span>
          </li>
            
        </ul>
      </FwbDropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import FwbDropdown from '../../FwbDropdown/FwbDropdown.vue'

import HubSmall from "@/assets/flowbite_icons/hub_icon_small.svg";
import FwbButton from "@/components/FwbButton/FwbButton.vue";



const props = defineProps({
  drawer: { type: Boolean, default: false },
});

const emit = defineEmits(["drawer", "update:drawer"]);



</script>

<style scoped></style>

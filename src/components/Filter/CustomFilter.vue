<template>  
    <div>
        <fwb-button                            
                    color="secondary"
                    size="md"
                    class="whitespace-nowrap font-medium text-sm text-neutral-900"
                    @click="handleClick"
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
                        :class="open ? 'rotate-180' : 'rotate-0'"
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
        </fwb-button>

        <fwb-modal 
            v-if="open" 
            :padding-bottom="0"
            @close="closeModal"
        >
                <template #header>
                  <div
                    class="flex items-center text-lg text-neutral-900 dark:text-white"
                  >
                    Filters
                  </div>
                </template>

                <template #body>
                    <div class="text-neutral-900 dark:text-white grid gap-4 ">

                        <slot />
                        
                    </div>
                </template>

                    <template #footer>            
                        <div class=" flex gap-4">
                            <fwb-button 
                            color="primary"
                            @click="applyFunction"
                            >
                            <template #prefix>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.55556 0C1.143 0 0.747335 0.163888 0.455612 0.455612C0.163888 0.747335 0 1.143 0 1.55556V12.4444C0 12.857 0.163888 13.2527 0.455612 13.5444C0.747335 13.8361 1.143 14 1.55556 14H12.4444C12.857 14 13.2527 13.8361 13.5444 13.5444C13.8361 13.2527 14 12.857 14 12.4444V3.43311C13.9999 3.02059 13.836 2.62499 13.5442 2.33333L11.6667 0.455778C11.375 0.164034 10.9794 8.81026e-05 10.5669 0H1.55556ZM9.33333 8.55556C9.33333 9.17439 9.0875 9.76789 8.64992 10.2055C8.21233 10.6431 7.61884 10.8889 7 10.8889C6.38116 10.8889 5.78767 10.6431 5.35008 10.2055C4.9125 9.76789 4.66667 9.17439 4.66667 8.55556C4.66667 7.93672 4.9125 7.34322 5.35008 6.90564C5.78767 6.46805 6.38116 6.22222 7 6.22222C7.61884 6.22222 8.21233 6.46805 8.64992 6.90564C9.0875 7.34322 9.33333 7.93672 9.33333 8.55556ZM3.88889 3.11111V1.55556H10.1111V3.11111C10.1111 3.31739 10.0292 3.51522 9.88331 3.66108C9.73744 3.80694 9.53961 3.88889 9.33333 3.88889H4.66667C4.46039 3.88889 4.26256 3.80694 4.11669 3.66108C3.97083 3.51522 3.88889 3.31739 3.88889 3.11111Z" fill="white"/>
                                </svg>
                            </template>
                            Apply
                            </fwb-button>

                            <fwb-button 
                            color="secondary"
                            @click="resetFunction"
                            >
                            <template #prefix>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_8264_1105)">
                                    <mask id="mask0_8264_1105" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                    <rect width="14" height="14" fill="white"/>
                                    </mask>
                                    <g mask="url(#mask0_8264_1105)">
                                    <path d="M12.7034 2.94737H9.85153V1.47368C9.85153 1.08284 9.70129 0.708001 9.43388 0.431632C9.16647 0.155263 8.80378 0 8.4256 0H5.57375C5.19557 0 4.83288 0.155263 4.56547 0.431632C4.29805 0.708001 4.14782 1.08284 4.14782 1.47368V2.94737H1.29597C1.10688 2.94737 0.925536 3.025 0.79183 3.16318C0.658123 3.30137 0.583008 3.48879 0.583008 3.68421C0.583008 3.87963 0.658123 4.06705 0.79183 4.20524C0.925536 4.34342 1.10688 4.42105 1.29597 4.42105H2.00893V12.5263C2.00893 12.9172 2.15916 13.292 2.42658 13.5684C2.69399 13.8447 3.05668 14 3.43486 14H10.5645C10.9427 14 11.3054 13.8447 11.5728 13.5684C11.8402 13.292 11.9904 12.9172 11.9904 12.5263V4.42105H12.7034C12.8925 4.42105 13.0738 4.34342 13.2075 4.20524C13.3412 4.06705 13.4163 3.87963 13.4163 3.68421C13.4163 3.48879 13.3412 3.30137 13.2075 3.16318C13.0738 3.025 12.8925 2.94737 12.7034 2.94737ZM5.57375 1.47368H8.4256V2.94737H5.57375V1.47368ZM6.28671 11.0526C6.28671 11.2481 6.2116 11.4355 6.07789 11.5737C5.94418 11.7118 5.76284 11.7895 5.57375 11.7895C5.38466 11.7895 5.20331 11.7118 5.06961 11.5737C4.9359 11.4355 4.86079 11.2481 4.86079 11.0526V5.89474C4.86079 5.69931 4.9359 5.5119 5.06961 5.37371C5.20331 5.23553 5.38466 5.15789 5.57375 5.15789C5.76284 5.15789 5.94418 5.23553 6.07789 5.37371C6.2116 5.5119 6.28671 5.69931 6.28671 5.89474V11.0526ZM9.13856 11.0526C9.13856 11.2481 9.06345 11.4355 8.92974 11.5737C8.79603 11.7118 8.61469 11.7895 8.4256 11.7895C8.23651 11.7895 8.05517 11.7118 7.92146 11.5737C7.78775 11.4355 7.71264 11.2481 7.71264 11.0526V5.89474C7.71264 5.69931 7.78775 5.5119 7.92146 5.37371C8.05517 5.23553 8.23651 5.15789 8.4256 5.15789C8.61469 5.15789 8.79603 5.23553 8.92974 5.37371C9.06345 5.5119 9.13856 5.69931 9.13856 5.89474V11.0526Z" fill="currentColor"/>
                                    </g>
                                    </g>                                
                                </svg>
                            </template>
                            Reset
                            </fwb-button>

                        </div>
                    </template>
        </fwb-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FwbButton from '../FwbButton/FwbButton.vue';
import FwbModal from '../FwbModal/FwbModal.vue';

const emit = defineEmits(['resetData', 'apply'])

const open = ref(false)

const handleOpen = () => {
    open.value = true;
};

function closeModal() {
  open.value = false; 
}

const handleClick = () => { 
  handleOpen();
};

const applyFunction =() =>{
    closeModal();
    emit('apply');
}

const resetFunction = () =>{
    emit('resetData')
}
</script>

<style scoped>

</style>
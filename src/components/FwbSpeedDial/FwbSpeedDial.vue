<template>
<div  @click="tryActivate" ref="target"  class="fixed end-6 bottom-6 group" :class="[{'flex': (placement === 'horizontal')}]">
    <div   class="  items-center    "
        :class="[{'flex flex-col mb-4 space-y-2': (activate && (placement === 'vertical'))},{'hidden': !activate},
            {'flex flex-row space-x-2 mr-4': (activate && (placement === 'horizontal'))}
        ]"
    >
       <slot />
    
    </div>
    <fwb-button :ring="activate"   color="primary" square pill size="xl"   class="border-0 w-[56px] h-[56px] items-center flex justify-center">
        <svg :class="[{'rotate-45': activate}]" class="w-5 h-5 transition-transform " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
    </fwb-button    >
</div>

</template>


<script setup lang="ts">
    import FwbButton from '../FwbButton/FwbButton.vue';
    import {ref} from 'vue'
    import { onClickOutside } from "@vueuse/core";

    interface Props {
        placement: 'vertical' | 'horizontal'
    }

    const props = withDefaults(defineProps<Props>(), {
        placement: 'vertical'
    })



    const activate = ref(false)
    function tryActivate (){
        activate.value = !activate.value
    }

    const target = ref(null)
    onClickOutside(target, (event) => {
        activate.value = false
    });
</script>
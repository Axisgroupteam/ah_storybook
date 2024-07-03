<template >
    <ol class="flex items-center w-full justify-between transition-all duration-200 ease-linear">
        <li 
            v-for="(i, index) in refSteps"  
            class="flex w-full items-center text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block "
            :class="[{'after:border-red-100 dark:after:border-red-800': (!index  || i.completed)},
                    {'after:border-neutral-100 dark:after:border-neutral-700': (index  && !i.completed)}
            ]"
        >
        <span class="flex items-center justify-center w-10 h-10  rounded-full md:h-12 md:w-12 shrink-0"
              :class="[{'text-neutral-500': (!index || !i.completed)},
                       {'text-red-600 dark:text-red-400': (!index  || i.completed)},
                       {'bg-red-100 dark:bg-red-800': (!index  || i.completed)},
                       {'bg-neutral-100 dark:bg-neutral-700': (index && !i.completed)} ]"
        >                     
                     <!--<component :is="getFBIcon(iconIni)" v-if="iconIni" class="w-6"/>-->
                     <component v-if="!i.completed" :is="computedArray[index]" class="w-4 h-4" />
                     <CheckedIcon v-else class="text-red-600 dark:text-red-400" />

                  </span>
        </li>
        <li class="flex items-center ">
                  <span                    
                    class="flex  items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full md:h-12 md:w-12 shrink-0 text-[#737373]"
                    :class="[{'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400': refSteps[refSteps.length - 1].completed}]"
                    >                     
                     <!--<component :is="getFBIcon(iconEnd)" v-if="iconEnd" class="w-6"/>-->
                     <component :is="computedArray[steps.length - 1]" />
                  </span>
            </li>
    </ol>
</template>

<script setup lang="ts">
import { getFBIcon } from "../../utils/getAssets";
import {computed, reactive} from 'vue'
import CheckedIcon from '@/assets/flowbite_icons/checked.svg'

interface Props {
    steps: any
}

const props = withDefaults(defineProps<Props>(),{
    steps: [
        {
            icon: 'checked',
            completed: true,
        },
        {
            icon: 'ticket',
            completed: false,
        },
        
        {
            icon: 'completedReport',
            completed: false,
        }
    ]
})

 
const refSteps = reactive(props.steps.slice(0,-1))
const refFullSteps = reactive(props.steps)

const computedArray = computed(() => {
            return refFullSteps.map(item => {
                return getFBIcon(item.icon);
            });
        });





</script>

<style scoped></style>

<template>
  <ol class="flex items-center w-full justify-between transition-all duration-200 ease-linear">
    <li
      v-for="(i, index) in refSteps"
      :key="i"
      class="flex w-full items-center text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
      :class="[
        i.completed && refSteps[index + 1]?.completed
          ? 'after:border-red-100 dark:after:border-red-800'
          : 'after:border-neutral-100 dark:after:border-neutral-700'
      ]"
    >
      <span
        class="flex items-center justify-center w-10 h-10 rounded-full md:h-12 md:w-12 shrink-0"
        :class="[
          { 'text-neutral-500': !index || !i.completed },
          { 'text-red-600 dark:text-red-400': !index || i.completed },
          { 'bg-red-100 dark:bg-red-800': !index || i.completed },
          { 'bg-neutral-100 dark:bg-neutral-700': index && !i.completed }
        ]"
      >
        <component
          :is="computedArray[index]"
          :class="[
            { 'w-[26.4px] h-[26.4px]': refFullSteps[index].icon === 'home' },
            { 'w-5 h-5': refFullSteps[index].icon !== 'home' }
          ]"
        />
      </span>
    </li>
    <li class="flex items-center">
      <span
        class="flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full md:h-12 md:w-12 shrink-0 text-[#737373]"
        :class="[
          {
            'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400':
              refFullSteps[refFullSteps.length - 1].completed
          }
        ]"
      >
        <!--<component :is="getFBIcon(iconEnd)" v-if="iconEnd" class="w-6"/>-->
        <component :is="computedArray[steps.length - 1]" class="w-5 h-5" />
      </span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { getFBIcon } from '@/utils/getAssets'
import { computed, reactive } from 'vue'

interface Props {
  steps: any
}

const props = withDefaults(defineProps<Props>(), {
  steps: [
    {
      icon: 'home',
      completed: true
    },
    {
      icon: 'ticket',
      completed: false
    },

    {
      icon: 'completedReport',
      completed: false
    }
  ]
})

const refSteps = reactive(props.steps.slice(0, -1))
const refFullSteps = reactive(props.steps)

const computedArray = computed(() => {
  return refFullSteps.map((item) => {
    return getFBIcon(item.icon)
  })
})
</script>

<style scoped></style>

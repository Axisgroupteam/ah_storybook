<template>
  <div class="flex -space-x-4">
    <img
      v-for="index in maxInStack"
      :key="index"
      :src="getImage(imgStacks[index])"
      class="w-10 h-10 border-2 border-white dark:border-neutral-800 rounded-full overflow-clip"
    />
    <FwbDropdown
      v-if="hasDropdown"
      @toggleVisibility="visibleRing = !visibleRing"
      :alignToEnd="true"
      placement="bottom"
      type="secondary"
      max_h="160px"
    >
      <template #trigger>
        <FwbButton
          color="secondary"
          :pill="true"
          :class="[
            { '!ring-[4px] !ring-neutral-300 dark:!ring-neutral-500 !border-0': visibleRing },
            { '!ring-0 !border-2': !visibleRing }
          ]"
          class="p-0 text-xs w-10 h-10 border-white dark:border-neutral-800 text-white dark:text-white hover:text-white !bg-neutral-700 hover:!bg-neutral-600"
        >
          +{{ totalStack }}
        </FwbButton>
      </template>
      <template #default>
        <ul>
          <!-- Menu List -->
          <li
            v-for="(option, index) in options"
            :key="index"
            class="px-4 overflow-hidden w-[200px] py-4 items-center flex gap-2 border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium"
          >
            <component
              :is="option.component"
              size="xs"
              :fullName="option.fullName"
              :img="option.img"
              :icon="option.icon"
            />
            <span class="cursor-pointer text-ellipsis truncate whitespace-nowrap">{{
              option.label
            }}</span>
          </li>
        </ul>
      </template>
    </FwbDropdown>
    <FwbButton
      v-else
      color="secondary"
      :pill="true"
      :href="href"
      :class="[
        { '!ring-[4px] !ring-neutral-300 dark:!ring-neutral-500 !border-0': visibleRing },
        { '!ring-0 !border-2': !visibleRing }
      ]"
      class="relative flex justify-center items-center p-0 text-xs w-10 h-10 border-white dark:border-neutral-800 text-white dark:text-white hover:text-white !bg-neutral-700 hover:!bg-neutral-600"
    >
      +{{ totalStack }}
    </FwbButton>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { getImage } from './getAsset'
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue'
import FwbButton from '../FwbButton/FwbButton.vue'
import type { iconsNames } from '@/components/data/icons'

const props = withDefaults(
  defineProps<{
    hasDropdown: boolean
    href: string
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    maxInStack: number
    imgStacks: Array<string>
    totalStack: number
    options: Array<{
      label: string
      icon: iconsNames
      link: string
      component: any
      fullName: string | undefined
      img: string | undefined
    }>
  }>(),
  {
    hasDropdown: false,
    total: 0,
    href: '#',
    size: 'md',
    maxInStack: 0,
    imgStacks: () => [],
    totalStack: 99,
    options: () => [
      {
        label: 'Element 1',
        icon: 'user',
        link: 'profile',
        component: 'FwbAvatar',
        fullName: 'ME',
        img: 'Avatar_40_1.png'
      },
      {
        label: 'Element 2',
        icon: 'user',
        link: 'profile',
        component: 'FwbAvatar',
        fullName: 'ME',
        img: 'Avatar_40_1.png'
      },
      {
        label: 'Element 3',
        icon: 'user',
        link: 'profile',
        component: 'FwbAvatar',
        fullName: 'ME',
        img: 'Avatar_40_1.png'
      }
    ]
  }
)

const ssize = computed((): string => {
  return props.size === 'xs'
    ? 'w-6 h-6 text-xs'
    : props.size === 'sm'
      ? 'w-8 h-8 text-xs'
      : props.size === 'md'
        ? 'w-10 h-10 text-xs'
        : props.size === 'lg'
          ? 'w-20 h-20 text-2xl'
          : 'w-36 h-36 text-3xl'
})

const visibleRing = ref(false)
</script>

<!--  
class="relative flex justify-center items-center text-xs font-medium text-white bg-neutral-700 hover:bg-neutral-600"         
 -->

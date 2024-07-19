<template>
  <div class="flex -space-x-4">
    <img class="w-10 h-10 border-2 border-white dark:border-neutral-800 rounded-full overflow-clip"
      v-for="index in maxInStack" :key="index" :src="getImage(imgStacks[index])" />
    <FwbDropdown @toogle="visibleRing=!visibleRing" :alignToEnd="true" placement="bottom" type="secondary" max_h="160px">
      <template #trigger>
        <FwbButton :class="[{'ring-[4px] ring-neutral-300 dark:ring-neutral-600 border-0': visibleRing}, {'ring-0': !visibleRing}]" color="secondary" pill class="p-0 text-xs w-10 h-10 border border-white dark:border-neutral-800 text-white dark:text-white hover:text-white !bg-neutral-700 hover:!bg-neutral-600" >
          +{{ totalStack }} 
        </FwbButton>
      </template>
      <template #default>
        <ul><!-- Menu List -->
          <li v-for="(option, index) in options" :key="index" class="px-4 overflow-hidden w-[200px] py-4 items-center flex gap-2 
						 border-b-neutral-200 
						dark:border-b-neutral-600 
						last:border-b-0 
						hover:bg-neutral-100 
						hover:dark:bg-neutral-600 cursor-pointer 
						first:rounded-t-lg justify-start 
						last:rounded-b-lg 
						text-neutral-500 
						hover:text-neutral-900 
						dark:hover:text-white 
						dark:text-neutral-400 
						text-sm 
						font-medium 
          ">
            <component fill="currentColor" :is="getFBIcon(option.icon)" />
            <span class="cursor-pointer text-ellipsis truncate whitespace-nowrap">{{ option.label }}</span>
          </li>
        </ul>
      </template>
    </FwbDropdown>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getImage, getFBIcon } from "./getAsset";
  import FwbDropdown from '../FwbDropdown/FwbDropdown.vue';
  import FwbButton from '../FwbButton/FwbButton.vue';



  const props = withDefaults(
    defineProps<{
      href: string
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      maxInStack: number
      imgStacks: Array<string>
      totalStack: number
      options?: Array<{
        label: string
        icon: string
        link: string
      }>
    }>(), {
    total: 0,
    href: '#',
    size: 'md',
    maxInStack: 0,
    imgStacks: () => [],
    totalStack: 99,
    options: () => [{ label: 'Element 1', icon: 'user', link: 'profile' }, { label: 'Element 2', icon: 'user', link: 'profile' }, { label: 'Element 3', icon: 'user', link: 'profile' }, { label: 'Element 4', icon: 'user', link: 'profile' }],
  });

  const ssize = computed((): string => {
    return props.size === 'xs' ? 'w-6 h-6 text-xs' :
      props.size === 'sm' ? 'w-8 h-8 text-xs' :
        props.size === 'md' ? 'w-10 h-10 text-xs' :
          props.size === 'lg' ? 'w-20 h-20 text-2xl' :
            'w-36 h-36 text-3xl';
  });

  const visibleRing=ref(false)
</script>

<!--           class="relative flex justify-center items-center text-xs font-medium text-white bg-neutral-700hover:bg-neutral-600"
 -->
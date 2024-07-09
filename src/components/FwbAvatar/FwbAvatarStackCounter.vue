<template>
  <a class="relative flex justify-center items-center text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
    :class="ssize" href="#">+{{ total }}</a>
</template>

<script setup lang="ts">
  import { computed } from 'vue';


  const props = withDefaults(
    defineProps<{
      total: number
      href: string
      size: 'xs' | 'sm' | 'md' | 'lg' | 'lx' | 'xl'
    }>(), {
      total: 0,
      href: '#',
      size: 'sm',
  });

  const ssize = computed(():string => {
    return props.size === 'xs' ? 'w-6 h-6 text-xs' : 
           props.size === 'sm' ? 'w-8 h-8 text-sm' : 
           props.size === 'md' ? 'w-10 h-10 text-md' : 
           props.size === 'lx' ? 'w-[72px] h-[72px] text-[24px]' : 
           props.size === 'lg' ? 'w-20 h-20 text-2xl' : 
           'w-36 h-36 text-3xl';
  });
</script>

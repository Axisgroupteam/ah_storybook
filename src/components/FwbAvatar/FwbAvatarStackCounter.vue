<template>
  <a class="relative flex justify-center items-center text-xs font-medium text-white border-2 border-white dark:border-neutral-800 rounded-full bg-neutral-700 hover:border-neutral-600"
    :class="ssize" href="#">+{{ total }}</a>
</template>

<script setup lang="ts">
  import { computed } from 'vue';


  const props = withDefaults(
    defineProps<{
      total: number
      href: string
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    }>(), {
      total: 0,
      href: '#',
      size: 'md',
  });

  const ssize = computed(():string => {
    return props.size === 'xs' ? 'w-6 h-6 text-xs' : 
           props.size === 'sm' ? 'w-8 h-8 text-xs' : 
           props.size === 'md' ? 'w-10 h-10 text-xs' : 
           props.size === 'lg' ? 'w-20 h-20 text-2xl' : 
           'w-36 h-36 text-3xl';
  });
</script>

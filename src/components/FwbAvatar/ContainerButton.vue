<template>
  <button 
    ref="target" 
    :disabled="disabled" 
    :class="_class" 
    @click="active"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { UseRingClasses } from "./composables/UseRingClasses";
  import { onClickOutside } from '@vueuse/core'
  
  interface IRingButtonProps {
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<IRingButtonProps>(), {
    disabled: false,
  });

  const { _active, active, _class } = UseRingClasses();
  
  const target = ref<HTMLButtonElement>();

  onClickOutside(target, (event) => {
    _active.value = false;
    _class.value = "border-0"
  })

</script>

<style scoped>
  button {
    @apply outline-none focus:outline-none cursor-pointer inline-flex items-center transition-colors duration-75 focus:ring-neutral-200 dark:focus:ring-neutral-600 rounded-full;
  }
</style>

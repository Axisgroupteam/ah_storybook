<template>
  <button class="!rounded-full !p-0" :class="_class" @click.stop="handleRing">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useDotsActions } from "./composables/UseDotsActions";
  import { onClickOutside } from "@vueuse/core";

  interface IRingButtonProps {
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<IRingButtonProps>(), {
    disabled: false,
  });

  const { _active, _class } = useDotsActions();

  const handleRing = () => {
    _class.value =
      (_active.value)
        ? "focus:ring-0 "
        : "focus:ring-[4px] ";
  };

  const pflButton = ref(null);
  onClickOutside(pflButton, () => {
    _active.value = false;
    _class.value = "focus:ring-0 focus:bg-neutral-100 dark:focus:bg-transparent";
  });
</script>

<style scoped>
  button {
    @apply outline-none focus:outline-none cursor-pointer inline-flex items-center transition-colors duration-75 focus:ring-neutral-200 dark:focus:ring-neutral-600;
  }
</style>

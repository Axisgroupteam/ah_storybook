<template>
  <button
    @click="handleRing"
    :class="
      false
        ? ' bg-neutral-100 dark:bg-neutral-700 ' + _class
        : ' ' + _class
    "
    class="focus:text-neutral-900 dark:focus:ring-[#525252] dark:focus:text-white"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { container } from "../domain/containerDrawerItem";
const props = defineProps({
  reference: { type: String, default: "" },
});
const {  handleRing, _class } = container();
</script>

<style scoped>
button {
  @apply focus:outline-none outline-none focus:ring-[#E5E5E5] rounded-[8px]  cursor-pointer  transition-colors duration-75   text-neutral-500  hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-700;
}
</style>

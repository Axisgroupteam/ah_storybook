<template>
  <div class="relative h-full w-full">
    <PerfectScrollbar>
      <table
        class="w-full h-full text-sm text-left text-neutral-500 dark:text-neutral-400"
      >
        <slot />
      </table>
    </PerfectScrollbar>
    <div class="h-[80%]">
      <slot name="empty" />
      <slot name="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = defineProps({
  striped: {
    type: Boolean,
    default: false,
  },
  stripedColumns: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
});

provide("hoverable", props.hoverable);
provide("striped", props.striped);
provide("stripedColumns", props.stripedColumns);
</script>

<style>
.ps {
  max-height: 100%;
}
</style>

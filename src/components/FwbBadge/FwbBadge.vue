<template>
  <span
    v-if="show"
    class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300"
    :class="circular ? 'rounded-full' : 'rounded'"
  >
    {{ text }}
    <button
      v-if="closable"
      type="button"
      class="inline-flex items-center p-1 ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
      @click="show = !show"
    >
      <svg
        class="w-2 h-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  text: string;
  closable: boolean;
  circular: boolean;
}

const show = ref(true);

const props = defineProps<Props>();
</script>

<style scoped></style>

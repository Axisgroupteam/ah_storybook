<template>
  <div>
    <h5
      class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2"
    >
      {{ title }}
    </h5>
    <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string
  popoverId: string
}>()
</script>

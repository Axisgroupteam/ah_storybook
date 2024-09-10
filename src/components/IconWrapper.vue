<template>
  <span class="icon-wrapper" :style="wrapperStyle">
    <component :is="icon" :width="size" :height="size" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { getFBIcon } from '@/utils/getAssets'

const props = defineProps({
  name: String,
  size: {
    type: [Number, String],
    default: 20
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const icon = computed(() => getFBIcon(props.name))
const wrapperStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  display: 'flex',
  color: props.color
}))
</script>

<style scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

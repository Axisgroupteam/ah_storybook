<template>
  <span class="icon-wrapper" :style="wrapperStyle">
    <component :is="icon" :width="size" :height="size" />
  </span>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { getFBIcon } from '@/utils/getAssets'
import type { iconsNames } from '@/components/data/icons'

const props = defineProps({
  name: { type: String as PropType<iconsNames>, required: true },
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

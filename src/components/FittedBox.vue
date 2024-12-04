<template>
  <div
    ref="containerRef"
    :key="refresh"
    class="w-full overflow-y-auto rounded-b-lg"
    style="height: 100%"
  >
    <div
      v-if="mountChild"
      :key="refresh"
      class="overflow-y-auto scroll relative h-full"
      :style="{
        height: clientHeight,
        maxHeight: clientHeight
      }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const clientHeight = ref()
const mountChild = ref(false)

const containerRef = ref()

const refresh = ref()

onMounted(() => {
  constHandleUpdate()
  window.addEventListener('resize', handleRezise)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleRezise)
})

const handleRezise = () => {
  constHandleUpdate()
}

const constHandleUpdate = () => {
  mountChild.value = false
  const element = containerRef.value as HTMLElement
  const { top } = element.getBoundingClientRect()
  clientHeight.value = document.body.clientHeight - top - 16 + 'px'
  mountChild.value = true
  refresh.value = Math.random()
}
</script>

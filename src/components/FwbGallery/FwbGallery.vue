<!-- FwbGallery.vue -->
<template>
  <PerfectScrollbar class="perfect-scrollbar-container">
    <div :class="styles.container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="styles.imageWrapper"
        @click="emitClickImage(index)"
      >
        <img :src="image.src" :alt="image.alt" :class="styles.image" />
        <div
          v-if="canDelete"
          @click.stop="deleteImage(index)"
          :class="styles.deleteButton"
          class="cursor-pointer"
        >
          <svg
            class="w-6 h-6 text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </PerfectScrollbar>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useImageGalleryStyles } from './useImageGalleryStyles'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((image) => 'src' in image && 'alt' in image)
    }
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['deleteImage', 'clickImage'])

const styles = useImageGalleryStyles()

const deleteImage = (index) => {
  emit('deleteImage', index)
}

const emitClickImage = (index) => {
  emit('clickImage', index)
}
</script>

<style scoped>
.perfect-scrollbar-container {
  height: 178px;
  width: 100%;
}
</style>

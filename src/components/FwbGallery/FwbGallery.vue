<!-- FwbGallery.vue -->
<template>
  <OverlayScrollbarsComponent
    :options="scrollbarOptions"
    defer
    class="gallery-container overflow-x-auto"
  >
    <div :class="styles.container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="styles.imageWrapper"
        @click="emitClickImage(index)"
      >
        <img
          ref="imageRefs"
          :src="image.src"
          :alt="image.alt"
          :class="styles.image"
          @error="replaceWithPlaceholder"
          @load="(event) => handleImageLoad(event, index)"
        />
        <div
          v-if="canDelete"
          :class="styles.deleteButton"
          class="cursor-pointer"
          @click.stop="deleteImage(index)"
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
  </OverlayScrollbarsComponent>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useImageGalleryStyles } from './useImageGalleryStyles'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'

// Configuración del scrollbar
const scrollbarOptions = {
  scrollbars: { theme: 'os-theme-dark', autoHide: 'leave', visibility: 'visible' },
  overflow: { x: 'scroll', y: 'hidden' }
} as const

export interface Image {
  src: string
  alt: string
}

const props = defineProps({
  images: {
    type: Array as () => Image[],
    required: true,
    validator: (value: Image[]) => {
      return value.every((image) => 'src' in image && 'alt' in image)
    }
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'deleteImage', index: number): void
  (e: 'clickImage', index: number, image: HTMLImageElement): void
  (e: 'image-loaded', image: HTMLImageElement, index: number): void
  (e: 'all-images-loaded', images: HTMLImageElement[]): void
}>()

const styles = useImageGalleryStyles()

const deleteImage = (index: number) => {
  emit('deleteImage', index)
}

const imageRefs = ref<HTMLImageElement[]>([])
const loadedImages = ref<HTMLImageElement[]>([])
const isAllImagesLoaded = ref(false)

const handleImageLoad = (event: Event, index: number) => {
  const img = event.target as HTMLImageElement
  loadedImages.value[index] = img
  emit('image-loaded', img, index)

  if (loadedImages.value.length === props.images.length && loadedImages.value.every((img) => img)) {
    isAllImagesLoaded.value = true
    emit('all-images-loaded', loadedImages.value)
  }
}

const emitClickImage = (index: number) => {
  if (loadedImages.value[index]) {
    emit('clickImage', index, loadedImages.value[index])
  }
}

const replaceWithPlaceholder = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='50' font-size='12' fill='%23666' text-anchor='middle' alignment-baseline='middle'%3ENot Found%3C/text%3E%3C/svg%3E"
}

const getImageUrl = (src: string) => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  // Agrega 'http://' al inicio de la URL si no tiene protocolo
  return `http://${src}`
}

// Agrega estos console.log para depuración
console.log('VITE_API_BASEURL:', import.meta.env.VITE_API_BASEURL)
console.log('Imágenes recibidas:', props.images)

// Agrega este console.log para depuración
console.log('VITE_API_BASEURL:', import.meta.env.VITE_API_BASEURL)

console.log('Imágenes recibidas:', props.images)
</script>

<style scoped>
.gallery-container {
  height: 178px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.os-theme-dark {
  --os-size: 12px;
  --os-padding-perpendicular: 2px;
}

.os-scrollbar {
  --os-handle-bg: rgba(82, 82, 82, 0.4);
  --os-handle-bg-hover: rgba(82, 82, 82, 0.6);
  --os-handle-bg-active: rgba(82, 82, 82, 0.7);
}

:root.dark .os-scrollbar {
  --os-handle-bg: rgba(163, 163, 163, 0.4);
  --os-handle-bg-hover: rgba(163, 163, 163, 0.6);
  --os-handle-bg-active: rgba(163, 163, 163, 0.7);
}

/* Asegurarse que el contenedor interno tenga un ancho mínimo */
.os-content {
  display: flex;
  flex-wrap: nowrap;
  min-width: min-content;
}
</style>

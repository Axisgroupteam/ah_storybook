<template>
  <div
    class="relative overflow-hidden rounded-lg bg-neutral-400 dark:bg-neutral-500"
    :style="{
      height: height - 172 + 'px'
    }"
  >
    <div
      ref="imageContainer"
      class="flex transition-transform duration-700 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(picture, index) in pictures" :key="index" class="w-full flex-shrink-0 relative">
        <div
          class="w-full h-full overflow-hidden"
          @mousedown="startPan"
          @mousemove="pan"
          @mouseup="endPan"
          @mouseleave="endPan"
          @wheel="zoom"
          @touchstart="startPanTouch"
          @touchmove="panTouch"
          @touchend="endPan"
        >
          <img
            :ref="
              (el) => {
                if (el) images[index] = el as HTMLImageElement
              }
            "
            :src="picture.src"
            :alt="picture.alt"
            class="w-full h-full object-contain transition-all duration-300 ease-in-out"
            :style="{
              transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px) rotate(${rotation}deg)`,
              cursor: isPanning ? 'grabbing' : 'grab'
            }"
          />
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div
      v-if="!noIndicators"
      class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3"
    >
      <FwbIndicator
        v-for="(_, index) in pictures"
        :key="index"
        @click="goToSlide(index)"
        class="cursor-pointer hover:!bg-neutral-900 dark:hover:!bg-white"
        color="carousel"
        :class="
          currentIndex === index
            ? '!bg-neutral-900 dark:!bg-white'
            : '!bg-white dark:!bg-neutral-900'
        "
      ></FwbIndicator>
    </div>

    <!-- Controls -->
    <template v-if="!noControls">
      <FwbButton
        color="secondary"
        square
        pill
        @click="previousSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2"
      >
        <span>
          <component :is="getFBIcon('chevron-left-carousel')" />
          <span class="hidden">Previous</span>
        </span>
      </FwbButton>
      <FwbButton
        color="secondary"
        square
        pill
        @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2"
      >
        <span>
          <component :is="getFBIcon('chevron-right-carousel')" />
          <span class="hidden">Next</span>
        </span>
      </FwbButton>
    </template>

    <!-- Image editing controls -->
    <div class="absolute top-4 left-4 flex space-x-2">
      <FwbButton square color="secondary" @click="startCrop"
        ><svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"
          />
        </svg>
      </FwbButton>
      <FwbButton square color="secondary" @click="saveImage">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
          />
        </svg>
      </FwbButton>
      <FwbButton square color="secondary" @click="saveImage">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
          />
        </svg>
      </FwbButton>
    </div>
    <div class="absolute top-4 right-4 flex space-x-2">
      <FwbButton square color="secondary" @click="zoomIn">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </FwbButton>
      <FwbButton square color="secondary" @click="zoomOut">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14"
          />
        </svg>
      </FwbButton>
      <FwbButton square color="secondary" @click="rotateLeft">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
          />
        </svg>
      </FwbButton>
      <FwbButton square color="secondary" @click="rotateRight">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"
          />
        </svg>
      </FwbButton>

      <FwbButton square color="secondary" @click="resetImage">
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
          />
        </svg>
      </FwbButton>
    </div>

    <!-- Crop overlay -->
    <div v-if="isCropping" class="absolute inset-0 bg-black bg-opacity-30 crop-overlay">
      <div
        ref="cropBox"
        class="absolute border-2 border-white border-dashed cursor-move transition-all duration-200 ease-in-out rounded-lg shadow-lg"
        :style="{
          left: `${cropLeft}px`,
          top: `${cropTop}px`,
          width: `${cropWidth}px`,
          height: `${cropHeight}px`
        }"
        @mousedown="startMoveCrop"
      >
        <div class="absolute inset-0 bg-white bg-opacity-20"></div>
        <div
          v-for="(handle, index) in ['nw', 'ne', 'sw', 'se']"
          :key="index"
          class="absolute w-4 h-4 bg-white border border-gray-800 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
          :style="getHandleStyle(handle)"
          @mousedown.stop="startResize(handle, $event)"
        ></div>
      </div>
      <FwbButton color="primary" @click="finishCrop" class="absolute bottom-4 left-[140px]">
        Finish Crop
      </FwbButton>
      <FwbButton color="secondary" @click="cancelCrop" class="absolute bottom-4 left-4">
        Cancel Crop
      </FwbButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import FwbButton from '../FwbButton/FwbButton.vue'
import FwbIndicator from '../FwbIndicators/FwbIndicator.vue'
import { getFBIcon } from '@/utils/getAssets'
import { debounce } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

interface PictureItem {
  src: string
  alt: string
}

const props = withDefaults(
  defineProps<{
    pictures: PictureItem[]
    noIndicators?: boolean
    noControls?: boolean
    slide?: boolean
    slideInterval?: number
  }>(),
  {
    pictures: () => [],
    noIndicators: false,
    noControls: false,
    slide: false,
    slideInterval: 3000
  }
)

const emit = defineEmits(['updateIndex'])

const currentIndex = ref(0)
let intervalId: number | null = null

const imageContainer = ref<HTMLDivElement | null>(null)
const images = ref<(HTMLImageElement | null)[]>([])

watch(
  () => props.pictures,
  (newPictures) => {
    images.value = new Array(newPictures.length).fill(null)
  },
  { immediate: true }
)

const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const rotation = ref(0)
const isPanning = ref(false)
const startPanX = ref(0)
const startPanY = ref(0)
const lastMouseX = ref(0)
const lastMouseY = ref(0)

const isCropping = ref(false)
const isResizing = ref(false)
const isMovingCrop = ref(false)
const cropLeft = ref(0)
const cropTop = ref(0)
const cropWidth = ref(200)
const cropHeight = ref(200)
const resizeHandle = ref('')

const startPan = (event: MouseEvent) => {
  if (zoomLevel.value > 1) {
    isPanning.value = true
    startPanX.value = panX.value
    startPanY.value = panY.value
    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY
    event.preventDefault()
  }
}

const pan = debounce((event: MouseEvent) => {
  if (isPanning.value) {
    const deltaX = event.clientX - lastMouseX.value
    const deltaY = event.clientY - lastMouseY.value

    panX.value = startPanX.value + deltaX
    panY.value = startPanY.value + deltaY

    event.preventDefault()
  }
}, 5) // Ajusta el tiempo de debouncing según sea necesario

const endPan = () => {
  isPanning.value = false
}

const startPanTouch = (event: TouchEvent) => {
  if (zoomLevel.value > 1 && event.touches.length === 1) {
    isPanning.value = true
    startPanX.value = panX.value
    startPanY.value = panY.value
    lastMouseX.value = event.touches[0].clientX
    lastMouseY.value = event.touches[0].clientY
    event.preventDefault()
  }
}

const panTouch = (event: TouchEvent) => {
  if (isPanning.value && event.touches.length === 1) {
    const deltaX = event.touches[0].clientX - lastMouseX.value
    const deltaY = event.touches[0].clientY - lastMouseY.value

    panX.value = startPanX.value + deltaX
    panY.value = startPanY.value + deltaY

    event.preventDefault()
  }
}

const zoom = (event: WheelEvent) => {
  event.preventDefault()
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const oldZoom = zoomLevel.value
  const delta = event.deltaY > 0 ? 0.9 : 1.1
  zoomLevel.value = Math.max(1, Math.min(5, zoomLevel.value * delta))

  // Adjust pan to keep the point under the mouse stable
  panX.value += mouseX - (mouseX * zoomLevel.value) / oldZoom
  panY.value += mouseY - (mouseY * zoomLevel.value) / oldZoom
}

const zoomIn = () => {
  animateZoom(Math.min(5, zoomLevel.value * 1.1))
}

const zoomOut = () => {
  animateZoom(Math.max(1, zoomLevel.value / 1.1))
}

const animateZoom = (targetZoom: number) => {
  const start = performance.now()
  const startZoom = zoomLevel.value
  const duration = 300 // duración de la animación en milisegundos

  function step(timestamp: number) {
    const progress = (timestamp - start) / duration
    if (progress < 1) {
      zoomLevel.value = startZoom + (targetZoom - startZoom) * easeInOutCubic(progress)
      requestAnimationFrame(step)
    } else {
      zoomLevel.value = targetZoom
    }
  }

  requestAnimationFrame(step)
}

const rotateLeft = () => {
  rotation.value = (rotation.value - 90) % 360
  animateRotation(-90)
}

const rotateRight = () => {
  rotation.value = (rotation.value + 90) % 360
  animateRotation(90)
}

const animateRotation = (degrees: number) => {
  const start = performance.now()
  const startRotation = rotation.value - degrees
  const duration = 300 // duración de la animación en milisegundos

  function step(timestamp: number) {
    const progress = (timestamp - start) / duration
    if (progress < 1) {
      rotation.value = startRotation + degrees * easeInOutCubic(progress)
      requestAnimationFrame(step)
    } else {
      rotation.value = startRotation + degrees
    }
  }

  requestAnimationFrame(step)
}

// Función de easing para una animación más suave
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const startMoveCrop = (event: MouseEvent) => {
  isMovingCrop.value = true
  lastMouseX.value = event.clientX
  lastMouseY.value = event.clientY
}

const constrainCrop = () => {
  if (!imageContainer.value) return

  const containerRect = imageContainer.value.getBoundingClientRect()

  cropLeft.value = Math.max(0, Math.min(cropLeft.value, containerRect.width - cropWidth.value))
  cropTop.value = Math.max(0, Math.min(cropTop.value, containerRect.height - cropHeight.value))
  cropWidth.value = Math.max(50, Math.min(cropWidth.value, containerRect.width - cropLeft.value))
  cropHeight.value = Math.max(50, Math.min(cropHeight.value, containerRect.height - cropTop.value))
}

const moveCrop = (event: MouseEvent) => {
  if (isMovingCrop.value) {
    const deltaX = event.clientX - lastMouseX.value
    const deltaY = event.clientY - lastMouseY.value
    cropLeft.value += deltaX
    cropTop.value += deltaY
    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY

    constrainCrop()
  }
}

const startResize = (handle: string, event: MouseEvent) => {
  event.stopPropagation()
  isResizing.value = true
  resizeHandle.value = handle
  lastMouseX.value = event.clientX
  lastMouseY.value = event.clientY
}

const resize = (event: MouseEvent) => {
  if (isResizing.value) {
    const deltaX = event.clientX - lastMouseX.value
    const deltaY = event.clientY - lastMouseY.value

    switch (resizeHandle.value) {
      case 'nw':
        cropLeft.value += deltaX
        cropTop.value += deltaY
        cropWidth.value -= deltaX
        cropHeight.value -= deltaY
        break
      case 'ne':
        cropTop.value += deltaY
        cropWidth.value += deltaX
        cropHeight.value -= deltaY
        break
      case 'sw':
        cropLeft.value += deltaX
        cropWidth.value -= deltaX
        cropHeight.value += deltaY
        break
      case 'se':
        cropWidth.value += deltaX
        cropHeight.value += deltaY
        break
    }

    // Asegúrate de que el tamaño mínimo sea respetado
    cropWidth.value = Math.max(62, cropWidth.value) // 50px + 12px para las bolitas
    cropHeight.value = Math.max(62, cropHeight.value)

    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY
    constrainCrop()
  }
}

const endCropActions = () => {
  isMovingCrop.value = false
  isResizing.value = false
}

const getHandleStyle = (handle: string) => {
  const styles = {
    nw: { top: '-6px', left: '-6px', cursor: 'nw-resize' },
    ne: { top: '-6px', right: '-6px', cursor: 'ne-resize' },
    sw: { bottom: '-6px', left: '-6px', cursor: 'sw-resize' },
    se: { bottom: '-6px', right: '-6px', cursor: 'se-resize' }
  }
  return styles[handle as keyof typeof styles]
}

const ensureImageLoaded = () => {
  return new Promise<void>((resolve) => {
    const currentImage = images.value[currentIndex.value]
    if (currentImage && currentImage.complete) {
      resolve()
    } else {
      const img = new Image()
      img.onload = () => {
        images.value[currentIndex.value] = img
        resolve()
      }
      img.src = props.pictures[currentIndex.value].src
    }
  })
}

const startCrop = async () => {
  await ensureImageLoaded()
  if (!imageContainer.value) return
  const currentImage = images.value[currentIndex.value]
  if (!currentImage) return

  const containerRect = imageContainer.value.getBoundingClientRect()
  const imageRect = currentImage.getBoundingClientRect()

  // Calculamos el tamaño máximo del crop (80% del tamaño de la imagen o del contenedor, el que sea menor)
  const maxSize = Math.min(
    imageRect.width * 0.8,
    imageRect.height * 0.8,
    containerRect.width * 0.8,
    containerRect.height * 0.8
  )

  cropWidth.value = maxSize + 12 // Añade 12px para compensar las bolitas
  cropHeight.value = maxSize + 12

  // Calculamos la posición para centrar el crop
  cropLeft.value = (containerRect.width - cropWidth.value) / 2 - 6 // Resta 6px para compensar
  cropTop.value = (containerRect.height - cropHeight.value) / 2 - 6

  isCropping.value = true
}

const finishCrop = () => {
  isCropping.value = false
  // Aquí puedes agregar la lógica para aplicar el recorte
  saveImage()
}

const cancelCrop = () => {
  isCropping.value = false
  // Restablecer los valores de recorte a sus valores iniciales si es necesario
}

const saveImage = () => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to cropped size
    canvas.width = cropWidth.value
    canvas.height = cropHeight.value

    // Translate and rotate canvas
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation.value * Math.PI) / 180)
    ctx.scale(zoomLevel.value, zoomLevel.value)

    // Draw the image
    ctx.drawImage(
      img,
      -img.width / 2 + (panX.value - cropLeft.value) / zoomLevel.value,
      -img.height / 2 + (panY.value - cropTop.value) / zoomLevel.value,
      img.width,
      img.height
    )

    // Get the cropped image
    const croppedImageData = ctx.getImageData(0, 0, cropWidth.value, cropHeight.value)

    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement('canvas')
    croppedCanvas.width = cropWidth.value
    croppedCanvas.height = cropHeight.value
    const croppedCtx = croppedCanvas.getContext('2d')
    if (croppedCtx) {
      croppedCtx.putImageData(croppedImageData, 0, 0)
    }

    // Convert canvas to blob and download
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement('a')
        link.download = 'cropped_image.png'
        link.href = URL.createObjectURL(blob)
        link.click()
      }
    })
  }
  img.src = props.pictures[currentIndex.value].src
}

const resetImage = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
  rotation.value = 0
  isCropping.value = false
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.pictures.length
  emit('updateIndex', currentIndex.value)
}

const previousSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.pictures.length) % props.pictures.length
  emit('updateIndex', currentIndex.value)
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  emit('updateIndex', currentIndex.value)
}

const startAutoSlide = () => {
  if (props.slide && props.pictures.length > 1) {
    intervalId = setInterval(nextSlide, props.slideInterval)
  }
}

const stopAutoSlide = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

watch(currentIndex, resetImage)

onMounted(() => {
  if (props.slide) {
    startAutoSlide()
  }
  window.addEventListener('mousemove', (event) => {
    moveCrop(event)
    resize(event)
  })
  window.addEventListener('mouseup', endCropActions)
})

onUnmounted(() => {
  stopAutoSlide()
  window.removeEventListener('mousemove', moveCrop)
  window.removeEventListener('mousemove', resize)
  window.removeEventListener('mouseup', endCropActions)
})
</script>

<style scoped>
.crop-overlay {
  backdrop-filter: blur(2px);
}

.crop-box {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

.crop-handle {
  transition: all 0.2s ease;
  z-index: 10;
}

.crop-handle:hover {
  transform: scale(1.2);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.crop-box::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid white;
  border-radius: 8px;
  animation: pulse 2s infinite;
}
</style>

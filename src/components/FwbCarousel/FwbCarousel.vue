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
            class="w-full h-full transition-all duration-300 ease-out"
            :style="{
              objectFit: 'contain',
              transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px) rotate(${rotation}deg)`,
              cursor: isPanning ? 'grabbing' : 'grab'
            }"
          />
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div
      v-if="!noIndicators && !isCropping"
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
    <template v-if="!noControls && !isCropping">
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
    <div class="absolute top-4 left-4 flex space-x-2" v-if="!isCropping">
      <FwbButton v-if="type !== 'info'" square color="secondary" @click="startCrop"
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
      <FwbButton
        v-if="type !== 'info' && type !== 'create'"
        square
        color="secondary"
        @click="saveImage"
      >
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
      <FwbButton
        v-if="type !== 'create' && type !== 'edit'"
        square
        color="secondary"
        @click="saveImage"
      >
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
    <div class="absolute top-4 right-4 flex space-x-2" v-if="!isCropping">
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

    <!-- Cropper.js container -->
    <div v-if="isCropping" class="absolute inset-0">
      <img
        ref="cropperImage"
        :src="pictures[currentIndex].src"
        style="max-width: 100%"
        @load="initCropper"
      />
    </div>

    <!-- Crop controls -->
    <div v-if="isCropping" class="absolute bottom-4 left-4 flex space-x-2">
      <FwbButton color="primary" @click="finishCrop"> Finish Crop </FwbButton>
      <FwbButton color="secondary" @click="cancelCrop"> Cancel Crop </FwbButton>
    </div>

    <!-- Rotation and zoom controls for cropping -->
    <div v-if="isCropping" class="absolute top-4 right-4 flex space-x-2">
      <FwbButton square color="secondary" @click="rotateCropLeft">
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
      <FwbButton square color="secondary" @click="rotateCropRight">
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
      <FwbButton square color="secondary" @click="zoomInCrop">
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
      <FwbButton square color="secondary" @click="zoomOutCrop">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import FwbButton from '../FwbButton/FwbButton.vue'
import FwbIndicator from '../FwbIndicators/FwbIndicator.vue'
import { getFBIcon } from '@/utils/getAssets'
import { debounce } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

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
    index?: number
    type?: 'info' | 'create' | 'edit'
  }>(),
  {
    pictures: () => [],
    noIndicators: false,
    noControls: false,
    slide: false,
    slideInterval: 3000,
    index: 0,
    type: 'info'
  }
)

const emit = defineEmits(['updateIndex'])

const currentIndex = ref(props.index)
let intervalId: number | null = null

const imageContainer = ref<HTMLDivElement | null>(null)
const images = ref<(HTMLImageElement | null)[]>([])

const cropperImage = ref<HTMLImageElement | null>(null)
let cropper: Cropper | null = null

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
  zoomLevel.value = Math.min(5, zoomLevel.value * 1.1)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(1, zoomLevel.value / 1.1)
}

const rotateLeft = () => {
  rotation.value = (rotation.value - 90) % 360
}

const rotateRight = () => {
  rotation.value = (rotation.value + 90) % 360
}

const ensureImageLoaded = (): Promise<{
  naturalWidth: number
  naturalHeight: number
  displayWidth: number
  displayHeight: number
  imageLeft: number
  imageTop: number
}> => {
  return new Promise((resolve) => {
    const currentImage = images.value[currentIndex.value]
    if (currentImage && currentImage.complete) {
      const containerRect = imageContainer.value?.getBoundingClientRect()
      if (!containerRect) return

      const imageAspectRatio = currentImage.naturalWidth / currentImage.naturalHeight
      const containerAspectRatio = containerRect.width / containerRect.height

      let displayWidth, displayHeight, imageLeft, imageTop

      if (imageAspectRatio > containerAspectRatio) {
        displayWidth = containerRect.width
        displayHeight = containerRect.width / imageAspectRatio
        imageLeft = 0
        imageTop = (containerRect.height - displayHeight) / 2
      } else {
        displayHeight = containerRect.height
        displayWidth = containerRect.height * imageAspectRatio
        imageTop = 0
        imageLeft = (containerRect.width - displayWidth) / 2
      }

      resolve({
        naturalWidth: currentImage.naturalWidth,
        naturalHeight: currentImage.naturalHeight,
        displayWidth,
        displayHeight,
        imageLeft,
        imageTop
      })
    } else {
      const img = new Image()
      img.onload = () => {
        images.value[currentIndex.value] = img
        const containerRect = imageContainer.value?.getBoundingClientRect()
        if (!containerRect) return

        const imageAspectRatio = img.naturalWidth / img.naturalHeight
        const containerAspectRatio = containerRect.width / containerRect.height

        let displayWidth, displayHeight, imageLeft, imageTop

        if (imageAspectRatio > containerAspectRatio) {
          displayWidth = containerRect.width
          displayHeight = containerRect.width / imageAspectRatio
          imageLeft = 0
          imageTop = (containerRect.height - displayHeight) / 2
        } else {
          displayHeight = containerRect.height
          displayWidth = containerRect.height * imageAspectRatio
          imageTop = 0
          imageLeft = (containerRect.width - displayWidth) / 2
        }

        resolve({
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth,
          displayHeight,
          imageLeft,
          imageTop
        })
      }
      img.src = props.pictures[currentIndex.value].src
    }
  })
}

const startCrop = () => {
  isCropping.value = true
}

const initCropper = () => {
  nextTick(() => {
    if (cropperImage.value) {
      if (cropper) {
        cropper.destroy()
      }
      cropper = new Cropper(cropperImage.value, {
        aspectRatio: NaN,
        viewMode: 1,
        responsive: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        center: true
      })
    }
  })
}

const finishCrop = () => {
  if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas()
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement('a')
        link.download = 'cropped_image.png'
        link.href = URL.createObjectURL(blob)
        link.click()
      }
    })
  }
  cancelCrop()
}

const cancelCrop = () => {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
  isCropping.value = false
}

const rotateCropLeft = () => {
  if (cropper) {
    cropper.rotate(-90)
  }
}

const rotateCropRight = () => {
  if (cropper) {
    cropper.rotate(90)
  }
}

const zoomInCrop = () => {
  if (cropper) {
    cropper.zoom(0.1)
  }
}

const zoomOutCrop = () => {
  if (cropper) {
    cropper.zoom(-0.1)
  }
}

const saveImage = async () => {
  const { naturalWidth, naturalHeight, displayWidth, displayHeight, imageLeft, imageTop } =
    await ensureImageLoaded()
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const containerRect = imageContainer.value?.getBoundingClientRect()
    if (!containerRect) return

    const scaleX = naturalWidth / displayWidth
    const scaleY = naturalHeight / displayHeight

    canvas.width = naturalWidth
    canvas.height = naturalHeight

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation.value * Math.PI) / 180)
    ctx.scale(1 / zoomLevel.value, 1 / zoomLevel.value)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    ctx.drawImage(img, -panX.value * scaleX, -panY.value * scaleY, naturalWidth, naturalHeight)

    ctx.restore()

    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement('a')
        link.download = isCropping.value ? 'cropped_image.png' : 'image.png'
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
  initCropper()
})

onUnmounted(() => {
  onUnmounted(() => {
    if (cropper) {
      cropper.destroy()
    }
  })
  stopAutoSlide()
})
</script>

<style scoped>
@import 'cropperjs/dist/cropper.css';
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

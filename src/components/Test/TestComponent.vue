<template>
  <div class="image-editor">
    <canvas
      ref="canvas"
      @mousedown="startAction"
      @mousemove="updateAction"
      @mouseup="endAction"
      @mouseleave="endAction"
    ></canvas>
    <div class="controls">
      <button @click="setMode('pan')">Pan Mode</button>
      <button @click="setMode('crop')">Crop Mode</button>
      <button v-if="isCropping" @click="acceptCrop">Accept Crop</button>
      <button v-if="isCropping" @click="cancelCrop">Cancel Crop</button>
      <button @click="rotate(-90)">Rotate Left</button>
      <button @click="rotate(90)">Rotate Right</button>
      <button @click="zoom(1.1)">Zoom In</button>
      <button @click="zoom(0.9)">Zoom Out</button>
      <button @click="prevImage">Prev</button>
      <button @click="nextImage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import FwbButton from '../FwbButton/FwbButton.vue'
import { getFBIcon } from '@/utils/getAssets'

interface ImageData {
  src: string
}

const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const images = ref<ImageData[]>([])
const currentIndex = ref(0)
const isPanning = ref(false)
const isCropping = ref(false)
const mode = ref<'pan' | 'crop'>('pan') // Track the current mode
const startX = ref(0)
const startY = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)
const zoomLevel = ref(1)
const rotation = ref(0)
const originalImage = ref<HTMLImageElement | null>(null)
const cropStartX = ref(0)
const cropStartY = ref(0)
const cropEndX = ref(0)
const cropEndY = ref(0)

const loadImage = () => {
  if (images.value.length > 0) {
    const image = new Image()
    image.crossOrigin = 'anonymous' // Añadir esta línea
    image.src = images.value[currentIndex.value].src
    image.onload = () => {
      originalImage.value = image
      if (canvas.value) {
        context.value = canvas.value.getContext('2d')
        if (context.value) {
          resetTransforms()
          fitImageToCanvas(image)
        }
      }
    }
  }
}

const fitImageToCanvas = (image: HTMLImageElement) => {
  if (canvas.value && context.value) {
    const canvasWidth = canvas.value.width
    const canvasHeight = canvas.value.height
    const imageWidth = image.width
    const imageHeight = image.height
    const canvasAspect = canvasWidth / canvasHeight
    const imageAspect = imageWidth / imageHeight

    if (imageAspect > canvasAspect) {
      zoomLevel.value = canvasWidth / imageWidth
    } else {
      zoomLevel.value = canvasHeight / imageHeight
    }

    drawImage(image)
  }
}

const drawImage = (image: HTMLImageElement) => {
  if (context.value && canvas.value) {
    const width = canvas.value.width
    const height = canvas.value.height
    context.value.clearRect(0, 0, width, height)
    context.value.save()
    context.value.translate(width / 2, height / 2)
    context.value.rotate((rotation.value * Math.PI) / 180)
    context.value.scale(zoomLevel.value, zoomLevel.value)
    context.value.drawImage(
      image,
      -image.width / 2 + offsetX.value,
      -image.height / 2 + offsetY.value
    )
    context.value.restore()
    drawCropRect()
  }
}

const drawCropRect = () => {
  if (context.value && isCropping.value) {
    context.value.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    context.value.setLineDash([6])
    context.value.strokeRect(
      cropStartX.value,
      cropStartY.value,
      cropEndX.value - cropStartX.value,
      cropEndY.value - cropStartY.value
    )
    context.value.setLineDash([])
  }
}

const startAction = (event: MouseEvent) => {
  if (context.value) {
    if (mode.value === 'crop') {
      isCropping.value = true
      cropStartX.value = event.offsetX
      cropStartY.value = event.offsetY
      cropEndX.value = event.offsetX
      cropEndY.value = event.offsetY
    } else if (mode.value === 'pan') {
      isPanning.value = true
      startX.value = event.clientX - offsetX.value
      startY.value = event.clientY - offsetY.value
    }
  }
}

const updateAction = (event: MouseEvent) => {
  if (isCropping.value) {
    cropEndX.value = event.offsetX
    cropEndY.value = event.offsetY
    if (originalImage.value) {
      drawImage(originalImage.value)
    }
  } else if (isPanning.value) {
    offsetX.value = event.clientX - startX.value
    offsetY.value = event.clientY - startY.value
    if (originalImage.value) {
      drawImage(originalImage.value)
    }
  }
}

const endAction = () => {
  if (isCropping.value) {
    isCropping.value = false
  } else if (isPanning.value) {
    isPanning.value = false
  }
}

const rotate = (angle: number) => {
  rotation.value = (rotation.value + angle) % 360
  if (originalImage.value) {
    fitImageToCanvas(originalImage.value)
  }
}

const zoom = (factor: number) => {
  zoomLevel.value *= factor
  if (originalImage.value) {
    drawImage(originalImage.value)
  }
}

const crop = () => {
  if (context.value && canvas.value) {
    const cropWidth = cropEndX.value - cropStartX.value
    const cropHeight = cropEndY.value - cropStartY.value

    if (cropWidth > 0 && cropHeight > 0) {
      const imageData = context.value.getImageData(
        cropStartX.value,
        cropStartY.value,
        cropWidth,
        cropHeight
      )

      // Redibujar el lienzo con la imagen recortada
      canvas.value.width = cropWidth
      canvas.value.height = cropHeight
      context.value.putImageData(imageData, 0, 0)
      resetTransforms()
    }
  }
}

const acceptCrop = () => {
  crop()
  isCropping.value = false
}

const cancelCrop = () => {
  isCropping.value = false
  drawImage(originalImage.value!) // Redibuja la imagen original
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    loadImage()
  }
}

const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
    loadImage()
  }
}

const goToImage = (index: number) => {
  if (index >= 0 && index < images.value.length) {
    currentIndex.value = index
    loadImage()
  }
}

const setMode = (newMode: 'pan' | 'crop') => {
  mode.value = newMode
  if (originalImage.value) {
    drawImage(originalImage.value) // Redibuja la imagen para reflejar el modo actual
  }
}

const resetTransforms = () => {
  offsetX.value = 0
  offsetY.value = 0
  zoomLevel.value = 1
  rotation.value = 0
}

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    if (originalImage.value) {
      fitImageToCanvas(originalImage.value)
    }
  }
}
onMounted(() => {
  // Simulate fetching images from server
  images.value = [
    {
      src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720801579909-7aca1454b87dcb8631ca.jpg'
    },
    {
      src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720806817491-fc7fa6da5f07e7e4756b.jpg'
    },
    {
      src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720809338358-beab8239f8f8eef4c869.jpg'
    }
  ]
  resizeCanvas()
  loadImage()
  window.addEventListener('resize', resizeCanvas)
})

watch(currentIndex, loadImage)
</script>

<style scoped>
.image-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}

canvas:active {
  cursor: grabbing;
}

.controls button {
  margin: 0 5px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.controls button:hover {
  background: rgba(255, 255, 255, 0.9);
}
</style>

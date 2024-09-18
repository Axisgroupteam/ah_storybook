<template>
  <div>
    <label v-if="label" :class="labelClasses"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
    <div
      v-if="previewImages.length > 0"
      class="flex relative items-center align-middle my-5 text-base text-neutral-900"
    >
      <span
        @click="scrollLeft"
        class="flex obsolute items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer transition-all ease-in-out duration-150 right-0"
      >
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.64451 18.4422L8.64456 18.4423C8.88555 18.6956 9.20695 18.833 9.53656 18.8332L8.64451 18.4422ZM8.64451 18.4422L1.54774 10.9848C1.54772 10.9848 1.5477 10.9847 1.54768 10.9847C1.30591 10.7306 1.16602 10.3808 1.16602 10.0113C1.16602 9.64176 1.30591 9.29204 1.54768 9.03787C1.5477 9.03785 1.54772 9.03783 1.54774 9.03781L8.64451 1.58036L8.64457 1.58041M8.64451 18.4422L8.64457 1.58041M8.64457 1.58041L8.65043 1.57403M8.64457 1.58041L8.65043 1.57403M8.65043 1.57403C8.7693 1.44471 8.91011 1.34302 9.06392 1.27359C9.21766 1.20419 9.38202 1.16807 9.54762 1.16655C9.71323 1.16504 9.87809 1.19816 10.0328 1.26468C10.1876 1.33124 10.33 1.43025 10.4508 1.55725C10.5717 1.68431 10.6686 1.83676 10.7346 2.00631C10.8007 2.1759 10.8342 2.3584 10.8326 2.54295C10.8311 2.72749 10.7946 2.90929 10.7258 3.07754C10.6571 3.24575 10.5577 3.39627 10.4349 3.52098L10.4348 3.52092M8.65043 1.57403L10.4348 3.52092M10.4348 3.52092L10.4288 3.52722M10.4348 3.52092L10.4288 3.52722M10.4288 3.52722L4.58637 9.66661L4.25835 10.0113M10.4288 3.52722L4.25835 10.0113M4.25835 10.0113L4.58637 10.356M4.25835 10.0113L4.58637 10.356M4.58637 10.356L10.4288 16.4953M4.58637 10.356L10.4288 16.4953M10.4288 16.4953C10.4288 16.4953 10.4288 16.4954 10.4288 16.4954C10.609 16.6847 10.7342 16.9289 10.7851 17.1982C10.8361 17.4675 10.8098 17.7465 10.7103 17.9989C10.6109 18.251 10.4441 18.4627 10.2348 18.6097L10.5222 19.0188M10.4288 16.4953L10.5222 19.0188M10.5222 19.0188L10.2348 18.6097C10.0259 18.7564 9.783 18.8331 9.53678 18.8332L10.5222 19.0188Z"
            fill="#171717"
            stroke="#171717"
          />
        </svg>
      </span>
      <div class="flex w-full gap-4 overflow-x-hidden" ref="carousel">
        <FwbImageSmall
          v-for="(image, index) in previewImages"
          class="min-w-36"
          :key="index"
          :image="image"
          :icon="icon"
          :closeable="false"
          @remove="removeImage(index)"
          @click="handleModalImage(image, index)"
        />
      </div>
      <span
        @click="scrollRight"
        class="flex obsolute items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 hover:dar:neutral-800 cursor-pointer transition-all ease-in-out duration-150 right-0"
      >
        <svg
          class="rotate-180"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.64451 18.4422L8.64456 18.4423C8.88555 18.6956 9.20695 18.833 9.53656 18.8332L8.64451 18.4422ZM8.64451 18.4422L1.54774 10.9848C1.54772 10.9848 1.5477 10.9847 1.54768 10.9847C1.30591 10.7306 1.16602 10.3808 1.16602 10.0113C1.16602 9.64176 1.30591 9.29204 1.54768 9.03787C1.5477 9.03785 1.54772 9.03783 1.54774 9.03781L8.64451 1.58036L8.64457 1.58041M8.64451 18.4422L8.64457 1.58041M8.64457 1.58041L8.65043 1.57403M8.64457 1.58041L8.65043 1.57403M8.65043 1.57403C8.7693 1.44471 8.91011 1.34302 9.06392 1.27359C9.21766 1.20419 9.38202 1.16807 9.54762 1.16655C9.71323 1.16504 9.87809 1.19816 10.0328 1.26468C10.1876 1.33124 10.33 1.43025 10.4508 1.55725C10.5717 1.68431 10.6686 1.83676 10.7346 2.00631C10.8007 2.1759 10.8342 2.3584 10.8326 2.54295C10.8311 2.72749 10.7946 2.90929 10.7258 3.07754C10.6571 3.24575 10.5577 3.39627 10.4349 3.52098L10.4348 3.52092M8.65043 1.57403L10.4348 3.52092M10.4348 3.52092L10.4288 3.52722M10.4348 3.52092L10.4288 3.52722M10.4288 3.52722L4.58637 9.66661L4.25835 10.0113M10.4288 3.52722L4.25835 10.0113M4.25835 10.0113L4.58637 10.356M4.25835 10.0113L4.58637 10.356M4.58637 10.356L10.4288 16.4953M4.58637 10.356L10.4288 16.4953M10.4288 16.4953C10.4288 16.4953 10.4288 16.4954 10.4288 16.4954C10.609 16.6847 10.7342 16.9289 10.7851 17.1982C10.8361 17.4675 10.8098 17.7465 10.7103 17.9989C10.6109 18.251 10.4441 18.4627 10.2348 18.6097L10.5222 19.0188M10.4288 16.4953L10.5222 19.0188M10.5222 19.0188L10.2348 18.6097C10.0259 18.7564 9.783 18.8331 9.53678 18.8332L10.5222 19.0188Z"
            fill="#171717"
            stroke="#171717"
          />
        </svg>
      </span>
    </div>
    <div
      class="flex items-center justify-center"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="onDrop"
    >
      <label :class="dropzoneLabelClasses">
        <div :class="dropzoneWrapClasses">
          <component
            class="text-neutral-500 dark:text-neutral-400 mb-2"
            :is="getFBIcon('upload')"
          />
          <div>
            <div :class="dropzoneTextClasses">
              <span><span class="font-semibold">Click to upload</span> or drag and drop</span>
              <span> SVG, PNG, JPG or GIF (MAX. 800x400px) </span>
            </div>
            <slot />
          </div>
        </div>
        <input
          ref="fileInput"
          multiple
          type="file"
          :disabled="disabled"
          :accept="accept"
          class="hidden"
          @change="onFileChange"
        />
      </label>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses" class="mt-2">
      <slot name="validationMessage" />
    </p>
  </div>
  <FwbImageCarrousel
    :open-image="openImage"
    :array-images="previewImages"
    :index-image="indexImageSelect"
    @closed="openImage = false"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import FwbImageSmall from './FwbImageSmall.vue'
import FwbImageCarrousel from './FwbImageCarrousel.vue'

import { useFileInputClasses } from './composables/useFileInputClasses'
import { type ValidationStatus, validationStatusMap } from './types'
import { getFBIcon } from '@/utils/getAssets'
import { twMerge } from 'tailwind-merge'
import type { iconsNames } from '@/components/data/icons'

const emit = defineEmits(['update-images'])

interface FileInputProps {
  disabled?: boolean
  label?: string
  modelValue?: File | File[] | null
  accept?: string
  required?: boolean
  validationStatus?: ValidationStatus
  existingImages: Array<string>
  icon?: iconsNames
}

const props = withDefaults(defineProps<FileInputProps>(), {
  disabled: false,
  label: 'Fotos',
  accept: 'image/*',
  required: false,
  validationStatus: 'normal',
  existingImages: () => [],
  icon: 'tash_red'
})

const classes = computed(() => useFileInputClasses(props.disabled, props.validationStatus))
const labelClasses = computed(() => classes.value.labelClasses.value)
const dropzoneLabelClasses = computed(() => classes.value.dropzoneLabelClasses.value)
const dropzoneWrapClasses = computed(() => classes.value.dropzoneWrapClasses.value)
const dropzoneTextClasses = computed(() => classes.value.dropzoneTextClasses.value)

const validationWrapperClasses = computed(() =>
  twMerge(
    'text-sm',
    props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : ''
  )
)

const previewImages = ref([...props.existingImages])
const selectedFiles = ref([])
const fileInput = ref(null)
const openImage = ref(false)
const imageSelected = ref('')
const indexImageSelect = ref(0)

const onFileChange = (event) => {
  const files = Array.from(event.target.files)
  handleFiles(files)
}

const onDrop = (event: any) => {
  event.preventDefault() // Prevenir el comportamiento predeterminado del navegador
  event.stopPropagation() // Detener la propagación del evento
  const files = Array.from(event.dataTransfer.files)
  handleFiles(files)
}

const handleFiles = (files: any) => {
  const validFiles = files.filter((file: any) => isValidImage(file))
  selectedFiles.value = [...selectedFiles.value, ...validFiles]
  const newPreviewImages = validFiles.map((file: any) => URL.createObjectURL(file))
  previewImages.value = [...previewImages.value, ...newPreviewImages]
  emit('update-images', selectedFiles.value)
}

const isValidImage = (file) => {
  const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']
  return validTypes.includes(file.type)
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
  emit('update-images', selectedFiles.value)
}

const selectFiles = () => {
  fileInput.value.click()
}

watch(
  props.existingImages,
  (newVal, oldVal) => {
    if (newVal) {
      previewImages.value = newVal
    }
  },
  { immediate: true, deep: true }
)

const handleModalImage = (item: any, index: number) => {
  if (item) {
    imageSelected.value = item
    indexImageSelect.value = index
    openImage.value = !openImage.value
  }
}

const carousel = ref()
const scrollLeft = () => {
  carousel.value.scrollBy({ left: -200, behavior: 'smooth' })
}
const scrollRight = () => {
  carousel.value.scrollBy({ left: 200, behavior: 'smooth' })
}
</script>

<style scoped>
input[type='file']::-webkit-file-upload-button {
  @apply text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800;
}

.scroll-button {
  background-color: #e0e0e0; /* Neutral 50 */
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 50%;
  transition: background-color 0.3s;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-button:hover {
  background-color: #f5f5f5; /* Neutral 100 */
}

/* Estilo personalizado para la scrollbar */
.scrollbar-custom::-webkit-scrollbar {
  width: 4px; /* ancho de la scrollbar */
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #4a5568; /* color del pulgar de la scrollbar */
  border-radius: 6px; /* redondeo del pulgar de la scrollbar */
}
.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #edf2f7; /* color de la pista de la scrollbar */
  border-radius: 6px; /* redondeo de la pista de la scrollbar */
}
</style>

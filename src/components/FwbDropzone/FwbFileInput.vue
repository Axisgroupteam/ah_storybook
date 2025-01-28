<template>
  <div>
    <div
      class="flex items-start justify-center flex-col"
      @change="handleChange"
      @dragover="!disabled ? dragOverHandler : true"
      @drop="!disabled ? dropFileHandler : true"
    >
      <label @click.stop>
        <span
          :class="[
            labelClasses,
            validationStatus === 'error' ? 'text-red-700 dark:!text-red-500' : '',
            disabled ? '!text-neutral-400 dark:!text-neutral-500' : ''
          ]"
          >{{ label }} <span class="text-red-500" v-if="required"> *</span></span
        >
      </label>
      <label
        :class="[
          dropzoneLabelClasses,
          disabled
            ? '!bg-neutral-100 !cursor-not-allowed dark:!bg-neutral-700 dark:hover:border-neutral-600'
            : '',
          validationStatus === 'error'
            ? '!border-red-500 bg-red-50 hover:bg-red-50 dark:hover:bg-neutral-700'
            : ''
        ]"
        @click="handleLabelClick"
      >
        <div
          class="text-neutral-500 dark:text-neutral-400"
          :class="[
            dropzoneWrapClasses,
            disabled
              ? 'bg-neutral-100 text-neutral-400 dark:text-neutral-500 dark:bg-neutral-700'
              : '',
            disabled ? '!text-neutral-400 dark:!text-neutral-500' : '',
            validationStatus === 'error'
              ? 'text-sm text-red-600 border-red-500 dark:text-red-500'
              : ''
          ]"
        >
          <IconWrapper name="upload" size="20" class="mb-2" />
          <div v-if="!model">
            <div
              :class="[
                dropzoneTextClasses,
                disabled
                  ? 'bg-neutral-100 !text-neutral-400 dark:!text-neutral-500 dark:bg-neutral-700'
                  : '',
                validationStatus === 'error'
                  ? 'text-sm text-red-600 border-red-500 dark:text-red-500'
                  : ''
              ]"
            >
              <span><span class="font-semibold">Click to upload</span> or drag and drop</span>
              <span> SVG, PNG, JPG or GIF (MAX. 800x400px) </span>
            </div>
            <slot />
          </div>
          <p v-else>File: {{ dropZoneText }}</p>
        </div>
        <input :multiple="multiple" type="file" :accept="accept" class="hidden" />
      </label>
      <div
        class="w-full"
        :class="validationStatus === 'error' ? 'text-sm !text-red-600 dark:!text-red-500' : ''"
      >
        <slot name="validationMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { isArray } from 'lodash-es'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { getFBIcon } from '@/utils/getAssets'
import FwbButton from '../FwbButton/FwbButton.vue'
import { onClickOutside } from '@vueuse/core'
import { type ValidationStatus, validationStatusMap } from '../FwbInput/types'
import IconWrapper from '../IconWrapper.vue'

interface FileInputProps {
  dropzone?: boolean
  label?: string
  modelValue?: File | File[] | null
  multiple?: boolean
  accept?: string
  required?: boolean
  disabled?: boolean
  size?: string
  validationStatus?: ValidationStatus | undefined
}

const props = withDefaults(defineProps<FileInputProps>(), {
  dropzone: false,
  label: 'Upload file',
  modelValue: null,
  multiple: false,
  accept: '',
  required: false,
  disabled: false,
  size: 'md',
  validationStatus: 'normal'
})

const bordered = ref(false)

const target = ref(null)

onClickOutside(target, () => (bordered.value = false))

const dropZoneText = computed(() => {
  if (isArray(props.modelValue)) {
    return Array.isArray(props.modelValue) ? props.modelValue.map((el) => el.name).join(', ') : ''
  } else if (props.modelValue instanceof FileList) {
    return Array.from(props.modelValue)
      .map((el) => el.name)
      .join(',')
  } else if (props.modelValue instanceof File) {
    return props.modelValue.name || ''
  }

  return ''
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const showTrash = ref(false)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (props.multiple) {
    model.value = Array.from(target.files ?? [])
  } else {
    model.value = target.files?.[0] ?? null
  }
  showTrash.value = true
}

const handleLabelClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
  }
}

const dropFileHandler = (event: DragEvent) => {
  event.preventDefault()
  const arr: File[] = []
  if (event.dataTransfer?.items) {
    Object.values(event.dataTransfer.items).forEach((item: DataTransferItem) => {
      if (item.kind === 'file') {
        arr.push(item.getAsFile() as File)
      }
    })
    if (props.multiple) {
      model.value = arr
    } else {
      model.value = arr[0]
    }
  } else if (event.dataTransfer?.files) {
    Object.values(event.dataTransfer.files).forEach((file: File) => {
      model.value = file
    })
  }
}

const dragOverHandler = (event: Event) => {
  event.preventDefault()
}

const { labelClasses, dropzoneLabelClasses, dropzoneWrapClasses, dropzoneTextClasses } =
  useFileInputClasses(props.size)
</script>

<style scoped>
input[type='file']::-webkit-file-upload-button {
  @apply text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800;
}

input[type='file']:disabled::-webkit-file-upload-button {
  @apply invisible;
}
</style>

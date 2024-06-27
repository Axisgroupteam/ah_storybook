<template>
  <div>
    <div v-if="!dropzone">
      <label>
        <span :class="labelClasses"
          >{{ label }}<span class="text-red-500" v-if="required"> *</span></span
        >
        <input
          :class="fileInpClasses"
          :multiple="multiple"
          type="file"
          :accept="accept"
          @change="handleChange"
        />
      </label>
      <slot />
    </div>
    <div
      v-else
      class="flex items-center justify-center"
      @change="handleChange"
      @dragover="dragOverHandler"
      @drop="dropFileHandler"
    >
      <label :class="dropzoneLabelClasses">
        <div :class="dropzoneWrapClasses">
          <component
            class="text-neutral-500 dark:text-neutral-400 mb-2"
            :is="getFBIcon('upload')"
          />
          <div v-if="!model">
            <div :class="dropzoneTextClasses">
              <span><span class="font-semibold">Click to upload</span> or drag and drop</span>
              <span> SVG, PNG, JPG or GIF (MAX. 800x400px) </span>
            </div>
            <slot />
          </div>
          <p v-else>File: {{ dropZoneText }}</p>
        </div>
        <input :multiple="multiple" type="file" :accept="accept" class="hidden" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isArray } from 'lodash-es'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { getFBIcon } from '@/utils/getAssets'

interface FileInputProps {
  dropzone?: boolean
  label?: string
  modelValue?: File | File[] | null
  multiple?: boolean
  accept?: string
  required?: boolean
}

const props = withDefaults(defineProps<FileInputProps>(), {
  dropzone: false,
  label: 'Upload file',
  modelValue: null,
  multiple: false,
  accept: '',
  required: false
})

const dropZoneText = computed(() => {
  if (isArray(props.modelValue)) {
    return props.modelValue.map((el) => el.name).join(', ')
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

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (props.multiple) {
    model.value = Array.from(target.files ?? [])
  } else {
    model.value = target.files?.[0] ?? null
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

const {
  fileInpClasses,
  labelClasses,
  dropzoneLabelClasses,
  dropzoneWrapClasses,
  dropzoneTextClasses
} = useFileInputClasses()
</script>

<style scoped>
input[type='file']::-webkit-file-upload-button {
  @apply text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800;
}
</style>

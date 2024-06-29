<template>
  <div>
    <div v-if="!dropzone">
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
      <div class="flex relative" ref="target">
        <div
          class="absolute flex items-center justify-start w-full h-full left-0 bottom-0 border-[1px] rounded-lg"
          :class="[
            bordered ? 'border-red-500' : 'border-transparent',
            disabled ? 'cursor-not-allowed ' : ''
          ]"
          @click="handleContainerClick"
        >
          <FwbButton
            color="terciary"
            class="h-full rounded-r-none active:ring-0 w-fit"
            :disabled="disabled"
            @click.stop="clickFileInput"
          >
            Choose File
          </FwbButton>
        </div>
        <input
          :class="[
            fileInpClasses,
            disabled ? 'bg-neutral-100 text-neutral-400 dark:text-neutral-500' : '',
            validationStatus === 'error'
              ? 'bg-red-50 border-red-500 text-red-900 dark:text-red-500 dark:border-red-500'
              : ''
          ]"
          :multiple="multiple"
          type="file"
          :accept="accept"
          @change="handleChange"
          ref="fileInput"
          :disabled="disabled"
        />
        <div
          class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0"
          @click.stop="clearSelection"
        >
          <svg
            v-if="showTrash"
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
      <div
        :class="
          validationStatus === 'error'
            ? 'text-sm text-red-600 border-red-500 dark:text-red-500'
            : ''
        "
      >
        <slot />
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-center flex-col"
      @change="handleChange"
      @dragover="!disabled ? dragOverHandler : true"
      @drop="!disabled ? dropFileHandler : true"
    >
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
          :class="[
            dropzoneWrapClasses,
            disabled
              ? 'bg-neutral-100 text-neutral-400 dark:text-neutral-500 dark:bg-neutral-700'
              : ''
          ]"
        >
          <component
            class="text-neutral-500 dark:text-neutral-400 mb-2"
            :class="[
              disabled ? '!text-neutral-400 dark:!text-neutral-500' : '',
              validationStatus === 'error'
                ? 'text-sm text-red-600 border-red-500 dark:text-red-500'
                : ''
            ]"
            :is="getFBIcon('upload')"
          />
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

const fileInput = ref<HTMLElement | null>(null)
const bordered = ref(false)

const target = ref(null)

onClickOutside(target, () => (bordered.value = false))

const clickFileInput = (event: Event) => {
  event.stopPropagation()
  if (fileInput.value !== null) {
    fileInput.value.click()
    bordered.value = true
  }
}

const clearSelection = (event: Event) => {
  event.stopPropagation()
  if (fileInput.value !== null) {
    fileInput.value.value = ''
    model.value = null
    showTrash.value = false
  }
}

const handleContainerClick = (event: Event) => {
  event.stopPropagation()
}

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

const {
  fileInpClasses,
  labelClasses,
  dropzoneLabelClasses,
  dropzoneWrapClasses,
  dropzoneTextClasses
} = useFileInputClasses(props.size)
</script>

<style scoped>
input[type='file']::-webkit-file-upload-button {
  @apply text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-800;
}

input[type='file']:disabled::-webkit-file-upload-button {
  @apply invisible;
}
</style>

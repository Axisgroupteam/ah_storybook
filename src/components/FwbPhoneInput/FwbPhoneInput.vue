<template>
  <div>
    <label @click.stop>
      <span :class="[labelClasses]"
        >{{ label }} <span class="text-red-500" v-if="required"> *</span></span
      >
    </label>
    <div class="flex relative" ref="target">
      <div
        class="absolute flex items-center justify-start w-[76px] h-full left-0 bottom-0 border-[1px] rounded-lg rounded-r-none bg-red-500"
        :class="[
          bordered ? 'border-red-500' : 'border-transparent',
          disabled ? 'cursor-not-allowed ' : ''
        ]"
      >
        <div class="flex justify-center items-center">
          <component :is="getFBIcon('usa')" />
          +1
        </div>
      </div>
      <input
        :class="[
          fileInpClasses,
          disabled ? 'bg-neutral-100 text-neutral-400 dark:text-neutral-500' : '',
          validationStatus === 'error'
            ? 'bg-red-50 border-red-500 text-red-900 dark:text-red-500 dark:border-red-500'
            : ''
        ]"
        type="tel"
        @change="handleChange"
        :disabled="disabled"
      />
    </div>
    <div
      :class="
        validationStatus === 'error' ? 'text-sm text-red-600 border-red-500 dark:text-red-500' : ''
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ValidationStatus } from '../FwbInput/types'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { defineProps, ref } from 'vue'
import { getFBIcon } from '@/utils/getAssets'

interface Props {
  size?: string
  label?: string
  required?: boolean
  disabled?: boolean
  validationStatus: ValidationStatus | undefined
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  label: 'Text',
  required: false,
  disabled: false,
  validationStatus: 'normal'
})

const bordered = ref(false)

const { fileInpClasses, labelClasses } = useFileInputClasses(props.size)
</script>

<style scoped></style>

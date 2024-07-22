<template>
  <form class="mx-auto">
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
    <div
      ref="target"
      class="flex items-center border rounded-lg cursor-pointer"
      :class="[
        bordered ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600',
        validationStatus === 'error'
          ? '!border-red-500 !bg-red-50 !text-red-900 !placeholder-red-700 dark:!text-red-500 dark:!placeholder-red-500'
          : ''
      ]"
      @click="handleContainerClick"
    >
      <fwb-dropdown
        text="asd"
        placement="bottom"
        class="rounded-lg"
        type="secondary"
        @toggleVisibility="handleToogle"
      >
        <template #trigger>
          <div
            class="cursor-pointer flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-900 bg-neutral-100 rounded-s-lg hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white justify-center border-r-[1px] border-neutral-300 dark:border-neutral-600"
            :class="[
              disabled
                ? '!cursor-not-allowed bg-neutral-100 hover:!bg-neutral-100 dark:hover:!bg-neutral-700 !text-neutral-400 dark:!text-neutral-500'
                : '',
              validationStatus === 'error'
                ? '!border-red-500 !bg-red-50 !text-red-900 !placeholder-red-700 dark:!text-red-500 dark:!placeholder-red-500 dark:!bg-neutral-700'
                : ''
            ]"
          >
            <component :is="icons.usa" />
            +1
            <component
              :is="icons.caret"
              class="ml-2 w-3 h-3"
              :class="visible ? 'rotate-180' : 'rotate-0'"
            />
          </div>
        </template>
        <ul
          class="w-full shadow-md rounded-lg h-full"
          v-if="!disabled"
          :style="{
            width: target?.clientWidth - 24 + 'px'
          }"
        >
          <li
            v-for="(header, index) in 3"
            :key="header"
            class="px-2 py-2 whitespace-nowrap flex gap-2 justify-start items-center hover:bg-neutral-100 hover:dark:bg-neutral-600 cursor-pointer rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400 text-sm font-medium w-full"
          >
            <div type="button">
              <span class="inline-flex items-center">
                <component :is="icons.usa" class="mr-2" />
                United States (+1)
              </span>
            </div>
          </li>
        </ul>
      </fwb-dropdown>
      <div class="relative w-full">
        <input
          type="text"
          id="phone-input"
          class="block p-2.5 w-full z-20 text-sm text-neutral-900 bg-neutral-50 rounded-e-lg dark:bg-neutral-700 dark:placeholder-neutral-400 dark:text-white outline-none ring-0 focus:outline-none focus:ring-0 border-0"
          :class="[
            disabled
              ? 'cursor-not-allowed bg-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500'
              : '',
            validationStatus === 'error'
              ? '!border-red-500 !bg-red-50 !text-red-900 !placeholder-red-700 dark:!text-red-500 dark:!placeholder-red-500 dark:!bg-neutral-700'
              : ''
          ]"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
          :disabled="disabled"
        />
      </div>
    </div>
    <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
      <slot name="validationMessage" v-if="!visible" />
    </p>
  </form>
</template>

<script setup lang="ts">
import { validationStatusMap, type InputSize, type ValidationStatus } from '../FwbInput/types'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { defineProps, ref, reactive, computed } from 'vue'
import { getFBIcon } from '@/utils/getAssets'
import { onClickOutside } from '@vueuse/core'
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue'
import { useInputClasses } from '../FwbInput/composables/useInputClasses'
import { twMerge } from 'tailwind-merge'

interface Props {
  size?: InputSize
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
const target = ref<HTMLElement | null>(null)
const visible = ref(false)

const handleToogle = (value: boolean) => {
  if (!props.disabled) visible.value = value
}

const handleContainerClick = () => {
  if (!props.disabled) {
    bordered.value = true
  }
}

onClickOutside(target, () => (bordered.value = false))

const { inputClasses, labelClasses } = useInputClasses(
  props.size,
  props.disabled,
  props.validationStatus
)

const icons = reactive({
  usa: computed(() => getFBIcon('usa')),
  caret: computed(() => getFBIcon('caret-down'))
})

const validationWrapperClasses = computed(() =>
  twMerge(
    'text-sm',
    props.validationStatus === validationStatusMap.Error ? 'text-red-600 dark:text-red-500' : ''
  )
)
</script>

<style scoped></style>

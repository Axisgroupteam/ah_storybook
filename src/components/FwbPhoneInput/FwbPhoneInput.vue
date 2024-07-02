<template>
  <form class="max-w-sm mx-auto">
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
      :class="bordered ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'"
      @click="bordered = true"
    >
      <fwb-dropdown text="asd" placement="bottom" class="rounded-lg" @toogle="handleToogle">
        <template #trigger>
          <div
            class="cursor-pointer flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-900 bg-neutral-100 rounded-s-lg hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white justify-center border-r-[1px] border-neutral-300 dark:border-neutral-600"
          >
            <component :is="icons.usa" class="mr-2" />
            +1
            <component :is="icons.caret" class="ml-2.5 w-3 h-3" :class="visible ? 'rotate-180' : 'rotate-0'" />
          </div>
        </template>
        <div
          class="w-full p-4 shadow-md rounded-lg"
          :style="{
            width: target?.clientWidth + 'px'
          }"
        >
          <p
            v-for="(header, index) in 4"
            :key="header"
            class="text-sm leading-[14px] p-2 rounded-[8px] hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer max-h-[32px] flex justify-start items-center text-neutral-900 dark:text-white"
          >
            <div type="button">
              <span class="inline-flex items-center">
                <component :is="icons.usa" />
                United States (+1)
              </span>
            </div>
          </p>
        </div>
      </fwb-dropdown>
      <div class="relative w-full">
        <input
          type="text"
          id="phone-input"
          class="block p-2.5 w-full z-20 text-sm text-neutral-900 bg-neutral-50 rounded-e-lg dark:bg-neutral-700 dark:placeholder-neutral-400 dark:text-white outline-none ring-0 focus:outline-none focus:ring-0 border-0"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { InputSize, ValidationStatus } from '../FwbInput/types'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { defineProps, ref, reactive, computed } from 'vue'
import { getFBIcon } from '@/utils/getAssets'
import { onClickOutside } from '@vueuse/core'
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue'
import { useInputClasses } from '../FwbInput/composables/useInputClasses'

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
  visible.value = value;
};

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
</script>

<style scoped></style>

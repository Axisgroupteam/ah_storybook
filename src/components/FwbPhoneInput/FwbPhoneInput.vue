<template>
  <form class="max-w-sm mx-auto">
    {{ target?.clientWidth }}
    <div
      ref="target"
      class="flex items-center border rounded-lg"
      :class="bordered ? 'border-red-500' : 'border-transparent'"
      @click="bordered = true"
    >
      <fwb-dropdown text="asd" placement="bottom" class="rounded-lg">
        <template #trigger>
          <div
            class="cursor-pointer flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-900 bg-neutral-100 border border-neutral-300 rounded-s-lg hover:bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:ring-neutral-700 dark:text-white dark:border-neutral-600 justify-center gap-2"
          >
            <component :is="getFBIcon('usa')" />
            +1
            <component :is="getFBIcon('caret-down')" />
          </div>
        </template>
        <div
          class="w-full p-4 shadow-md"
          style="{
          width: target?.clientWidth + 'px'
        }"
        >
          <p
            v-for="(header, index) in 6"
            :key="header"
            :class="index === 0 ? 'mt-[8px]' : 'mt-[6px]'"
            class="text-sm leading-[14px] p-2 rounded-[8px] hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer max-h-[32px] flex justify-start items-center text-neutral-900 dark:text-white"
          >
            {{ 'text' }}
          </p>
        </div>
      </fwb-dropdown>

      <label
        for="phone-input"
        class="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white"
        >Phone number:</label
      >
      <div class="relative w-full">
        <input
          type="text"
          id="phone-input"
          class="block p-2.5 w-full z-20 text-sm text-neutral-900 bg-neutral-50 rounded-e-lg border-neutral-300 dark:bg-neutral-700 dark:border-s-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white outline-none ring-0 focus:outline-none focus:ring-0 focus:border-transparent"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ValidationStatus } from '../FwbInput/types'
import { useFileInputClasses } from './composables/useFileInputClasses'
import { defineProps, ref, reactive, computed } from 'vue'
import { getFBIcon } from '@/utils/getAssets'
import { onClickOutside } from '@vueuse/core'
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue'

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
const target = ref<HTMLElement | null>(null)

onClickOutside(target, () => (bordered.value = false))

const { fileInpClasses, labelClasses } = useFileInputClasses(props.size)
</script>

<style scoped></style>

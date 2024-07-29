<template>
  <div>
    <div class="bg-[#171717]/50 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-50" />
    <div
      ref="modalRef"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full justify-center items-center flex flex-col"
      tabindex="0"
      @click.self="clickOutside"
      @keyup.esc="closeWithEsc"
    >
      <div
        :class="`${modalSizeClasses[size]}`"
        class="relative p-4 w-full h-full flex justify-start items-center max-h-[100%] overflow-hidden"
      >
        <!-- Modal content -->
        <div ref="modal" class="max-h-full bg-white rounded-lg dark:bg-neutral-800 w-full">
          <!-- Modal header -->
          <div
            ref="header"
            class="p-4 rounded-t flex justify-between items-center text-lg text-neutral-900 dark:text-white"
          >
            <slot name="header" />
            <FwbButton color="secondary" square class="border-0" @click="closeModal">
              <svg
                class="h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                />
              </svg>
            </FwbButton>
          </div>
          <!-- Modal body -->
          <!-- Additional content above scrollable area -->
          <div :class="$slots.bodyHeader ? 'px-4 pb-4' : 'p-0'" ref="bodyHeaderElement">
            <slot name="bodyHeader" />
          </div>
          <PerfectScrollbar>
            <div
              :class="$slots.header ? '' : 'pt-0'"
              class="p-4 py-0"
              :style="{
                maxHeight: $slots.bodyHeader
                  ? `calc(${height}px - 172px - ${additionalContentHeight}px)`
                  : `calc(${height}px - 172px`
              }"
            >
              <div class="text-neutral-900 dark:text-white">
                <slot name="body" />
              </div>
            </div>
          </PerfectScrollbar>
          <!-- Modal footer -->
          <div :class="$slots.footer ? 'p-4' : 'p-[34px]'">
            <div v-if="$slots.footer" ref="footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { ModalSize } from './types'
import { useWindowSize } from '@vueuse/core'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import FwbButton from '../FwbButton/FwbButton.vue'

const modal = ref(null)
const header = ref(null)
const footer = ref(null)
const bodyHeaderElement = ref(null)
const additionalContentHeight = ref(0)

const { height } = useWindowSize()

interface ModalProps {
  notEscapable?: boolean
  persistent?: boolean
  size?: ModalSize
}

const props = withDefaults(defineProps<ModalProps>(), {
  notEscapable: false,
  persistent: false,
  size: '3xl'
})

const emit = defineEmits(['close', 'click:outside'])
const modalSizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl'
}

function closeModal() {
  emit('close')
}
function clickOutside() {
  if (!props.persistent) {
    emit('click:outside')
    closeModal()
  }
}

function closeWithEsc() {
  if (!props.notEscapable && !props.persistent) closeModal()
}
const modalRef: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  if (modalRef.value) {
    modalRef.value.focus()
  }
  // Calculate the height of the additional content
  if (bodyHeaderElement.value) {
    additionalContentHeight.value = (bodyHeaderElement.value as HTMLElement).clientHeight
  }
})
</script>

<style>
.ps {
  max-height: 100%;
}
</style>

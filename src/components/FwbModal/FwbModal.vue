<template>
  <div>
    <div class="bg-[#171717]/50 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-[60]" />
    <div
      ref="modalRef"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[60] w-full md:inset-0 h-full md:h-full justify-center flex flex-col"
      :class="
        position === 'left' ? 'items-start' : position === 'right' ? 'items-end' : 'items-center'
      "
      tabindex="0"
      @click.self="clickOutside"
      @keyup.esc="closeWithEsc"
    >
      <div
        :class="[`${modalSizeClasses[size]}`, size === 'screen' ? 'px-4' : '']"
        class="relative py-4 w-full h-full flex justify-start items-center max-h-[100%] overflow-hidden"
      >
        <div ref="modal" class="max-h-full bg-white rounded-lg dark:bg-neutral-800 w-full">
          <div
            ref="header"
            class="px-4 pt-4 rounded-t flex justify-between items-center text-lg text-neutral-900 dark:text-white whitespace-nowrap"
            :class="paddingBottomClass"
          >
            <slot name="header" />

            <div class="w-full flex justify-end items-center">
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
          </div>

          <div ref="bodyHeaderElement" :class="$slots.bodyHeader ? 'px-4 pb-4' : 'p-0'">
            <slot name="bodyHeader" />
          </div>
          <PerfectScrollbar v-if="!blockScroll && (scrollNeededProp || needsScrollbar)">
            <div
              ref="contentRef"
              :class="$slots.header ? '' : 'pt-0'"
              class="p-4 py-0"
              :style="contentStyle"
            >
              <div class="text-neutral-900 dark:text-white pb-4">
                <slot name="body" />
              </div>
            </div>
          </PerfectScrollbar>
          <div
            v-else
            ref="contentRef"
            :class="$slots.header ? '' : 'pt-0'"
            class="p-4 py-0"
            :style="contentStyle"
          >
            <div class="text-neutral-900 dark:text-white">
              <slot name="body" />
            </div>
          </div>
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
import { computed, nextTick, onMounted, ref, onUnmounted, watch, useSlots } from 'vue'
import type { ModalSize } from './types'
import { useWindowSize } from '@vueuse/core'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import FwbButton from '../FwbButton/FwbButton.vue'
import type { Ref } from 'vue'

const modal = ref(null)
const header = ref(null)
const footer = ref(null)
const bodyHeaderElement = ref(null)
const additionalContentHeight = ref(0)
const slots = useSlots()

const { height } = useWindowSize()

interface ModalProps {
  notEscapable?: boolean
  persistent?: boolean
  scrollNeededProp?: boolean
  size?: ModalSize
  paddingBottom?: number
  position?: 'left' | 'right'
  blockScroll?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  notEscapable: false,
  persistent: true,
  scrollNeededProp: false,
  size: '3xl',
  position: undefined,
  blockScroll: false
})

const paddingBottomClass = computed(() => {
  return props.paddingBottom !== undefined ? `pb-[${props.paddingBottom}px]` : 'pb-4'
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
const isMounted: Ref = ref(false)
onMounted(() => {
  if (modalRef.value) {
    modalRef.value.focus()
  }
  if (bodyHeaderElement.value) {
    additionalContentHeight.value = (bodyHeaderElement.value as HTMLElement).clientHeight
  }
  nextTick(() => {
    checkScrollbarNeeded()
    isMounted.value = true
  })
  window.addEventListener('resize', checkScrollbarNeeded)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollbarNeeded)
})

watch([() => height.value, () => additionalContentHeight.value], () => {
  nextTick(checkScrollbarNeeded)
})

const contentRef = ref<HTMLElement | null>(null)
const needsScrollbar = ref(false)

const contentStyle = computed(() => ({
  maxHeight: slots.bodyHeader
    ? `calc(${height.value}px - 172px - ${additionalContentHeight.value}px)`
    : `calc(${height.value}px - 172px)`
}))

const checkScrollbarNeeded = () => {
  if (contentRef.value) {
    const contentHeight = contentRef.value.scrollHeight
    const containerHeight = contentRef.value.clientHeight
    needsScrollbar.value = contentHeight > containerHeight
  }
}

// Observar cambios en el contenido del modal
const observer = new MutationObserver(() => {
  nextTick(checkScrollbarNeeded)
})

onMounted(() => {
  if (contentRef.value) {
    observer.observe(contentRef.value, {
      childList: true,
      subtree: true,
      characterData: true
    })
  }
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<style>
.ps {
  max-height: 100%;
}
</style>

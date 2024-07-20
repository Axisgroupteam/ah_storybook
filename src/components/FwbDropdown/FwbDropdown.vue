<template>
  <div ref="wrapper" class="inline-flex relative">
    <div class="inline-flex items-center">
      <fwb-slot-listener @click="onToggle" class="cursor-pointer">
        <slot name="trigger">
          <fwb-button color="primary" size="xl">
            {{ text }}
            <template #suffix>
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </template>
          </fwb-button>
        </slot>
      </fwb-slot-listener>
    </div>
    <transition :name="transitionName">
      <div
        v-if="visible"
        ref="content"
        :class="[contentClasses, 'overflow-hidden']"
        :style="[contentStyles, { height: `${modalHeight}px` }]"
      >
        <fwb-slot-listener>
          <perfect-scrollbar>
            <div
              ref="contentWrapper"
              v-if="$slots.default"
              class="w-full h-full"
              :style="contentWrapperStyle"
              @click="onToggle"
            >
              <slot />
            </div>
          </perfect-scrollbar>
        </fwb-slot-listener>
        <div
          v-if="resizable && isResizable"
          ref="resizeHandle"
          :class="[
            'w-full cursor-ns-resize absolute left-0 py-2 bottom-0 flex justify-center items-center bg-neutral-50 dark:bg-neutral-800'
          ]"
          @mousedown="startResize"
        >
          <div class="bg-neutral-400 w-[64px] h-[6px] rounded-lg"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, onMounted, onUnmounted, watch, nextTick, useSlots } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { DropdownPlacement } from './types'
import FwbButton from '../FwbButton/FwbButton.vue'
import FwbSlotListener from '@/utils/FwbSlotListener/FwbSlotListener.vue'
import { useDropdownClasses } from './composables/useDropdownClasses'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const emit = defineEmits(['toggle'])

const visible = ref(false)
const modalHeight = ref(0)
const minHeight = ref(0)
const maxHeight = ref(0)
const isResizing = ref(false)
const startY = ref(0)
const startHeight = ref(0)
const initialHeight = ref(0)
const content = ref<HTMLDivElement>()
const wrapper = ref<HTMLDivElement>()
const contentWrapper = ref<HTMLDivElement>()
const resizeHandle = ref<HTMLDivElement>()

const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement
    type: 'primary' | 'secondary'
    text?: string
    transition?: string
    closeInside?: boolean
    alignToEnd?: boolean
    resizable?: boolean
  }>(),
  {
    placement: 'bottom',
    text: '',
    transition: '',
    closeInside: false,
    alignToEnd: false,
    type: 'primary',
    resizable: false
  }
)

const { contentClasses, contentStyles } = useDropdownClasses({
  placement: toRef(props, 'placement'),
  alignToEnd: toRef(props, 'alignToEnd'),
  visible,
  contentRef: content,
  type: toRef(props, 'type')
})

const isResizable = computed(() => {
  return maxHeight.value > minHeight.value
})

const slots = useSlots()

const contentWrapperStyle = computed(() => {
  const style: { [key: string]: string } = {}
  const resizeHandleHeight = props.resizable ? 24 : 0
  if (props.type === 'secondary') {
    style.maxHeight = `${modalHeight.value - resizeHandleHeight}px`
  } else {
    style.maxHeight = `${modalHeight.value - (props.resizable && isResizable.value ? resizeHandleHeight : 0)}px`
  }
  style.paddingBottom = props.resizable && isResizable.value ? `${resizeHandleHeight}px` : '0'
  return style
})

watch(
  () => props.text,
  () => {
    nextTick(() => {
      tryResetModalSize()
    })
  }
)

watch(
  () => slots.default?.(),
  () => {
    nextTick(() => {
      tryResetModalSize()
    })
  },
  { deep: true }
)

const onHide = () => {
  visible.value = false
  emit('toggle', false)
}

const onToggle = () => {
  if (visible.value) {
    onHide()
  } else {
    visible.value = true
    emit('toggle', true)
    nextTick(() => {
      resetModalSize()
    })
  }
}

const startResize = (e: MouseEvent) => {
  if (!props.resizable) return
  isResizing.value = true
  startY.value = e.clientY
  startHeight.value = modalHeight.value
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
  if (!isResizing.value || !props.resizable) return
  const diff = e.clientY - startY.value
  modalHeight.value = Math.max(minHeight.value, Math.min(maxHeight.value, startHeight.value + diff))
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

const resetModalSize = () => {
  if (contentWrapper.value) {
    let items: HTMLCollection

    if (
      contentWrapper.value.children.length === 1 &&
      contentWrapper.value.children[0].tagName.toLowerCase() === 'ul'
    ) {
      items = contentWrapper.value.children[0].children
    } else {
      items = contentWrapper.value.children
    }

    const itemCount = items.length

    if (itemCount === 0) {
      console.warn('No elements found to calculate dropdown height.')
      return
    }

    const resizeHandleHeight = props.resizable ? 24 : 0
    const padding = props.type === 'secondary' ? 24 : 0
    const maxVisibleItems = props.type === 'primary' ? 3 : 4

    let totalItemHeight = 0
    let visibleItemsHeight = 0
    for (let i = 0; i < itemCount; i++) {
      const item = items[i] as HTMLElement
      if (!(item instanceof HTMLElement)) {
        console.warn(`Element at index ${i} is not a valid HTMLElement.`)
        continue
      }
      const itemHeight = item.getBoundingClientRect().height
      totalItemHeight += itemHeight
      if (i < maxVisibleItems) {
        visibleItemsHeight += itemHeight
      }
    }

    const fullContentHeight = totalItemHeight + padding + resizeHandleHeight
    const initialContentHeight = visibleItemsHeight + padding + resizeHandleHeight

    minHeight.value = initialContentHeight
    maxHeight.value = fullContentHeight

    modalHeight.value = minHeight.value
    initialHeight.value = minHeight.value
  } else {
    console.warn('Dropdown container is not available.')
  }
}

const tryResetModalSize = () => {
  if (visible.value) {
    resetModalSize()
  }
}

onUnmounted(() => {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
})

watch(visible, (newValue) => {
  if (newValue) {
    nextTick(() => {
      resetModalSize()
    })
  } else {
    modalHeight.value = initialHeight.value
  }
})

const placementTransitionMap: Record<DropdownPlacement, string> = {
  bottom: 'to-bottom',
  left: 'to-left',
  right: 'to-right',
  top: 'to-top'
}

const transitionName = computed(() => {
  if (props.transition === null) return placementTransitionMap[props.placement]
  return props.transition
})

onClickOutside(wrapper, () => {
  if (!visible.value) return
  visible.value = false
  emit('toggle', false)
})
</script>

<style scoped>
.to-bottom-enter-active,
.to-bottom-leave-active,
.to-left-enter-active,
.to-left-leave-active,
.to-right-enter-active,
.to-right-leave-active,
.to-top-enter-active,
.to-top-leave-active {
  transition: all 250ms;
}

.to-top-enter-active,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.to-top-leave,
.to-top-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.to-right-enter-active,
.to-right-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.to-right-leave,
.to-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.to-bottom-enter-active,
.to-bottom-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.to-bottom-leave,
.to-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.to-left-enter-active,
.to-left-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.to-left-leave,
.to-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>

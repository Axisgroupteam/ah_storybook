import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  watch,
  type MaybeRef
} from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

export const useTableVirtualScroller = (allItems: MaybeRef<Record<string, any>[]>) => {
  const startIndex = ref(0)
  const step = ref(15)
  const elementHeight = ref(54)
  const firstRowHeight = ref(0)
  const lastRowHeight = ref(0)

  const items = computed(() => unref(allItems))

  const tbody = ref<Element | null>(null)
  const wrapper = ref<typeof PerfectScrollbar>()
  const thead = ref<Element | null>(null)

  const renderItems = computed(() => {
    return items.value.slice(startIndex.value, startIndex.value + step.value)
  })

  const handleHeigths = () => {
    firstRowHeight.value = startIndex.value * elementHeight.value
    const lrh =
      items.value.length * elementHeight.value -
      step.value * elementHeight.value -
      firstRowHeight.value
    lastRowHeight.value = lrh
  }

  const handleTable = () => {
    const wrapperTop = wrapper.value?.getElement()?.getBoundingClientRect().top
    const top = (tbody.value?.getBoundingClientRect().top ?? 0) - wrapperTop
    const viewportY = wrapper.value?.getElement()?.getBoundingClientRect().height ?? 0

    step.value = Math.floor(viewportY / elementHeight.value) + 5
    if (top < 0) {
      startIndex.value = Math.floor(-top / elementHeight.value)
    } else {
      startIndex.value = 0
    }
  }

  const initTable = () => {
    thead.value?.getBoundingClientRect().height ?? 0
    handleTable()
    handleHeigths()
  }

  const handleScroll = () => {
    nextTick(handleHeigths)
    handleTable()
  }

  onMounted(() => {
    initTable()
    nextTick(() => {
      wrapper.value?.getElement()?.addEventListener('scroll', handleScroll)
    })
  })

  onBeforeUnmount(() => {
    wrapper.value?.getElement()?.removeEventListener('scroll', handleScroll)
  })

  watch(
    items,
    () => {
      initTable()
    },
    { immediate: true, deep: true }
  )

  return {
    firstRowHeight,
    lastRowHeight,
    tbody,
    wrapper,
    thead,
    renderItems,
    handleScroll
  }
}

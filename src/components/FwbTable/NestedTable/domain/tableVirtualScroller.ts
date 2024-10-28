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

export const useTableVirtualScroller = (allItems: MaybeRef<Record<string, any>[]>) => {
  const startIndex = ref(0)
  const step = ref(30)
  const elementHeight = ref(54)
  const firstRowHeight = ref(0)
  const lastRowHeight = ref(0)

  const items = computed(() => unref(allItems))

  const tbody = ref<Element | null>(null)
  const wrapper = ref<HTMLDivElement>()
  const thead = ref<Element | null>(null)

  const renderItems = computed(() => {
    return items.value.slice(startIndex.value, startIndex.value + step.value)
  })

  const handleTable = () => {
    const top = tbody.value?.getBoundingClientRect().top ?? 0
    const viewportY = wrapper.value?.getBoundingClientRect().height ?? 0
    const theadH = thead.value?.getBoundingClientRect().height ?? 0
    const trs = tbody.value?.getElementsByTagName('tr')
    if (trs) {
      const heights = []
      for (let i = 0; i < trs.length; i++) {
        const tr = trs[i]
        if (i && i < trs.length - 2) {
          heights.push(tr.getBoundingClientRect().height)
        }
      }
      elementHeight.value = Math.max(...heights)
    }

    if (top < 0) {
      step.value = Math.floor((viewportY + theadH) / elementHeight.value)
      startIndex.value = Math.floor(-top / elementHeight.value)
    } else {
      startIndex.value = 0
      step.value = Math.floor((viewportY - top + theadH) / elementHeight.value)
    }
    if (step.value < 30) {
      step.value = 30
    }
  }

  const initTable = () => {
    thead.value?.getBoundingClientRect().height ?? 0
    handleTable()
    firstRowHeight.value = startIndex.value * elementHeight.value
    lastRowHeight.value =
      items.value.length * elementHeight.value - step.value * elementHeight.value
  }

  const handleHeigths = () => {
    firstRowHeight.value = startIndex.value * elementHeight.value

    const lrh =
      items.value.length * elementHeight.value -
      step.value * elementHeight.value -
      firstRowHeight.value
    lastRowHeight.value = lrh < 0 ? 0 : lrh
  }

  const handleScroll = () => {
    nextTick(handleHeigths)
    handleTable()
  }

  onMounted(() => {
    initTable()
    nextTick(() => {
      wrapper.value?.addEventListener('scroll', handleScroll)
    })
  })

  onBeforeUnmount(() => {
    wrapper.value?.removeEventListener('scroll', handleScroll)
  })

  watch(
    items,
    (newValue) => {
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

    //remove
    startIndex,
    step,
    elementHeight,
    items
  }
}

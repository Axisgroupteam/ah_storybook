import { useWebWorkerFn } from '@vueuse/core'
import { onBeforeUnmount } from 'vue'
import { computed, unref, type MaybeRef } from 'vue'

export const useHandleItemsSelected = (
  itemsAll: MaybeRef<Record<string, any>[]>,
  selectedItemsAll: MaybeRef<string[]>,
  key: MaybeRef<string>,
  emit: (arg: string[]) => void
) => {
  const items = computed(() => unref(itemsAll))
  const selectedItems = computed(() => unref(selectedItemsAll))
  const itemKey = computed(() => unref(key))
  const allItemsSelected = computed(() => {
    if (!items.value.length) return false
    let allSelected = true
    for (const item of items.value) {
      if (!selectedItems.value.includes(item[itemKey.value])) {
        allSelected = false
      }
    }
    return allSelected
  })

  const handleAllItems = (
    items: Record<string, any>[],
    selectedItems: string[],
    itemKey: string
  ) => {
    return items.map((item) => item[itemKey])
  }

  const { workerFn, workerTerminate } = useWebWorkerFn(handleAllItems)

  const handleAll = async () => {
    workerTerminate()
    const itms = (await workerFn(
      JSON.parse(JSON.stringify(items.value)),
      JSON.parse(JSON.stringify(selectedItems.value)),
      JSON.parse(JSON.stringify(itemKey.value))
    )) as string[]
    if (itms) emit(itms)
  }

  onBeforeUnmount(() => {
    workerTerminate()
  })

  return {
    allItemsSelected,
    handleAllItems: handleAll
  }
}

import { useWebWorkerFn } from '@vueuse/core'
import { JsxEmit } from 'typescript'
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
    itemKey: string,
    allItemsSelected: boolean
  ) => {
    const it = JSON.parse(JSON.stringify(items))
    const itemsKeys = it.map((v: Record<string, any>) => v[itemKey])
    if (allItemsSelected) {
      const newSelectedItems = selectedItems.filter(
        (v: string) => !itemsKeys.some((it: string) => it === v)
      )
      return [...newSelectedItems]
    }

    const someValueSelected = selectedItems.some((v: string) => itemsKeys.includes(v))
    if (someValueSelected) {
      const valuesToAdd = itemsKeys.filter((v: string) => !selectedItems.includes(v))
      return [...selectedItems, ...valuesToAdd]
    } else {
      alert
      return [...itemsKeys, ...selectedItems]
    }
  }

  const { workerFn } = useWebWorkerFn(handleAllItems)

  const handleAll = async () => {
    const itms = (await handleAllItems(
      JSON.parse(JSON.stringify(items.value)),
      JSON.parse(JSON.stringify(selectedItems.value)),
      JSON.parse(JSON.stringify(itemKey.value)),
      !!allItemsSelected.value
    )) as string[]
    if (itms) emit(itms)
  }

  return {
    allItemsSelected,
    handleAllItems: handleAll
  }
}

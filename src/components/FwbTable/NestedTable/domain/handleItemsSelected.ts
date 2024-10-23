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

  const handleAllItems = () => {
    const it = JSON.parse(JSON.stringify(items.value))
    const itemsKeys = it.map((v: Record<string, any>) => v[itemKey.value])
    if (allItemsSelected.value) {
      const newSelectedItems = selectedItems.value.filter(
        (v: string) => !itemsKeys.some((it: string) => it === v)
      )
      emit(newSelectedItems)
      return
    }

    const selected = JSON.parse(JSON.stringify(selectedItems.value))

    const someValueSelected = selected.some((v: string) => itemsKeys.includes(v))
    if (someValueSelected) {
      const valuesToAdd = itemsKeys.filter((v: string) => !selected.includes(v))
      emit([...selected, ...valuesToAdd])
    } else {
      emit(itemsKeys)
    }
  }
  return {
    allItemsSelected,
    handleAllItems
  }
}

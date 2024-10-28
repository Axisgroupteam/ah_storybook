import { useWebWorkerFn } from '@vueuse/core'
import { computed, reactive, ref, unref, watch, type MaybeRef } from 'vue'

export const useHandleGrouped = (groups: MaybeRef<Record<string, any> | undefined>) => {
  const allItems = reactive<Record<string, any>[]>([])

  const handleDisplayGroups = (groups: Record<string, any>) => {
    const items: Record<string, any>[] = []
    const entries = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
    for (let index = 0; index < entries.length; index++) {
      const [key, value] = entries[index]
      items.push({
        tableGroupKey: key,
        isTableGroup: true,
        items: value
      })
      for (let index = 0; index < value.length; index++) {
        const element = value[index]
        items.push({
          ...element,
          tableGroupKey: key,
          isTableGroup: false,
          displayBorder: index !== value.length - 1
        })
      }
    }
    return items
  }

  const { workerFn } = useWebWorkerFn(handleDisplayGroups)

  const handleData = async (groups?: Record<string, any>) => {
    if (groups) {
      const resp = await workerFn(JSON.parse(JSON.stringify(groups)))
      allItems.length = 0
      Object.assign(allItems, resp)
    }
  }

  watch(
    computed(() => unref(groups)),
    (newValue) => {
      handleData(newValue)
    },
    { immediate: true, deep: true }
  )

  return { allItems }
}

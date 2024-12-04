<template>
  <div class="w-full h-full">
    <OverlayScrollbarsComponent
      ref="wrapper"
      class="max-h-[calc(100%-8.75rem)] min-h-[calc(100%-8.75rem)] md:max-h-[calc(100%-4.75rem)] md:min-h-[calc(100%-4.75rem)] w-full h-[calc(100%-4.75rem)] overflow-auto flex flex-col"
      :options="{
        scrollbars: {
          theme: 'os-theme-dark',
          autoHide: 'leave',
          dragScroll: true
        },
        overflow: {
          x: 'scroll',
          y: 'scroll'
        }
      }"
      :events="{
        scroll: handleScroll
      }"
      defer
    >
      <table
        class="w-full text-xs max-w-full overflow-clip"
        :class="[
          isLoading || !items.length ? 'h-full' : 'h-min',
          itemsWidths.length ? 'table-fixed' : 'table-auto'
        ]"
      >
        <colgroup v-if="trWidths.length">
          <col
            v-for="(i, index) in trWidths"
            :key="i + index"
            :style="{
              width: i ? i + '%' : undefined,
              minWidth: trWidthsMin[index] ? trWidthsMin[index] + 'px' : undefined
            }"
          />
        </colgroup>
        <TableHeader
          ref="tableHeader"
          :refference="thead"
          :model-value="tableFields"
          :grouped="grouped"
          :selectable="selectable"
          :all-items-selected="allItemsSelected"
          :item-key="itemKey"
          :items="items"
          :selected-items="selectedItems"
          :draggable="draggable"
          :alt-loading="isAltLoading"
          @update:selected-items="handleSelectedItems"
          @update:model-value="handleUpdateModelValue"
        />
        <tbody v-if="isLoading || !items.length" class="h-full">
          <tr class="h-full">
            <td class="h-full" colspan="100%">
              <div class="h-full flex justify-center items-center">
                <FwbSpinner v-if="isLoading" class="w-8 h-8" />
                <div
                  v-else-if="!items.length"
                  class="flex justify-center items-center flex-col gap-4 h-full grow"
                >
                  <svg
                    class="w-9 h-9 text-neutral-300 dark:text-neutral-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm16 7H4v7h16v-7ZM5 8a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Zm4-1a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H9Zm2 1a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-neutral-300 dark:text-neutral-600">No result found</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else ref="tbody" class="divide-y divide-neutral-200 dark:divide-neutral-700">
          <tr class="firstRow" :style="{ height: `${firstRowHeight}px` }">
            <td class="bg-neutral-100 dark:bg-neutral-700" colspan="100%"></td>
          </tr>
          <template v-for="item in renderItems" :key="JSON.stringify(item)">
            <TableBodyGroup
              v-if="item.isTableGroup"
              :group-key="item.tableGroupKey"
              :items="item.items"
              :displayed-group="displayedGroup"
              :toggle-group="toggleGroup"
              :toal-grouped-text="toalGroupedText"
              :model-value="tableFields"
              :selected-items="selectedItems"
              :item-key="itemKey"
              :selectable="selectable"
              @update:selected-items="handleSelectedItems"
            >
              <template #groupText="{ group }: { group: string }">
                <slot name="groupHandler" :group="group" />
              </template>
              <template #groupHeaderTrailing="{ group }: { group: string }">
                <slot name="groupHeaderTrailing" :group="group" />
              </template>
            </TableBodyGroup>
            <tr v-if="grouped && displayedGroup[item.isTableGroup]">
              <td
                :colspan="selectable ? tableFields.length + 1 : tableFields.length"
                class="p-2"
              ></td>
            </tr>
            <TableBodyItem
              v-if="!item.isTableGroup"
              ref="tableBodyItems"
              :item="item"
              :index="getItemRealIndex(item)"
              :selectable="selectable"
              :hoverable="hoverable"
              :grouped="grouped"
              :model-value="tableFields"
              :group-key="item.tableGroupKey"
              :displayed-group="displayedGroup"
              :selected-items="selectedItems"
              :item-key="itemKey"
              :display-border="item?.displayBorder"
              :sortable="sortable"
              :slots="$slots"
              :dragging-other-group-key="
                draggingGropuKey !== item.tableGroupKey && sortable && !!draggingGropuKey
              "
              :handle-tr-bg-color="handleTrBgColor"
              :has-all-clickable="hasAllClickable"
              @update:selected-items="handleSelectedItems"
              @row-click="$emit('rowClick', $event, getItemRealIndex(item))"
              @drag-start="(e) => handleDragStart(e, item.tableGroupKey)"
              @drop="(e) => handleDrop(e)"
            />
            <tr v-if="grouped && displayedGroup[item.isTableGroup]">
              <td
                :colspan="selectable ? tableFields.length + 1 : tableFields.length"
                class="p-2"
              ></td>
            </tr>
          </template>
          <tr class="lastRow" :style="{ height: `${lastRowHeight}px` }">
            <td colspan="100%"></td>
          </tr>
        </tbody>
      </table>
    </OverlayScrollbarsComponent>
    <div
      class="w-full p-4 border-t dark:border-t-neutral-700 border-neutral-200 sticky bottom-0 bg-white dark:bg-neutral-800 mt-auto"
    >
      <FwbPagination
        :model-value="currentPage"
        layout="navigation"
        :per-page="perPage"
        :total-items="totalItems"
        large
        @per-page-changed="$emit('perPageChanged', $event)"
        @update:model-value="$emit('pageChanged', $event)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  reactive,
  ref,
  unref,
  watch,
  type PropType
} from 'vue'
import type { TableFields } from './data/tableData'
import TableBodyItem from './components/TableBodyItem.vue'
import './styles/table_styles.css'
import TableBodyGroup from './components/TableBodyGroup.vue'
import { useHandleItemsSelected } from './domain/handleItemsSelected'
import TableHeader from './components/TableHeader.vue'
import { useWebWorkerFn, useWindowSize } from '@vueuse/core'
import { useTableVirtualScroller } from './domain/tableVirtualScroller'
import FwbPagination from '../../FwbPagination/FwbPagination.vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import FwbSpinner from '../../FwbSpinner/FwbSpinner.vue'

const useHandleGroups = (
  items: Record<string, any>[],
  grouped: boolean,
  key?: string,
  displayedGroup?: Record<string, boolean>
) => {
  const groups: Record<string, Record<string, any>[]> = {}
  if (grouped) {
    items.forEach((item) => {
      const groupKey =
        (key ?? '')
          ?.split('.')
          .reduce((o, i) => {
            if (o[i]) {
              return o[i]
            } else {
              return 'Unknown'
            }
          }, item)
          ?.toString() ?? ''

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
    })
  } else {
    groups[''] = []
    items.forEach((item) => {
      groups[''].push(item)
    })
  }

  const itemsNew: Record<string, any>[] = []
  const entries = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  for (let index = 0; index < entries.length; index++) {
    const [key, value] = entries[index]
    itemsNew.push({
      tableGroupKey: key,
      isTableGroup: true,
      items: value
    })
    if (!displayedGroup || displayedGroup[key]) {
      for (let index = 0; index < value.length; index++) {
        const element = value[index]
        itemsNew.push({
          ...element,
          tableGroupKey: key,
          isTableGroup: false,
          displayBorder: index !== value.length - 1
        })
      }
    }
  }
  return { groups, itemsNew }
}

const displayedGroup = reactive<Record<string, boolean>>({})

const toggleGroup = (key: string) => {
  displayedGroup[key] = !displayedGroup[key]
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<TableFields[]>,
    required: true,
    default: () => []
  },
  grouped: { type: Boolean },
  selectable: { type: Boolean },
  draggable: { type: Boolean },
  items: { type: Array as PropType<Record<string, any>[]>, default: () => [] },
  itemKey: {
    type: String,
    default: '_id'
  },
  hoverable: { type: Boolean },
  groupByKey: { type: String, default: '' },
  handleGroupByKey: {
    type: Function as PropType<(arg: Record<string, any>) => string>,
    default: undefined
  },
  toalGroupedText: { type: String, default: 'Items' },
  selectedItems: { type: Array as PropType<string[]>, default: () => [] },
  sortable: { type: Boolean },
  altLoading: { type: Boolean },
  isLoading: { type: Boolean },
  currentPage: { type: Number, default: 1 },
  perPage: { type: Number, default: 10 },
  totalItems: { type: Number, default: 1 },
  handleTrBgColor: {
    type: Function as PropType<(arg: any) => { main: string; hover: string } | undefined>,
    default: undefined
  },
  hasAllClickable: {
    type: Boolean
  }
})

const { workerFn, workerTerminate } = useWebWorkerFn(useHandleGroups)
const groups = reactive<Record<string, any>>({})
const allItems = reactive<Record<string, any>[]>([])

const clearGroups = () => {
  Object.keys(groups).forEach((key) => {
    delete groups[key]
  })
}

const loadingHandlingData = ref(false)

watch(
  [
    computed(() => unref(props.items)),
    computed(() => unref(props.grouped)),
    computed(() => unref(props.groupByKey)),
    displayedGroup
  ],
  async ([items, grouped, groupByKey]) => {
    workerTerminate()
    loadingHandlingData.value = true
    const resp = await workerFn(
      JSON.parse(JSON.stringify(items)),
      grouped,
      groupByKey,
      JSON.parse(JSON.stringify(displayedGroup))
    )
    clearGroups()
    Object.assign(groups, resp['groups'])
    allItems.length = 0
    Object.assign(allItems, resp['itemsNew'])
    loadingHandlingData.value = false
  },
  { immediate: true, deep: true }
)

watch(
  computed(() => unref(groups)),
  (newValue) => {
    Object.keys(newValue).forEach((key) => {
      if (displayedGroup[key] === undefined) {
        displayedGroup[key] = true
      }
    })
  },
  { immediate: true, deep: true }
)

const emit = defineEmits<{
  'update:selectedItems': [items: string[]]
  rowClick: [event: any, index: number]
  'update:modelValue': [value: any]
  'update:items': [
    items: Record<string, any>[],
    draggedItem?: Record<string, any>,
    targetItem?: Record<string, any>
  ]
  perPageChanged: [value: number]
  pageChanged: [value: number]
  dropInRow: [item: Record<string, any>]
}>()

const selectedItemsState = ref<string[]>([])

const handleSelectedItems = (items: string[]) => {
  if (items.length === props.items.length && selectedItemsState.value.length !== items.length) {
    selectedItemsState.value = items
  } else if (
    items.length === props.items.length &&
    selectedItemsState.value.length === items.length
  ) {
    selectedItemsState.value.length = 0
  } else if (items.length === 1 && selectedItemsState.value.includes(items[0])) {
    selectedItemsState.value = selectedItemsState.value.filter((v) => v !== items[0])
  } else if (selectedItemsState.value.some((v) => items.includes(v))) {
    const unSelected = items.filter((item) => !selectedItemsState.value.includes(item))
    if (unSelected.length === items.length) {
      selectedItemsState.value = [...selectedItemsState.value, ...items]
    } else if (unSelected.length && unSelected.length < items.length) {
      selectedItemsState.value = [
        ...selectedItemsState.value.filter((item) => !items.includes(item)),
        ...items
      ]
    } else if (!unSelected.length) {
      selectedItemsState.value = [
        ...selectedItemsState.value.filter((item) => !items.includes(item))
      ]
    }
  } else {
    selectedItemsState.value = [...selectedItemsState.value, ...items]
  }

  emit('update:selectedItems', selectedItemsState.value)
}

const { allItemsSelected } = useHandleItemsSelected(
  computed(() => props.items),
  computed(() => props.selectedItems),
  computed(() => props.itemKey),
  handleSelectedItems
)

const draggingItem = ref<Record<string, any>>()
const draggingGropuKey = ref<string>()

const handleDragStart = (item: Record<string, any>, key: string) => {
  draggingItem.value = item
  draggingGropuKey.value = key
}

const handleDrop = (item: Record<string, any>) => {
  let targetidx = -1
  let refIdx = -1
  for (let i = 0; i < props.items.length; i++) {
    if (props.items[i][props.itemKey] === item[props.itemKey]) {
      targetidx = i
    } else if (props.items[i][props.itemKey] === draggingItem.value?.[props.itemKey]) {
      refIdx = i
    }
  }

  const newItems = JSON.parse(JSON.stringify(props.items))
  const target = props.items[targetidx]
  const reference = props.items[refIdx]
  newItems[targetidx] = reference
  newItems[refIdx] = target

  emit('update:items', newItems, draggingItem.value, item)

  draggingItem.value = undefined
  draggingGropuKey.value = undefined
  emit('dropInRow', item)
}

const { firstRowHeight, lastRowHeight, tbody, wrapper, thead, renderItems, handleScroll } =
  useTableVirtualScroller(allItems)

const isAltLoading = computed(() => props.altLoading || loadingHandlingData.value)

watch(
  computed(() => props.currentPage),
  () => {
    wrapper.value?.getElement()?.scrollTo(0, 0)
  }
)

onBeforeUnmount(() => {
  workerTerminate()
})

const tableFields = computed(() =>
  props.modelValue.filter(({ name, value }) => !(name === 'Select' && !value))
)

const handleUpdateModelValue = (value: any) => {
  const hasSelect = props.modelValue.some((item) => item.name === 'Select' && !item.value)
  if (hasSelect) {
    emit('update:modelValue', [props.modelValue[0], ...value])
  } else {
    emit('update:modelValue', value)
  }
}

const itemsByKey = computed(() => {
  return props.items.map((v) => v[props.itemKey])
})

watch(
  [
    computed(() => props.selectable),
    computed(() => props.perPage),
    computed(() => props.currentPage),
    itemsByKey,
    computed(() => props.selectable)
  ],
  (act, prev) => {
    if (
      (act[0] && act[1] && act[2] && JSON.stringify(act[3]) !== JSON.stringify(prev[3])) ||
      !act[4]
    ) {
      wrapper.value?.getElement()?.scrollTo(0, 0)
      selectedItemsState.value.splice(0, selectedItemsState.value.length)
      emit('update:selectedItems', selectedItemsState.value)
    }
  },
  { deep: true }
)

const tableHeader = ref<InstanceType<typeof TableHeader>>()

const getItemRealIndex = (item: any) => {
  if (!item || !props.items) return -1
  return props.items.findIndex((i) => i[props.itemKey] === item[props.itemKey])
}

const trWidths = ref<number[]>([])
const trWidthsMin = ref<number[]>([])
const itemsWidths = computed(() => unref(trWidths) ?? [])

const { width } = useWindowSize()
const tableBodyItems = ref<InstanceType<typeof TableBodyItem>>()

const handleWidths = (trRef: HTMLElement) => {
  const th = trRef.getElementsByTagName('th')
  const width = trRef.clientWidth
  const trWidthsArr: number[] = []
  const trWidthsMinArr: number[] = []
  for (let index = 0; index < th.length; index++) {
    const element = th[index]
    trWidthsArr.push((element.clientWidth / width) * 100)
    trWidthsMinArr.push(element.children[0].clientWidth + 32)
  }
  return {
    trWidthsArr,
    trWidthsMinArr
  }
}

watch(
  [
    computed(() => tableHeader.value?.trRef),
    computed(() => props.items),
    computed(() => props.modelValue),
    computed(() => props.selectable),
    width
  ],
  ([v, items, modelValue, _, width]) => {
    trWidths.value.length = 0
    trWidthsMin.value.length = 0
    nextTick(() => {
      const mustUpdate = v && items.length && modelValue.length && width > 1366
      if (mustUpdate) {
        trWidths.value.length = 0
        trWidthsMin.value.length = 0
        const { trWidthsArr, trWidthsMinArr } = handleWidths(v)
        trWidths.value.push(...trWidthsArr)
        trWidthsMin.value.push(...trWidthsMinArr)
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
onBeforeUnmount(() => {
  selectedItemsState.value.splice(0, selectedItemsState.value.length)
  emit('update:selectedItems', selectedItemsState.value)
})
</script>

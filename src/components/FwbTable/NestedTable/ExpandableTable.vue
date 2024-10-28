<template>
  <div class="max-h-64 overflow-clip w-full h-full overflow-y-auto">
    <PerfectScrollbar>
      <table class="w-full text-sm max-w-full overflow-clip inline-table">
        <TableHeader
          :model-value="modelValue"
          :grouped="grouped"
          :selectable="selectable"
          :all-items-selected="allItemsSelected"
          :item-key="itemKey"
          :items="items"
          :selected-items="selectedItems"
          :draggable="draggable"
          :alt-loading="altLoading"
          @update:selectedItems="handleSelectedItems"
          @update:modelValue="$emit('update:modelValue', $event)"
        />
        <tbody
          :class="{
            'divide-y divide-neutral-200 dark:divide-neutral-700': !grouped
          }"
        >
          <template v-for="item in allItems" :key="JSON.stringify(item)">
            <TableBodyGroup
              v-if="item.isTableGroup"
              v-memo="[item.tableGroupKey, displayedGroup, toalGroupedText, modelValue, item]"
              :group-key="item.tableGroupKey"
              :items="item.items"
              :displayed-group="displayedGroup"
              :toggle-group="toggleGroup"
              :toal-grouped-text="toalGroupedText"
              :model-value="modelValue"
              :selected-items="selectedItems"
              :item-key="itemKey"
              :selectable="selectable"
              @update:selectedItems="handleSelectedItems"
            />
            <tr v-if="grouped && displayedGroup[item.isTableGroup]">
              <td
                :colspan="selectable ? modelValue.length + 1 : modelValue.length"
                class="p-2"
              ></td>
            </tr>
            <TableBodyItem
              v-if="!item.isTableGroup"
              v-memo="[
                item,
                selectable,
                hoverable,
                grouped,
                modelValue,
                item,
                displayedGroup[item.isTableGroup]
              ]"
              :item="item"
              :selectable="selectable"
              :hoverable="hoverable"
              :grouped="grouped"
              :model-value="modelValue"
              :group-key="item.tableGroupKey"
              :displayed-group="displayedGroup"
              :selected-items="selectedItems"
              :item-key="itemKey"
              :display-border="item?.displayBorder"
              :sortable="sortable"
              :dragging-other-group-key="
                draggingGropuKey !== item.tableGroupKey && sortable && !!draggingGropuKey
              "
              @update:selectedItems="handleSelectedItems"
              @row-click="$emit('rowClick', $event)"
              @drag-start="(e) => handleDragStart(e, item.tableGroupKey)"
              @drop="(e) => handleDrop(e)"
            />
            <tr v-if="grouped && displayedGroup[item.isTableGroup]">
              <td
                :colspan="selectable ? modelValue.length + 1 : modelValue.length"
                class="p-2"
              ></td>
            </tr>
          </template>
        </tbody>
      </table>
    </PerfectScrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, unref, watch, type PropType } from 'vue'
import type { TableFields } from './data/tableData'
import TableBodyItem from './components/TableBodyItem.vue'
import './styles/table_styles.css'
import TableBodyGroup from './components/TableBodyGroup.vue'
import { useHandleItemsSelected } from './domain/handleItemsSelected'
import TableHeader from './components/TableHeader.vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useWebWorkerFn } from '@vueuse/core'
import { useHandleGrouped } from './domain/handleGrouped'

const useHandleGroups = (items: Record<string, any>[], grouped: boolean, key?: string) => {
  const groups: Record<string, Record<string, any>[]> = {}
  if (grouped) {
    items.forEach((item) => {
      const groupKey =
        (key ?? '')
          ?.split('.')
          .reduce((o, i) => o[i], item)
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
  return groups
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<TableFields[]>,
    required: true,
    default: () => []
  },
  grouped: { type: Boolean, default: true },
  selectable: { type: Boolean, default: true },
  draggable: { type: Boolean, default: true },
  items: { type: Array as PropType<Record<string, any>[]>, default: () => [] },
  itemKey: {
    type: String,
    default: '_id'
  },
  hoverable: { type: Boolean, default: true },
  groupByKey: { type: String, default: 'vehicle' },
  handleGroupByKey: {
    type: Function as PropType<(arg: Record<string, any>) => string>,
    default: undefined
  },
  toalGroupedText: { type: String, default: 'Items' },
  selectedItems: { type: Array as PropType<string[]>, default: [] },
  sortable: { type: Boolean, default: false },
  altLoading: { type: Boolean, default: false }
})

const { workerFn } = useWebWorkerFn(useHandleGroups)
const groups = reactive<Record<string, any>>({})

const clearGroups = () => {
  Object.keys(groups).forEach((key) => {
    delete groups[key]
  })
}

watch(
  [
    computed(() => unref(props.items)),
    computed(() => unref(props.grouped)),
    computed(() => unref(props.groupByKey))
  ],
  async ([items, grouped, groupByKey]) => {
    const resp = await workerFn(JSON.parse(JSON.stringify(items)), grouped, groupByKey)
    clearGroups()
    Object.assign(groups, resp)
  },
  { immediate: true, deep: true }
)

const displayedGroup = reactive<Record<string, boolean>>({})

const toggleGroup = (key: string) => {
  displayedGroup[key] = !displayedGroup[key]
}

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

const emit = defineEmits(['update:selectedItems', 'rowClick', 'update:modelValue', 'update:items'])

const handleSelectedItems = (items: string[]) => {
  emit('update:selectedItems', items)
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
  emit('update:items', newItems)
  draggingItem.value = undefined
  draggingGropuKey.value = undefined
}

const { allItems } = useHandleGrouped(groups)
</script>

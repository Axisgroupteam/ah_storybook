<template>
  <PerfectScrollbar class="w-full h-full max-h-dvh text-sm">
    <table class="w-full h-full max-h-full text-sm max-w-full overflow-clip inline-table">
      <TableHeader
        :model-value="modelValue"
        :grouped="grouped"
        :selectable="selectable"
        :all-items-selected="allItemsSelected"
        :item-key="itemKey"
        :items="items"
        :selected-items="selectedItems"
        :draggable="draggable"
        @update:selectedItems="handleSelectedItems"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
      <tbody
        :class="{
          'divide-y divide-neutral-200 dark:divide-neutral-700': !grouped
        }"
      >
        <!-- <tr>
        <td class="relative h-1 bg-red-500 animate-pulse" :colspan="modelValue.length + 1"></td>
      </tr> -->
        <template
          v-for="[groupKey, items] in Object.entries(groups).sort((a, b) =>
            a[0].localeCompare(b[0])
          )"
          :key="groupKey"
        >
          <TableBodyGroup
            v-memo="[items, displayedGroup, toalGroupedText, modelValue]"
            :group-key="groupKey"
            :items="items"
            :displayed-group="displayedGroup"
            :toggle-group="toggleGroup"
            :toal-grouped-text="toalGroupedText"
            :model-value="modelValue"
            :selected-items="selectedItems"
            :item-key="itemKey"
            :selectable="selectable"
            @update:selectedItems="handleSelectedItems"
          />
          <tr v-if="grouped && displayedGroup[groupKey]">
            <td :colspan="selectable ? modelValue.length + 1 : modelValue.length" class="p-2"></td>
          </tr>
          <template v-for="(item, i) in items" :key="item[groupKey]">
            <TableBodyItem
              v-memo="[item, displayedGroup, toalGroupedText, modelValue]"
              :item="item"
              :selectable="selectable"
              :hoverable="hoverable"
              :grouped="grouped"
              :model-value="modelValue"
              :group-key="groupKey"
              :displayed-group="displayedGroup"
              :selected-items="selectedItems"
              :item-key="itemKey"
              :display-border="i <= (items?.length ?? 1) - 2"
              @update:selectedItems="handleSelectedItems"
              @row-click="$emit('rowClick', $event)"
            />
          </template>
          <tr v-if="grouped && displayedGroup[groupKey]">
            <td :colspan="selectable ? modelValue.length + 1 : modelValue.length" class="p-2"></td>
          </tr>
        </template>
      </tbody>
    </table>
  </PerfectScrollbar>
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
  groupByKey: { type: String, default: '' },
  handleGroupByKey: {
    type: Function as PropType<(arg: Record<string, any>) => string>,
    default: (v: Record<string, any>) => v['vehicle']
  },
  toalGroupedText: { type: String, default: 'Items' },
  selectedItems: { type: Array as PropType<string[]>, default: [] }
})

const groups = computed(() => {
  const groups: Record<string, Record<string, any>[]> = {}
  if (props.grouped) {
    props.items.forEach((item) => {
      const groupKey = props.handleGroupByKey ? props.handleGroupByKey(item) : ''
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
    })
  } else {
    groups[''] = []
    props.items.forEach((item) => {
      groups[''].push(item)
    })
  }
  return groups
})

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

const emit = defineEmits(['update:selectedItems', 'rowClick', 'update:modelValue'])

const handleSelectedItems = (items: string[]) => {
  emit('update:selectedItems', items)
}

const { allItemsSelected, handleAllItems } = useHandleItemsSelected(
  computed(() => props.items),
  computed(() => props.selectedItems),
  computed(() => props.itemKey),
  handleSelectedItems
)
</script>

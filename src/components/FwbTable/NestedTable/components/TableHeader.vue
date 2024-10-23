<template>
  <thead class="sticky top-0 z-10">
    <tr>
      <td
        v-if="selectable"
        class="table-header max-w-24"
        :class="{
          'pr-8': grouped
        }"
      >
        <FwbCheckbox :modelValue="allItemsSelected" @update:modelValue="handleAllItems" />
      </td>
      <td
        class="table-header relative"
        v-for="(field, i) in modelValue"
        v-memo="[field.name, field.visible, i]"
        :key="field.name"
        @dragstart="handleDragStart(field)"
        @dragover="handleDragOver"
        @dragleave="() => {}"
        @drop="handleDrop(field)"
        :draggable="draggable"
      >
        <div class="flex items-center justify-between select-none">
          <span>{{ field.name }}</span>
        </div>
      </td>
    </tr>
  </thead>
</template>
<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import type { TableFields } from '../data/tableData'
import FwbCheckbox from '@/components/FwbCheckbox/FwbCheckbox.vue'
import { useHandleItemsSelected } from '../domain/handleItemsSelected'

const props = defineProps({
  modelValue: { type: Array as PropType<TableFields[]>, required: true },
  grouped: { type: Boolean, default: true },
  selectable: { type: Boolean, default: true },
  allItemsSelected: { type: Boolean, default: true },
  draggable: { type: Boolean, default: false },
  handleAllItems: { type: Function as PropType<(...args: any[]) => any>, default: () => {} },
  itemKey: { type: String, required: true },
  items: { type: Array as PropType<Record<string, any>[]>, required: true },
  selectedItems: { type: Array as PropType<string[]>, default: [] }
})

const emit = defineEmits(['update:selectedItems', 'update:modelValue'])
const handleSelectedItems = (items: string[]) => {
  emit('update:selectedItems', items)
}
const { allItemsSelected, handleAllItems } = useHandleItemsSelected(
  computed(() => props.items),
  computed(() => props.selectedItems),
  computed(() => props.itemKey),
  handleSelectedItems
)

const draggingItem = ref<TableFields>()

const handleDragStart = (field: TableFields) => {
  draggingItem.value = field
}

const handleDrop = (field: TableFields) => {
  let targetidx = -1
  let refIdx = -1
  for (let i = 0; i < props.modelValue.length; i++) {
    if (props.modelValue[i].name === field.name) {
      targetidx = i
    } else if (props.modelValue[i].name === draggingItem.value?.name) {
      refIdx = i
    }
  }

  const newModelValue = JSON.parse(JSON.stringify(props.modelValue))
  const target = props.modelValue[targetidx]
  const reference = props.modelValue[refIdx]
  newModelValue[targetidx] = reference
  newModelValue[refIdx] = target
  emit('update:modelValue', newModelValue)
  draggingItem.value = undefined
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}
</script>

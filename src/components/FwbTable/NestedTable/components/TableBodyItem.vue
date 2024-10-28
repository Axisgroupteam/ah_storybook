<template>
  <tr
    v-if="displayedGroup[groupKey]"
    class="group"
    :class="{
      'opacity-75': draggingOtherGroupKey && sortable
    }"
    :draggable="sortable"
    @dragstart="$emit('dragStart', item)"
    @dragover="
      (e) => {
        e.preventDefault()
      }
    "
    @dragleave="() => {}"
    @drop="$emit('drop', item)"
  >
    <td
      v-if="selectable"
      class="table-body-td max-w-8"
      :class="{
        'px-8': grouped,
        'hoverable-row': hoverable
      }"
    >
      <div
        :class="{
          'pl-4': grouped
        }"
        class="w-min"
      >
        <FwbCheckbox :model-value="checkedItem" @update:modelValue="handleCheckbox" />
      </div>
    </td>
    <td
      v-for="(field, i) in modelValue"
      :key="field.value + field.name + field.visible + i"
      class="table-body-td max-w-24"
      :class="{
        'hoverable-row': hoverable
      }"
      @click="emit('rowClick', item[itemKey])"
    >
      <slot :name="field.value" :item="item">
        <p class="max-w-full truncate">{{ handleObj(item, field.value) }}</p>
      </slot>
    </td>
  </tr>
  <tr v-if="displayedGroup[groupKey] && grouped && displayBorder">
    <td class="relative h-0" :colspan="modelValue.length + 1">
      <div
        class="absolute left-4 right-4 flex items-center justify-center border-b border-neutral-200 dark:border-neutral-700"
      ></div>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { TableFields } from '../data/tableData'
import { handleObj } from '../domain/handleObj'
import '../styles/table_styles.css'
import FwbCheckbox from '@/components/FwbCheckbox/FwbCheckbox.vue'

const props = defineProps({
  item: { type: Object as PropType<Record<string, any>>, required: true },
  itemKey: { type: String, required: true },
  selectable: { type: Boolean, default: true },
  hoverable: { type: Boolean, default: true },
  grouped: { type: Boolean, default: true },
  displayBorder: { type: Boolean, default: true },
  modelValue: { type: Array as PropType<TableFields[]>, required: true },
  groupKey: { type: String, required: true },
  displayedGroup: { type: Object as PropType<Record<string, boolean>>, required: true },
  selectedItems: { type: Array as PropType<String[]>, default: [] },
  draggingOtherGroupKey: { type: Boolean },
  sortable: { type: Boolean, default: false }
})

const emit = defineEmits(['update:selectedItems', 'rowClick', 'dragStart', 'drop'])

const checkedItem = computed(() => props.selectedItems.includes(props.item[props.itemKey]))

const handleCheckbox = () => {
  let items = JSON.parse(JSON.stringify(props.selectedItems))

  if (checkedItem.value) {
    items = items.filter((v: string) => v !== props.item[props.itemKey])
  } else {
    items.push(props.item[props.itemKey])
  }

  emit('update:selectedItems', items)
}
</script>

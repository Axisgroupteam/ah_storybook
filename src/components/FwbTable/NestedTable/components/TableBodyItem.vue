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
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <td
      v-if="selectable"
      class="table-body-td max-w-8"
      :class="{
        'hoverable-row': hoverable
      }"
      :style="{
        backgroundColor: hovering ? trBgColor?.hover : trBgColor?.main
      }"
    >
      <div class="w-min">
        <FwbCheckbox :model-value="checkedItem" @update:model-value="handleCheckbox" />
      </div>
    </td>
    <template v-for="(field, i) in modelValue" :key="field.value + field.name + field.visible + i">
      <td
        v-if="field.visible"
        class="table-body-td h-[54px] overflow-clip"
        :class="{
          'hoverable-row': hoverable
        }"
        :style="{
          backgroundColor: hovering ? trBgColor?.hover : trBgColor?.main
        }"
        @click.self="!hasAllClickable ? emit('rowClick', item[itemKey]) : {}"
        @click="
          () => {
            if (hasAllClickable) {
              emit('rowClick', item[itemKey], index)
            }
          }
        "
      >
        <component :is="slots[field.value]" v-if="slots[field.value]" :item="item" :index="index" />
        <p
          v-else
          class="max-w-full truncate"
          :title="handleObj(item, field.value)?.toString()"
          @click.self="emit('rowClick', item[itemKey])"
        >
          {{ handleObj(item, field.value) }}
        </p>
      </td>
    </template>
  </tr>
</template>
<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
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
  displayedGroup: {
    type: Object as PropType<Record<string, boolean>>,
    required: true
  },
  selectedItems: { type: Array as PropType<string[]>, default: () => [] },
  draggingOtherGroupKey: { type: Boolean },
  sortable: { type: Boolean, default: false },
  slots: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  handleTrBgColor: {
    type: Function as PropType<(arg: any) => { main: string; hover: string } | undefined>,
    default: undefined
  },
  index: { type: Number, default: 0 },
  hasAllClickable: {
    type: Boolean
  }
})

const emit = defineEmits(['update:selectedItems', 'rowClick', 'dragStart', 'drop'])

const checkedItem = computed(() => props.selectedItems.includes(props.item[props.itemKey]))

const handleCheckbox = () => {
  emit('update:selectedItems', [props.item[props.itemKey]])
}

const trBgColor = computed(() => {
  if (props.handleTrBgColor) {
    return props.handleTrBgColor(props.item)
  }
  return undefined
})

const hovering = ref(false)

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}
</script>

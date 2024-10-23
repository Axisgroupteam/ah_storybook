<template>
  <tr
    v-if="groupKey"
    class="group cursor-pointer border-y border-neutral-200 dark:border-neutral-700"
  >
    <td
      v-if="selectable"
      class="table-body-td w-5"
      :class="{
        'pr-8': grouped,
        'hoverable-row': hoverable
      }"
    >
      <FwbCheckbox :modelValue="allItemsSelected" @update:modelValue="handleAllItems" />
    </td>

    <td
      :colspan="modelValue.length"
      class="table-body-td"
      :class="{
        'hoverable-row': hoverable
      }"
      @click="toggleGroup(groupKey)"
    >
      <section class="flex items-center gap-4 w-full h-full">
        <div
          class="transition-transform duration-200"
          :class="[!displayedGroup[groupKey] ? '-scale-y-100' : 'scale-y-100']"
        >
          <IconWrapper name="chevron-down" size="12" />
        </div>
        <slot name="groupText" :key="groupKey" v-memo="[$slots.groupText ?? groupKey]">
          <p>{{ groupKey }}</p>
        </slot>
        <div class="flex-1"></div>
        <p>Group: {{ items.length }} {{ toalGroupedText }}</p>
      </section>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { TableFields } from '../data/tableData'
import FwbCheckbox from '@/components/FwbCheckbox/FwbCheckbox.vue'
import IconWrapper from '@/components/IconWrapper.vue'
import { useHandleItemsSelected } from '../domain/handleItemsSelected'

const props = defineProps({
  groupKey: { type: String, required: true },
  itemKey: { type: String, required: true },
  items: { type: Array as PropType<Record<string, any>[]>, required: true },
  displayedGroup: { type: Object as PropType<Record<string, boolean>>, required: true },
  toggleGroup: { type: Function as PropType<(key: string) => void>, required: true },
  toalGroupedText: { type: String, default: 'Items' },
  modelValue: { type: Array as PropType<TableFields[]>, required: true },
  hoverable: { type: Boolean, default: true },
  grouped: { type: Boolean },
  selectable: { type: Boolean },
  selectedItems: { type: Array as PropType<string[]>, default: [] }
})

const emit = defineEmits(['update:selectedItems'])
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

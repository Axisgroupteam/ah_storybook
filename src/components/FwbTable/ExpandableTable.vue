<template>
  <div
    class="w-full flex flex-col justify-between items-center gap-0 rounded-b-lg h-full pb-0 min-h-full flex-1"
  >
    <FwbTable
      class="w-full h-full relative overflow-hidden flex flex-col grow"
      :hoverable="hoverable"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <FwbTableHead class="w-full">
        <FwbTableHeadCell>
          <FwbCheckbox :model-value="allSelected" @update:model-value="toggleAllItems" />
        </FwbTableHeadCell>
        <FwbTableHeadCell
          v-for="header in visibleHeaders"
          :key="header.value"
          :draggable="true"
          class="cursor-move transition-all duration-300 ease-in-out"
          @dragstart="onDragStart($event, header)"
          @dragover.prevent
          @dragenter.prevent
          @drop="onDrop($event, header)"
        >
          <div class="flex items-center whitespace-nowrap">
            {{ header.name }}
            <component
              :is="getFBIcon('chevron-sort')"
              key="'chevron-sort'"
              class="h-[11px] w-[10px] ml-2 cursor-pointer"
              @click.stop="$emit('sort', header.value)"
            />
          </div>
        </FwbTableHeadCell>
      </FwbTableHead>
      <FwbTableBody>
        <template v-if="computedItems?.length && !isLoading">
          <template v-for="(group, groupName) in groupedItems" :key="groupName">
            <tr
              v-if="groupBy"
              class="text-sm font-normal cursor-pointer border-b dark:border-neutral-700 border-neutral-200 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              @click="toggleGroup(groupName)"
            >
              <td :colspan="visibleHeaders.length + 1" class="p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <FwbCheckbox
                      :model-value="isGroupSelected(groupName)"
                      @update:model-value="toggleGroup(groupName, $event)"
                      @click.stop
                    />
                    <div class="px-4">
                      <IconWrapper
                        name="chevron-down"
                        :class="expandedGroups[groupName] ? 'rotate-180' : ''"
                        size="12"
                      />
                    </div>
                    {{ groupName }}
                  </div>
                  <div>
                    <span>Group :</span>
                    {{ group.length }}
                    {{ group.length === 1 ? 'item' : 'items' }}
                  </div>
                </div>
              </td>
            </tr>
            <template v-if="expandedGroups[groupName]">
              <tr class="group-wrapper">
                <td :colspan="visibleHeaders.length + 1" class="p-0">
                  <div class="px-4">
                    <!-- Añadido div con padding horizontal -->
                    <table class="w-full">
                      <tbody>
                        <tr
                          v-for="item in group"
                          :key="getItemKey(item)"
                          class="group-item h-[51px] text-sm font-normal cursor-pointer border-b dark:border-neutral-700 border-neutral-200 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          @click="$emit('rowClick', item)"
                        >
                          <td class="w-10">
                            <FwbCheckbox
                              :model-value="isItemSelected(getItemKey(item))"
                              @update:model-value="toggleItem(getItemKey(item))"
                              @click.stop
                            />
                          </td>
                          <td v-for="header in visibleHeaders" :key="header.value">
                            <slot :name="header.value" :item="item">
                              {{ item[header.value] != null ? item[header.value] : '-' }}
                            </slot>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </template>
        </template>
        <!-- Nueva fila de totales -->
        <FwbTableRow v-if="showTotals" class="font-bold bg-neutral-100 dark:bg-neutral-800">
          <FwbTableCell v-for="header in visibleHeaders" :key="header.value">
            <template v-if="header.value === firstColumn"> Total </template>
            <template v-else-if="isNumeric(header.value)">
              {{ calculateTotal(header.value) }}
            </template>
            <template v-else> - </template>
          </FwbTableCell>
        </FwbTableRow>
      </FwbTableBody>
      <template v-if="!computedItems?.length && !isLoading" #empty>
        <slot name="empty">
          <div class="flex justify-center items-center flex-col gap-4 h-full grow">
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
        </slot>
      </template>
      <template v-if="isLoading" #loading>
        <slot name="loading">
          <div class="flex justify-center items-center flex-col gap-4 h-full grow">
            <FwbSpinner :loading="isLoading" size="12" color="red" />
          </div>
        </slot>
      </template>
    </FwbTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getFBIcon } from '@/utils/getAssets'
import FwbTable from './FwbTable.vue'
import FwbTableBody from './FwbTableBody.vue'
import FwbTableCell from './FwbTableCell.vue'
import FwbTableHead from './FwbTableHead.vue'
import FwbTableHeadCell from './FwbTableHeadCell.vue'
import FwbTableRow from './FwbTableRow.vue'
import FwbSpinner from '../FwbSpinner/FwbSpinner.vue'
import FwbCheckbox from '../FwbCheckbox/FwbCheckbox.vue'
import IconWrapper from '../IconWrapper.vue'

const props = withDefaults(
  defineProps<{
    modelValue: any[] // v-model para los headers
    items: any[]
    isLoading: boolean
    hoverable: boolean
    currentPage: number
    perPage: number
    totalItems: number
    getItemKey: (item: any) => string | number
    excludeFields?: string[] // Nueva propiedad para especificar campos a excluir
    groupBy?: string // Nueva propiedad para especificar el campo de agrupación
    showTotals?: boolean // Nueva propiedad para mostrar totales
  }>(),
  {
    hoverable: true, // Valor por defecto para hoverable
    groupBy: undefined, // Valor por defecto para groupBy
    showTotals: false // Valor por defecto para showTotals
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void // Emisión para v-model
  (e: 'sort', value: string): void
  (e: 'rowClick', item: any): void
  (e: 'perPageChanged', value: number): void
  (e: 'pageChanged', value: number): void
  (e: 'update:selectedItems', value: string[]): void
}>()

const inside = ref(false)
const localHeaders = ref(props.modelValue)

// Observar cambios en el modelValue y actualizar localHeaders
watch(
  () => props.modelValue,
  (newValue) => {
    localHeaders.value = newValue
  },
  { deep: true }
)

const visibleHeaders = computed(() =>
  localHeaders.value?.filter(
    (header) =>
      header.visible &&
      (!props.excludeFields ||
        !Array.isArray(props.excludeFields) ||
        !props.excludeFields.includes(header.value))
  )
)

const computedItems = computed(() => props.items)

const onEnter = () => {
  inside.value = true
}
const onLeave = () => {
  inside.value = false
}

const onDragStart = (event: DragEvent, header: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', header.value)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDrop = (event: DragEvent, targetHeader: any) => {
  event.preventDefault()
  const draggedHeaderValue = event.dataTransfer?.getData('text')
  if (!draggedHeaderValue) return

  const newHeaders = [...localHeaders.value]
  const draggedIndex = newHeaders.findIndex((h) => h.value === draggedHeaderValue)
  const targetIndex = newHeaders.findIndex((h) => h.value === targetHeader.value)

  if (draggedIndex > -1 && targetIndex > -1) {
    const [removed] = newHeaders.splice(draggedIndex, 1)
    newHeaders.splice(targetIndex, 0, removed)

    localHeaders.value = newHeaders
    emit('update:modelValue', newHeaders)
  }
}

const expandedGroups = ref({})

const selectedItems = ref<string[]>([])

const allSelected = computed(() => {
  return computedItems.value.length > 0 && selectedItems.value.length === computedItems.value.length
})

const isGroupSelected = (groupName: string) => {
  const group = groupedItems.value[groupName]
  return group.every((item) => isItemSelected(props.getItemKey(item)))
}

const toggleAllItems = (checked: boolean) => {
  if (checked) {
    selectedItems.value = computedItems.value.map((item) => props.getItemKey(item).toString())
  } else {
    selectedItems.value = []
  }
  emit('update:selectedItems', selectedItems.value)
}

const toggleGroup = (groupName: string, checked?: boolean) => {
  const group = groupedItems.value[groupName]
  const groupItemKeys = group.map((item) => props.getItemKey(item).toString())

  if (checked !== undefined) {
    if (checked) {
      selectedItems.value = [...new Set([...selectedItems.value, ...groupItemKeys])]
    } else {
      selectedItems.value = selectedItems.value.filter((key) => !groupItemKeys.includes(key))
    }
  } else {
    expandedGroups.value[groupName] = !expandedGroups.value[groupName]
  }

  emit('update:selectedItems', selectedItems.value)
}

const isItemSelected = (itemKey: string | number) => {
  return selectedItems.value.includes(itemKey.toString())
}

const toggleItem = (itemKey: string | number) => {
  const stringKey = itemKey.toString()
  const index = selectedItems.value.indexOf(stringKey)
  if (index === -1) {
    selectedItems.value.push(stringKey)
  } else {
    selectedItems.value.splice(index, 1)
  }
  emit('update:selectedItems', selectedItems.value)
}

const groupedItems = computed(() => {
  if (!props.groupBy) {
    return { '': computedItems.value }
  }

  const groups = computedItems.value.reduce((acc, item) => {
    const groupKey = item[props.groupBy] || '-'
    if (!acc[groupKey]) {
      acc[groupKey] = []
      // Inicializar el estado de expansión para cada grupo
      if (expandedGroups.value[groupKey] === undefined) {
        expandedGroups.value[groupKey] = true // Expandido por defecto
      }
    }
    acc[groupKey].push(item)
    return acc
  }, {})

  return groups
})

const firstColumn = computed(() => visibleHeaders.value[0]?.value || '')

const isNumeric = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

const calculateTotal = (column: string) => {
  const total = computedItems.value.reduce((sum, item) => {
    const value = parseFloat(item[column])
    return isNaN(value) ? sum : sum + value
  }, 0)
  return total.toFixed(2) // Redondea a 2 decimales
}
</script>

<style scoped>
.cursor-move {
  cursor: move;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

/* Asegurarse de que la fila de agrupamiento ocupe todo el ancho */
tr[colspan] {
  display: table-row;
}

tr[colspan] > td {
  display: table-cell;
}

.group-wrapper {
  background-color: inherit;
}

.group-wrapper > td {
  padding: 16px 0;
}

.group-item {
  height: 51px;
}

.group-item td {
  padding: 8px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.dark .group-item td {
  border-bottom-color: #374151;
}

.group-item td:first-child {
  padding-left: 16px; /* Ajustado a 16px */
}

.group-item td:last-child {
  padding-right: 16px; /* Ajustado a 16px */
}

/* Estilos adicionales para mantener la apariencia original */
.group-item {
  transition: background-color 0.3s ease;
}

.group-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .group-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>

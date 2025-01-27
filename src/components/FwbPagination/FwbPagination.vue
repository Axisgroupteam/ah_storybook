<template>
  <nav
    aria-label="Navigation"
    class="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row"
  >
    <div
      class="text-neutral-500 dark:text-neutral-400 flex whitespace-nowrap justify-center items-center gap-[10px]"
      :class="'text-sm'"
    >
      Rows per page
      <fwb-dropdown :text="perPage" placement="top" class="rounded-lg" @toogle="handleToogle">
        <template #trigger>
          <FwbButton
            square
            color="secondary"
            class="w-16 h-[42px] font-normal text-sm hover:bg-neutral-100 hover:dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900"
            :class="
              !visible
                ? 'focus:ring-0'
                : 'ring-4 focus:bg-neutral-100 focus:dark:bg-neutral-700 focus:text-neutral-900 focus:dark:text-white'
            "
          >
            <span class="">
              {{ perPage }}
            </span>
            <template #suffix>
              <svg
                :class="visible ? 'rotate-180' : 'rotate-0'"
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </template>
          </FwbButton>
        </template>
        <div class="w-[64px] shadow-md rounded-lg border-neutral-200">
          <p
            v-for="page in perPagesArray"
            :key="page"
            class="px-4 py-2 border-b border-b-neutral-200 dark:border-b-neutral-700 last:border-b-0 hover:bg-neutral-100 hover:dark:bg-neutral-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-neutral-900 dark:text-white text-sm font-medium"
            @click="updatePerPage(page)"
          >
            {{ page }}
          </p>
        </div>
      </fwb-dropdown>
      <div :class="'text-xs'">
        <span class="font-semibold text-neutral-900 dark:text-white">{{ startItemsCount }}</span>
        -
        <span class="font-semibold text-neutral-900 dark:text-white">{{ endItemsCount }}</span>
        of
        <span class="font-semibold text-neutral-900 dark:text-white">{{ computedTotalItems }}</span>
      </div>
    </div>
    <div class="flex gap-0" :class="large && 'text-base h-10'">
      <slot name="start" />

      <slot v-if="enableFirstAndLastButtons" name="first-button">
        <button
          :disabled="isFirstPage"
          :class="getNavigationButtonClasses(1)"
          @click="goToFirstPage"
        >
          First
        </button>
      </slot>

      <slot name="prev-button" :disabled="isDecreaseDisabled" :decrease-page="decreasePage">
        <button
          :disabled="isDecreaseDisabled"
          :class="getNavigationButtonClasses(modelValue - 1)"
          @click="decreasePage"
        >
          <slot name="prev-icon">
            <svg
              v-if="showIcons || $slots['prev-icon']"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              class="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </slot>
          <template v-if="showLabels">
            {{ previousLabel }}
          </template>
        </button>
      </slot>
      <slot
        v-for="index in pagesToDisplay"
        :key="index"
        name="page-button"
        :page="index"
        :set-page="setPage"
        :disabled="isSetPageDisabled(index)"
      >
        <button
          :disabled="isSetPageDisabled(index)"
          :class="getPageButtonClasses(index === modelValue)"
          @click="setPage(index)"
        >
          {{ index }}
        </button>
      </slot>
      <slot name="next-button" :disabled="isIncreaseDisabled" :increase-page="increasePage">
        <button
          :disabled="isIncreaseDisabled"
          :class="getNavigationButtonClasses(modelValue + 1)"
          @click="increasePage"
        >
          <template v-if="showLabels">
            {{ nextLabel }}
          </template>
          <slot name="next-icon">
            <svg
              v-if="showIcons || $slots['next-icon']"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 20 20"
              aria-hidden="true"
              class="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </slot>
        </button>
      </slot>

      <slot v-if="enableFirstAndLastButtons" name="last-button">
        <button
          :disabled="isLastPage"
          :class="getNavigationButtonClasses(computedTotalPages)"
          @click="goToLastPage"
        >
          Last
        </button>
      </slot>

      <slot name="end" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { PaginationLayout } from './types'
import { twMerge } from 'tailwind-merge'
import FwbDropdown from '../FwbDropdown/FwbDropdown.vue'
import FwbButton from '../FwbButton/FwbButton.vue'

const emit = defineEmits<{
  'update:model-value': [page: number]
  'page-changed': [page: number]
  'per-page-changed': [perPage: number]
  'update:perPage': [perPage: number] // Añadir esta línea
}>()
interface IPaginationProps {
  modelValue?: number
  totalPages?: number
  perPage?: number
  totalItems?: number
  layout?: PaginationLayout
  showIcons?: boolean
  sliceLength?: number
  previousLabel?: string
  nextLabel?: string
  enableFirstAndLastButtons?: boolean
  showLabels?: boolean
  large?: boolean
}

const visible = ref(false)

const handleToogle = (value: boolean) => {
  visible.value = value
}

const perPagesArray = [10, 25, 50, 100]

const props = withDefaults(defineProps<IPaginationProps>(), {
  modelValue: 1,
  totalPages: undefined,
  perPage: 10,
  totalItems: 10,
  layout: 'pagination',
  showIcons: false,
  sliceLength: 2,
  previousLabel: 'Prev',
  nextLabel: 'Next',
  enableFirstAndLastButtons: false,
  showLabels: true,
  large: false
})
defineSlots<{
  /* eslint-disable @typescript-eslint/no-explicit-any */
  start: any
  'first-button': any
  'prev-button': any
  'prev-icon': any
  'page-button': any
  'next-button': any
  'next-icon': any
  'last-button': any
  end: any
  /* eslint-enable @typescript-eslint/no-explicit-any */
}>()

const perPage = ref(props.perPage)

watch(
  () => props.perPage,
  (newVal) => {
    perPage.value = newVal
  }
)

watch(perPage, (newVal) => {
  emit('per-page-changed', perPage.value)
})

function updatePerPage(page: number) {
  perPage.value = page
  emit('update:perPage', page)
}

function setPage(index: number) {
  emit('update:model-value', index)
  emit('page-changed', index)
}
function decreasePage() {
  emit('update:model-value', props.modelValue - 1)
  emit('page-changed', props.modelValue - 1)
}
function increasePage() {
  emit('update:model-value', props.modelValue + 1)
  emit('page-changed', props.modelValue + 1)
}
function goToFirstPage() {
  emit('update:model-value', 1)
  emit('page-changed', 1)
}
function goToLastPage() {
  const lastPage = computedTotalPages.value
  emit('update:model-value', lastPage)
  emit('page-changed', lastPage)
}

const computedTotalPages = computed(() => {
  if (props.totalPages) return props.totalPages
  return Math.ceil(props.totalItems / perPage.value)
})

const isDecreaseDisabled = computed(() => props.modelValue <= 1)
const isIncreaseDisabled = computed(() => props.modelValue >= computedTotalPages.value)
const isSetPageDisabled = (index: number) => index === props.modelValue

const pagesToDisplay = computed(() => {
  if (props.layout === 'navigation') return []
  if (props.layout === 'table') return []

  if (computedTotalPages.value <= props.sliceLength * 2 + 1) {
    const pages: number[] = []
    for (let page = 1; page <= computedTotalPages.value; page++) {
      pages.push(page)
    }
    return pages
  }
  if (props.modelValue <= props.sliceLength) {
    const pages: number[] = []
    const slicedLength =
      Math.abs(props.modelValue - props.sliceLength) + props.modelValue + props.sliceLength + 1
    for (let page = 1; page <= slicedLength; page++) {
      pages.push(page)
    }
    return pages
  }
  if (props.modelValue >= computedTotalPages.value - props.sliceLength) {
    const pages: number[] = []
    for (
      let page = Math.abs(computedTotalPages.value - props.sliceLength * 2);
      page <= computedTotalPages.value;
      page++
    ) {
      pages.push(page)
    }
    return pages
  }

  const pages: number[] = []
  const startedPage =
    props.modelValue - props.sliceLength > 0 ? props.modelValue - props.sliceLength : 1
  for (let page = startedPage; page < props.modelValue + props.sliceLength + 1; page++) {
    if (page >= computedTotalPages.value) break
    pages.push(page)
  }
  return pages
})

const startItemsCount = computed(() => props.modelValue * perPage.value - perPage.value + 1)
const endItemsCount = computed(() => {
  const count = props.modelValue * perPage.value
  if (!props.totalItems) return count
  if (count > props.totalItems) return props.totalItems
  return count
})
const computedTotalItems = computed(() => {
  if (props.totalItems) return props.totalItems
  return computedTotalPages.value * perPage.value
})

const isFirstPage = computed(() => props.modelValue === 1)
const isLastPage = computed(() => props.modelValue === computedTotalPages.value)

function getPageButtonClasses(active: boolean) {
  const baseClasses =
    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
  const activeClasses =
    'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
  const largeClasses = 'px-4 h-10'
  return twMerge(baseClasses, active && activeClasses, props.large && largeClasses)
}
function getNavigationButtonClasses(toPage: number) {
  const baseClasses =
    'flex items-center justify-center first:rounded-l-lg last:rounded-r-lg px-3 h-8 ml-0 leading-tight text-neutral-700 bg-neutral-100 border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:border-neutral-600 focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-600 relative focus:z-50'
  const disabledClasses =
    'bg-white dark:hover:bg-neutral-800 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 cursor-not-allowed hover:bg-white'
  const largeClasses = 'px-4 h-10'
  const tableClasses =
    'border-none text-white hover:text-white bg-gray-800 rounded-none first:rounded-l last:rounded-r hover:bg-neutral-900 dark:bg-gray-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
  return twMerge(
    baseClasses,
    toPage === props.modelValue && disabledClasses,
    props.large && largeClasses,
    (toPage > computedTotalPages.value || toPage < 1) && disabledClasses,
    props.layout === 'navigation' && '',
    (props.layout === 'navigation' || props.layout === 'table') && '',
    props.layout === 'table' && tableClasses
  )
}
</script>

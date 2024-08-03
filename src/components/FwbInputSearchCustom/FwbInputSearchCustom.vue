<template>
  <div class="flex flex-col justify-between gap-2 w-full">
    <fwb-input
      :initial-value="inputValue"
      :placeholder="`Select ${label}`"
      :label="showLabel ? label : ''"
      :disabled="error ? false : disabled"
      :required="required"
      :readonly="true"
      :validation-status="validationStatus ? 'error' : ''"
      @click="handleClick"
    >
      <template #suffix>
        <div
          :class="[
            'text-neutral-900 dark:text-white',
            {
              '!text-red-600 dark:!text-red-500': error,
              '!text-neutral-500 cursor-not-allowed': !error && disabled
            }
          ]"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
      </template>
      <template #validationMessage v-if="!open">
       <p> {{ error }}</p>
      </template>
    </fwb-input>
  </div>
  <fwb-modal v-if="open" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-neutral-900 dark:text-white">
        {{ title }}
      </div>
    </template>

    <template #bodyHeader>
      <fwb-input
        v-model="search"
        size="sm"
        place-holder="Search..."
        @keypress.enter="handleKeyPressEnter"
      >
        <template #prefix>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click.stop="request"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </template>
        <template #suffix>
          <div>
            <FwbSpinner v-if="loading"></FwbSpinner>
          </div>

          <svg
            v-if="search.length > 0 && !loading"
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            @click="clearSearch"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </template>
      </fwb-input>
    </template>

    <template #body>
      <div class="text-neutral-900 dark:text-white grid gap-4">
        <Table
          v-slot="item"
          :show-header="false"
          :table-config="{ ...table }"
          @info="handleSelected($event)"
        >
        </Table>
      </div>
    </template>

    <template #footer>
      <FwbPagination
        v-model="currentPage"
        :layout="'navigation'"
        :per-page="limit"
        :total-items="total"
        large
        @per-page-changed="changeLimit"
        @page-changed="goToPage"
      />
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import FwbInput from '../FwbInput/FwbInput.vue'
import FwbModal from '../FwbModal/FwbModal.vue'
import type { InputSize, InputType, ValidationStatus } from '../FwbInput/types'
import { computed, inject, onUnmounted, ref, watch } from 'vue'
import FwbPagination from '../FwbPagination/FwbPagination.vue'
import Table from './Table.vue'

//Nuevo
import { usePaginationApi } from '@/composables/usePaginationApi'
import FwbSpinner from '../FwbSpinner/FwbSpinner.vue'

interface Props {
  request?: any
  tableConfig?: any
  maxWidth?: string
  title?: string
  valueRef?: string
  valueRefSec?: string | undefined
  label: string
  showLabel?: boolean
  required?: boolean
  disabled?: boolean
  prevValue?: string
  error?: string
  objectRef?: string
  activeParam?: boolean
  placeHolder?: string
  size?: InputSize
  type?: InputType
  validationStatus?: ValidationStatus
  company: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  showLabel: true,
  prevValue: '',
  valueRef: 'name',
  realSelectedOpt: '',
  error: '',
  objectRef: '',
  activeParam: false,
  maxWidth: '',
  placeHolder: 'Search...',
  size: 'md',
  type: 'text',
  title: 'Title',
  validationStatus: undefined,
  company: ''
})

const emit = defineEmits(['selected', 'selectedOptionEvt', 'statusList'])
const open = ref(false)
const inputValue = ref('')

const changeLimit = (newPerPage: number) => {
  limit.value = newPerPage
}

const clearSearch = () => {
  search.value = ''
  request()
}

const { currentPage, items, loading, search, total, limit, goToPage, request } = usePaginationApi(
  props.request,
  {
    //limit: 100,
    company: computed(() => props.company)
  }
)

const value = ref('')

watch(
  () => props.prevValue,
  () => {
    if (props.prevValue && props.valueRef !== undefined) {
      value.value = props.prevValue
    }
  }
)

onUnmounted(() => {
  value.value = ''
})

const itemsFiltred = computed(() => {
  if (props.objectRef && props.activeParam != null && props.activeParam != undefined)
    return items.value.filter((i) => i[props.objectRef] == props.activeParam)
  else return items.value
})

const table = computed(() => ({
  tableContent: props.tableConfig,
  //color: props.color,
  items: itemsFiltred.value
  //color: "#D3D4D7",
}))

const handleSelected = (item: any) => {
  if (props.valueRefSec !== undefined) {
    inputValue.value = item[props.valueRefSec] + ' - ' + item[props.valueRef]
  } else {
    inputValue.value = item[props.valueRef]
  }

  open.value = false
  emit('selected', item)
}

watch(inputValue, (v) => {
  //alert(v)
})

const handleOpen = () => {
  if (!props.disabled) {
    open.value = true
  } else {
    return
  }
}

function closeModal() {
  open.value = false
}

const handleClick = () => {
  handleOpen()
}

const handleKeyPressEnter = () => {
  request()
}
</script>

<style></style>

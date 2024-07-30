<template>
  <div class="flex flex-col justify-between gap-2 w-full">
    <fwb-input
      :initial-value="inputValue"
      :placeholder="`Select ${label}`"
      :label="showLabel ? label : ''"
      :disabled="disabled"
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
              '!text-neutral-500 cursor-not-allowed': disabled
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
      <template #validationMessage>
        {{ error }}
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
      <FwbInput
        :initial-value="search"
        size="sm"
        place-holder="Search..."
        @update:value="handleValueSearchUpdate"
        @keypress.enter="
          () => {
            request()
          }
        "
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
            <LoadingCircle v-if="loading" />
          </div>

          <svg
            v-if="search.length > 0"
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
      </FwbInput>
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
        :per-page="perPage"
        :total-items="totalItems"
        large
        @per-page-changed="changeLimit"
      />
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import FwbInput from '../FwbInput/FwbInput.vue'
import FwbModal from '../FwbModal/FwbModal.vue'
import type { InputSize, InputType, ValidationStatus } from '../FwbInput/types'
import { computed, ref } from 'vue'
import FwbPagination from '../FwbPagination/FwbPagination.vue'
import Table from './Table.vue'
import LoadingCircle from '../Share/LoadingCircle.vue'

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
  request: () => () => {
    alert('Reguest')
  },
  validationStatus: undefined
})

const emit = defineEmits(['selected', 'selectedOptionEvt', 'statusList'])
const open = ref(false)
const inputValue = ref('')

//Estos deben ser de la api
const loading = ref(false)
const search = ref('')

const currentPage = ref(1)
const perPage = ref(20)
const totalItems = 100

const changeLimit = (newPerPage: number) => {
  currentPage.value = 1
  perPage.value = newPerPage
}

const clearSearch = () => {
  search.value = ''
}

const items = ref([
  {
    name: 'Name 1 ',
    lastName: 'Last Name 1 ',
    phone: '+1789654123'
  },
  {
    name: 'Name 2',
    lastName: 'Last Name 2',
    phone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 3',
    phone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    phone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    phone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    phone: '+1789654123'
  },
  {
    name: 'Name 1',
    lastName: 'Last Name 1',
    phone: '+1789654123'
  },
  {
    name: 'Name 2',
    lastName: 'Last Name 2',
    phone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 3',
    phone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    phone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    phone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    phone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    phone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    phone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    phone: '+1789654123'
  }
])

// hasta aqui lo que debe retornar la api

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

const handleValueSearchUpdate = (value: string) => {
  search.value = value
}
</script>

<style></style>

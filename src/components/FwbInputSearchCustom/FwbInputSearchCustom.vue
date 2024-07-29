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
          <FwbButton :pill="true" :square="true" color="secondary" :ring="false">
            <template #default>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_5100_24973)">
                  <mask
                    id="mask0_5100_24973"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="12"
                    height="13"
                  >
                    <rect y="0.5" width="12" height="12" fill="white" />
                  </mask>
                  <g mask="url(#mask0_5100_24973)">
                    <path
                      d="M4.01026 11.9001C3.8129 11.9001 3.61999 11.8368 3.45591 11.7182C3.29183 11.5997 3.16395 11.4313 3.08843 11.2342C3.01291 11.0371 2.99315 10.8203 3.03164 10.611C3.07013 10.4018 3.16515 10.2097 3.30468 10.0588L6.59106 6.50672L3.30468 2.95465C3.20936 2.85515 3.13333 2.73612 3.08102 2.60452C3.02872 2.47291 3.00119 2.33137 3.00004 2.18815C2.99889 2.04492 3.02414 1.90288 3.07432 1.77031C3.1245 1.63775 3.1986 1.51731 3.29231 1.41603C3.38601 1.31475 3.49744 1.23466 3.62009 1.18042C3.74274 1.12619 3.87415 1.09889 4.00666 1.10014C4.13918 1.10138 4.27013 1.13114 4.39189 1.18767C4.51365 1.2442 4.62377 1.32638 4.71584 1.4294L8.7078 5.7441C8.8949 5.94638 9 6.2207 9 6.50672C9 6.79275 8.8949 7.06707 8.7078 7.26935L4.71584 11.584C4.52872 11.7864 4.27492 11.9 4.01026 11.9001Z"
                      fill="#A3A3A3"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_5100_24973">
                    <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </template>
          </FwbButton>
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
import FwbButton from '../FwbButton/FwbButton.vue'
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
    fone: '+1789654123'
  },
  {
    name: 'Name 2',
    lastName: 'Last Name 2',
    fone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 3',
    fone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    fone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    fone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    fone: '+1789654123'
  },
  {
    name: 'Name 1',
    lastName: 'Last Name 1',
    fone: '+1789654123'
  },
  {
    name: 'Name 2',
    lastName: 'Last Name 2',
    fone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 3',
    fone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    fone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    fone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    fone: '+1789654123'
  },
  {
    name: 'Name 4',
    lastName: 'Last Name 4',
    fone: '+1789654123'
  },
  {
    name: 'Name 5',
    lastName: 'Last Name 5',
    fone: '+1789654123'
  },
  {
    name: 'Name 3',
    lastName: 'Last Name 6',
    fone: '+1789654123'
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

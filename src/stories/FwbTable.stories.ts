import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbTable from '@/components/FwbTable/FwbTable.vue'
import FwbTableBody from '@/components/FwbTable/FwbTableBody.vue'
import FwbTableCell from '@/components/FwbTable/FwbTableCell.vue'
import FwbTableHead from '@/components/FwbTable/FwbTableHead.vue'
import FwbTableHeadCell from '@/components/FwbTable/FwbTableHeadCell.vue'
import FwbTableRow from '@/components/FwbTable/FwbTableRow.vue'
import FwbModal from '@/components/FwbModal/FwbModal.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import ExpandableTable from '@/components/FwbTable/ExpandableTable.vue'
import FittedBox from '@/components/FittedBox.vue'

/**
 * Use the table component to show text, images, links, and other elements inside a structured set of data made up of rows and columns of table cells.
 *
 * The table component represents a set of structured elements made up of rows and columns as table cells that can be used to show data sets to your website users.
 */
const meta = {
  title: 'Example/TableX',
  component: FwbTable,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    () => ({
      template: `
        <div class="w-full p-4">        
            <story />        
        </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof FwbTable>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use the following example of a responsive table component to show multiple rows and columns of text data.
 */
export const Default: Story = {
  render: (args) => ({
    components: {
      FwbTable,
      FwbTableBody,
      FwbTableCell,
      FwbTableHead,
      FwbTableHeadCell,
      FwbTableRow
    },
    setup() {
      const items = [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' }
      ]
      return { args, items }
    },
    template: `
                <div>
          <FwbTable>
            <FwbTableHead>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template>            
                Product name
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Color
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Category
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Price
              </FwbTableHeadCell>              
            </FwbTableHead>
            <FwbTableBody>
              <FwbTableRow v-for="item in items" :key="item.name">
                <FwbTableCell>{{ item.name }}</FwbTableCell>
                <FwbTableCell>{{ item.color }}</FwbTableCell>
                <FwbTableCell>{{ item.category }}</FwbTableCell>
                <FwbTableCell>{{ item.price }}</FwbTableCell>                
              </FwbTableRow>
            </FwbTableBody>
          </FwbTable>
</div>
    `
  }),
  args: {}
}

/**
 * Use the following example to change the background color of a data row when hovering over the element with the cursor.
 */
export const Hoverable: Story = {
  render: (args) => ({
    components: {
      FwbTable,
      FwbTableBody,
      FwbTableCell,
      FwbTableHead,
      FwbTableHeadCell,
      FwbTableRow,
      FwbModal,
      FwbButton
    },
    setup() {
      const showModal = ref(false)
      const selectedItem = ref(null)

      const items = [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' }
      ]

      const openModal = (item: any) => {
        selectedItem.value = item
        showModal.value = true
      }

      const closeModal = () => {
        showModal.value = false
      }

      return { args, items, showModal, selectedItem, openModal, closeModal }
    },
    template: `
        <div>
          <FwbTable hoverable>
            <FwbTableHead>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template>            
                Product name
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Color
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Category
              </FwbTableHeadCell>
              <FwbTableHeadCell>
                <template #suffix>
                    <svg class="w-[12px] h-[12px] text-neutral-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                </svg>
                </template> 
                Price
              </FwbTableHeadCell>              
            </FwbTableHead>
            <FwbTableBody>
              <FwbTableRow v-for="item in items" :key="item.name" @click="openModal(item)">
                <FwbTableCell>{{ item.name }}</FwbTableCell>
                <FwbTableCell>{{ item.color }}</FwbTableCell>
                <FwbTableCell>{{ item.category }}</FwbTableCell>
                <FwbTableCell>{{ item.price }}</FwbTableCell>                
              </FwbTableRow>
            </FwbTableBody>
          </FwbTable>
  
          <FwbModal v-if="showModal" @close="closeModal">
                <template #header>
                    Item Details
                </template>
                <template #body>
                    <div v-if="selectedItem">
                        <p><strong>Name:</strong> {{ selectedItem.name }}</p>
                        <p><strong>Color:</strong> {{ selectedItem.color }}</p>
                        <p><strong>Category:</strong> {{ selectedItem.category }}</p>
                        <p><strong>Price:</strong> {{ selectedItem.price }}</p>
                    </div>
                </template>            
                <template #footer>
                    <FwbButton color="primary" @click="closeModal">
                        Close
                    </FwbButton>
                </template>
          </FwbModal>
        </div>
      `
  }),
  args: {
    hoverable: true
  }
}

export const ExpandableTableStory: Story = {
  render: (args) => ({
    components: {
      ExpandableTable
    },
    setup() {
      const data = ref([
        {
          id: 1,
          vehicle: 'Vehicle 1',
          loadNo: 'Load No. 1',
          customer: 'Customer 1',
          pickUp: 'Pick Up 1',
          dropOff: 'Drop Off 1',
          pickUpDate: '2024-01-01',
          dropOffDate: '2024-01-02'
        },
        {
          id: 2,
          vehicle: 'Vehicle 1',
          loadNo: 'Load No. 2',
          customer: 'Customer 2',
          pickUp: 'Pick Up 2',
          dropOff: 'Drop Off 2',
          pickUpDate: '2024-01-03',
          dropOffDate: '2024-01-04'
        },
        {
          id: 3,
          vehicle: 'Vehicle 2',
          loadNo: 'Load No. 3',
          customer: 'Customer 3',
          pickUp: 'Pick Up 3',
          dropOff: 'Drop Off 3',
          pickUpDate: '2024-01-05',
          dropOffDate: '2024-01-06'
        },
        {
          id: 4,
          vehicle: 'Vehicle 2',
          loadNo: 'Load No. 4',
          customer: 'Customer 4',
          pickUp: 'Pick Up 4',
          dropOff: 'Drop Off 4',
          pickUpDate: '2024-01-07',
          dropOffDate: '2024-01-08'
        },
        {
          id: 5,
          vehicle: 'Vehicle 3',
          loadNo: 'Load No. 5',
          customer: 'Customer 5',
          pickUp: 'Pick Up 5',
          dropOff: 'Drop Off 5',
          pickUpDate: '2024-01-09',
          dropOffDate: '2024-01-10'
        },
        {
          id: 6,
          vehicle: 'Vehicle 3',
          loadNo: 'Load No. 6',
          customer: 'Customer 6',
          pickUp: 'Pick Up 6',
          dropOff: 'Drop Off 6',
          pickUpDate: '2024-01-11',
          dropOffDate: '2024-01-12'
        },
        {
          id: 7,
          vehicle: 'Vehicle 3',
          loadNo: 'Load No. 7',
          customer: 'Customer 7',
          pickUp: 'Pick Up 7',
          dropOff: 'Drop Off 7',
          pickUpDate: '2024-01-13',
          dropOffDate: '2024-01-14'
        }
      ])

      const fields = ref([
        { value: 'vehicle', name: 'Vehicle', visible: true },
        { value: 'loadNo', name: 'Load No.', visible: true },
        { value: 'customer', name: 'Customer', visible: true },
        { value: 'pickUp', name: 'Pick Up', visible: true },
        { value: 'dropOff', name: 'Drop Off', visible: true },
        { value: 'pickUpDate', name: 'Pick Up Date', visible: true },
        { value: 'dropOffDate', name: 'Drop Off Date', visible: true }
      ])

      const handleSort = () => {
        // Implementar lógica de ordenación
      }

      const handleRowClick = () => {
        // Implementar lógica de clic en fila
      }

      const onChangeLimit = () => {
        // Implementar lógica de cambio de límite por página
      }

      const onChangePage = () => {
        // Implementar lógica de cambio de página
      }

      return { data, fields, handleSort, handleRowClick, onChangeLimit, onChangePage }
    },
    template: `
    <FittedBox>
      <ExpandableTable
        v-model="fields"
        :items="data"
        :is-loading="false"
        :current-page="1"
        :per-page="10"
        :total-items="data.length"
        :get-item-key="(item) => item.id"
        group-by="vehicle"
        @sort="handleSort"
        @row-click="handleRowClick"
        @per-page-changed="onChangeLimit"
        @page-changed="onChangePage"
      />
    </FittedBox>
    `
  }),
  args: {}
}

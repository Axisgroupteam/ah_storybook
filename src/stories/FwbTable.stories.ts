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
import ExpandableTable from '@/components/FwbTable/NestedTable/ExpandableTable.vue'
import FittedBox from '@/components/FittedBox.vue'
import FwbInput from '@/components/FwbInput/FwbInput.vue'

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

export const Expandable: Story = {
  render: (args) => ({
    components: {
      ExpandableTable,
      FwbInput,
      FwbButton
    },
    setup() {
      const elementCount = ref(100)
      const vehicleCount = ref(4)
      const data = ref(generateRandomData(elementCount.value, vehicleCount.value))

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
        alert('click row')
      }

      const onChangeLimit = () => {
        // Implementar lógica de cambio de límite por página
      }

      const onChangePage = () => {
        // Implementar lógica de cambio de página
      }

      const updateData = () => {
        data.value = generateRandomData(elementCount.value, vehicleCount.value)
      }

      const selectedItems = ref<string[]>([])
      const grouped = ref(false)
      const selectable = ref(false)

      const updateDataGrouped = () => {
        // Implementar lógica de cambio de página
        grouped.value = !grouped.value
      }
      const handleSelectable = () => {
        // Implementar lógica de cambio de página
        selectable.value = !selectable.value
      }

      return {
        data,
        fields,
        elementCount,
        vehicleCount,
        selectedItems,
        grouped,
        selectable,
        handleSort,
        handleRowClick,
        onChangeLimit,
        onChangePage,
        updateData,
        updateDataGrouped,
        handleSelectable
      }
    },
    template: `
    <FittedBox>
      <div class="mb-4 flex space-x-4 justify-center items-end">
        <FwbInput v-model="elementCount" type="number" label="Records" />
        <FwbInput v-model="vehicleCount" type="number" label="Vehicles" />
        <FwbButton class="h-fit w-fit" @click="updateData">Update Data</FwbButton>
        <FwbButton class="h-fit w-fit" @click="updateDataGrouped">Handle Group</FwbButton>
        <FwbButton class="h-fit w-fit" @click="handleSelectable">Handle Selectable</FwbButton>
      </div>
      <ExpandableTable
        v-model="fields"
        v-model:selected-items="selectedItems"
        :items="data"
        :is-loading="false"
        :current-page="1"
        :per-page="10"
        :total-items="data.length"
        :grouped="grouped"
        :selectable="selectable"
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

function generateRandomData(count: number, vehicleCount: number): any[] {
  const vehicles = Array.from({ length: vehicleCount }, (_, i) => `Vehículo ${i + 1}`)
  const customers = ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E']
  const locations = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza']

  return Array.from({ length: count }, (_, index) => ({
    _id: index + 1,
    vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
    loadNo: Math.floor(Math.random() * 10000) + 1,
    customer: customers[Math.floor(Math.random() * customers.length)],
    pickUp: locations[Math.floor(Math.random() * locations.length)],
    dropOff: locations[Math.floor(Math.random() * locations.length)],
    pickUpDate: generarFechaAleatoria(),
    dropOffDate: generarFechaAleatoria()
  }))
}

function generarFechaAleatoria(): string {
  const inicio = new Date(2024, 0, 1).getTime()
  const fin = new Date(2024, 11, 31).getTime()
  const fechaAleatoria = new Date(inicio + Math.random() * (fin - inicio))
  return fechaAleatoria.toISOString().split('T')[0]
}

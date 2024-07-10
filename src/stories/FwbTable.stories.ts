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

const meta = {
  title: 'Example/FwbTable',
  component: FwbTable,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    () => ({
      template: `
    <div class="w-full h-[300px] flex justify-center">
        <div class="w-full">        
            <story />        
        </div>
    </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof FwbTable>

export default meta
type Story = StoryObj<typeof meta>

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
      return { args }
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
      <FwbTableRow>
        <FwbTableCell>Apple MacBook Pro 17"</FwbTableCell>
        <FwbTableCell>Sliver</FwbTableCell>
        <FwbTableCell>Laptop</FwbTableCell>
        <FwbTableCell>$2999</FwbTableCell>        
      </FwbTableRow>
      <FwbTableRow>
        <FwbTableCell>Microsoft Surface Pro</FwbTableCell>
        <FwbTableCell>White</FwbTableCell>
        <FwbTableCell>Laptop PC</FwbTableCell>
        <FwbTableCell>$1999</FwbTableCell>        
      </FwbTableRow>      
        <FwbTableCell>Magic Mouse 2</FwbTableCell>
        <FwbTableCell>Black</FwbTableCell>
        <FwbTableCell>Accessories</FwbTableCell>
        <FwbTableCell>$99</FwbTableCell>        
      </FwbTableRow>
    </FwbTableBody>
  </FwbTable>
</div>
    `
  }),
  args: {}
}

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

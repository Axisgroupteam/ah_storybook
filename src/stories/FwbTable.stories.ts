import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbTable from '@/components/FwbTable/FwbTable.vue'
import FwbTableBody from '@/components/FwbTable/FwbTableBody.vue'
import FwbTableCell from '@/components/FwbTable/FwbTableCell.vue'
import FwbTableHead from '@/components/FwbTable/FwbTableHead.vue'
import FwbTableHeadCell from '@/components/FwbTable/FwbTableHeadCell.vue'
import FwbTableRow from '@/components/FwbTable/FwbTableRow.vue'

const meta = {
  title: 'Example/FwbTable',
  component: FwbTable,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    () => ({
      template: `
    <div class="w-full h-[500px] flex justify-center">
        <div class="w-full px-6">
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
      <FwbTableHeadCell>Product name</FwbTableHeadCell>
      <FwbTableHeadCell>Color</FwbTableHeadCell>
      <FwbTableHeadCell>Category</FwbTableHeadCell>
      <FwbTableHeadCell>Price</FwbTableHeadCell>      
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
      <FwbTableRow>
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
      FwbTableRow
    },
    setup() {
      return { args }
    },
    template: `
        <div>
          <FwbTable hoverable>
            <FwbTableHead>
              <FwbTableHeadCell>Product name</FwbTableHeadCell>
              <FwbTableHeadCell>Color</FwbTableHeadCell>
              <FwbTableHeadCell>Category</FwbTableHeadCell>
              <FwbTableHeadCell>Price</FwbTableHeadCell>              
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
              <FwbTableRow>
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
  args: {
    hoverable: true
  }
}

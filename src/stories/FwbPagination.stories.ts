import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbPagination from '@/components/FwbPagination/FwbPagination.vue'

/**
 * Use the pagination element to filter and indicate a series of content on multiple pages in the data tables or other components.
 *
 * The pagination component can be used to filter and navigate through a number of multiple pages contents in data tables or other components.
 */
const meta = {
  title: 'Example/PaginationX',
  component: FwbPagination,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbPagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this pagination that contains a filter option and navigation buttons for data tables or other components.
 */
export const Default: Story = {
  render: (args) => ({
    components: {
      FwbPagination
    },
    setup() {
      const currentPage = ref(1)
      const perPage = ref(20)
      const totalItems = 100

      const changeLimit = (newPerPage: number) => {
        currentPage.value = 1
        perPage.value = newPerPage
      }

      return { args, currentPage, perPage, totalItems, changeLimit }
    },
    template: `
        <div>
            <FwbPagination
                v-model="currentPage"
                :layout="'navigation'"
                :per-page="perPage"
                :total-items="totalItems"
                large
                @per-page-changed="changeLimit"
            />
        </div>
    `
  }),
  decorators: [
    () => ({
      template:
        '<div class="w-full p-4 shadow-md border-t mt-32 rounded-b-lg dark:border-t-neutral-700 border-neutral-200"><story /></div>'
    })
  ],
  args: {}
}

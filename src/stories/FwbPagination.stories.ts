import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbPagination from '@/components/FwbPagination/FwbPagination.vue'

const meta = {
  title: 'Example/FwbPagination',
  component: FwbPagination,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbPagination>

export default meta
type Story = StoryObj<typeof meta>

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
        '<div class="w-full p-4 shadow-md border-t mt-32 dark:border-t-neutral-700 border-neutral-200"><story /></div>'
    })
  ],
  args: {}
}

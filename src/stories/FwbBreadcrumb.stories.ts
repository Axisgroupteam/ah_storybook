import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import FwbBreadcrumb from '@/components/FwbBreadcrumb/FwbBreadcrumb.vue'
import FwbBreadcrumbItem from '@/components/FwbBreadcrumb/FwbBreadcrumbItem.vue'

/**
 * Show the location of the current page in a hierarchical structure.
 *
 * The breadcrumb component is an important part of any website or application that can be used to show the current location of a page in a hierarchical structure of pages.
 */
const meta = {
  title: 'Example/BreadcrumbX',
  component: FwbBreadcrumb,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof FwbBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/**
 *Use the following breadcrumb example to show the hierarchical structure of pages.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbBreadcrumb, FwbBreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
        <FwbBreadcrumb>
            <FwbBreadcrumbItem home href="#">
                Home
            </FwbBreadcrumbItem>
            <FwbBreadcrumbItem href="#">
                Projects
            </FwbBreadcrumbItem>
            <FwbBreadcrumbItem href="#">
                Flowbite
            </FwbBreadcrumbItem>
            <FwbBreadcrumbItem>
                Content
            </FwbBreadcrumbItem>
        </FwbBreadcrumb>
      `
  }),
  args: {}
}

/**
 * You can alternatively also use the breadcrumb components with a solid background.
 */
export const Background: Story = {
  render: (args) => ({
    components: { FwbBreadcrumb, FwbBreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
          <FwbBreadcrumb solid>
              <FwbBreadcrumbItem home href="#">
                  Home
              </FwbBreadcrumbItem>
              <FwbBreadcrumbItem href="#">
                  Projects
              </FwbBreadcrumbItem>
              <FwbBreadcrumbItem href="#">
                  Flowbite
              </FwbBreadcrumbItem>
              <FwbBreadcrumbItem>
                Content
            </FwbBreadcrumbItem>
          </FwbBreadcrumb>
        `
  }),
  args: {}
}

/**
 * Use the following breadcrumb example to show the hierarchical structure of pages with custom icons.
 */
export const Custom: Story = {
  render: (args) => ({
    components: { FwbBreadcrumb, FwbBreadcrumbItem },
    setup() {
      return { args }
    },
    template: `
             <FwbBreadcrumb>
    <FwbBreadcrumbItem home href="#">
      <template #home-icon>
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </template>
      Home
    </FwbBreadcrumbItem>
    <FwbBreadcrumbItem href="#">
      <template #arrow-icon>
        <svg class="w-4 h-4 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </template>
      Projects
    </FwbBreadcrumbItem>
    <FwbBreadcrumbItem href="#">
      <template #arrow-icon>
        <svg class="w-4 h-4 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </template>
      Flowbite
    </FwbBreadcrumbItem>
    <FwbBreadcrumbItem>
      <template #arrow-icon>
        <svg class="w-4 h-4 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </template>
      Content
    </FwbBreadcrumbItem>
  </FwbBreadcrumb>
          `
  }),
  args: {}
}

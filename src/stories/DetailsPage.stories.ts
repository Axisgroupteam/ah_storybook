import type { Meta, StoryObj } from '@storybook/vue3'
import DetailsPageExample from '@/components/DetailsPage/DetailsPageExample.vue'

import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories

const meta = {
  title: 'Blocks/DetailsPage',
  component: DetailsPageExample,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
    <div class="w-full h-screen flex justify-center">
        <div class="w-full h-full">
            <story />
        </div>
    </div>
    `
    })
  ],
  argTypes: {},
  args: {}
} satisfies Meta<typeof DetailsPageExample>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  render: (args) => ({
    components: { DetailsPageExample },
    setup() {
      const isLoading = ref(false)
      const administrator = ref({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        isActive: true,
        phone: '+1234567890'
      })

      const randomizeInfo = () => {
        const firstNames = [
          'John',
          'Jane',
          'Michael',
          'Emily',
          'David',
          'Sarah',
          'Christopher',
          'Jessica',
          'Matthew',
          'Ashley',
          'Daniel',
          'Jennifer',
          'James',
          'Lisa',
          'Robert'
        ]
        const lastNames = [
          'Smith',
          'Johnson',
          'Williams',
          'Brown',
          'Jones',
          'Garcia',
          'Miller',
          'Davis',
          'Rodriguez',
          'Martinez',
          'Hernandez',
          'Lopez',
          'Gonzalez',
          'Wilson',
          'Anderson'
        ]
        const domains = [
          'example.com',
          'test.org',
          'demo.net',
          'sample.io',
          'mail.com',
          'corp.biz',
          'info.co',
          'tech.app',
          'global.com',
          'local.net'
        ]
        const prefixes = ['+1', '+44', '+61', '+81', '+86', '+91', '+49', '+33', '+7', '+55']

        const fullName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
        const domain = domains[Math.floor(Math.random() * domains.length)]
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]

        administrator.value = {
          fullName: fullName,
          email: `${fullName.toLowerCase().replace(' ', '.')}@${domain}`,
          isActive: Math.random() > 0.3,
          phone: `${prefix}${Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(9, '0')}`
        }
      }

      const handleNavigation = () => {
        isLoading.value = true
        setTimeout(() => {
          randomizeInfo()
          isLoading.value = false
        }, 1000)
      }

      return {
        args,
        administrator,
        isLoading,
        handlePrev: handleNavigation,
        handleNext: handleNavigation
      }
    },
    template: ` 
     <DetailsPageExample 
       :item="administrator" 
       :isLoading="isLoading" 
       @prev="handlePrev"
       @next="handleNext"
     />                    
    `
  }),
  args: {
    item: {},
    isLoading: false
  }
}

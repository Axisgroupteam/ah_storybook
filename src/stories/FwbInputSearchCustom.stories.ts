import type { Meta, StoryObj } from '@storybook/vue3'
import FwbInputSearchCustom from '@/components/FwbInputSearchCustom/FwbInputSearchCustom.vue'
import { ref } from 'vue'
const apiResponse = {
  total: 21,
  totalPages: 3,
  currentPage: 1,
  items: [
    {
      isActive: true,
      isDeleted: false,
      _id: '64e8f52fe97b62b9b349fdea',
      name: '3rd Location Test EEE nolber',
      description: 'From Add Location EEE',
      truckService: false,
      technician: '64b412f322ed94719ce608d1',
      company: '63ef6825c239ab67f53279a0',
      createdAt: '2023-08-25T18:38:39.361Z',
      updatedAt: '2024-05-10T16:16:37.118Z',
      __v: 0,
      address: '950 Corbindale Rd, Houston, TX 77024, USA',
      city: 'Houston',
      cp: '77024',
      state: 'Texas',
      warehouseType: 'storage'
    },
    {
      isDeleted: false,
      _id: '64e8f5a8e97b62b9b349feab',
      name: '4th Location Test',
      description: 'From Add Location',
      truckService: false,
      address: '12039 NE 128th St, Kirkland, WA 98034, USA',
      city: 'Kirkland',
      state: 'Washington',
      company: '63ef6825c239ab67f53279a0',
      createdAt: '2023-08-25T18:40:40.163Z',
      updatedAt: '2024-06-11T19:34:49.709Z',
      __v: 0,
      isActive: false,
      cp: '98034',
      warehouseType: 'customer-site'
    },
    {
      isActive: true,
      isDeleted: false,
      _id: '64e8f6d2e97b62b9b349fee8',
      name: '5th Location Test',
      description: 'From Add Location',
      truckService: false,
      technician: '64dfac64ef346be8ff97d4e4',
      company: '63ef6825c239ab67f53279a0',
      createdAt: '2023-08-25T18:45:38.697Z',
      updatedAt: '2024-05-10T16:17:15.535Z',
      __v: 0,
      address: '4129 Spring Creek Dr, Spring, TX 77373, EE. UU.',
      city: 'Spring',
      cp: '77373',
      state: 'Texas',
      warehouseType: 'storage'
    }
  ]
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input field to start accepting data from the user.
 *
 * The input field is an important part of the form element that can be used to create interactive controls to accept data from the user based on multiple input types, such as text, email, URL, and more.
 */
const meta = {
  title: 'Example/InputAdvanceSearchX',
  component: FwbInputSearchCustom,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
    <div class="w-full h-screen flex justify-center p-4">
        <div class="w-full h-full">
            <story />
        </div>
    </div>
    `
    })
  ],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    validationStatus: { control: 'radio', options: ['normal', 'error'] },
    type: { table: { disable: true } },
    modelValue: { table: { disable: true } }
  },
  args: {
    label: 'Text'
  }
} satisfies Meta<typeof FwbInputSearchCustom>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

/**
 * Use this example to create multiple input fields types such as text, email, URL, and more.
 */
export const Default: Story = {
  render: () => ({
    template: `<FwbInputSearchCustom 
        :table-config="args.tableConfig"
        :request="args.request"
    />`,
    components: {
      FwbInputSearchCustom
    },
    setup() {
      const val = ref()
      return {
        args: {
          tableConfig: [
            {
              key: 'name',
              title: 'Name',
              tableConfig: {
                order: 1,
                show: true,
                width: 'auto'
              }
            }
          ],
          request: ({ search }: { search: string }) => {
            alert(search)
            return Promise.resolve({
              ...apiResponse,
              items: apiResponse.items.filter((v) =>
                search ? JSON.stringify(v).toLowerCase().includes(search.toLowerCase()) : true
              )
            })
          },
          valueRef: 'name'
        },
        val
      }
    }
  }),

  parameters: {}
}

/**
 * Use this example if you want to apply the disabled state to an input field.
 */
// export const Disabled: Story = {
//   args: {
//     // disabled: true
//   }
// }

/**
 * Use this example if you want to apply the required state to an input field.
 */
// export const Required: Story = {
//   args: {
//     required: true,
//     tableConfig: [
//       {
//         key: 'name',
//         title: 'Name',
//         tableConfig: {
//           order: 1,
//           show: true,
//           width: 'auto'
//         }
//       }
//     ]
//   }
// }

// /**
//  * Use the following example to apply validation styles for an error case.
//  */
// export const Error: Story = {
//   render: (args) => ({
//     components: { FwbInputSearchCustom },
//     setup() {
//       return { args }
//     },
//     template: `
//       <FwbInputSearchCustom v-bind="args">
//         <template #validationMessage>
//         <span>This field is required</span>
//         </template>
//       </FwbInputSearchCustom>
//     `
//   }),
//   args: {
//     tableConfig: [
//       {
//         key: 'name',
//         title: 'Name',
//         tableConfig: {
//           order: 1,
//           show: true,
//           width: 'auto'
//         }
//       }
//     ],
//     validationStatus: 'error',
//     error: 'This field is required'
//   }
// }

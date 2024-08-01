import type { Meta, StoryObj } from '@storybook/vue3'
import FwbTabs from '@/components/FwbTabs/FwbTabs.vue'
import FwbTab from '@/components/FwbTabs/FwbTab.vue'
import Filter from '@/components/Filter/CustomFilter.vue'

import { computed, ref } from 'vue'
import { Tabs } from 'flowbite'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * Use the input field to start accepting data from the user.
 *
 * The input field is an important part of the form element that can be used to create interactive controls to accept data from the user based on multiple input types, such as text, email, URL, and more.
 */
const meta = {
  title: 'Example/FilterX',
  component: Filter,
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
  },
  args: {    
  }
} satisfies Meta<typeof Filter>

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
  render: (args) => ({
    components: {Filter, FwbTabs, FwbTab},
    methods: {
           
    },
    setup() {
      const tabs = [
        {
          icon: 'test',
          title: 'Underline 1'
        },
        {
          icon: 'test',
          title: 'Underline 2'
        },
        {
          icon: 'test',
          title: 'Underline 3'
        }
      ]

      const tabName = ref(tabs[0].title)

      return { args, tabs, tabName }
    },
    template: ` 
     <Filter >
          <FwbTabs v-model="tabName" v-bind="args"   >
                <FwbTab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :name="tab.title"
                    :title="tab.title"
                    :icon="tab.icon"                    
                    class="h-full px-4"
                >
                    <p> Content for tab </p>
                </FwbTab>
            </FwbTabs>
     </Filter>   
    `
  }),
  args: {   
    variant: 'underline'
  }
}


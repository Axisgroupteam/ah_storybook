import type { Meta, StoryObj } from '@storybook/vue3'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbTabs from '@/components/FwbTabs/FwbTabs.vue'
import FwbTab from '@/components/FwbTabs/FwbTab.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'

/**
 * Use these responsive tabs components to create a secondary navigational hierarchy for your website or toggle content inside a container.
 *
 * The tabs component can be used either as an extra navigational hierarchy complementing the main navbar or you can also use it to change content inside a container just below the tabs.
 */
const meta = {
  title: 'Example/TabsX',
  component: FwbTabs,
  // decorators: [()=>({
  //   template: `
  //   <div
  //       class="bg-white dark:bg-neutral-800 rounded-lg mb-0 w-full h-full flex grow flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  //   >
  //       <story class="w-full pt-4 h-full"/>
  //   </div>
  //   `
  // })],
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
      <div class="p-4">
    
        <story />
      
      </div>`
    })
  ],
  argTypes: {
    variant: { control: 'select', options: ['default', 'underline', 'pills'] },
    directive: { control: 'select', options: ['if', 'show'] }
  }
} satisfies Meta<typeof FwbTabs>

export default meta
type Story = StoryObj<typeof meta>

/**
 * This is an example of the tabs component with an underline style where you can use a SVG powered icon and an indicator counter to complement the text within the navigational tabs.
 */
export const Underline: Story = {
  render: (args) => ({
    components: { FwbTabs, FwbTab },
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
          <FwbTabs v-model="tabName" v-bind="args"   >
                <FwbTab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :name="tab.title"
                    :title="tab.title"
                    :icon="tab.icon"
                    :disabled="index === 2"
                    class="h-full px-4"
                >
                    
                </FwbTab>
            </FwbTabs>
      `
  }),
  args: {
    variant: 'underline'
  }
}

/**
 * If you want to use pills as a style for the tabs component you can do so by using this example.
 */
export const Pills: Story = {
  render: (args) => ({
    components: { FwbTabs, FwbTab },
    setup() {
      const tabs = [
        {
          icon: 'test',
          title: 'Pills 1'
        },
        {
          icon: 'test',
          title: 'Pills 2'
        },
        {
          icon: 'test',
          title: 'Pills 3'
        }
      ]

      const tabName = ref(tabs[0].title)

      return { args, tabs, tabName }
    },
    template: `            
          <FwbTabs v-model="tabName" v-bind="args"  >
                <FwbTab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :name="tab.title"
                    :title="tab.title"
                    :disabled="index === 2"
                    class="h-full px-4 "
                >
                 
                </FwbTab>
            </FwbTabs>
      `
  }),
  args: {
    variant: 'pills'
  }
}

/**
 * Use the dynamic tabs component to interactively show and hide the content below the tabs based on the currently active tab item.
 */
export const Interactive: Story = {
  render: (args) => ({
    components: { FwbTabs, FwbTab },
    setup() {
      const tabs = [
        {
          icon: 'test',
          title: 'Pills 1'
        },
        {
          icon: 'test',
          title: 'Pills 2'
        },
        {
          icon: 'test',
          title: 'Pills 3'
        }
      ]

      const tabName = ref(tabs[0].title)

      return { args, tabs, tabName }
    },
    template: `            
          <FwbTabs v-model="tabName" v-bind="args"   >
                <FwbTab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :name="tab.title"
                    :title="tab.title"
                    :disabled="index === 2"
                    class="h-full px-4"
                >
                    <div class="w-full h-full flex flex-col text-center justify-center pb-4 dark:text-white">
                        <p>Content of Tab {{index + 1}}</p>
                   
                    </div>
                    
                </FwbTab>
            </FwbTabs>
      `
  }),
  args: {
    variant: 'pills'
  }
}

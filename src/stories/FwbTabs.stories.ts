import type { Meta, StoryObj } from '@storybook/vue3'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbTabs from '@/components/FwbTabs/FwbTabs.vue'
import FwbTab from '@/components/FwbTabs/FwbTab.vue'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'


const meta = {
  title: 'Example/FwbTabs',
  component: FwbTabs,
  decorators: [()=>({
    template: `
    <div
        class="bg-white dark:bg-neutral-800 rounded-lg mb-0 w-full h-full flex grow flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
        <story class="w-full pt-4 h-full"/>
    </div>
    `
  })],
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'underline', 'pills'] },
    directive: { control: 'select', options: ['if', 'show'] },
    
  }
} satisfies Meta<typeof FwbTabs>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
    render: (args) => ({
      components: { FwbTabs, FwbTab },
      setup() {
        const tabs = [
            {
              icon: "test",
              title: "Tab 1",
    
            },
            {
              icon: "test",
              title: "Tab 2",
    
            },
            {
                icon: "test",
                title: "Tab 3",
      
              },
          ];

          const tabName = ref(tabs[0].title)

        return { args, tabs, tabName }
      },
      template: `            
          <FwbTabs v-bind="args" v-model="tabName"   >
                <FwbTab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :name="tab.title"
                    :title="tab.title"
                    :icon="tab.icon"
                    class="h-full px-4"
                >
                    <div class="w-full h-12 flex justify-center dark:text-white">
                        <p>Content of Tab {{index + 1}}</p>
                    </div>
                </FwbTab>
            </FwbTabs>
      `
    }),
    args: {
      variant: 'default',
    }
}

export const Underline: Story = {
    render: (args) => ({
      components: { FwbTabs, FwbTab },
      setup() {
        const tabs = [
            {
              icon: "test",
              title: "Underline 1",
    
            },
            {
              icon: "test",
              title: "Underline 2",
    
            },
            {
                icon: "test",
                title: "Underline 3",
      
              },
          ];

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
                    class="h-full px-4"
                >
                    <div class="w-full h-12 flex justify-center dark:text-white">
                        <p>Content of Tab {{index + 1}}</p>
                    </div>
                </FwbTab>
            </FwbTabs>
      `
    }),
    args: {
      variant: 'underline',
    }
}

export const Pills: Story = {
    render: (args) => ({
      components: { FwbTabs, FwbTab },
      setup() {
        const tabs = [
            {
              icon: "test",
              title: "Pills 1",
    
            },
            {
              icon: "test",
              title: "Pills 2",
    
            },
            {
                icon: "test",
                title: "Pills 3",
      
              },
          ];

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
                    :icon="tab.icon"
                    class="h-full px-4"
                >
                    <div class="w-full h-12 flex justify-center dark:text-white">
                        <p>Content of Tab {{index + 1}}</p>
                    </div>
                </FwbTab>
            </FwbTabs>
      `
    }),
    args: {
      variant: 'pills',
    }
}


export const VShowDirective: Story = {
    render: (args) => ({
      components: { FwbTabs, FwbTab },
      setup() {
        const tabs = [
            {
              icon: "test",
              title: "Pills 1",
    
            },
            {
              icon: "test",
              title: "Pills 2",
    
            },
            {
                icon: "test",
                title: "Pills 3",
      
              },
          ];

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
                    class="h-full px-4"
                >
                    <div class="w-full h-full flex flex-col text-center justify-center pb-4 dark:text-white">
                        <p>Content of Tab {{index + 1}}</p>
                        <span>Shows the content, using v-show instead of v-if</span>
                    </div>
                    
                </FwbTab>
            </FwbTabs>
      `
    }),
    args: {
      variant: 'pills',
      directive: 'show'
    }
}
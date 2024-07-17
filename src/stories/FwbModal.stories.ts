import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbModal from '@/components/FwbModal/FwbModal.vue'
import FwbButton from '@/components/FwbButton/FwbButton.vue'
import FwbToggle from '@/components/FwbToggle/FwbToggle.vue'

/**
 * Use the modal component to show interactive dialogs and notifications to your website users available in multiple sizes.
 *
 * The modal component can be used as an interactive dialog on top of the main content area of the website to show notifications and gather information using form elements from your website users.
 */
const meta = {
  title: 'Example/ModalX',
  component: FwbModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']
    },
    notEscapable: {
      control: 'boolean'
    },
    persistent: {
      control: 'boolean'
    }
  },
  decorators: [
    () => ({
      template: `
    <div class="w-full h-[500px] flex justify-center p-4">
        <div class="w-full">
            <story />
        </div>
    </div>
    `
    })
  ],
  args: {}
} satisfies Meta<typeof FwbModal>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Use this example of modal component as an interactive dialog, show notifications and gather information using form elements.
 */
export const Default: Story = {
  render: (args) => ({
    components: { FwbModal, FwbButton },
    setup() {
      const isModalVisible = ref(false)

      const toggleModal = () => {
        isModalVisible.value = !isModalVisible.value
      }

      const closeModal = () => {
        isModalVisible.value = false
      }

      return { args, isModalVisible, toggleModal, closeModal }
    },
    template: `
        <div>
            <FwbButton @click="toggleModal">Toggle Modal</FwbButton>
            
            <FwbModal v-if="isModalVisible" @close="closeModal">
                <template #header>
                    Terms of Service
                </template>
                <template #body>
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.

                    The European Union's General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </template>
                <template #footer>
                    <div class="flex justify-start items-center gap-3">
                        <FwbButton color="primary" @click="closeModal">
                            I accept
                        </FwbButton>
                        <FwbButton color="terciary" @click="closeModal">
                            Decline
                        </FwbButton>
                    </div>                
                </template>
            </FwbModal>            
        </div>
    `
  }),
  args: {}
}

/**
 * You can use four different modal sizing options starting from small to extra large, but keep in mind that the width of these modals will remain the same when browsing on smaller devices.
 */
export const Sizes: Story = {
  render: () => ({
    components: { FwbModal, FwbButton },
    setup() {
      const isModalVisible = ref(false)
      const currentSize = ref('md')
      const sizes = ['sm', 'md', 'xl', '2xl', '5xl']

      const openModal = (size: string) => {
        currentSize.value = size
        isModalVisible.value = true
      }

      const closeModal = () => {
        isModalVisible.value = false
      }

      return { isModalVisible, currentSize, sizes, openModal, closeModal }
    },
    template: `
          <div>
              <div class="flex flex-wrap gap-2 mb-4">
                  <FwbButton 
                      v-for="size in sizes" 
                      :key="size" 
                      @click="openModal(size)"
                  >
                      Toogle Modal ({{ size }})
                  </FwbButton>
              </div>
              
              <FwbModal v-if="isModalVisible" @close="closeModal" :size="currentSize">
                  <template #header>
                      Modal Size {{ currentSize }}
                  </template>
                  <template #body>
                      This is a modal of size {{ currentSize }}.
                      You can open different sizes using the buttons.
                  </template>
                  <template #footer>
                      <FwbButton color="primary" @click="closeModal">
                          Close
                      </FwbButton>
                  </template>
              </FwbModal>            
          </div>
      `
  })
}

/**
 * Use this example whether or not you want to close the modal component with the Esc key.
 */
export const Escapable: Story = {
  render: (args) => ({
    components: { FwbModal, FwbButton, FwbToggle },
    setup() {
      const isModalVisible = ref(false)
      const isEscapable = ref(true)

      const toggleModal = () => {
        isModalVisible.value = !isModalVisible.value
      }

      const closeModal = () => {
        isModalVisible.value = false
      }

      return { args, isModalVisible, isEscapable, toggleModal, closeModal }
    },
    template: `
          <div>
              <div class="flex gap-2 mb-4">
                  <FwbButton @click="toggleModal">
                      Toggle Modal {{ isEscapable ? '(Escapable)' : '(Not Escapable)' }}
                  </FwbButton>
                  <FwbToggle v-model="isEscapable" :label="isEscapable ? 'Escapable' : 'Not Escapable'" />                                      
              </div>
              
              <FwbModal 
                  v-if="isModalVisible" 
                  @close="closeModal" 
                  :not-escapable="!isEscapable"
              >
                  <template #header>
                      Modal {{ isEscapable ? 'Escapable' : 'Not Escapable' }}
                  </template>
                  <template #body>
                      <p>This modal is {{ isEscapable ? 'escapable' : 'not escapable' }}.</p>
                      <p v-if="isEscapable">
                          You can close this modal by pressing the Esc key.
                      </p>
                      <p v-else>
                          This modal cannot be closed by pressing the Esc key.
                          You must use the close button.
                      </p>
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
    notEscapable: false
  }
}

/**
 * Use the following example to prevent the modal from closing when clicking outside of it. This can be used with situations where you want to force the user to choose an option such as a cookie notice or when taking a survey.
 */
export const Persist: Story = {
  render: (args) => ({
    components: { FwbModal, FwbButton },
    setup() {
      const isModalVisible = ref(false)

      const toggleModal = () => {
        isModalVisible.value = !isModalVisible.value
      }

      const closeModal = () => {
        isModalVisible.value = false
      }

      return { args, isModalVisible, toggleModal, closeModal }
    },
    template: `
            <div>
                <div class="flex gap-2 mb-4">
                    <FwbButton @click="toggleModal">
                        Toggle Modal
                    </FwbButton>                    
                </div>
                
                <FwbModal 
                    v-if="isModalVisible" 
                    @close="closeModal" 
                    persistent
                >
                    <template #header>
                        Modal
                    </template>
                    <template #body>
                        This modal cannot be closed by pressing the Esc key or clicking outside.
                        You must use the close button.
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
    persistent: true
  }
}

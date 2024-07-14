import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import FwbGallery from '@/components/FwbGallery/FwbGallery.vue'
import FwbModal from '@/components/FwbModal/FwbModal.vue'
import FwbCarousel from '@/components/FwbCarousel/FwbCarousel.vue'

const meta = {
  title: 'Example/FwbGallery',
  component: FwbGallery,
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of image objects'
    },
    canDelete: {
      control: 'boolean',
      description: 'Enable delete functionality'
    }
  },
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
  args: {
    images: [
      {
        alt: 'Picture 1',
        src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg'
      },
      {
        alt: 'Picture 2',
        src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg'
      },
      {
        alt: 'Picture 3',
        src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg'
      },
      {
        alt: 'Picture 4',
        src: 'https://flowbite.com/docs/images/carousel/carousel-4.svg'
      },
      {
        alt: 'Picture 5',
        src: 'https://flowbite.com/docs/images/carousel/carousel-5.svg'
      },
      {
        alt: 'Picture 6',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720719457584-64b6ca24999f8014e124.jpg'
      },
      {
        alt: 'Picture 7',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720719504838-8da03c758ad6a891619e.jpg'
      },
      {
        alt: 'Picture 8',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720808294556-3f4da4d6960ced07cd46.jpg'
      },
      {
        alt: 'Picture 9',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720795801113-0e8c3fe4ff4321dadbed.jpg'
      },
      {
        alt: 'Picture 10',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720806165111-250b1b33710a2f22f537.jpg'
      },
      {
        alt: 'Picture 11',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720807120272-bac556c40edf6d6642c8.jpg'
      },
      {
        alt: 'Picture 12',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720801658175-cb475655bb489cb2dd42.jpg'
      },
      {
        alt: 'Picture 13',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720724728917-0e96e009d2a5abfabf6c.jpg'
      },
      {
        alt: 'Picture 14',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720807894535-3b88e6656a3e44e3f370.jpg'
      },
      {
        alt: 'Picture 15',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720797648155-8416fcabe729ba50d0dd.jpg'
      },
      {
        alt: 'Picture 16',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720809338358-beab8239f8f8eef4c869.jpg'
      },
      {
        alt: 'Picture 17',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720806817491-fc7fa6da5f07e7e4756b.jpg'
      },
      {
        alt: 'Picture 18',
        src: 'https://axistrucksready.nyc3.digitaloceanspaces.com/uploads/2024/07/1720801579909-7aca1454b87dcb8631ca.jpg'
      }
    ],
    canDelete: false
  }
} satisfies Meta<typeof FwbGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { FwbGallery, FwbModal, FwbCarousel },
    setup() {
      const showModal = ref(false)
      const currentImageIndex = ref(0)

      const openModal = (index: number) => {
        currentImageIndex.value = index
        showModal.value = true
      }

      const closeModal = () => {
        showModal.value = false
      }

      const updateCurrentIndex = (index: number) => {
        currentImageIndex.value = index
      }

      return { args, showModal, openModal, closeModal, currentImageIndex, updateCurrentIndex }
    },
    template: `
      <div>
        <FwbGallery 
          v-bind="args"           
          @click-image="openModal"
        />
        <FwbModal v-if="showModal" size="screen" @close="closeModal" clsass="h-full">
          <template #header>
            {{args.images[currentImageIndex].alt}}            
          </template>
          <template #body>                      
          
          <FwbCarousel               
              :pictures="args.images" 
              @update-index="updateCurrentIndex"
            />

            
          </template>                    
        </FwbModal>
      </div>
    `
  })
}

export const WithDelete: Story = {
  render: (args) => ({
    components: { FwbGallery, FwbModal, FwbCarousel },
    setup() {
      const showModal = ref(false)
      const currentImageIndex = ref(0)

      const onDeleteImage = (index: number) => {
        args.images.splice(index, 1)
      }

      const openModal = (index: number) => {
        currentImageIndex.value = index
        showModal.value = true
      }

      const closeModal = () => {
        showModal.value = false
      }

      const updateCurrentIndex = (index: number) => {
        currentImageIndex.value = index
      }

      return {
        args,
        onDeleteImage,
        showModal,
        currentImageIndex,
        openModal,
        closeModal,
        updateCurrentIndex
      }
    },
    template: `
      <div>
        <FwbGallery 
          v-bind="args" 
          @deleteImage="onDeleteImage"
          @click-image="openModal"
          can-delete
        />
        <FwbModal v-if="showModal" @close="closeModal" size="screen">
          <template #header>
            {{args.images[currentImageIndex].alt}}
          </template>
          <template #body>
            <FwbCarousel 
              class="!h-full"
              :pictures="args.images" 
              @update-index="updateCurrentIndex"
            />
          </template>          
          
        </FwbModal>
      </div>
    `
  })
}

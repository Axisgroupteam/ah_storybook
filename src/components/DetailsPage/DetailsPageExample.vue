<template>
  <div
    class="flex flex-col max-h-screen h-screen w-full gap-0 bg-[#F5F5F5] dark:bg-neutral-900 justify-center items-center overflow-hidden"
  >
    <fwb-navbar ref="navbar" class="w-full">
      <template #left-corner>
        <fwb-button class="border-0" color="secondary" square>
          <IconWrapper name="arrow-left" size="20" />
        </fwb-button>
      </template>
      <div class="w-full flex gap-2"></div>
    </fwb-navbar>
    <div
      ref="contentWrapper"
      class="h-full flex flex-col justify-start items-center w-full py-4 gap-4 overflow-hidden px-4"
    >
      <div class="w-full flex gap-4 justify-between max-w-3xl">
        <FwbButton
          color="secondary"
          square
          class="w-fit"
          @click="$emit('prev')"
          :disabled="props.isLoading"
        >
          <IconWrapper name="chevron-left" size="14" />
        </FwbButton>
        <span
          class="text-xl w-full text-center bg-transparent dark:text-white font-semibold leading-[30px]"
          >Example Details</span
        >
        <FwbButton
          color="secondary"
          square
          class="w-fit"
          @click="$emit('next')"
          :disabled="props.isLoading"
        >
          <IconWrapper name="chevron-right" size="14" />
        </FwbButton>
      </div>
      <div
        class="max-w-3xl w-full bg-white dark:bg-neutral-800 rounded-lg shadow-md flex flex-col"
        :style="{ maxHeight: `${containerHeight}px` }"
      >
        <PerfectScrollbar class="flex-grow">
          <div v-if="!props.isLoading" class="text-neutral-900 dark:text-white p-5">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col">
                <span class="text-neutral-500 dark:text-neutral-400">Full Name</span>
                <span class="text-neutral-900 dark:text-white font-medium">
                  {{ props.item.fullName || '-' }}
                </span>
              </div>

              <div class="flex flex-col">
                <span class="text-neutral-500 dark:text-neutral-400">Phone</span>
                <span class="text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                  <IconWrapper name="phone" size="14" />
                  {{ props.item.phone || '-' }}
                </span>
              </div>

              <div class="flex flex-col">
                <span class="text-neutral-500 dark:text-neutral-400">Email</span>
                <span class="text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                  <IconWrapper name="envelope" size="14" />
                  {{ props.item.email || '-' }}
                </span>
              </div>

              <div class="flex flex-col">
                <span class="text-neutral-500 dark:text-neutral-400">Status</span>
                <FwbBadge :type="props.item.isActive ? 'green' : 'red'">
                  {{ props.item.isActive ? 'Active' : 'Inactive' }}
                </FwbBadge>
              </div>
            </div>
          </div>
          <div v-else class="w-full h-full flex justify-center items-center p-5">
            <FwbSpinner color="red" size="12" />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FwbButton from '../FwbButton/FwbButton.vue'
import ArrowIcon from '@/assets/flowbite_icons/arrow-left.svg'
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import IconWrapper from '@/components/IconWrapper.vue'
import FwbSpinner from '../FwbSpinner/FwbSpinner.vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import BaseNotification from '@/components/Toast/BaseNotification.vue'
import { useToast } from 'vue-toastification'
import FwbNavbar from '../FwbNavbar/FwbNavbar.vue'
import FwbBadge from '../FwbBadge/FwbBadge.vue'

const props = defineProps<{
  item: any
  isLoading: boolean
}>()

const emit = defineEmits(['prev', 'next'])

const toast = useToast()

const navbar = ref<HTMLElement | null>(null)
const contentWrapper = ref(null)
const windowHeight = ref(window.innerHeight)

const containerHeight = computed(() => {
  if (!navbar.value || !contentWrapper.value) return 0
  const navbarHeight = navbar.value.$el.offsetHeight
  const wrapperRect = contentWrapper.value.getBoundingClientRect()
  const topOffset = wrapperRect.top
  const bottomPadding = 20 // Ajusta según sea necesario
  return windowHeight.value - navbarHeight - topOffset - bottomPadding
})

onMounted(() => {
  const updateHeight = () => {
    windowHeight.value = window.innerHeight
  }

  window.addEventListener('resize', updateHeight)

  // Limpieza del evento al desmontar el componente
  onUnmounted(() => {
    window.removeEventListener('resize', updateHeight)
  })
})

const showToast = (status: string, message: string) => {
  const content = {
    component: BaseNotification,
    props: { status: status, content: message }
  }
  toast(content)
}
</script>

<style scoped></style>

<template>
  <div class="relative overflow-hidden rounded-lg" style="min-height: 200px">
    <div
      class="flex transition-transform duration-700 ease-in-out h-56 md:h-96"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(picture, index) in pictures" :key="index" class="w-full flex-shrink-0">
        <img :src="picture.src" :alt="picture.alt" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Indicators -->
    <div
      v-if="!noIndicators"
      class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3"
    >
      <FwbIndicator
        v-for="(_, index) in pictures"
        :key="index"
        @click="goToSlide(index)"
        class="cursor-pointer hover:bg-white dark:hover:bg-neutral-900"
        color="carousel"
        :class="
          currentIndex === index
            ? 'bg-white dark:bg-neutral-900'
            : 'bg-white/50 dark:bg-neutral-900/50'
        "
      ></FwbIndicator>
    </div>

    <!-- Controls -->
    <template v-if="!noControls">
      <FwbButton
        color="secondary"
        pill
        square
        @click="previousSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 !bg-white/50 dark:!bg-neutral-900/50 border-0 !ring-neutral-300 dark:!ring-neutral-800"
      >
        <!-- Previous button SVG -->
        <span>
          <component
            class="text-white dark:text-neutral-900"
            :is="getFBIcon('chevron-left-carousel')"
          />
          <svg
            v-if="false"
            class="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          <span class="hidden">Previous</span>
        </span>
      </FwbButton>
      <FwbButton
        color="secondary"
        pill
        square
        @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 !bg-white/50 border-0 dark:!bg-neutral-900/50 !ring-neutral-300 dark:!ring-neutral-800"
      >
        <!-- Next button SVG -->
        <span>
          <component
            class="text-white dark:text-neutral-900"
            :is="getFBIcon('chevron-right-carousel')"
          />

          <svg
            v-if="false"
            class="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5l7 7-7 7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          <span class="hidden">Next</span>
        </span>
      </FwbButton>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import FwbButton from '../FwbButton/FwbButton.vue'
import FwbIndicator from '../FwbIndicators/FwbIndicator.vue'
import { getFBIcon } from '@/utils/getAssets'

interface PictureItem {
  src: string
  alt: string
}

const props = withDefaults(
  defineProps<{
    pictures: PictureItem[]
    noIndicators?: boolean
    noControls?: boolean
    slide?: boolean
    slideInterval?: number
  }>(),
  {
    pictures: () => [],
    noIndicators: false,
    noControls: false,
    slide: false,
    slideInterval: 3000
  }
)

const currentIndex = ref(0)
let intervalId: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.pictures.length
}

const previousSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.pictures.length) % props.pictures.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoSlide = () => {
  if (props.slide && props.pictures.length > 1) {
    intervalId = setInterval(nextSlide, props.slideInterval)
  }
}

const stopAutoSlide = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

watch(
  () => props.slide,
  (newValue) => {
    if (newValue) {
      startAutoSlide()
    } else {
      stopAutoSlide()
    }
  }
)

onMounted(() => {
  if (props.slide) {
    startAutoSlide()
  }
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
<style scoped></style>

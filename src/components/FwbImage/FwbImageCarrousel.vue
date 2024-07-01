<template>
  <VueEasyLightbox
    :key="indexImage"
    :visible="openImage"
    :imgs="arrayImages"
    :index="indexImage"
    :mask-closable="false"
    @hide="onHide"
  >
    <template v-slot:prev-btn="{ prev }">
      <button class="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4" @click="prev">
        <span
          class="h-12 w-12 flex items-center justify-center bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 rounded-full border-neutral-200 dark:border-neutral-600 text-neutral-900 rotate-180 transition ease-in-out delay-150 duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2684_6621)">
              <mask
                id="mask0_2684_6621"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="white" />
              </mask>
              <g mask="url(#mask0_2684_6621)">
                <path
                  d="M11.6663 10.011L11.3521 10.3506L5.87486 16.2707C5.70896 16.45 5.59213 16.6831 5.54448 16.9421C5.49682 17.2011 5.52157 17.4693 5.61428 17.7112C5.70692 17.953 5.86146 18.1535 6.05265 18.2916C6.2432 18.4292 6.46273 18.4999 6.68364 18.5L11.6663 10.011ZM11.6663 10.011L11.3521 9.67148M11.6663 10.011L11.3521 9.67148M11.3521 9.67148L5.87481 3.75136L5.87486 3.75131M11.3521 9.67148L5.87486 3.75131M5.87486 3.75131L5.86886 3.74504M5.87486 3.75131L5.86886 3.74504M5.86886 3.74504C5.75584 3.62706 5.66372 3.48382 5.59969 3.3227C5.53564 3.16154 5.50147 2.98694 5.50005 2.80939C5.49862 2.63185 5.52997 2.45654 5.59148 2.29404C5.65298 2.13157 5.7429 1.98641 5.85419 1.86612C5.96541 1.74591 6.09549 1.65316 6.23569 1.59116C6.37577 1.52922 6.52432 1.49865 6.67308 1.50005C6.82184 1.50144 6.97 1.5348 7.10926 1.59946C7.24865 1.66418 7.37744 1.75952 7.48689 1.882L7.48684 1.88205M5.86886 3.74504L7.48684 1.88205M7.48684 1.88205L7.49271 1.88841M7.48684 1.88205L7.49271 1.88841M7.49271 1.88841L14.1459 9.07951C14.3688 9.32044 14.5 9.65492 14.5 10.011C14.5 10.3672 14.3688 10.7017 14.1459 10.9426L7.49271 18.1337L7.49266 18.1337M7.49271 1.88841L7.49266 18.1337M7.49266 18.1337C7.27107 18.3733 6.97921 18.4999 6.68388 18.5L7.49266 18.1337Z"
                  fill="#171717"
                  stroke="#171717"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_2684_6621">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>
    </template>

    <template v-slot:next-btn="{ next }">
      <button class="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4" @click="next">
        <span
          class="h-12 w-12 flex items-center justify-center bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-full border-neutral-200 dark:border-neutral-600 text-neutral-900 transition ease-in-out delay-150 duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2684_6621)">
              <mask
                id="mask0_2684_6621"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <rect width="20" height="20" fill="white" />
              </mask>
              <g mask="url(#mask0_2684_6621)">
                <path
                  d="M11.6663 10.011L11.3521 10.3506L5.87486 16.2707C5.70896 16.45 5.59213 16.6831 5.54448 16.9421C5.49682 17.2011 5.52157 17.4693 5.61428 17.7112C5.70692 17.953 5.86146 18.1535 6.05265 18.2916C6.2432 18.4292 6.46273 18.4999 6.68364 18.5L11.6663 10.011ZM11.6663 10.011L11.3521 9.67148M11.6663 10.011L11.3521 9.67148M11.3521 9.67148L5.87481 3.75136L5.87486 3.75131M11.3521 9.67148L5.87486 3.75131M5.87486 3.75131L5.86886 3.74504M5.87486 3.75131L5.86886 3.74504M5.86886 3.74504C5.75584 3.62706 5.66372 3.48382 5.59969 3.3227C5.53564 3.16154 5.50147 2.98694 5.50005 2.80939C5.49862 2.63185 5.52997 2.45654 5.59148 2.29404C5.65298 2.13157 5.7429 1.98641 5.85419 1.86612C5.96541 1.74591 6.09549 1.65316 6.23569 1.59116C6.37577 1.52922 6.52432 1.49865 6.67308 1.50005C6.82184 1.50144 6.97 1.5348 7.10926 1.59946C7.24865 1.66418 7.37744 1.75952 7.48689 1.882L7.48684 1.88205M5.86886 3.74504L7.48684 1.88205M7.48684 1.88205L7.49271 1.88841M7.48684 1.88205L7.49271 1.88841M7.49271 1.88841L14.1459 9.07951C14.3688 9.32044 14.5 9.65492 14.5 10.011C14.5 10.3672 14.3688 10.7017 14.1459 10.9426L7.49271 18.1337L7.49266 18.1337M7.49271 1.88841L7.49266 18.1337M7.49266 18.1337C7.27107 18.3733 6.97921 18.4999 6.68388 18.5L7.49266 18.1337Z"
                  fill="#171717"
                  stroke="#171717"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_2684_6621">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>
    </template>
    <template #loading="{ loading }">
      <LoadingCircle />
    </template>
  </VueEasyLightbox>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import LoadingCircle from '@/components/Share/LoadingCircle.vue'

const emit = defineEmits(['closed'])

defineProps({
  openImage: { type: Boolean, default: false },
  arrayImages: {
    type: Array,
    required: true
    //default: () => []
  },
  indexImage: {
    type: Number,
    default: 0
  }
})

const onHide = () => {
  emit('closed')
}
</script>

<style scoped></style>

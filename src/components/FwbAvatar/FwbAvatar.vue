<template>
  <div class="h-64 mb-auto">
    <button
      ref="pflButton"
      :class="_class"
      class="block focus:ring-[#E5E5E5] rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:ring-[#525252] dark:focus:text-white ms-auto"
      @click="active"
    >
      <div class="relative">
        <div :class="avatarPlaceholderWrapperClasses">
          <img
            v-if="img && !imageError"
            :alt="alt"
            :class="avatarClasses"
            :src="img"
            @error="setImageError"
          />
          <div v-else-if="!initials && hasPlaceholder" :class="avatarPlaceholderClasses">
            <slot name="placeHolder" />
          </div>
          <svg
            v-else-if="!img && !initials"
            :class="avatarPlaceholderClasses"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              fill-rule="evenodd"
            />
          </svg>
          <div v-else :class="avatarPlaceholderInitialsClasses" class="dark:text-neutral-800">
            {{ initials }}
          </div>
        </div>
        <span v-if="status" :class="avatarDotClasses" :data-pos="statusPosition" />
      </div>
    </button>
    <div
      v-if="_active"
      class="cursor-pointer transition duration-100 z-10 flex fixed flex-col border-[1px] shadow-md rounded-lg w-[228px] bg-white dark:bg-neutral-700 top-[77px] right-[20px] dark:border-neutral-600 border-[#E5E5E5]"
      @mouseleave="handleLeave"
    >
      <div
        class="w-full flex gap-3 dark:hover:text-white hover:text-neutral-900 dark:text-neutral-300 text-neutral-500 items-center px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-t-lg"
      >
        <div
          class="cursor-pointer transition duration-100 z-11 flex fixed flex-col border-[1px] shadow-md rounded-lg w-[228px] bg-white dark:bg-neutral-700 top-[77px] right-[20px] dark:border-neutral-600 border-[#E5E5E5]"
        >
          <div
            class="w-full flex gap-3 dark:text-neutral-300 cursor-auto text-neutral-500 items-center px-4 py-2 rounded-t-lg"
          >
            <div class="flex-col">
              <h1 class="text-sm leading-[21px] font-semibold text-neutral-900 dark:text-white">
                {{ fullName }}
              </h1>
              <span class="text-sm font-normal leading-[21px]">{{ email }}</span>
            </div>
          </div>
          <div class="w-full h-[1px] bg-[#E5E5E5] dark:bg-neutral-600"></div>
          <!-- @click="goProfile" -->
          <div
            class="w-full flex gap-3 dark:hover:text-white hover:text-neutral-900 dark:text-neutral-300 text-neutral-500 items-center px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-600"
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2705_36071)">
                <mask
                  id="mask0_2705_36071"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="14"
                  height="15"
                >
                  <rect y="0.5" width="14" height="14" fill="white" />
                </mask>
                <g mask="url(#mask0_2705_36071)">
                  <path
                    d="M7 7.13158C9.00734 7.13158 10.6346 5.64705 10.6346 3.81579C10.6346 1.98453 9.00734 0.5 7 0.5C4.99266 0.5 3.36538 1.98453 3.36538 3.81579C3.36538 5.64705 4.99266 7.13158 7 7.13158Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.21154 7.86842H5.78846C4.71779 7.86959 3.69134 8.25812 2.93425 8.94879C2.17717 9.63946 1.75128 10.5759 1.75 11.5526V13.7632C1.75 13.9586 1.8351 14.146 1.98657 14.2842C2.13804 14.4224 2.34348 14.5 2.55769 14.5H11.4423C11.6565 14.5 11.862 14.4224 12.0134 14.2842C12.1649 14.146 12.25 13.9586 12.25 13.7632V11.5526C12.2487 10.5759 11.8228 9.63946 11.0657 8.94879C10.3087 8.25812 9.28221 7.86959 8.21154 7.86842Z"
                    fill="currentColor"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_2705_36071">
                  <rect width="14" height="14" fill="currentColor" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
            <span class="text-sm font-normal leading-[21px]">Profile</span>
          </div>
          <div class="w-full h-[1px] bg-[#E5E5E5] dark:bg-neutral-600"></div>
          <!-- @click="authStore.logout" -->
          <div
            class="w-full dark:hover:text-white hover:text-neutral-900 text-neutral-500 dark:text-neutral-300 flex gap-3 items-center px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-b-lg"
          >
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2705_36076)">
                <mask
                  id="mask0_2705_36076"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="14"
                  height="15"
                >
                  <rect y="0.5" width="14" height="14" fill="white" />
                </mask>
                <g mask="url(#mask0_2705_36076)">
                  <path
                    d="M13.9337 7.16575C13.8891 7.05813 13.8252 6.96187 13.7438 6.8805L10.2444 3.38138C9.90227 3.03925 9.34923 3.03925 9.00708 3.38138C8.66493 3.7235 8.66493 4.2765 9.00708 4.61862L11.0136 6.625H3.50027C3.01636 6.625 2.62521 7.017 2.62521 7.5C2.62521 7.983 3.01636 8.375 3.50027 8.375H11.0136L9.00708 10.3814C8.66493 10.7235 8.66493 11.2765 9.00708 11.6186C9.17772 11.7893 9.40173 11.875 9.62575 11.875C9.84977 11.875 10.0738 11.7893 10.2444 11.6186L13.7438 8.1195C13.8252 8.039 13.8891 7.94187 13.9337 7.83425C14.0221 7.62075 14.0221 7.37925 13.9337 7.16575Z"
                    fill="#EF4444"
                  />
                  <path
                    d="M5.25041 12.75H2.62521C2.14217 12.75 1.75014 12.3571 1.75014 11.875V3.125C1.75014 2.64287 2.14217 2.25 2.62521 2.25H5.25041C5.73432 2.25 6.12548 1.858 6.12548 1.375C6.12548 0.892 5.73432 0.5 5.25041 0.5H2.62521C1.17784 0.5 0 1.67775 0 3.125V11.875C0 13.3223 1.17784 14.5 2.62521 14.5H5.25041C5.73432 14.5 6.12548 14.108 6.12548 13.625C6.12548 13.142 5.73432 12.75 5.25041 12.75Z"
                    fill="#EF4444"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_2705_36076">
                  <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
            <span class="text-sm text-red-500 font-normal leading-[21px]">Log Out</span>
          </div>
        </div>
      </div>
    </div>    
  </div>

</template>

<script lang="ts" setup>
import { computed, type PropType, ref, toRefs, useSlots } from 'vue'
import type { AvatarSize, AvatarStatus, AvatarStatusPosition } from './types'
import { useAvatarClasses } from './composables/useAvatarClasses'
import { useMergeClasses } from '@/composables/userMergeClasses'
import { onClickOutside } from '@vueuse/core'
import { useDotsActions } from './composables/UseDotsActions'
const imageError = ref(false)

function setImageError() {
  imageError.value = true
}

const slots = useSlots()
const hasPlaceholder = computed(() => slots.placeholder)

const props = defineProps({
  fullName: {
    type: String,
    default: 'Master Employee',
  },
  firstName: {
    type: String,
    default: 'Master',
  },
  lastName: {
    type: String,
    default: 'Employee',
  },
  email: {
    type: String,
    default: 'contact@detooo.com',
  },
  alt: {
    type: String,
    default: 'Avatar',
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<AvatarSize>,
    default: 'md',
  },
  stacked: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String as PropType<AvatarStatus>,
    default: 'online',
  },
  statusPosition: {
    type: String as PropType<AvatarStatusPosition>,
    default: 'top-right'
  },
})

const pflButton = ref(null)
const { _active, handleLeave, active, _class } = useDotsActions()

onClickOutside(pflButton, (event) => {
  _active.value = false
  _class.value = 'focus:ring-0 focus:bg-neutral-100 dark:focus:bg-transparent'
})

const fullName = props.fullName ?? props.firstName + ' ' + props.lastName

function getInitials(name: string): string {
  const nameParts = name.split(' ')
  if (nameParts.length === 2) {
    const initials = nameParts[0].charAt(0) + nameParts[1].charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
    return initials.toUpperCase()
  }
}
const initials = computed(() => getInitials(fullName))

const avatarClasses = computed(() => useAvatarClasses(toRefs(props)))

const avatarDotClasses = computed(() => useMergeClasses(avatarClasses.value.avatarDotClasses))
const avatarPlaceholderClasses = computed(() =>
  useMergeClasses(avatarClasses.value.avatarPlaceholderClasses)
)
const avatarPlaceholderInitialsClasses = computed(() =>
  useMergeClasses(avatarClasses.value.avatarPlaceholderInitialsClasses)
)
const avatarPlaceholderWrapperClasses = computed(() =>
  useMergeClasses(avatarClasses.value.avatarPlaceholderWrapperClasses)
)
</script>

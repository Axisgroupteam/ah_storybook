<template>
  <div @closeBadge="showBadge = false" v-if="showBadge">
    <div v-if="pill" :class="pillClasses">
      <slot />
    </div>
    <div v-else-if="indicator" :class="indicatorClasses" />
    <div v-else :class="wrapperClasses">
      <!-- Prefix slot for additional content before the badge text -->
      <div v-if="$slots.preffix" class="">
        <slot name="preffix" />
      </div>
      <!-- Button text section -->
      <span :class="spanClasses">
        <!-- Main Badge text slot -->
        <div class="">
          <slot />
          <!-- <span v-if="!$slots.default">Badge</span> -->
        </div>
      </span>

      <!-- Suffix slot for additional content after the badge text -->
      <div v-if="$slots.suffix" class="">
        <button
          @click="showBadge = false"
          type="button"
          class="flex items-center justify-center w-3.5 h-3.5 hover:bg-red-200 dark:hover:bg-red-800 rounded-sm"
        >
          <svg
            class="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { BadgeSize, BadgeVariant } from './types'
import { useBadgeClasses } from './composables/useBadgeClasses'
import { useMergeClasses } from '@/composables/userMergeClasses'

interface IBadgeProps {
  indicator: boolean
  counter: boolean
  class?: string
  color?: BadgeVariant
  size?: BadgeSize
  pill?: boolean
  square?: boolean
  href?: string
  tag?: string
}

const showBadge = ref(true)

const props = withDefaults(defineProps<IBadgeProps>(), {
  indicator: false,
  counter: false,
  size: 'md',
  pill: false,
  square: false,
  href: '',
  color: 'primary',
  class: '',
  tag: 'a'
})

const badgeClasses = computed(() => useBadgeClasses(toRefs(props)))

const wrapperClasses = computed(() => useMergeClasses(badgeClasses.value.wrapperClasses))
const spanClasses = computed(() => useMergeClasses(badgeClasses.value.spanClasses))
const indicatorClasses = computed(() => useMergeClasses(badgeClasses.value.indicatorClasses))
const pillClasses = computed(() => useMergeClasses(badgeClasses.value.pillClasses))
</script>

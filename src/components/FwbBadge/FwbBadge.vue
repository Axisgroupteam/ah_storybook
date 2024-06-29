<template>
  <div :class="wrapperClasses" class="inline-flex items-center">
    <!-- Prefix slot for additional content before the badge text -->
    <div v-if="$slots.preffix" class="mr-2">
      <slot name="preffix" />
    </div>

    <!-- Button text section -->
    <span :class="spanClasses">
      <!-- Main Badge text slot -->
      <div>
        <slot />
        <span v-if="!$slots.default">Badge</span>
      </div>
    </span>

    <!-- Suffix slot for additional content after the badge text -->
    <div v-if="$slots.suffix" class="ml-2">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useBadgeClasses } from './composables/useBadgeClasses'
import type { BadgeSize, BadgeVariant } from './types';
import { useMergeClasses } from '@/composables/userMergeClasses'


interface IBadgeProps {
  class?: string
  color?: BadgeVariant
  size?: BadgeSize
  pill?: boolean
  square?: boolean
  href?: string
  tag?: string
}
const props = withDefaults(defineProps<IBadgeProps>(), {
  color: 'primary',
  class: '',
  size:'md',
  pill: false,
  square: false,
  href: '',
  tag: 'a',
})

const badgeClasses = computed(() => useBadgeClasses(toRefs(props)))

const wrapperClasses = computed(() => useMergeClasses(badgeClasses.value.wrapperClasses))
const spanClasses = computed(() => useMergeClasses(badgeClasses.value.spanClasses))

</script>


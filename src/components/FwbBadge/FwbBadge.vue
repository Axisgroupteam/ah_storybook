<template>
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
const props = withDefaults(defineProps<IBadgeProps>(), {
  indicator: false,
  counter: false,
  size:'md',
  pill: false,
  square: false,
  href: '',
  color: 'primary',
  class: '',
  tag: 'a',
})

const badgeClasses = computed(() => useBadgeClasses(toRefs(props)))

const wrapperClasses = computed(() => useMergeClasses(badgeClasses.value.wrapperClasses))
const spanClasses = computed(() => useMergeClasses(badgeClasses.value.spanClasses))
const indicatorClasses = computed(() => useMergeClasses(badgeClasses.value.indicatorClasses))
const pillClasses = computed(() => useMergeClasses(badgeClasses.value.pillClasses))

</script>


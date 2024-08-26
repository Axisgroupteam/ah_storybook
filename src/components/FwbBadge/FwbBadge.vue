<template>
  <component
    :is="wrapperType"
    :class="badgeClasses"
    :href="href"
    class="flex justify-center items-center gap-1"
  >
    <slot name="icon" />
    <template v-if="variant === 'default'">
      <slot name="default" />
    </template>
    <template v-else-if="variant === 'counter'">
      <span v-if="count > 999"> +999 </span>
      <span v-else>
        {{ count }}
      </span>
    </template>
    <template v-else-if="variant === 'indicator'">
      <!-- El indicador es un círculo vacío, así que no necesita contenido -->
    </template>
    <button
      v-if="closable && variant === 'default'"
      @click="$emit('close')"
      :class="closeButtonClasses"
      aria-label="Remove"
    >
      <svg
        class="w-2 h-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Remove badge</span>
    </button>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import type { BadgeSize, BadgeType, BadgeVariant } from './types'
import { useBadgeClasses } from './composables/useBadgeClasses'

interface IBadgeProps {
  type?: BadgeType
  size?: BadgeSize
  href?: string | null
  variant?: BadgeVariant
  count?: number
  closable?: boolean
}

const props = withDefaults(defineProps<IBadgeProps>(), {
  type: 'primary',
  size: 'xs',
  href: null,
  variant: 'default',
  count: 0,
  closable: false
})

const emit = defineEmits(['close'])

const slots = useSlots()
const isContentEmpty = computed(() => !slots.default)
const wrapperType = computed(() => (props.href ? 'a' : 'span'))

const { badgeClasses, closeButtonClasses } = useBadgeClasses(props, { isContentEmpty })
</script>

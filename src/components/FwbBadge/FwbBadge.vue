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
    <div
      v-if="closable && variant === 'default'"
      @click="$emit('close')"
      class="p-0.5 rounded-sm cursor-pointer"
      :class="closeButtonClasses"
      aria-label="Remove"
    >
      <IconWrapper name="close" size="8" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import type { BadgeSize, BadgeType, BadgeVariant } from './types'
import { useBadgeClasses } from './composables/useBadgeClasses'
import IconWrapper from '../IconWrapper.vue'

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

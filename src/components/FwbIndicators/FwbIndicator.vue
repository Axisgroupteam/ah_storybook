<template>
  <span v-if="variant === 'with-text'" :class="wrapperClasses">
    <span :class="baseClasses"></span>
    <span class="inline-block align-middle">
      <slot></slot>
    </span>
  </span>
  <span v-else-if="variant === 'contained-text'" :class="[...wrapperClasses, ...baseClasses]">
    <slot></slot>
  </span>
  <span v-else-if="variant === 'pill'" :class="pillClasses">
    <span :class="pillIndicatorClasses"></span>
    <slot></slot>
  </span>
  <span v-else :class="baseClasses"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFwbIndicatorClasses } from './composables/useFwbIndicatorClasses'
import type { IndicatorColor, IndicatorVariant } from './types'

interface Props {
  color?: IndicatorColor
  variant?: IndicatorVariant
}

const props = withDefaults(defineProps<Props>(), {
  color: 'neutral',
  variant: 'default'
})

const { baseClasses, wrapperClasses, pillClasses, pillIndicatorClasses } = useFwbIndicatorClasses(
  computed(() => props.color).value,
  computed(() => props.variant).value
)
</script>

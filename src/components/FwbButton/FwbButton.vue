<!-- Wrapper component for customizable button -->
<template>
  <!-- Main button component -->
  <component
    :is="buttonComponent"
    :class="[wrapperClasses, ring ? `ring-4 ring-${color}` : 'ring-0']"
    :[linkAttr]="href"
    :disabled="buttonComponent === 'button' && (disabled || loading)"
    :style="{
      boxShadow: disabled ? 'none' : ''
    }"
  >
    <!-- Prefix slot for additional content before the button text -->
    <div v-if="$slots.prefix || loadingPrefix" class="mr-2">
      <!-- Display spinner if loading or custom prefix slot -->
      <fwb-spinner v-if="loadingPrefix" :color="spinnerColor" :size="spinnerSize" />
      <slot v-else name="prefix" />
    </div>

    <!-- Button text section -->
    <span :class="spanClasses">
      <!-- Main button text slot -->
      <div>
        <slot />
        <span v-if="!$slots.default">{{ text }}</span>
      </div>
    </span>

    <!-- Suffix slot for additional content after the button text -->
    <div v-if="$slots.suffix || loadingSuffix" class="ml-2 w-full">
      <!-- Display spinner if loading or custom suffix slot -->
      <fwb-spinner v-if="loadingSuffix" :color="spinnerColor" :size="spinnerSize" />
      <slot v-else name="suffix" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, resolveComponent, toRefs } from 'vue'
import { useMergeClasses } from '@/composables/userMergeClasses'
import FwbSpinner from '../FwbSpinner/FwbSpinner.vue'
import { useButtonClasses } from './composables/useButtonClasses'
import { useButtonSpinner } from './composables/useButtonSpinner'
import type { ButtonSize, ButtonVariant } from './types'

// Define props interface for the button component
interface IButtonProps {
  class?: string
  color?: ButtonVariant
  size?: ButtonSize
  pill?: boolean
  square?: boolean
  loading?: boolean
  loadingPosition?: 'suffix' | 'prefix'
  disabled?: boolean
  href?: string
  tag?: keyof HTMLElementTagNameMap | any
  ring?: boolean
  text?: string
}

// Set default prop values and handle prop validation
const props = withDefaults(defineProps<IButtonProps>(), {
  class: '',
  color: 'primary',
  size: 'md',
  pill: false,
  square: false,
  loading: false,
  loadingPosition: 'prefix',
  disabled: false,
  href: '',
  tag: 'a',
  ring: false,
  text: 'Button'
})

// Compute button classes based on props
const buttonClasses = computed(() => useButtonClasses(toRefs(props)))
const wrapperClasses = computed(() => useMergeClasses(buttonClasses.value.wrapperClasses))
const spanClasses = computed(() => useMergeClasses(buttonClasses.value.spanClasses))

// Determine loading position
const loadingPrefix = computed(() => props.loading && props.loadingPosition === 'prefix')
const loadingSuffix = computed(() => props.loading && props.loadingPosition === 'suffix')

// Spinner Classes
const { color: spinnerColor, size: spinnerSize } = useButtonSpinner(toRefs(props))

const linkComponent = props.tag !== 'a' ? resolveComponent(props.tag) : 'a'
const buttonComponent = props.href ? linkComponent : 'button'
const linkAttr = props.tag === 'router-link' || props.tag === 'nuxt-link' ? 'to' : 'href'
</script>

<style scoped>
.ring-primary {
  @apply ring-red-200 dark:ring-red-600;
}

.ring-secondary {
  @apply ring-neutral-200 dark:ring-neutral-600;
}

.ring-terciary {
  @apply ring-neutral-300 dark:ring-neutral-600;
}
</style>

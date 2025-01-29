<template>
  <label class="flex gap-3 items-center justify-start w-min">
    <input
      v-model="model"
      :class="[
        checkboxClasses,
        customClass || '',
        model ? 'dark:!bg-red-600' : 'dark:!bg-neutral-700'
      ]"
      :disabled="disabled"
      type="checkbox"
      :style="{ boxShadow: ring ? '' : 'none' }"
      @input="toggleRing"
    />
    <span v-if="label" :class="labelClasses" class="truncate" @click="toggle">
      {{ label }}
    </span>
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useCheckboxClasses } from './composables/useCheckboxClasses'

interface CheckboxProps {
  disabled?: boolean
  label?: string
  modelValue?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  label: '',
  modelValue: false,
  customClass: ''
})

const emit = defineEmits(['update:modelValue'])
const ring = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const toggle = () => {
  model.value = !model.value
}

const toggleRing = () => {
  ring.value = true
  setTimeout(() => (ring.value = false), 200)
}

const classes = computed(() => useCheckboxClasses(props.disabled))
const checkboxClasses = computed(() => classes.value.checkboxClasses.value)
const labelClasses = computed(() => classes.value.labelClasses.value)
</script>

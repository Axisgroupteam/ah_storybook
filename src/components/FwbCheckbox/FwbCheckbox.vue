<template>
  <label class="flex gap-3 items-center justify-start">
    <input
      v-model="model"
      class="bg-neutral"
      :class="[checkboxClasses, customClass ? customClass : '']"
      :disabled="disabled"
      type="checkbox"
      @change="toggleRing"
      :style="{
        boxShadow: ring ? '' : 'none'
      }"
    />
    <span v-if="label" :class="labelClasses">{{ label }}</span>
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
  label: 'Title',
  modelValue: false,
  customClass: ''
})

const ring = ref(false)

const toggleRing = () => {
  ring.value = !ring.value
}

watch(ring, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      ring.value = false
    }, 300)
  }
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const classes = computed(() => useCheckboxClasses(props.disabled))

const checkboxClasses = computed(() => classes.value.checkboxClasses.value)
const labelClasses = computed(() => classes.value.labelClasses.value)
</script>

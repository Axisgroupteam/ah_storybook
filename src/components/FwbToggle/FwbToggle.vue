<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      v-model="model"
      :disabled="disabled"    
    />
    <div
      class="" 
      @click="toggleRing"
      :style="{ boxShadow: ring ? '' : 'none' }"
      :class="[toggleClasses, customClass ? customClass : '']"
      :disabled="disabled"
    ></div>
    <span @click="toggleRing" v-if="label" :class="labelClasses">{{ label }}</span>
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useToggleClasses } from './composables/useToggleClasses'

interface ToggleProps {
  disabled?: boolean
  label?: string
  modelValue?: boolean
  customClass?: string
}
const props = withDefaults(defineProps<ToggleProps>(), {
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

const classes = computed(() => useToggleClasses(props.disabled))

const toggleClasses = computed(() => classes.value.toggleClasses.value)
const labelClasses = computed(() => classes.value.labelClasses.value)
</script>

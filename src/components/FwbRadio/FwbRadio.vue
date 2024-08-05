<template>
  <label class="flex gap-3 items-center justify-start">
    <input
      @change="change"
      @click="toggleRing"
      class="bg-neutral"
      :name="name"
      :value="modelValue"
      :checked="modelValue === value"
      :class="[radioClasses, customClass]"
      :disabled="disabled"
      type="radio"
      :style="{
        boxShadow: ring ? '' : 'none'
      }"
    />
    <span v-if="label" :class="labelClasses">{{ label }}<span v-if="required" class="text-red-500"> * </span></span>    
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRadioClasses } from './composables/useRadioClasses'
import {  
  type ValidationStatus,
} from "./types";


interface RadioProps {
  name: string
  label?: string
  value: any
  modelValue: any
  disabled?: boolean
  customClass?: string 
  validationStatus?: ValidationStatus;
  required?: boolean;
}

const props = withDefaults(defineProps<RadioProps>(), {
  name: 'option',
  label: 'Label',
  value: false,
  modelValue: false,
  disabled: false,
  customClass: '',
  validationStatus: "normal",
  required: false
})

const ring = ref(false)

const toggleRing = () => {
  ring.value = !ring.value
}

watch(ring, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      ring.value = false
    }, 200)
  }
})

const emit = defineEmits(['update:modelValue'])

const change = () => {
  emit('update:modelValue', props.value)
}

const classes = computed(() => useRadioClasses(props.disabled, props.validationStatus))
const radioClasses = computed(() => classes.value.radioClasses.value)
const labelClasses = computed(() => classes.value.labelClasses.value)
</script>

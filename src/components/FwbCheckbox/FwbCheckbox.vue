<template>
  <label class="flex gap-3 items-center justify-start bg-neutra">
    <input
      v-model="model"
      class="bg-neutral"
      :class="
        checkboxClasses +
        (isActive
          ? dark
            ? ' ring-red-500 dark:ring-red-600 ring-offset-white dark:ring-offset-neutral-800 focus:ring-2'
            : ' ring-red-500'
          : '')
      "
      :disabled="disabled"
      type="checkbox"
      :style="{
        backgroundColor: !model && dark ? optionalBackgroundColor : '',
        boxShadow: isActive
          ? dark
            ? '0 0 0 3px rgba(239, 68, 68, 1)'
            : '0 0 0 3px rgba(239, 68, 68, 1)'
          : '',
        outline: isActive ? 'none' : '',
      }"
    />
    <span v-if="label" :class="labelClasses" @click.stop
      >{{ label }}<span class="hidden">{{ isActive }}</span></span
    >
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useCheckboxClasses } from "./composables/useCheckboxClasses";
import useAuthStore from "@/new_design/auth/stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();

const { dark } = storeToRefs(auth);

interface CheckboxProps {
  disabled?: boolean;
  label?: string;
  modelValue?: boolean;
  optionalBackgroundColor?: string;
}
const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  label: "",
  modelValue: false,
  optionalBackgroundColor: "rgb(64,64,64)",
});

const isActive = ref(false);

function activateRing() {
  isActive.value = true;
  setTimeout(() => {
    isActive.value = false;
  }, 200);
}

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    activateRing();
  }
);

const { checkboxClasses, labelClasses } = useCheckboxClasses();
</script>

<style scoped>
input:focus {
  outline: none !important;
  box-shadow: none;
}
</style>

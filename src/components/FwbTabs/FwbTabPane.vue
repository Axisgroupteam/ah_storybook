<template>
  <li>
    <div
      class="flex justify-center items-center gap-[6px] max-h-[51px]"
      :class="tabClasses"
      @click="tryActivateTab"
    >
      <component v-if="computedIcon" :is="computedIcon" class="w-3.5 h-3.5" />
      {{ title }}
      <div v-if="variant === 'underline'" class="w-[20px] h-[20px] rounded-full bg-red-100 text-center text-red-800 dark:text-red-300 dark:bg-red-900">{{props.count}}</div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { inject, toRef, computed, type ComputedRef } from "vue";
import type { TabsVariant } from "./types";
import { useTabClasses } from "./composables/useTabClasses";
import {
  TAB_ACTIVATE_INJECTION_KEY,
  TAB_STYLE_INJECTION_KEY,
} from "./injection/config";
import { getFBIcon } from "@/utils/getAssets";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  },
  variant:{
    type: String,
    default: "underline"
  }
});
let computedIcon: ComputedRef<any>
computedIcon = props.icon ? computed(() => getFBIcon(props.icon)): computed(()=>'');

const variant = inject<TabsVariant>(TAB_STYLE_INJECTION_KEY);
if (!variant) {
  console.warn(
    "you can't use Tab outside of Tabs component. No tab style injection found"
  );
}

const onActivate = inject<(value: string) => void>(TAB_ACTIVATE_INJECTION_KEY);
if (!onActivate) {
  console.warn(
    "you can't use Tab outside of Tabs component. No tab activate injection found"
  );
}

const tryActivateTab = () => {
  if (props.disabled) return;
  if (!onActivate) return console.warn("no onActivate");
  onActivate(props.name);
};

const { tabClasses } = useTabClasses({
  active: toRef(props, "active"),
  disabled: toRef(props, "disabled"),
  variant,
});
</script>

<template>
  <div class="flex items-start" :class="expanded ? 'w-full' : ''">
    <tooltip
      ref="tool_ref"
      :class="expanded ? 'w-full' : ''"
      :placement="placement"
      :triggers="[trigger]"
      theme="default"
      :disabled="!active ? true : false"
      :distance="10"
    >
      <slot name="trigger" :class="expanded ? 'w-full' : ''" />
      <template #popper>
        <slot v-if="active" name="content" />
      </template>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Tooltip } from "floating-vue";
import type { TooltipPlacement, TooltipStyle, TooltipTrigger } from "./types";
import "floating-vue/dist/style.css";

interface TooltipProps {
  placement?: TooltipPlacement;
 
  trigger?: TooltipTrigger;
  active?: boolean;
  expanded?: boolean;
}
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "top",
 
  trigger: "hover",
  active: true,
  expanded: false,
});
 
</script>

<style>
.v-popper--theme-default .v-popper__wrapper .v-popper__inner {
  @apply  border-neutral-200 dark:border-neutral-600 rounded-md pt-[6px] pb-[7px] pr-[8px] pl-[6px]  bg-white dark:bg-neutral-700 shadow-md border-[1px];
}

.v-popper--theme-default .v-popper__arrow-inner {
  visibility: visible;
  @apply dark:border-neutral-700 border-white;
}

 
  .v-popper--theme-default .v-popper__arrow-outer {
    visibility: visible;
    @apply dark:border-neutral-600 border-neutral-200;
  }


 
 

</style>

 




 
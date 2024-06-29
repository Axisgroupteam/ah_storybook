<template>
  <div class="flex items-start" >
    <tooltip
      ref="tool_ref"
      :placement="placement"
      :triggers="[trigger]"
      theme="default"
      :disabled="!active ? true : false"
      :distance="distance"
    >
      <slot name="trigger"  />
      <template #popper>
        <slot v-if="active" name="content" />
      </template>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>

import { Tooltip } from "floating-vue";
import type { TooltipPlacement, TooltipStyle, TooltipTrigger } from "./types";
import "floating-vue/dist/style.css";

interface TooltipProps {
  placement?: TooltipPlacement;
  distance?: number; 
  trigger?: TooltipTrigger;
  active?: boolean;
}
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "top",
  distance: 10,
  trigger: "hover",
  active: true,
});
 
</script>

<style>
.v-popper--theme-default .v-popper__wrapper .v-popper__inner {
  @apply  border-neutral-200 dark:border-neutral-600 rounded-md pt-[2px] pb-[7px] pr-[11px] pl-[11px]  bg-white dark:bg-neutral-700 shadow-md border-[1px];
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

 




 
<template>
    <nav class="pl-[12px] pr-[16px] flex h-[64px] bg-white border-b border-b-neutral-200 dark:bg-neutral-800 dark:border-b-neutral-700 fixed left-0 right-0 top-0 z-30 justify-between">
      <div class="flex gap-4 items-center">
        <slot name="left-corner" />
        <HubSmall class="text-neutral-900 dark:text-white"/>
      </div>

      <div class="flex gap-2 items-center">
        <slot />
      </div>


    </nav>
</template>

<script setup lang="ts">
import HubSmall from "@/assets/flowbite_icons/hub_icon_small.svg";
</script>
<template>
  <th scope="col" :class="tableHeadCellClasses">
    <div class="flex gap-1 justify-start items-center">
      <slot name="preffix" />
      <slot />
      <slot name="suffix" />
    </div>
  </th>
</template>

<script lang="ts" setup>
import { useTableHeadCellClasses } from './composables/useTableHeadCellClasses'

const { tableHeadCellClasses } = useTableHeadCellClasses()
</script>

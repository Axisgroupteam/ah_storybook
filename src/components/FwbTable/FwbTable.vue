<template>
  <div class="relative h-full w-full overflow-hidden">
    <OverlayScrollbarsComponent
      :options="{
        scrollbars: {
          theme: 'os-theme-dark',
          autoHide: 'leave',
          dragScroll: true
        },
        overflow: {
          x: 'scroll',
          y: 'scroll'
        }
      }"
      class="h-full"
      defer
    >
      <table class="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
        <slot />
      </table>
    </OverlayScrollbarsComponent>
    <div
      v-if="$slots.empty || $slots.loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <slot name="empty" />
      <slot name="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'

const props = defineProps({
  striped: {
    type: Boolean,
    default: false
  },
  stripedColumns: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

provide('hoverable', props.hoverable)
provide('striped', props.striped)
provide('stripedColumns', props.stripedColumns)
</script>

<style>
/* Estilos del scrollbar */
.os-theme-dark {
  --os-size: 12px;
  --os-padding-perpendicular: 2px;
}

.os-scrollbar {
  --os-handle-bg: rgba(82, 82, 82, 0.4);
  --os-handle-bg-hover: rgba(82, 82, 82, 0.6);
  --os-handle-bg-active: rgba(82, 82, 82, 0.7);
}

:root.dark .os-scrollbar {
  --os-handle-bg: rgba(163, 163, 163, 0.4);
  --os-handle-bg-hover: rgba(163, 163, 163, 0.6);
  --os-handle-bg-active: rgba(163, 163, 163, 0.7);
}

/* Agregar estilos para mejorar la apariencia de la tabla con scroll */
.os-theme-dark .os-scrollbar-horizontal {
  margin: 0 !important;
}

.os-theme-dark .os-scrollbar-vertical {
  margin: 0 !important;
}

/* Asegurar que los encabezados de columna mantengan su ancho mínimo */
.os-viewport {
  min-width: fit-content;
}

/* Ajustar márgenes de los scrollbars */
.os-scrollbar-horizontal {
  margin: 0 !important;
}

.os-scrollbar-vertical {
  margin: 0 !important;
}

/* Asegurar que el contenido de la tabla no se desborde */
.os-content {
  padding: 0 !important;
}
</style>

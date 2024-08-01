<template>
  <div ref="content">
    <div v-if="isLoaded" :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ComputedRef, onMounted, ref } from "vue";
import { useAccordionContentClasses } from "./composables/useAccordionContentClasses";

const props = defineProps({
  isFilter: {type: Boolean, default:false}
})

const isLoaded = ref(false);
const content = ref();
let contentClasses: ComputedRef;

onMounted(() => {
  const accordionHeaderClasses = useAccordionContentClasses(content, props.isFilter);
  contentClasses = accordionHeaderClasses.contentClasses;
  isLoaded.value = true;
});
</script>

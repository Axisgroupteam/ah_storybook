<template>
  <ContainerDrawerItem
    :id="name"
    class="flex w-full  items-center rounded-[8px] px-[8px]  group"
    :class="!notExpand ? 'py-[8px]': 'py-[10px]'"
  

  >
    <div class="flex   gap-3 items-center"
  
    >
      <component
        :is="computedIcon"
        class=" group-hover:dark:text-white text-neutral-500 group-hover:text-neutral-900"
      />
      <span
        v-show="!notExpand"
        :class="
          notExpand ? 'text-transparent' : ' text-neutral-900 dark:text-white'
        "
        class="font-medium leading-6 whitespace-nowrap"
        >{{ title }}</span
      >
  
    </div>
  
  </ContainerDrawerItem>
</template>
<script setup lang="ts">
import { getFBIcon } from "../../../../utils/getAssets";

import {computed} from "vue";
 
import ContainerDrawerItem from "../ContainerDrawerItem/presentation/ContainerDrawerItem.vue";
const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  notExpand: { type: Boolean, required: true },

  hideText: { type: Boolean, required: false },
});
 

const computedIcon = computed(() => getFBIcon(props.icon));
</script>

<style scoped></style>

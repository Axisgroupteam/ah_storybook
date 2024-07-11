<template>
    <div
      class="bg-neutral-100  dark:bg-neutral-900 min-h-full h-screen max-h-screen"  
    >
      <div class="flex justify-start pl-2 items-center h-[64px] w-full   fixed left-0 right-0 top-0 z-30 bg-white  border-b dark:border-neutral-700   dark:bg-neutral-800" >
        <FwbButton color="secondary" class="text-neutral-500" @click="toogleDrawer">
          Click me
        </FwbButton>
      </div>
  
      <!---->
      <FwbMenu ref="target" :value="drawer" :module-object="moduleData" />
      <main
        class="h-full p-4 flex pt-20"
        :class="drawer && (width > 1279) ? 'ml-[250px]' : 'ml-[60px]'"
      >
        <div class="flex grow max-h-full overflow-clip">
          <div class="p-4 h-full bg-neutral-100  dark:bg-neutral-900  w-full">
         
         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
           <div
             class="border-2 border-dashed border-neutral-300 rounded-lg dark:border-neutral-600 h-32 md:h-64"
           ></div>
           <div
             class="border-2 border-dashed rounded-lg border-neutral-300 dark:border-neutral-600 h-32 md:h-64"
           ></div>
           <div
             class="border-2 border-dashed rounded-lg border-neutral-300 dark:border-neutral-600 h-32 md:h-64"
           ></div>
           <div
             class="border-2 border-dashed rounded-lg  border-neutral-300 dark:border-neutral-600 h-32 md:h-64"
           ></div>
         </div>
         <div
           class="border-2 border-dashed rounded-lg border-neutral-300 dark:border-neutral-600 h-60 mb-4"
         ></div>
       </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import FwbMenu from "../FwbMenu.vue";
  import { ref, watch, computed, onMounted } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import FwbButton from '@/components/FwbButton/FwbButton.vue'
  import { useWindowSize } from "@vueuse/core";
  
  
  interface Props {
    moduleData: any[],
  
  }
  
  const props = withDefaults(defineProps<Props>(), {
    moduleData : []
  })
  
  const { width } = useWindowSize();
  
  
  const target = ref(null);
  
  const drawer = ref(false);
  
  const toogleDrawer = () => {
    drawer.value = !drawer.value;
  };
  
   
  
  onClickOutside(target, (event) => {
    const clickedElement = event.target as HTMLElement;
    // Verifica si el elemento clickeado es el botón del menú o parte de él
    if (!clickedElement.closest("#module-select")) {
      if (drawer.value && window.innerWidth < 1280) {
        drawer.value = false;
      }
    }
  });
  
  onMounted(() => {
    if (width.value > 1365) {
      drawer.value = true;
    }
  });
  </script>
  
  <style scoped></style>
  
<template>
  <div
    class="bg-neutral-100  dark:bg-neutral-900 min-h-screen h-screen max-h-screen"
      
  >
    <div class="flex justify-start pl-2 items-center h-[64px] w-full   fixed left-0 right-0 top-0 z-30 bg-white  border-b dark:border-neutral-700   dark:bg-neutral-800" >
      <FwbButton color="secondary" class="text-neutral-500" @click="toogleDrawer">
        Click me
       
      </FwbButton>
    </div>

    <!---->
    <NewDrawerMenu ref="target" :value="drawer" :module-object="moduleData" />
    <main
      class="h-full p-4 flex pt-20"
      :class="drawer ? 'ml-[250px]' : 'ml-[60px]'"
    >
      <div class="flex grow">
        <div class="w-full h-full border-dashed border-[2px] border-neutral-900 dark:border-neutral-500 rounded-lg bg-neutral-200 dark:bg-neutral-700">
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NewDrawerMenu from "../components/Drawer/presentation/Drawer.vue";
import { ref, watch, computed, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import FwbButton from '../components/FwbButton/FwbButton.vue'
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
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

 

// onClickOutside(target, (event) => {
//   const clickedElement = event.target as HTMLElement;
//   // Verifica si el elemento clickeado es el botón del menú o parte de él
//   if (!clickedElement.closest("#burger")) {
//     if (drawer.value && window.innerWidth < 1280) {
//       drawer.value = false;
//     }
//   }
// });

onMounted(() => {
  if (width.value > 1365) {
    drawer.value = true;
  }
});
</script>

<style scoped></style>

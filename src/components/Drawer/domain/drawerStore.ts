import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
export const useDrawerStore = defineStore("drawer", () => {
  // used to open Drawer from AppBar
  const isExpanded = ref(false);

  const handleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  return {
    isExpanded,
    handleExpand,
  };
});

export default useDrawerStore;

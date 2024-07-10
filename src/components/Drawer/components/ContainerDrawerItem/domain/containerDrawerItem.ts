import { ref } from "vue";


export const container = () => {

  const _class = ref("");

  const handleRing = () => {
    _class.value = "focus:ring-[3px]";

    setTimeout(() => {
      _class.value = "focus:ring-0";
    }, 200);
  };
  return {
    _class,
    handleRing,
  };
};

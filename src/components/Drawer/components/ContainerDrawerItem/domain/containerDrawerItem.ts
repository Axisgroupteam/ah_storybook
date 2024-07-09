import { reactive, computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export const container = () => {
  const route = useRoute();

  const _class = ref("");

  const handleRing = () => {
    _class.value = "focus:ring-[3px]";

    setTimeout(() => {
      _class.value = "focus:ring-0";
    }, 200);
  };
  return {
    route,
    _class,
    handleRing,
  };
};

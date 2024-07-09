import { reactive, computed, ref, onMounted } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
// import { useAuthStore } from "@/new_design/auth/stores/auth";
import { useRoute } from "vue-router";
export const menuItems = () => {
  const hov = reactive({ value: false });
  // const authStore = useAuthStore();
  // const { dark } = storeToRefs(authStore);
  const route = useRoute();

  const handleClick = (_name: string) => {
    router.push({ name: _name });
  };
  // const isCurrentRoute = computed(() => props.actualRouteName === props.name);
  return {
    hov,
    handleClick,
    // dark,
    route,
  };
};

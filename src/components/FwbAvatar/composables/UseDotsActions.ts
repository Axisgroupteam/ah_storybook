import { ref } from "vue";

export const useDotsActions = () => {
  const _class = ref("border-0");

  const active = () => {
    _active.value = !_active.value;
    _class.value =
      _class.value === "focus:ring-[4px] border-0"
        ? "border-0"
        : "focus:ring-[4px] border-0";
  };
  const handleLeave = () => {
    _active.value = false;
    _class.value = "border-0";
  };
  const _active = ref(false);
  return {
    _active,
    _class,
    handleLeave,
    active,
  };
};

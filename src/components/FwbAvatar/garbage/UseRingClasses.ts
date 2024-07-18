import { ref } from "vue";

export const UseRingClasses = () => {
  const _class = ref("border-0");
  const _active = ref(false);

  const active = () => {
    _active.value = !_active.value;
    _class.value =
    _class.value === "focus:ring-[4px]" && !_active.value
    ? "border-0"
    : "focus:ring-[4px]";
  };

  const handleLeave = () => {
    _active.value = false;
    _class.value = "border-0";
  };
  
  return {
    _active,
    _class,
    handleLeave,
    active,
  };
};

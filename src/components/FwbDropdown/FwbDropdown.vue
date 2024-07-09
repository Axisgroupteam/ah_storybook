<template>
  <div ref="wrapper"  class="inline-flex relative" >
    <div class="inline-flex items-center">
      <fwb-slot-listener @click="onToggle" class="cursor-pointer">
             
          <slot   name="trigger">
            <fwb-button color="primary" size="xl">
              {{ text }}
              <template #suffix>
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </template>
            </fwb-button>
          </slot>
 
      </fwb-slot-listener>
    </div>
    <transition :name="transitionName">
      <div
        v-if="visible"
        ref="content"
        :class="[contentClasses, 'overflow-clip']"
        :style="contentStyles"
     
      >
        <fwb-slot-listener > 
          <perfect-scrollbar>
          <div v-if="$slots.default" class="w-full " :class="max_h" @click="onToggle">
            <slot  />
          </div>
          </perfect-scrollbar>  
        </fwb-slot-listener>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { DropdownPlacement } from "./types";
import FwbButton from "../FwbButton/FwbButton.vue";
import FwbSlotListener from "@/utils/FwbSlotListener/FwbSlotListener.vue";
import { useDropdownClasses } from "./composables/useDropdownClasses";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
const emit = defineEmits(["toogle"]);

const visible = ref(false);
const onHide = () => {
    visible.value = false;
    emit("toogle", false);
};
const onToggle = () => {
  visible.value = !visible.value;
  emit("toogle", visible.value);
};
const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement;
    type: 'primary' | 'secondary';
    text?: string;
    transition?: string;
    closeInside?: boolean;
    alignToEnd?: boolean;
    max_h?: 'string'
  }>(),
  {
    placement: "bottom",
    text: "",
    transition: "",
    closeInside: false,
    alignToEnd: false,
    type: 'primary',
    max_h: 'max-h-[158px]'
  }
);

const placementTransitionMap: Record<DropdownPlacement, string> = {
  bottom: "to-bottom",
  left: "to-left",
  right: "to-right",
  top: "to-top",
};

const transitionName = computed(() => {
  if (props.transition === null) return placementTransitionMap[props.placement];
  return props.transition;
});

const content = ref<HTMLDivElement>();
const wrapper = ref<HTMLDivElement>();

const { contentClasses, contentStyles } = useDropdownClasses({
  placement: toRef(props, "placement"),
  alignToEnd: toRef(props, "alignToEnd"),
  visible,
  contentRef: content,
  type: toRef(props, "type"),
});

onClickOutside(wrapper, () => {
  if (!visible.value) return;
  visible.value = false;
  emit("toogle", false);
});
 

</script>

<style scoped>
/* transitions */
.to-bottom-enter-active,
.to-bottom-leave-active,
.to-left-enter-active,
.to-left-leave-active,
.to-right-enter-active,
.to-right-leave-active,
.to-top-enter-active,
.to-top-leave-active {
  transition: all 250ms;
}

/* to top */
.to-top-enter-active,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.to-top-leave,
.to-top-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* to right */
.to-right-enter-active,
.to-right-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.to-right-leave,
.to-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* to bottom */
.to-bottom-enter-active,
.to-bottom-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.to-bottom-leave,
.to-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* to left */
.to-left-enter-active,
.to-left-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.to-left-leave,
.to-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>

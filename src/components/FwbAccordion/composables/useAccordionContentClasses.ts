import { computed, type Ref } from "vue";
import { useAccordionState } from "./useAccordionState";
import { twMerge } from "tailwind-merge";

const baseContentClasses =
  "p-5 border border-neutral-200 dark:border-neutral-700";

const baseFilterContentClasses =
  "p-5";

export function useAccordionContentClasses(contentRef: Ref, isFilter: boolean) {
  const accordionId = computed(
    () => contentRef.value.parentElement.parentElement.dataset.accordionId
  );
  const panelId = computed(
    () => contentRef.value.parentElement.dataset.panelId
  );
  const { accordionsStates } = useAccordionState();
  const accordionState = computed(() => accordionsStates[accordionId.value]);
  const panelState = computed(
    () => accordionsStates[accordionId.value].panels[panelId.value]
  );
  const panelsCount = computed(
    () => Object.keys(accordionState.value.panels).length
  );
  const isLastPanel = computed(
    () => panelState.value.order === panelsCount.value - 1
  );

  const contentClasses = computed(() => {
    const roundedB = isFilter ? "" : "rounded-b-xl";   
    return twMerge(
      isFilter ? baseFilterContentClasses : baseContentClasses,
      !panelState.value.isVisible && "hidden",
      (!isLastPanel.value || accordionState.value.flush) && "border-b-0",
      isLastPanel.value && "border-t-0" && roundedB,
      accordionState.value.flush && "border-x-0"
    );
  });
  return {
    contentClasses,
  };
}

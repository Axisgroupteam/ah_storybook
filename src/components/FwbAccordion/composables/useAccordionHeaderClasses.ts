import { computed, type Ref } from "vue";
import { useAccordionState } from "./useAccordionState";
import { twMerge } from "tailwind-merge";


const baseHeaderClasses =
  "flex items-center p-5 w-full  font-medium text-left border border-neutral-200 dark:border-neutral-700";
const nonFlushHeaderClasses =
  "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-600";

const baseFilterHeaderClasses =
  "flex items-center p-3 w-full font-medium text-left border-b border-neutral-200 dark:border-neutral-700";
const nonFilterFlushHeaderClasses =
  "hover:bg-neutral-100 dark:hover:bg-neutral-700";

const baseArrowClasses = "w-6 h-6 shrink-0 ml-3";

export function useAccordionHeaderClasses(headerRef: Ref, isFilter: boolean) {
  const accordionId = computed(
    () => headerRef.value.parentElement.parentElement.dataset.accordionId
  );
  const panelId = computed(() => headerRef.value.parentElement.dataset.panelId);
  const { accordionsStates } = useAccordionState();
  const accordionState = computed(() => accordionsStates[accordionId.value]);
  const panelState = computed(() => accordionState.value.panels[panelId.value]);
  const panelsCount = computed(
    () => Object.keys(accordionState.value.panels).length
  );
  const isFirstPanel = computed(() => panelState.value.order === 0);
  const isLastPanel = computed(
    () => panelState.value.order === panelsCount.value - 1
  );

 
  const headerClasses = computed(() => {
    const roundedB = isFilter ? "" : "rounded-b-xl";
    const roundedT = isFilter ? "" : "rounded-t-xl";
    const borderT = isFilter ? "" : "border-t-0";
    const borderB = isFilter ? "border-b": "border-b-0";
    
    return twMerge(
      isFilter ? baseFilterHeaderClasses: baseHeaderClasses,
      panelState.value.isVisible
        ? "text-neutral-900  dark:text-white "
        : "text-neutral-500  dark:text-neutral-400 ",
      panelState.value.isVisible &&
        !accordionState.value.flush &&
        "!bg-neutral-100 dark:!bg-neutral-700 ",
      !panelState.value.isVisible && isLastPanel.value && roundedB,
      isFirstPanel.value && !accordionState.value.flush && roundedT,
      isFirstPanel.value && accordionState.value.flush && borderT,
      accordionState.value.flush ? "border-x-0" : isFilter ? nonFilterFlushHeaderClasses : nonFlushHeaderClasses,
      !isLastPanel.value && borderB
    );
  });
  const arrowClasses = computed(() => {
    return twMerge(
      baseArrowClasses,
      panelState.value.isVisible && "rotate-180"
    );
  });
  return {
    headerClasses,
    arrowClasses,
  };
}

import { computed, nextTick, ref, type Ref, watch } from "vue";
import classNames from "classnames";
import type { DropdownAlignment, DropdownPlacement } from "../types";

const primaryDropdownClasses =
  "absolute z-10   divide-y divide-neutral-700 rounded-lg dark:bg-neutral-700 bg-neutral-50 shadow-md border border-neutral-200 dark:border-neutral-600 ";

const secondaryDropdownClasses = 
  "absolute z-10  p-3 bg-neutral-50  rounded-lg dark:bg-neutral-700 shadow-md";

const defaultGapInPx = 8;

const placementDropdownAlignmentClasses: Record<DropdownAlignment, string> = {
  horizontal: "left-0",
  vertical: "top-0",
  horizontal_reverse: "right-0",
  vertical_reverse: "bottom-0",
};

export type UseDropdownClassesProps = {
  placement: Ref<DropdownPlacement>;
  contentRef: Ref<HTMLDivElement | undefined>;
  visible: Ref<boolean>;
  alignToEnd: Ref<boolean>;
  type: Ref<"primary" | "secondary">;
};

const placementCalculators: Record<
  DropdownPlacement,
  (rect: DOMRect) => string
> = {
  bottom(rect: DOMRect): string {
    return `bottom: -${rect.height + defaultGapInPx}px;`;
  },
  left(rect: DOMRect): string {
    return `left: -${rect.width + defaultGapInPx}px;`;
  },
  right(rect: DOMRect): string {
    return `right: -${rect.width + defaultGapInPx}px;`;
  },
  top(rect: DOMRect): string {
    return `top: -${rect.height + defaultGapInPx}px;`;
  },
};

export function useDropdownClasses(props: UseDropdownClassesProps): {
  contentClasses: Ref<string>;
  contentStyles: Ref<string>;
} {
  watch(props.visible, (value: boolean) => {
    if (value) nextTick(() => calculatePlacementClasses());
  });

  const placementStyles = ref("");

  const calculatePlacementClasses = () => {
    const boundingRect = props.contentRef.value?.getBoundingClientRect();
    if (!boundingRect) {
      placementStyles.value = "";
      return;
    }
    placementStyles.value =
      placementCalculators[props.placement.value](boundingRect);
  };

  // Watch for changes in the content element, and recalculate placement classes
  // to ensure the dropdown is always positioned correctly
  const observer = new MutationObserver(() => {
    calculatePlacementClasses();
  });

  watch(props.contentRef, (value) => {
    if (value) {
      observer.observe(value, {
        childList: true,
        subtree: true,
      });
    } else {
      observer.disconnect();
    }
  });

  const contentClasses = computed(() => {
    let placement: DropdownAlignment = ["top", "bottom"].includes(
      props.placement.value
    )
      ? "horizontal"
      : "vertical";
    if (props.alignToEnd.value) {
      placement = `${placement}_reverse`;
    }
    return classNames(
      props.type.value === 'primary' ? primaryDropdownClasses : secondaryDropdownClasses,
      placementDropdownAlignmentClasses[placement]
    );
  });

  return {
    contentClasses,
    contentStyles: placementStyles,
  };
}

import { computed, type Ref } from "vue";
import { simplifyTailwindClasses } from "../../../utils/simplifyTailwindClasses";
import { useFlowbiteThemable } from "../../../utils/FlowbiteThemable/composables/useFlowbiteThemable";
import type { TabsVariant } from "./../types";

export type TabClassMap = {
  active: string;
  default: string;
  disabled: string;
};

export type UseTabClassesProps = {
  active: Ref<boolean>;
  disabled: Ref<boolean>;
  variant?: TabsVariant;
};

const defaultTabClasses: TabClassMap = {
  default:
    "cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300",
  active:
    "cursor-pointer inline-block p-4 text-red-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-red-500",
  disabled:
    "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
};
const underlineTabClasses: TabClassMap = {
  default:
    "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 dark:hover:text-white",
  active:
    "cursor-pointer inline-block p-4 text-red-500 rounded-t-lg border-b-2 border-red-500 active dark:text-red-500 dark:border-red-500",
  disabled:
    "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
};
const pillsTabClasses: TabClassMap = {
  default:
    "cursor-pointer inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
  active:
    "cursor-pointer inline-block py-3 px-4 text-white bg-red-600 rounded-lg active",
  disabled:
    "inline-block py-3 px-4 text-gray-400 cursor-not-allowed dark:text-gray-500",
};

export function useTabClasses(props: UseTabClassesProps): {
  tabClasses: Ref<string>;
} {
  const theme = useFlowbiteThemable();

  const tabClasses = computed(() => {
    const isActiveTheme = theme.isActive.value;

    const tabClassType: keyof TabClassMap = props.active.value
      ? "active"
      : props.disabled.value
      ? "disabled"
      : "default";

    if (props.variant === "default") {
      return simplifyTailwindClasses(
        defaultTabClasses[tabClassType],
        (isActiveTheme && tabClassType) === "active"
          ? theme.textClasses.value
          : ""
      );
    } else if (props.variant === "underline") {
      return simplifyTailwindClasses(
        underlineTabClasses[tabClassType],
        (isActiveTheme && tabClassType) === "active"
          ? [theme.borderClasses.value, theme.textClasses.value]
          : ""
      );
    } else if (props.variant === "pills") {
      return simplifyTailwindClasses(
        pillsTabClasses[tabClassType],
        (isActiveTheme && tabClassType) === "active"
          ? [theme.backgroundClasses.value, "text-white"]
          : ""
      );
    }

    return "";
  });

  return { tabClasses };
}

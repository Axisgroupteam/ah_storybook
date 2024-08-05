
import { defineAsyncComponent } from "vue";
import FwbSpinner from "@/components/FwbSpinner/FwbSpinner.vue";

export const getImage = (path: string) =>
  new URL(`/src/assets/images/${path}`, import.meta.url).href;

export const getAsset = (path: string) =>
  new URL(`/src/assets/${path}`, import.meta.url).href;
/* @vite-ignore */
export const getIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/icons/${icon}.svg`));

export const getIconD = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/icons_new/${icon}.svg`));

export const getFBIcon = (icon: string) => {
  const AsyncComp = defineAsyncComponent({
    // the loader function
    loader: () => import(`@/assets/flowbite_icons/${icon}.svg`),

    // A component to use while the async component is loading
    loadingComponent: FwbSpinner,
    // Delay before showing the loading component. Default: 200ms.
    delay: 0,

    // A component to use if the load fails
    errorComponent: FwbSpinner,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 3000,
  });

  return AsyncComp;
};










/* import { defineAsyncComponent } from 'vue'

export const getFBIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/flowbite_icons/${icon}.svg`))

export const getImage = (path: string) =>
  new URL(`/src/assets/images/${path}`, import.meta.url).href; */
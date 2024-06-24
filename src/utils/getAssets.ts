import { defineAsyncComponent } from "vue";

export const getImage = (path: string) =>
  new URL(`/src/assets/icons/${path}`, import.meta.url).href;

export const getAsset = (path: string) =>
  new URL(`/src/assets/${path}`, import.meta.url).href;
/* @vite-ignore */
export const getIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/icons/${icon}.svg`));

export const getIconD = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/icons_new/${icon}.svg`));

export const getFBIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/flowbite_icons/${icon}.svg`));

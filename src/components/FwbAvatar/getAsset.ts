import { defineAsyncComponent } from 'vue'

export const getFBIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/flowbite_icons/${icon}.svg`))

export const getImage = (path: string) =>
  new URL(`/src/assets/images/${path}`, import.meta.url).href;
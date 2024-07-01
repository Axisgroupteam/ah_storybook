import { defineAsyncComponent } from 'vue'

export const getFBIcon = (icon: string) =>
  defineAsyncComponent(() => import(`@/assets/flowbite_icons/${icon}.svg`))

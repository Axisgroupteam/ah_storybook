import type { BadgeSize, BadgeType, BadgeVariant } from '../types'
import { computed, type Ref, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

const defaultBadgeClasses = 'mr-2 px-2.5 py-0.5 rounded flex items-center justify-center w-fit'
const badgeLinkClasses =
  'bg-red-100 hover:bg-red-200 text-red-800 dark:text-red-800 dark:hover:bg-red-300'
const onlyIconClasses = 'p-1 rounded-full mr-2'

const badgeTextClasses: Record<BadgeType, string> = {
  purple: 'text-purple-800 dark:text-purple-300',
  fuchsia: 'text-fuchsia-800 dark:text-fuchsia-300',
  violet: 'text-violet-800 dark:text-violet-300',
  indigo: 'text-indigo-800 dark:text-indigo-300',
  blue: 'text-blue-800 dark:text-blue-300',
  sky: 'text-sky-800 dark:text-sky-300',
  cyan: 'text-cyan-800 dark:text-cyan-300',
  teal: 'text-teal-800 dark:text-teal-300',
  emerald: 'text-emerald-800 dark:text-emerald-300',
  green: 'text-green-800 dark:text-green-300',
  rose: 'text-rose-800 dark:text-rose-300',
  lime: 'text-lime-800 dark:text-lime-300',
  orange: 'text-orange-800 dark:text-orange-300',
  yellow: 'text-yellow-800 dark:text-yellow-300',
  amber: 'text-amber-800 dark:text-amber-300',
  red: 'text-red-800 dark:text-red-300',
  primary: 'text-red-800 dark:text-red-300',
  dark: 'text-neutral-800 dark:text-neutral-300',
  pink: 'text-pink-800 dark:text-pink-300'
}

const badgeTypeClasses: Record<BadgeType, string> = {
  purple: 'bg-purple-100 dark:bg-purple-900',
  fuchsia: 'bg-fuchsia-100 dark:bg-fuchsia-900',
  violet: 'bg-violet-100 dark:bg-violet-900',
  indigo: 'bg-indigo-100 dark:bg-indigo-900',
  blue: 'bg-blue-100 dark:bg-blue-900',
  sky: 'bg-sky-100 dark:bg-sky-900',
  cyan: 'bg-cyan-100 dark:bg-cyan-900',
  teal: 'bg-teal-100 dark:bg-teal-900',
  emerald: 'bg-emerald-100 dark:bg-emerald-900',
  green: 'bg-green-100 dark:bg-green-900',
  rose: 'bg-rose-100 dark:bg-rose-900',
  lime: 'bg-lime-100 dark:bg-lime-900',
  orange: 'bg-orange-100 dark:bg-orange-900',
  yellow: 'bg-yellow-100 dark:bg-yellow-900',
  amber: 'bg-amber-100 dark:bg-amber-900',
  red: 'bg-red-100 dark:bg-red-900',
  primary: 'bg-red-100 dark:bg-red-900',
  dark: 'bg-neutral-100 dark:bg-neutral-900',
  pink: 'bg-pink-100 dark:bg-pink-900'
}

const badgeSizeClasses: Record<BadgeSize, string> = {
  xs: 'text-xs font-semibold',
  sm: 'text-sm font-medium'
}

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: '',
  counter: 'w-fit rounded-lg px-1',
  indicator: 'inline-block w-2 h-2 bg-red-500 rounded-full'
}

const badgeCloseButtonClasses: Record<BadgeType, string> = {
  purple: 'text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800',
  fuchsia: 'text-fuchsia-800 dark:text-fuchsia-300 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800',
  violet: 'text-violet-800 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800',
  indigo: 'text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800',
  blue: 'text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800',
  sky: 'text-sky-800 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-800',
  cyan: 'text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800',
  teal: 'text-teal-800 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800',
  emerald: 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800',
  green: 'text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
  rose: 'text-rose-800 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800',
  lime: 'text-lime-800 dark:text-lime-300 hover:bg-lime-200 dark:hover:bg-lime-800',
  orange: 'text-orange-800 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800',
  yellow: 'text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800',
  amber: 'text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800',
  red: 'text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800',
  primary: 'text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800',
  dark: 'text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800',
  pink: 'text-pink-800 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800'
}

export type UseBadgeClassesProps = {
  type: BadgeType
  size: BadgeSize
  href: string | null
  variant: BadgeVariant
  closable: boolean
}

export type UseBadgeClassesOptions = {
  isContentEmpty: Ref<boolean>
}

export function useBadgeClasses(
  props: UseBadgeClassesProps,
  options: UseBadgeClassesOptions
): {
  badgeClasses: Ref<string>
  closeButtonClasses: Ref<string>
} {
  const attrs = useAttrs()
  const badgeClasses = computed<string>(() => {
    return twMerge(
      badgeSizeClasses[props.size],
      props.href ? '' : badgeTypeClasses[props.type],
      props.href ? '' : badgeTextClasses[props.type],
      props.href ? badgeLinkClasses : '',
      props.variant === 'default'
        ? options.isContentEmpty.value
          ? onlyIconClasses
          : defaultBadgeClasses
        : '',
      badgeVariantClasses[props.variant],
      attrs.class as string
    )
  })

  const closeButtonClasses = computed<string>(() => {
    return twMerge('flex justify-center items-center', badgeCloseButtonClasses[props.type])
  })

  return {
    badgeClasses,
    closeButtonClasses
  }
}

import type { BadgeSize, BadgeType, BadgeVariant } from '../types'
import { computed, type Ref, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

const defaultBadgeClasses = 'mr-2 px-2.5 py-0.5 rounded flex items-center justify-center w-fit'
const badgeLinkClasses =
  'bg-red-100 hover:bg-red-200 text-red-800 dark:text-red-800 dark:hover:bg-red-300'
const onlyIconClasses = 'p-1 rounded-full mr-2'

const badgeTextClasses: Record<BadgeType, string> = {
  primary: 'text-red-800 dark:text-red-300',
  dark: 'text-neutral-800 dark:text-neutral-300',
  red: 'text-red-800 dark:text-red-300',
  green: 'text-green-800 dark:text-green-300',
  yellow: 'text-yellow-800 dark:text-yellow-300',
  indigo: 'text-indigo-800 dark:text-indigo-300',
  purple: 'text-purple-800 dark:text-purple-300',
  pink: 'text-pink-800 dark:text-pink-300',
  blue: 'text-blue-800 dark:text-blue-300'
}

const badgeTypeClasses: Record<BadgeType, string> = {
  primary: 'bg-red-100 dark:bg-red-900',
  dark: 'bg-neutral-100 dark:bg-neutral-900',
  red: 'bg-red-100 dark:bg-red-900',
  green: 'bg-green-100 dark:bg-green-900',
  yellow: 'bg-yellow-100 dark:bg-yellow-900',
  indigo: 'bg-indigo-100 dark:bg-indigo-900',
  purple: 'bg-purple-100 dark:bg-purple-900',
  pink: 'bg-pink-100 dark:bg-pink-900',
  blue: 'bg-blue-100 dark:bg-blue-900'
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
  primary: 'text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800',
  dark: 'text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800',
  red: 'text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800',
  green: 'text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
  yellow: 'text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800',
  indigo: 'text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800',
  purple: 'text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800',
  pink: 'text-pink-800 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800',
  blue: 'text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
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

import { computed, type Ref, useSlots } from 'vue'
import type { BadgeSize, BadgeVariant } from '../types'

export type BadgeClassMap<T extends string> = {
  default: Record<T, string>
}

const badgeColorClasses: BadgeClassMap<BadgeVariant> = {
  default: {
    primary:
      'inline-flex items-center gap-1 rounded-md active:outline-none font-medium text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900',
    secondary:
      'inline-flex items-center gap-1 rounded-md active:outline-none font-medium text-neutral-500 dark:text-neutral-400 bg-white active:z-10 dark:bg-neutral-800',
    tertiary:
      'inline-flex items-center gap-1 rounded-md active:outline-none font-medium text-white dark:text-neutral-900 bg-neutral-800 dark:bg-white'
  },
}

const BadgeSizeClasses: Record<BadgeSize, string> = {
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-xs px-2.5 py-0.5',
  md: 'text-md px-3 py-1',
  lg: 'text-base px-3.5 py-1.5'
}

const indicatorBClasses = 'h-2 w-2 bg-red-500 dark:bg-red-500 rounded-full'

const pillBClasses = 'bg-red-100 dark:bg-red-900 text-red-500 inline-flex px-1.5 rounded-full text-sm'

const badgeSquareSizeClasses: Record<BadgeSize, string> = {
  xs: 'text-xs p-0.5',
  sm: 'text-xs p-1',
  md: 'text-md p-1.5',
  lg: 'text-base p-2'
}

export type UseBadgeClassesProps = {
  class: Ref<string>
  indicator: Ref<boolean>
  pill: Ref<boolean>
  size: Ref<BadgeSize>
  square: Ref<boolean>
  color: Ref<BadgeVariant>
}

export function useBadgeClasses(props: UseBadgeClassesProps): {
  indicatorClasses: string
  pillClasses: string
  wrapperClasses: string
  spanClasses: string
} {
  const slots = useSlots()

  const sizeClasses = computed(() => {
    if (props.square.value) return badgeSquareSizeClasses[props.size.value]
    return BadgeSizeClasses[props.size.value]
  })

  const pbClasses = computed(() => {
    if (props.pill.value) return pillBClasses

    return ''
  })

  const ibClasses = computed(() => {
    if (props.indicator.value) return indicatorBClasses

    return ''
  })

  const bindClasses = computed(() => {
    let backgroundClass = ''
    // JUST COLOR
    const color = props.color.value

    backgroundClass =
      badgeColorClasses.default[color as unknown as keyof typeof badgeColorClasses.default]

    return [
      backgroundClass,
      props.pill.value && '!rounded-full',
      pbClasses,
      ibClasses,
      sizeClasses.value,
      (slots.prefix || slots.suffix || slots.default) && 'inline-flex items-center',
      props.class.value
    ]
      .filter((str) => str)
      .join(' ')
  })

  const spanClasses = computed(() => {
    return ''
  })

  return {
    indicatorClasses: ibClasses.value,
    pillClasses:pbClasses.value,
    wrapperClasses: bindClasses.value,
    spanClasses: spanClasses.value
  }
}

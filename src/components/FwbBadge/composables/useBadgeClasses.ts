//import { ref, computed, type Ref } from 'vue'
import { computed, type Ref, useSlots } from 'vue'
import type { BadgeSize, BadgeVariant } from '../types'

export type BadgeClassMap<T extends string> = {
  default: Record<T, string>
}

const badgeColorClasses: BadgeClassMap<BadgeVariant> = {
  default: {
    primary:
      'active:outline-none text-white bg-red-700 active:ring-4 active:ring-red-200 font-medium rounded-lg dark:bg-red-700 dark:active:ring-red-600',
    secondary:
      'font-medium text-neutral-500 active:outline-none bg-white rounded-lg border border-neutral-200 active:z-10 active:ring-4 active:ring-neutral-200 dark:active:ring-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600',
    tertiary:
      'text-white dark:text-neutral-900 bg-neutral-800 active:outline-none active:ring-4 active:ring-neutral-300 font-medium rounded-lg dark:bg-white dark:active:ring-neutral-600 dark:border-neutral-700'
  },
}

const BadgeSizeClasses: Record<BadgeSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5'
}

const badgeSquareSizeClasses: Record<BadgeSize, string> = {
  sm: 'text-sm p-1.5',
  md: 'text-sm p-2',
  lg: 'text-base p-2.5'
}

export type UseBadgeClassesProps = {
  class: Ref<string>
  pill: Ref<boolean>
  size: Ref<BadgeSize>
  square: Ref<boolean>
  color: Ref<BadgeVariant>
}

export function useBadgeClasses(props: UseBadgeClassesProps): {
  wrapperClasses: string
  spanClasses: string
} {
  const slots = useSlots()

  const sizeClasses = computed(() => {
    if (props.square.value) return badgeSquareSizeClasses[props.size.value]
    return BadgeSizeClasses[props.size.value]
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
      sizeClasses.value,
      (slots.prefix || slots.suffix) && 'inline-flex items-center',
      props.class.value
    ]
      .filter((str) => str)
      .join(' ')
  })

  const spanClasses = computed(() => {
    return ''
  })

  return {
    wrapperClasses: bindClasses.value,
    spanClasses: spanClasses.value
  }
}

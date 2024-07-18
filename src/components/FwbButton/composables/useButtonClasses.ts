import { computed, type Ref, useSlots } from 'vue'
import type { ButtonSize, ButtonVariant } from '../types'

export type ButtonClassMap<T extends string> = {
  hover: Record<T, string>
  default: Record<T, string>
}

const buttonColorClasses: ButtonClassMap<ButtonVariant> = {
  default: {
    primary:
      'active:outline-none text-white bg-red-700 active:ring-4 active:ring-red-200 font-medium rounded-lg dark:bg-red-700 dark:active:ring-red-600 border border-transparent dark:border-transparent',
    secondary:
      'font-medium text-neutral-500 active:outline-none bg-white rounded-lg border border-neutral-200 active:z-10 active:ring-4 active:ring-neutral-200 dark:active:ring-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600',
    terciary:
      'text-white dark:text-neutral-900 bg-neutral-800 active:outline-none active:ring-4 active:ring-neutral-300 font-medium rounded-lg dark:bg-white dark:active:ring-neutral-600 dark:border-neutral-700 border border-transparent dark:border-transparent'
  },
  hover: {
    primary: 'hover:bg-red-800 dark:hover:bg-red-800',
    secondary:
      'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:text-white dark:hover:bg-neutral-700',
    terciary: 'hover:bg-neutral-900 dark:hover:bg-neutral-100'
  }
}

const buttonSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  xl: 'text-base px-6 py-3'
}

const buttonSquareSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs p-1',
  sm: 'text-sm p-1.5',
  md: 'text-sm p-2',
  lg: 'text-base p-2.5',
  xl: 'text-base p-3'
}

export type UseButtonClassesProps = {
  class: Ref<string>
  pill: Ref<boolean>
  disabled: Ref<boolean>
  loading: Ref<boolean>
  size: Ref<ButtonSize>
  square: Ref<boolean>
  color: Ref<ButtonVariant>
}

export function useButtonClasses(props: UseButtonClassesProps): {
  wrapperClasses: string
  spanClasses: string
} {
  const slots = useSlots()

  const sizeClasses = computed(() => {
    if (props.square.value) return buttonSquareSizeClasses[props.size.value]
    return buttonSizeClasses[props.size.value]
  })

  const bindClasses = computed(() => {
    let hoverClass = ''
    let backgroundClass = ''
    // JUST COLOR
    const color = props.color.value

    backgroundClass =
      buttonColorClasses.default[color as unknown as keyof typeof buttonColorClasses.default]

    if (!props.disabled.value)
      hoverClass =
        buttonColorClasses.hover[color as unknown as keyof typeof buttonColorClasses.hover]

    return [
      backgroundClass,
      hoverClass,
      props.pill.value && '!rounded-full',
      props.disabled.value && 'cursor-not-allowed opacity-50',
      sizeClasses.value,
      (slots.prefix || slots.suffix || props.loading.value) && 'inline-flex items-center',
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

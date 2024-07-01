import { computed, type Ref } from 'vue'
import type { TabsVariant } from '../types'
import { twMerge } from 'tailwind-merge'

export type UseTabsClassesProps = {
  variant: TabsVariant
}

export function useTabsClasses(props: UseTabsClassesProps): {
  divClasses: Ref<string>
  ulClasses: Ref<string>
} {
  const ulClasses = computed(() => {
    const baseClasses =
      'flex flex-wrap font-medium text-center text-neutral-500 dark:text-neutral-400 text-sm'

    return twMerge(
      baseClasses,
      props.variant === 'underline' && '-mb-px',
      props.variant === 'default' && 'border-b border-neutral-200 dark:border-neutral-700'
    )
  })

  const divClasses = computed(() => {
    if (props.variant === 'underline') {
      return 'border-b border-neutral-200 dark:border-neutral-700 font-medium text-center text-neutral-500 dark:text-neutral-400 text-sm'
    }

    return ''
  })

  return {
    divClasses,
    ulClasses
  }
}

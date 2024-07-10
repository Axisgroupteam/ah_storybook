import { computed, inject, type Ref } from 'vue'
import classNames from 'classnames'

const baseClasses =
  'bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 h-[54px] max-h-[54px]'
const stripedClasses =
  'odd:bg-white even:bg-neutral-50 odd:dark:bg-neutral-800 even:dark:bg-neutral-700'
const hoverableClasses = 'hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer'

export function useTableRowClasses(): { tableRowClasses: Ref<string> } {
  const isStriped = inject('striped')
  const isHoverable = inject('hoverable')

  const tableRowClasses = computed(() =>
    classNames(baseClasses, {
      [hoverableClasses]: isHoverable,
      [stripedClasses]: isStriped
    })
  )

  return { tableRowClasses }
}

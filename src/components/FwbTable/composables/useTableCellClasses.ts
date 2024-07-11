import { computed, inject, type Ref } from 'vue'
import classNames from 'classnames'

const baseClasses = 'p-4 whitespace-nowrap max-h-[54px] h-[54px] text-sm leading-[21px]'
const stripedCellClasses =
  'even:bg-neutral-white even:dark:bg-neutral-900 odd:dark:bg-neutral-800 odd:bg-neutral-50'

export function useTableCellClasses(): { tableCellClasses: Ref<string> } {
  const isColumnsStriped = inject('stripedColumns')

  const tableCellClasses = computed(() =>
    classNames(baseClasses, { [stripedCellClasses]: isColumnsStriped })
  )

  return { tableCellClasses }
}

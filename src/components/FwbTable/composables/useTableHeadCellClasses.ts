import { computed, inject, type Ref } from 'vue'
import classNames from 'classnames'

const baseClasses = 'p-4 uppercase text-xs leading-[18px]'
const stripedHeadCellClasses =
  'even:bg-white even:dark:bg-neutral-900 odd:dark:bg-neutral-800 odd:bg-neutral-50'

export function useTableHeadCellClasses(): {
  tableHeadCellClasses: Ref<string>
} {
  const isColumnsStriped = inject('stripedColumns')

  const tableHeadCellClasses = computed(() =>
    classNames(baseClasses, { [stripedHeadCellClasses]: isColumnsStriped })
  )

  return { tableHeadCellClasses }
}

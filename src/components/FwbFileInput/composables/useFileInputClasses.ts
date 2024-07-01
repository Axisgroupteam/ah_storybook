import { computed } from 'vue'
import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses'

const fileInpDefaultClasses =
  'block w-full text-sm text-neutral-900 border-[1px] border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 dark:text-neutral-400 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400'
const fileInpLabelClasses = 'block mb-2 text-sm font-medium text-neutral-900 dark:text-white'
const fileInpDropzoneClasses =
  'flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600'
const fileDropzoneWrapClasses = 'flex flex-col items-center justify-center pt-5 pb-6'
const fileDropzoneDefaultTextClasses =
  'flex flex-col justify-center items-center gap-2 !-mb-2 text-sm text-neutral-500 dark:text-neutral-400'

export function useFileInputClasses(size: string) {
  const fileInpClasses = computed(() =>
    simplifyTailwindClasses(fileInpDefaultClasses, 'text-' + size)
  )

  const labelClasses = computed(() => fileInpLabelClasses)
  const dropzoneLabelClasses = computed(() => fileInpDropzoneClasses)
  const dropzoneWrapClasses = computed(() => fileDropzoneWrapClasses)
  const dropzoneTextClasses = computed(() => fileDropzoneDefaultTextClasses)

  return {
    fileInpClasses,
    labelClasses,
    dropzoneLabelClasses,
    dropzoneWrapClasses,
    dropzoneTextClasses
  }
}

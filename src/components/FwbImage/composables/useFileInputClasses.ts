import { computed, type Ref } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type ValidationStatus, validationStatusMap } from '../types'

// LABEL
const baseLabelClasses = 'block mb-2 text-sm font-medium'
const disabledLabelClasses = 'text-neutral-400 dark:text-neutral-500'

// FILE INPUT
  const fileInpDropzoneClasses =
  'flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-600'

  const fileDropzoneWrapClasses = 'flex flex-col items-center justify-center pt-5 pb-6'
  const fileDropzoneDefaultTextClasses =
  'flex flex-col justify-center items-center gap-2 !-mb-2 text-sm text-neutral-500 dark:text-neutral-400'

  const errorFileInpDropzoneClasses =
  'flex flex-col items-center justify-center text-red-900 w-full h-64 border-2 border-red-500 border-dashed rounded-lg cursor-pointer bg-red-50 hover:bg-red-100 dark:border-red-500 dark:hover:border-red-500'

  const errorFileInpDropzoneTextClasses =
  'text-red-900'


const disabledFileInputClasses =
  'cursor-not-allowed bg-neutral-50 text-neutral-300 hover:bg-neutral-50'


export function useFileInputClasses(  
  disabled: boolean,
  validationStatus: ValidationStatus | undefined
): {
  //fileInputClasses: Ref<string>
  labelClasses: Ref<string>
  dropzoneLabelClasses: Ref<string>
  dropzoneWrapClasses: Ref<string>
  dropzoneTextClasses: Ref<string>
} {
  /*const fileInputClasses = computed(() => {
    const vs = validationStatus

    const classByStatus = vs === validationStatusMap.Error ? errorFileInputClasses : ''

    return twMerge(
      defaultFileInputClasses,
      classByStatus,     
      disabled ? disabledFileInputClasses : ''
    )
  })*/

  const labelClasses = computed(() => {
    const vs = validationStatus
    const classByStatus =
      vs === validationStatusMap.Error
        ? 'text-red-700 dark:text-red-500'
        : 'text-neutral-900 dark:text-white'

    const disabledClasses = disabled ? disabledLabelClasses : ''

    return twMerge(baseLabelClasses, classByStatus, disabledClasses)
  })

  const dropzoneLabelClasses = computed(() => {
    const vs = validationStatus

    const classByStatus = vs === validationStatusMap.Error ? errorFileInpDropzoneClasses : ''

    return twMerge(
      fileInpDropzoneClasses,
      classByStatus,     
      disabled ? disabledFileInputClasses : ''
    )
  })

  const dropzoneWrapClasses = computed(() => fileDropzoneWrapClasses);
  
  const dropzoneTextClasses = computed(() => {
    const vs = validationStatus

    const classByStatus = vs === validationStatusMap.Error ? errorFileInpDropzoneTextClasses : ''

    return twMerge(
      fileDropzoneDefaultTextClasses,
      classByStatus,     
      disabled ? disabledFileInputClasses : ''
    )
  })

  return {
    //fileInputClasses,
    labelClasses,
    dropzoneLabelClasses,
    dropzoneWrapClasses,
    dropzoneTextClasses
  }
}

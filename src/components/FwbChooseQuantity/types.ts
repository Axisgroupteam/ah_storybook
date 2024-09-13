export type InputSize = 'sm' | 'md' | 'lg'

export type InputType = 'number' | 'text'

export const validationStatusMap = {
  Normal: 'normal',
  Error: 'error'
} as const

export type ValidationStatus = (typeof validationStatusMap)[keyof typeof validationStatusMap]

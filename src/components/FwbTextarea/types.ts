export const validationStatusMap = {
  Normal: 'normal',
  Error: 'error'
} as const

export type ValidationStatus = (typeof validationStatusMap)[keyof typeof validationStatusMap]

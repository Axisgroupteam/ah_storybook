export type InputSize = 'sm' | 'md' | 'lg'
import type { iconsNames } from '@/components/data/icons'

export type OptionsType = {
  name: string
  value: string
  icon: iconsNames
}

export const validationStatusMap = {
  Success: 'success',
  Error: 'error'
} as const

export type ValidationStatus = (typeof validationStatusMap)[keyof typeof validationStatusMap]

import { computed } from 'vue'
import type { IndicatorColor, IndicatorVariant } from '../types'

export function useFwbIndicatorClasses(color: IndicatorColor, variant: IndicatorVariant) {
  const colorClasses = computed(() => {
    switch (color) {
      case 'neutral':
        return 'bg-neutral-200 text-neutral-900'
      case 'dark':
        return 'bg-neutral-900 text-white dark:bg-neutral-700'
      case 'blue':
        return 'bg-blue-600 text-white'
      case 'green':
        return 'bg-green-500 text-white'
      case 'red':
        return 'bg-red-500 text-white'
      case 'purple':
        return 'bg-purple-500 text-white'
      case 'indigo':
        return 'bg-indigo-500 text-white'
      case 'yellow':
        return 'bg-yellow-300 text-yellow-800'
      case 'teal':
        return 'bg-teal-500 text-white'
      case 'carousel':
        return 'bg-white dark:bg-neutral-900'
      default:
        return 'bg-neutral-200 text-neutral-900'
    }
  })

  const pillColorClasses = computed(() => {
    switch (color) {
      case 'neutral':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
      case 'dark':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
      case 'blue':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'red':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'purple':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'teal':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
    }
  })

  const baseClasses = computed(() => [
    'flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'flex-shrink-0',
    colorClasses.value,
    variant === 'contained-text'
      ? 'w-6 h-6 text-xs font-bold border-2 border-white dark:border-neutral-900'
      : 'w-3 h-3',
    variant === 'with-text' ? 'me-2' : '' // Aumentamos un poco el margen para mejor separación
  ])

  const wrapperClasses = computed(() => {
    if (variant === 'with-text') {
      return [
        'inline-flex',
        'items-center',
        'text-sm',
        'font-medium',
        'text-neutral-900',
        'dark:text-white'
      ]
    } else if (variant === 'contained-text') {
      return 'inline-flex'
    }
    return []
  })

  const pillClasses = computed(() => [
    'inline-flex',
    'items-center',
    'text-xs',
    'font-medium',
    'px-2.5',
    'py-0.5',
    'rounded-full',
    pillColorClasses.value
  ])

  const pillIndicatorClasses = computed(() => [
    'w-2',
    'h-2',
    'me-1',
    'rounded-full',
    colorClasses.value.split(' ')[0] // Usa el color de fondo del indicador original
  ])

  return {
    baseClasses,
    wrapperClasses,
    pillClasses,
    pillIndicatorClasses
  }
}

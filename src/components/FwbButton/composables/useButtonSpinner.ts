import { computed, type Ref } from 'vue'
import type { ButtonSize, ButtonVariant } from '../types'
import type { SpinnerColor, SpinnerSize } from './../../FwbSpinner/types'

export type UseButtonSpinnerProps = {
  size: Ref<ButtonSize>
  color: Ref<ButtonVariant>
}

export function useButtonSpinner(props: UseButtonSpinnerProps): {
  size: Ref<SpinnerSize>
  color: Ref<SpinnerColor>
} {
  const btnSizeSpinnerSizeMap: Record<ButtonSize, SpinnerSize> = {
    xs: '2.5',
    sm: '3',
    md: '4',
    lg: '5',
    xl: '6'
  }

  const size = computed<SpinnerSize>(() => btnSizeSpinnerSizeMap[props.size.value])

  const color = computed<SpinnerColor>(() => {
    if (props.color.value === 'primary') {
      return 'white'
    } else {
      return 'gray'
    }
  })

  return {
    color,
    size
  }
}

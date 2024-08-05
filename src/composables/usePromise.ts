import type { AxiosError } from 'axios'
import { ref } from 'vue'

export const usePromise = <T = any, E = any, P = any>(
  funct: (...args: any) => any,
  onSuccess?: (...args: any) => any,
  onError?: (arg: string) => void
) => {
  const data = ref<T>()
  const error = ref<E>()
  const loading = ref(false)

  const request = async (...args: (any | P)[]) => {
    if (loading.value) return
    data.value = undefined
    error.value = undefined
    loading.value = true
    await funct(...args)
      .then((result: any) => {
        data.value = result
        onSuccess && onSuccess(result)
      })
      .catch((err: E) => {
        error.value = err
        const message = ((err as AxiosError)?.response?.data as any)?.message
        onError &&
          onError(
            typeof message === 'object'
              ? message?.message?.join('\n')
              : (message ?? (err as any)?.message ?? (err as any))
          )
      })

    loading.value = false
  }

  return { data, error, loading, request }
}

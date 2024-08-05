import type { AxiosError } from 'axios'
import { computed, onMounted, ref, unref, watch, type MaybeRef, type Ref } from 'vue'
import { usePromise } from './usePromise'

import { useToast } from 'vue-toastification'

export interface ApiResponseError {
  statusCode: number
  message?: string
  error?: string
}

export interface Pagination<T> {
  total: number
  totalPages: number
  currentPage: number
  items: T[]
}

export interface PaginationPayload<P = object> {
  page?: number
  limit?: number
  sort?: 1 | -1
  search?: string | Ref | undefined
  payload?: P
  issueType?: string
  company?: MaybeRef<string>
}

export const usePaginationApi = <T = any, P = object | undefined>(
  getItemsFunction: (args: PaginationPayload<P>) => Promise<Pagination<T>>,
  { payload, limit: limitP, company }: PaginationPayload<P>
) => {
  const page = ref(1)
  const totalPages = ref(1)
  const items = ref([]) as Ref<T[]>
  const total = ref(0)
  const search = ref('')
  const type = ref('')
  const limit = ref(10)

  const comp = unref(company)

  const getItems = async () => {
    return await getItemsFunction({
      limit: limit.value,
      page: page.value,
      search: unref(search) ? unref(search) : undefined,
      type: unref(type) ? unref(type) : undefined,
      //type: unref(type) ? unref(type) : undefined,
      company: comp ? comp : undefined,
      payload
    } as PaginationPayload<P>)
  }

  const { data, error, loading, request } = usePromise<Pagination<T>, AxiosError<ApiResponseError>>(
    getItems
  )

  watch(
    data,
    (value) => {
      if (value) {
        //console.log("data change");
        items.value = value.items ?? []
        totalPages.value = value.totalPages ?? 0
        total.value = value.total ?? 0
      } else {
        // Manejo del caso en que value sea undefined
        items.value = []
        totalPages.value = 0
        total.value = 0
      }
    },
    { deep: true }
  )

  watch([items, page], (act, prev) => {
    if (act[0].length !== prev[0].length && act[1] === prev[1]) {
      request()
    }
  })

  /*watch(search, (act, prev) => {
    if (act !== prev) {
      // console.log("searching");
      page.value = 1;
      request();
    }
  });*/

  watch(type, (act, prev) => {
    if (act !== prev) {
      page.value = 1
      request()
    }
  })

  watch(page, (value) => {
    if (value) {
      request()
    }
  })

  watch(
    limit,
    (value) => {
      if (value) {
        console.log('limit change')
        request()
      }
    },
    { deep: true }
  )

  onMounted(() => {
    search.value = ''
    if (limitP) limit.value = limitP
    request()
  })

  const nextPage = () => {
    if (page.value < totalPages.value && !loading.value) page.value += 1
  }

  const prevPage = () => {
    if (page.value > 1 && !loading.value) page.value -= 1
  }

  const toast = useToast()

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages.value && !loading.value) {
      page.value = Number(p)
    } else {
      toast.error(`Invalid page number, page must be between 1 and ${totalPages.value}`)
    }
  }

  return {
    currentPage: computed(() => page.value),
    items,
    error,
    loading,
    totalPages,
    total,
    search,
    type,
    nextPage,
    prevPage,
    goToPage,
    request,
    limit
  }
}

import { computed, type Ref } from 'vue'
import classNames from 'classnames'

const breadcrumbItemDefaultClasses =
  'ml-1 inline-flex items-center text-sm font-medium dark:text-neutral-400'
const breadcrumbItemLinkClasses = 'text-neutral-700 hover:text-neutral-900 dark:hover:text-white'
const breadcrumbSpanClasses = 'text-neutral-500'

export type useBreadcrumbItemProps = {
  href: Ref<string>
  home: Ref<boolean>
}

export function useBreadcrumbItemClasses(props: useBreadcrumbItemProps): {
  breadcrumbItemClasses: Ref<string>
} {
  const breadcrumbItemClasses = computed<string>(() =>
    classNames(
      breadcrumbItemDefaultClasses,
      props.href.value ? breadcrumbItemLinkClasses : breadcrumbSpanClasses
    )
  )

  return {
    breadcrumbItemClasses
  }
}

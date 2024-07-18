// useImageGalleryStyles.ts
import { reactive } from 'vue'

export function useImageGalleryStyles() {
  const styles = reactive({
    container: 'flex space-x-4 py-2',
    imageWrapper: 'flex-shrink-0 relative',
    image: 'w-[158px] h-[158px] object-cover rounded-lg',
    deleteButton: 'absolute bottom-5 left-5 text-red-500 cursor-pointer'
  })

  return styles
}

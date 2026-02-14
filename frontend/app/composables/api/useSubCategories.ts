import type { PublicFetchOptions } from '@/composables/useApiFetch'
import type { ISubCategoriesDTO } from '@/types/dto/subCategories'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'

export const usePublicSubCategories = <T = ISubCategoriesDTO[]>(
    categoryId: MaybeRef<string>,
    fetchOptions: PublicFetchOptions<T> = {},
) => {
    return usePublicFetch<T>(() => `api/categories/${unref(categoryId)}/subCategories`, {
        key: () => `public-subcategories-${unref(categoryId)}`,
        notifyOnError: fetchOptions.notifyOnError ?? false,
        ...fetchOptions,
  })
}

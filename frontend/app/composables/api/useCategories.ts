import type { PublicFetchOptions } from '@/composables/useApiFetch'
import type { ICategory } from '@/types/types'
import type { MaybeRefOrGetter } from 'vue'

export const usePublicCategories = <T = ICategory[]>(
    params?: MaybeRefOrGetter<{
        limit?: number,
    }>,
    fetchOptions: PublicFetchOptions<T> = {}
) => {
    const query = computed(() => {
        const p = toValue(params)
        return {
            limit: p?.limit || 20,
        }
    })

    return usePublicFetch<T>('api/categories', {
        key: () => `public-categories-${toValue(params)?.limit || 'all'}`,
        query,
        notifyOnError: fetchOptions.notifyOnError ?? false,
        ...fetchOptions,
    })
}

export const usePublicCategory = (id: MaybeRef<string>) => {
    return usePublicFetch(() => `api/categories/${unref(id)}`, {
        key: () => `public-category-${unref(id)}`
    })
}
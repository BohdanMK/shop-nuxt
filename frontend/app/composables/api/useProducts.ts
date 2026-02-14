import { toValue, computed } from 'vue'
import type { PublicFetchOptions } from '@/composables/useApiFetch'
import type { ProductDTO } from '@/types/dto/product'
import type { MaybeRefOrGetter } from 'vue'

export const usePublicProducts = <T = ProductDTO[]>(
    params?: MaybeRefOrGetter<{
        categoryId?: string
        subCategoryId?: string
        limit?: number
        isOnSale?: boolean
    }>,
    fetchOptions: PublicFetchOptions<T> = {}
    ) => {

    const normalizedParams = computed(() => {
        const p = toValue(params) || {}
        return {
        ...(p.categoryId ? { categoryId: p.categoryId } : {}),
        ...(p.subCategoryId ? { subCategoryId: p.subCategoryId } : {}),
        ...(p.limit ? { limit: p.limit } : { limit: 20 }),
        ...(typeof p.isOnSale === 'boolean' ? { isOnSale: p.isOnSale } : {})
        }
    })

    const key = computed(() => {
        return `public-products-${JSON.stringify(normalizedParams.value)}`
    })

    return usePublicFetch<T>('api/products', {
        query: normalizedParams,
        key,
        notifyOnError: fetchOptions.notifyOnError ?? false,
        ...fetchOptions
    })
}


export const usePublicProduct = (id: MaybeRef<string>) => {
    return usePublicFetch(() => `api/products/${unref(id)}`, {
        key: () => `public-product-${unref(id)}`
    })
}
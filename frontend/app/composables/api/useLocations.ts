import type { PublicFetchOptions } from '@/composables/useApiFetch'
import type { Location } from '@/types/dto/locations.dto'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'

export interface LocationsPage {
    items: Location[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export const useAdminLocations = (
    params?: MaybeRefOrGetter<{ limit?: number; page?: number }>,
    fetchOptions: PublicFetchOptions<LocationsPage> = {}
) => {
    const query = computed(() => {
        const p = toValue(params)
        return { limit: p?.limit ?? 10, page: p?.page ?? 1 }
    })

    return usePublicFetch<LocationsPage>('api/locations/admin', {
        key: () => `admin-locations-${JSON.stringify(toValue(params))}`,
        query,
        notifyOnError: fetchOptions.notifyOnError ?? true,
        ...fetchOptions,
    })
}

export const useAdminLocation = (id: MaybeRef<number | string>) => {
    return usePublicFetch<Location>(() => `api/locations/admin/${unref(id)}`, {
        key: () => `admin-location-${unref(id)}`,
    })
}
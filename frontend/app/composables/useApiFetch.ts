import type { UseFetchOptions } from 'nuxt/app'
import { useToast } from '#imports'

export type PublicFetchOptions<T> = UseFetchOptions<T> & {
    notifyOnError?: boolean
}

export const usePublicFetch = <T>(
    url: string | (() => string),
    options: PublicFetchOptions<T> = {}
) => {
    const config = useRuntimeConfig()
    const toast = useToast()

    const { notifyOnError, ...fetchOptions } = options

    return useFetch(url, {
        ...fetchOptions,
        baseURL: config.public.apiBase as string,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': 'uk-UA',
            ...fetchOptions.headers,
        },

        onResponseError({ response }) {
            const data = (response as any)?._data
            const message = data?.message ?? response?.statusText ?? 'Unexpected API error'
            if(notifyOnError) {

                toast.add({
                    title: 'Помилка запиту',
                    description: String(message),
                    color: 'error',
                    duration: 5000,

                })
            }
            console.error('API Error:', response.status, response._data)
        },
    })
}

// export const usePrivateFetch = <T>(
//     url: string | (() => string),
//     options?: UseFetchOptions<T>
// ) => {
//     const config = useRuntimeConfig()
//     const authStore = useAuthStore()

//     return useFetch(url, {
//         ...options,
//         baseURL: config.public.apiBase as string,
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Accept-Language': 'uk-UA',
//             ...(authStore.token && { Authorization: `Bearer ${authStore.token}` }),
//             ...options?.headers,
//         },
//         onResponseError({ response }) {
//             if (response.status === 401) {
//                 authStore.logout()
//                 navigateTo('/login')
//             }
//             console.error('API Error:', response.status, response._data)
//         },
//     })
// }
export const useApiClient = () => {
    const config = useRuntimeConfig()
    //   const authStore = useAuthStore()

    const publicClient = $fetch.create({
        baseURL: config.public.apiBase as string,

        onRequest({ options }) {
            const headers = new Headers(options.headers)
            headers.set('Content-Type', 'application/json')
            headers.set('Accept', 'application/json')
            headers.set('Accept-Language', 'uk-UA')

            options.headers = headers
        },

        onResponseError({ response }) {
        console.error('Public API Error:', response.status, response._data)
    },
    })
// future updates
//   const privateClient = $fetch.create({
//     baseURL: config.public.apiBase,

//     onRequest({ options }) {
//       const token = authStore.token

//       options.headers = {
//         ...options.headers,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Accept-Language': 'uk-UA',
//         ...(token && { 'Authorization': `Bearer ${token}` }),
//       }
//     },

//     onResponse({ response }) {
//       if (import.meta.dev) {
//         console.log('API Response:', response.status, response.url)
//       }
//     },

//     onResponseError({ response }) {
//       if (response.status === 401) {
//         authStore.logout()
//         navigateTo('/login')
//       }

//       if (response.status === 403) {
//         console.error('Access denied:', response._data)
//       }

//       console.error('Private API Error:', response.status, response._data)
//     },
//   })


//   const uploadClient = $fetch.create({
//     baseURL: config.public.apiBase,

//     onRequest({ options }) {
//       const token = authStore.token


//       options.headers = {
//         ...options.headers,
//         'Accept': 'application/json',
//         ...(token && { 'Authorization': `Bearer ${token}` }),
//       }
//     },

//     onResponseError({ response }) {
//       if (response.status === 401) {
//         authStore.logout()
//         navigateTo('/login')
//       }
//     },
//   })

  return {
    publicClient,
    // privateClient,
    // uploadClient,
  }
}

// Хелпери для швидкого доступу
export const usePublicApi = () => useApiClient().publicClient
// export const usePrivateApi = () => useApiClient().privateClient
// export const useUploadApi = () => useApiClient().uploadClient
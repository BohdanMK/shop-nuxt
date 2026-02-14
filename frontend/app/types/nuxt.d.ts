declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch
    $authApi: typeof $fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: typeof $fetch
    $authApi: typeof $fetch
  }
}


export {}
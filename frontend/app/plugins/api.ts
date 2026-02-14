export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
  });

  return {
    provide: {
      apiFetch: apiFetch,
    },
  };
});
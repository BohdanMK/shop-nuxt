// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './app/i18n/config';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_BASE_URL,
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  // Глобальні стилі (Tailwind v4 + твоя база)
  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  typescript: {
    typeCheck: false,
    strict: false, // або true, якщо хочете строгу перевірку
  },
  // Анти-миготіння + коректний viewport для PWA/mobile-first
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#14b8a6" },
        { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#0f172a" },
      ],

      // style: [
      //   { children: "html,body{background:#f8fafc;}@media(prefers-color-scheme:dark){html,body{background:#020617;}}" },
      // ],
    },
  },

  // PWA: вимкнено в dev, прод-набір мінімальний і безпечний
  pwa: {
    // У деві вимикаємо, щоб позбутися 'Fetch handler error: Premature close'
    devOptions: {
      enabled: false,
    },

    // Прод-поведінка
    registerType: "autoUpdate",
    injectRegister: "auto",

    manifest: {
      id: "/?source=pwa",
      name: "My Shop",
      short_name: "Shop",
      description: "Nuxt 4 demo shop with PWA",
      start_url: "/",
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#0f172a",
      theme_color: "#14b8a6",
      lang: "uk",
      icons: [
        // { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
        // { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        // { src: "/pwa-512x512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
      shortcuts: [
        { name: "Каталог", url: "/catalog", icons: [{ src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" }] },
        { name: "Кошик", url: "/cart", icons: [{ src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" }] },
      ],
    },

    // Акуратне кешування у проді (без агресії)
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif}"],
      runtimeCaching: [
        {
          urlPattern: ({ request, url }) =>
            request.destination === "image" && url.origin === self.location.origin,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "image-cache",
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 14 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },

        {
          urlPattern: ({ url }) => /(fonts|cdn)\./.test(url.hostname),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "cdn-cache",
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],


      navigateFallback: "/offline",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: i18nConfig
});
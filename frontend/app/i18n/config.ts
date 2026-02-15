export default {
  locales: [
    {
      code: 'en',
      language: 'en-US',
      name: 'English',
      file: 'en.json'
    },
    {
      code: 'uk',
      language: 'uk-UA',
      name: 'Українська',
      file: 'uk.json'
    }
  ],

  defaultLocale: 'en',
  strategy: 'no_prefix' as const,

  lazy: true,
  langDir: '../app/locales',

  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root' as const
  }
}
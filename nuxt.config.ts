// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      link: [
        { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/grundschrift' }
      ]
    }
  }
})

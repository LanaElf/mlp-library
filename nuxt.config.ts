// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL
              ? process.env.NUXT_PUBLIC_BASE_URL : '/',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
      '@pinia/nuxt',
      'pinia-plugin-persistedstate/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss"  as *;'
        }
      }
    }
  },
  css: [
      '@/assets/styles/global.scss',
      '@/assets/styles/themes/fluttershy.scss',
      '@/assets/styles/themes/twilight.scss',
      '@/assets/styles/themes/celestia.scss',
      '@/assets/styles/themes/luna.scss',
  ],
})

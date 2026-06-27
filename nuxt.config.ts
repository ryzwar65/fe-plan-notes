import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/dashboard', pathPrefix: false },
    { path: '~/components/plans', pathPrefix: false },
    { path: '~/components/transactions', pathPrefix: false },
    '~/components',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    // Cloudflare Workers (SSR) — output: .output/server/index.mjs + .output/public
    preset: 'cloudflare-module',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
    },
  },
  app: {
    head: {
      title: 'Plan Notes — Brutalism Finance',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=DM+Serif+Display&display=swap',
        },
      ],
    },
  },
  typescript: {
    strict: true,
  },
})

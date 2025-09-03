export default defineNuxtConfig({
  
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'ລະບົບ POS ຄົບວົງຈອນ - ລາວ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ລະບົບຂາຍຫນ້າຮ້ານທີ່ສົມບູນແບບສຳລັບປະເທດລາວ' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  srcDir: 'app/',
  compatibilityDate: '2024-12-01',
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000/api",//add apiBase
      appName: 'ລະບົບ POS ຄົບວົງຈອນ',
      version: '1.0.0'
    }
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  image: {
    format: ['webp', 'png', 'jpg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  }
})
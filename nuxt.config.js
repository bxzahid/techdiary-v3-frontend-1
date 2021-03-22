export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Tech Diary',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito&family=Roboto&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/app.scss', 'highlight.js/styles/shades-of-purple.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/visibility-observer.js',
    '@/plugins/select.client.js',
    '@/plugins/clickaway.js',
    '@/plugins/fragment.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/color-mode',
    '@nuxtjs/moment'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/cloudinary',
    '@nuxtjs/toast'
  ],

  axios: {
    baseURL: process.env.NUXT_ENV_APP_URL_CLIENT,
  },

  colorMode: {
    classSuffix: '',
  },

  auth: {
    strategies: {
      local: {
        token: {
          propertyName: 'token',
          required: true,
          type: 'Bearer',
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/user', method: 'get', propertyName: null },
        },
        redirect: {
          login: '/',
          logout: '/',
          callback: '/',
          home: '/dashboard/diaries',
        },
      },
    },
  },

  moment: {
    defaultLocale: 'bn',
    locales: ['bn'],
  },

  tailwindcss: {
    jit: true,
    cssPath: '~/assets/styles/app.scss',
  },
  cloudinary: {
    cloudName: process.env.NUXT_ENV_CLOUDINARY_CLOUDNAME,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}

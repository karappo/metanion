require('dotenv').config()
export default {

  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'METANION',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://apis.google.com/js/api.js',
        async: true,
        defer: true
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/style/common'
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: {
    name: 'circle',
    color: '#79cdbc',
    background: '#222427',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/constants',
  ],

  router: {
    trailingSlash: true,
    middleware: ['sheet-redirect']
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/device',
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
    '@nuxtjs/pwa'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  dotenv: {
    path: process.cwd()
  },
  env: process.env,

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    cssSourceMap: false // Chrome dev tools でcssを変更したときにレイアウトが崩れてしまわないように TODO: devの時だけfalseにする
  }
}

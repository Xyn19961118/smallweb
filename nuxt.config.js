export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '全球防疫物资采购交易会',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '医疗物资展览会，医疗物资采购交易会，防疫物资，防疫物资采购交易会，全球防疫物资采购交易会，展会，会展'
      },
      {
        hid: 'description',
        name: 'description',
        content: '全球防疫物资采购交易会,是天津叁陆零展览股份有限公司联合中国联合国采购促进会、UNDP 联合国开发计划署、UNIDO 联合国工业发展组织、各国驻华使馆、中国国际经济技术交流中心等重点机构共同打造的采购交易盛会。当前，新冠病毒仍在全球快速蔓延，国际社会将会面对更加严峻的困难和挑战。为落实党 中央、国务院“世界各国命运紧相连，人类同舟共济命运共同体”的号召，有效应对疫情，尽 早战胜疫情、维护世界人民健康安全，促进世界的经济恢复发展，分享中国抗击疫情的智慧、 经验、方法，给世界各国抗击疫情提供力所能及的帮助，持续向国际社会伸出援手——供应防 疫物资、原料药、生活必需品等产品。'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/base.css',
    'video.js/dist/video-js.css',
    './static/font/iconfont.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '@/plugins/storeCache',
      ssr: false
    },
    '@/plugins/element-ui',
    '@/plugins/request',
    '@/plugins/videoPlayer',
    '@/plugins/charts',
    '@/plugins/components',
    '@/plugins/auth',
    {
      src: "./static/font/iconfont.js",
      ssr: false
    }

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // proxy: true
  },
  // proxy: {
  //   '/': {
  //     target: 'http://uat.small.tianyuyezi.com',
  //     // pathRewrite: {
  //     //   '^/index' : '/'
  //     // }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 7,
        cacheGroups: {
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

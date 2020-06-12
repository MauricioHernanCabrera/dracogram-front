let API_URL = "";
let FRONT_URL = "";

switch (process.env.NODE_ENV) {
  case "production":
    API_URL = "https://api.hernan.rapitienda.net";
    FRONT_URL = "https://hernan.rapitienda.net";
    break;
  default:
    API_URL = "http://localhost/curso-introduccion-php-deploy";
    FRONT_URL = "http://127.0.0.1:3000";
    break;
}

const page = {
  title: "Dracogram",
  short_name: "HU",
  description: "Bienvenido a la aplicación. Ingresá y conoce los usuarios",
  safeImg: {
    url: `${FRONT_URL}/images/safe_image.jpg`,
    alt: "Dracogram",
    type: "image/jpg",
    width: "540",
    height: "340"
  },
  favicon: `${FRONT_URL}/images/logo2.ico`,
  author: `Mauricio Hernan Cabrera`
};

module.exports = {
  mode: "universal",

  env: {
    API_URL,
    FRONT_URL
  },

  head: {
    title: page.title,
    meta: [
      { charset: "utf-8" },
      { name: "google", content: "notranslate" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { hid: "author", name: "author", content: `${page.author}` },
      {
        hid: "description",
        name: "description",
        content: `${page.description}`
      },
      { hid: "twitter-card", name: "twitter:card", content: "summary" },
      { hid: "twitter-title", name: "twitter:title", content: `${page.title}` },
      {
        hid: "twitter-description",
        name: "twitter:description",
        content: `${page.description}`
      },

      {
        hid: "twitter-image",
        name: "twitter:image",
        content: `${page.safeImg.url}`
      },
      {
        hid: "twitter-image-alt",
        name: "twitter:image:alt",
        content: `${page.safeImg.alt}`
      },
      { hid: "og-type", property: "og:type", content: "website" },
      { hid: "og-title", property: "og:title", content: `${page.title}` },
      { hid: "og-image", property: "og:image", content: `${page.safeImg.url}` },
      {
        hid: "og-image-type",
        property: "og:image:type",
        content: `${page.safeImg.type}`
      },
      {
        hid: "og-image-width",
        property: "og:image:width",
        content: `${page.safeImg.width}`
      },
      {
        hid: "og-image-height",
        property: "og:image:height",
        content: `${page.safeImg.height}`
      },
      {
        hid: "og-site_name",
        property: "og:site_name",
        content: `${page.title}`
      },
      {
        hid: "og-description",
        property: "og:description",
        content: `${page.description}`
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: page.favicon }]
  },

  loading: { color: "#ffffff" },

  css: ["~/assets/style/app.styl", "~/assets/styles.scss"],

  plugins: [
    "~/plugins/vuetify",
    "~/plugins/vuelidate",
    "~/plugins/axios",
    { src: "~/plugins/webfontloader", mode: "client" },
    { src: "~/plugins/ga", mode: "client" }
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    "@nuxtjs/sitemap"
  ],

  axios: {
    baseURL: API_URL
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: "/^https://fonts.(?:googleapis|gstatic).com/(.*)/",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: {
          cacheName: "dracogram-font-vuetify",
          cacheExpiration: {
            maxEntries: 10000,
            maxAgeSeconds: 365 * 24 * 60 * 60
          }
        }
      },

      {
        urlPattern: "https://use.fontawesome.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: {
          cacheName: "dracogram-font-awesome",
          cacheExpiration: {
            maxEntries: 10000,
            maxAgeSeconds: 365 * 24 * 60 * 60
          }
        }
      }
    ]
  },

  manifest: {
    name: page.title,
    short_name: page.short_name,
    lang: "en-US",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#f52e41"
  },

  build: {
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        [
          "transform-imports",
          {
            vuetify: {
              transform: "vuetify/es5/components/${member}",
              preventFullImport: true
            }
          }
        ]
      ]
    }
  }
};

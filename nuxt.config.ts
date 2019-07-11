require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  env: {
    ...(process.env as any)
  },

  router: {
    linkExactActiveClass: "is-active"
  },

  css: ["@/assets/styles/main.scss"],

  loading: {
    color: "#36b37e",
    height: "3px"
  },

  head: {
    htmlAttrs: {
      lang: "es"
    },
    title: "PolarBear | Indumentaria",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      { name: "robots", content: "index, follow" },
      {
        hid: "description",
        name: "description",
        content: "PolarBear"
      }
    ]
  },

  build: {
    extractCSS: true,
    optimizeCSS: true,
    html: {
      minify: {
        collapseWhitespace: true
      }
    },
    extend(config) {
      if (!config.module) {
        return;
      }
    }
  },

  modules: [
    "@nuxtjs/pwa",
    ["nuxt-buefy", { css: false, materialDesignIcons: false }]
  ],

  plugins: [
    { src: "~/plugins/swiper.ts", ssr: false },
    "~/plugins/validate.ts",
    "~/plugins/firebase.ts",
    "~/plugins/auth.ts",
    "~/plugins/day.ts",
    "~/plugins/papaparse.ts"
  ],

  manifest: {
    name: "PolarBear",
    lang: "es"
  }
};

module.exports = config;
export default config;

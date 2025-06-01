// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  modules: ["@nuxtjs/i18n"],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "ru",
  },
  runtimeConfig: {
    public: {
      API_BASE_SERVER: process.env.API_BASE_SERVER,
    },
  },
});

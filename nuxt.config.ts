// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss"],

  naiveui: {
    colorModePreference: "light",
    iconSize: 20,
    themeConfig: {},
  },
});

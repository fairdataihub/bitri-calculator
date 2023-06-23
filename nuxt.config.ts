// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  extends: ["nuxt-umami"],

  appConfig: {
    umami: {
      host: "https://umami.fairdataihub.org/mushroom",
      id: "4695e60b-3e6b-4c8c-9c09-b93140265367",
      customEndpoint: "/api/harvest",
      version: "2",
    },
  },

  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss"],

  naiveui: {
    colorModePreference: "light",
    iconSize: 20,
    themeConfig: {},
  },
});

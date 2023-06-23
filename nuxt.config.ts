// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      script: [
        {
          src: "https://umami.fairdataihub.org/mushroom",
          async: true,
          "data-website-id": "4695e60b-3e6b-4c8c-9c09-b93140265367",
        },
      ],
    },
  },

  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss", "nuxt-icon"],

  naiveui: {
    colorModePreference: "light",
    iconSize: 20,
    themeConfig: {},
  },
});

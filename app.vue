<template>
  <NaiveConfig>
    <n-message-provider placement="bottom">
      <NuxtLayout>
        <NuxtLoadingIndicator color="#be185d" :height="5" />
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </NaiveConfig>
</template>

<script setup lang="ts">
import "vue3-lottie/dist/style.css";

useHead({
  title: "Bi/Trifurcation Calculator",
  link: [
    { href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      href: "/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      href: "/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      color: "#5bbad5",
      href: "/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
    {
      href: "/site.webmanifest",
      rel: "manifest",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Scholar Stack is an application to help you manage your dependencies with ease",
    },
    {
      name: "msapplication-TileColor",
      content: "#2b5797",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
});
</script>

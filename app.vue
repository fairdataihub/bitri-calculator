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
  title: "Bifurcation Calculator",

  meta: [
    {
      name: "description",
      content: "Add your description here",
    },
  ],
});
</script>

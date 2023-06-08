<template>
  <div class="w-full h-full flex justify-center items-center">
    <ClientOnly>
      <Vue3Lottie
        animation-link="https://assets1.lottiefiles.com/packages/lf20_fityEfMraU.json"
        :height="350"
        :width="350"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push("/");
  }, 3000);
});
</script>

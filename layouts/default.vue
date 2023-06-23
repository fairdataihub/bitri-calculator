<template>
  <div
    class="relative mx-auto flex h-screen w-full flex-col px-8"
    :class="{ 'debug-screens': devMode }"
  >
    <n-back-top />

    <slot />

    <footer
      class="flex h-24 w-full items-center rounded-lg border-t bg-white p-4 flex-col md:flex-row md:items-center md:justify-between md:p-6"
    >
      <div
        class="flex flex-col items-center md:items-end text-sm font-medium text-slate-700"
      >
        <p class="text-center">Made with ❤️ by the FAIR Data Innovations Hub</p>
      </div>

      <div class="flex space-x-8 items-center mt-4 md:mt-0">
        <n-image
          width="140"
          src="https://fairdataihub.org/logo.svg"
          preview-disabled
        />
        <n-image
          width="140"
          src="https://fairdataihub.org/images/collaborators/calmi-logo.png"
          preview-disabled
        />
      </div>
    </footer>
  </div>
</template>

<script setup>
const devMode = process.env.NODE_ENV === "development";
</script>

<template>
  <div :class="themeStore.activeTheme">
    <Header />

    <main class="main">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
</script>
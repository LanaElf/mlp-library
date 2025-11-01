<template>
  <button
    v-show="visible"
    @click="scrollToTop"
    class="scroll-to-top themeBackground5"
    aria-label="Наверх"
  >
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="currentColor"
      aria-hidden="true"
      class="icon"
    >
      <path :d="mdiArrowUpBold" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { mdiArrowUpBold } from '@mdi/js'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 200
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 999;
  padding: 10px;
  border-radius: 100px;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(41,121,255,0.25);
  transition: opacity 0.3s;
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll-to-top:hover {
  opacity: 1;
}
.icon {
  display: block;
  width: 32px;
  height: 32px;
  fill: #fff;
}
</style>

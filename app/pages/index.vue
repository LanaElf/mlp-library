<template>
  <h1></h1>
  <div id="libraryPage" class="library-page">
    <BookShelf />
    <GoUpBtn />
  </div>
</template>

<style lang="scss">
h1 {
  margin: 0;
}

.library-page{
  position: relative;
  display: grid;
  place-content: center;
  margin: 0 auto;
  max-width: 100vw;
}
</style>
<script setup lang="ts">
</script>
<template>
  <div id="filters" class="filters-container">
  <div v-show="!libraryStore.noFilter" class="filter-items selected-filter">Фильтры:</div>

    <div v-show="libraryStore.selectedAuthor" class="selected-filter">
      <div class="filter-items resetBtnContainer">
          <span>{{ libraryStore.selectedAuthor }}</span>
          <button
              class="reset-filter x button"
              @click="libraryStore.resetAuthorFromFilter()">
            Х
          </button>
      </div>
    </div>

  <div v-show="libraryStore.isGenresFilter" class="selected-filter">
    <div class="filter-items">
      <div v-for="genre in libraryStore.selectedGenres"
           class="selected-genre resetBtnContainer">
        <span>{{ genre }}</span>
        <button
            class="reset-filter x button"
            @click="libraryStore.resetGenreFromFilter(genre)">
          Х
        </button>
      </div>
    </div>
  </div>

  <div v-show="libraryStore.isCharactersFilter"
       class="selected-filter">
    <div class="filter-items characters">
      <div v-for="character in libraryStore.selectedCharacters"
           class="selected-character">
        <div class="character-image">
          <img :src="libraryStore.getCharacterImagePath(character)" alt="character">
        </div>

        <div class="resetBtnContainer">
          <span>{{ character }}</span>
          <button
              class="reset-filter x button"
              @click="libraryStore.resetCharacterFromFilter(character)">
            Х
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-show="!libraryStore.noFilter">
    <button class="reset-filter button" @click="libraryStore.resetFilters">
      Сбросить фильтры
    </button>
  </div>
    </div>
</template>

<script setup lang="ts">
import { useLibraryStore } from "~/stores/library";

const libraryStore = useLibraryStore();
</script>

<style scoped lang="scss">
.filters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1em;
}
.selected-filter {
  font-weight: bolder;
  font-size: 1em;
  margin-block: 10px;
  position: relative;
  width: max-content;
  font-family: 'vollcorn', sans-serif;

  .character-image img {
    height: 6em;
  }
}


.reset-filter{
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  font-size: 1em;
  padding: 0 6px 6px;
  font-family: 'celestia', sans-serif;
  transition: $baseTransition;
}
.resetBtnContainer {
  position: relative;
}
.reset-filter.x {
  position: absolute;
  right: -24px;
  top: -12px;
  width: 24px;
  height: 24px;
}

.filter-items {
  display: flex;
  gap: 2em;
  text-align: center;
  flex-wrap: wrap;
  max-width: 90vw;
  justify-content: center;
}
</style>
<template>
    <div id="bookshelf" class="bookshelf">
      <BookMarks />

      <div class="selects">
		    <SelectMultiple
            @changeSelected="onChangeSelectedGenres"
            :options="genresForSelect"
            :selected="libraryStore.selectedGenres"
		  	    placeholder="Жанры" />

        <SelectMultiple
            @changeSelected="onChangeSelectedCharacters"
            :options="charactersForSelect"
            :selected="libraryStore.selectedCharacters"
            placeholder="Персонажи" />
        </div>

        <div class="sort-by-words-count">
          <span>Сортировать:</span>
          <button @click="changeSortBy" class="button">{{ sortBy }}</button>
          <button @click="changeSortFrom" class="sort-from button">{{ sortFrom }}</button>
        </div>

        <input id="search" class="search"
             v-model.trim="searchQuery"
             placeholder="Поиск по названию...">

        <div id="filters">
          <Filters />
        </div>

        <div id="books" v-show="filteredSortedAndSearchedFics.length > 0">
          <Book v-for="fanfic in filteredSortedAndSearchedFics"
                :key="fanfic.id"
                :fanfic="fanfic"/>
        </div>
        <div v-show="filteredSortedAndSearchedFics.length === 0">
          <p>Ничего не найдено ¯\_(ツ)_/¯</p>
        </div>

	</div>
</template>

<script setup lang="ts">
import SelectMultiple from '~/components/common/SelectMultiple.vue'
import { useLibraryStore } from '~/stores/library'
import { genres, characters } from '~/data/fanfics'
import type { Fanfic } from '~/types'

const libraryStore = useLibraryStore()

const searchQuery: Ref<string> = ref('')
const sortBy: Ref<'по алфавиту' | 'по объему'> = ref('по алфавиту')
const sortFrom: Ref<'min' | 'max'> = ref('min')

const filteredSortedAndSearchedFics = computed(() => {
  sortFics();

  if (!searchQuery.value) {
    return libraryStore.filteredFics
  }

  return libraryStore.filteredFics.filter(
      fic => {
        return fic.name.toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      }
  );
})

function sortFics() {
  if (sortBy.value === 'по алфавиту') {
    if (sortFrom.value === 'min') {
      libraryStore.filteredFics
          .sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortFrom.value === 'max') {
      libraryStore.filteredFics
          .sort((a, b) => a.name.localeCompare(b.name)).reverse()
    }
  } else if (sortBy.value === 'по объему') {
    if (sortFrom.value === 'min') {
      libraryStore.filteredFics
          .sort((a: Fanfic, b: Fanfic) =>  a.wordCount - b.wordCount )
    } else if (sortFrom.value === 'max') {
      libraryStore.filteredFics
          .sort((a: Fanfic, b: Fanfic) =>  b.wordCount - a.wordCount )
    }
  }
}

function changeSortBy() {
  sortBy.value = sortBy.value === 'по алфавиту' ? 'по объему' : 'по алфавиту'
}

function changeSortFrom() {
  sortFrom.value = sortFrom.value === 'min' ? 'max' : 'min'
}

const genresForSelect = Array.from(genres).map((genre) => {
  return {
    label: genre,
    value: genre,
  }
})

const charactersForSelect = Array.from(characters).map((char) => {
  return {
    label: char.name,
    value: char.name,
    image: libraryStore.getCharacterImagePath(char.name),
  }
})

function onChangeSelectedGenres(payload: { checked: boolean; value: string }) {
  if (payload.checked) {
    libraryStore.selectGenre(payload.value)
  } else {
    libraryStore.resetGenreFromFilter(payload.value)
  }
}

function onChangeSelectedCharacters(payload: { checked: boolean; value: string }) {
  if (payload.checked) {
    libraryStore.selectCharacter(payload.value)
  } else {
    libraryStore.resetCharacterFromFilter(payload.value)
  }
}
</script>

<style lang="scss" scoped>
.bookshelf {
	display: flex;
  flex-direction: column;
  align-items: center;
	padding: 0;
	margin: 30px;
	justify-content: stretch;
}

.selects {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-block: 1em;
}

.search {
  margin-top: 1em;
  width: 300px;
  justify-self: center;
}
.sort-by-words-count {
  display: flex;
  gap: 1em;
}
.sort-from {
  &:hover {
    cursor: pointer;
  }
}
</style>
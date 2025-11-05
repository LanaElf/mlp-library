<template>
    <div class="book-like">
			  <button class="btn book-title" @click="selectFic(fanfic)">
			  	{{ fanfic.name }}
			  </button>

			  <div class="book-info">
            <ul class="characters">
    	  			  <li v-for="character in fanfic.characters">
                		<a href="#filters"
                	      @click="libraryStore.selectCharacter(character)"
                        :class="libraryStore.selectedCharacters.has(character) ? 'selected' : ''">
    	  			  		<div class="character-image">
                	  		<img :src="libraryStore.getCharacterImagePath(character)" alt="character">
                	  </div>
    	  			  	</a>
    	  			  </li>
    	  		</ul>

            <ul class="genres">
    	  			  <li v-for="genre in fanfic.genres">
                		<a href="#filters"
                	      @click="libraryStore.selectGenre(genre)"
			  			  	      class="button"
                        :class="libraryStore.selectedGenres.has(genre) ? 'selected' : ''">
    	  			  		    {{ genre }}
                	  </a>
    	  			  </li>
    	  		</ul>

            <div class="book-row">
                <div class="author">
         	 	  	  Автор:
          	  	  <a href="#filters"
                     @click="libraryStore.selectAuthor(fanfic.authorName)">
                    {{ fanfic.authorName }}
          	  	  </a>
    	  		    </div>
              
                <div class="wordCount">
                    Объем:
          	  	    <span class="bold">
                      {{ fanfic.wordCount }}
                    </span> слов
    	  		    </div>
            </div>
			  </div>
		</div>
</template>

<script setup lang="ts">
import { useLibraryStore } from '~/stores/library'
import type { Fanfic } from '~/types'

const router = useRouter()
const libraryStore = useLibraryStore()

const props = defineProps(['fanfic']);
const fanfic = props.fanfic;

function selectFic(fanfic: Fanfic) {
  libraryStore.selectFic(fanfic);
  router.push({
    path: `/fanfic/${fanfic.pathName}`,
    hash: '#fanfic'
  })
}
</script>

<style lang="scss">
.book-like {
  margin-top: 20px;
	background: rgba(255, 255, 255, 0.3);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	display: flex;
  place-content: center;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
	gap: 1em;
  padding-bottom: 1em;

  button {
  	padding: 10px 15px;
    border-radius: 8px 8px 0 0;
  	box-shadow: none;
  	font-weight: bold;
  	font-size: 1.3em;
  	color: white;
  	position: relative;
  	transition: $baseTransition;
  }
}

.book-info {
	margin-inline: 1em;
	display: flex;
  flex-direction: column;
	gap: 1em;
}

.book-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding-inline: 1em;
}

.characters {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
  gap: 10px;
}
.characters li {
	padding: 0;
}
.characters button {
	background: none;
	border: none;
	padding: 0.2em;
}
.characters .character-image {
	padding-top: 0;
}
.characters .character-image img {
	height: 3em;
	filter: drop-shadow(0px 0px 1px #fff);
}

.wordCount .bold {
  font-weight: bolder;
}

.author a {
  text-decoration: none;
  font-weight: bold;
}
</style>
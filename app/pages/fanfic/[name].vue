<template>
  <div ref="ficView" class="fic-view">
    <div class="bookmarks-fic">
      <BookMarks @go-to-bookmark="goToBookmark"/>
    </div>

     <div id="fanfic" class="fanfic">
            <div class="fanfic-info">
                <div class="title">
                    {{ selectedFic.name }}
                </div>

                <div>В ролях:</div>
                <ul class="characters">
                  <li v-for="character in selectedFic.characters" >
                    <button @click="selectCharacter(character)">
                        <span class="character-image">
                            <img :src="libraryStore.getCharacterImagePath(character)" alt="character">
                        </span>
                        {{ character }}
                    </button>
                  </li>
                </ul>

                <div>Жанры:</div>
                <ul class="genres">
                  <li v-for="genre in selectedFic.genres">
                        <a @click="selectGenre(genre)"
                        class="button">
                      {{ genre }}
                    </a>
                  </li>
                </ul>

                <div class="author">
                    Автор:
                    <a :href="selectedFic.authorLink" target="_blank">
                        {{ selectedFic.authorName }}
                    </a>
                </div>

                <div class="wordCount">
                    {{ selectedFic.wordCount }} слов
                </div>

                <nav id="fanfic-nav" class="fanfic-nav">
                    <div>Главы:</div>
                    <a v-for="chapter in selectedFic.chapters"
                        :key="chapter.id"
                        class="nav-link"
                        :class="{active: selectedChapter === chapter}"
                        href="#chapter"
                        @click="setChapter(chapter)"
                        >
                        {{ chapter.name }}
                    </a>
                </nav>
            </div>

            <div id="chapter">
                <Preloader v-show="isFicLoading" />

                <div v-show="!isFicLoading" class="fic-content">
                    <div ref="chapterHtml" class="chapter-html" id="fanfic">
                        <span v-html="chapterHtml" id="chapterContent"></span>
                    </div>
                </div>
            </div>

            <div v-show="isTheLastChapter" class="end">
                Конец
            </div>

            <div class="next-chapter">
                <a href="#chapter" v-if="!isTheFirstChapter" @click="previousChapter()">Назад</a>
                <a href="#chapter" v-if="!isTheLastChapter" @click="nextChapter()">Дальше</a>
            </div>
      </div>

      <BookmarkMaker
          v-model="markedEl"
          :fic-el="ficView"
          :selected-fic="selectedFic"
          :selected-chapter="selectedChapter"
          />

      <GoUpBtn />
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, watch} from 'vue';
import { useLibraryStore } from '~/stores/library';
import { useBookmarksStore } from '~/stores/bookmarks';
import type {Fanfic, Chapter, Bookmark} from '~/types'
import { fanfics } from '~/data/fanfics'
import Preloader from "~/components/common/Preloader.vue";
import BookmarkMaker from "~/components/BookmarkMaker.vue";
import { useRuntimeConfig } from '#imports'

const route = useRoute();
const router = useRouter();
const libraryStore = useLibraryStore();
const bookmarksStore = useBookmarksStore();

const isFicLoading = ref(false);
const selectedChapter = ref<Chapter | null>(null);
const isTheLastChapter = ref(false);
const isTheFirstChapter = ref(true);

const ficView = ref<HTMLElement | null>(null);
const markedEl = ref<HTMLElement | null>(null);

const chapterHtml = computed(() => {
  if (!selectedChapter.value) {
    return '';
  } else {
    return selectedChapter.value.content;
  }
});

const selectedFic = computed<Fanfic>(() => {
  return libraryStore.selectedFic as Fanfic
      || (fanfics as Fanfic[]).find((f) => f.pathName === route.params.name);
});

watch(selectedFic, (newFic) => {
  router.push({
    path: `/fanfic/${newFic.pathName}`
  })
})

watch(markedEl, (newEl, oldEl) => {
  oldEl?.classList.remove('marked-el');
  newEl?.classList.add('marked-el');
})

function goToLibrary() {
  router.push({ path: `/`, hash: '#filters' });
}

function goToBookmark() {
  getSavedBookmark()
}

function selectGenre(genre: string) {
  libraryStore.selectGenre(genre);
  goToLibrary();
}

function selectCharacter(character: string) {
  libraryStore.selectCharacter(character);
  goToLibrary();
}

function setFirstChapter() {
  if (!selectedFic.value) {
    return;
  }
  const chapter = selectedFic.value.chapters.find(f => f.id === 1);
  if (chapter) setChapter(chapter);
}

async function setChapter(chapter: Chapter) {
  if (!selectedFic.value) {
    return;
  }
  isTheFirstChapter.value = chapter.id === 1;
  isTheLastChapter.value = chapter.id === selectedFic.value.chapters.length;
  selectedChapter.value = chapter;

  isFicLoading.value = true;

  const baseUrl = useRuntimeConfig().app.baseURL;
  const libraryUrl: string = baseUrl !== '/'
      ? `${baseUrl}_nuxt/assets/library/`
      : '/library/';

  try {
    const res = await fetch(libraryUrl + selectedFic.value.pathName + '/' + chapter.fileName);
    selectedChapter.value.content = await res.text();
  } catch (e) {
    console.error(e);
  } finally {
    isFicLoading.value = false;
  }
}

function nextChapter() {
  if (!selectedFic.value || !selectedChapter.value) {
    return;
  }

  const nextChapterId = selectedChapter.value.id + 1;
  const nextChapter = selectedFic.value.chapters.find(ch => ch.id === nextChapterId);

  if (nextChapter) {
    setChapter(nextChapter);
  }
}

function previousChapter() {
  if (!selectedFic.value || !selectedChapter.value) {
    return;
  }

  const prevChapterId = selectedChapter.value.id - 1;
  const prevChapter = selectedFic.value.chapters.find(ch => ch.id === prevChapterId);

  if (prevChapter) {
    setChapter(prevChapter);
  }
}

function getSavedBookmark() {
  const thisFicBookmark = bookmarksStore.bookmarks
      .find(bm => bm.fanficId === selectedFic.value.id);

  if (thisFicBookmark) {
    const chapter = selectedFic.value.chapters.find(ch => ch.id === thisFicBookmark.chapterId);
    if (!chapter) {
      console.error(
          `Chapter with id ${thisFicBookmark.chapterId} not found in fanfic ${selectedFic.value.name}`
      )
      return;
    }
    setChapter(chapter).then(() => {
      findElement(thisFicBookmark);
    });
  } else {
    setFirstChapter();
  }
}

function findElement(bookmark: Bookmark) {
  const chapter = document.querySelector('#chapterContent');
  if (!chapter) return;

  const elements = Array.from(chapter.querySelectorAll('*'))
      .filter(el => el instanceof HTMLElement) as HTMLElement[];

  let el: HTMLElement | undefined;

  if (bookmark.contentType === 'src') {
    el = chapter.querySelector(`[src="${bookmark.content}"]`) as HTMLElement | undefined;
  } else {
    el = elements.find(el => el.textContent?.includes(bookmark.content) ?? false);
  }

  if (el) {
    markedEl.value = el;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

onMounted(() => {
  console.log('mounted')
  getSavedBookmark();
});
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding: 5px;
}
.fic-view {
	width: 80vw;
	margin-top: 5vh;
  margin-bottom: 5vh;
	display: flex;
	place-content: center;
  font-family: "vollcorn", sans-serif;
  flex-direction: column;
}
.fanfic {
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	display: grid;
	place-content: center;
    width: 80vw;
    padding-bottom: 7vh;
    padding-inline: 1em;
}
.fanfic-info {
  text-align: center;
}

.title {
	font-size: 25px;
	font-family: "vollcorn", sans-serif;
	font-weight: bold;
    padding-top: 2em;
    padding-bottom: 1em;
}

.wordCount, .chaptersCount {
	font-size: 1em;
	font-weight: bolder;
	padding: 10px 0;
}
.fanfic-nav {
	display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block: 1em;
}
.fanfic-nav a {
	text-decoration: none;
    font-family: "vollcorn", sans-serif;
    font-size: 1em;
	color: black;
}

.fic-content{
  margin: 0 5%;
	text-align: left;
  font-family: 'roboto slab', sans-serif;
}

.genres {
    padding-top: 1em;
}

.sourceLink {
    padding: 20px;

    a {
        text-decoration: none;
        transition: $baseTransition;
    }
}

.characters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

  button {
    border: none;
    background: none;
    font-family: 'vollcorn', sans-serif;
    font-size: 1em;
    padding: 1em 0.5em;
    transition: $baseTransition;
    display: flex;
    flex-direction: column;
  }
}

.character-image img {
    height: 5em;
}
.author {
    padding-top: 1em;
}
.author a {
    text-decoration: none;
    font-weight: bolder;
}

.next-chapter {
    display: flex;
    justify-content: center;
}
.next-chapter a {
    padding: 0 15px 5px;
    font-size: 1.1em;
    font-family: 'celestia', serif;
    border-radius: 30px;
    border-width: 1px;
    border-style: solid;
    margin: 10px;
    text-decoration: none;
}

.end {
    padding: 20px;
    font-weight: bolder;
}

.bookmarks-fic {
  padding: 1em;
}
@media (max-device-width: 800px) and (-webkit-min-device-pixel-ratio: 2.5),
(max-device-width: 800px) and (min--moz-device-pixel-ratio: 2.5),
(max-device-width: 800px) and (min-device-pixel-ratio: 2.5),
(max-device-width: 600px) and (-webkit-min-device-pixel-ratio: 2),
(max-device-width: 600px) and (min--moz-device-pixel-ratio: 2),
(max-device-width: 600px) and (min-device-pixel-ratio: 2){
    .fanfic {
      width: calc(100% - 2em);
      padding: 0 1em;
    }
    .chapter-html {
        p {
            font-size: 1em;
        }
    }
    .fic-content {
        margin: 0;
        width: 90vw;
    }

    .character-image img {
        height: 4em;
    }
    .characters button {
        font-size: 0.8em;
    }
}
</style>
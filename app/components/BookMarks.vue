<template>
    <div class="bookmarks-container">
        <div v-show="bookmarksStore.bookmarks.length" class="bookmarks-content">
            <Tooltip tooltipContent="Закладки добавляются и удаляются кликом по абзацу и хранятся в памяти браузера.">
              <span class="bookmarks-title">Я читаю:</span>
            </Tooltip>

          <div class="bookmarks">
            <a v-for="bookmark in bookmarksStore.bookmarks"
               @click="goToFanfic(bookmark.fanficId)"
               class="bookmark">
              {{ bookmark.fanficName }}, глава {{ bookmark.chapterId }}
            </a>
          </div>
        </div>

        <div v-show="!bookmarksStore.bookmarks.length" class="bookmark-announce">
          Читая фанфик, жми на абзац, чтобы создать закладку. Закладки будут храниться в памяти браузера и выводиться здесь.
        </div>
    </div>
</template>

<script setup lang="ts">
import Tooltip from './common/Tooltip.vue';
import { useBookmarksStore } from '@/stores/bookmarks';
import { fanfics } from "~/data/fanfics";
import {useLibraryStore} from "~/stores/library";

const bookmarksStore = useBookmarksStore();

function goToFanfic(fanficId: number) {
  const fanfic = fanfics.find(fanfic => fanfic.id === fanficId);
  if (fanfic) {
    useLibraryStore().selectFic(fanfic);
    useRouter().push({ path: `/fanfic/${fanfic.pathName}`});
  }
}
</script>

<style lang="scss" scoped>
.bookmarks-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  font-size: 1.1em;
}
.show-bookmarks {
    width: max-content;
    font-family: 'vollcorn', sans-serif;
    font-weight: bold;
    font-size: 1.1em;
    padding: 2px 10px;
}
.bookmarks-content {
    margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.bookmark-announce {
  display: flex;
  max-width: 600px;
}
.bookmarks {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1em;
}
</style>
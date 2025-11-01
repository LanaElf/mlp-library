<template>
    <div class="bookmarks-container">
        <div v-show="bookmarksVisible" class="bookmarks-content">
            <Tooltip tooltipContent="Закладки добавляются кликом по абзацу и хранятся в памяти браузера.">
              <span class="bookmarks-title">Я читаю:</span>
            </Tooltip>

          <div v-for="bookmark in bookmarksStore.bookmarks" class="bookmark">
            <a @click="goToFanfic(bookmark.fanficId)">
              {{ bookmark.fanficName }}, глава {{ bookmark.chapterId }}
            </a>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Tooltip from './common/Tooltip.vue';
import { useBookmarksStore } from '@/stores/bookmarks';
import { fanfics } from "~/data/fanfics";
import {useLibraryStore} from "~/stores/library";

const bookmarksStore = useBookmarksStore();

const bookmarksVisible = bookmarksStore.bookmarks.length;

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
</style>
<template>
    <div class="bookmarks-container">
        <button
            @click="bookmarksVisible = !bookmarksVisible"
            class="show-bookmarks button">
            Мои закладки
        </button>

        <div v-show="bookmarksVisible" class="bookmarks-content">
            <Tooltip tooltipContent="Закладки добавляются кликом по абзацу и хранятся в памяти браузера.">
                <div v-if="bookmarksStore.bookmarks.length">
                    <div v-for="bookmark in bookmarksStore.bookmarks" class="bookmark">
                        <a @click="goToFanfic(bookmark.fanficId)">{{ bookmark.fanficName }}, глава {{ bookmark.chapterId }}</a>
                    </div>
                </div>
                <div v-else>
                    У вас еще нет закладок
                </div>
            </Tooltip>
        </div>

    </div>

</template>

<script setup lang="ts">
import Tooltip from './common/Tooltip.vue';
import { useBookmarksStore } from '@/stores/bookmarks';
import { fanfics } from "~/data/fanfics";

const bookmarksStore = useBookmarksStore();
const router = useRouter()

const bookmarksVisible = ref(false);

function goToFanfic(fanficId) {
  const fanfic = fanfics.find(fanfic => fanfic.id === fanficId);
  router.replace({ path: `/fanfic/${fanfic.pathName}`});
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
}
</style>
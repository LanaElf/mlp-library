import { defineStore } from 'pinia'
import type { Bookmark } from '~/types'

export const useBookmarksStore = defineStore('bookmarks', () => {
    const bookmarks: Ref<Bookmark[]> = ref([]);

    function addBookmark(bookmark: Bookmark) {
        bookmarks.value = bookmarks.value.filter((b) => b.fanficId !== bookmark.fanficId)
        bookmarks.value.push(bookmark);
    }

    function removeBookmark(fanficId: number) {
        bookmarks.value = bookmarks.value.filter((b) => b.fanficId !== fanficId)
    }

    return { bookmarks, addBookmark, removeBookmark }
},
{
    persist: true
})

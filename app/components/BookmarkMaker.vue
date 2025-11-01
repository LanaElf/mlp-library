<template>
  <button
      v-show="clickedEl && clickedEl !== markedEl"
      ref="makeBookmarkButton"
      @click="makeBookmark()"
      class="make-bookmark button">
    Сделать закладку
  </button>

  <button
      v-show="clickedEl && clickedEl === markedEl"
      ref="removeBookmarkButton"
      @click="removeBookmark()"
      class="make-bookmark button">
    Удалить закладку
  </button>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import type { Bookmark, Chapter, Fanfic } from "~/types";
import { useBookmarksStore } from "~/stores/bookmarks";

const props = defineProps<{
  ficEl: HTMLElement | null,
  selectedFic: Fanfic,
  selectedChapter: Chapter | null,
  setChapterFunc: (chapter: Chapter) => Promise<void>,
}>()

const bookmarksStore = useBookmarksStore();

const clickedEl = ref<HTMLElement | null>(null);
const markedEl = ref<HTMLElement | null>(null);

const makeBookmarkButton = ref<HTMLElement | null>(null)
const removeBookmarkButton = ref<HTMLElement | null>(null);

watch(clickedEl, (newEl, oldEl) => {
  oldEl?.classList.remove('clicked-el');
  newEl?.classList.add('clicked-el');
});

watch(markedEl, (newEl, oldEl) => {
  oldEl?.classList.remove('marked-el');
  newEl?.classList.add('marked-el');
})

function positionBookmarkButton(target: HTMLElement, bookmarkButton: HTMLElement | null) {
  if (!bookmarkButton) return;

  if (!props.ficEl) {
    console.error('ficEl не определен');
    return;
  }

  const ficElOffset = props.ficEl.getBoundingClientRect().top + window.scrollY;
  const targetRect = target.getBoundingClientRect();

  bookmarkButton.style.top = `${targetRect.top + window.scrollY + targetRect.height - ficElOffset + 10}px`;
  bookmarkButton.style.left = `${targetRect.left + window.scrollX + targetRect.width - 120}px`;
}

function clickHandler(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (clickedEl.value === target) return;

  if (target.closest('.chapter-html')) {
    clickedEl.value = target;

    const bookmarkButton = (markedEl.value === target)
        ? (removeBookmarkButton.value as HTMLElement | null)
        : (makeBookmarkButton.value as HTMLElement | null);

    positionBookmarkButton(target, bookmarkButton);
  } else {
    clickedEl.value = null;
  }
}

function removeBookmark() {
  markedEl.value = null;
  bookmarksStore.removeBookmark(props.selectedFic.id);
}

function makeBookmark() {
  if (!clickedEl.value) return;

  let contentType: 'src' | 'text';
  let elContent: string;

  if (clickedEl.value.hasAttribute('src')) {
    contentType = 'src';
    elContent = clickedEl.value.getAttribute('src') || '';
  } else {
    contentType = 'text';
    elContent = clickedEl.value.textContent || '';
  }

  if (!props.selectedFic || !props.selectedChapter) return;

  const bookmark: Bookmark = {
    fanficId: props.selectedFic.id,
    fanficName: props.selectedFic.name,
    chapterId: props.selectedChapter.id,
    contentType,
    content: elContent,
  };

  markedEl.value = clickedEl.value;

  bookmarksStore.addBookmark(bookmark);

  findElement(bookmark);
}

function getSavedBookmark() {
  const thisFicBookmark = bookmarksStore.bookmarks
      .find(bm => bm.fanficId === props.selectedFic.id);

  if (!thisFicBookmark) return;

  const chapter = props.selectedFic.chapters.find(ch => ch.id === thisFicBookmark.chapterId);
  if (chapter) {
    nextTick(() => {
      props.setChapterFunc(chapter).then(() => {
        findElement(thisFicBookmark);
      });
    });
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
  document.addEventListener('click', clickHandler);
  getSavedBookmark();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickHandler);
});
</script>

<style lang="scss">
.make-bookmark {
  position: absolute;
  border-radius: 20px;
  padding: 2px 5px;
  font-size: 14px;
  font-family: 'vollcorn', sans-serif;
}
</style>
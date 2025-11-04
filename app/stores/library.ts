import { defineStore } from 'pinia'
import { fanfics, characters } from '~/data/fanfics'
import type {Character, Fanfic} from '~/types';
import { useRuntimeConfig } from '#imports'
import type { Reactive } from "vue";


export const useLibraryStore = defineStore('library', () => {
    const selectedFic: Ref<Fanfic | null> = ref(null)

    let selectedGenres: Reactive<Set<string>> = reactive(new Set([]))
    let selectedCharacters: Reactive<Set<string>> = reactive(new Set([]))
    const selectedAuthor: Ref<string | null> = ref(null)

    const isCharactersFilter = computed(() => {
        return selectedCharacters.size !== 0
    })

    const isGenresFilter = computed(() => {
        return selectedGenres.size !== 0
    })

    const noFilter = computed(() => {
        return selectedCharacters.size === 0
            && selectedGenres.size === 0 && !selectedAuthor.value
    })

    const filteredFics = computed(() => {
        let filteredFics: Array<Fanfic> = JSON.parse(JSON.stringify(fanfics));

        if (noFilter.value) {
            return filteredFics
        }

        if (selectedAuthor.value) {
            filteredFics = filteredFics.filter(fanfic =>
                fanfic.authorName === selectedAuthor.value
            )
        }

        filteredFics = filteredFics.filter(fanfic =>
            Array.from(selectedGenres).every(genre =>
                fanfic.genres.includes(genre)
            )
        );

        filteredFics = filteredFics.filter(fanfic =>
            Array.from(selectedCharacters).every(character =>
                fanfic.characters.includes(character)
            )
        );

        return filteredFics
    })

    function selectFic(fanfic: Fanfic) {
        selectedFic.value = fanfic;
    }

    function selectGenre(genre: string) {
        selectedGenres.add(genre);
    }

    function selectCharacter(character: string) {
        selectedCharacters.add(character);
    }

    function selectAuthor(author: string) {
        selectedAuthor.value = author;
    }

    function resetFilters() {
        selectedGenres.clear();
        selectedCharacters.clear();
        selectedAuthor.value = null;
    }

    function resetGenreFromFilter(genre: string) {
        selectedGenres.delete(genre);
    }

    function resetCharacterFromFilter(character: string) {
        selectedCharacters.delete(character);
    }

    function resetAuthorFromFilter() {
        selectedAuthor.value = null;
    }

    const charactersUrl: string = `${useRuntimeConfig().app.baseURL}_nuxt/assets/arts/ponies/`;

    function getCharacterImagePath(character: string): string {
        const char = characters.find(char => char.name === character)
        if (!char) {
            console.error(
                `Character ${character} not found`
            )
            return 'error'
        }
        return charactersUrl + char.fileName;
    }

    return {
        selectedFic,
        selectFic,
        selectedGenres,
        selectedCharacters,
        selectedAuthor,
        selectGenre,
        selectCharacter,
        selectAuthor,
        isCharactersFilter,
        isGenresFilter,
        resetFilters,
        resetGenreFromFilter,
        resetCharacterFromFilter,
        resetAuthorFromFilter,
        filteredFics,
        noFilter,
        getCharacterImagePath,
    }
},
{
    persist: true
})

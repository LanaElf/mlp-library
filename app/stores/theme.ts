import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const activeTheme = ref('lunaTheme');
    const themes = [
        {
            name: 'Fluttershy',
            code: 'fluttershyTheme',
        },
        {
            name: 'Twilight Sparkle',
            code: 'twilightTheme',
        },
        {
            name: 'Princess Celestia',
            code: 'celestiaTheme',
        },
        {
            name: 'Princess Luna',
            code: 'lunaTheme',
        },
    ]

    function setTheme(newTheme: string) {
        activeTheme.value = newTheme;
    }

    return { activeTheme, themes, setTheme }
},
{
    persist: true
})

<template>
  <div class="theme-switch">
		<svg class="icon" viewBox="0 0 24 24" width="40" height="40"
			@click="showThemes = !showThemes">
        <path :d="mdiPalette" />
    </svg>

		<ul v-if="showThemes"
			  @click="showThemes = !showThemes"
			  class="options">
			  <li class="option"
			  	  v-for="theme in themeStore.themes"
			  	  :class="theme.code"
            @click="setTheme(theme)">
              {{ theme.name }}
        </li>
		</ul>
	</div>
</template>

<script setup>
import { mdiPalette } from '@mdi/js'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()

const showThemes = ref(false)

function setTheme(theme) {
  themeStore.setTheme(theme.code);
}
</script>

<style lang="scss">
.theme-switch {
	position: absolute;
	top: 0;
	right: 0;
	font-weight: bolder;

  .icon {
    padding: 5px;
  }

  .options {
    border-top: none;
    overflow: auto;
    position: absolute;
    z-index: 1500;
    max-width: 500px;
    margin: 0;
    padding: 0;
    top: 46px;
    right: 0;
    font-family: 'vollcorn', sans-serif;
    text-align: center;
  }
}
.theme-btn{
	border-radius: 30px 0px 0px 30px !important;
}
.option {
  display: grid;
  align-content: center;
  padding: 5px 5px 5px 15px;
  border-radius: 40px 0 0px 40px;
}
</style>
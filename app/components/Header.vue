 <template>
	<header class="header">
		<div v-show="isLunaTheme">
			<Stars
				:stars-count="{near: 5, mid: 10, far: 20, dust: 40}"
				:height="'100%'"/>
		</div>

		<ThemeSwitcher />

		<a href="/" class="title">
      <h1>
        <div class="title-mlp">MLP</div>
        <div class="title-sub">лучшие фанфики</div>
      </h1>
		</a>

		<div class="header-image"></div>
	</header>

	<div id="library" class="library-link">
    <a href="/"><h2>Книжная полка</h2></a>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();

const isLunaTheme = computed(() => {
  return themeStore.activeTheme === 'lunaTheme'
});
</script>

<style lang="scss">
.header {
	height: 550px;
	display: grid;
	justify-items: center;
	position: relative;
}
h1 {
  font-size: 1.2em;
  margin: 0;
}

h2 {
  width: 100%;
  font-size: 1.6em;
  line-height: 2em;
  margin: 0;
}
.title {
	padding-top: 30px;
	padding-bottom: 10px;
  font-family: 'celestia', sans-serif;
	color: transparent;
  text-align: center;
}
.title-mlp {
	font-size: 6em;
	line-height: 0.8em;
	color: #fff;
	text-decoration: none;
	background: linear-gradient(150deg, #f85679, #f76f7f, #fffd75, #75ffdd, #75e1ff, #757cff, #c174fc, #fa74fc);
	background-size: 600% 200%;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-animation: rainbow 10s ease infinite;
	animation: rainbow 10s ease infinite;
  font-family: 'celestia', sans-serif;
}
.title-sub {
	font-size: 2em;
	color: #fff;
	text-decoration: none;
	background: linear-gradient(150deg, #f85679, #f76f7f, #fffd75, #75ffdd, #75e1ff, #757cff, #c174fc, #fa74fc);
	background-size: 600% 200%;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-animation: rainbow 10s ease infinite;
	animation: rainbow 10s ease infinite;
  font-family: 'celestia', sans-serif;
}

.library-link {
	z-index: 2;
	position: relative;
	font-family: 'vollcorn', sans-serif;
	display: flex;
	justify-content: center;
	width: 100%;
}

.library-link a {
	color: #fff;
	text-decoration: none;
	font-size: 1em;
	line-height: 1em;
}

@-webkit-keyframes rainbow {
  	0% { background-position: 0% 50% }
  	50% { background-position: 100% 50% }
  	100% { background-position: 0% 50% }
}

@keyframes rainbow {
  	0% { background-position: 0% 50% }
  	50% { background-position: 100% 50% }
  	100% { background-position: 0% 50% }
}

.header-image {
	max-width: 100vw;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
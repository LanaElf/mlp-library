<template>
    <div class="preloader">
		<img src="@/assets/arts/derpy_spinning.gif">
		<span>Loading...</span>
	</div>
</template>

<style lang="scss">
.preloader{
	display: grid;
	place-content: center;
	grid-row-gap: auto auto;
}
.preloader img{
	height: 200px;
	width: auto;
}
.preloader span{
	font-size: 18px;
	margin-bottom: 50px;
	margin-top: 20px;
	font-weight: bold;
}
</style>

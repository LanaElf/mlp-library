<template>
	<footer>
		<div class="contacts">
			<a href="https://t.me/elf_lana" target="_blank">@elf_lana</a>
		</div>
	</footer>
</template>

<script>

</script>

<style lang="scss">
footer {
  display: flex;
  align-items: center;
  justify-content: center;
	padding: 50px;

  a {
    text-decoration: none;
    font-size: 20px;
    text-shadow:
        0 2px 2px white,
        -2px 0px 2px white,
        2px 0px 2px white,
        0px -2px 2px white,
        2px -2px 2px white,
        2px 2px 2px white,
        -2px -2px 2px white,
        -2px 2px 2px white;
    display: grid;
    padding: 5px;
    cursor: pointer;

    &:hover {
      text-shadow:
          0 3px 10px white,
          -3px 0px 10px white,
          3px 0px 10px white,
          0px -3px 10px white,
          3px -3px 10px white,
          3px 3px 10px white,
          -3px -3px 10px white,
          -3px 3px 10px white;
      transition: 0.3s;
    }
  }
}

.contacts {
  text-align: center;
}

h4 {
	padding: 10px;
	margin-bottom: 0;
}
</style>
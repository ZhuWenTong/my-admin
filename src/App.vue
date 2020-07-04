<template>
	<div id="app" v-loading="menuLoading">
		<router-view />
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('menus', ['menuLoading'])
	}
}
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
ul, ul li {
	list-style: none;
}
a {
	text-decoration: none;
}
</style>

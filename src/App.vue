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

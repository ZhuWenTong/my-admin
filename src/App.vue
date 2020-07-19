<template>
	<div id="app" v-loading="menuLoading">
		<transition name="pageAnimate" mode="out-in">
			<router-view />
		</transition>
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

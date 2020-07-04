import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menus from './menus/index'
import theme from './theme/index'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		menus,
		theme
	}
})

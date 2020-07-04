import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menus from './menus/index'
import theme from './theme/index'
import layout from './layout/index'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		menus,
		theme,
		layout
	}
})

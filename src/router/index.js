import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

import homeRoute from './home/index'

Vue.use(VueRouter)
Vue.use(NProgress)

const routes = [{
	path: '/',
	name: 'Login',
	component: () => import('../pages/login/index')
}, {
	...homeRoute
}, {
	path: '*',
	redirect: '/'
}]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')
	NProgress.start()
	if (!token) {
		if (to.name !== 'Login') {
			Message.error('token失效，请重新登录')
			next({
				name: 'Login'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})
router.afterEach(() => {
    NProgress.done()
})

export default router

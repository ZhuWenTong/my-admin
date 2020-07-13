import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
	NProgress.start()
	next()
})
router.afterEach(() => {
    NProgress.done()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)
Vue.use(NProgress)

const routes = [{
	path: '/',
	name: 'Login',
	component: () => import('../pages/login/index')
}, {
	path: '/index',
	name: 'Index',
	component: () => import('../pages/Index/index'),
	children: [{
		path: 'home',
		name: 'Home',
		component: () => import('../pages/home/index')
	}, {
		path: 'example',
		name: 'Example',
		component: () => import('../pages/example/index')
	}]
}, {
	path: '*',
	redirect: '/index/home'
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

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
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
	redirect: '/home'
}]

const router = new VueRouter({
	routes
})

export default router

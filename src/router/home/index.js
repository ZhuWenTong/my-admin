const router = {
    path: '/index',
	name: 'Index',
	component: () => import('@/pages/Index/index'),
	children: [{
		path: 'home',
		name: 'Home',
		component: () => import('@/pages/home/index')
	}, {
		path: 'example',
		name: 'Example',
		component: () => import('@/pages/example/index')
	}, {
		path: 'about',
		name: 'About',
		component: () => import('@/pages/about/index')
	}]
}

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import directives from './utils/directives'
import styles from './utils/style'

Vue.use(ElementUI)
Vue.use(directives)
Vue.use(styles)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

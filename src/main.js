import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/themes/china/main.scss'
import './assets/themes/purple/main.scss'
import './assets/themes/success/main.scss'

import 'font-awesome/css/font-awesome.min.css'

import directives from './utils/directives'

Vue.use(ElementUI)
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

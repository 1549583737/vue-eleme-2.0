import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

import './common/scss/index.scss'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(App)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	linkActiveClass: 'active',
	routes: [
		{ path: '/goods', name: 'goods', component: goods },
		{ path: '/ratings', name: 'ratings', component: ratings },
		{ path: '/seller', name: 'seller', component: seller }
	]
})

export default router

/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})


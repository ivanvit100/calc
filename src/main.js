import Vue from 'vue'
import App from './App'
import output from './components/Output.vue'
import router from './router'
require('./assets/style.min.css')
require('./assets/waves.min.css')

Vue.config.productionTip = false
stop = "";

new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>',
})

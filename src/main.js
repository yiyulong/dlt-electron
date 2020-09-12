import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
import './vant-load-on-demand'
import axios from './api'
import store from './store'

import './assets/js/bodyStyle'

Vue.use(animate)

Object.defineProperties(Vue.prototype, {
  $api: {
    get: () => axios
  },
  $store: {
    get: () => store
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios';

Vue.config.productionTip = false
// 创建实例
Vue.prototype.$http = axios.create({
   baseURL:'http://127.0.0.1:1000'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

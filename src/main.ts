// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime';
import 'core-js/features/reflect'; // vue-property-decorator 推断typescript类型需要;

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import { toast } from '@/utils/toast'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'

Vue.config.productionTip = false
Vue.prototype.toast = toast
Vue.prototype.$toast = toast

// mount axios Vue.$http and this.$http
Vue.use(VueAxios);

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

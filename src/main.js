import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'
import vuetify from './plugins/vuetify';

Vue.use(VueLocalStorage)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  render: h => h(App)
}).$mount('#app')


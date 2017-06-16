// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import 'animate.css'
import 'normalize.css'
import './assets/app.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  data: {
    Bus: new Vue()
  }
})

window.vue = vue

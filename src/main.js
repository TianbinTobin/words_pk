// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import 'animate.css'
import 'normalize.css'
import './assets/app.css'

Vue.config.productionTip = false

Vue.prototype.getQueryString = function (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return decodeURI(r[2])
  }
  return null
}

const vue = new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  data: {
    Bus: new Vue()
  }
})

window.vue = vue

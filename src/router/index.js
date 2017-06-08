import Vue from 'vue'
import Router from 'vue-router'
import Waiting from '../components/Waiting.vue'
import PK from '../components/PK.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Waiting',
      component: Waiting
    },
    {
      path: '/pk',
      name: 'PK',
      component: PK
    }
  ]
})

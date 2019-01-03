import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      components: require('./components/member.vue')
    }
  ]
})

new Vue({
  el: '#app',
  router
})

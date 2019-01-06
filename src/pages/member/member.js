import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      components: require('./components/member.vue')
    },
    {
      name: 'address',
      path: '/address',
      components: require('./components/address.vue'),
      children: [
        {
          path: '',
          // components: require('./components/all.vue')
          redirect: 'all'
        },
        {
          name: 'all',
          path: 'all',
          components: require('./components/all.vue')
        },
        {
          name: 'form',
          path: 'form',
          components: require('./components/form.vue')
        }
      ]
    }
  ]
})

new Vue({
  el: '#app',
  router
})

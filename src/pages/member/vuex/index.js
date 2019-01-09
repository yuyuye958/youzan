import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Address from 'js/addressService.js'

const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    },
    remove(state, id) {
      let lists = state.lists
      let index = lists.findIndex((item) => {
        return item.id === id
      })
      lists.splice(index, 1)
    },
    update(state, instance) {
      // 深拷贝再赋值给lists，否则不能监听到数据变化
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex((item) => {
        return item.id === instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state, id) {
      let lists = state.lists
      lists.forEach((item) => {
        if (item.id === id) {
          item.isDefault = true
        }
      })
    }
  },
  actions: {
    getLists({commit}) {
      Address.list().then((res) => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, instance) {
      Address.add(instance).then((res) => {
        // 模拟添加id，实际上最好让后端返回id
        instance.id = parseInt(Math.random() * 10000)
        commit('add', instance)
      })
    },
    removeAction({commit}, id) {
      Address.remove(id).then((res) => {
        commit('remove', id)
      })
    },
    updateAction({commit}, instance) {
      Address.update(instance).then((res) => {
        commit('update', instance)
      })
    },
    setDefaultAction({commit}, id) {
      Address.setDefault(id).then((res) => {
        commit('setDefault', id)
      })
    }
  }
})

export default store

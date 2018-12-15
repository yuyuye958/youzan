import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'
import {InfiniteScroll} from 'mint-ui'

Vue.use(InfiniteScroll)

let {id, keyword} = qs.parse(location.search.substring(1))

new Vue({
  el: '#app',
  data: {
    searchList: null,
    keyword,
    toTopBtn: false,
    pageNum: 1,
    pageSize: 8,
    allLoaded: false,
    loading: false
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      if (this.allLoaded) {
        return
      }
      this.loading = true
      axios.get(url.search, {
        id,
        keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        let curLists = res.data.lists
        if (curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.searchList) {
          this.searchList = this.searchList.concat(curLists)
        } else {
          this.searchList = curLists
        }
        this.pageNum++
        // this.loading = false
      })
    },
    toggle() {
      let Time = setTimeout(() => {
        let scroll = document.documentElement.scrollTop || document.body.scrollTop
        if (scroll > 100) {
          this.toTopBtn = true
        } else {
          this.toTopBtn = false
        }
        clearTimeout(Time)
      }, 300)
    },
    toTop() {
      velocity(document.body, 'scroll', {duration: 200})
    }
  },
  mixins: [mixin]
})

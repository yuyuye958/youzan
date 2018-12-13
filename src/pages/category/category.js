import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  components: {
    Foot
  },
  created() {
    this.getTopList()
    this.getSubList(0)
  },
  methods: {
    getTopList() {
      axios.get(url.topList).then((res) => {
        this.topLists = res.data.lists
      })
    },
    getSubList(index, id) {
      this.topIndex = index
      if (index !== 0) {
        axios.get(url.subList, {
          id
        }).then((res) => {
          this.subData = res.data.data
        })
      } else {
        this.getRank()
      }
    },
    getRank() {
      axios.get(url.rank).then((res) => {
        this.rankData = res.data.data
      })
    }
  },
  filters: {
    formatPrice(price) {
      let newPrice = price + ''
      if (newPrice.indexOf('.') !== -1) {
        let arr = newPrice.split('.')
        return arr[0] + '.' + (arr[1] + '0').substring(0, 2)
      } else {
        return price + '.00'
      }
    }
  }
})

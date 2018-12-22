import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Swiper from 'components/Swiper'

let {id} = qs.parse(location.search.substring(1))

new Vue({
  el: '#app',
  data: {
    details: null,
    detailTab: ['商品详情', '本店成交'],
    tabIndex: 0,
    dealData: null,
    bannerLists: [],
  },
  created() {
    this.getDetails()
  },
  components: {
    Swiper
  },
  methods: {
    getDetails() {
      axios.get(url.goods, {
        id
      }).then((res) => {
        this.details = res.data.data
        this.details.imgs.forEach((img) => {
          this.bannerLists.push({
            clickUrl: '#',
            img: img
          })
        })
      })
    },
    changeTab(index) {
      this.tabIndex = index
      if (index) {
        axios.get(url.deal, {
          id
        }).then((res) => {
          this.dealData = res.data.data.lists
        })
      }
    }
  },
  mixins: [mixin]
})

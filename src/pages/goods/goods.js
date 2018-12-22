import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

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
    id,
    details: null,
    detailTab: ['商品详情', '本店成交'],
    tabIndex: 0,
    dealData: null,
    bannerLists: [],
    skuType: 1,
    skuNum: 1,
    showSku: false,
    isAddCart: false,
    showAddMessage: false
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
    },
    chooseSku(value) {
      this.skuType = value
      this.showSku = true
    },
    changeSkuNum(value) {
      if (value < 0 && this.skuNum === 1) {
        return
      }
      this.skuNum += value
    },
    addCart() {
      axios.post(url.addCart, {
        id,
        number: this.skuNum
      }).then((res) => {
        if (res.data.status === 200) {
          this.showSku = false
          this.isAddCart = true
          this.showAddMessage = true
          setTimeout(() => {
            this.showAddMessage = false
          }, 1000)
        }
      })
    }
  },
  watch: {
    showSku(val, oldVal) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },
  mixins: [mixin]
})

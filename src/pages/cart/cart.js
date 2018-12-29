import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
  },
  created() {
    this.getLists()
  },
  computed: {
    allChecked: {
      get() {
        if (this.lists && this.lists.length) {
          // 遍历数组，如果每一个店铺都选中那么全选就是选中
          return this.lists.every((shop) => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach((shop) => {
          shop.checked = newVal
          shop.goodsList.forEach((goods) => {
            goods.checked = newVal
          })
        })
      }
    },
    allRemoveChecked: {
      get() {
        // 如果是编辑状态 this.editingShop就是当前shop
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          // 可编辑状态下，店铺的选中值是newVal
          this.editingShop.removeChecked = newVal
          // 可编辑状态下，店铺全部商品的选中值都是newVal
          this.editingShop.goodsList.forEach((goods) => {
            goods.removeChecked = newVal
          })
        }
      }
    },
    selectLists() {
      if (this.lists && this.lists.length) {
        let array = []
        let totalPrice = 0
        this.lists.forEach((shop) => {
          shop.goodsList.forEach((goods) => {
            if (goods.checked) {
              array.push(goods)
              totalPrice += goods.price * goods.number
            }
          })
        })
        this.totalPrice = totalPrice
        return array
      }
      return []
    },
    removeLists() {
      if (this.editingShop) {
        let array = []
        this.editingShop.goodsList.forEach((goods)=>{
          if (goods.removeChecked){
            array.push(goods)
          }
        })
        return array
      }
      return []
    }
  },
  methods: {
    getLists() {
      axios.get(url.cartList).then((res) => {
        let lists = res.data.cartList
        lists.forEach((shop) => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach((goods) => {
            goods.checked = true
            goods.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGoods(shop, goods) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      goods[attr] = !goods[attr]
      shop[attr] = shop.goodsList.every((goods) => {
        return goods[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach((goods) => {
        goods[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveChecked' : 'allChecked'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, index) => {
        if (shopIndex !== index) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    }
  },
  mixins: [mixin]
})

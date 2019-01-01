import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: null
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
        this.editingShop.goodsList.forEach((goods) => {
          if (goods.removeChecked) {
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
    },
    reduce(goods) {
      if (goods.number === 1) {
        return
      }
      // axios.post(url.cartReduce, {
      //   id: goods.id,
      //   number: 1
      // }).then((res) => {
      //   goods.number--
      // })
      Cart.reduce(goods.id).then((res) => {
        goods.number--
      })
    },
    add(goods) {
      // axios.post(url.cartAdd, {
      //   id: goods.id,
      //   number: 1
      // }).then((res) => {
      //   goods.number++
      // })
      Cart.add(goods.id).then((res) => {
        goods.number++
      })
    },
    remove(shop, shopIndex, goods, goodsIndex) {
      this.removePopup = true
      this.removeData = {shop, shopIndex, goods, goodsIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选的 ${this.removeLists.length} 个商品删除吗？`
    },
    removeConfirm() {
      // 删除单个商品
      if (this.removeMsg === `确定要删除该商品吗？`) {
        let {shop, shopIndex, goods, goodsIndex} = this.removeData
        axios.post(url.cartRemove, {
          id: goods.id
        }).then((res) => {
          shop.goodsList.splice(goodsIndex, 1)
          // 如果删的是最后一件商品了
          if (!shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      } else {
        // 删除多个商品
        let ids = []
        this.removeLists.forEach((goods) => {
          ids.push(goods.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then((res) => {
          let array = []
          this.editingShop.goodsList.forEach((goods) => {
            // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。如果没有符合条件的元素返回 -1
            let index = this.removeLists.findIndex((item) => {
              return item.id === goods.id
            })
            if (index === -1) {
              array.push(goods)
            }
          })
          if (array.length) {
            this.editingShop.goodsList = array
          } else {
            // 如果该店铺商品都删了
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeShop() {
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach((shop) => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    touchStart(e, goods) {
      goods.startX = e.changedTouches[0].clientX
    },
    touchEnd(e, shopIndex, goods, goodsIndex) {
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if (goods.startX - endX > 100) {
        left = '-60px'
      }
      if (endX - goods.startX > 100) {
        left = '0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodsIndex}`], {
        left
      })
    }
  },
  mixins: [mixin]
})

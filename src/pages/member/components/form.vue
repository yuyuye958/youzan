<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="province.value" v-for="province in addressData.list">{{province.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="city.value" v-for="city in cityList">{{city.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="district.value" v-for="district in districtList">{{district.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="save">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" @click="remove" v-show="type === 'edit'">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" @click="setDefault" v-show="type === 'edit'">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
  import Address from 'js/addressService.js'

  export default {
    data() {
      return {
        provinceValue: -1,
        cityValue: -1,
        districtValue: -1,
        name: '',
        tel: '',
        address: '',
        id: '',
        type: '',
        instance: '',
        addressData: require('js/address.json'),
        cityList: null,
        districtList: null
      }
    },
    created() {
      let query = this.$route.query
      this.type = query.type
      this.instance = query.instance

      if (this.type === 'edit') {
        this.provinceValue = parseInt(this.instance.provinceValue)
        this.name = this.instance.name
        this.tel = this.instance.tel
        this.address = this.instance.address
        this.id = this.instance.id
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    watch: {
      lists: {
        // 一旦lists发生改变就往前跳转页面
        handler() {
          this.$router.go(-1)
        },
        // 深度监听
        deep: true
      },
      provinceValue(value) {
        if (value === -1) {
          return
        }
        let list = this.addressData.list
        let index = list.findIndex((item) => {
          return item.value === value
        })
        this.cityList = list[index].children
        this.cityValue = -1
        this.districtValue = -1

        if (this.type === 'edit') {
          this.cityValue = parseInt(this.instance.cityValue)
        }
      },
      cityValue(value) {
        if (value === -1) {
          return
        }
        let list = this.cityList
        let index = list.findIndex((item) => {
          return item.value === value
        })
        this.districtList = list[index].children
        this.districtValue = -1

        if (this.type === 'edit') {
          this.districtValue = parseInt(this.instance.districtValue)
        }
      }
    },
    methods: {
      save() {
        // 这里应该还要做表单校验
        let {name, tel, provinceValue, cityValue, districtValue, address} = this
        let data = {name, tel, provinceValue, cityValue, districtValue, address}
        if (this.type === 'add') {
          this.$store.dispatch('addAction', data)
        }
        if (this.type === 'edit') {
          data.id = this.id
          this.$store.dispatch('updateAction', data)
        }
      },
      remove() {
        if (window.confirm('确认删除？')) {
          this.$store.dispatch('removeAction', this.id)
        }
      },
      setDefault() {
        this.$store.dispatch('setDefaultAction', this.id)
      }
    }
  }
</script>
<style scoped>
  @import './address_base.css';
  @import './address.css';
</style>

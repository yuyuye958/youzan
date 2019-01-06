let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  search: '/search/list',
  goods: '/goods/details',
  deal: '/goods/deal',
  cartAdd: '/cart/add',
  cartReduce: '/cart/reduce',
  cartList: '/cart/list',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove',
  addressList: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault',
}

// 开发环境和真实环境的切换
// let host = ''
let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url

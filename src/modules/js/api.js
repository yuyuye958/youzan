let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  search: '/search/list',
  goods: '/goods/details',
  deal: '/goods/deal',
  addCart: '/cart/add',
  cartList: '/cart/list',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove'
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

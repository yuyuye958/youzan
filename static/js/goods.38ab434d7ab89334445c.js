webpackJsonp([1],{"6wD9":function(t,e){},AeEs:function(t,e){},AnIW:function(t,e){},"Do/K":function(t,e){},HFfA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("JWK+"),s=(n.n(a),n("pI1A")),i=(n.n(s),n("AeEs")),o=(n.n(i),n("AnIW")),r=(n.n(o),n("d7BR")),c=(n.n(r),n("Do/K")),d=(n.n(c),n("LjF4")),u=(n.n(d),n("7+uW")),l=n("mtWM"),h=n.n(l),f=n("TFhR"),m=n("mw3O"),p=n.n(m),v=n("U/rD"),g=n("NydE"),w=p.a.parse(location.search.substring(1)).id;new u.default({el:"#app",data:{id:w,details:null,detailTab:["商品详情","本店成交"],tabIndex:0,dealData:null,bannerLists:[],skuType:1,skuNum:1,showSku:!1,isAddCart:!1,showAddMessage:!1},created:function(){this.getDetails()},components:{Swiper:g.a},methods:{getDetails:function(){var t=this;h.a.get(f.a.goods,{id:w}).then(function(e){t.details=e.data.data,t.details.imgs.forEach(function(e){t.bannerLists.push({clickUrl:"#",img:e})})})},changeTab:function(t){var e=this;this.tabIndex=t,t&&h.a.get(f.a.deal,{id:w}).then(function(t){e.dealData=t.data.data.lists})},chooseSku:function(t){this.skuType=t,this.showSku=!0},changeSkuNum:function(t){t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;h.a.post(f.a.addCart,{id:w,number:this.skuNum}).then(function(e){200===e.data.status&&(t.showSku=!1,t.isAddCart=!0,t.showAddMessage=!0,setTimeout(function(){t.showAddMessage=!1},1e3))})}},watch:{showSku:function(t,e){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"100%":"auto"}},mixins:[v.a]})},"JWK+":function(t,e){},KTPn:function(t,e){},LjF4:function(t,e){},NydE:function(t,e,n){"use strict";var a=n("DNVT"),s=(n("v2ns"),{name:"Swiper",props:{lists:{type:Array,required:!0},name:{}},mounted:function(){new a.a(".swiper-container",{pagination:{el:".swiper-pagination"},loop:!0,autoplay:!0})}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])}),0),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var o=n("VU/8")(s,i,!1,function(t){n("6wD9")},null,null);e.a=o.exports},TFhR:function(t,e,n){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",search:"/search/list",goods:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartReduce:"/cart/reduce",cartList:"/cart/list",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in a)a.hasOwnProperty(s)&&(a[s]=" https://www.easy-mock.com/mock/5c36ce5cdbacd05d03e774cd"+a[s]);e.a=a},"U/rD":function(t,e,n){"use strict";var a={components:{Foot:n("nq5D").a},filters:{formatPrice:function(t){var e=t+"";if(-1!==e.indexOf(".")){var n=e.split(".");return n[0]+"."+(n[1]+"0").substring(0,2)}return t+".00"}}};e.a=a},d7BR:function(t,e){},nq5D:function(t,e,n){"use strict";var a=n("mw3O"),s=n.n(a).a.parse(location.search.substring(1)).index,i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],o={name:"Foot",data:function(){return{navConfig:i,curIndex:parseInt(s)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom-nav"},[n("ul",t._l(t.navConfig,function(e,a){return n("li",{key:a,class:{active:a===t.curIndex},on:{click:function(n){t.changeNav(e,a)}}},[n("a",[n("i",{class:e.icon}),t._v(" "),n("div",[t._v(t._s(e.name))])])])}),0)])},staticRenderFns:[]};var c=n("VU/8")(o,r,!1,function(t){n("KTPn")},null,null);e.a=c.exports},pI1A:function(t,e){},v2ns:function(t,e){}},["HFfA"]);
//# sourceMappingURL=goods.38ab434d7ab89334445c.js.map
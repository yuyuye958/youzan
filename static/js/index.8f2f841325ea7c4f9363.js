webpackJsonp([3],{"035s":function(t,e){},"6wD9":function(t,e){},"97Sy":function(t,e){},KTPn:function(t,e){},NydE:function(t,e,a){"use strict";var n=a("DNVT"),s=(a("v2ns"),{name:"Swiper",props:{lists:{type:Array,required:!0},name:{}},mounted:function(){new n.a(".swiper-container",{pagination:{el:".swiper-pagination"},loop:!0,autoplay:!0})}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])}),0),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=a("VU/8")(s,i,!1,function(t){a("6wD9")},null,null);e.a=r.exports},TFhR:function(t,e,a){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",search:"/search/list",goods:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartReduce:"/cart/reduce",cartList:"/cart/list",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in n)n.hasOwnProperty(s)&&(n[s]=" https://www.easy-mock.com/mock/5c36ce5cdbacd05d03e774cd"+n[s]);e.a=n},U67u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("97Sy"),s=(a.n(n),a("bCKv")),i=a.n(s),r=a("035s"),o=(a.n(r),a("eChN")),c=(a.n(o),a("7+uW")),d=a("mtWM"),l=a.n(d),u=a("TFhR"),h=a("nq5D"),p=a("NydE");c.default.use(i.a);new c.default({el:"#app",data:{lists:null,loading:!1,pageNum:1,pageSize:6,allLoaded:!1,bannerLists:null},components:{Foot:h.a,Swiper:p.a},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.get(u.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.lists;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=a,t.pageNum++,t.loading=!1}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}}})},eChN:function(t,e){},nq5D:function(t,e,a){"use strict";var n=a("mw3O"),s=a.n(n).a.parse(location.search.substring(1)).index,i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],r={name:"Foot",data:function(){return{navConfig:i,curIndex:parseInt(s)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{key:n,class:{active:n===t.curIndex},on:{click:function(a){t.changeNav(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}),0)])},staticRenderFns:[]};var c=a("VU/8")(r,o,!1,function(t){a("KTPn")},null,null);e.a=c.exports},v2ns:function(t,e){}},["U67u"]);
//# sourceMappingURL=index.8f2f841325ea7c4f9363.js.map
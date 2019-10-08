<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"/>
  <feature-view />
  <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
  <goods-list :goods="showGoods"></goods-list>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
  <div>1111</div>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import HomeSwiper from "./childCompos/HomeSwiper"
  import RecommendView from "./childCompos/RecommendView";
  import FeatureView from "./childCompos/FeatureView";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";





  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data(){
      return {
        banners: [],
        recommends: [],
        currentType: 'pop',
        goods: {
          'pop': {page: 0, list: [], end: false},
          'new': {page: 0, list: [], end: false},
          'sell': {page: 0, list:[], end: false},
        }
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 1.请求多个数据
      this.__getHomeMultiData()

      // 2.请求商品数据
      this.__getHomeGoods('pop')
      this.__getHomeGoods('new')
      this.__getHomeGoods('sell')
    },
    mounted() {

    },
    methods: {
      /**
       *  网络请求相关方法
       */
      __getHomeMultiData(){
        getHomeMultiData().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      __getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          // apply的特殊用法
          // Array.prototype.push.apply(this.goods[type].list, res.data.list)
          this.goods[type].page  = page

        })
      },
      tabClick(index){
        switch (index) {
          case 0 :
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }

      }
    }
  }
</script>

<style scoped>
  #home{
    /*height: 100vh;*/
    padding-top: 44px;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9
  }
</style>

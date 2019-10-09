<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollPos="scrollPos"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!--@click.native 需要监听一个组件的原生事件时,必须给对应的事件加上.native修饰符,才能进行监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childCompos/HomeSwiper";
import RecommendView from "./childCompos/RecommendView";
import FeatureView from "./childCompos/FeatureView";

import {debounce} from "common/utils"

import { getHomeMultiData, getHomeGoods } from "../../network/home";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: false,
      scrollY: 0,
      goods: {
        pop: { page: 0, list: [], end: false },
        new: { page: 0, list: [], end: false },
        sell: { page: 0, list: [], end: false }
      }
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.__getHomeMultiData();

    // 2.请求商品数据
    this.__getHomeGoods("pop");
    this.__getHomeGoods("new");
    this.__getHomeGoods("sell");
  },
  mounted() {
    // 3.事件总线 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     *  网络请求相关方法
     */
    __getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    __getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        // apply的特殊用法
        // Array.prototype.push.apply(this.goods[type].list, res.data.list)
        this.goods[type].page = page;
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    scrollPos(position){
      // 1.判断isShowBackTop是否显示
      this.isShowBackTop = (- position.y) > 1000
    },
    pullingUp(){
      this.__getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  /*padding-top: 44px;*/
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
  .content{
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>

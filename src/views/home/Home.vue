<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control1"
      v-show="isTabFixed"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scrollPos="scrollPos"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" ref="homeSwiper" />
      <recommend-view :recommends="recommends" ref="recommendView" />
      <feature-view ref="featureView" />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control"
        ref="tabControl2"
      />
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

import {itemImgListenerMixin} from "common/mixin";

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
      tabOffsetTop: 0, // tabControl组件元素顶边的数据
      isTabFixed: false, //是否吸顶
      scrollY: 0, // 保存滑动的位置，
      goods: {
        pop: { page: 0, list: [], endStatus: false },
        new: { page: 0, list: [], endStatus: false },
        sell: { page: 0, list: [], endStatus: false }
      }
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixin: [itemImgListenerMixin],
  created() {
    // 1.请求多个数据
    this.__getHomeMultiData();

    // 2.请求商品数据
    this.__getHomeGoods("pop");
    this.__getHomeGoods("new");
    this.__getHomeGoods("sell");
  },
  activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)
  },
  deactivated(){
    // 1.保存Y值
    this.scrollY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mounted() {
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el; 用于获取组件中的元素
    // $nextTick的使用在组件属性渲染完成后再执行，比如添加组件并设置颜色，
    // 设置颜色可以写在$nextTick中
    this.$nextTick(() => {
      // 此处$nextTick并无作用只是为了学习
      this.getTabControlOffsetTop();
    });
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
      // this.goods[type].page会自增
      const page = ++this.goods[type].page;
      getHomeGoods(type, page)
        .then(res => {
          this.goods[type].list.push(...res.data.list);
          // apply的特殊用法
          // Array.prototype.push.apply(this.goods[type].list, res.data.list)
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
          // 数据加载完成
          this.$set(this.goods[type], "endStatus", true);
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
          break
      }
      // 改变tabControl组件中currentIndex的值, 如果采用props传值的方式改变index不推荐
      // 父组件不要改变子组件的值, 要让子组件自己改变
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    scrollPos(position) {
      // 1.判断isShowBackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶
      // 取整的方法
      // 1、 Math.ceil(-position.y)
      // 2、 0 || -position.y
      // 3、 parseInt(-position.y)
      this.isTabFixed = -position.y >= this.tabOffsetTop
    },
    pullingUp() {
      this.__getHomeGoods(this.currentType);
    },
    getTabControlOffsetTop() {
      this.$refs.homeSwiper.$on("swiperImageLoad", () => {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      });

      this.$refs.featureView.$on("featureImageLoad", () => {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      });

      this.$refs.recommendView.$on("recommendImageLoad", () => {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      });
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
  /*在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.tab-control1{
  /* 方法一*/
  position: relative;
  /*z-index只对定位的元素起效果*/
  z-index: 9;
  /*方法二*/
  /*z-index: 9;*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 44px;*/

}
/*.tab-control {*/
/*原生浏览器*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/
.content {
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

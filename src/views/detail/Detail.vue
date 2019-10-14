<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    />
    <scroll class="content" ref="scroll" :probeType="3" @scrollPos="scrollPos">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :param-info="paramInfo" ref="detailParam" />
      <detail-comment-info :comment-info="commentInfo" ref="detailComment" />
      <goods-list :goods="recommends" ref="detailRecommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-if="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goods/GoodsList";

import {
  getDeatil,
  getRecommend,
  Goods,
  GoodsParam,
  Shop
} from "network/detail";

import { itemImgListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
import { TOP_DISTANCE } from "common/const";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Detail",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null // 函数
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  created() {
    // 1. 保存传入的id
    // this.id = this.$route.params.id
    // 2.根据id请求详情数据
    getDeatil(this.id).then(res => {
      // 获取的数据
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.保存评论数据
      this.commentInfo = data.rate.cRate !== 0 ? data.rate.list[0] : {};
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
      //   this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 7. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // 给getThemeTopY赋值(对给this.themeTopYs赋值得操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [0];
      this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {
    // console.log("mounted");
    // 此时虽然模板已经渲染,但是数据可能还未请求到
    // console.log(this.$refs.detailParam);
    // console.log("=========");
  },
  watch: {
    paramInfo() {
      // 数据请求到但是请求到的数据未使模板重新渲染有v-if限制还未来得及渲染
      // console.log("watch");
      // console.log(this.paramInfo);
      // console.log("watch: ", this.$refs.detailParam);
    }
  },
  updated() {
    // 可以实现但是数据更新会比较频繁
    // console.log("updated", this.$refs.detailParam.$el);
    // 不可以使用watch 因为this.$refs.detailParam
    // this.themeTopYs = [0];
    // this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.detailRecommend.$el.offsetTop);
  },
  destroyed() {
    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    detailImageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
      // this.$refs.detailNavBar.currentIndex = index
    },
    scrollPos(position) {
      let index = this.themeTopYs.findIndex(value => {
        return value > -position.y;
      });
      if (this.$refs.detailNavBar.currentIndex !== index - 1) {
        this.$refs.detailNavBar.currentIndex = index - 1;
      }
      this.isShowBackTop = -position.y > TOP_DISTANCE;
      //
    },
    addToCart() {
      // 获取购物车需要展示的信息
      if (this.goods) {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.id = this.id;
        // this.$store.dispatch('addCart',product)
        // this.addCart(product)
        this.add(product).then(res => {
          this.$toast.show(res);
        });
      }
    },
    // mapActions 辅助函数
    // ...mapActions(['addCart']),
    // vuex中的addCart重命名为add
    ...mapActions({ add: "addCart" })
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: relative;
  height: calc(100% - 44px - 58px);
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
/*.content{*/
/*  overflow: hidden;*/
/*  position: absolute;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 44px;*/
/*}*/
</style>

<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import { getDeatil, Goods } from "network/detail";

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
      goods: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    // 1. 保存传入的id
    // this.id = this.$route.params.id
    // 2.根据id请求详情数据
    getDeatil(this.id).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  }
};
</script>

<style scoped></style>

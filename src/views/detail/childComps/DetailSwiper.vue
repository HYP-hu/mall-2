<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="item of topImages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  }
};
</script>

<style scoped>
.swiper {
}

.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>

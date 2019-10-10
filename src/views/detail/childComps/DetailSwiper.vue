<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item of topImages" class="swiper-item">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    props: {
      topImages:{
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
  }
</script>

<style scoped>
.swiper{

}
  .detail-swiper{
    height: 300px;
    overflow: hidden;

  }
</style>

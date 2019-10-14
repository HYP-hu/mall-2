<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :product="item"
        :key="index"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    // 解决scrollHeight的问题，刷新高度使可滚动
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 93px - 40px);
  /*position: relative;*/
  /*height: calc(100% - 93px);*/

  /*height: calc(100% - 93px);*/
  /*position: absolute;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>

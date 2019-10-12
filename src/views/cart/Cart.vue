<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

import CartList from "./childCompos/CartList";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList
  },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength'])
    // 可以重命名
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
  .cart{
    /*position: relative;*/
    /*height: 100vh;*/

    height: 100vh;
  }
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  z-index: 9;
}
</style>

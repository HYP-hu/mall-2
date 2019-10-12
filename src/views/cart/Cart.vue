<template>
  <div class="Cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength'])
    // 可以重命名
    ...mapGetters({
      length: "cartLength"
    })
  },
  methods: {}
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
}
</style>

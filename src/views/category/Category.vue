<template>
<div class="Cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车()</div>
  </nav-bar>
</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Category",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
.nav-bar{
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
}
</style>

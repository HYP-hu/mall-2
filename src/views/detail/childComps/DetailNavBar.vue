<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) of titles"
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      // 静态路由返回
      // this.$router.go(-1)
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  padding: 0 20px;
}
.title-item {
  flex: 1;
  font-size: 12px;
}
 .active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>

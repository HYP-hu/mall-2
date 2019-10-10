import { debounce } from "./utils";

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    };
  },
  mounted() {
    // 3.事件总线 图片加载完成的事件监听
    // 解决可滚动区域 scrollerHeight属性的大小
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
};

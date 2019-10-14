<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-all"
        :is-checked="isCheckALL"
        @click.native="checkAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计: {{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算: {{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.cartList
        .filter(item => item.checked)
        .reduce(
          (preValue, currentValue) =>
            preValue + currentValue.price * currentValue.count,
          0
        )
        .toFixed(2);
    },
    isCheckALL() {
      return this.cartList.length
        ? this.cartList.every(item => item.checked)
        : false;
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    ...mapGetters(["cartList"])
  },
  methods: {
    checkAll() {
      let isCheck = this.isCheckALL;
      this.cartList.map(item => (item.checked = !isCheck));
    },
    calcClick(){
      if(!this.checkLength){
        this.$toast.show('请选择购买的商品')
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eeeeee;
  line-height: 40px;
  display: flex;
  /*bottom: 40px;*/
  position: relative;
  font-size: 14px;
}
.check-all {
  width: 20px;
  height: 20px;
  /* line-height有继承性;*/
  line-height: 20px;
  margin-right: 5px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.totalPrice {
  margin-left: 30px;
  flex: 1
}
.calculate {
  width: 80px;
  background-color: #ff8198;
  color: #ffffff;
  text-align: center;
}
</style>

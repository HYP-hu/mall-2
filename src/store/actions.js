import { ADDCART, ADDCOUNTER } from "./mutations-types";

export default {
  addCart({ commit, state }, payload) {
    // 1.查找之前数组中是否有该商品
    let oldProduct = state.cartList.find(item => item.id === payload.id);
    // 2.判断oldProduct

    return new Promise((resolve, reject) => {
      if (oldProduct) {
        commit(ADDCOUNTER, oldProduct);
        resolve("当前商品数量 +1")
      } else {
        commit(ADDCART, payload);
        resolve("加入购物车")
      }
    })
  }
};

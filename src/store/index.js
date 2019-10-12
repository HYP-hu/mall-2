import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import state from "./state";
import getters from "./getters";

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象
const store = new Vuex.Store({
  state,
  getters,
  // mutations唯一的目的就是修改state中状态
  // mutations中的方法尽可能完成的事件比较单一
  mutations,
  actions
});

// 3.挂载Vue实例
export default store;

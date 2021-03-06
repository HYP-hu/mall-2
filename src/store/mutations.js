import { ADDCART, ADDCOUNTER } from "./mutations-types";

export default {
  [ADDCART](state, payload) {
    payload.count = 1;
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ADDCOUNTER](state, payload) {
    payload.count++;
  }
};

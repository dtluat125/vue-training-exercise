import { productList } from "@/data";
import { createStore } from "vuex";

export default createStore({
  state: {
    products: productList,
  },
  getters: {},
  mutations: {
    ADD_WATCH(state, product) {
      state.products = state.products.map((prod) => {
        if (prod.id === product.id) {
          return { ...product, watched: true };
        }
        return prod;
      });
    },
    REMOVE_WATCH(state, product) {
      state.products = state.products.map((prod) => {
        if (prod.id === product.id) {
          return { ...product, watched: false };
        }
        return prod;
      });
    },
  },
  actions: {
    watchProduct({ commit }, product) {
      commit("ADD_WATCH", product);
    },
    unWatchProduct({ commit }, product) {
      commit("REMOVE_WATCH", product);
    },
  },
  modules: {},
});

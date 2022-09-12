import { lapList, productList } from "@/data";
import { LaptopProduct } from "@/types";
import { createStore } from "vuex";

export default createStore({
  state: {
    products: productList,
    lapProducts: lapList,
    cartItems: [] as LaptopProduct[],
  },
  getters: {
    isProductInCart:
      (state) =>
      (product: LaptopProduct): boolean => {
        const index = state.cartItems.findIndex(
          (item) => item.id === product.id
        );
        return index > -1;
      },
  },
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

    ADD_TO_CART(state, product) {
      state.cartItems = [...state.cartItems, product];
    },
  },
  actions: {
    watchProduct({ commit }, product) {
      commit("ADD_WATCH", product);
    },
    unWatchProduct({ commit }, product) {
      commit("REMOVE_WATCH", product);
    },
    addToCart({ commit }, product) {
      if (!this.getters.isProductInCart(product))
        commit("ADD_TO_CART", product);
    },
  },
  modules: {},
});

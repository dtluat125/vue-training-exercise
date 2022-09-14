import { lapList, productList } from "@/data";
import { CartItem, LaptopProduct } from "@/types";
import { createStore } from "vuex";

export default createStore({
  state: {
    products: productList,
    lapProducts: lapList,
    cartItems: [] as CartItem[],
    product: {},
  },
  getters: {
    getProductInCartIndex:
      (state) =>
      (productId: string): number => {
        const index = state.cartItems.findIndex((item) => item.id == productId);
        return index;
      },
    getProductInCart:
      (state) =>
      (productId: string): CartItem | undefined => {
        const product = state.cartItems.find((item) => item.id == productId);
        return product;
      },
    cartCount(state) {
      return state.cartItems.reduce((prev, cur) => {
        return prev + cur.quantity;
      }, 0);
    },

    subtotal(state) {
      return state.cartItems.reduce((prev, cur) => {
        return prev + cur.quantity * cur.price;
      }, 0);
    },
  },
  mutations: {
    ADD_WATCH(state, product) {
      state.products = state.products.map((prod) => {
        if (prod.id == product.id) {
          return { ...product, watched: true };
        }
        return prod;
      });
    },
    REMOVE_WATCH(state, product) {
      state.products = state.products.map((prod) => {
        if (prod.id == product.id) {
          return { ...product, watched: false };
        }
        return prod;
      });
    },

    UPDATE_CART_ITEMS(state, newCartItems) {
      state.cartItems = [...newCartItems];
    },
    VIEW_PRODUCT(state, product) {
      state.product = product;
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
  },
  actions: {
    watchProduct({ commit }, product) {
      commit("ADD_WATCH", product);
    },
    unWatchProduct({ commit }, product) {
      commit("REMOVE_WATCH", product);
    },
    addToCart({ commit }, product: CartItem) {
      // if (!this.getters.isProductInCart(product))
      const prodIndex = this.getters.getProductInCartIndex(product.id);
      const newCartItems: CartItem[] = [...this.state.cartItems];
      if (prodIndex > -1) newCartItems.splice(prodIndex, 1, product);
      else newCartItems.push(product);
      commit("UPDATE_CART_ITEMS", newCartItems);
    },
    removeFromCart({ commit }, productId) {
      const prodIndex = this.getters.getProductInCartIndex(productId);
      const newCartItems: CartItem[] = [...this.state.cartItems];
      if (prodIndex > -1) newCartItems.splice(prodIndex, 1);
      commit("UPDATE_CART_ITEMS", newCartItems);
    },
    viewProduct({ commit }, product) {
      commit("VIEW_PRODUCT", product);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },
  modules: {},
});

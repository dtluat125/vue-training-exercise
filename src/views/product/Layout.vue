<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="product-nav" v-if="product">
    <div class="nav-group">
      <div class="nav-item">
        <router-link :to="{ name: 'ProductAbout' }">About Product</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ name: 'ProductDetails' }">Details</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{ name: 'ProductSpecs' }">Specs</router-link>
      </div>
    </div>
    <div class="cart-group">
      <div>
        <span>On Sale from </span> <strong>${{ formatedPrice }}</strong>
      </div>
      <CounterBox v-model="numProd" />
      <button @click="handleAddToCart(product, numProd)">Add To Cart</button>
    </div>
  </div>
  <div class="product-wrapper" v-if="product">
    <!-- <router-view :product="product" /> -->
    <div class="product-inner-content">
      <div class="place-holder"></div>

      <div class="contents-group">
        <div class="path">
          Home > Laptops > <span>{{ product.category }}</span>
        </div>
        <div class="product-name">{{ product.name }}</div>
        <div class="product-review">Be the first to review this product</div>
        <!-- <div class="replaceable">
          <div class="product-description">{{ product.description }}</div>
          <div class="product-color-picker">
            <div class="color-box"></div>
          </div>
        </div> -->
        <router-view :product="product" />

        <div class="contact-us">
          <div class="left">Have a Question? <span>Contact Us</span></div>
          <div class="right">{{ product.name }}</div>
        </div>
      </div>

      <div class="more-info"><span>+</span> MORE INFORMATION</div>
    </div>
    <div class="product-inner-image">
      <div class="img-container"><img :src="product.image" alt="" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LaptopProduct } from "@/types";
import { numberWithCommasFormat2 } from "@/utils";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import CounterBox from "@/components/CounterBox.vue";

interface ProductLayoutProps {
  id: string;
}
const store = useStore();
// eslint-disable-next-line no-undef
const props = defineProps<ProductLayoutProps>();
const product = computed<LaptopProduct>(() =>
  store.state.lapProducts.find((prod: LaptopProduct) => prod.id == props.id)
);
const formatedPrice = computed(() =>
  numberWithCommasFormat2(product.value.price * numProd.value)
);

const numProd = ref(0);
const handleAddToCart = (prod: LaptopProduct, quantity = 1) => {
  const prodInCart = store.getters.getProductInCart(prod.id);
  let newProd = {};
  console.log(prodInCart?.quantity);
  if (prodInCart) {
    newProd = {
      ...prodInCart,
      quantity: prodInCart.quantity + quantity,
    };
  } else newProd = { ...prod, quantity: quantity };
  store.dispatch("addToCart", newProd);
};
</script>

<style lang="scss">
.product-nav {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 25px 0px;
  align-items: center;
  .nav-group {
    display: flex;
    column-gap: 30px;
    flex: 1;

    a {
      text-decoration: none;
      color: #666666;
      font-size: 14px;
      line-height: 21px;
      transition: all 0.1s ease-out;
      &.router-link-exact-active,
      &:hover {
        font-weight: 600;
        color: #000000;
        border-bottom: 2px solid #0156ff;
      }
    }
  }

  .cart-group {
    display: flex;
    column-gap: 20px;
    align-items: center;

    button {
      background: #0156ff;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      padding: 20px 40px;
      color: white;
      border-width: 0px;
      &:hover {
        background: #3d7bf6;
        cursor: pointer;
      }
    }
  }
}

.product-wrapper {
  border-top: 1px solid #cacdd8;

  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  height: 500px;
  .product-inner-content {
    background: #f5f7ff;
    display: grid;
    grid-template-columns: 1fr minmax(400px, 2fr);
    .contents-group {
      display: flex;
      flex-direction: column;
      margin-top: 67px;
      width: 80%;
      min-width: 400;
      .path {
        font-size: 12px;
        line-height: 18px;
        margin-top: 25px;
        span {
          color: #a3a3a3;
        }
      }
      .product-name {
        font-weight: 500;
        font-size: 32px;
        line-height: 48px;
        margin-bottom: 13px;
      }
      .product-review {
        font-size: 12px;
        color: #0156ff;
        margin-bottom: 24px;
      }

      .replaceable {
        margin-bottom: 29px;
        .product-description {
          font-size: 18px;
          line-height: 30px;
          margin-bottom: 44px;
        }

        .product-color-picker {
          display: flex;
          column-gap: 20px;
          align-items: center;
        }
      }

      .contact-us {
        display: flex;
        justify-content: space-between;
        font-size: 12px;

        .left {
          font-weight: 600;
          display: inline-block;
          span {
            font-weight: 400;
            color: #0156ff;
            text-decoration: underline;
            cursor: pointer;
          }
        }
        right: {
          font-weight: 300;
        }
      }
    }

    position: relative;
    .more-info {
      font-size: 14px;
      line-height: 21px;
      font-weight: 700;
      position: absolute;
      bottom: 60px;
      left: 262px;
      span {
        font-weight: 400;
      }
    }
  }

  .product-inner-image {
    .img-container {
      margin-top: 60px;
      img {
        width: 470px;
        max-width: 100%;
      }
    }
  }
}
</style>

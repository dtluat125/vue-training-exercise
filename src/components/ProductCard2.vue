<template>
  <div class="card-container-2" v-if="product">
    <router-link
      v-if="product"
      :to="{
        name: 'ProductAbout',
        params: {
          id: product.id,
        },
      }"
    >
      <div class="card-image">
        <img :src="product.image" alt="Product Image" />
      </div>
    </router-link>
    <div class="card-body">
      <div class="card-name">
        {{ product.name }}
      </div>
      <div class="card-middle">
        <div class="card-info">
          {{ product.description }}
        </div>

        <div class="card-stats">
          <div class="stats-row">
            <div class="label">CPU</div>
            <div class="value">N/A</div>
          </div>
          <div class="stats-row">
            <div class="label">Featured</div>
            <div class="value">N/A</div>
          </div>
          <div class="stats-row">
            <div class="label">I/O Ports</div>
            <div class="value">N/A</div>
          </div>
        </div>
      </div>
      <div class="card-price">
        <span v-if="product.previousPrice">${{ product.previousPrice }}</span>
        ${{ product.price }}
      </div>
    </div>
    <div class="rating-container">
      <StarRating
        :rating="product.rating"
        read-only
        :fixed-points="2"
        :star-size="12"
        :round-start-rating="false"
        :increment="0.01"
        active-color="#E9A426"
        active-border-color="#E9A426"
        :border-width="0"
        :show-rating="false"
      />

      <span>Reviews (4)</span>
    </div>
    <div class="add-to-cart-button" ref="buttonRef" v-if="!inCart">
      <button @click="handleAddToCart(product)">
        <CartIcon class="img" ref="heartRef" />
        <span>Add To Cart</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CartIcon from "@/assets/icons/cart-icon.svg";
import { LaptopProduct } from "@/types";
import { computed, defineProps, toRefs } from "vue";
import { useStore } from "vuex";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import StarRating from "vue-star-rating";

interface CardProps {
  product: LaptopProduct;
  grid: boolean;
}

const props = defineProps<CardProps>();
const { product, grid } = toRefs(props);
// const { image, description, price, info, rating, watched } = product;

const store = useStore();
const handleAddToCart = (prod: LaptopProduct) => {
  store.dispatch("addToCart", prod);
};
const inCart = computed(() => store.getters.isProductInCart(product.value));
</script>

<style scoped lang="scss">
.card-container-2 {
  display: grid;
  padding: 8px 30px 36px 54px;

  border-radius: 8px;
  transition: all 0.2s ease;
  width: 100%;

  grid-template-columns: 250px 1fr 1fr;
  column-gap: 54px;
  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }

  .card-body {
    grid-column: 2/4;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .card-middle {
      margin-top: 20px;
      margin-bottom: 16px;
      align-items: start;
      > div {
        flex: 1;
      }

      .card-stats {
        display: flex;
        flex-direction: column;
        .stats-row {
          display: flex;
          width: 240px;
          padding: 6px 15px;
          &:nth-child(2n) {
            background-color: #f5f7ff;
          }
          > div {
            flex: 1;

            font-size: 12px;
            line-height: 18px;

            &.value {
              color: #666666;
            }
          }
        }
      }
    }
  }

  .card-image {
    width: 250px;
    height: 250px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .card-description {
    font-weight: 400;
    color: #19191d;
    font-size: 16px;
  }

  .card-price {
    color: #000000;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    span {
      font-size: 14px;
      color: #666666;
      text-decoration-line: line-through;
      font-weight: 400;
    }
  }

  .card-middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .card-info {
    color: #787885;
  }

  .add-to-cart-button {
    button {
      padding: 8px 20px;
      border: 2px solid #0156ff;
      border-radius: 50px;
      color: #0156ff;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      background-color: white;
      &:hover {
        cursor: pointer;
        background-color: rgba(116, 115, 115, 0.192);
      }
    }
  }

  .rating-container {
    display: flex;
    align-items: flex-end;
    column-gap: 10px;
    > span {
      font-weight: 400;
      font-size: 12px;
      line-height: 210%;
      color: #a2a6b0;
    }
  }
  .card-name {
    font-size: 12px;
  }

  .card-info {
    font-size: 13px;
    color: black;
  }
}
</style>

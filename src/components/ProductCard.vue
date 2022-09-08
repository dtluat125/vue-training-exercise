<template>
  <div class="card-container" v-if="product">
    <div class="card-image">
      <img :src="product.image" alt="Product Image" />
    </div>
    <div class="card-description">
      {{ product.description }}
    </div>
    <div class="card-price">${{ product.price }}</div>

    <div class="card-info">
      {{ product.info }}
    </div>
    <div class="card-footer">
      <div class="rating-container">
        <StarRatingGroup :rating="product.rating" />
      </div>
      <div class="watch-button" ref="buttonRef" @click="handleWatch">
        <button :class="{ isWatched: product.watched }">
          <HeartIcon class="img" ref="heartRef" />
          <span>{{ product.watched ? "Unwatched" : "Watched" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeartIcon from "@/assets/icons/icon-heart.svg";
import { defineProps, onMounted, onUnmounted, toRefs } from "vue";
import { useStore } from "vuex";
import StarRatingGroup from "@/components/star-rating/StarRatingGroup.vue";

export interface Product {
  image: string;
  description: string;
  price: number;
  info: string;
  rating: number;
  watched: boolean;
  id: string;
}

interface CardProps {
  product: Product;
}

const props = defineProps<CardProps>();
const { product } = toRefs(props);
// const { image, description, price, info, rating, watched } = product;
let heartButtons: HTMLElement[];
let watchedButtons: HTMLElement[];

function addHover(event: any) {
  // event.target?..add("isWatched");

  const target = event.target;
  target.classList.add("isWatched");
  target.querySelector(" path")?.setAttribute("fill", "#ffffff");
}
function removeHover(event: any) {
  if (product.value.watched) return;
  const target = event.target;
  target.classList.remove("isWatched");
  target.querySelector(" path")?.setAttribute("fill", "#2979FF");
}
const store = useStore();
const handleWatch = () => {
  if (product.value.watched) store.dispatch("unWatchProduct", props.product);
  else store.dispatch("watchProduct", props.product);
};
onMounted(() => {
  watchedButtons = Array.from(
    document.querySelectorAll(".watch-button > button.isWatched")
  );

  watchedButtons.forEach((button) => {
    button.querySelector(" path")?.setAttribute("fill", "#ffffff");
  });
});
onUnmounted(() => {
  heartButtons?.forEach((button) => {
    button.removeEventListener("mouseenter", addHover, true);
    button.removeEventListener("mouseleave", removeHover, true);
  });
});
</script>

<style lang="scss">
.card-container {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  align-items: flex-start;
  padding: 16px 16px 12px;

  border-radius: 8px;
  transition: all 0.2s ease;
  max-width: 250px;
  &:hover {
    box-shadow: 0px 2px 4px rgba(59, 69, 123, 0.2),
      0px 4px 8px rgba(92, 107, 192, 0.2);
    cursor: pointer;
  }

  .card-image {
    width: 100%;
    border-radius: 4px;
    img {
      max-width: 100%;
    }
  }
  .card-description {
    font-weight: 400;
    color: #19191d;
    font-size: 16px;
  }

  .card-price {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
  }

  .card-info {
    color: #787885;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rating-container {
      display: flex;
      column-gap: 8px;
    }
  }

  .watch-button {
    button {
      padding: 4px 12px;
      border: 1px solid #9dc2ff;
      color: #2264d1;
      font-weight: 500;
      background-color: transparent;
      border-radius: 4px;
      display: flex;
      align-items: center;
      &:hover,
      &.isWatched {
        background-color: #2264d1;
        color: white;
        border-color: transparent;
        cursor: pointer;
        font-weight: 500;
        svg {
          path {
            fill: white !important;
          }
        }
      }
      svg {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }
    }
  }
}
</style>

<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="section-header">
      <div class="header__left">
        <BaseSelect
          label="Sort By"
          :options="[
            { label: 'Price', value: 'price' },
            { label: 'Rating', value: 'rating' },
          ]"
          v-model="sortBy"
        />
        <BaseSelect
          label="Condition"
          :options="[
            { label: 'Price', value: 'price' },
            { label: 'Rating', value: 'rating' },
          ]"
          defaultValue="Condition"
          v-model="condition"
        />
        <BaseSelect
          label="Delivery options"
          :options="[
            { label: 'Price', value: 'price' },
            { label: 'Rating', value: 'rating' },
          ]"
          defaultValue="Delivery options"
          v-model="deliveryOptions"
        />
      </div>
      <div class="header__right">
        <BaseTabGroup
          :tabs="[
            { content: 'Show all' },
            { content: 'Auction' },
            { content: 'Buy now' },
          ]"
        />
        <BaseTabGroup
          :tabs="[
            { content: tabIcon1, isIcon: true },
            { content: tabIcon1, isIcon: true },
          ]"
        />
      </div>
    </div>
    <div class="section-related">
      <span class="name">Related</span>
      <div class="tag-list">
        <div
          class="tag"
          v-for="(tag, index) in tags"
          :key="index"
          @click="handleFilterTag(tag)"
        >
          {{ tag.label }}
        </div>
      </div>
    </div>

    <div class="section-product-list">
      <ProductCard
        v-for="product in sortedProducts"
        :product="product"
        :key="product.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import tabIcon1 from "@/assets/tab-icon-1.svg";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseTabGroup from "@/components/BaseTabGroup.vue";
import ProductCard from "@/components/ProductCard.vue";
import { Product } from "@/types";
import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";

const sortBy = ref<keyof Product>("price");
const condition = ref("");
const deliveryOptions = ref("");
const tags = ref([
  {
    label: "All",
    value: (a: Product) => {
      return true;
    },
  },
  {
    label: "Your watched products",
    value: (a: Product) => {
      return a.watched;
    },
  },
  {
    label: "Less than $50",
    value: (a: Product) => {
      return a.price < 50;
    },
  },
]);
const store = useStore();
const filterFn = ref(null);
const handleFilterTag = (tag: any) => {
  if (!tag.value) filterFn.value = null;
  filterFn.value = tag.value;
};

const products: Ref<Product[]> = computed(() => store.state.products);

const sortedProducts = computed(() => {
  const sortedList = [...products.value];
  sortedList.sort(
    (a, b) => (b[sortBy.value] as number) - (a[sortBy.value] as number)
  );
  if (!filterFn.value) return sortedList;
  return sortedList.filter(filterFn.value);
});
</script>

<style lang="scss">
.about {
  padding: 40px 16px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  .section-header {
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > * {
      margin-top: 16px;
    }
    .header__left {
      > div {
        margin-right: 16px;
      }
      display: flex;
    }

    .header__right {
      display: flex;
      column-gap: 24px;
    }
  }

  .section-related {
    display: flex;
    align-items: center;
    .name {
      font-weight: 500;
      color: #19191d;
      line-height: 100%;
      margin-right: 16px;
    }
  }
}
.tag-list {
  display: flex;
  flex-grow: 1;
  column-gap: 8px;
  flex-wrap: wrap;
  .tag {
    background: #ededf0;
    border-radius: 99px;
    padding: 6px 12px;
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 2px 4px rgba(59, 69, 123, 0.2),
        0px 4px 8px rgba(92, 107, 192, 0.2);
    }
  }
}
.section-product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
</style>

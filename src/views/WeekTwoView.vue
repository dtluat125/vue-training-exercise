<template>
  <div class="container">
    <AppBar />
    <!-- <div class="divider"></div> -->
    <div class="content-container">
      <div class="banner">
        <img :src="banner" alt="banner" />
      </div>
      <div class="products-container">
        <div class="products-series__name">
          {{ category }} Series ({{ filteredProducts.length }})
        </div>
        <div class="products-grid">
          <div class="products-filter-container">
            <div class="title">Filters</div>
            <button class="clear-filter" @click="clearFilter()">
              Clear filter
            </button>
            <BaseCollapse
              label="Category"
              v-model="category"
              :options="categoryOptions"
            />
            <BaseCollapse
              label="Price"
              v-model="rangePrice"
              :options="rangePriceOptions"
            />
          </div>
          <div class="products-list-container">
            <div class="products-sort-box-container">
              <div class="left">
                <div class="page-details">Items 1-35 of 61</div>
              </div>
              <div class="right">
                <div class="select-group">
                  <BaseSelect2
                    label="Sort By"
                    :options="[
                      { label: 'Price', value: 'price' },
                      { label: 'Rating', value: 'rating' },
                    ]"
                    v-model="sortBy"
                  />
                  <!-- <BaseSelect2
                    label="Sort By"
                    :options="[
                      { label: 'Price', value: 'price' },
                      { label: 'Rating', value: 'rating' },
                    ]"
                    v-model="sortBy"
                  /> -->
                </div>
                <div class="icon-group">
                  <div
                    :class="{ icon: true, active: grid }"
                    @click="grid = !grid"
                  >
                    <GridIcon />
                  </div>
                  <div
                    :class="{ icon: true, active: !grid }"
                    @click="grid = !grid"
                  >
                    <ListIcon />
                  </div>
                </div>
              </div>
            </div>
            <div class="tags-group">
              <div
                class="tag-container"
                v-for="(tag, index) in filteredTags"
                :key="index"
              >
                <div class="tag-label">{{ tag.label }}</div>
                <div class="tag-icon" @click="clearTag(tag)">
                  <RoundedRemoveIcon />
                </div>
              </div>
            </div>
            <div :class="{ 'products-list': true, grid: grid }">
              <ProductCard2
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                :grid="grid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import banner from "@/assets/banner.png";
import BaseSelect2 from "../components/BaseSelect2.vue";
import RoundedRemoveIcon from "@/assets/icons/rounded-remove-icon.svg";
import { computed, Ref, ref } from "vue";
import ProductCard2 from "../components/ProductCard2.vue";
import { LaptopProduct } from "@/types";
import { useStore } from "vuex";
import GridIcon from "@/assets/icons/grid-icon.svg";
import ListIcon from "@/assets/icons/list-icon.svg";
import BaseCollapse from "@/components/collapse/BaseCollapse.vue";

const sortBy = ref<keyof LaptopProduct>("price");
const store = useStore();
const products: Ref<LaptopProduct[]> = computed(() => store.state.lapProducts);
const grid = ref(false);
const category = ref("");
const categoryOptions = computed(() => {
  const options = {} as { [key: string]: number };
  products.value.forEach((prod) => {
    if (options[prod.category]) options[prod.category] += 1;
    else options[prod.category] = 1;
  });

  return Object.keys(options).map((key, index) => ({
    label: key,
    value: key,
    num: options[key],
  }));
});

const rangePrice = ref({ min: 0, max: null });

const numberFormat2 = (num?: number | null): string =>
  typeof num === "number" ? (Math.round(num * 100) / 100).toFixed(2) : "";

const rangePriceOptions = computed(() => {
  const priceArr = products.value.map((prod) => prod.price);
  //   const min = Math.min(...priceArr);
  const max = Math.max(...priceArr);

  let options = [];
  let i = 0;
  for (i = 0; i < max; i += 100) {
    options.push({
      value: { min: i, max: i + 100 },
      label: `$${numberFormat2(i)} - $${numberFormat2(i + 100)}`,
    });
  }

  options.push({
    value: { min: i, max: null },
    label: `$${numberFormat2(i)} And Above`,
  });

  options = options.map((option) => {
    let optionCount = 0;
    products.value.forEach((prod) => {
      const validPrice =
        prod.price >= option.value.min &&
        (!option.value.max || prod.price <= option.value.max);
      if (validPrice) optionCount++;
    });
    return { ...option, num: optionCount };
  });

  return options;
});

const clearFilter = () => {
  rangePrice.value = { min: 0, max: null };
  category.value = "";
};

const clearTag = (tag: any) => {
  if (tag.type === "category") category.value = "";
  if (tag.type === "price") rangePrice.value = { min: 0, max: null };
};

const filteredProducts = computed(() => {
  let sortedList = [...products.value];
  sortedList.sort(
    (a, b) => (b[sortBy.value] as number) - (a[sortBy.value] as number)
  );

  sortedList = sortedList.filter((prod) => {
    const validCat = !category.value || prod.category === category.value;
    const validPrice =
      prod.price >= rangePrice.value.min &&
      (!rangePrice.value.max || prod.price <= rangePrice.value.max);
    return validCat && validPrice;
  });

  return sortedList;
});
const filteredTags = computed(() => {
  const tags = [];
  if (category.value)
    tags.push({
      label: `${category.value}`,
      value: category.value,
      type: "category",
    });
  if (rangePrice.value.min || rangePrice.value.max)
    tags.push({
      type: "price",
      value: rangePrice,
      label: `$${numberFormat2(rangePrice.value.min)} - $${
        numberFormat2(rangePrice.value.max) || "above"
      }`,
    });
  return tags;
});
</script>

<style lang="scss">
.container {
  font-family: "Poppins", sans-serif;
  position: relative;
  .divider {
    margin-top: 92px;
    border: 1px solid #cacdd8;
  }

  .content-container {
    margin-top: 92px;

    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .products-container {
    margin-top: 24px;
    .products-series__name {
      font-weight: 600;
      font-size: 32px;
      line-height: 48px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: minmax(200px, 1fr) 5fr;
      margin-top: 20px;
      column-gap: 6px;
      row-gap: 6px;
      .products-filter-container {
        grid-column: 1/2;
        height: fit-content;
        background-color: #f5f7ff;
        padding: 20px 24px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        .title {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
        }
        button.clear-filter {
          width: 100%;
          color: #a2a6b0;
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          border: 2px solid #a2a6b0;
          border-radius: 50px;
          padding: 8px 0;
          background-color: transparent;
          cursor: pointer;
          margin: 16px 0;
          transition: all 0.3s ease;
          &:hover {
            color: #000000;
            border-color: #000000;
          }
        }
      }
      .products-list-container {
        grid-column: 2;
        .products-sort-box-container {
          .page-details {
            font-size: 13px;
            line-height: 210%;
            color: #a2a6b0;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
          .right {
            display: flex;
            justify-content: flex-end;
            column-gap: 12px;
            align-items: center;
          }
        }
      }
    }
  }

  .tags-group {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .tag-container {
    display: flex;
    border: 1px solid #cacdd8;
    border-radius: 2px;
    width: fit-content;
    justify-content: center;
    align-items: center;
    padding: 9px 14px;
    column-gap: 6px;
    font-weight: 600;
    .tag-label {
      font-size: 13px;
      line-height: 210%;
    }
    .tag-icon {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
    margin: 6px;
  }
  .select-group,
  .icon-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 12px;
  }

  .icon-group {
    .icon {
      &:hover {
        cursor: pointer;
      }
      svg {
        path {
          fill: #a2a6b0;
        }
      }
      &.active {
        svg {
          path {
            fill: #000000;
          }
        }
      }
    }
  }

  .products-list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    &.grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .card-container {
      width: 100%;
    }
  }
}
</style>

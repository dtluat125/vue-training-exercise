<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="replaceable">
    <div class="product-description">{{ props.product.info }}</div>
    <div class="product-color-picker">
      <div class="color-box"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LaptopProduct } from "@/types";

interface ProductProps {
  product: LaptopProduct;
}
// eslint-disable-next-line no-undef
const props = defineProps<ProductProps>();
</script>

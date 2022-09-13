<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="replaceable">
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
</template>

<script lang="ts" setup>
import { LaptopProduct } from "@/types";

interface ProductProps {
  product: LaptopProduct;
}
// eslint-disable-next-line no-undef
const props = defineProps<ProductProps>();
</script>

<style lang="scss">
.card-stats {
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #cacdd8;
  .stats-row {
    display: flex;
    padding: 6px 15px;
    background-color: #f5f7ff;

    &:nth-child(2n + 1) {
      background-color: white;
    }
    > div {
      flex: 2;
      &:first-child {
        flex: 1;
      }

      font-size: 12px;
      line-height: 18px;

      &.value {
        color: #666666;
      }
    }
  }
}
</style>

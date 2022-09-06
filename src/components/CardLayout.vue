<template>
  <div class="card-container">
    <div class="card-section icon">
      <img :src="props.icon" alt="icon" />
    </div>
    <div class="card-section title">
      {{ props.title }}
    </div>
    <div
      class="card-section description"
      v-html="marked.parse(props.description)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { marked } from "marked";

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const props = defineProps<CardProps>();
</script>

<style lang="scss">
.card-container {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: start;
  .card-section {
    text-align: start;
  }
  border-radius: 16px;
  flex-grow: 1;
}

.title {
  font-weight: 400;
  font-size: 24px;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 8px;
}

.description {
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #555555;
}

.icon {
  height: 30px;
  width: 30px;
}
</style>

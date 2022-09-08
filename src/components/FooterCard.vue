<template>
  <div class="footer-card-container">
    <div class="card-section icon">
      <!-- <img :src="props.icon" alt="icon" /> -->
      <component class="img" :is="(props.icon as typeof Component)"></component>
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
import { defineProps, Component } from "vue";
import { marked } from "marked";

interface CardProps {
  icon: Component;
  title: string;
  description: string;
}

const props = defineProps<CardProps>();
</script>

<style lang="scss" scoped>
.footer-card-container {
  background-color: #ededf0;
  display: flex;
  flex-direction: column;
  padding: 28px 16px;
  align-items: center;
  .card-section {
    text-align: center;
  }
  border-radius: 8px;
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

<template>
  <div class="home">
    <h1>Inside Open Art</h1>
    <div class="card-list-container">
      <div v-for="(card, index) in cardList" :key="index" class="card-wrapper">
        <CardLayout
          :icon="card.icon"
          :title="card.title"
          :description="card.description"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardLayout from "@/components/CardLayout.vue"; // @ is an alias to /src
import { cardList } from "@/data";
</script>

<style lang="scss" scoped>
.card-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(490px, 1fr));
  row-gap: 32px;
  column-gap: 20px;
  grid-auto-rows: 1fr;
  margin: 0 64px;
  grid-auto-flow: row;

  .card-wrapper {
    display: flex;
  }
}

.home {
  min-height: 100vh;
  background-image: url("/src/assets/bg.png");
  text-align: center;
}
h1 {
  display: inline-block;
  margin: 96px;
  font-weight: 700;
}
</style>

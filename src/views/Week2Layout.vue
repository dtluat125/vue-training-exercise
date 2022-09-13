<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <AppBar />
    <!-- <div class="divider"></div> -->
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppBar from "@/components/AppBar.vue";
</script>

<style lang="scss">
.container {
  font-family: "Poppins", sans-serif;
  position: relative;
  z-index: 2;
  .divider {
    margin-top: 92px;
    border: 1px solid #cacdd8;
  }

  .content-container {
    margin-top: 92px;
    width: 100%;
    padding: auto;
  }
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-container">
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
.my-container {
  font-family: "Poppins", sans-serif;
  position: relative;
  z-index: 2;

  .content-container {
    margin-top: 92px;
    width: 100%;
    padding: auto;
  }
}
</style>

<template>
  <div class="app-bar-container">
    <div class="app-bar-content">
      <div class="app-bar__left">
        <div class="nav-logo">
          <NavLogo />
        </div>
        <div class="nav-item">
          <router-link :to="{ name: 'Products' }">Laptops</router-link>
        </div>
        <div class="nav-item">Desktop PCs</div>
        <div class="nav-item">Networking Devices</div>
      </div>
      <div class="app-bar__right">
        <div class="nav-item"><SearchIcon /></div>
        <div class="nav-item">
          <router-link :to="{ name: 'Cart' }">
            <div class="icon-with-badge">
              <CartBlackIcon />
              <div class="badge">
                <span>{{ cartCount }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="nav-item">Right 3</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavLogo from "@/assets/icons/logo.svg";
import CartBlackIcon from "@/assets/icons/cart-black-icon.svg";

import SearchIcon from "@/assets/icons/search-icon.svg";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const cartCount = computed(() => store.getters.cartCount);
</script>

<style lang="scss">
.app-bar-container {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  z-index: 10;
  border-bottom: 2px solid #cacdd8;

  .app-bar-content {
    flex: 1;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    .app-bar__left,
    .app-bar__right {
      display: flex;
      align-items: center;
      column-gap: 25px;
    }

    .app-bar__right {
      justify-content: flex-end;
    }
  }

  .nav-item {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #0156ff;
      svg {
        path {
          fill: #0156ff;
        }
      }
    }
  }

  .nav-logo {
    padding: 14px 24px;
  }
}

.icon-with-badge {
  position: relative;
  .badge {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-50%) translateX(50%);

    width: 17px;
    height: 17px;
    color: #ffffff;
    background-color: #0156ff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 10px;
    }
  }
}
</style>

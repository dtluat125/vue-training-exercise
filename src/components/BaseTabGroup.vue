<template>
  <div class="tab-group-container">
    <div
      v-for="(tab, index) in props.tabs"
      :key="index"
      :class="`tab-container ${index === activeIndex ? 'active' : ''}`"
      @click="(e) => handleChangeTab(index, e)"
    >
      <component
        v-if="tab.isIcon"
        :is="(tab.content as Component)"
        :style="{ fill: index === activeIndex ? 'blue' : 'none' }"
      ></component>

      <span v-else>{{ tab.content as string }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, Component } from "vue";
interface Tab {
  content: string | Component;
  isIcon?: boolean;
}
interface TabGroupProps {
  tabs: Tab[];
}

const props = defineProps<TabGroupProps>();
const activeIndex = ref(0);
const handleChangeTab = (index: number, e: Event) => {
  activeIndex.value = index;
  // const currentTab = e.target as HTMLElement;
  // if (!currentTab) return;
  // currentTab.classList.add("active");
  // const tabIcon = currentTab?.querySelector(" path");
  // if (tabIcon) tabIcon.setAttribute("fill", "#2979FF");
  // const tabGroupContainer = currentTab.closest("div.tab-group-container");
  // if (tabGroupContainer) {
  //   console.log(tabGroupContainer);
  //   const inActiveTabs = Array.from(
  //     tabGroupContainer.querySelectorAll(` .tab-container:not(.active)`)
  //   );
  //   inActiveTabs.forEach((tab) => {
  //     console.log(tab);
  //     if (!tab) return;
  //     tab.querySelector("path")?.setAttribute("fill", "#787885");
  //   });
  // }
};
</script>

<style lang="scss">
.tab-group-container {
  display: flex;
  flex-wrap: wrap;
  user-select: none;

  .tab-container {
    width: auto;
    font-size: 14px;
    color: #5a5b6a;
    background-color: #ebf2ff;
    padding: 8px 12px;
    font-weight: 400;
    transition: all 0.2s ease;
    position: relative;

    border-right: 0.5px solid #c8c8cd;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }

    &.active {
      background-color: white;
      box-shadow: 0px 1px 2px rgba(27, 78, 163, 0.24),
        0px 2px 4px rgba(41, 121, 255, 0.24);
      border-radius: 4px;
      font-weight: 500;
      color: #2264d1;
      border: none;
      & svg {
        path {
          fill: #2979ff;
        }
      }
    }
    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      border-right: none;
    }
  }
}
</style>
